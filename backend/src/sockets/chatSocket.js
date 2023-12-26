import { Server } from 'socket.io';
import User from '../models/User.js';

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


        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
            
        });

    })

};
