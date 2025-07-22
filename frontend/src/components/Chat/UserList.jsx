import React from 'react';

const UserList = ({ users = [] }) => {
  const onlineUsers = users.filter(user => user.online);
  const offlineUsers = users.filter(user => !user.online);

  const UserItem = ({ user, isOnline }) => (
    <div className={`user-item ${isOnline ? 'online' : 'offline'}`}>
      <div className="user-avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={user.username} />
        ) : (
          <div className="avatar-placeholder">
            {user.username?.charAt(0)?.toUpperCase()}
          </div>
        )}
        <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
      </div>
      <div className="user-info">
        <span className="username">{user.username}</span>
        <span className="user-status">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h4>Members ({users.length})</h4>
      </div>
      
      <div className="users-container">
        {onlineUsers.length > 0 && (
          <div className="user-section">
            <div className="section-header">
              <span>Online — {onlineUsers.length}</span>
            </div>
            {onlineUsers.map(user => (
              <UserItem key={user.id} user={user} isOnline={true} />
            ))}
          </div>
        )}
        
        {offlineUsers.length > 0 && (
          <div className="user-section">
            <div className="section-header">
              <span>Offline — {offlineUsers.length}</span>
            </div>
            {offlineUsers.map(user => (
              <UserItem key={user.id} user={user} isOnline={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
