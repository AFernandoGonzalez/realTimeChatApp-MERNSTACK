// ConversationItem.jsx
import React from 'react';
import './ConverstionItem.css'
const ConversationItem = ({
    conversation,
    selectedConversation,
    handleConversationClick,
    onlineUsers,
    currentUser,
}) => {
    return (
        <div>
            {conversation.participants.map((participant, participantIndex) => (
                <div
                    className={`list-group-item d-flex align-items-center ${selectedConversation === participant._id ? 'bg-primary-subtle' : ''}`}
                    key={participantIndex}
                    onClick={() => handleConversationClick(participant._id || selectedConversation)}
                >


                    <div className="avatar-container">
                        <img
                            className="rounded-circle avatar"
                            style={{ width: "50px", height: "50px" }}
                            src={participant.profilePicture}
                            alt=""
                        />
                        <span
                            className={`status-indicator ${onlineUsers.includes(participant._id) ? 'online' : 'offline'}`}
                        ></span>
                    </div>


                    <div className="ms-3">
                        <h6 className="participant-name">{participant.username}</h6>
                        {conversation.lastMessage && (
                            <div>
                                {/* {currentUser.userId !== conversation.lastMessage.sender ? "You" : ""} */}
                                <p className="last-message-text">
                                    Last message: {conversation.lastMessage.text}
                                </p>
                            </div>
                        )}
                    </div>

                    
                </div>
            ))}
        </div>
    );
};

export default ConversationItem;
