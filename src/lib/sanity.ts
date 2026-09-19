import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

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

// GROQ queries for Coaches
export const coachesQuery = `*[_type == "coach" && isActive != false] | order(order asc, _createdAt desc) {
  _id,
  "id": _id,
  "slug": slug.current,
  name,
  title,
  description,
  longDescription,
  "imageUrl": avatar.asset->url,
  "coverImage": coverImage.asset->url,
  specialties,
  rating,
  totalReviews,
  totalSessions,
  coachingHours,
  satisfiedClients,
  videoUrl,
  videoCover,
  videoTitle,
  videoDescription,
  packagePrices,
  packageDiscounts,
  instagramUrl,
  linkedinUrl,
  bookingUrl
}`;

export const coachBySlugQuery = `*[_type == "coach" && slug.current == $slug && isActive != false][0] {
  _id,
  "id": _id,
  "slug": slug.current,
  name,
  title,
  description,
  longDescription,
  "imageUrl": avatar.asset->url,
  "coverImage": coverImage.asset->url,
  specialties,
  rating,
  totalReviews,
  totalSessions,
  coachingHours,
  satisfiedClients,
  videoUrl,
  videoCover,
  videoTitle,
  videoDescription,
  packagePrices,
  packageDiscounts,
  instagramUrl,
  linkedinUrl,
  bookingUrl
}`;
