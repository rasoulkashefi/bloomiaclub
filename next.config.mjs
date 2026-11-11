/** @type {import('next').NextConfig} */
const cspDirectives = [
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "frame-src 'self' https://atyno.com https://*.atyno.com https://calendly.com https://*.calendly.com",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(), microphone=()',
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives,
          },
        ],
      },
      {
        source: '/.well-known/ard.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
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
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/coaches/:slug/book-session',
        destination: '/coaches/:slug',
        permanent: true,
      },
      {
        source: '/coaches/parmiss_yari',
        destination: '/coaches/parmiss-yari',
        permanent: true,
      },
      {
        source: '/coaches/mahya-shakoori',
        destination: '/coaches/mahya_shakoori',
        permanent: true,
      },
      {
        source: '/coaches/mahya_shakouri',
        destination: '/coaches/mahya_shakoori',
        permanent: true,
      },
      {
        source: '/coaches/mahya-shakouri',
        destination: '/coaches/mahya_shakoori',
        permanent: true,
      },
      {
        source: '/coaches/arezoo-ghaffari',
        destination: '/coaches/Arezoo_Ghaffari',
        permanent: true,
      },
      // Note: Next.js redirects() matching is case-insensitive, so /coaches/arezoo_ghaffari
      // is handled case-sensitively inside app/coaches/[slug]/page.tsx instead of here.
      {
        source: '/coaches/fatemeh_derakhsh',
        destination: '/coaches/fatemeh-derakhsh',
        permanent: true,
      },
      {
        source: '/coaches/fatemeh-darkhosh',
        destination: '/coaches/fatemeh-derakhsh',
        permanent: true,
      },
      {
        source: '/coaches/fatemeh_darkhosh',
        destination: '/coaches/fatemeh-derakhsh',
        permanent: true,
      },
      {
        source: '/coaches/payam_esmi',
        destination: '/coaches/payam-esmi',
        permanent: true,
      },
      {
        source: '/coaches/maryam-johari',
        destination: '/coaches/maryam_johari',
        permanent: true,
      },
      {
        source: '/coaches/shabnam-nematimalek',
        destination: '/coaches/shabnam_nematimalek',
        permanent: true,
      },
      {
        source: '/coaches/shabnam_nemati',
        destination: '/coaches/shabnam_nematimalek',
        permanent: true,
      },
      {
        source: '/coaches/shabnam-nemati',
        destination: '/coaches/shabnam_nematimalek',
        permanent: true,
      },
      {
        source: '/coaches/saloomeh-fathijou',
        destination: '/coaches/saloomeh_fathijou',
        permanent: true,
      },
      {
        source: '/coaches/salomeh_fathijou',
        destination: '/coaches/saloomeh_fathijou',
        permanent: true,
      },
      {
        source: '/coaches/salomeh-fathijou',
        destination: '/coaches/saloomeh_fathijou',
        permanent: true,
      },
      {
        source: '/coaches/fatemeh-esmaeeli',
        destination: '/coaches/fatemeh_esmaeeli',
        permanent: true,
      },
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
