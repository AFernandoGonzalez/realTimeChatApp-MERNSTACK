import User from '../models/User.js';
// import UserProfile from '../models/UserProfile.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate Gravatar URL based on email
        const gravatarUrl = gravatar.url(email, { s: '200', r: 'pg', d: 'identicon' });

        // Create a new user
        const newUser = await User({
            username,
            email,
            password: hashedPassword,
            profilePicture: gravatarUrl
        });
        

        const savedUser = await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.status(201).json({ message: "User created successfully", user: savedUser, token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
