import type { MetadataRoute } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { getAllPostSlugs } from '@/lib/posts';
import { getAllEvents } from '@/lib/events';

const BASE_URL = 'https://bloomiaclub.com';
const SITE_LAUNCH_DATE = new Date('2026-10-15T00:00:00Z');

function toValidDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [coaches, postSlugs, events] = await Promise.all([
    getAllCoaches().catch(() => []),
    getAllPostSlugs().catch(() => []),
    getAllEvents().catch(() => []),
  ]);

  const allDates = [
    ...coaches.map((c) => c.updatedAt),
    ...postSlugs.map((p) => p.updatedAt),
    ...events.map((e) => e.updatedAt),
  ]
    .map((d) => (d ? new Date(d).getTime() : NaN))
    .filter((t) => !Number.isNaN(t));

  const latestContentDate =
    allDates.length > 0 ? new Date(Math.max(...allDates)) : SITE_LAUNCH_DATE;

  // 1. Core High-Priority Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/coaches`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching/free-intro-session`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching/what-is-coaching`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestContentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: latestContentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: SITE_LAUNCH_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. Individual Coach Profiles
  const coachRoutes: MetadataRoute.Sitemap = coaches.map((coach) => ({
    url: `${BASE_URL}/coaches/${coach.slug}`,
    lastModified: toValidDate(coach.updatedAt, SITE_LAUNCH_DATE),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Blog Articles
  const blogRoutes: MetadataRoute.Sitemap = postSlugs.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: toValidDate(post.updatedAt, SITE_LAUNCH_DATE),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Events & Workshops
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: toValidDate(event.updatedAt, SITE_LAUNCH_DATE),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...coachRoutes, ...blogRoutes, ...eventRoutes];
}
