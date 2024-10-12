import { Router } from "express";
import { getOrCreateChatRoom, addMessageToChatRoom } from "../controllers/chatRoom.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route('/').post(verifyJWT,getOrCreateChatRoom)
router.route('/message').post(verifyJWT, addMessageToChatRoom)

export default router