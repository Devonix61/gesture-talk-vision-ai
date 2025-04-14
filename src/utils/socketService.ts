
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Socket service for real-time communication

// Events types
export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  TRANSLATION = 'translation',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  ROOM_MESSAGE = 'room_message',
  PRIVATE_MESSAGE = 'private_message',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  TYPING = 'typing'
}

// Message interface
export interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
  translatedFrom?: string;
}

// User interface
export interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

// Socket service class
class SocketService {
  private socket: Socket | null = null;
  private userId: string = uuidv4();
  private username: string = 'Guest-' + Math.floor(Math.random() * 1000);
  
  // Connect to socket server
  connect(serverUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Close existing connection if any
      this.disconnect();
      
      // Create new connection
      this.socket = io(serverUrl, {
        transports: ['websocket'],
        autoConnect: true
      });
      
      // Handle connection
      this.socket.on(SocketEvent.CONNECT, () => {
        console.log('Socket connected successfully');
        resolve(true);
      });
      
      // Handle errors
      this.socket.on(SocketEvent.ERROR, (error) => {
        console.error('Socket connection error:', error);
        resolve(false);
      });
      
      // Handle disconnection
      this.socket.on(SocketEvent.DISCONNECT, (reason) => {
        console.log('Socket disconnected:', reason);
      });
    });
  }
  
  // Disconnect socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  // Set user info
  setUserInfo(username: string): void {
    this.username = username;
  }
  
  // Join a room
  joinRoom(roomId: string): void {
    if (!this.socket) return;
    
    this.socket.emit(SocketEvent.JOIN_ROOM, {
      roomId,
      userId: this.userId,
      username: this.username
    });
  }
  
  // Leave a room
  leaveRoom(roomId: string): void {
    if (!this.socket) return;
    
    this.socket.emit(SocketEvent.LEAVE_ROOM, {
      roomId,
      userId: this.userId
    });
  }
  
  // Send message to a room
  sendRoomMessage(roomId: string, text: string, translatedFrom?: string): void {
    if (!this.socket) return;
    
    const message: Message = {
      id: uuidv4(),
      userId: this.userId,
      username: this.username,
      text,
      timestamp: Date.now(),
      translatedFrom
    };
    
    this.socket.emit(SocketEvent.ROOM_MESSAGE, {
      roomId,
      message
    });
  }
  
  // Send private message to a user
  sendPrivateMessage(targetUserId: string, text: string, translatedFrom?: string): void {
    if (!this.socket) return;
    
    const message: Message = {
      id: uuidv4(),
      userId: this.userId,
      username: this.username,
      text,
      timestamp: Date.now(),
      translatedFrom
    };
    
    this.socket.emit(SocketEvent.PRIVATE_MESSAGE, {
      targetUserId,
      message
    });
  }
  
  // Send translation to server
  sendTranslation(text: string, sourceLanguage: string): void {
    if (!this.socket) return;
    
    this.socket.emit(SocketEvent.TRANSLATION, {
      userId: this.userId,
      text,
      sourceLanguage
    });
  }
  
  // Register event listener
  on(event: SocketEvent, callback: (data: any) => void): void {
    if (!this.socket) return;
    
    this.socket.on(event, callback);
  }
  
  // Remove event listener
  off(event: SocketEvent): void {
    if (!this.socket) return;
    
    this.socket.off(event);
  }
  
  // Check if socket is connected
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
  
  // Get user ID
  getUserId(): string {
    return this.userId;
  }
  
  // Get username
  getUsername(): string {
    return this.username;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
