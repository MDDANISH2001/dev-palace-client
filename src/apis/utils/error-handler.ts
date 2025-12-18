/**
 * Common Error Handling Utilities
 * Shared functions for extracting error information from API responses
 */

import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/auth.types";

/**
 * Extract error message from Axios error
 */
export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  return axiosError.response?.data?.message || defaultMessage;
};

/**
 * Get error status code from Axios error
 */
export const getErrorStatus = (error: unknown): number => {
  const axiosError = error as AxiosError;
  return axiosError.response?.status || 500;
};

/**
 * Get error details/data from Axios error
 */
export const getErrorDetails = (error: unknown): unknown => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  return axiosError.response?.data?.errors || axiosError.response?.data;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status === 401 || status === 403;
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  const axiosError = error as AxiosError;
  return !axiosError.response && axiosError.message === "Network Error";
};
