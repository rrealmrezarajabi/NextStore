import type { NextConfig } from "next";

type RemotePatterns = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>;
type RemotePattern = Exclude<RemotePatterns[number], URL>;

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const backendUrl = new URL(apiUrl);
const backendProtocol = backendUrl.protocol.replace(":", "") as
  | "http"
  | "https";

if (backendProtocol !== "http" && backendProtocol !== "https") {
  throw new Error("NEXT_PUBLIC_API_URL must use http or https.");
}

const uploadPatterns: RemotePattern[] = [
  {
    protocol: backendProtocol,
    hostname: backendUrl.hostname,
    port: backendUrl.port,
    pathname: "/uploads/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "4000",
    pathname: "/uploads/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "4000",
    pathname: "/uploads/**",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: uploadPatterns,
  },
};

export default nextConfig;
