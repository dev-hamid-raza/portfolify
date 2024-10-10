import { Router } from "express";
import { createChatRoom, getChatMessages, addMessageToRoom } from "../controllers/chatRoom.controller.js";

const router = Router()


router.route('/').post(createChatRoom)
router.route('/:roomId/messages').get(getChatMessages)
router.route('/:roomId/message').post(addMessageToRoom)

export default router