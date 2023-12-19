import express from 'express';
import {createMessage, getUserMessages } from '../controllers/chatController.js';

export const chatRoutes = express.Router();

chatRoutes.get('/get-message/:userId', getUserMessages);
chatRoutes.post('/send-message', createMessage);