import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    content: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    isRead: {
        type: Boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Message = mongoose.model('Message', MessageSchema)
export default Message;