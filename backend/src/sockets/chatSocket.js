import { Server } from 'socket.io';

const FRONTEND_URL = process.env.FRONTEND_MAIN_URL || 'http://localhost:3000';

export const chatSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ['GET', 'POST'],
        },

    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        const { token } = socket.handshake.query;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { _id, username } = decoded;

            socket.userId = _id;
            socket.username = username;

            console.log('User connected', socket.userId, socket.username);


        } catch (error) {
            console.error('Invalid token', error.message);
            socket.disconnect(true);
            return;
        }

        // socket.on('message', (message) => { 
        //     console.log('New message', message);

        //     const newMessage = {
        //         message,
        //         sender: socket.userId,
        //         username: socket.username,
        //     };

        //     io.emit('message', newMessage);
        // });

        socket.on('disconnect', () => {
            console.log(`User ${socket.username} disconnected`, socket.id);
        });
    });
}