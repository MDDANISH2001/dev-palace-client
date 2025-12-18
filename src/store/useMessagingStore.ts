/**
 * Messaging Store
 * Zustand store for managing messaging/chat state
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Message, Conversation, TypingData } from "../socket/types/socket.types"

interface MessagingState {
  // State
  conversations: Conversation[]
  messages: Record<string, Message[]> // conversationId -> messages
  activeConversation: string | null
  typingUsers: Record<string, TypingData[]> // conversationId -> typing users
  onlineUsers: Set<string>
  isConnected: boolean

  // Actions
  setConversations: (conversations: Conversation[]) => void
  addConversation: (conversation: Conversation) => void
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
  setActiveConversation: (conversationId: string | null) => void
  
  addMessage: (message: Message) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void
  deleteMessage: (conversationId: string, messageId: string) => void
  markMessageAsRead: (conversationId: string, messageId: string) => void
  
  setUserTyping: (conversationId: string, typingData: TypingData) => void
  removeUserTyping: (conversationId: string, userId: string) => void
  
  setUserOnline: (userId: string) => void
  setUserOffline: (userId: string) => void
  
  setConnected: (connected: boolean) => void
  clearMessaging: () => void
}

export const useMessagingStore = create<MessagingState>()(
  devtools(
    (set) => ({
      // Initial State
      conversations: [],
      messages: {},
      activeConversation: null,
      typingUsers: {},
      onlineUsers: new Set(),
      isConnected: false,

      // Set all conversations
      setConversations: (conversations) =>
        set({
          conversations,
        }),

      // Add a new conversation
      addConversation: (conversation) =>
        set((state) => {
          const exists = state.conversations.some((c) => c.conversationId === conversation.conversationId)
          if (exists) return state

          return {
            conversations: [conversation, ...state.conversations],
          }
        }),

      // Update a conversation
      updateConversation: (conversationId, updates) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.conversationId === conversationId ? { ...c, ...updates } : c
          ),
        })),

      // Set active conversation
      setActiveConversation: (conversationId) =>
        set({
          activeConversation: conversationId,
        }),

      // Add a new message
      addMessage: (message) =>
        set((state) => {
          const conversationMessages = state.messages[message.conversationId] || []
          
          // Check if message already exists
          const exists = conversationMessages.some((m) => m.messageId === message.messageId)
          if (exists) return state

          return {
            messages: {
              ...state.messages,
              [message.conversationId]: [...conversationMessages, message],
            },
            // Update conversation's last message
            conversations: state.conversations.map((c) =>
              c.conversationId === message.conversationId
                ? {
                    ...c,
                    lastMessage: message,
                    unreadCount: message.senderId !== c.conversationId ? c.unreadCount + 1 : c.unreadCount,
                  }
                : c
            ),
          }
        }),

      // Set messages for a conversation
      setMessages: (conversationId, messages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: messages,
          },
        })),

      // Update a message
      updateMessage: (conversationId, messageId, updates) =>
        set((state) => {
          const conversationMessages = state.messages[conversationId] || []
          
          return {
            messages: {
              ...state.messages,
              [conversationId]: conversationMessages.map((m) =>
                m.messageId === messageId ? { ...m, ...updates } : m
              ),
            },
          }
        }),

      // Delete a message
      deleteMessage: (conversationId, messageId) =>
        set((state) => {
          const conversationMessages = state.messages[conversationId] || []
          
          return {
            messages: {
              ...state.messages,
              [conversationId]: conversationMessages.filter((m) => m.messageId !== messageId),
            },
          }
        }),

      // Mark message as read
      markMessageAsRead: (conversationId, messageId) =>
        set((state) => {
          const conversationMessages = state.messages[conversationId] || []
          
          return {
            messages: {
              ...state.messages,
              [conversationId]: conversationMessages.map((m) =>
                m.messageId === messageId ? { ...m, read: true } : m
              ),
            },
            conversations: state.conversations.map((c) =>
              c.conversationId === conversationId
                ? { ...c, unreadCount: Math.max(0, c.unreadCount - 1) }
                : c
            ),
          }
        }),

      // Set user typing
      setUserTyping: (conversationId, typingData) =>
        set((state) => {
          const currentTyping = state.typingUsers[conversationId] || []
          const exists = currentTyping.some((t) => t.userId === typingData.userId)
          
          if (exists) return state

          return {
            typingUsers: {
              ...state.typingUsers,
              [conversationId]: [...currentTyping, typingData],
            },
          }
        }),

      // Remove user typing
      removeUserTyping: (conversationId, userId) =>
        set((state) => {
          const currentTyping = state.typingUsers[conversationId] || []
          
          return {
            typingUsers: {
              ...state.typingUsers,
              [conversationId]: currentTyping.filter((t) => t.userId !== userId),
            },
          }
        }),

      // Set user online
      setUserOnline: (userId) =>
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers)
          newOnlineUsers.add(userId)
          return { onlineUsers: newOnlineUsers }
        }),

      // Set user offline
      setUserOffline: (userId) =>
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers)
          newOnlineUsers.delete(userId)
          return { onlineUsers: newOnlineUsers }
        }),

      // Set connection status
      setConnected: (connected) =>
        set({
          isConnected: connected,
        }),

      // Clear all messaging data
      clearMessaging: () =>
        set({
          conversations: [],
          messages: {},
          activeConversation: null,
          typingUsers: {},
          onlineUsers: new Set(),
        }),
    }),
    { name: "MessagingStore" }
  )
)
