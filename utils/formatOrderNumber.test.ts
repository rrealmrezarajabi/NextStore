import { describe, expect, it } from "vitest";
import {
  formatOrderNumber,
  parseOrderNumber,
} from "./formatOrderNumber";

describe("formatOrderNumber", () => {
  it("formats order ids with the date prefix and padded id", () => {
    expect(formatOrderNumber(5, new Date("2026-06-27T00:00:00Z"))).toBe(
      "ORD-20260627-0005",
    );
  });
});

describe("parseOrderNumber", () => {
  it("extracts the raw order id from a formatted order number", () => {
    expect(parseOrderNumber("ORD-20260627-0005")).toBe(5);
    expect(parseOrderNumber("ord-20260627-0123")).toBe(123);
  });

  it("returns null for non-order-number searches", () => {
    expect(parseOrderNumber("paid")).toBeNull();
    expect(parseOrderNumber("ORD-20260627-0000")).toBeNull();
  });
});
