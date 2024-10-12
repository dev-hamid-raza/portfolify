import { ChatRoom } from "../models/chatRoom.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const socketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id)

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId)
            console.log(`User joined room: ${roomId}`)
        })


        socket.on('sendMessage', async ({ roomId, content,  userId }) => {
            const chatRoom = await ChatRoom.findById(roomId)

            if(chatRoom) {
                const message = {
                    sender: userId,
                    content,
                    timestamp: new Date()
                }

                chatRoom.messages.push(message)
                await chatRoom.save()

                io.on(roomId).emit('newMessage', message)
            }
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.io)
        })
    })
}