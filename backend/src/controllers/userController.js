import UserProfile from "../models/UserProfile.js";
import mongoose from "mongoose";

export const getProfiles = async (req, res) => {
    const { userId } = req.params;

    try {
        const profile = await UserProfile.findById(userId);
        res.json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const profile = await UserProfile.findOne({ userId: userId });
        res.json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};