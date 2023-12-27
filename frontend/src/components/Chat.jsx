import { useEffect, useState, useRef } from 'react'
import { useChat } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Chat.css'
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';


const Chat = () => {

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
    onlineUsers, setOnlineUsers,
    changeMessageHandler,
    sendMessage,
    handleConversationClick,
    changeSearchContactHandler,
    searchForContact
  } = useChat();

  const messageScrollDown = useRef(null);

  useEffect(() => {
    socket
  }, [socket]);

  useEffect(() => {
    if (messageScrollDown.current) {
      messageScrollDown.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCurrentConversation?.messages]);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-4 mb-3 mb-md-0'>
          <h4 className="card-title mb-4">Messages</h4>
          <div className="input-group mb-4 no-focus-outline">
            <input
              type="text"
              className="form-control"
              placeholder="Search Contact"
              aria-label="Search Contact"
              value={searchText}
              onChange={changeSearchContactHandler}
            />
            <button className="btn custom-btn" onClick={searchForContact}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          {/* <div className="list-group">
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
                  {conversation?.map((conversationItem, index) => {
                    return (
                      <div key={index}>
                        {conversationItem.participants.map((participant, participantIndex) => (
                          <div
                            className={`list-group-item d-flex align-items-center ${selectedConversation === participant._id ? 'bg-primary-subtle' : ''}`}
                            key={participantIndex}
                            onClick={() => handleConversationClick(participant._id || selectedConversation)}
                          >
                            {onlineUsers.includes(participant._id) ? (
                              <span className="badge bg-primary rounded-circle me-2">Online</span>
                            ) : (
                              <span className="badge bg-secondary rounded-circle me-2">Offline</span>
                            )}
                            <img className="rounded-circle" style={{ width: "30px", height: "30px" }} src={participant.profilePicture} alt=""></img>
                            <div className="ms-2">
                              <a href="" className="list-group-item-action">{participant.username}</a>
                              {conversationItem.lastMessage && (
                                <div>
                                  {currentUser.userId !== conversationItem.lastMessage.sender ? "You" : "---"}
                                  <p className="alert alert-primary m-0" style={{ fontSize: "12px" }}>
                                    Last message: {conversationItem.lastMessage.text}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </ul>
          </div> */}
          <ChatList
            conversations={conversation}
            selectedConversation={selectedConversation}
            handleConversationClick={handleConversationClick}
            onlineUsers={onlineUsers}
            currentUser={currentUser}
          />
        </div>

        <div className='col-md-8'>
          {/* <div id='chat-window'>
            {selectedCurrentConversation ? (
              <div className="card" >
                <div className="card-body " style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                  <h5 className="card-title">Chat</h5>
                  <ul className="list-group">
                    <span className="">User Name </span>
                  </ul>
                  <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                    <ul className="list-group">
                      {selectedConversation.length > 0 ? (
                        selectedCurrentConversation?.messages?.map((message, index) => (
                          <li className='list-group-item mb-2' key={index}
                            direction={message.sender._id === currentUser.userId ? 'right' : 'left'}
                            ref={index === selectedCurrentConversation.messages.length - 1 ? messageScrollDown : null}
                          >
                            {message.sender._id === currentUser.userId ? (
                              <p className='alert alert-primary text-end'>You: {message.text}</p>
                            ) : (
                              <p className='alert alert-secondary text-start'>{message.sender.username}: {message.text}</p>
                            )}
                          </li>
                        ))
                      ) : (
                        <li className='list-group-item mb-2' key={index}>
                          {message.sender._id === currentUser.userId ? (
                            <p className='alert alert-primary text-end'>You: {message.text}</p>
                          ) : (
                            <p className='alert alert-secondary text-start'>{message.sender.username}: {message.text}</p>
                          )}
                        </li>
                      )}
                      <div ref={messageScrollDown} />
                    </ul>
                  </div>
                  <div className="fst-italic text-secondary" role="alert"></div>
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
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
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
                  <div className="fst-italic text-secondary" role="alert"></div>
                </div>
              </div>
            )}
          </div> */}
          <ChatWindow
            selectedCurrentConversation={selectedCurrentConversation}
            conversation={conversation}
            currentUser={currentUser}
            messageScrollDown={messageScrollDown}
            sendMessage={sendMessage}
            changeMessageHandler={changeMessageHandler}
          />
        </div>
      </div>
    </div>

    // <div className="container mt-4">
    //   <div className="row">
    //     <div className="col-md-4 mb-3 mb-md-0">
    //       <h4 className="card-title mb-4">Messages</h4>
    //       <div className="input-group mb-4 no-focus-outline">
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Search Contact"
    //           aria-label="Search Contact"
    //           value={currentUser.searchText}
    //           onChange={changeSearchContactHandler}
    //         />
    //         <button className="btn custom-btn" onClick={searchForContact}>
    //           <FontAwesomeIcon icon={faSearch} />
    //         </button>
    //       </div>
    //       {/* Use the ChatList component */}
    //       <ChatList
    //         conversations={conversation}
    //         selectedConversation={selectedConversation}
    //         handleConversationClick={handleConversationClick}
    //         onlineUsers={onlineUsers}
    //         currentUser={currentUser}
    //       />
    //     </div>

    //     <div className="col-md-8">
    //       {/* Use the ChatWindow component */}
    //       <ChatWindow
    //         selectedCurrentConversation={selectedConversation}
    //         messageScrollDown={messageScrollDown}
    //         sendMessage={sendMessage}
    //         currentUser={currentUser}
    //         changeMessageHandler={changeMessageHandler}
    //       />
    //     </div>
    //   </div>
    // </div>

  )
}

export default Chat