import React, { useState } from 'react';

const Chat = ({ user, onLogout }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: 'System',
      content: `Welcome to FluxCom, ${user.username}!`,
      timestamp: new Date()
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        username: user.username,
        content: message,
        timestamp: new Date(),
        own: true
      }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className="chat-header">
          <h2 className="chat-title">FluxCom Chat</h2>
          <button onClick={onLogout} className="perplexity-button">
            Logout
          </button>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.own ? 'own' : ''}`}>
              <strong>{msg.username}:</strong> {msg.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="perplexity-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
