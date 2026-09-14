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
  const authors = await client.fetch(`*[_type == "author"]{
    _id,
    name,
    coachSlug,
    jobTitle,
    bio
  }`);
  console.log('=== AUTHORS ===');
  console.log(JSON.stringify(authors, null, 2));

  const posts = await client.fetch(`*[_type == "post" && (author->name match "فاطمه*" || author->coachSlug match "*fatemeh*")]{
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    excerpt,
    body,
    metaTitle,
    metaDescription,
    keywords
  }`);

  console.log(`\n=== FATEMEH ESMAEILI POSTS (${posts.length}) ===`);
  posts.forEach((p, idx) => {
    console.log(`\n-----------------------------------------`);
    console.log(`[${idx+1}] ${p.title}`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Category: ${p.category}`);
    console.log(`Excerpt: ${p.excerpt}`);
    console.log(`Keywords:`, p.keywords);
    
    // Extract headers from body
    if (Array.isArray(p.body)) {
      const headings = p.body
        .filter(b => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
        .map(b => `${b.style}: ${b.children?.map(c => c.text).join('')}`);
      console.log('Headings:\n ', headings.join('\n  '));
    }
  });
}

run().catch(console.error);
