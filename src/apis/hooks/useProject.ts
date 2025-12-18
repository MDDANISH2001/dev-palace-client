/**
 * Project Query Hooks
 * TanStack Query hooks for project-related operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
  analyzeProjectSkills,
  estimateBudget,
  getSelectableDevelopers,
  createProject,
  updateProject,
  generateSOW,
} from "../services/project.service";
import type {
  AnalyzeSkillsRequest,
  AnalyzeSkillsResponse,
  EstimateBudgetRequest,
  EstimateBudgetResponse,
  GenerateSOWRequest,
  GenerateSOWResponse,
  GetSelectableDevelopersResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "../types/project.types";
import { ApiError } from "../config";

/**
 * Query keys for project-related queries
 */
const queryKeys = {
  selectableDevelopers: ["selectableDevelopers"],
  project: (id: string) => ["project", id],
  projects: ["projects"],
};

/**
 * Hook for analyzing project description to extract skills
 * This is a mutation because it's an action triggered by user
 */
export const useAnalyzeSkills = (): UseMutationResult<
  AnalyzeSkillsResponse,
  ApiError,
  AnalyzeSkillsRequest
> => {
  return useMutation({
    mutationFn: analyzeProjectSkills,
    onError: (error: ApiError) => {
      console.error("Skills analysis error:", error.message);
    },
  });
};

/**
 * Hook for estimating project budget
 * This is a mutation because it's an action triggered by user
 */
export const useEstimateBudget = (): UseMutationResult<
  EstimateBudgetResponse,
  ApiError,
  EstimateBudgetRequest
> => {
  return useMutation({
    mutationFn: estimateBudget,
    onError: (error: ApiError) => {
      console.error("Budget estimation error:", error.message);
    },
  });
};

/**
 * Hook for fetching selectable developers (for direct assignment)
 * This is a query because it fetches data that can be cached
 */
export const useGetSelectableDevelopers = (): UseQueryResult<
  GetSelectableDevelopersResponse,
  ApiError
> => {
  return useQuery({
    queryKey: queryKeys.selectableDevelopers,
    queryFn: getSelectableDevelopers,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });
};

/**
 * Hook for creating a new project
 */
export const useCreateProject = (): UseMutationResult<
  CreateProjectResponse,
  ApiError,
  CreateProjectRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      // Invalidate projects list to refetch with new project
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });

      // Set the newly created project in cache
      queryClient.setQueryData(queryKeys.project(data.data._id), {
        success: true,
        data: data.data,
      });

      console.log("Project created successfully:", data.data._id);
    },
    onError: (error: ApiError) => {
      console.error("Project creation error:", error.message);
    },
  });
};

/**
 * Hook for updating an existing project
 */
export const useUpdateProject = (
  projectId: string
): UseMutationResult<UpdateProjectResponse, ApiError, UpdateProjectRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProject(projectId, data),
    onSuccess: (data) => {
      // Update the project in cache
      queryClient.setQueryData(queryKeys.project(projectId), {
        success: true,
        data: data.data,
      });

      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });

      console.log("Project updated successfully:", projectId);
    },
    onError: (error: ApiError) => {
      console.error("Project update error:", error.message);
    },
  });
};

/**
 * Hook for generating Statement of Work using AI
 */
export const useGenerateSOW = (): UseMutationResult<
  GenerateSOWResponse,
  ApiError,
  GenerateSOWRequest
> => {
  return useMutation({
    mutationFn: generateSOW,
    onError: (error: ApiError) => {
      console.error("SOW generation error:", error.message);
    },
  });
};
