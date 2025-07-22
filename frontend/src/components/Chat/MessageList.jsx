import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="welcome-message">
          <h3>Welcome to FluxCom!</h3>
          <p>Start a conversation by typing a message below.</p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={`message ${
            message.sender?.username === currentUser?.username ? 'own' : 'other'
          }`}
        >
          <div className="message-content">
            <div className="message-header">
              <span className="sender-name">{message.sender?.username}</span>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
            <p className="message-text">{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
