import React from 'react'
import { Chat } from '../components/Chat'
import { useAuth } from '../context/AuthContext'

export const ChatRoom = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect or show an error message for unauthenticated users
    return <div>You are not authenticated. Please log in.</div>;
  }

  return (
    <div>
      <h2>Welcome to the ChatRoom</h2>
      <Chat />
    </div>
  );
}
