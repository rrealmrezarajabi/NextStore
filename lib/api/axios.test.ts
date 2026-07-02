import { beforeEach, describe, expect, it, vi } from "vitest";

type RejectedHandler = (error: unknown) => Promise<unknown>;

const axiosMock = vi.hoisted(() => {
  let rejectedHandler: RejectedHandler | null = null;

  const client = vi.fn((config: unknown) =>
    Promise.resolve({ data: "retried", config }),
  ) as ReturnType<typeof vi.fn> & {
    post: ReturnType<typeof vi.fn>;
    interceptors: {
      response: {
        use: ReturnType<typeof vi.fn>;
      };
    };
  };

  client.post = vi.fn();
  client.interceptors = {
    response: {
      use: vi.fn((_onFulfilled, onRejected: RejectedHandler) => {
        rejectedHandler = onRejected;
      }),
    },
  };

  return {
    client,
    getRejectedHandler: () => rejectedHandler,
    reset: () => {
      rejectedHandler = null;
      client.mockClear();
      client.post.mockReset();
      client.interceptors.response.use.mockClear();
    },
  };
});

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => axiosMock.client),
  },
}));

function createUnauthorizedError(url: string) {
  return {
    response: { status: 401 },
    config: { url },
  };
}

async function setupInterceptor() {
  vi.resetModules();
  axiosMock.reset();

  await import("./axios");

  const rejectedHandler = axiosMock.getRejectedHandler();

  if (!rejectedHandler) {
    throw new Error("Axios response interceptor was not registered");
  }

  return rejectedHandler;
}

describe("apiClient auth refresh interceptor", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("shares one refresh request across concurrent 401 responses", async () => {
    const rejectedHandler = await setupInterceptor();
    let resolveRefresh: (() => void) | undefined;

    axiosMock.client.post.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveRefresh = resolve;
      }),
    );

    const firstRetry = rejectedHandler(createUnauthorizedError("/cart"));
    const secondRetry = rejectedHandler(createUnauthorizedError("/orders/my"));

    expect(axiosMock.client.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.client.post).toHaveBeenCalledWith("/auth/refresh");

    resolveRefresh?.();

    await expect(firstRetry).resolves.toMatchObject({
      data: "retried",
    });
    await expect(secondRetry).resolves.toMatchObject({
      data: "retried",
    });

    expect(axiosMock.client).toHaveBeenCalledTimes(2);
  });

  it("does not try to refresh auth endpoint failures", async () => {
    const rejectedHandler = await setupInterceptor();
    const loginError = createUnauthorizedError("/auth/login");

    await expect(rejectedHandler(loginError)).rejects.toBe(loginError);

    expect(axiosMock.client.post).not.toHaveBeenCalled();
    expect(axiosMock.client).not.toHaveBeenCalled();
  });

  it("announces session expiry and redirects once when refresh fails", async () => {
    const rejectedHandler = await setupInterceptor();
    const assign = vi.fn();
    const dispatchEvent = vi.fn();

    vi.stubGlobal("window", {
      dispatchEvent,
      location: {
        origin: "http://localhost:3000",
        pathname: "/dashboard/orders",
        search: "?page=2",
        assign,
      },
    });

    axiosMock.client.post.mockRejectedValue(new Error("refresh failed"));

    const firstFailure = rejectedHandler(createUnauthorizedError("/cart"));
    const secondFailure = rejectedHandler(createUnauthorizedError("/orders/my"));

    await expect(firstFailure).rejects.toThrow("refresh failed");
    await expect(secondFailure).rejects.toThrow("refresh failed");

    expect(axiosMock.client.post).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent.mock.calls[0]?.[0]).toMatchObject({
      type: "nextstore:session-expired",
    });
    expect(assign).toHaveBeenCalledTimes(1);
    expect(assign).toHaveBeenCalledWith(
      "http://localhost:3000/login?redirect=%2Fdashboard%2Forders%3Fpage%3D2",
    );
  });
});
