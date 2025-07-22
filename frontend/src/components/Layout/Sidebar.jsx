import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Button from '../UI/Button';

const Sidebar = ({ currentRoom, onRoomSelect }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      // Fallback to default rooms
      setRooms([
        { id: 1, name: 'General', description: 'General discussion' },
        { id: 2, name: 'Random', description: 'Random conversations' },
        { id: 3, name: 'Tech', description: 'Technology discussions' },
        { id: 4, name: 'Music', description: 'Music and entertainment' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      const response = await api.post('/rooms', {
        name: newRoomName,
        description: `${newRoomName} discussion`
      });
      setRooms(prev => [response.data, ...prev]);
      setNewRoomName('');
      setShowCreateRoom(false);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3>Channels</h3>
          <button
            className="create-room-btn"
            onClick={() => setShowCreateRoom(!showCreateRoom)}
            title="Create new room"
          >
            +
          </button>
        </div>
        
        {showCreateRoom && (
          <form onSubmit={handleCreateRoom} className="create-room-form">
            <input
              type="text"
              placeholder="Room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              maxLength={20}
            />
            <div className="create-room-actions">
              <Button type="submit" size="sm" disabled={!newRoomName.trim()}>
                Create
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCreateRoom(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        
        <div className="rooms-list">
          {loading ? (
            <div className="loading">Loading rooms...</div>
          ) : (
            rooms.map(room => (
              <div
                key={room.id}
                className={`room-item ${currentRoom?.id === room.id ? 'active' : ''}`}
                onClick={() => onRoomSelect(room)}
              >
                <div className="room-icon">#</div>
                <div className="room-info">
                  <span className="room-name">{room.name}</span>
                  {room.description && (
                    <span className="room-description">{room.description}</span>
                  )}
                </div>
                <div className="room-badge">
                  {Math.floor(Math.random() * 50)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
