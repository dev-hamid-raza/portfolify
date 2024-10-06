import { asyncHandler } from "../utils/asyncHandler.js";
import { Portfolio } from "../models/portfolio.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const getPortfolioByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username }).populate('portfolio')

    if(!user)   {
        throw new ApiError(404, 'User not found')
    }

    if(!user.portfolio || !user.portfolio.isPublic) {
        throw new ApiError(403, 'This portfolio is not available')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,{
                user: {
                    username: user.username,
                    fullName: user.fullName,
                    avatar: user.avatar
                },
                portfolio: user.portfolio
            })
        )
})

export { getPortfolioByUsername,}