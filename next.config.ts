import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // Turbopack configuration for Next.js 16
  experimental: {
    turbo: {
      // Turbopack config if needed
    },
  },
}

export default nextConfig