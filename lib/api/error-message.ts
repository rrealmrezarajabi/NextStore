import { isAxiosError } from "axios";

type ApiErrorResponse = {
  error?: string;
  message?: string | string[];
};

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return typeof data === "object" && data !== null;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
) {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (isApiErrorResponse(data)) {
      if (Array.isArray(data.message) && data.message.length > 0) {
        return data.message.join(", ");
      }

      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }

      if (typeof data.error === "string" && data.error.trim()) {
        return data.error;
      }
    }

    if (!error.response) {
      return "Unable to reach the server. Please try again.";
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
