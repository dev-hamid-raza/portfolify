import { Router } from "express";
import { getPortfolioByUsername } from "../controllers/portfolio.controller.js";

const router = Router()


router.route('/:username').get(getPortfolioByUsername)


export default router