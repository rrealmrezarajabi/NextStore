export const SESSION_EXPIRED_EVENT = "nextstore:session-expired";

let hasNotifiedSessionExpired = false;

function isAuthPage(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

export function resetSessionExpiredNotice() {
  hasNotifiedSessionExpired = false;
}

export function notifySessionExpired() {
  if (typeof window === "undefined" || hasNotifiedSessionExpired) return;

  hasNotifiedSessionExpired = true;

  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));

  const { pathname, search } = window.location;

  if (isAuthPage(pathname)) return;

  const loginUrl = new URL("/login", window.location.origin);
  loginUrl.searchParams.set("redirect", `${pathname}${search}`);

  window.location.assign(loginUrl.toString());
}
