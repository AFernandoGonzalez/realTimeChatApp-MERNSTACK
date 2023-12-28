import { Server } from 'socket.io';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_MAIN_URL;


let userSocketMap = {};
let io;

export const chatSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            allowedHeaders: ["Access-Control-Allow-Origin"],
            allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
            // all methods
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    });





    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;

        if (userId !== undefined) {
            userSocketMap[userId] = socket.id;
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }

        socket.on('disconnect', () => {

            // Retrieve userId from the userSocketMap
            const disconnectedUserId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === socket.id);

            if (disconnectedUserId) {
                delete userSocketMap[disconnectedUserId];
                io.emit('getOnlineUsers', Object.keys(userSocketMap));
            }
        });

    })

};

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
};

export { io }