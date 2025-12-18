/**
 * Notifications Socket Hook
 * Manages notification socket events and integrates with notification store
 */

import { useEffect, useCallback } from "react"
import { useSocket } from "./useSocket"
import { useNotificationStore } from "@/store/useNotificationStore"
import { SOCKET_NAMESPACES } from "../types/socket.types"
import type {
  NotificationType,
  NotificationClientEvents,
  NotificationServerEvents,
} from "../types/socket.types"

interface UseNotificationsOptions {
  enabled?: boolean
}

interface UseNotificationsReturn {
  isConnected: boolean
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  deleteNotification: (notificationId: string) => void
  getUnreadCount: () => void
  subscribe: (types: NotificationType[]) => void
  unsubscribe: (types: NotificationType[]) => void
}

export const useNotifications = ({
  enabled = false,
}: UseNotificationsOptions = {}): UseNotificationsReturn => {
  const {
    addNotification,
    setUnreadCount,
    markAsRead: markAsReadStore,
    markAllAsRead: markAllAsReadStore,
    deleteNotification: deleteNotificationStore,
    setConnected,
    clearNotifications,
  } = useNotificationStore()

  const { socket, isConnected } = useSocket({
    namespace: SOCKET_NAMESPACES.NOTIFICATIONS,
    enabled,
    onConnect: () => {
      console.log("✅ Notifications socket connected")
      setConnected(true)
    },
    onDisconnect: () => {
      console.log("❌ Notifications socket disconnected")
      setConnected(false)
    },
    onError: (error) => {
      console.error("Notifications socket error:", error)
      setConnected(false)
    },
  })

  // Setup event listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    // Connection confirmation
    const handleConnected: NotificationServerEvents["notification:connected"] = (data) => {
      console.log("📬 Notification service connected:", data)
      setConnected(true)
    }

    // New notification received
    const handleNewNotification: NotificationServerEvents["notification:new"] = (notification) => {
      console.log("🔔 New notification:", notification)
      addNotification(notification)

      // Optional: Show browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
          tag: notification.id,
        })
      }
    }

    // Unread count updated
    const handleUnreadCount: NotificationServerEvents["notification:unreadCount"] = (data) => {
      console.log("📊 Unread count:", data.count)
      setUnreadCount(data.count)
    }

    // Notification marked as read
    const handleReadSuccess: NotificationServerEvents["notification:readSuccess"] = (data) => {
      if (data.success) {
        console.log("✓ Notification marked as read:", data.notificationId)
        markAsReadStore(data.notificationId)
      }
    }

    // Notification deleted
    const handleDeleteSuccess: NotificationServerEvents["notification:deleteSuccess"] = (data) => {
      if (data.success) {
        console.log("🗑️ Notification deleted:", data.notificationId)
        deleteNotificationStore(data.notificationId)
      }
    }

    // Error handling
    const handleError: NotificationServerEvents["notification:error"] = (data) => {
      console.error("❌ Notification error:", data.message, data.details)
    }

    // Register listeners
    socket.on("notification:connected", handleConnected)
    socket.on("notification:new", handleNewNotification)
    socket.on("notification:unreadCount", handleUnreadCount)
    socket.on("notification:readSuccess", handleReadSuccess)
    socket.on("notification:deleteSuccess", handleDeleteSuccess)
    socket.on("notification:error", handleError)

    // Request initial unread count
    socket.emit("notification:getUnreadCount")

    // Cleanup
    return () => {
      socket.off("notification:connected", handleConnected)
      socket.off("notification:new", handleNewNotification)
      socket.off("notification:unreadCount", handleUnreadCount)
      socket.off("notification:readSuccess", handleReadSuccess)
      socket.off("notification:deleteSuccess", handleDeleteSuccess)
      socket.off("notification:error", handleError)
    }
  }, [socket, isConnected, addNotification, setUnreadCount, markAsReadStore, deleteNotificationStore, setConnected])

  // Clear notifications on disconnect
  useEffect(() => {
    if (!enabled) {
      clearNotifications()
    }
  }, [enabled, clearNotifications])

  // Mark notification as read
  const markAsRead = useCallback(
    (notificationId: string) => {
      if (!socket || !isConnected) {
        console.warn("Cannot mark as read: socket not connected")
        return
      }

      const emit: NotificationClientEvents["notification:read"] = (data) => {
        socket.emit("notification:read", data)
      }
      emit({ notificationId })
    },
    [socket, isConnected]
  )

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    if (!socket || !isConnected) {
      console.warn("Cannot mark all as read: socket not connected")
      return
    }

    const emit: NotificationClientEvents["notification:readAll"] = () => {
      socket.emit("notification:readAll")
    }
    emit()
    markAllAsReadStore()
  }, [socket, isConnected, markAllAsReadStore])

  // Delete notification
  const deleteNotification = useCallback(
    (notificationId: string) => {
      if (!socket || !isConnected) {
        console.warn("Cannot delete notification: socket not connected")
        return
      }

      const emit: NotificationClientEvents["notification:delete"] = (data) => {
        socket.emit("notification:delete", data)
      }
      emit({ notificationId })
    },
    [socket, isConnected]
  )

  // Get unread count
  const getUnreadCount = useCallback(() => {
    if (!socket || !isConnected) {
      console.warn("Cannot get unread count: socket not connected")
      return
    }

    const emit: NotificationClientEvents["notification:getUnreadCount"] = () => {
      socket.emit("notification:getUnreadCount")
    }
    emit()
  }, [socket, isConnected])

  // Subscribe to notification types
  const subscribe = useCallback(
    (types: NotificationType[]) => {
      if (!socket || !isConnected) {
        console.warn("Cannot subscribe: socket not connected")
        return
      }

      const emit: NotificationClientEvents["notification:subscribe"] = (data) => {
        socket.emit("notification:subscribe", data)
      }
      emit({ types })
    },
    [socket, isConnected]
  )

  // Unsubscribe from notification types
  const unsubscribe = useCallback(
    (types: NotificationType[]) => {
      if (!socket || !isConnected) {
        console.warn("Cannot unsubscribe: socket not connected")
        return
      }

      const emit: NotificationClientEvents["notification:unsubscribe"] = (data) => {
        socket.emit("notification:unsubscribe", data)
      }
      emit({ types })
    },
    [socket, isConnected]
  )

  return {
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    subscribe,
    unsubscribe,
  }
}
