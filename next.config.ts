import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const backendUrl = new URL(apiUrl);
const backendProtocol = backendUrl.protocol.replace(":", "");

if (backendProtocol !== "http" && backendProtocol !== "https") {
  throw new Error("NEXT_PUBLIC_API_URL must use http or https.");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendProtocol,
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
