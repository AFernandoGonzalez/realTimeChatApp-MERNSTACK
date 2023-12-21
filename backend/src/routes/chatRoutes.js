import express from 'express';
import {createMessage, getUserMessages } from '../controllers/chatController.js';

export const chatRoutes = express.Router();

chatRoutes.get('/user/:userId/messages', getUserMessages);
chatRoutes.post('/message', createMessage);