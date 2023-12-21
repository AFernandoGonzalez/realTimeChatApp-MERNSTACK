// ProfileContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the existing AuthContext
import { API_BASE_URL } from '../constants';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    // console.log("userProfile: ", userProfile);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (currentUser) {
                try {
                    // Use the user ID from the currentUser to fetch the profile
                    const response = await axios.get(`${API_BASE_URL}/api/user/profile/${currentUser.user}`);
                    setUserProfile(response.data.profile);


                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    const value = {
        userProfile,

    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
