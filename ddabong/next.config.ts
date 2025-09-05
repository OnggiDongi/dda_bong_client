import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ddabong-upload.s3.ap-northeast-2.amazonaws.com',
      },
      {
        hostname: 'k.kakaocdn.net',
      },
      {
        hostname: 'img1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
