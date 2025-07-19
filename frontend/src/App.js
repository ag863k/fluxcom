import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import ChatPage from './components/ChatPage';
import RoomSelectionPage from './components/RoomSelectionPage';

function App() {
    const [token, setToken] = useState(localStorage.getItem('fluxcom-token'));
    const [username, setUsername] = useState(localStorage.getItem('fluxcom-username'));
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('fluxcom-token', token);
        } else {
            localStorage.removeItem('fluxcom-token');
        }
        if (username) {
            localStorage.setItem('fluxcom-username', username);
        } else {
            localStorage.removeItem('fluxcom-username');
        }
    }, [token, username]);

    const handleLoginSuccess = (newToken, newUsername) => {
        setToken(newToken);
        setUsername(newUsername);
    };

    const handleLogout = () => {
        setToken(null);
        setUsername(null);
        setRoom(null);
    };

    const handleJoinRoom = (roomName) => {
        setRoom(roomName);
    };

    const handleLeaveRoom = () => {
        setRoom(null);
    };

    // Main render logic
    if (!token || !username) {
        // If not logged in, show AuthPage
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    } else if (!room) {
        // If logged in but not in a room, show RoomSelectionPage
        // Pass the onLogout function as a prop
        return <RoomSelectionPage onJoinRoom={handleJoinRoom} onLogout={handleLogout} />;
    } else {
        // If logged in AND in a room, show ChatPage
        return <ChatPage username={username} room={room} onLogout={handleLogout} onLeaveRoom={handleLeaveRoom} />;
    }
}

export default App;