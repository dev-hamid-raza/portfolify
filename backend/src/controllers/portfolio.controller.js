import { asyncHandler } from "../utils/asyncHandler.js";
import { Portfolio } from "../models/portfolio.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const createPortfolio = asyncHandler(async (req, res) =>{
    const { title, bio, projects, isPublic} = req.body
    const userId = req.user._id

    const newPortfolio = new Portfolio({
        title,
        bio,
        projects,
        isPublic,
        user: userId
    })
    const user = await User.findById(userId)

    if(!newPortfolio._id) {
        throw new ApiError(400, 'Portfolio is not created')
    }

    user.portfolio = newPortfolio._id
    await user.save()

    await newPortfolio.save()
    return res
            .status(201)
            .json(
                new ApiResponse(201, 
                    {portfolio: newPortfolio},
                    'Portfolio Successfully created'
                )
            )
})

const updatePortfolio = asyncHandler(async (req, res)=> {
    const { title, bio, projects, isPublic} = req.body
    const userId = req.user._id

    const portfolio = await Portfolio.findOne({ user: userId})

    if(!portfolio) {
        throw new ApiError(404, 'Portfolio not found')
    }

    portfolio.title =  title || portfolio.title
    portfolio.bio = bio || portfolio.bio
    portfolio.portfolio = projects || portfolio.projects
    portfolio.isPublic = isPublic || portfolio.isPublic

    await portfolio.save()

    return res
            .status(201)
            .json(
                new ApiResponse(201, 
                    {portfolio: newPortfolio},
                    'Portfolio Successfully created'
                )
            )
})

const getPortfolioByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username }).populate('portfolio')
    console.log(username)
    console.log(user)
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
                    avatar: user.avatar,
                    socialLinks: user.socialLinks
                },
                portfolio: user.portfolio
            }, 'portfolio')
        )
})

export { createPortfolio, updatePortfolio, getPortfolioByUsername,}