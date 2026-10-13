import { createClient } from '@sanity/client';

const c = createClient({
  projectId: '7yjhdw88',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const slug = process.argv[2] || 'fatemeh_esmaeeli';

console.log('types', await c.fetch('array::unique(*[]._type)'));
console.log('coach docs', JSON.stringify(await c.fetch('*[_type=="coach"]{_id,name,"slug":slug.current}')));
console.log(
  'author',
  JSON.stringify(await c.fetch('*[_type=="author" && slug.current==$slug]{_id,name}', { slug }))
);
console.log(
  'published posts',
  await c.fetch('count(*[_type=="post" && author->slug.current==$slug && status=="published"])', { slug })
);
