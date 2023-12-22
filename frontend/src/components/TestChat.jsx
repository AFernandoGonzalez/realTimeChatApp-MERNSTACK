import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
// import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';

const TestChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [userLogged, setUserLogged] = useState([]);
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState('');
  const { currentUser } = useAuth(null);
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // make a global state for the conversation so that we can use it in the chat window anywhere
  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);


  // console.log('currentUser: ', currentUser);
  console.log('conversation: ', selectedConversation);
  useEffect(() => {
    const newSocket = io(API_BASE_URL);

    // listen for events from the server
    newSocket.on('messageResponse', (data) => {
      // adding previous output to the new output array 
      setOutput((prevOutput) => [...prevOutput, data]);
      setFeedback('');
    });

    newSocket.on('typingResponse', (data) => {
      setFeedback(`${data.username} is typing a message...`);
    });

    // Listen for user list updates
    newSocket.on('userListResponse', (data) => {
      setUserList(data);
    });

    // newSocket.emit('loginUser', userProfile?.username);


    //fetching the messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.token}`,
          }
        });
        const data = await response.json();
        setConversation(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();


    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);


  const changeMessageHandler = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', {
      // username: userProfile.username,
    });
  };

  // emit/send events to the server
  const sendMessage = () => {

    if (message.trim() && userProfile.userId !== null) {
      const newSentMessage = {
        message: message,
        username: userProfile.username,
      };
      socket.emit('messageFromServer', newSentMessage);
    }

    setMessage('');
  };


  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
  };



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
            // value={message}
            // onChange={changeMessageHandler}
            />
            <button className="btn btn-primary">Search</button>
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
                          className={`list-group-item d-flex align-items-center ${selectedConversation === conversationItem._id ? 'bg-success' : ''}`}
                          key={participantIndex}
                          onClick={() => handleConversationClick(conversationItem._id)}
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
          <div className="list-group">
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
          </div>
        </div>
        {/* <div className='col'>
          <div id='chat-window'>
            <div className="card" >
              <div className="card-body " style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                <h5 className="card-title">Chat</h5>
                <ul className="list-group">
                  {output?.map((message, index) => {
                    return (
                      <li className='list-group-item mb-2' key={index}>
                        <p>{message.username}: {message.message}</p>
                      </li>
                    )
                  })}
                </ul>
                <div className="fst-italic text-secondary" role="alert">
                  {feedback}
                </div>
              </div>
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
        </div> */}
        <div className='col'>
          <div id='chat-window'>
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
            <div className="card" >
              <div className="card-body " style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                <h5 className="card-title">Chat</h5>
                <ul className="list-group">
                  <span className="">User Name </span>
                </ul>
                <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                  <ul className="list-group">
                    {['hi', 'hello', 'how are you', 'a', 'b', 'c', 'dd'].map((message, index) => (
                      <li className='list-group-item mb-2' key={index}>
                        <p className='alert alert-primary'>me: {message}</p>
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
          </div>


        </div>
      </div>
    </div>
  )
}

export default TestChat