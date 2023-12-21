import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
import { useProfile } from '../context/ProfileContext';

const TestChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [userLogged, setUserLogged] = useState([]);
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState('');
  const { userProfile } = useProfile(null);

  const [username, setUsername] = useState('');

  console.log('userProfile: ', userProfile);
  const [userList, setUserList] = useState([]);

  console.log('userList: ', userList);

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

    newSocket.emit('loginUser', userProfile?.username);


    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userProfile]);


  const changeMessageHandler = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', {
      username: userProfile.username,
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





  return (
    <div className='container m-4'>
      <div className='row'>
        <div className='col-4'>
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Active User
            </a>
            
            <ul className="list-group">
              {userList.map((user, index) => (
                <a href="#" className="list-group-item list-group-item-action" key={index}>{user}</a>
              ))}
            </ul>
          </div>
        </div>
        <div className='col'>
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
              {/* <input
                type="text"
                className="form-control"
                placeholder="Handle"
                aria-label="Handle"
                value={handle}
                onChange={changeHandler}
              /> */}
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
  )
}

export default TestChat