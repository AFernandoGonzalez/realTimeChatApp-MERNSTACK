// import mongoose from 'mongoose';

// const UserProfileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         min: 3,
//         max: 20
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         max: 50
//     },
//     firstName: {
//         type: String,
//         // required: true,
//         min: 3,
//         max: 20
//     },
//     lastName: {
//         type: String,
//         // required: true,
//         min: 3,
//         max: 20
//     },
//     phoneNumber: {
//         type: String,
//         // required: true,
//         min: 10,
//         max: 10
//     },
//     profilePicture: {
//         type: String,
//         default: "https://avatars.githubusercontent.com/u/58346389"
//     },
//     contacts: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     }],
// })

// const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

// export default UserProfile;