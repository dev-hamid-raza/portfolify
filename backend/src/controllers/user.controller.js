import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import { uploadFileOnCloudinary } from '../utils/cloudinary.js'


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
        username,
        skills: ''
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
    await User.findByIdAndUpdate(
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

const updateUserPassword = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming you're using JWT and have middleware that attaches the user to the request
    const { oldPassword, newPassword } = req.body;

    // Validate input fields
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the old password is correct
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, "Old password is incorrect");
    }

    // Update the password
    user.password = newPassword; // Mongoose pre-save hook will take care of hashing
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, 'Password updated successfully'));
});

const updateUserDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming you're using JWT and have middleware that attaches the user to the request
    const { username, skills, bio } = req.body;
    const avatarLocalPath = req.files?.avatar[0]?.path

    // Validate input
    if (!username && !avatarLocalPath && !skills && !bio) {
        throw new ApiError(400, "At least one field (username, avatar, skills,) is required for update");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Regular expression to validate URL-friendly username
    const usernameRegex = /^[a-zA-Z0-9-_]+$/;
    // Update fields only if they are provided
    if (username) {

        // Validate the username format
        if (!usernameRegex.test(username)) {
            throw new ApiError(400, "Username must only contain letters, numbers, hyphens, or underscores.");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            throw new ApiError(409, "Username is already taken");
        }

        user.username = username;
    }

    const avatar = await uploadFileOnCloudinary(avatarLocalPath)
    
    if (avatar) {
        user.avatar = avatar.url; // Assuming avatar is a URL or a file path
    }
    if (bio) {
        user.bio = bio; // Assuming avatar is a URL or a file path
    }
    if (skills && Array.isArray(skills)) {
        console.log("object")
        user.skills = skills; // Assuming skills is an array of strings
    }

    // Save the updated user
    await user.save();

    return res.status(200).json(new ApiResponse(200, user, 'User details updated successfully'));
});

const updateSocialLinks = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Get user ID from the request (assumes user is authenticated)

    const { github, twitter, linkedin, website } = req.body; // Destructure social links from the request body

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update social links
    user.socialLinks.github = github || user.socialLinks.github;
    user.socialLinks.twitter = twitter || user.socialLinks.twitter;
    user.socialLinks.linkedin = linkedin || user.socialLinks.linkedin;
    user.socialLinks.website = website || user.socialLinks.website;

    // Save the updated user
    await user.save();

    return res.status(200).json({
        message: "Social links updated successfully",
        socialLinks: user.socialLinks
    });
});

export {registerUser,
        loginUser,
        logOutUser,
        refreshAccessToken,
        updateUserPassword,
        updateUserDetails,
        updateSocialLinks};