import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.scdn.co', 
      'mosaic.scdn.co',
      'image-cdn-fa.spotifycdn.com',
      'image-cdn-ak.spotifycdn.com'
    ],
  },
};

export default nextConfig;
