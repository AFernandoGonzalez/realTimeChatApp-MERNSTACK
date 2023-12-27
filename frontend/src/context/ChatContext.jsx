// ChatContext.js
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
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
    const [isLoading, setIsLoading] = useState(true);
    const [conversation, setConversation] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedCurrentConversation, setSelectedCurrentConversation] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [contactFound, setContactFound] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const newSocket = io(API_BASE_URL, {
            auth: {
                userId: currentUser?.userId,
            },
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            newSocket.on("newMessage", (message) => {
                console.log("newMessage: ", message);
                sendMessage((prevMessage) => [...prevMessage, message]);

                setConversation((prevConversation) => {
                    const existingConversation = prevConversation.find((c) => c._id === message.conversationId);
                    if (existingConversation) {
                        return prevConversation.map((c) => {
                            if (c._id === message.conversationId) {
                                return {
                                    ...c,
                                    lastMessage: message,
                                };
                            }
                            return c;
                        });
                    } else {
                        return [
                            {
                                _id: message.conversationId,
                                lastMessage: message,
                                participants: [
                                    {
                                        _id: message.sender,
                                    },
                                ],
                            },
                            ...prevConversation,
                        ];
                    }
                });
            });

        });

        const fetchConversation = async () => {

            const selectedConversationMock = conversation.find((c) => c.mock === true)
            if (selectedConversationMock) {
                setSelectedConversation(selectedConversationMock.participants[0]._id);
                return;
            } else {

                try {
                    const data = await fetchConversationService(currentUser?.token);
                    setConversation(data);
                    setIsLoading(false);
                } catch (error) {
                    toast.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                    throw error;
                }
            }
        };

        const fetchCurrentMessages = async () => {
            const selectedCurrentMessagesMock = conversation.find((c) => c.mock === true)
            if (selectedCurrentMessagesMock) {
                setSelectedCurrentConversation(selectedCurrentMessagesMock);
                return;
            }

            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                setSelectedCurrentConversation(data);
                setIsLoading(false);
            } catch (error) {
                toast.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
                throw error;
            }

        };

        fetchConversation();
        fetchCurrentMessages();

        return () => {
            newSocket.off("getOnlineUsers");
            newSocket.off("newMessage");
        }
    }, [selectedConversation, conversation.length, currentUser?.userId]);


    const changeMessageHandler = async (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async () => {

        try {
            try {
                const data = await sendMessageService(message, selectedConversation, currentUser?.token);
                setMessage((prevMessage) => [...prevMessage, data])
            } catch (error) {
                toast.error(`Failed to send message in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
            } catch (error) {
                toast.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                setSelectedCurrentConversation(data);
            } catch (error) {
                toast.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
                throw error;
            }

        } catch (error) {
            console.error(error);
        }
        setMessage('');
    };

    const changeSearchContactHandler = async (e) => {
        setSearchText(e.target.value);
    };

    const handleConversationClick = (participantId) => {
        setSelectedConversation(participantId);
        console.log("participantId: ", participantId);
    };

    const searchForContact = async (e) => {
        e.preventDefault();

        if (!searchText || searchText.trim() === '') {
            return;
        }

        try {
            const searchedUser = await fetchSearchUsersByTextService(searchText, currentUser?.token);

            const messagingYourself = searchedUser[0]._id === currentUser.userId;
            if (messagingYourself) {
                toast.error(<div>You cannot chat with yourself</div>);
                return;
            }

            const existingConversation = conversation.find((c) => c.participants[0]._id === searchedUser[0]._id);

            if (existingConversation) {
                setSelectedConversation(searchedUser[0]._id);
                return;
            }
            else {
                const mockConversation = {
                    mock: true,
                    lastMessage: {
                        text: '',
                        sender: '',
                        createdAt: Date.now(),
                    },
                    participants: [
                        {
                            _id: searchedUser[0]._id,
                            username: searchedUser[0].username,
                            profilePicture: searchedUser[0].profilePicture
                        },
                    ],
                };

                setConversation((prevConversation) => [...prevConversation, mockConversation]);
            }


        } catch (error) {
            toast.error(<div>Contact <strong>{searchText}</strong> not found.</div>);
            throw error;
        } finally {
            setSearchText('');
        }
    };


    const value = {
        socket,
        currentUser,
        message,
        isLoading,
        conversation,
        selectedConversation,
        selectedCurrentConversation,
        searchText,
        contactFound,
        onlineUsers,
        changeMessageHandler,
        sendMessage,
        handleConversationClick,
        changeSearchContactHandler,
        searchForContact,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
