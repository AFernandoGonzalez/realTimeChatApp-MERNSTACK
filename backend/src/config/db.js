import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
