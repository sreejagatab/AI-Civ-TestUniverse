/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/AI-Civ-TestUniverse',
  assetPrefix: '/AI-Civ-TestUniverse/',
};

module.exports = nextConfig;
