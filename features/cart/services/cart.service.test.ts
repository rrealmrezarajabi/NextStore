import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "@/lib/api/axios";
import { addCartItem, getCart } from "./cart.service";
import { AddCartItemPayload, Cart } from "../types";

vi.mock("@/lib/api/axios", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("getCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches the cart and returns the data", async () => {
    const mockCart: Cart = {
      items: [
        {
          id: 1,
          quantity: 2,
          subtotal: 200,
          product: { id: 5, title: "Test Product", price: 100 },
        },
      ],
      totalItems: 2,
      total: 200,
    };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockCart });

    const result = await getCart();

    expect(result).toEqual(mockCart);
    expect(apiClient.get).toHaveBeenCalledWith("/cart");
  });
});

describe("addCartItem", () => {
  it("sends the payload and returns the updated cart", async () => {
    const payload: AddCartItemPayload = { productId: 5, quantity: 2 };

    const mockCart: Cart = {
      items: [
        {
          id: 1,
          quantity: 2,
          subtotal: 200,
          product: { id: 5, title: "Test Product", price: 100 },
        },
      ],
      totalItems: 2,
      total: 200,
    };

    vi.mocked(apiClient.post).mockResolvedValue({ data: mockCart });

    const result = await addCartItem(payload);

    expect(result).toEqual(mockCart);
    expect(apiClient.post).toHaveBeenCalledWith("/cart/items", payload);
  });
});
