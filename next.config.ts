import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Exhibit 001 was renamed when its pairing changed; keep shared links working.
    return [{ source: "/archive/the-showman", destination: "/archive/the-chest-thruster", permanent: false }];
  },
};

export default nextConfig;
