import Message from '../models/Message.js';

export const getUserMessages = async (req, res) => {
    const { userId } = req.params;

    try {
        const messages = await Message.find({ userId: userId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    const message = req.body;

    const newMessage = new Message(message);

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create message', error: error.message });
    }
}


