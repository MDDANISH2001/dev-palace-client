import type { ApiError } from "@/apis/config";
import {
  getClientProfile,
  type ApiResponse,
} from "@/apis/services/client-query.service";
import type { IClient } from "@/types/clientTypes/clientAuth.types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

const queryKeys = {
  clientProfile: ["clientProfile"],
};

export const useClientProfile = (): UseQueryResult<
  ApiResponse<IClient>,
  ApiError
> => {
  return useQuery<ApiResponse<IClient>, ApiError>({
    queryKey: queryKeys.clientProfile,
    queryFn: getClientProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
