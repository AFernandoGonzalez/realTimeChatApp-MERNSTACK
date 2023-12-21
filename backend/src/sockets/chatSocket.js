// backend/src/sockets/chatSocket.js
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js'; // Import your Message model

const FRONTEND_URL = process.env.FRONTEND_MAIN_URL || 'http://localhost:3000';

export const chatSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ['GET', 'POST'],
        },
    });


    io.on('connection', (socket) => {
        // console.log('New client connected', socket.id);

        

        socket.on('messageFromServer', (data) => {
            console.log('backend data: ', data);

            // emit the data to all clients
            io.emit('messageResponse', data);
        });

        socket.on('typing', (data) => {
            console.log('typing data: ', data);
            socket.broadcast.emit('typing', data);
        });


    })



    // io.on('connection', (socket) => {
    //     console.log('New client connected', socket.id);

    //     socket.on('joinRoom', (room) => {
    //         socket.join(room);
    //         console.log(`-----Socket ${socket.id} joined room ${room} -----`);
    //     });

    //     socket.on('startChat', ({ senderUserId, recipientUserId }) => {
    //         const room = createRoomIdentifier(senderUserId, recipientUserId);
            
    //         // socket.data.currentChatRoom = room;

    //         socket.join(room);
    //         console.log(`-----Room ${room} created----`);

    //         io.to(senderUserId).emit('chatStarted', { room, recipientUserId });
    //         io.to(recipientUserId).emit('chatStarted', { room, recipientUserId: senderUserId });
    //     });


    //     socket.on('sendMessage', async (data) => {
    //         const { email, message, senderUserId, recipientUserId} = data;
    //         console.log("data: ", data);
            
    //         const room = socket.data.currentChatRoom; 

    //         console.log(`Message received in room ${room}: ${message}`);

    //         io.to(recipientUserId).emit('messageFromServer', { message, senderUserId, recipientUserId });
    //     });

    //     socket.on('disconnect', () => {
    //         console.log('Client disconnected', socket.id);
    //     });

    //     const createRoomIdentifier = (userId1, userId2) => {
    //         const sortedUserIds = [userId1, userId2].sort();
    //         return sortedUserIds.join('_');
    //     };

    // });
};
