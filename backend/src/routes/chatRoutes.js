import express from 'express';
import { getMessages, sendMessage, getConversations } from '../controllers/chatController.js';

import { authenticateUser } from '../middleware/authenticateUser.js';

export const chatRoutes = express.Router();

// chatRoutes.get('/user/:userId/messages', getUserMessages);
// chatRoutes.post('/message', createMessage);
chatRoutes.get('/messages/:otherUserId', authenticateUser, getMessages);
chatRoutes.get('/conversations', authenticateUser, getConversations);
chatRoutes.post('/send-message', authenticateUser, sendMessage);