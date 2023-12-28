// MessageItem.jsx
import React, { useEffect } from 'react';
import './MessageItem.css';
import { formatTimestamp } from '../Utils';

const MessageItem = ({ message, currentUser }) => {


    const isCurrentUser = message.sender._id === currentUser.userId;

    return (
        <li className={`chat-conversation-list mb-2 ${isCurrentUser ? 'right' : 'left'}`}>
            <div className={`chat-list ${isCurrentUser ? 'right' : 'left'}`}>
                <div className='conversation-list'>
                    {isCurrentUser ? (
                        <>
                            <div className='user-chat-messages'>
                                <div className='conversation-wrap'>
                                    <p className="messageText">{message.text}</p>
                                </div>
                                <div className='conversation-name'>
                                    <small className="text-muted mb-0 me-2">{formatTimestamp(message.createdAt)}</small>
                                    <strong> <small className=" mb-0 me-2">You</small></strong>
                                </div>
                            </div>
                            <div className='user-avatar'>
                                <img src={message.sender.profilePicture} alt="avatar" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='user-avatar'>
                                <img src={message.sender.profilePicture} alt="avatar" />
                            </div>
                            <div className='user-chat-messages'>
                                <div className='conversation-wrap'>
                                    <p className="">{message.text}</p>
                                </div>
                                <div className='conversation-name'>
                                    <strong> <small className=" mb-0 me-2">{message.sender.username}</small></strong>
                                    <small className="text-muted mb-0 me-2">{formatTimestamp(message.createdAt)}</small>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </li>


    );
};

export default MessageItem;
