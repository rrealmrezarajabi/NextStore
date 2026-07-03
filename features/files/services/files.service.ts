import { apiClient } from "@/lib/api/axios";
import { BASE_URL } from "@/lib/api/base-url";

const BACKEND_ORIGIN = new URL(BASE_URL).origin;

function resolveBackendUrl(path: string) {
  return new URL(path, BACKEND_ORIGIN).toString();
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<{ location: string }>(
    "/files/upload",
    formData,
  );
  return resolveBackendUrl(data.location);
}

// Helper: converts a stored relative path (e.g. "/uploads/x.jpg") to a full URL
export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return resolveBackendUrl(url);
}
