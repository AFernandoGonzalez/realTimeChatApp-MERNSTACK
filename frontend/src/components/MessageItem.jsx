// MessageItem.jsx
import React, { useEffect } from 'react';
import './MessageItem.css';
const MessageItem = ({ message, currentUser}) => {
    // useEffect(() => {
    //     if (isLast && messageScrollDown.current) {
    //         messageScrollDown.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [isLast]);

    return (
        <li className=" mb-2" direction={message.sender._id === currentUser.userId ? 'right' : 'left'}>
            {message.sender._id === currentUser.userId ? (
                <p className="alert alert-primary text-end">You: {message.text}</p>
            ) : (
                <p className="alert alert-secondary text-start">{message.sender.username}: {message.text}</p>
            )}
        </li>
        

    );
};

export default MessageItem;
