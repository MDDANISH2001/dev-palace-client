/**
 * Authentication Service - User Verification
 * Checks if user is authenticated via HTTP-only cookie using Axios
 */

import axiosInstance from "../axios";
import { API_ENDPOINTS } from "../config";
import type { User } from "../types/auth.types";

export type VerifyAuthResponse = {
  success: boolean;
  data: {
    isAuthenticated: boolean;
    user?: User;
  };
};

/**
 * Verify if user is authenticated (checks HTTP-only cookie)
 * This should be called by ProtectedRoute to verify auth status
 */
export const verifyAuth = async (): Promise<VerifyAuthResponse> => {
  try {
    const response = await axiosInstance.get<VerifyAuthResponse>(
      API_ENDPOINTS.AUTH.VERIFY
    );
    console.log("response.data :", response.data);
    return response.data;
  } catch {
    // If verification fails, user is not authenticated
    return {
      success: false,
      data: {
        isAuthenticated: false,
      },
    };
  }
};
