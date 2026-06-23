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

  it("should not be passed with negative price number", () => {
    const result = createProductSchema.safeParse({
      title: "Test Product",
      price: -100,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("should not be passed with no title ", () => {
    const result = createProductSchema.safeParse({
      title: "",
      price: 100,
      description: "A test description",
      categoryId: 1,
      images: ["image1.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("should not be passed with no image", () => {
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
