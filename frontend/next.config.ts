import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "10.236.30.82",
    "10.236.30.*",
    "192.168.*.*",
    "172.20.*.*"
  ],
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
