// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();


    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

