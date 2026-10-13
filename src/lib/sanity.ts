import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

import { ALL_COACHES_QUERY, COACH_BY_SLUG_QUERY } from './coach-sync.mjs';

export const sanityConfig = {
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.REACT_APP_SANITY_PROJECT_ID ||
    '7yjhdw88',
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.REACT_APP_SANITY_DATASET ||
    'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  // Never show unpublished drafts on the public site, even when a token is present.
  perspective: 'published' as const,
};

export const sanityClient = createClient(sanityConfig);

export const sanityWriteClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}

// GROQ queries for Coaches (single source: src/lib/coach-sync.mjs)
export const coachesQuery: string = ALL_COACHES_QUERY;
export const coachBySlugQuery: string = COACH_BY_SLUG_QUERY;

