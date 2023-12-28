// import UserProfile from "../models/UserProfile.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getProfiles = async (req, res) => {

    try {
        const profile = await User.find();
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

        const profile = await User.findOne({ _id: userId });
        res.json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export const getUserProfileByText = async (req, res) => {
    const searchText = req.query.text;
    try {

        if (!searchText || searchText.trim() === '') {
            return res.status(400).json({ message: 'Search text cannot be empty' });
        }

        const profiles = await User.find({
            username: { $regex: new RegExp(`^${searchText}$`, 'i') }
        });

        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No profiles found' });
        }

        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const addContact = async (req, res) => {
    const { userId, contactId } = req.body;

    try {

        // Check if the user exists
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the contact exists
        const contactExists = user.contacts.includes(contactId);
        if (contactExists) {
            return res.status(400).json({ message: 'Contact already exists' });
        }

        // Check if the contactId is a valid user
        const contactUser = await User.findById(contactId);
        if (!contactUser) {
            return res.status(400).json({ message: 'Invalid contact ID' });
        }

        // Add contactId to the user's contacts
        await User.findByIdAndUpdate(userId, { $addToSet: { contacts: contactId } });
        // await UserProfile.findByIdAndUpdate(userId, { $addToSet: { contacts: contactId } });

        // Add the contact
        user.contacts.push(contactId);
        await user.save();

        res.json({ message: 'Contact added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};