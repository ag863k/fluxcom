import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom = () => {
  const { user } = useAuth();
  const { messages, sendMessage, isConnected } = useWebSocket(1);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  const handleSendMessage = (content) => {
    if (isConnected) {
      sendMessage(content);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className="chat-header">
          <h2 className="chat-title">General Chat</h2>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
        
        <MessageList messages={allMessages} currentUser={user} />
        <MessageInput onSendMessage={handleSendMessage} disabled={!isConnected} />
      </div>
    </div>
  );
};

export default ChatRoom;
