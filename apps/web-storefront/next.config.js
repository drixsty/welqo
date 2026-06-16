const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icons/favicon.svg",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/combien-rapporte-airbnb-lille-2025",
        destination: "/blog/combien-rapporte-airbnb-lille-2026",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/blog/combien-rapporte-airbnb-lille-2025",
        destination: "/:locale/blog/combien-rapporte-airbnb-lille-2026",
        permanent: true,
      },
      {
        source: "/blog/combien-rapporte-airbnb-lens-2025",
        destination: "/blog/combien-rapporte-airbnb-lens-2026",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/blog/combien-rapporte-airbnb-lens-2025",
        destination: "/:locale/blog/combien-rapporte-airbnb-lens-2026",
        permanent: true,
      },
      {
        source: "/blog/combien-rapporte-airbnb-arras-2025",
        destination: "/blog/combien-rapporte-airbnb-arras-2026",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/blog/combien-rapporte-airbnb-arras-2025",
        destination: "/:locale/blog/combien-rapporte-airbnb-arras-2026",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
