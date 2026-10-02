import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khmer-topup.com',
      },
      {
        protocol: 'https',
        hostname: 'www.khoemstore.com',
      },
      {
        protocol: 'https',
        hostname: 'khoemstore.com',
      },
    ],
  },
};

export default nextConfig;
