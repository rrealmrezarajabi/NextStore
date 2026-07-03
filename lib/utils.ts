import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeImageSrc(url?: string | null): string {
  const fallback = "/placeholders/product.png";
  const imageUrl = url?.trim();

  if (!imageUrl) {
    return fallback;
  }

  if (/\.svg(?:$|[?#])/i.test(imageUrl)) {
    return fallback;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("//")) {
    return fallback;
  }

  if (!imageUrl.startsWith("/")) {
    return `/${imageUrl}`;
  }

  if (imageUrl.includes("..")) {
    return "/placeholders/product.png";
  }

  return imageUrl;
}
