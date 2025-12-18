/**
 * Socket Context
 * React context for socket functionality
 */

import { createContext } from "react"
import type { NotificationType } from "./types/socket.types"

export interface SocketContextValue {
  // Notification methods
  notifications: {
    isConnected: boolean
    markAsRead: (notificationId: string) => void
    markAllAsRead: () => void
    deleteNotification: (notificationId: string) => void
    getUnreadCount: () => void
    subscribe: (types: NotificationType[]) => void
    unsubscribe: (types: NotificationType[]) => void
  }
  
  // Messaging methods
  messaging: {
    isConnected: boolean
    joinConversation: (conversationId: string) => void
    leaveConversation: (conversationId: string) => void
    sendMessage: (conversationId: string, message: string, attachments?: Array<{ url: string; type: string; name: string }>) => void
    sendTypingIndicator: (conversationId: string) => void
    stopTypingIndicator: (conversationId: string) => void
    markAsRead: (conversationId: string, messageId: string) => void
    deleteMessage: (conversationId: string, messageId: string) => void
    editMessage: (conversationId: string, messageId: string, newMessage: string) => void
    reactToMessage: (conversationId: string, messageId: string, reaction: string) => void
    getMessages: (conversationId: string, page?: number, limit?: number) => void
  }
  
  // Connection management
  isAuthenticated: boolean
  setIsAuthenticated: (authenticated: boolean) => void
}

export const SocketContext = createContext<SocketContextValue | null>(null)
