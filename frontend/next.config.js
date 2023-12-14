/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bookmaker-ratings.ru',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
};

module.exports = nextConfig;
