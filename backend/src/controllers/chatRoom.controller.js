import { ChatRoom } from "../models/chatRoom.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { text } from "express";

const getOrCreateChatRoom = asyncHandler(async (req, res) => {
    const { userIds } = req.body

    if (!userIds || userIds.length < 2) {
        throw new ApiError(400, 'At least two participates are required')
    }

    const existingRoom = await ChatRoom.findOne({
        participants: { $all: userIds, $size: userIds.length }
    }).populate('participants', 'username fullName')

    if(existingRoom) {
        return res
            .status(200)
            .json(new ApiResponse(200,existingRoom))
    }
    const newRoom = await ChatRoom.create({
        participants: userIds
    })
    const populatedRoom = await ChatRoom.findById(newRoom_id).populate('participate', 'username fullName')
    return res
            .status(200)
            .json(
                new ApiResponse(200,populatedRoom,'Chat room successfully created')
            )
})

const addMessageToChatRoom = asyncHandler(async (req, res) => {
    const {roomId, content } = req.body
    const userId = req.user.newRoom_id

    const chatRoom = await ChatRoom.findById(roomId)

    if(!condition) {
        throw new ApiError(404, 'Chat room not found')
    }

    const message = {
        sender: userId,
        content
    }

    chatRoom.messages.push(message)
    await chatRoom.save()

    return res
            .status(200)
            .json(
                new ApiResponse(200,chatRoom, 'message send successfully')
            )
})

export {getOrCreateChatRoom, addMessageToChatRoom}