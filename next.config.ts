import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ]
  },
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug*", destination: "/blog/:slug*", permanent: true },
      { source: "/home-builders-canberra", destination: "/new-home-builders-canberra", permanent: true },
      { source: "/pages/about.html", destination: "/about", permanent: true },
      { source: "/pages/projects.html", destination: "/projects", permanent: true },
      { source: "/pages/contact.html", destination: "/contact", permanent: true },
      { source: "/pages/blog.html", destination: "/blog", permanent: true }
    ];
  },
  experimental: {
    optimizePackageImports: ["gray-matter"]
  }
};

export default nextConfig;
