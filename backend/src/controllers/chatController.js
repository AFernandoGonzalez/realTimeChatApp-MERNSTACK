import Message from '../models/Message.js';

export const getUserMessages = async (req, res) => {
    const { userId } = req.params;

    try {
        // Retrieve messages where the user is either the sender or recipient
        const messages = await Message.find({
            $or: [
                { senderUserId: userId },
                { recipientUserId: userId },
            ],
        }).populate('senderUserId recipientUserId', 'email');
        res.status(200).json({ messages });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    const { senderUserId, recipientUserId, content } = req.body;

    const newMessage = new Message({
        senderUserId,
        recipientUserId,
        content,
    });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create message', error: error.message });
    }
}


