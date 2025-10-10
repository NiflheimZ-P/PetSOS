import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      domains: ['lh3.googleusercontent.com', 'upload.wikimedia.org'], // เพิ่ม host ของรูป
    },
};

export default nextConfig;
