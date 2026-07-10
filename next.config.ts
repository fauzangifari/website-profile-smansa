import type { NextConfig } from "next";
import { legacyRedirects } from "./src/config/legacy-redirects";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sman1samarinda.sch.id",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "sims.sman1samarinda.sch.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn01-sgp.janjianaja.net",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },
  async redirects() {
    return legacyRedirects;
  },
  // Header keamanan dasar untuk seluruh route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
