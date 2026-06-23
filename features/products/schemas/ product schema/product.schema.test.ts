import { describe, it, expect } from "vitest";
import { createProductSchema } from "./product.schema";

describe("createProductSchema", () => {
  it("passes with valid product data", () => {
    const result = createProductSchema.safeParse({
      title: "Test Product",
      price: 100.99,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(true);
  });

  it("passes with a decimal price", () => {
    const result = createProductSchema.safeParse({
      title: "Test Product",
      price: 19.99,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(true);
  });

  it("fails when price is zero or negative", () => {
    const result = createProductSchema.safeParse({
      title: "Test Product",
      price: 0,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("fails with no title ", () => {
    const result = createProductSchema.safeParse({
      title: "",
      price: 100,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("fails with no image", () => {
    const result = createProductSchema.safeParse({
      title: "test",
      price: 100,
      description: "A test description",
      categoryId: 1,
      images: [],
    });
    expect(result.success).toBe(false);
  });
});
