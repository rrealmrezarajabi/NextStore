import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./base-url";
import {
  notifySessionExpired,
  resetSessionExpiredNotice,
} from "./session-expired";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Holds the in-flight refresh request. If multiple requests get a 401
// at the same time, they all await this SAME promise instead of each
// calling /auth/refresh separately.
let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = apiClient
      .post("/auth/refresh")
      .then(() => {
        resetSessionExpiredNotice();
      })
      .finally(() => {
        // reset so a future (new) expiry can trigger a fresh refresh
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        await refreshSession();
        return apiClient(originalRequest);
      } catch (refreshError) {
        notifySessionExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
