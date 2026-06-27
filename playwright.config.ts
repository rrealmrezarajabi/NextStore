import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

/**
 * Load env vars (E2E_CUSTOMER_EMAIL, E2E_ADMIN_EMAIL, ...) from a .env file
 * before the config (and the tests that read process.env) run.
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/dashboard')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // از کروم نصب‌شده‌ی خود سیستم استفاده می‌کنه، نه باینری دانلودی پلی‌رایت
        // به همین خاطر نیازی به "npx playwright install" نیست
        channel: "chrome",
      },
    },

    // فایرفاکس و وبکیت رو بعداً که فلوها جا افتاد می‌تونی اضافه کنی
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
