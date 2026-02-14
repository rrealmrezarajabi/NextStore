export type LoginRequest = { email: string; password: string };
export type LoginResponse = { access_token: string; refresh_token: string };

export type ProfileResponse = {
  id: number;
  email: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
};

export type RefreshRequest = { refreshToken: string };
export type RefreshResponse = { access_token: string; refresh_token: string };
