import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'


const generateAccessTokenAndRefreshToken = async(userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    return {accessToken,refreshToken}
}


const registerUser = asyncHandler( async (req, res) => {
    const { email, fullName ,password } = req.body

    if(
        [email, fullName, password].some((field) => field.trim() === '')
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({email})
    if(existingUser) {
        throw new ApiError(409, "This email already exists")
    }
    const generateUniqueUsername = async (fullName) => {
        let baseUsername = fullName.replace(/\s+/g,'').toLowerCase()

        let existingUser = await User.findOne({username: baseUsername })

        let uniqueUserName = baseUsername
        let counter = 1

        while(existingUser) {
            uniqueUserName = `${baseUsername}${counter}`
            existingUser = await User.findOne({ username: uniqueUserName })
            counter++
        }

        return uniqueUserName
    }

    const username = await generateUniqueUsername(fullName)

    // create user
    const user = await User.create({
        email,
        fullName,
        password,
        username
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500,'Something went wrong while registering the user')
    }
    
    return res
            .status(201)
            .json(
                new ApiResponse(200, createdUser, 'User register successfully')
            )
})

const loginUser = asyncHandler( async (req,res) => {
        const {email, password} = req.body

        if(!email) {
            throw new ApiError(400, 'Email is required')
        }

        const user = await User.findOne({email})

        if(!user) {
            throw new ApiError(404, 'User does not exist')
        }

        const isPasswordValid  = await user.isPasswordCorrect(password)
        if(!isPasswordValid) {
            throw new ApiError(401, 'Incorrect password')
        }

        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
        const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

        const options = {
            httpOnly: true,
            secure: true
        }
        return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(
                    new ApiResponse(200,{user: loggedInUser, refreshToken, accessToken}, 'User loggedIn successfully')
                )
})

const logOutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndDelete(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'User logged out'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findOne(decodedToken?._id)
        if(!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
        return res
        .status(200)
        .cookie('accessToken', accessToken)
        .cookie('refreshToken', refreshToken)
        .json(new ApiResponse(200,{accessToken,refreshToken}, 'Access token refreshed successfully'))
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token')
    }
})



export { registerUser, loginUser, logOutUser, refreshAccessToken,};