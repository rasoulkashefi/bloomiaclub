import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88';
const dataset = process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN;

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    "authorName": author->name,
    "authorCoachSlug": author->coachSlug,
    "categoryTitle": category->title,
    publishedAt,
    excerpt
  }`);

  console.log(`Total posts found: ${posts.length}`);
  
  const fatemehPosts = posts.filter(p => 
    (p.authorName && p.authorName.includes('فاطمه')) ||
    (p.authorCoachSlug && p.authorCoachSlug.includes('fatemeh'))
  );

  console.log(`\n=== Fatemeh Esmaeili Posts (${fatemehPosts.length}) ===`);
  fatemehPosts.forEach((p, idx) => {
    console.log(`\n[${idx + 1}] Title: ${p.title}`);
    console.log(`    Slug: ${p.slug}`);
    console.log(`    Category: ${p.categoryTitle}`);
    console.log(`    Excerpt: ${p.excerpt}`);
  });

  console.log(`\n=== All Other Posts (${posts.length - fatemehPosts.length}) ===`);
  posts.filter(p => !fatemehPosts.includes(p)).forEach((p, idx) => {
    console.log(`[${idx + 1}] ${p.title} (${p.authorName || 'No Author'}) [${p.slug}]`);
  });

  fs.writeFileSync('scripts/sanity/fatemeh-posts.json', JSON.stringify(fatemehPosts, null, 2), 'utf8');
}

run().catch(console.error);
