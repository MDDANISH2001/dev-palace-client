/**
 * API Hooks and Services - Centralized exports
 */

/**
 * API Module Exports
 * Centralized exports for all API-related functionality
 */

// Configuration
export { API_CONFIG, API_ENDPOINTS, getHeaders, ApiError } from "./config"

// Types
export type {
  User,
  ClientRegisterRequest,
  ClientLoginRequest,
  DeveloperRegisterRequest,
  DeveloperLoginRequest,
  AuthResponse,
  ApiErrorResponse,
} from "./types/auth.types"

// Services
export {
  clientRegister,
  clientLogin,
  developerRegister,
  developerLogin,
  verifyEmail,
  logout,
} from "./services/auth.service"

export { verifyAuth } from "./services/auth-verify.service"
export type { VerifyAuthResponse } from "./services/auth-verify.service"

// Hooks
export {
  useClientRegister,
  useClientLogin,
  useDeveloperRegister,
  useDeveloperLogin,
  useLogout,
} from "./hooks/useAuth"

export { useVerifyAuth } from "./hooks/useVerifyAuth"

// Axios instance
export { default as axiosInstance } from "./axios"

