import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscribers = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      const socket = new SockJS(`${WS_BASE_URL}/ws`);
      
      this.client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          this.connected = true;
          console.log('WebSocket connected');
          resolve();
        },
        onDisconnect: () => {
          this.connected = false;
          console.log('WebSocket disconnected');
        },
        onStompError: (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
    }
  }

  subscribe(destination, callback) {
    if (this.client && this.connected) {
      const subscription = this.client.subscribe(destination, callback);
      this.subscribers.set(destination, subscription);
      return subscription;
    }
  }

  unsubscribe(destination) {
    const subscription = this.subscribers.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.subscribers.delete(destination);
    }
  }

  send(destination, message) {
    if (this.client && this.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(message)
      });
    }
  }

  isConnected() {
    return this.connected;
  }
}

export const wsService = new WebSocketService();
