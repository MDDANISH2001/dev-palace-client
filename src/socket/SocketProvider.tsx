/**
 * Socket Provider
 * Manages socket connections lifecycle and provides socket context
 * Connects when user is authenticated, disconnects on logout
 */

import React, { useEffect, useState } from "react"
import { useNotifications } from "./hooks/useNotifications"
import { useMessaging } from "./hooks/useMessaging"
import { SocketContext } from "./SocketContext"
import type { SocketContextValue } from "./SocketContext"

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize notification socket
  const notificationSocket = useNotifications({
    enabled: isAuthenticated,
  })

  // Initialize messaging socket
  const messagingSocket = useMessaging({
    enabled: isAuthenticated,
  })

  // Request browser notification permission
  useEffect(() => {
    if (isAuthenticated && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission)
      })
    }
  }, [isAuthenticated])

  const value: SocketContextValue = {
    notifications: {
      isConnected: notificationSocket.isConnected,
      markAsRead: notificationSocket.markAsRead,
      markAllAsRead: notificationSocket.markAllAsRead,
      deleteNotification: notificationSocket.deleteNotification,
      getUnreadCount: notificationSocket.getUnreadCount,
      subscribe: notificationSocket.subscribe,
      unsubscribe: notificationSocket.unsubscribe,
    },
    messaging: {
      isConnected: messagingSocket.isConnected,
      joinConversation: messagingSocket.joinConversation,
      leaveConversation: messagingSocket.leaveConversation,
      sendMessage: messagingSocket.sendMessage,
      sendTypingIndicator: messagingSocket.sendTypingIndicator,
      stopTypingIndicator: messagingSocket.stopTypingIndicator,
      markAsRead: messagingSocket.markAsRead,
      deleteMessage: messagingSocket.deleteMessage,
      editMessage: messagingSocket.editMessage,
      reactToMessage: messagingSocket.reactToMessage,
      getMessages: messagingSocket.getMessages,
    },
    isAuthenticated,
    setIsAuthenticated,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
