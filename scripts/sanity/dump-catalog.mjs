import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

for (const f of ['.env', '.env.local']) {
  const envPath = path.resolve(process.cwd(), f);
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
}

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function dump() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    "authorName": author->name,
    "authorJobTitle": author->jobTitle,
    "coachSlug": author->coachSlug,
    "categoryTitle": category->title,
    excerpt,
    publishedAt,
    focusEntity,
    keywords,
    aiQuickAnswer
  }`);

  fs.writeFileSync('scripts/sanity/all-published-posts.json', JSON.stringify(posts, null, 2), 'utf8');
  console.log(`✅ Saved ${posts.length} posts to scripts/sanity/all-published-posts.json`);
}

dump().catch(console.error);
