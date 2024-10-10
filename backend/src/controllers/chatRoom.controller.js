import { ChatRoom } from "../models/chatRoom.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { text } from "express";

const createChatRoom = asyncHandler(async (req, res) => {
    const { userIds } = req.body

    if(!userIds) {
        throw new ApiError(400,'userIds invalid')
    }
    const newRoom = new ChatRoom({
        participants: userIds
    })

    await newRoom.save()
    return res
        .status(201)
        .json(
            new ApiResponse(201,newRoom,'Successfully created chat room')
        )
})

const getChatMessages = asyncHandler(async (req, res) => {
    const { roomId } = req.params

    const room = await ChatRoom.findById(roomId).populate('message.user')
    if(!room) {
        throw new ApiError(404,'Room not found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,room.messages,'User Message')
        )
})

const addMessageToRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params
    const { userId, text } = req.body

    const room = await ChatRoom.findById(roomId)
    if(!room) {
        throw new ApiError(404,'Room not found')
    }

    const newMessage = {
        user: userId,
        text,
        timestamp: Date.now()
    }

    room.messages.push(newMessage)
    await room.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200,room.messages)
        )
})

export { createChatRoom, getChatMessages, addMessageToRoom }