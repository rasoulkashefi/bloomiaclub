import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(sanityConfig);

let builder = null;
try {
  builder = imageUrlBuilder(sanityConfig);
} catch (err) {
  console.warn('Failed to initialize imageUrlBuilder:', err);
}

const dummyBuilder = {
  width: () => dummyBuilder,
  height: () => dummyBuilder,
  fit: () => dummyBuilder,
  auto: () => dummyBuilder,
  url: () => '',
};

export function urlFor(source) {
  if (!source || !builder) return dummyBuilder;
  try {
    const res = builder.image(source);
    if (!res) return dummyBuilder;
    const origUrl = res.url.bind(res);
    res.url = () => {
      try {
        return origUrl();
      } catch (err) {
        return '';
      }
    };
    return res;
  } catch (err) {
    console.warn('urlFor error:', err);
    return dummyBuilder;
  }
}
