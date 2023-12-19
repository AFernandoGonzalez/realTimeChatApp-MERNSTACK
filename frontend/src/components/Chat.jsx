// Chat.js
import { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

export const Chat = () => {
    const { userProfile } = useProfile();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    console.log('currentUser in Chat component:', userProfile);
    // console.log('userProfile in Chat component:', userProfile);

    console.log("messages: ", messages);

    const handleMessageSend = () => {
        // Perform logic to send the message
        // Example: Add the message to the messages state
        setMessages((prevMessages) => [...prevMessages, { user: userProfile?.userId, content: message }]);
        setMessage('');
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Fetch messages from the backend using the user ID
                const response = await axios.get(`${API_BASE_URL}/api/chat/get-message/${userProfile?.userId}`);

                // console.log("response.data.messages: ", response);

                setMessages(response.data.messages || []);

            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        // Call the fetchMessages function when the component mounts
        fetchMessages();
    }, [userProfile]);

    return (
        <div>
            <h2>Chat Room</h2>
            <div>
                {messages?.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
};