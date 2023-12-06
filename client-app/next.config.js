/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ['auction-zone-bucket.s3.us-east-2.amazonaws.com'],
  },
};
