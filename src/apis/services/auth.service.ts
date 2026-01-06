/**
 * Authentication Service
 * Handles all auth-related API calls using Axios
 */

import axiosInstance from "../axios";
import { API_ENDPOINTS, ApiError } from "../config";
import { getErrorMessage, getErrorStatus } from "../utils/error-handler";
import type {
  ClientRegisterRequest,
  ClientLoginRequest,
  DeveloperRegisterRequest,
  DeveloperLoginRequest,
  AuthResponse,
} from "../types/auth.types";

/**
 * Client Registration
 */
export const clientRegister = async (
  data: ClientRegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.CLIENT_REGISTER,
      data
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Registration failed")
    );
  }
};

/**
 * Client Login
 */
export const clientLogin = async (
  data: ClientLoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.CLIENT_LOGIN,
      data
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Login failed")
    );
  }
};

/**
 * Developer Registration
 */
export const developerRegister = async (
  data: DeveloperRegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.DEVELOPER_REGISTER,
      data
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Registration failed")
    );
  }
};

/**
 * Developer Login
 */
export const developerLogin = async (
  data: DeveloperLoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.DEVELOPER_LOGIN,
      data
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Login failed")
    );
  }
};

/**
 * Verify Email
 */
export const verifyEmail = async (
  token: string
): Promise<void> => {
  try {
    const response = await axiosInstance.put<void>(
      API_ENDPOINTS.COMMON.VERIFYEMAIL(token),
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Login failed")
    );
  }
};

/**
 * Logout (clears HTTP-only cookies on backend)
 */
export const logout = async (): Promise<void> => {
  try {
    console.log("Logging out user:", localStorage.getItem("user"));
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    // Even if logout fails on backend, clear local data
    console.error("Logout error:", error);
  } finally {
    console.log("removing user data:", localStorage.getItem("user"));
    localStorage.removeItem("user");
  }
};
