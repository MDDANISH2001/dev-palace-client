/**
 * Base Socket Hook
 * Generic hook for managing socket connections with error handling and reconnection logic
 */

import { useEffect, useRef, useState, useCallback } from "react"
import { io, Socket } from "socket.io-client"
import { getSocketConnectionOptions, getSocketURL } from "../config/socket.config"
import type { ConnectionStatus, SocketError } from "../types/socket.types"

interface UseSocketOptions {
  namespace: string
  enabled?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: SocketError) => void
}

interface UseSocketReturn {
  socket: Socket | null
  isConnected: boolean
  status: ConnectionStatus
  error: SocketError | null
  connect: () => void
  disconnect: () => void
}

export const useSocket = ({
  namespace,
  enabled = true,
  onConnect,
  onDisconnect,
  onError,
}: UseSocketOptions): UseSocketReturn => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [error, setError] = useState<SocketError | null>(null)
  const socketRef = useRef<Socket | null>(null)
  // Keep callback refs so that callers can pass inline callbacks without
  // causing connect/disconnect to be recreated on each render.
  const onConnectRef = useRef(onConnect)
  const onDisconnectRef = useRef(onDisconnect)
  const onErrorRef = useRef(onError)

  // Keep refs updated when callbacks change
  useEffect(() => {
    onConnectRef.current = onConnect
  }, [onConnect])
  useEffect(() => {
    onDisconnectRef.current = onDisconnect
  }, [onDisconnect])
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  const handleError = useCallback(
    (err: SocketError) => {
      setError(err)
      setStatus("error")
      console.error(`[Socket ${namespace}] Error:`, err)
      // call latest onError via ref
      onErrorRef.current?.(err)
    },
    [namespace]
  )

  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      console.log(`[Socket ${namespace}] Already connected`)
      return
    }

    try {
      setStatus("connecting")
      console.log(`[Socket ${namespace}] Connecting...`)

      const url = getSocketURL(namespace)
      const options = getSocketConnectionOptions()

      const socket = io(url, options)
      socketRef.current = socket

      // Connection events
      socket.on("connect", () => {
        console.log(`[Socket ${namespace}] Connected successfully`)
        setStatus("connected")
        setError(null)
        // use ref to call most recent callback
        onConnectRef.current?.()
      })

      socket.on("disconnect", (reason) => {
        console.log(`[Socket ${namespace}] Disconnected:`, reason)
        setStatus("disconnected")
        onDisconnectRef.current?.()
      })

      socket.on("connect_error", (err) => {
        console.error(`[Socket ${namespace}] Connection error:`, err.message)
        
        let errorType: SocketError["type"] = "connection"
        if (err.message.includes("authentication") || err.message.includes("token")) {
          errorType = "authentication"
        }

        handleError({
          message: err.message,
          type: errorType,
          details: err,
        })
      })

      socket.on("error", (err) => {
        console.error(`[Socket ${namespace}] Socket error:`, err)
        handleError({
          message: typeof err === "string" ? err : "Socket error occurred",
          type: "server",
          details: err,
        })
      })

      // Handle reconnection attempts
      socket.io.on("reconnect_attempt", (attempt) => {
        console.log(`[Socket ${namespace}] Reconnection attempt ${attempt}`)
        setStatus("connecting")
      })

      socket.io.on("reconnect", (attempt) => {
        console.log(`[Socket ${namespace}] Reconnected after ${attempt} attempts`)
        setStatus("connected")
        setError(null)
      })

      socket.io.on("reconnect_error", (err) => {
        console.error(`[Socket ${namespace}] Reconnection error:`, err.message)
      })

      socket.io.on("reconnect_failed", () => {
        console.error(`[Socket ${namespace}] Reconnection failed`)
        handleError({
          message: "Failed to reconnect to server",
          type: "connection",
        })
      })
    } catch (err) {
      console.error(`[Socket ${namespace}] Failed to initialize:`, err)
      handleError({
        message: "Failed to initialize socket connection",
        type: "unknown",
        details: err,
      })
    }
  }, [namespace, handleError])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log(`[Socket ${namespace}] Disconnecting...`)
      socketRef.current.disconnect()
      socketRef.current = null
      setStatus("disconnected")
    }
  }, [namespace])

  useEffect(() => {
    if (enabled) {
      connect()
    } else {
      disconnect()
    }

    // Cleanup on unmount
    return () => {
      disconnect()
    }
  }, [enabled, connect, disconnect])

  return {
    socket: socketRef.current,
    isConnected: status === "connected",
    status,
    error,
    connect,
    disconnect,
  }
}
