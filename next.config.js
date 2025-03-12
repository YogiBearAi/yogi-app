/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/questionnaire',
        destination: '/questionnaire/',
        permanent: true,
      },
    ]
  }
};

module.exports = nextConfig;