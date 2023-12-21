/backend
  ├── src
  |   ├── config
  |   |   ├── db.js     // db connection
  |   ├── controllers
  |   |   ├── authController.js     // User authentication logic
  |   |   ├── chatController.js     // Chat-related logic
  |   |   ├── userController.js     // User-related logic
  |   ├── models
  |   |   ├── User.js               // User model
  |   |   ├── Message.js            // Message model
  |   |   ├── UserProfile.js            // Message model
  |   ├── routes
  |   |   ├── authRoutes.js         // Routes for user authentication
  |   |   ├── chatRoutes.js         // Routes for chat functionality
  |   |   ├── userRoutes.js         // Routes for user functionality
  |   ├── sockets
  |   |   ├── chatSocket.js         // Socket.io setup and logic
  ├── app.js                        // Main application setup (Express, Socket.io)

