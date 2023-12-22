import { text } from 'express';
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // unique: true,
        min: 3,
        max: 20 
    },
    text: {
        type: String,
        required: true,
        min: 3,
        max: 1000 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Message = mongoose.model('Message', MessageSchema)
export default Message;