/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/thiagobardini",
        permanent: false,
      },
    ];
  },
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
