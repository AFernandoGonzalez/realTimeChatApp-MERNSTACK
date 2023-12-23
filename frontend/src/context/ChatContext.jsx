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
            // if (conversation.find((conversationItem) => conversationItem.mock)) {
            //     const foundConversation = conversation.find((conversationItem) => conversationItem.mock);
            //     // console.log("foundConversation --- ", foundConversation);
            //     setSelectedConversation(foundConversation.participants[0]._id);
            //     return;
            // }


            // here we are tyin to get the mock converarion id and not fetch the database for it we can simple pass the mock conversation id to the fetchCurrentMessagesService and display that data, we are checking if the conversation is a mock conversation and if it is we are setting the selectedConversation to the mock conversation id and then passing that to the fetchCurrentMessagesService and then displaying that data

            //display the conversation to see if there are any mock conversations
            // console.log("fetchCurrentMessages conversation ", conversation);

            // // this is the specific conversation when we click on the conversation
            // console.log("fetchCurrentMessages selectedCurrentConversation ", selectedCurrentConversation);

            // Find and iterate over conversations
            // conversation.forEach(conversation => {
            //     // Check if the conversation is a mock conversation
            //     if (conversation.mock) {
            //         // If it is a mock conversation, set the selectedConversation to the mock conversation id
            //         const selectedConversationId = conversation._id;

            //         // Pass the selectedConversationId to the fetchCurrentMessagesService
            //         fetchCurrentMessagesService(selectedConversationId);

            //         // Display the data of the mock conversation
            //         console.log("Mock Conversation Data:", conversation);
            //     }
            // });

            const mockConversation = conversation.find((conversationItem) => conversationItem.mock);

            if(mockConversation) {
                // const selectedConversationId = mockConversation._id;
                // console.log("selectedConversationId ", selectedConversationId);

                // Display the data of the mock conversation
                console.log("Mock Conversation Data:", mockConversation);

                // Set the selectedConversation and exit the function
                setSelectedCurrentConversation(mockConversation);
  
                return;
            }

            // Continue with fetching from the database
            console.log("fetchCurrentMessages conversation ", conversation);
            console.log("fetchCurrentMessages selectedCurrentConversation ", selectedCurrentConversation);


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

            console.log("searchedUser ", searchedUser);

            if (searchedUser[0]._id === currentUser.userId) {
                // console.log("You cannot add yourself");
                toast.error(<div>You cannot chat with yourself</div>);
                return;
            }

            // Check if a conversation with the searched user exists
            const existingConversation = conversation.find((c) => c.participants[0]._id === searchedUser[0]._id);

            console.log("existingConversation after searched User: ", existingConversation);

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

                console.log("mockConversation ", conversation);
            }


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
