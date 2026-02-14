import { apiFetch } from "./http";
import type {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/lib/types/auth";

export function login(payload: LoginRequest) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProfile(accessToken: string) {
  return apiFetch<ProfileResponse>("/auth/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function refreshAccessToken(payload: RefreshRequest) {
  return apiFetch<RefreshResponse>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
