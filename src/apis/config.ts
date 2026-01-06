/**
 * API Configuration
 * Base URL and common settings for all API calls
 */

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/dev-palace",
  TIMEOUT: 30000, // 30 seconds
} as const;

/**
 * Socket Configuration
 * WebSocket URL for real-time communication
 */
export const SOCKET_CONFIG = {
  URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:8800",
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 1000,
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    CLIENT_REGISTER: "/auth/client-register",
    CLIENT_LOGIN: "/auth/client-login",
    DEVELOPER_REGISTER: "/auth/dev-register",
    DEVELOPER_LOGIN: "/auth/dev-login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    VERIFY: "/auth/verify", // Verify authentication status
  },
  CLIENT: {
    CLIENTS: "/clients",
    PROFILE: "/clients/profile",
    STATS: "/clients/stats",
    SELECT_DEVS: "/clients/connected-devs",
    CONNECTED_DEVS: "/clients/connected-devs",
    SEARCH_DEVS: "/clients/search-dev",
    CREATE_PROJECT: "/clients/post-project",
  },
  COMMON: {
    GET_PROJECTS: "/common/get-projects",
    DEVELOPER_PROFILE: (devId: string) => `/common/profile/${devId}`, //TODO: needs to be created.
    VERIFYEMAIL: (token: string) => `/common/verify-email?token=${token}`,
  },
  PROJECTS: {
    ANALYZE_SKILLS: "/projects/analyze-skills",
    ESTIMATE_BUDGET: "/projects/estimate-budget",
    GENERATE_SOW: "/projects/generate-sow",
    UPDATE: (id: string) => `/projects/${id}`,
  },
} as const;

/**
 * HTTP Methods
 */
export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

/**
 * Common HTTP headers
 * Note: Authentication is handled via HTTP-only cookies, not Authorization headers
 */
export const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // No need to manually add Authorization header
  // HTTP-only cookies are automatically sent by the browser

  return headers;
};

/**
 * API Error class for consistent error handling
 */
export class ApiError extends Error {
  status: number;
  message: string;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
