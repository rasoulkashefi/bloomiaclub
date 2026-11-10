import { NextResponse } from 'next/server';
import { getAllCoaches } from '@/lib/coaches';

export const revalidate = 3600;

/**
 * Read-only coach discovery endpoint used by WebMCP client tools and AI agents.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    const limitParam = Number(searchParams.get('limit'));
    const coaches = await getAllCoaches();

    const filtered = query
      ? coaches.filter((c) => {
          const haystack = [c.name, c.title, c.description, ...(c.specialties || [])]
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        })
      : coaches;

    const sliced =
      Number.isFinite(limitParam) && limitParam > 0
        ? filtered.slice(0, Math.min(limitParam, 20))
        : filtered;

    const results = sliced.map((c) => ({
      slug: c.slug,
      name: c.name,
      title: c.title,
      description: c.description,
      specialties: c.specialties,
      rating: c.rating,
      totalReviews: c.totalReviews,
      coachingHours: c.coachingHours,
      satisfiedClients: c.satisfiedClients,
      profileUrl: `https://bloomiaclub.com/coaches/${c.slug}`,
      freeIntroUrl: `https://bloomiaclub.com/coaching/free-intro-session?coach=${c.slug}`,
    }));

    return NextResponse.json(
      {
        count: results.length,
        coaches: results,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'خطا در دریافت فهرست کوچ‌ها' },
      { status: 500 }
    );
  }
}
