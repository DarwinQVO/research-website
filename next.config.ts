import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export works with Cloudflare Functions
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
