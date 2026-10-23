import type { MetadataRoute } from 'next';
import { getAllCoaches } from '@/lib/coaches';
import { getAllPostSlugs } from '@/lib/posts';
import { getAllEvents } from '@/lib/events';

const BASE_URL = 'https://bloomiaclub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [coaches, postSlugs, events] = await Promise.all([
    getAllCoaches().catch(() => []),
    getAllPostSlugs().catch(() => []),
    getAllEvents().catch(() => []),
  ]);

  const now = new Date();

  // 1. Core High-Priority Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/coaches`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching/free-intro-session`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/coaching/what-is-coaching`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. Individual Coach Profiles
  const coachRoutes: MetadataRoute.Sitemap = coaches.map((coach) => ({
    url: `${BASE_URL}/coaches/${coach.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Blog Articles
  const blogRoutes: MetadataRoute.Sitemap = postSlugs.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Events & Workshops
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...coachRoutes, ...blogRoutes, ...eventRoutes];
}
