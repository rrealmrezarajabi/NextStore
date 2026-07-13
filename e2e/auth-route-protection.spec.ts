import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Test credentials must point to real seeded users in your database.
// We read them from env vars (don't hardcode real creds in the repo).
// ---------------------------------------------------------------------------
const CUSTOMER_EMAIL = process.env.E2E_CUSTOMER_EMAIL;
const CUSTOMER_PASSWORD = process.env.E2E_CUSTOMER_PASSWORD;
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD;

if (!CUSTOMER_EMAIL || !CUSTOMER_PASSWORD || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error(
    "Missing E2E test credentials. Set E2E_CUSTOMER_EMAIL, E2E_CUSTOMER_PASSWORD, " +
      "E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD (e.g. in a .env file loaded by dotenv).",
  );
}

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

// ---------------------------------------------------------------------------
// 1-3: Guest access to protected routes (handled by proxy.ts)
// ---------------------------------------------------------------------------
test.describe("Guest access to protected routes", () => {
  test("visiting /dashboard redirects to /login with redirect param", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    // Parsing the URL instead of comparing raw strings avoids fighting with
    // %2F-style encoding of the redirect query value.
    const url = new URL(page.url());
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("redirect")).toBe("/dashboard");
  });

  test("visiting /admin redirects to /login with redirect param", async ({
    page,
  }) => {
    await page.goto("/admin");

    const url = new URL(page.url());
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("redirect")).toBe("/admin");
  });

  test("visiting /dashboard/orders?page=2 preserves the full path and query", async ({
    page,
  }) => {
    await page.goto("/dashboard/orders?page=2");

    // proxy.ts builds the redirect param from `pathname + search`,
    // so the full original path+query should come back intact (decoded).
    const url = new URL(page.url());
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("redirect")).toBe("/dashboard/orders?page=2");
  });
});

// ---------------------------------------------------------------------------
// 4-6: Authenticated access (login + role-based guards)
// ---------------------------------------------------------------------------
test.describe("Authenticated access", () => {
  test("customer can log in and lands on /dashboard", async ({ page }) => {
    await login(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL("/dashboard");
  });

  test("logged-in user cannot visit /login or /register", async ({ page }) => {
    await login(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL("/dashboard");

    await page.goto("/login");
    await expect(page).toHaveURL("/dashboard");

    await page.goto("/register");
    await expect(page).toHaveURL("/dashboard");
  });

  test("customer cannot access /admin and is redirected to /dashboard", async ({
    page,
  }) => {
    await login(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL("/dashboard");

    await page.goto("/admin");

    // RequireAdmin fetches the profile, sees role !== "admin", and replaces
    // the route with /dashboard. expect() auto-waits for that to resolve.
    await expect(page).toHaveURL("/dashboard");
  });

  test("admin can log in and access /admin", async ({ page }) => {
    await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);

    // useLogin always pushes to /dashboard first, regardless of role —
    // it does not redirect straight to /admin.
    await expect(page).toHaveURL("/dashboard");

    // From there, an admin navigating to /admin should be let through.
    await page.goto("/admin");
    await expect(page).toHaveURL("/admin");
  });
});

// ---------------------------------------------------------------------------
// 7: Logout
// ---------------------------------------------------------------------------
test.describe("Logout", () => {
  test("logged-in user can log out and then cannot access /dashboard", async ({
    page,
  }) => {
    await login(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL("/dashboard");

    await page.getByRole("button", { name: /Logout/i }).click();
    await expect(page).toHaveURL("/login");

    // Auth cookies should now be cleared server-side, so the proxy
    // should bounce us back to /login with a redirect param.
    await page.goto("/dashboard");
    const url = new URL(page.url());
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("redirect")).toBe("/dashboard");
  });

  test("logged-out user can still access the public home page", async ({
    page,
  }) => {
    await login(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL("/dashboard");

    await page.getByRole("button", { name: /Logout/i }).click();
    await expect(page).toHaveURL("/login");

    await page.goto("/");
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Products" }),
    ).toBeVisible();
  });
});
