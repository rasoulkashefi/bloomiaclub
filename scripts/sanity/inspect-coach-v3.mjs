import { createClient } from '@sanity/client';

const c = createClient({
  projectId: '7yjhdw88',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const coach = await c.fetch(
  `*[_type == "coach" && slug.current == "saloomeh_fathijou"][0]`
);
console.log('COACH', JSON.stringify(coach, null, 1).slice(0, 3000));

const authors = await c.fetch(`*[_type == "author"]{_id,name,"slug":slug.current}`);
console.log('AUTHORS', JSON.stringify(authors));

const posts = await c.fetch(
  `*[_type == "post" && status == "published"]{title,"slug":slug.current,"author":author->name,publishedAt,estimatedReadTime,"img":mainImage.asset->url}`
);
console.log('POSTS', posts.length);
console.log(JSON.stringify(posts.slice(0, 40), null, 1));
