import axiosInstance from "../axios";
import { API_ENDPOINTS, ApiError } from "../config";
import type {
  getProjectParams,
  GetProjectsResponse,
} from "../types/shared.types";
import { getErrorMessage, getErrorStatus } from "../utils/error-handler";

/**
 * Example: Get client projects
 */
export const getProjects = async (
  params?: getProjectParams
): Promise<GetProjectsResponse> => {
  try {
    const response = await axiosInstance.get<GetProjectsResponse>(
      API_ENDPOINTS.COMMON.GET_PROJECTS,
      { params }
    );
    return response.data;
  } catch (error) {
    throw new ApiError(
      getErrorStatus(error),
      getErrorMessage(error, "Failed to fetch projects")
    );
  }
};
