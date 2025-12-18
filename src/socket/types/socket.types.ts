/**
 * Socket.IO Type Definitions
 * Comprehensive types for all socket events and data structures
 */

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType =
  | "project_update"
  | "project_created"
  | "project_assigned"
  | "message"
  | "payment"
  | "milestone"
  | "review"
  | "system"
  | "other"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  timestamp: string
  read?: boolean
  userId?: string
}

export interface NotificationConnectedData {
  userId: string
  userType: "client" | "developer"
  timestamp: string
}

export interface NotificationUnreadCountData {
  count: number
  timestamp: string
}

export interface NotificationReadData {
  notificationId: string
  success: boolean
}

export interface NotificationDeleteData {
  notificationId: string
  success: boolean
}

// Notification Events - Client to Server
export interface NotificationClientEvents {
  "notification:read": (data: { notificationId: string }) => void
  "notification:readAll": () => void
  "notification:delete": (data: { notificationId: string }) => void
  "notification:getUnreadCount": () => void
  "notification:subscribe": (data: { types: NotificationType[] }) => void
  "notification:unsubscribe": (data: { types: NotificationType[] }) => void
}

// Notification Events - Server to Client
export interface NotificationServerEvents {
  "notification:connected": (data: NotificationConnectedData) => void
  "notification:new": (data: Notification) => void
  "notification:unreadCount": (data: NotificationUnreadCountData) => void
  "notification:readSuccess": (data: NotificationReadData) => void
  "notification:deleteSuccess": (data: NotificationDeleteData) => void
  "notification:error": (data: { message: string; details?: unknown }) => void
}

// ============================================
// MESSAGING TYPES
// ============================================

export interface Message {
  messageId: string
  conversationId: string
  senderId: string
  senderName: string
  message: string
  attachments?: Array<{
    url: string
    type: string
    name: string
  }>
  timestamp: string
  read?: boolean
  edited?: boolean
  reactions?: Array<{
    userId: string
    reaction: string
  }>
}

export interface Conversation {
  conversationId: string
  participants: Array<{
    userId: string
    userName: string
    userType: "client" | "developer"
  }>
  lastMessage?: Message
  unreadCount: number
  timestamp: string
}

export interface TypingData {
  userId: string
  userName: string
  conversationId: string
}

export interface UserStatusData {
  userId: string
  status: "online" | "offline" | "away"
  timestamp: string
}

export interface MessageConnectedData {
  userId: string
  userType: "client" | "developer"
  timestamp: string
}

// Messaging Events - Client to Server
export interface MessagingClientEvents {
  "message:joinConversation": (data: { conversationId: string }) => void
  "message:leaveConversation": (data: { conversationId: string }) => void
  "message:send": (data: {
    conversationId: string
    message: string
    attachments?: Array<{ url: string; type: string; name: string }>
  }) => void
  "message:typing": (data: { conversationId: string }) => void
  "message:stopTyping": (data: { conversationId: string }) => void
  "message:markAsRead": (data: {
    conversationId: string
    messageId: string
  }) => void
  "message:delete": (data: {
    conversationId: string
    messageId: string
  }) => void
  "message:edit": (data: {
    conversationId: string
    messageId: string
    newMessage: string
  }) => void
  "message:react": (data: {
    conversationId: string
    messageId: string
    reaction: string
  }) => void
  "message:getMessages": (data: {
    conversationId: string
    page?: number
    limit?: number
  }) => void
}

// Messaging Events - Server to Client
export interface MessagingServerEvents {
  "message:connected": (data: MessageConnectedData) => void
  "message:new": (data: Message) => void
  "message:userTyping": (data: TypingData) => void
  "message:userStoppedTyping": (data: { userId: string; conversationId: string }) => void
  "message:read": (data: {
    messageId: string
    conversationId: string
    readBy: string
    timestamp: string
  }) => void
  "message:deleted": (data: {
    messageId: string
    conversationId: string
    deletedBy: string
    timestamp: string
  }) => void
  "message:edited": (data: {
    messageId: string
    conversationId: string
    newMessage: string
    editedBy: string
    timestamp: string
  }) => void
  "message:reaction": (data: {
    messageId: string
    conversationId: string
    userId: string
    reaction: string
    timestamp: string
  }) => void
  "message:userStatusChanged": (data: UserStatusData) => void
  "message:history": (data: {
    conversationId: string
    messages: Message[]
    page: number
    totalPages: number
  }) => void
  "message:error": (data: { message: string; details?: unknown }) => void
}

// ============================================
// SOCKET CONNECTION TYPES
// ============================================

export interface SocketConnectionOptions {
  auth?: {
    token?: string
  }
  withCredentials: boolean
  reconnection: boolean
  reconnectionAttempts: number
  reconnectionDelay: number
  transports: string[]
}

export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error"

export interface SocketError {
  message: string
  type: "connection" | "authentication" | "server" | "unknown"
  details?: unknown
}

// ============================================
// SOCKET NAMESPACES
// ============================================

export const SOCKET_NAMESPACES = {
  NOTIFICATIONS: "/notifications",
  MESSAGING: "/messaging",
} as const

export type SocketNamespace = typeof SOCKET_NAMESPACES[keyof typeof SOCKET_NAMESPACES]
