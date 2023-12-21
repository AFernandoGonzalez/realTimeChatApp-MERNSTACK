import { useEffect, useState } from 'react';
import { Routes, Route, } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ChatRoom } from './pages/ChatRoom';
import { ProfileProvider } from './context/ProfileContext';
import { MessageProvider } from './context/MessageContext';
import TestChat from './components/TestChat';


function App() {

  return (
    <AuthProvider>
      <ProfileProvider>
        <MessageProvider>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<TestChat />} />
        </Routes>
        </MessageProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
