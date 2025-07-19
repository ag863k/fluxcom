import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ChatPage = ({ username, room, onLogout, onLeaveRoom }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClient = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${API_URL}/ws`),
            debug: (str) => console.log(new Date(), str),
            reconnectDelay: 5000,
        });

        client.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            
            // Subscribe to the specific room topic
            client.subscribe(`/topic/rooms/${room}`, (message) => {
                onMessageReceived(JSON.parse(message.body));
            });

            // Announce user joining the specific room
            client.publish({
                destination: `/app/chat.addUser/${room}`,
                body: JSON.stringify({ sender: username, type: 'JOIN', roomId: room })
            });
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        client.activate();
        stompClient.current = client;

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, [room, username]); // Reconnect if room or username changes

    const onMessageReceived = (payload) => {
        setMessages(prevMessages => [...prevMessages, payload]);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && stompClient.current?.active) {
            const chatMessage = {
                sender: username,
                content: newMessage,
                type: 'CHAT',
                roomId: room // Include the room ID in the message payload
            };
            stompClient.current.publish({
                destination: `/app/chat.sendMessage/${room}`,
                body: JSON.stringify(chatMessage)
            });
            setNewMessage('');
        }
    };

    const renderMessage = (msg, index) => {
        if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
            return (
                <div key={index} className="text-center my-2">
                    <p className="text-xs text-gray-400">{msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'}</p>
                </div>
            );
        }

        const isMyMessage = msg.sender === username;
        return (
            <div key={index} className={`flex my-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${isMyMessage ? 'bg-brand-accent text-white' : 'bg-medium-gray text-light-gray'}`}>
                    {!isMyMessage && <p className="text-xs font-bold text-blue-400">{msg.sender}</p>}
                    <p className="text-sm break-words">{msg.content}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <header className="flex items-center justify-between p-4 bg-dark-gray border-b border-gray-700 shadow-md">
                <div>
                    <h1 className="text-xl font-bold">Fluxcom</h1>
                    <p className="text-sm text-gray-400">Room: <span className="font-semibold text-light-gray">{room}</span></p>
                </div>
                <div>
                    <button onClick={onLeaveRoom} className="px-4 py-2 mr-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                        Leave Room
                    </button>
                    <button onClick={onLogout} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map(renderMessage)}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="p-4 bg-dark-gray border-t border-gray-700">
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-l-md bg-medium-gray border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        autoComplete="off"
                    />
                    <button type="submit" className="px-6 py-2 rounded-r-md bg-brand-accent text-white font-semibold hover:bg-blue-600">
                        Send
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatPage;