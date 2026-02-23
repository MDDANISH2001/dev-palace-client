/**
 * Client Query Service
 * Handles all client-related GET API calls using Axios
 */

import type { IClient } from "@/types/clientTypes/clientAuth.types";
import axiosInstance from "../axios";
import { API_ENDPOINTS, ApiError } from "../config";
import { getErrorMessage, getErrorStatus } from "../utils/error-handler";

/**
 * Generic response type for API calls
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Example: Get client by ID
 */
// export const getClientById = async (
//   clientId: string
// ): Promise<ApiResponse<Partial<IClient>>> => {
//   try {
//     const response = await axiosInstance.get<ApiResponse<Partial<IClient>>>(
//       API_ENDPOINTS.CLIENT.CLIENTS + `/${clientId}`
//     );
//     return response.data;
//   } catch (error) {
//     throw new ApiError(
//       getErrorStatus(error),
//       getErrorMessage(error, "Failed to fetch client")
//     );
//   }
// };

/**
 * Example: Get client profile (authenticated)
 */
export const getClientProfile = async (): Promise<ApiResponse<IClient>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<IClient>>(
      API_ENDPOINTS.CLIENT.PROFILE
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to fetch profile")
    );
  }
};

/**
 * Example: Get client statistics
 */
export const getClientStats = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<any>>(
      API_ENDPOINTS.CLIENT.STATS
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to fetch statistics")
    );
  }
};
