// ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const ChatWindow = ({
    selectedCurrentConversation,
    messageScrollDown,
    sendMessage,
    currentUser,
    changeMessageHandler,
}) => {
    return (
        <div id="chat-window">
            {selectedCurrentConversation ? (
                <div className="card">
                    <div className="card-body" style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                        <h5 className="card-title">Chat</h5>
                        <ul className="list-group">
                            <span className="">User Name </span>
                        </ul>
                        <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                            <ul className="list-group">
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
                        <div className="fst-italic text-secondary" role="alert"></div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Message"
                                aria-label="Message"
                                value={currentUser.message}
                                onChange={changeMessageHandler}
                            />
                            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body" style={{ minHeight: "50vh", maxHeight: "60vh" }}>
                        <h5 className="card-title">Chat</h5>
                        <ul className="list-group">
                            <span className="">Select a conversation </span>
                        </ul>
                        <div className="fst-italic text-secondary" role="alert"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
