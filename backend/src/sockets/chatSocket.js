// backend/src/sockets/chatSocket.js
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
// import Message from '../models/Message.js';
import User from '../models/User.js';
// import UserProfile from '../models/UserProfile.js';

const FRONTEND_URL = process.env.FRONTEND_MAIN_URL || 'http://localhost:3000';

export const chatSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ['GET', 'POST'],
        },
    });


    let users = [];


    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);


        socket.on("loginUser", async (username) => {
            console.log("username", username);

            try {
                const user = await User.findOne({ username });
                if (user) {
                    const userProfileContacts = await User.findOne({ userId: user._id })
                        .populate({
                            path: 'contacts',
                            model: 'User',
                            select: 'username', // Select only the 'username' field
                        });

                    // Emitting only the usernames of contacts to the user
                    io.to(socket.id).emit("userListResponse", userProfileContacts.contacts.map(contact => contact.username));
                }
            } catch (error) {
                console.error('Error fetching user contacts:', error.message);
            }
        });

        socket.on('messageFromServer', (data) => {
            console.log('backend data: ', data);

            // emit the data to all clients
            io.emit('messageResponse', data);
        });

        socket.on('typing', (data) => {
            console.log('typing data: ', data);
            socket.broadcast.emit('typingResponse', data);
        });


        // socket.on('newUser', (data) => {
        //     console.log('newUser data: ', data);
        //     if (!users.includes(data.username)) {
        //         users.push(data.username);
        //     }
        //     socket.emit('newUserResponse', users);
        //     // socket.broadcast.emit('newUser', users);
        // });

        // socket.on('disconnect', () => {
        //     console.log('Client disconnected', socket.id);
        // });


        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
            
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
