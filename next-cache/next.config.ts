import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/old-blog",
        destination: "/blog",
        permanent: true, // 301 redirect
      },
      {
        source: "/blog/:id",
        destination: "/posts/:id",
        permanent: false, // Dyanmic redirect
      },
    ];
  },
};

export default nextConfig;
