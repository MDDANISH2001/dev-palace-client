/**
 * Socket.IO Client Configuration
 * Configuration options for socket connections
 */

import { SOCKET_CONFIG } from "@/apis/config"
import type { SocketConnectionOptions } from "../types/socket.types"

/**
 * Get socket connection options with authentication
 * Uses HTTP-only cookies for authentication
 */
export const getSocketConnectionOptions = (): SocketConnectionOptions => {
  return {
    withCredentials: true, // Important: Send HTTP-only cookies
    reconnection: true,
    reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
    reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
    transports: ["websocket", "polling"],
  }
}

/**
 * Socket connection URLs for different namespaces
 */
export const getSocketURL = (namespace: string): string => {
  return `${SOCKET_CONFIG.URL}${namespace}`
}
