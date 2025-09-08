import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ddabong-upload.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
