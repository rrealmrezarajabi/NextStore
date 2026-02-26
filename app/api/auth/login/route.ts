import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api/base-url";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: error.message ?? "Invalid credentials" },
      { status: 401 },
    );
  }

  const data = await res.json();
  const response = NextResponse.json({ user: data.user });

  // access_token 
  response.cookies.set("access_token", data.access_token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, 
  });

  // refresh_token 
  response.cookies.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, 
  });

  return response;
}
