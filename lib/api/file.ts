import { BASE_URL } from "./base-url";

// BASE_URL is like "http://localhost:4000/api/v1", we need just the origin
const BACKEND_ORIGIN = BASE_URL.replace(/\/api\/v1$/, "");

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  // data.location is like "/uploads/filename.jpg" — prefix with backend origin
  return `${BACKEND_ORIGIN}${data.location}` as string;
}

// Helper: converts a stored relative path (e.g. "/uploads/x.jpg") to a full URL
export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url; // already absolute
  return `${BACKEND_ORIGIN}${url}`;
}
