import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./data/**/*'], // Paksa bawa folder data ke semua API
    },
  },
};

export default nextConfig;
