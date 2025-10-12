import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      domains: ['lh3.googleusercontent.com', 'upload.wikimedia.org', 'example.com'], // เพิ่ม host ของรูป
    },
    eslint: {
    // ignores ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
