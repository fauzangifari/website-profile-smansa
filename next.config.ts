import type { NextConfig } from "next";
import { legacyRedirects } from "./src/config/legacy-redirects";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy — pertahanan berlapis bila sanitasi/escaping lolos.
 *
 * Catatan kompatibilitas:
 * - Next & GSAP/framer-motion menyuntik <script>/<style> inline, jadi
 *   `script-src`/`style-src` memakai `'unsafe-inline'`. Meski begitu, CSP tetap
 *   memblokir MUAT skrip dari origin lain (mis. `<script src=//evil.com>`),
 *   `object`/embed, framing, dan pembajakan `<base>` — mitigasi XSS nyata.
 * - Dev (HMR/React Refresh) butuh `'unsafe-eval'` + koneksi websocket.
 * - Gambar CMS datang dari beberapa host → `img-src https:` + `data:`.
 */
const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", ...(isProd ? [] : ["'unsafe-eval'"])],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", ...(isProd ? [] : ["ws:", "wss:"])],
  "frame-ancestors": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "object-src": ["'none'"],
  "frame-src": ["'self'"],
  ...(isProd ? { "upgrade-insecure-requests": [] } : {}),
};

const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([key, values]) => (values.length ? `${key} ${values.join(" ")}` : key))
  .join("; ");

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
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
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
