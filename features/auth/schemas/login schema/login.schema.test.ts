import { describe, it, expect } from "vitest";
import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("passes with a valid email and non-empty password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("fails when email is empty", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "123456",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });

  it("fails when email format is invalid", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "123456",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please enter a valid email address",
      );
    }
  });

  it("fails when password is empty", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password is required");
    }
  });

  it("fails when both email and password are missing", () => {
    const result = loginSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
