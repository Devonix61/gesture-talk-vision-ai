import { v4 as uuidv4 } from 'uuid';
import { io as socketIO, Socket as SocketType } from 'socket.io-client';

// Socket connection constants
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

// Socket instance
let socket: SocketType | null = null;

// Connection status
let isConnected = false;

/**
 * Initialize socket connection
 */
export const initializeSocket = () => {
  if (!socket) {
    socket = socketIO(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      isConnected = true;
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      isConnected = false;
    });

    socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  return socket;
};

/**
 * Check if socket is connected
 */
export const isSocketConnected = () => {
  return isConnected;
};

/**
 * Send a message to the server
 */
export const sendMessage = (event: string, data: any) => {
  if (!socket || !isConnected) {
    console.error('Socket not connected. Cannot send message.');
    return false;
  }

  // Add unique ID to message
  const messageData = {
    ...data,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };

  socket.emit(event, messageData);
  return true;
};

/**
 * Subscribe to events
 */
export const subscribeToEvent = (event: string, callback: (data: any) => void) => {
  if (!socket) {
    console.error('Socket not initialized. Cannot subscribe to event.');
    return () => {}; // Return empty unsubscribe function
  }

  socket.on(event, callback);

  // Return unsubscribe function
  return () => {
    socket.off(event, callback);
  };
};

/**
 * Close socket connection
 */
export const closeConnection = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    isConnected = false;
  }
};

export default {
  initializeSocket,
  isSocketConnected,
  sendMessage,
  subscribeToEvent,
  closeConnection,
};
