import Conversation from '../models/Conversation.js';
import Message from '../models/MessageModel.js';

export const getMessages = async (req, res) => {
    const { otherUserId } = req.params;
    const userId = req.userId;

    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] },
        });

        if (!conversation) {
            return res.status(404).json({ messages: "No conversation found." });
        }

        const messages = await Message.find({
            conversationId: conversation._id,
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('sender', 'username');

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getConversations = async (req, res) => {
    const userId = req.userId;

    try {
        const conversations = await Conversation.find({
            participants: userId,
        }).populate({
            path: 'participants',
            select: 'username profilePicture',
        });

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const sendMessage = async (req, res) => {
    const { recipientUserId, message } = req.body;
    const senderUserId = req.userId;

    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderUserId, recipientUserId] },
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderUserId, recipientUserId],
                lastMessage: {
                    sender: senderUserId,
                    text: message,
                },
            });

            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderUserId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    sender: senderUserId,
                    text: message,
                },
            }),
        ]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
