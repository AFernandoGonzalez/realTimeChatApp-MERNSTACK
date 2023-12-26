import { useEffect, useState } from 'react'
import { useChat } from '../context/ChatContext';

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
    changeMessageHandler,
    sendMessage,
    handleConversationClick,
    changeSearchContactHandler,
    searchForContact
  } = useChat();


  useEffect(() => {
    // listen for events from the server
    socket

  }, []);



  console.log("Chat: ", conversation);
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
                          onClick={() => handleConversationClick(participant._id || selectedConversation)}
                        >
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
                  ))}
                </div>

              )}
            </ul>
          </div>
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

export default Chat