import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    
  },
  transpilePackages: ["next-sanity"],
};

export default nextConfig;
