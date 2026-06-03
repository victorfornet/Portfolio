import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires quality values to be allowlisted. Pixel-art images use 55.
    qualities: [55, 75],
  },
};

export default nextConfig;
