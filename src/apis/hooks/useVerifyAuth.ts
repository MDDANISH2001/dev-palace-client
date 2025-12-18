/**
 * TanStack Query Hook - Authentication Verification
 * Uses React Query to verify user authentication status
 */

import { useQuery } from "@tanstack/react-query"
import { verifyAuth } from "../services/auth-verify.service"

/**
 * Hook to verify if user is authenticated
 * Uses TanStack Query for caching and automatic refetching
 */
export const useVerifyAuth = () => {
  return useQuery({
    queryKey: ["auth", "verify"],
    queryFn: verifyAuth,
    retry: 1, // Only retry once on failure
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })
}
