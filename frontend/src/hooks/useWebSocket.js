import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useWebSocket = (roomId = 1) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const connectWebSocket = useCallback(() => {
    if (stompClientRef.current?.connected) return;

    const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8080';
    const socket = new SockJS(`${wsUrl}/ws`);
    
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);
        
        if (roomId) {
          subscriptionRef.current = client.subscribe(`/topic/room/${roomId}`, (message) => {
            try {
              const newMessage = JSON.parse(message.body);
              setMessages(prev => [...prev, newMessage]);
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          });
        }
      },
      onDisconnect: () => setIsConnected(false),
      onStompError: (error) => console.error('STOMP error:', error),
      reconnectDelay: 5000,
    });

    client.activate();
    stompClientRef.current = client;
  }, [roomId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      connectWebSocket();
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback((content) => {
    if (stompClientRef.current?.connected && content.trim()) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const message = {
        content: content.trim(),
        sender: { 
          username: user.username 
        },
        timestamp: new Date().toISOString()
      };
      
      stompClientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message)
      });
    }
  }, []);

  return { messages, sendMessage, isConnected };
};
