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

  async redirects() {
    return [
      {
        source: "/member/profile/:login((?!@).+)", // @가 없는 경우만 매칭
        destination: "/member/profile/@:login", // @ 추가하여 리다이렉트
        permanent: true,
      },
    ];
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
