import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/lib/api/axios";
import { getAllOrders } from "./order.service";
import type { PaginatedOrders } from "../types";

vi.mock("@/lib/api/axios", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("getAllOrders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends formatted order number searches as raw order ids", async () => {
    const mockOrders: PaginatedOrders = {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockOrders });

    const result = await getAllOrders({
      search: "ORD-20260627-0005",
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(mockOrders);
    expect(apiClient.get).toHaveBeenCalledWith("/orders", {
      params: { search: undefined, orderId: 5, page: 1, limit: 10 },
    });
  });

  it("keeps customer name searches as search terms", async () => {
    const mockOrders: PaginatedOrders = {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockOrders });

    await getAllOrders({
      search: "Jane Doe",
      page: 1,
      limit: 10,
    });

    expect(apiClient.get).toHaveBeenCalledWith("/orders", {
      params: {
        search: "Jane Doe",
        orderId: undefined,
        page: 1,
        limit: 10,
      },
    });
  });
});
