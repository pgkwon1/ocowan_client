/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
        port: "443",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },

      {
        protocol: "https",
        hostname: "ocowanstorage.blob.core.windows.net",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
