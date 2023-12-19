import { loginUser, registerUser } from "../controllers/authController.js";
import express from 'express';

export const authRoutes = express.Router();

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);