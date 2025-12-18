/**
 * Developer Service
 * API calls for developer-related operations
 */

import axiosInstance from "../axios";
import { API_ENDPOINTS, ApiError } from "../config";
import type {
  GetDevelopersResponse,
  GetDeveloperProfileResponse,
  SearchDevelopersParams,
} from "../types/shared.types";
import { getErrorMessage, getErrorStatus } from "../utils/error-handler";

/**
 * Get connected developers (previously worked with)
 */
export const getConnectedDevelopers = async (params?: {
  page?: number;
  limit?: number;
}): Promise<GetDevelopersResponse> => {
  try {
    const response = await axiosInstance.get<GetDevelopersResponse>(
      API_ENDPOINTS.CLIENT.CONNECTED_DEVS,
      { params }
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to fetch connected developers")
    );
  }
};

/**
 * Search for developers
 */
export const searchDevelopers = async (
  params?: SearchDevelopersParams
): Promise<GetDevelopersResponse> => {
  try {
    const response = await axiosInstance.get<GetDevelopersResponse>(
      API_ENDPOINTS.CLIENT.SEARCH_DEVS,
      { params }
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to search developers")
    );
  }
};

/**
 * Get developer profile by ID
 */
export const getDeveloperProfile = async (
  devId: string
): Promise<GetDeveloperProfileResponse> => {
  try {
    const response = await axiosInstance.get<GetDeveloperProfileResponse>(
      API_ENDPOINTS.COMMON.DEVELOPER_PROFILE(devId)
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to fetch developer profile")
    );
  }
};
