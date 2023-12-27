// ChatList.jsx
import React from 'react';
import ConversationItem from './ConversationItem';

const ChatList = ({
    conversations,
    selectedConversation,
    handleConversationClick,
    onlineUsers,
    currentUser,
}) => {
    return (
        <div className="list-group">
            
            <ul className="list-group">
                {conversations.map((conversationItem, index) => (
                    <ConversationItem
                        key={index}
                        conversation={conversationItem}
                        selectedConversation={selectedConversation}
                        handleConversationClick={handleConversationClick}
                        onlineUsers={onlineUsers}
                        currentUser={currentUser}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
