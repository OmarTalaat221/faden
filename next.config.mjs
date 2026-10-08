/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Images uploaded from the admin dashboard are served by the API host;
    // without this next/image refuses to render them.
    remotePatterns: [
      { protocol: "https", hostname: "api.faden.digital", pathname: "/uploads/**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
