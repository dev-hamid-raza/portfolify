import { Router } from "express";
import { logOutUser, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import passport from 'passport';
import '../auth/passport.js'; 
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

// User registration route
router.route('/register').post(registerUser)

// User login route
router.route('/login').post(loginUser)

// Secure routes
router.route('/logout').post(verifyJWT, logOutUser)
router.route('/refresh-token').post(refreshAccessToken)
// GitHub authentication routes


export default router