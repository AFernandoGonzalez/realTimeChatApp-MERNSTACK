import { useEffect, useState } from 'react';
import { Routes, Route, } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ChatRoom } from './pages/ChatRoom';
import { ProfileProvider } from './context/ProfileContext';


function App() {

  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
