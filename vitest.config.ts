import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/.next/**",
    ],
  },
});
