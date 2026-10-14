import { env } from './_env.mjs';
import { createClient as createSanity } from '@sanity/client';

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const doc = await sanity.fetch(`*[_type == "coach" && slug.current == "fatemeh_esmaeeli"][0]{
  _id,
  name,
  title,
  avatar{ "url": asset->url, "ref": asset._ref },
  coverImage{ "url": asset->url, "ref": asset._ref },
  aboutImage{ "url": asset->url, "ref": asset._ref },
  cutoutImage{ "url": asset->url, "ref": asset._ref },
  videoCover{ "url": asset->url, "ref": asset._ref }
}`);
console.log('Doc images:', JSON.stringify(doc, null, 2));
