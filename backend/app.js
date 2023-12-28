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

// const corsOptions = {
//     origin: 'https://chatappeando.netlify.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// };
// app.options('*', cors(corsOptions));

app.use((req, res, next) => {
    const allowedOrigins = [
        'https://chatappeando.netlify.app',
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


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

export default app;
