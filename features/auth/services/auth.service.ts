import { apiClient } from "@/lib/api/axios";
import type { LoginDTO, RegisterDTO } from "../types";
import type { Profile } from "@/features/profile/types";

type AuthResponse = {
  user: Profile;
};

export async function register(data: RegisterDTO): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>("/auth/register", data);
  return res.data;
}

export async function login(data: LoginDTO): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<{ success: boolean }> {
  const res = await apiClient.post<{ success: boolean }>("/auth/logout");
  return res.data;
}

export async function refreshSession(): Promise<{ success: boolean }> {
  const res = await apiClient.post<{ success: boolean }>("/auth/refresh");
  return res.data;
}
