/**
 * Project API Service
 * Service functions for project-related API operations
 */

import { axiosInstance } from "../axios";
import { API_ENDPOINTS } from "../config";
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  AnalyzeSkillsRequest,
  AnalyzeSkillsResponse,
  EstimateBudgetRequest,
  EstimateBudgetResponse,
  GenerateSOWRequest,
  GenerateSOWResponse,
  GetSelectableDevelopersResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "../types/project.types";
import {
  getErrorMessage,
  getErrorStatus,
  getErrorDetails,
} from "../utils/error-handler";
import { ApiError } from "../config";

/**
 * Analyze project description to extract required skills
 * POST /projects/analyze-skills
 */
export const analyzeProjectSkills = async (
  data: AnalyzeSkillsRequest
): Promise<AnalyzeSkillsResponse> => {
  try {
    const response = await axiosInstance.post<AnalyzeSkillsResponse>(
      API_ENDPOINTS.PROJECTS.ANALYZE_SKILLS,
      data
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error, "Failed to analyze project skills");
    const status = getErrorStatus(error);
    const details = getErrorDetails(error);
    throw new ApiError(status, message, details);
  }
};

/**
 * Estimate project budget based on description and location
 * POST /projects/estimate-budget
 */
export const estimateBudget = async (
  data: EstimateBudgetRequest
): Promise<EstimateBudgetResponse> => {
  try {
    const response = await axiosInstance.post<EstimateBudgetResponse>(
      API_ENDPOINTS.PROJECTS.ESTIMATE_BUDGET,
      data
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error, "Failed to estimate project budget");
    const status = getErrorStatus(error);
    const details = getErrorDetails(error);
    throw new ApiError(status, message, details);
  }
};

/**
 * Get list of developers available for direct assignment
 * GET /common/connected-devs
 */
export const getSelectableDevelopers =
  async (): Promise<GetSelectableDevelopersResponse> => {
    try {
      const response = await axiosInstance.get<GetSelectableDevelopersResponse>(
        API_ENDPOINTS.CLIENT.SELECT_DEVS
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error, "Failed to fetch developers");
      const status = getErrorStatus(error);
      const details = getErrorDetails(error);
      throw new ApiError(status, message, details);
    }
  };

/**
 * Create a new project
 * POST /projects
 */
export const createProject = async (
  data: CreateProjectRequest
): Promise<CreateProjectResponse> => {
  try {
    const response = await axiosInstance.post<CreateProjectResponse>(
      API_ENDPOINTS.CLIENT.CREATE_PROJECT,
      data
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error, "Failed to create project");
    const status = getErrorStatus(error);
    const details = getErrorDetails(error);
    throw new ApiError(status, message, details);
  }
};

/**
 * Update an existing project
 * PUT /projects/:id
 */
export const updateProject = async (
  projectId: string,
  data: UpdateProjectRequest
): Promise<UpdateProjectResponse> => {
  try {
    const response = await axiosInstance.put<UpdateProjectResponse>(
      API_ENDPOINTS.PROJECTS.UPDATE(projectId),
      data
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error, "Failed to update project");
    const status = getErrorStatus(error);
    const details = getErrorDetails(error);
    throw new ApiError(status, message, details);
  }
};

/**
 * Generate Statement of Work using AI
 * POST /projects/generate-sow
 */
export const generateSOW = async (
  data: GenerateSOWRequest
): Promise<GenerateSOWResponse> => {
  try {
    const response = await axiosInstance.post<GenerateSOWResponse>(
      API_ENDPOINTS.PROJECTS.GENERATE_SOW,
      data
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error, "Failed to generate SOW");
    const status = getErrorStatus(error);
    const details = getErrorDetails(error);
    throw new ApiError(status, message, details);
  }
};
