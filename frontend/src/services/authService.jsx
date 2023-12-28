// authService.js
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            // withCredentials: true
        });

        const userWithToken = { ...response.data };
        localStorage.setItem('user', JSON.stringify(userWithToken));

        return userWithToken;
    } catch (err) {
        console.error(err);
        throw new Error(err.response.data.message || 'Error while logging in')
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

export { login, logout };
