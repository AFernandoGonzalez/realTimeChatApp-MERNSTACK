// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { login, logout } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // console.log("currentUser: ", currentUser);

    useEffect(() => {
        if (currentUser) {
            // Set current user in axios defaults if a user is available
            axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
        }
    }, [currentUser]);

    const loginUser = async (email, password) => {
        const user = await login(email, password);
        setCurrentUser(user);
    };

    const value = {
        currentUser,
        login: loginUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
