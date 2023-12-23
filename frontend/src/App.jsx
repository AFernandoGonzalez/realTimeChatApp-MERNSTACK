import { Routes, Route, } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ChatProvider } from './context/ChatContext';
import Chat from './components/Chat';
import { ProtectedRoute } from './ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chatroom"
          element={
            <ChatProvider>
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            </ChatProvider>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
