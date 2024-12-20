/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  distDir: '.next',
  generateBuildId: async () => {
    return 'build'
  },
  images: {
    domains: ['localhost', 'localhost:5000'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/storage/**',
      },
    ],
  }
}

export default nextConfig
