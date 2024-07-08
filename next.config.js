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
  /*
  IN CASE OF CACHE ISSUES
  async headers() {
    return [
      {
        source: '/:path*', // Apply this rule to all paths
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate', // Cache for 1 day, then revalidate
          },
        ],
      },
    ];
  },*/
};

module.exports = nextConfig;
