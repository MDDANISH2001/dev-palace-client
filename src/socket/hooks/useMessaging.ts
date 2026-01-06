/**
 * Messaging Socket Hook
 * Manages messaging/chat socket events and integrates with messaging store
 */

import { useEffect, useCallback } from "react"
import { useSocket } from "./useSocket"
import { useMessagingStore } from "@/store/useMessagingStore"
import { SOCKET_NAMESPACES } from "../types/socket.types"
import type {
  MessagingClientEvents,
  MessagingServerEvents,
} from "../types/socket.types"

interface UseMessagingOptions {
  enabled?: boolean
}

interface UseMessagingReturn {
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

export const useMessaging = ({
  enabled = false,
}: UseMessagingOptions = {}): UseMessagingReturn => {
  const {
    addMessage,
    updateMessage,
    deleteMessage: deleteMessageStore,
    markMessageAsRead,
    setUserTyping,
    removeUserTyping,
    setUserOnline,
    setUserOffline,
    setConnected,
    clearMessaging,
    setMessages,
  } = useMessagingStore()

  const { socket, isConnected } = useSocket({
    namespace: SOCKET_NAMESPACES.MESSAGING,
    enabled,
    onConnect: () => {
      // console.log("✅ Messaging socket connected")
      setConnected(true)
    },
    onDisconnect: () => {
      // console.log("❌ Messaging socket disconnected")
      setConnected(false)
    },
    onError: (error) => {
      console.error("Messaging socket error:", error)
      setConnected(false)
    },
  })

  // Setup event listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    // Connection confirmation
    const handleConnected: MessagingServerEvents["message:connected"] = (data) => {
      console.log("💬 Messaging service connected:", data)
      setConnected(true)
    }

    // New message received
    const handleNewMessage: MessagingServerEvents["message:new"] = (message) => {
      // console.log("📨 New message:", message)
      addMessage(message)
    }

    // User typing
    const handleUserTyping: MessagingServerEvents["message:userTyping"] = (data) => {
      // console.log("⌨️ User typing:", data.userName)
      setUserTyping(data.conversationId, data)
    }

    // User stopped typing
    const handleUserStoppedTyping: MessagingServerEvents["message:userStoppedTyping"] = (data) => {
      // console.log("✋ User stopped typing:", data.userId)
      removeUserTyping(data.conversationId, data.userId)
    }

    // Message read
    const handleMessageRead: MessagingServerEvents["message:read"] = (data) => {
      // console.log("✓ Message read:", data.messageId)
      markMessageAsRead(data.conversationId, data.messageId)
    }

    // Message deleted
    const handleMessageDeleted: MessagingServerEvents["message:deleted"] = (data) => {
      // console.log("🗑️ Message deleted:", data.messageId)
      deleteMessageStore(data.conversationId, data.messageId)
    }

    // Message edited
    const handleMessageEdited: MessagingServerEvents["message:edited"] = (data) => {
      // console.log("✏️ Message edited:", data.messageId)
      updateMessage(data.conversationId, data.messageId, { 
        message: data.newMessage, 
        edited: true 
      })
    }

    // Message reaction
    const handleMessageReaction: MessagingServerEvents["message:reaction"] = (data) => {
      // console.log("❤️ Message reaction:", data.messageId, data.reaction)
      updateMessage(data.conversationId, data.messageId, {
        reactions: [{ userId: data.userId, reaction: data.reaction }],
      })
    }

    // User status changed
    const handleUserStatusChanged: MessagingServerEvents["message:userStatusChanged"] = (data) => {
      // console.log("👤 User status:", data.userId, data.status)
      if (data.status === "online") {
        setUserOnline(data.userId)
      } else {
        setUserOffline(data.userId)
      }
    }

    // Message history
    const handleMessageHistory: MessagingServerEvents["message:history"] = (data) => {
      // console.log("📚 Message history received:", data.conversationId, data.messages.length)
      setMessages(data.conversationId, data.messages)
    }

    // Error handling
    const handleError: MessagingServerEvents["message:error"] = (data) => {
      console.error("❌ Messaging error:", data.message, data.details)
    }

    // Register listeners
    socket.on("message:connected", handleConnected)
    socket.on("message:new", handleNewMessage)
    socket.on("message:userTyping", handleUserTyping)
    socket.on("message:userStoppedTyping", handleUserStoppedTyping)
    socket.on("message:read", handleMessageRead)
    socket.on("message:deleted", handleMessageDeleted)
    socket.on("message:edited", handleMessageEdited)
    socket.on("message:reaction", handleMessageReaction)
    socket.on("message:userStatusChanged", handleUserStatusChanged)
    socket.on("message:history", handleMessageHistory)
    socket.on("message:error", handleError)

    // Cleanup
    return () => {
      socket.off("message:connected", handleConnected)
      socket.off("message:new", handleNewMessage)
      socket.off("message:userTyping", handleUserTyping)
      socket.off("message:userStoppedTyping", handleUserStoppedTyping)
      socket.off("message:read", handleMessageRead)
      socket.off("message:deleted", handleMessageDeleted)
      socket.off("message:edited", handleMessageEdited)
      socket.off("message:reaction", handleMessageReaction)
      socket.off("message:userStatusChanged", handleUserStatusChanged)
      socket.off("message:history", handleMessageHistory)
      socket.off("message:error", handleError)
    }
  }, [
    socket,
    isConnected,
    addMessage,
    updateMessage,
    deleteMessageStore,
    markMessageAsRead,
    setUserTyping,
    removeUserTyping,
    setUserOnline,
    setUserOffline,
    setConnected,
    setMessages,
  ])

  // Clear messaging on disconnect
  useEffect(() => {
    if (!enabled) {
      clearMessaging()
    }
  }, [enabled, clearMessaging])

  // Join a conversation
  const joinConversation = useCallback(
    (conversationId: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot join conversation: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:joinConversation"] = (data) => {
        socket.emit("message:joinConversation", data)
      }
      emit({ conversationId })
      // console.log("🚪 Joining conversation:", conversationId)
    },
    [socket, isConnected]
  )

  // Leave a conversation
  const leaveConversation = useCallback(
    (conversationId: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot leave conversation: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:leaveConversation"] = (data) => {
        socket.emit("message:leaveConversation", data)
      }
      emit({ conversationId })
      // console.log("👋 Leaving conversation:", conversationId)
    },
    [socket, isConnected]
  )

  // Send a message
  const sendMessage = useCallback(
    (
      conversationId: string,
      message: string,
      attachments?: Array<{ url: string; type: string; name: string }>
    ) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot send message: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:send"] = (data) => {
        socket.emit("message:send", data)
      }
      emit({ conversationId, message, attachments })
      // console.log("📤 Sending message to:", conversationId)
    },
    [socket, isConnected]
  )

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (conversationId: string) => {
      if (!socket || !isConnected) return

      const emit: MessagingClientEvents["message:typing"] = (data) => {
        socket.emit("message:typing", data)
      }
      emit({ conversationId })
    },
    [socket, isConnected]
  )

  // Stop typing indicator
  const stopTypingIndicator = useCallback(
    (conversationId: string) => {
      if (!socket || !isConnected) return

      const emit: MessagingClientEvents["message:stopTyping"] = (data) => {
        socket.emit("message:stopTyping", data)
      }
      emit({ conversationId })
    },
    [socket, isConnected]
  )

  // Mark message as read
  const markAsRead = useCallback(
    (conversationId: string, messageId: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot mark as read: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:markAsRead"] = (data) => {
        socket.emit("message:markAsRead", data)
      }
      emit({ conversationId, messageId })
    },
    [socket, isConnected]
  )

  // Delete a message
  const deleteMessage = useCallback(
    (conversationId: string, messageId: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot delete message: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:delete"] = (data) => {
        socket.emit("message:delete", data)
      }
      emit({ conversationId, messageId })
    },
    [socket, isConnected]
  )

  // Edit a message
  const editMessage = useCallback(
    (conversationId: string, messageId: string, newMessage: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot edit message: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:edit"] = (data) => {
        socket.emit("message:edit", data)
      }
      emit({ conversationId, messageId, newMessage })
    },
    [socket, isConnected]
  )

  // React to a message
  const reactToMessage = useCallback(
    (conversationId: string, messageId: string, reaction: string) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot react to message: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:react"] = (data) => {
        socket.emit("message:react", data)
      }
      emit({ conversationId, messageId, reaction })
    },
    [socket, isConnected]
  )

  // Get message history
  const getMessages = useCallback(
    (conversationId: string, page = 1, limit = 50) => {
      if (!socket || !isConnected) {
        // console.warn("Cannot get messages: socket not connected")
        return
      }

      const emit: MessagingClientEvents["message:getMessages"] = (data) => {
        socket.emit("message:getMessages", data)
      }
      emit({ conversationId, page, limit })
    },
    [socket, isConnected]
  )

  return {
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTypingIndicator,
    stopTypingIndicator,
    markAsRead,
    deleteMessage,
    editMessage,
    reactToMessage,
    getMessages,
  }
}
