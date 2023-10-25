/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['files.stripe.com'],
  },
};

module.exports = nextConfig;
