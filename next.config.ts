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
  // REMOVED: experimental.turbo - no longer needed in Next.js 16
  // Turbopack is now the default, so this flag is obsolete
}

export default nextConfig