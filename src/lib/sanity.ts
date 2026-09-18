import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
