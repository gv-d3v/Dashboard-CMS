/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        //port: "",
        //pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
