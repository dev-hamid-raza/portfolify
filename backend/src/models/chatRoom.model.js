import { text } from "express";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})


const chatRoomSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [messageSchema]
}, { timestamps: true})

export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)