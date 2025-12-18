/**
 * Client Query Hooks
 * TanStack Query hooks for client-related GET operations
 */

import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type {
  getProjectParams,
  GetProjectsResponse,
} from "../types/shared.types";
import { ApiError } from "../config";
import { getProjects } from "../services/shared-query.service";

const queryKeys = {
  getProjects: (params: getProjectParams) => ["getProjects", params],
};
/**
 * Hook for fetching client projects
 */
export const useGetProjects = (
  params?: getProjectParams
): UseQueryResult<GetProjectsResponse, ApiError> => {
  return useQuery({
    queryKey: queryKeys.getProjects(params as getProjectParams),
    queryFn: () => getProjects(params),
  });
};
