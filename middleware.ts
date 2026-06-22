import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIES = ["access_token", "refresh_token"] as const;

const PROTECTED_PATHS = ["/dashboard", "/admin"] as const;

function hasAuthCookie(req: NextRequest) {
  return AUTH_COOKIES.some((name) => req.cookies.get(name)?.value);
}

function isProtected(pathname: string) {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isProtectedRoute = isProtected(pathname);
  const isLoggedIn = hasAuthCookie(req);

  if (!isProtectedRoute || isLoggedIn) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", pathname + search);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
