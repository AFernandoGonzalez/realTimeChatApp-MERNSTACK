// ChatContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
import { useAuth } from './AuthContext';
import { fetchConversationService, fetchCurrentMessagesService, sendMessageService, fetchSearchUsersByTextService } from '../services/chatService';


const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useAuth(null);
    const [message, setMessage] = useState([]);
    const [output, setOutput] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [conversation, setConversation] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedCurrentConversation, setSelectedCurrentConversation] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [contactFound, setContactFound] = useState([]);

    useEffect(() => {
        const newSocket = io(API_BASE_URL);

        newSocket.on('messageResponse', (data) => {
            setOutput((prevOutput) => [...prevOutput, data]);
            setFeedback('');
        });

        newSocket.on('typingResponse', (data) => {
            setFeedback(`${data.username} is typing a message...`);
        });

        newSocket.on('userListResponse', (data) => {
            setUserList(data);
        });

        newSocket.emit('loginUser', currentUser?.username);

        const fetchConversation = async () => {
            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
                setIsLoading(false);
            } catch (error) {
                console.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }
        };

        const fetchCurrentMessages = async () => {
            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                setSelectedCurrentConversation(data);
                setIsLoading(false);
            } catch (error) {
                console.error( `Failed to fetch messages in ChatContext. Status: ${error.message}`);
                throw error;
            }
        };

        fetchConversation();
        fetchCurrentMessages();

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [selectedConversation, currentUser?.token, currentUser?.username]);

    const changeMessageHandler = async (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            try {
                const data = await sendMessageService(message, selectedConversation, currentUser?.token);
                // setOutput((prevOutput) => [...prevOutput, data]);
                setMessage((prevMessage) => [...prevMessage, data])
            } catch (error) {
                console.error(`Failed to send message in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
            } catch (error) {
                console.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                setSelectedCurrentConversation(data);
            } catch (error) {
                console.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
                throw error;
            }

        } catch (error) {
            console.error(error);
        }
        setMessage('');
    };

    const handleConversationClick = (participantId) => {
        setSelectedConversation(participantId);
    };

    const changeSearchContactHandler = async (e) => {
        setSearchText(e.target.value);
    };

    const searchForContact = async (e) => {
        e.preventDefault();
        if (!searchText || searchText.trim() === '') {
            return;
        }
        try {
            const data = await fetchSearchUsersByTextService(searchText, currentUser?.token);
            if (data[0]._id === currentUser.userId) {
                console.log("You cannot add yourself");
                return;
            }
            setContactFound(data);
            setSearchText('');
        } catch (error) {
            console.error(`Failed to search for contact in ChatContext. Status: ${error.message}`);
            throw error;
        }
    };

    const value = {
        socket,
        currentUser,
        message,
        output,
        feedback,
        userList,
        isLoading,
        conversation,
        selectedConversation,
        selectedCurrentConversation,
        searchText,
        contactFound,
        changeMessageHandler,
        sendMessage,
        handleConversationClick,
        changeSearchContactHandler,
        searchForContact,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
