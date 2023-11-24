/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@balkangraph/familytree.js'],
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'primefaces.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
