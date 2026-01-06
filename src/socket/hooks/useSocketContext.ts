/**
 * Socket Context Hooks
 * Hooks to access and control socket connections
 */

import { useContext } from "react"
import { SocketContext } from "../SocketContext"
import type { SocketContextValue } from "../SocketContext"

/**
 * Hook to access socket context
 * Must be used within SocketProvider
 */
export const useSocketContext = (): SocketContextValue => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocketContext must be used within SocketProvider")
  }
  return context
}

/**
 * Hook to control socket authentication state
 * Call this from your auth hooks/components
 */
export const useSocketAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useSocketContext()

  const connectSockets = () => {
    if (isAuthenticated) {
      // console.log("🔌 connectSockets called but already connected - ignoring")
      return
    }
    // console.log("🔌 Connecting sockets...")
    setIsAuthenticated(true)
  }

  const disconnectSockets = () => {
    if (!isAuthenticated) {
      // console.log("🔌 disconnectSockets called but already disconnected - ignoring")
      return
    }
    // console.log("🔌 Disconnecting sockets...")
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    connectSockets,
    disconnectSockets,
  }
}
