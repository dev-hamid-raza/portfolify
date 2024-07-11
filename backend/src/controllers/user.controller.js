import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async (req, res) => {
    const { email, fullName ,password } = req.body

    if(
        [email, fullName, password].some((field) => field.trim === '')
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({email})
    if(existingUser) {
        throw new ApiError(409, "This email already exists")
    }

    // create user
    const user = await User.create({
        email,
        fullName,
        password
    })

    const createdUser = User.findById(user._id).select(
        '-password -refreshToken'
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

export {registerUser}