/**
 * Axios Instance Configuration
 * Pre-configured axios instance with interceptors for HTTP-only cookie authentication
 */

import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";

/**
 * Create axios instance with default config
 */
export const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // Important: Send HTTP-only cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Add any custom headers or logging here
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add custom headers here if needed
    // For HTTP-only cookies, no need to manually add Authorization header
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle errors globally
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      switch (status) {
        case 401:
          // Unauthorized - clear user data and redirect to login
          localStorage.removeItem("user");
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.error("Access forbidden:", error.response.data);
          break;
        case 500:
          // Server error
          console.error("Server error:", error.response.data);
          break;
        default:
          console.error("API error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
