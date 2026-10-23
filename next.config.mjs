/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'bloomiaclub.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/coaches/:slug/v4',
        destination: '/coaches/:slug',
        permanent: true,
      },
      {
        source: '/coaches/:slug/v3',
        destination: '/coaches/:slug',
        permanent: true,
      },
      {
        source: '/coaches/:slug/v2',
        destination: '/coaches/:slug',
        permanent: true,
      },
      {
        source: '/solea',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
