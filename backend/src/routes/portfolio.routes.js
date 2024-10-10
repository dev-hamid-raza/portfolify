import { Router } from "express";
import { createPortfolio, updatePortfolio, getPortfolioByUsername } from "../controllers/portfolio.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/').post(verifyJWT, createPortfolio)
router.route('/update').post(verifyJWT, updatePortfolio)
router.route('/:username').get(getPortfolioByUsername)


export default router