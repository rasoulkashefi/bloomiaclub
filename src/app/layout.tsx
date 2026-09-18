import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bloomiaclub.com'),
  title: {
    default: 'بلومیا کلاب | پلتفرم تخصصی کوچینگ و توسعه فردی',
    template: '%s | بلومیا کلاب',
  },
  description:
    'بلومیا کلاب، پلتفرم پیشرو در ارائه جلسات کوچینگ فردی، شغلی و کسب‌وکار با همراهی برترین کوچ‌های دارای مدرک بین‌المللی ICF در ایران.',
  keywords: [
    'کوچینگ',
    'کوچینگ فردی',
    'کوچینگ شغلی',
    'توسعه فردی',
    'مربی رشد',
    'بلومیا کلاب',
    'جلسه معارفه رایگان کوچینگ',
  ],
  authors: [{ name: 'بلومیا کلاب', url: 'https://bloomiaclub.com' }],
  creator: 'Bloomia Club',
  publisher: 'Bloomia Club',
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
  alternates: {
    canonical: 'https://bloomiaclub.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://bloomiaclub.com',
    siteName: 'بلومیا کلاب',
    title: 'بلومیا کلاب | پلتفرم تخصصی کوچینگ و توسعه فردی',
    description:
      'همراه شما در مسیر شکوفایی فردی و شغلی با برترین مربیان و کوچ‌های معتبر بین‌المللی.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'بلومیا کلاب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بلومیا کلاب | پلتفرم تخصصی کوچینگ و توسعه فردی',
    description:
      'همراه شما در مسیر شکوفایی فردی و شغلی با برترین مربیان و کوچ‌های معتبر بین‌المللی.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/images/logo_bloomia_icon.png',
    apple: '/images/logo_bloomia_icon.png',
  },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'بلومیا کلاب',
  alternateName: 'Bloomia Club',
  url: 'https://bloomiaclub.com',
  logo: 'https://bloomiaclub.com/images/bloomia-club-logo.png',
  description: 'پلتفرم تخصصی کوچینگ فردی، کسب‌وکار و توسعه شغلی با مربیان معتبر ICF',
  sameAs: [
    'https://instagram.com/bloomiaclub',
    'https://linkedin.com/company/bloomiaclub',
    'https://t.me/bloomiaclub',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+98-21-91000000',
    contactType: 'customer support',
    areaServed: 'IR',
    availableLanguage: 'Persian',
  },
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'بلومیا کلاب',
  url: 'https://bloomiaclub.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bloomiaclub.com/coaches?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-screen bg-brand-surface font-sans text-brand-neutral-900 antialiased flex flex-col selection:bg-brand-teal-900 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
