import { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { Search } from './Search';
import './Chat.css'


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
    <div className=''>
      <div className='layout-wrapper '>

        <div className='chat-left-sidebar mt-4'>
          <h4 className="card-title mb-4">Messages</h4>
          <Search
            searchText={searchText}
            changeSearchContactHandler={changeSearchContactHandler}
            searchForContact={searchForContact}
          />
          <ChatList
            conversations={conversation}
            selectedConversation={selectedConversation}
            handleConversationClick={handleConversationClick}
            onlineUsers={onlineUsers}
            currentUser={currentUser}
          />
        </div>

        <div className='user-right-chat'>
          <ChatWindow
            selectedCurrentConversation={selectedCurrentConversation}
            conversation={conversation}
            currentUser={currentUser}
            messageScrollDown={messageScrollDown}
            sendMessage={sendMessage}
            message={message}
            changeMessageHandler={changeMessageHandler}
          />
        </div>

      </div>
    </div>
  )
}

export default Chat