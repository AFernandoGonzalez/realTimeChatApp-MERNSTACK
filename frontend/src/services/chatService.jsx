import { API_BASE_URL } from '../constants';


export const fetchConversationService = async (currentUserToken) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUserToken}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch conversations. Status: ${error.message}`);
        throw error;
    }
};


export const fetchCurrentMessagesService = async (selectedConversation, currentUserToken) => {
    try {
        // Check if there's a selected conversation
        if (selectedConversation) {
            const response = await fetch(`${API_BASE_URL}/api/chat/messages/${selectedConversation}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUserToken}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to fetch messages. Status: ${response.status}`);
            }
        }
    } catch (error) {
        console.error(`Failed to fetch messages. Status: ${error.message}`);
        throw error;
    }
};

export const sendMessageService = async (message, selectedConversation, currentUserToken) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUserToken}`,
            },
            body: JSON.stringify({
                recipientUserId: selectedConversation,
                message: message,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error( `Failed to send message. Status: ${error.message}`);
        throw error;
    }
};

export const fetchSearchUsersByTextService = async (searchText, currentUserToken) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile/search?text=${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUserToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to search users. Status: ${error.message}`);
        throw error;
    }
};