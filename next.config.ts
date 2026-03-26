/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
      },
    ],
  },

  // ✅ ADD THIS
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;