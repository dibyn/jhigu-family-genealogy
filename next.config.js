/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@balkangraph/familytree.js'],
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
};

module.exports = nextConfig;
