import type { CoachProfile } from '@/lib/coaches';

const SITE_URL = 'https://bloomiaclub.com';

const serialize = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Server-rendered Schema.org: Person, Service, FAQPage and BreadcrumbList. */
export function CoachJsonLd({ coach }: { coach: CoachProfile }) {
  const url = `${SITE_URL}/coaches/${coach.slug}`;
  const personId = `${url}#person`;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: coach.name,
    jobTitle: coach.title,
    description: coach.shortBio || coach.description,
    image: coach.imageUrl ? (coach.imageUrl.startsWith('http') ? coach.imageUrl : `${SITE_URL}${coach.imageUrl}`) : undefined,
    url,
    knowsAbout: coach.specialties?.length ? coach.specialties : undefined,
    sameAs: [coach.instagramUrl, coach.linkedinUrl].filter(Boolean).length
      ? [coach.instagramUrl, coach.linkedinUrl].filter(Boolean)
      : undefined,
    knowsLanguage: coach.languages?.length ? coach.languages : undefined,
    worksFor: { '@type': 'Organization', name: 'بلومیا کلاب', url: SITE_URL },
    hasCredential: coach.credentials?.length
      ? coach.credentials.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.title,
          recognizedBy: { '@type': 'Organization', name: c.organization },
        }))
      : undefined,
  };

  /* Offers: prices are stored in Toman; schema.org expects a currency code, so they are sent as IRR (x10). */
  const services = [
    ...(coach.services ?? []).map((s) => ({
      name: s.title,
      description: s.description,
      price: s.isFree ? 0 : undefined,
    })),
    ...(coach.packagesData ?? []).map((p) => ({
      name: p.title,
      description: p.description,
      price: p.price > 0 ? p.price * 10 : undefined,
    })),
  ].map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    serviceType: 'کوچینگ',
    provider: { '@id': personId },
    areaServed: 'IR',
    offers:
      s.price !== undefined
        ? { '@type': 'Offer', price: s.price, priceCurrency: 'IRR', url }
        : undefined,
  }));

  const faq = coach.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: coach.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'بلومیا کلاب', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'کوچ‌ها', item: `${SITE_URL}/coaches` },
      { '@type': 'ListItem', position: 3, name: coach.name, item: url },
    ],
  };

  const blocks = [person, ...services, faq, breadcrumb].filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  );
}
