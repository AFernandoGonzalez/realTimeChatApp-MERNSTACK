import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
import { useAuth } from '../context/AuthContext';

import { useChat } from '../context/ChatContext';


const TestChat = () => {

  const {
    socket, setSocket,
    currentUser,
    message, setMessage,
    output, setOutput,
    feedback, setFeedback,
    userList, setUserList,
    isLoading, setIsLoading,
    conversation, setConversation,
    selectedConversation, setSelectedConversation,
    selectedCurrentConversation, setSelectedCurrentConversation,
    searchText, setSearchText,
    contactFound, setContactFound,
    changeMessageHandler,
    sendMessage,
    handleConversationClick,
    changeSearchContactHandler,
    searchForContact
  } = useChat();

  // const [socket, setSocket] = useState(null);
  // const { currentUser } = useAuth(null);
  // const [message, setMessage] = useState([]);
  // // const [userLogged, setUserLogged] = useState([]);
  // const [output, setOutput] = useState([]);
  // const [feedback, setFeedback] = useState('');
  // // const [username, setUsername] = useState('');
  // const [userList, setUserList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // // make a global state for the conversation so that we can use it in the chat window anywhere
  // const [conversation, setConversation] = useState([]);
  // // selectedConversation has an id
  // const [selectedConversation, setSelectedConversation] = useState(null);
  // const [selectedCurrentConversation, setSelectedCurrentConversation] = useState(null);
  // const [searchText, setSearchText] = useState('');
  // const [contactFound, setContactFound] = useState([]);;


  // useEffect(() => {
  //   const newSocket = io(API_BASE_URL);
  //   // listen for events from the server
  //   newSocket.on('messageResponse', (data) => {
  //     // adding previous output to the new output array 
  //     setOutput((prevOutput) => [...prevOutput, data]);
  //     setFeedback('');
  //   });

  //   newSocket.on('typingResponse', (data) => {
  //     setFeedback(`${data.username} is typing a message...`);
  //   });

  //   // Listen for user list updates
  //   newSocket.on('userListResponse', (data) => {
  //     setUserList(data);
  //   });

  //   newSocket.emit('loginUser', currentUser?.username);


  //   //fetching the messages from the server
  //   const fetchConversation = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${currentUser?.token}`,
  //         }
  //       });
  //       const data = await response.json();
  //       setConversation(data);
  //       console.log('Conversation data: ', data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchConversation();

  //   //fetching the messages from the server
  //   const fetchCurrentMessages = async () => {
  //     try {
  //       // Check if there's a selected conversation
  //       if (selectedConversation) {
  //         const response = await fetch(`${API_BASE_URL}/api/chat/messages/${selectedConversation}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${currentUser?.token}`,
  //           }
  //         });

  //         if (response.ok) {
  //           const data = await response.json();
  //           setSelectedCurrentConversation(data);
  //         } else {
  //           console.error(`Failed to fetch messages. Status: ${response.status}`);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchCurrentMessages();


  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [selectedConversation, currentUser?.token, currentUser?.username]);


  useEffect(() => {
    // listen for events from the server
    socket

  }, []);


  // const changeMessageHandler = async (e) => {
  //   // e.preventDefault();
  //   setMessage(e.target.value);
  //   // socket.emit('typing', {
  //   //   username: currentUser.username,
  //   // });
  // };

  // // emit/send events to the server
  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/chat/send-message`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${currentUser?.token}`,
  //       },
  //       body: JSON.stringify({
  //         recipientUserId: selectedConversation,
  //         message: message,
  //       }),
  //     });
  //     const data = await response.json();
  //     setMessage((prevMessage) => [...prevMessage, data]);

  //     console.log('message data: ', data);

  //     //have a context for the conversation to avoid fetching it again
  //     const fetchConversation = async () => {
  //       try {
  //         const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${currentUser?.token}`,
  //           }
  //         });
  //         const data = await response.json();
  //         setConversation(data);
  //         console.log('Conversation data: ', data);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchConversation();

  //     // have a context for the current conversation to avoid fetching it again
  //     const fetchCurrentMessages = async () => {
  //       try {
  //         // Check if there's a selected conversation
  //         if (selectedConversation) {
  //           const response = await fetch(`${API_BASE_URL}/api/chat/messages/${selectedConversation}`, {
  //             method: 'GET',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${currentUser?.token}`,
  //             }
  //           });

  //           if (response.ok) {
  //             const data = await response.json();
  //             setSelectedCurrentConversation(data);
  //           } else {
  //             console.error(`Failed to fetch messages. Status: ${response.status}`);
  //           }
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchCurrentMessages();

  //     setIsLoading(false);


  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // if (message.trim() && currentUser.userId !== null) {
  //   //   const newSentMessage = {
  //   //     message: message,
  //   //     username: currentUser.username,
  //   //   };
  //   //   socket.emit('messageFromServer', newSentMessage);
  //   // }

  //   setMessage('');
  // };

  // const handleConversationClick = (participantId) => {
  //   setSelectedConversation(participantId);
  // };

  // const changeSearchContactHandler = async (e) => {
  //   setSearchText(e.target.value);
  // }


  // const searchForContact = async (e) => {
  //   e.preventDefault();
  //   if (!searchText || searchText.trim() === '') {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/user/profile/search?text=${searchText}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${currentUser?.token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     if (data[0]._id === currentUser.userId) {
  //       console.log("You cannot add yourself");
  //       return;
  //     }
  //     setContactFound(data);
  //     setSearchText('');



  //   } catch (error) {
  //     console.error({ message: error.message });
  //   }
  // }



  return (
    <div className='container m-4'>
      <div className='row'>
        <div className='col-4'>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Contact"
              aria-label="Search Contact"
              value={searchText}
              onChange={changeSearchContactHandler}
            />
            <button className="btn btn-primary" onClick={searchForContact}>Search</button>
          </div>
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Conversations
            </a>
            <ul className="list-group">
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div className="list-group">
                  {conversation?.map((conversationItem, index) => (
                    <div key={index}>
                      {conversationItem.participants.map((participant, participantIndex) => (
                        <div
                          className={`list-group-item d-flex align-items-center ${selectedConversation === participant._id ? 'bg-primary-subtle' : ''}`}
                          key={participantIndex}
                          onClick={() => handleConversationClick(participant._id)}
                        >
                          <img className="rounded-circle" style={{ width: "30px", height: "30px" }} src={participant.profilePicture} alt=""></img>
                          <div className="ms-2">
                            <a href="#" className="list-group-item-action">{participant.username}</a>
                            {conversationItem.lastMessage && (
                              <div>
                                {currentUser.userId !== conversationItem.lastMessage.sender ? "You" : "---"}
                                <p className="alert alert-primary m-0" style={{ fontSize: "12px" }}>
                                  Last message: {conversationItem.lastMessage.text.substring(0, 10) + "..."}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

              )}
            </ul>
          </div>
          {/* <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Active User
            </a>

            <ul className="list-group">
              {userList.map((user, index) => (
                <a
                  href="#"
                  className="list-group-item list-group-item-action" key={index}>{user}
                </a>
              ))}
            </ul>
          </div> */}
        </div>

        <div className='col'>
          <div id='chat-window'>
            {selectedCurrentConversation ? (
              <div className="card" >
                <div className="card-body " style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                  <h5 className="card-title">Chat</h5>
                  <ul className="list-group">
                    <span className="">User Name </span>
                  </ul>
                  <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                    <ul className="list-group">
                      {selectedCurrentConversation.messages.map((message, index) => (
                        <li className='list-group-item mb-2' key={index}>
                          {message.sender._id === currentUser.userId ? (
                            <p className='alert alert-primary text-end'>You: {message.text}</p>
                          ) : (
                            <p className='alert alert-secondary text-start'>{message.sender.username}: {message.text}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>



                  <div className="fst-italic text-secondary" role="alert">

                  </div>
                </div>
                <div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Message"
                      aria-label="Message"
                      value={message}
                      onChange={changeMessageHandler}
                    />
                    <button className="btn btn-primary" onClick={sendMessage} >Send</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" >
                <div className="card-body " style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                  <h5 className="card-title">Chat</h5>
                  <ul className="list-group">
                    <span className="">Select a conversation </span>
                  </ul>
                  <div className="fst-italic text-secondary" role="alert">

                  </div>
                </div>
              </div>
            )}

          </div>


        </div>
      </div>
    </div>
  )
}

export default TestChat