import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
import { useProfile } from '../context/ProfileContext';
import axios from 'axios';
import { ChatMessages } from './ChatMessages';
import { ContactList } from './ContactList';
import { AddContactForm } from './AddContactForm';
import { Container, Row, Col } from 'react-bootstrap';

export const Chat = () => {
    const { userProfile } = useProfile();
    const [socket, setSocket] = useState(null);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipientUserId, setRecipientUserId] = useState(null);
    const [currentChatPartner, setCurrentChatPartner] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [newContactId, setNewContactId] = useState('');
    const [currentChatRoom, setCurrentChatRoom] = useState(null);

    useEffect(() => {
        const newSocket = io(API_BASE_URL);

        newSocket.on('messageFromServer', (data) => {
            setReceivedMessages((prevMessages) => [...prevMessages, data]);

            console.log('frontend data: ', data);
        });

        newSocket.on('chatStarted', ({ room, recipientUserId }) => {
            console.log('chatStarted event received:', { room, recipientUserId });
            setCurrentChatRoom(room);
            console.log('Current Chat Room:', room);
            setRecipientUserId(recipientUserId);
            console.log('Recipient User ID:', recipientUserId);
            newSocket.emit('joinRoom', room);

            console.log('front end room: ', { room, recipientUserId });
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (newMessage.trim() !== '' && recipientUserId) {
            if (userProfile && userProfile.userId !== recipientUserId) {
                const newSentMessage = {
                    email: userProfile.email,
                    message: newMessage,
                    senderUserId: userProfile.userId,
                    recipientUserId: recipientUserId,
                    isSent: true,
                };

                setReceivedMessages((prevMessages) => [...prevMessages, newSentMessage]);

                socket.emit('sendMessage', {
                    senderUserId: userProfile?.userId,
                    email: userProfile?.email,
                    recipientUserId: recipientUserId,
                    message: newMessage,
                    room: currentChatRoom,
                });

                setNewMessage('');
            } else {
                console.log('No user profile or invalid recipientUserId');
            }
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            if (!userProfile) {
                console.error('No user profile found');
                return;
            }
            const response = await axios.post(`${API_BASE_URL}/api/user/add-contact`, {
                userId: userProfile.userId,
                contactId: newContactId,
            });

            console.log(response.data.message);

            await fetchContacts();
        } catch (error) {
            console.error('Error adding contact:', error.message);
        }
    };

    const fetchContacts = async () => {
        try {
            if (!userProfile) {
                console.error('No user profile found');
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/api/user/profile/${userProfile.userId}`);

            setContacts(response.data.profile.contacts || []);
        } catch (error) {
            console.error('Error fetching contacts:', error.message);
        }
    };

    useEffect(() => {
        if (userProfile) {
            fetchContacts();
        }
    }, [userProfile]);

    const handleStartChat = (contactId) => {
        console.log('Starting chat with contactId:', contactId);
        setRecipientUserId(contactId);
        setCurrentChatPartner(contactId);

        socket.emit('startChat', { senderUserId: userProfile?.userId, recipientUserId: contactId });
    };

    // console.log(receivedMessages); 
    return (
        <Container className="mt-5">
            <Row>
                {/* Chat Sidebar */}
                <Col md={4}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Chat</h5>
                            <div className="mb-3">
                                <label htmlFor="contactSearch">Search contact</label>
                                <input type="text" className="form-control" id="contactSearch" placeholder="Enter contact" />
                                <AddContactForm
                                    newContactId={newContactId}
                                    setNewContactId={setNewContactId}
                                    handleAddContact={handleAddContact}
                                />
                            </div>

                            <div>
                                <p>contact to talk</p>
                                <div className="d-flex justify-content-between">
                                    {/* {!currentChatPartner && ( */}
                                    <ContactList contacts={contacts} handleStartChat={handleStartChat} />
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Chat Display */}
                <Col md={8}>
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div>
                                    {currentChatPartner && (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="card-title">Contact Name : {currentChatPartner}</h5>
                                            </div>
                                            <ChatMessages receivedMessages={receivedMessages} />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <form onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            placeholder="Type your message"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            className="form-control"
                                        />
                                        <button type="submit" className="btn btn-primary mt-2">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
