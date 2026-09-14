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

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const authors = await client.fetch(`*[_type == "author"]{
    _id,
    name,
    "slug": slug.current,
    coachSlug,
    jobTitle,
    bio,
    isAi
  }`);
  console.log('=== AUTHORS IN SANITY ===');
  console.log(JSON.stringify(authors, null, 2));

  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    "authorName": author->name,
    "authorId": author->_id,
    "authorSlug": author->slug.current
  }`);
  console.log('\n=== POSTS IN SANITY ===');
  posts.forEach(p => {
    console.log(`- [${p.slug}] "${p.title}" -> Author: ${p.authorName} (${p.authorId})`);
  });
}

run().catch(console.error);
