import { describe, it, expect } from "vitest";
import { registerSchema } from "./register.schema";

const validData = {
  firstName: "John",
  lastName: "Doe",
  username: "john_doe",
  email: "john@example.com",
  password: "secret123",
};

describe("registerSchema", () => {
  it("passes with valid data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when firstName is empty", () => {
    const result = registerSchema.safeParse({ ...validData, firstName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("First name is required");
    }
  });

  it("fails when lastName is empty", () => {
    const result = registerSchema.safeParse({ ...validData, lastName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Last name is required");
    }
  });

  it("fails when username is shorter than 3 characters", () => {
    const result = registerSchema.safeParse({ ...validData, username: "jo" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Username must be at least 3 characters",
      );
    }
  });

  it("passes when username is exactly 3 characters", () => {
    const result = registerSchema.safeParse({ ...validData, username: "joe" });
    expect(result.success).toBe(true);
  });

  it("fails when email is empty", () => {
    const result = registerSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });

  it("fails when email format is invalid", () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please enter a valid email address",
      );
    }
  });

  it("fails when password is shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "short1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Password must be at least 8 characters",
      );
    }
  });

  it("passes when password is exactly 8 characters", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});
