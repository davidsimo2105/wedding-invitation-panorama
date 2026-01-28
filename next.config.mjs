/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Optimize font loading
  optimizeFonts: true,
};

export default nextConfig;
