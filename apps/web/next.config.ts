import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/landing.html",
      },
    ];
  },
};

export default nextConfig;
