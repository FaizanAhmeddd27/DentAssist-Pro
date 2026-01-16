import { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  }
} as NextConfig;

export default nextConfig;
