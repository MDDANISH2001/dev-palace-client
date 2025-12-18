/**
 * Type definitions for authentication API
 */

export type UserType = "client" | "developer"

/**
 * Request types
 */
export type ClientRegisterRequest = {
  name: string
  email: string
  password: string
  userType: "client"
}

export type ClientLoginRequest = {
  email: string
  password: string
  userType: "client"
  rememberMe?: boolean
}

export type DeveloperRegisterRequest = {
  name: string
  email: string
  password: string
  userType: "developer"
  portfolioUrl?: string
}

export type DeveloperLoginRequest = {
  email: string
  password: string
  userType: "developer"
  rememberMe?: boolean
}

/**
 * Response types
 */
export type User = {
  id: string
  name: string
  email: string
  userType: UserType
  portfolioUrl?: string
  isVerified: boolean
  createdAt?: string
  updatedAt?: string
}

export type AuthResponse = {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    refreshToken?: string
  }
}

/**
 * Error response type
 */
export type ApiErrorResponse = {
  success: false
  message: string
  errors?: Record<string, string[]>
}
