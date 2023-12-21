import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

const User = mongoose.model('User', UserSchema)

export default User;