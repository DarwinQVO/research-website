import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Comentamos output: 'export' para permitir API routes
  // output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
