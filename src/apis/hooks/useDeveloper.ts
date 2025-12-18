/**
 * Developer Hooks
 * TanStack Query hooks for developer-related operations
 */

import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type {
  GetDevelopersResponse,
  GetDeveloperProfileResponse,
  SearchDevelopersParams,
} from "../types/shared.types";
import { ApiError } from "../config";
import {
  getConnectedDevelopers,
  searchDevelopers,
  getDeveloperProfile,
} from "../services/developer.service";

const queryKeys = {
  connectedDevs: (params?: { page?: number; limit?: number }) => [
    "connectedDevs",
    params,
  ],
  searchDevs: (params?: SearchDevelopersParams) => ["searchDevs", params],
  developerProfile: (devId: string) => ["developerProfile", devId],
};

/**
 * Hook for fetching connected developers
 */
export const useGetConnectedDevelopers = (params?: {
  page?: number;
  limit?: number;
}): UseQueryResult<GetDevelopersResponse, ApiError> => {
  return useQuery({
    queryKey: queryKeys.connectedDevs(params),
    queryFn: () => getConnectedDevelopers(params),
  });
};

/**
 * Hook for searching developers
 */
export const useSearchDevelopers = (
  params?: SearchDevelopersParams
): UseQueryResult<GetDevelopersResponse, ApiError> => {
  return useQuery({
    queryKey: queryKeys.searchDevs(params),
    queryFn: () => searchDevelopers(params),
    enabled: true, // Always enabled, can be controlled by parent component
  });
};

/**
 * Hook for fetching developer profile
 */
export const useGetDeveloperProfile = (
  devId: string
): UseQueryResult<GetDeveloperProfileResponse, ApiError> => {
  return useQuery({
    queryKey: queryKeys.developerProfile(devId),
    queryFn: () => getDeveloperProfile(devId),
    enabled: !!devId, // Only fetch when devId is available
  });
};
