import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIES = ["access_token", "refresh_token"] as const;

const PROTECTED_PATHS = ["/dashboard", "/admin"] as const;
const AUTH_PATHS = ["/login", "/register"] as const;

function hasAuthCookie(req: NextRequest) {
  return AUTH_COOKIES.some((name) => req.cookies.get(name)?.value);
}

function isProtected(pathname: string) {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isProtectedRoute = isProtected(pathname);
  const isAuthRoute = isAuthPath(pathname);
  const isLoggedIn = hasAuthCookie(req);

  if (isAuthRoute && isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";

    return NextResponse.redirect(url);
  }

  if (!isProtectedRoute || isLoggedIn) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", pathname + search);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
