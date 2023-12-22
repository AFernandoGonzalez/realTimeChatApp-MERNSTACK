import express from 'express';
import { getProfiles, getUserProfile, addContact, getUserProfileByText } from '../controllers/userController.js';

export const userRoutes = express.Router();

userRoutes.get('/profile', getProfiles);
userRoutes.get('/profile/search', getUserProfileByText);
userRoutes.get('/profile/:userId', getUserProfile);
userRoutes.post('/add-contact', addContact);