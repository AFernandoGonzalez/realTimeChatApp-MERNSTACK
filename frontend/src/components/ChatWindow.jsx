// ChatWindow.jsx
import React from 'react';
import MessageItem from './MessageItem';
import './ChatWindow.css';

const ChatWindow = ({
    selectedCurrentConversation,
    currentUser,
    message,
    changeMessageHandler,
    sendMessage,
    messageScrollDown,
}) => {

    
    return (
        <div id="chat-window" className="">
            <div id='chat-content'></div>

            {selectedCurrentConversation ? (
                <div className="chat-user-section">

                    <div className='chat-user-info'>
                        <div className="">
                            <span className="text-info">{selectedCurrentConversation.otherUser || "Get user name"}</span>
                        </div>

                    </div>

                    <div className="chat-user-messages">

                        <div className="chat-content">
                            <ul className="list-group chat-messages-list">
                                {/* Render messages */}
                                {selectedCurrentConversation?.messages?.map((message, index) => (
                                    <MessageItem
                                        key={index}
                                        message={message}
                                        currentUser={currentUser}
                                        isLast={index === selectedCurrentConversation.messages.length - 1}
                                        messageScrollDown={messageScrollDown}
                                    />
                                ))}
                                <div ref={messageScrollDown} />
                            </ul>
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

                </div>
            ) : (
                <div className="chat-welcome-section">
                    <div className="card-container">
                        <h4>Welcome to ChatAppeando</h4>
                        <p className="text-muted  text-center m-4">Experience the joy of connecting with others in a seamless and delightful environment. Our platform is designed with your comfort in mind, ensuring a smooth and enjoyable chatting experience.</p>
                        <button type="button" className="btn btn-primary">Get Started</button>
                    </div>
                </div >
            )}
        </div >
    );
};

export default ChatWindow;
