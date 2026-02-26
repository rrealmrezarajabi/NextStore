function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getTokenFromCookie();

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // if token is expired, refresh it
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });

    if (!refreshRes.ok) {
      // redirect to login
      window.location.href = "/login";
      return res;
    }

    // retry with new token
    const newToken = getTokenFromCookie();
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      },
    });
  }

  return res;
}
