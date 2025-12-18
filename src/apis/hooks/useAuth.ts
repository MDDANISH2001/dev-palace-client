/**
 * Authentication Query Hooks
 * TanStack Query hooks for auth operations
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import {
  clientRegister,
  clientLogin,
  developerRegister,
  developerLogin,
  logout,
} from "../services/auth.service";
import type {
  ClientRegisterRequest,
  ClientLoginRequest,
  DeveloperRegisterRequest,
  DeveloperLoginRequest,
  AuthResponse,
} from "../types/auth.types";
import { ApiError } from "../config";

/**
 * Hook for client registration
 */
export const useClientRegister = (): UseMutationResult<
  AuthResponse,
  ApiError,
  ClientRegisterRequest
> => {
  return useMutation({
    mutationFn: clientRegister,
    onSuccess: (data) => {
      // Store user data in localStorage (tokens are in HTTP-only cookies)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Note: Tokens are stored in HTTP-only cookies by the backend
      // and automatically sent with subsequent requests
    },
    onError: (error: ApiError) => {
      console.error("Client registration error:", error.message);
    },
  });
};

/**
 * Hook for client login
 */
export const useClientLogin = (): UseMutationResult<
  AuthResponse,
  ApiError,
  ClientLoginRequest
> => {
  return useMutation({
    mutationFn: clientLogin,
    onSuccess: (data) => {
      // Store user data in localStorage (tokens are in HTTP-only cookies)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Note: Tokens are stored in HTTP-only cookies by the backend
      // and automatically sent with subsequent requests
    },
    onError: (error: ApiError) => {
      console.error("Client login error:", error.message);
    },
  });
};

/**
 * Hook for developer registration
 */
export const useDeveloperRegister = (): UseMutationResult<
  AuthResponse,
  ApiError,
  DeveloperRegisterRequest
> => {
  return useMutation({
    mutationFn: developerRegister,
    onSuccess: (data) => {
      // Store user data in localStorage (tokens are in HTTP-only cookies)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Note: Tokens are stored in HTTP-only cookies by the backend
      // and automatically sent with subsequent requests
    },
    onError: (error: ApiError) => {
      console.error("Developer registration error:", error.message);
    },
  });
};

/**
 * Hook for developer login
 */
export const useDeveloperLogin = (): UseMutationResult<
  AuthResponse,
  ApiError,
  DeveloperLoginRequest
> => {
  return useMutation({
    mutationFn: developerLogin,
    onSuccess: (data) => {
      // Store user data in localStorage (tokens are in HTTP-only cookies)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Note: Tokens are stored in HTTP-only cookies by the backend
      // and automatically sent with subsequent requests
    },
    onError: (error: ApiError) => {
      console.error("Developer login error:", error.message);
    },
  });
};

/**
 * Hook for logout
 */
export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear user data from localStorage
      localStorage.removeItem("user");
      
      // Invalidate and remove all auth-related queries to force re-fetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["auth"] });
      
      // Clear all queries to ensure clean state (optional but recommended)
      queryClient.clear();
      
      console.log("Logout successful - cache cleared");
    },
  });
};
