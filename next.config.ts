import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the smallest format each browser supports.
    formats: ["image/avif", "image/webp"],
    // 75 = default for card pictures, 90 keeps the faint grid in the page background.
    qualities: [75, 90],
  },
};

export default nextConfig;
