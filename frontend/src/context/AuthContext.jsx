import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken || null;
    });

    useEffect(() => {
        if (token) {
            // If a token is available, set it in axios defaults
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            console.log("authcontext: ", response.data);
        

            // Set current user including the token
            const userWithToken = { ...response.data};
            setCurrentUser(userWithToken);
            // localStorage.setItem('token', response.data.token);
            // localStorage.setItem('userId', response.data.user);
            localStorage.setItem('user', JSON.stringify(userWithToken));

            console.log("authcontext: ", userWithToken);
        } catch (err) {
            console.error("autcontext: ", err);
            throw new Error('Login failed');
        }
    };

    // Log out the user
    const logout = () => {
        setCurrentUser(null); // Remove user from state
        localStorage.removeItem('user'); // Clear user from local storage
        localStorage.removeItem('token'); // Clear token from local storage
    };

    const value = {
        currentUser,
        login,
        logout
    };

    // console.log('AuthContext -> value', value);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

