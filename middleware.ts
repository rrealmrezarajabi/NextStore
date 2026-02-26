import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!accessToken || !!refreshToken;

  const path = request.nextUrl.pathname;
  const isAdminPage = path.startsWith("/admin");
  const isAuthPage = path === "/login" || path === "/signup";

  
  if (isAdminPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};
