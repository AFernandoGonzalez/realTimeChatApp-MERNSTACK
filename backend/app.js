import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import { authRoutes } from './src/routes/authRoutes.js';
import { chatRoutes } from './src/routes/chatRoutes.js';
import { createServer } from 'http';
// import { Server } from 'socket.io';
import { chatSocket } from './src/sockets/chatSocket.js';
import { userRoutes } from './src/routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
connectDB();
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

chatSocket(server);

server.listen(PORT, () => {
    console.log(`Server is up on port`, PORT);
});
