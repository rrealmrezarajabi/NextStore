import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "@/lib/api/axios";
import { getCart } from "./cart.service";

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
    const mockCart = {
      id: 1,
      items: [{ id: 1, productId: 5, quantity: 2 }],
      total: 100,
    };

    
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockCart });

    const result = await getCart();

    expect(result).toEqual(mockCart);
    expect(apiClient.get).toHaveBeenCalledWith("/cart");
  });
});
