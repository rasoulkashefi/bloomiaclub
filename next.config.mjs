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
  async rewrites() {
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
    const isEu = posthogHost.includes('eu.i.posthog.com') || posthogHost.includes('eu.posthog.com');
    const assetHost = isEu ? 'https://eu-assets.i.posthog.com' : 'https://us-assets.i.posthog.com';
    const apiHost = isEu ? 'https://eu.i.posthog.com' : 'https://us.i.posthog.com';

    return [
      {
        source: '/ingest/static/:path*',
        destination: `${assetHost}/static/:path*`,
      },
      {
        source: '/ingest/:path*',
        destination: `${apiHost}/:path*`,
      },
      {
        source: '/ingest/decide',
        destination: `${apiHost}/decide`,
      },
    ];
  },
  // Required by PostHog to support trailing slash API calls through the proxy
  skipTrailingSlashRedirect: true,
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
