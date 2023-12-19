/backend
  ├── src
  |   ├── controllers
  |   |   ├── authController.js     // User authentication logic
  |   |   ├── chatController.js     // Chat-related logic
  |   ├── models
  |   |   ├── User.js               // User model
  |   |   ├── Message.js            // Message model
  |   ├── routes
  |   |   ├── authRoutes.js         // Routes for user authentication
  |   |   ├── chatRoutes.js         // Routes for chat functionality
  |   ├── sockets
  |   |   ├── chatSocket.js         // Socket.io setup and logic
  ├── app.js                        // Main application setup (Express, Socket.io)
  ├── server.js                     // Entry point to start the server
