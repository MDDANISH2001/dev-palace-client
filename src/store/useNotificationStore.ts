/**
 * Notification Store
 * Zustand store for managing notifications state
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Notification } from "../socket/types/socket.types"

interface NotificationState {
  // State
  notifications: Notification[]
  unreadCount: number
  isConnected: boolean
  subscribedTypes: string[]

  // Actions
  addNotification: (notification: Notification) => void
  setNotifications: (notifications: Notification[]) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  deleteNotification: (notificationId: string) => void
  setUnreadCount: (count: number) => void
  setConnected: (connected: boolean) => void
  setSubscribedTypes: (types: string[]) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set) => ({
      // Initial State
      notifications: [],
      unreadCount: 0,
      isConnected: false,
      subscribedTypes: [],

      // Add a new notification to the top of the list
      addNotification: (notification) =>
        set((state) => {
          // Check if notification already exists
          const exists = state.notifications.some((n) => n.id === notification.id)
          if (exists) return state

          return {
            notifications: [notification, ...state.notifications],
            unreadCount: notification.read ? state.unreadCount : state.unreadCount + 1,
          }
        }),

      // Set all notifications (for initial load)
      setNotifications: (notifications) =>
        set({
          notifications,
          unreadCount: notifications.filter((n) => !n.read).length,
        }),

      // Mark a single notification as read
      markAsRead: (notificationId) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === notificationId)
          if (!notification || notification.read) return state

          return {
            notifications: state.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          }
        }),

      // Mark all notifications as read
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),

      // Delete a notification
      deleteNotification: (notificationId) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === notificationId)
          const wasUnread = notification && !notification.read

          return {
            notifications: state.notifications.filter((n) => n.id !== notificationId),
            unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
          }
        }),

      // Set unread count
      setUnreadCount: (count) =>
        set({
          unreadCount: count,
        }),

      // Set connection status
      setConnected: (connected) =>
        set({
          isConnected: connected,
        }),

      // Set subscribed notification types
      setSubscribedTypes: (types) =>
        set({
          subscribedTypes: types,
        }),

      // Clear all notifications
      clearNotifications: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),
    }),
    { name: "NotificationStore" }
  )
)
