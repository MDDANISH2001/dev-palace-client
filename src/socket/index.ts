/**
 * Socket Module Exports
 * Central export file for all socket-related functionality
 */

// Provider
export { SocketProvider } from "./SocketProvider"

// Hooks
export { useSocket } from "./hooks/useSocket"
export { useNotifications } from "./hooks/useNotifications"
export { useMessaging } from "./hooks/useMessaging"
export { useSocketContext, useSocketAuth } from "./hooks/useSocketContext"

// Types
export * from "./types/socket.types"

// Config
export { getSocketConnectionOptions, getSocketURL } from "./config/socket.config"
