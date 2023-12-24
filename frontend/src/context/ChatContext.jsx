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

            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
                setIsLoading(false);
            } catch (error) {
                // console.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                toast.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }
        };

        const fetchCurrentMessages = async () => {
            const mockConversation = conversation.find((conversationItem) => conversationItem.mock);

            if (mockConversation) {
                // Display the data of the mock conversation
                console.log("Mock Conversation Data:", mockConversation);
        
                // Set the selectedConversation with the mock conversation
                setSelectedCurrentConversation({
                    ...mockConversation,
                    messages: [] // Ensure there's a messages array
                });
                
                setSelectedConversation(mockConversation);
                console.log("selectedConversation after mock: ", selectedConversation);
                setIsLoading(false); // Update isLoading flag
                return;
            }

            // Continue with fetching from the database
            // console.log("fetchCurrentMessages conversation ", conversation);
            // console.log("fetchCurrentMessages selectedCurrentConversation ", selectedCurrentConversation);


            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                console.log("fetchCurrentMessages data ", data);
                setSelectedCurrentConversation(data);
                setIsLoading(false);
            } catch (error) {
                // console.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
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
                // setOutput((prevOutput) => [...prevOutput, data]);
                setMessage((prevMessage) => [...prevMessage, data])
            } catch (error) {
                // console.error(`Failed to send message in ChatContext. Status: ${error.message}`);
                toast.error(`Failed to send message in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchConversationService(currentUser?.token);
                setConversation(data);
            } catch (error) {
                // console.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                toast.error(`Failed to fetch conversations in ChatContext. Status: ${error.message}`);
                throw error;
            }

            try {
                const data = await fetchCurrentMessagesService(selectedConversation, currentUser?.token);
                setSelectedCurrentConversation(data);
            } catch (error) {
                // console.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
                toast.error(`Failed to fetch messages in ChatContext. Status: ${error.message}`);
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
            const searchedUser = await fetchSearchUsersByTextService(searchText, currentUser?.token);

            console.log("1. searchedUser ", searchedUser);

            if (searchedUser[0]._id === currentUser.userId) {
                // console.log("You cannot add yourself");
                toast.error(<div>You cannot chat with yourself</div>);
                return;
            }

            // Check if a conversation with the searched user exists
            const existingConversation = conversation.find((c) => c.participants[0]._id === searchedUser[0]._id);

            console.log("2. Found Existing Convo: ", existingConversation);

            if (existingConversation) {
                setSelectedConversation(existingConversation.participants[0]._id);
                return;
            } else {
                // If the conversation doesn't exist, create a mock conversation
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

                // Add the mock conversation to the conversation state
                setConversation((prevConversation) => [...prevConversation, mockConversation]); 
            
                // setSelectedConversation(mockConversation.participants[0]._id);
                console.log("3. Mock Conversation: ", mockConversation.participants[0]._id);
            }


            console.log("selectedConversation after searched User: ", selectedConversation);

            setContactFound(searchedUser);


        } catch (error) {
            // console.error(`Failed to search for contact in ChatContext. Status: ${error.message}`);
            // toast.error(<div>Failed to search for contact <strong>{searchText}</strong>. {error.message}</div>);
            toast.error(<div>Contact <strong>{searchText}</strong> not found.</div>);
            throw error;
        } finally {
            // Clear the searchText after the search is complete, whether it succeeds or fails
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
