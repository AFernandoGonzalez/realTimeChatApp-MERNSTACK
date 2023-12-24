// ChatContext.js
import { createContext, useContext, useState, useEffect } from 'react';
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

            const mockConversationId = conversation.find((conversationItem) => conversationItem.mock);

            console.log("mockConversation ", mockConversationId);

            // if (mockConversation) {
            //     // Set the selectedConversation with the mock conversation
            //     // setSelectedCurrentConversation({
            //     //     ...mockConversation,
            //     //     messages: [] // Ensure there's a messages array
            //     // });

            //     // setSelectedConversation(mockConversation);
               
            //     setSelectedConversation(mockConversation.participants[0]._id);
            //     console.log("mockConversation.participants[0]._id ", mockConversation.participants[0]._id);
            //     setIsLoading(false); // Update isLoading flag
            //     return;
            // }

            // if (mockConversationId) {

            //     setSelectedConversation(mockConversationId);
            //     return;
            // }

            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
                console.log("fetchConversation data ", data);
                setIsLoading(false);
            } catch (error) {
                toast.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }
        };

        const fetchCurrentMessages = async () => {
            const mockConversation = conversation.find((conversationItem) => conversationItem.mock);

            if (mockConversation) {
                // Set the selectedConversation with the mock conversation
                setSelectedCurrentConversation({
                    ...mockConversation,
                    messages: [] // Ensure there's a messages array
                });

                setSelectedConversation(mockConversation);
                // setIsLoading(false); // Update isLoading flag
                return;
            }

            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                console.log("fetchCurrentMessages data ", data);
                setSelectedCurrentConversation(data);
                setIsLoading(false);
            } catch (error) {
                toast.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
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

    const handleConversationClick = (participantId) => {
        console.log("handleConversationClick participantId ", participantId);
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
            const searchedUser = await fetchSearchUsersByTextService(searchText, currentUser?.token);

            if (searchedUser[0]._id === currentUser.userId) {
                // console.log("You cannot add yourself");
                toast.error(<div>You cannot chat with yourself</div>);
                return;
            }

            // Check if a conversation with the searched user exists
            const existingConversation = conversation.find((c) => c.participants[0]._id === searchedUser[0]._id);

            if (existingConversation) {
                setSelectedConversation(existingConversation.participants[0]._id);
                return;
            } else {
                const mockConversation = {
                    mock: true,
                    lastMessage: {
                        text: "No messages yet",
                        sender: "",
                    },
                    participants: [
                        {
                            _id: searchedUser[0]._id,
                            username: searchedUser[0].username,
                            profilePicture: searchedUser[0].profilePicture,
                        },
                    ],
                    _id: Date.now(),
                };

                setConversation((prevConversation) => [...prevConversation, mockConversation]);
            }


            console.log("selectedConversation after searched User: ", selectedConversation);

            setContactFound(searchedUser);


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
