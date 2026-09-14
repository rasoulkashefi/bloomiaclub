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
  console.log('🏛️ Creating or updating official "آکادمی بلومیا" author document...');

  const academyAuthor = {
    _id: 'author-bloomia-academy',
    _type: 'author',
    name: 'آکادمی بلومیا',
    slug: { _type: 'slug', current: 'bloomia-academy' },
    coachSlug: null,
    isCoach: false,
    isAi: false,
    jobTitle: 'تیم پژوهش و تحریریه آکادمی بلومیا',
    bio: 'مرکز آموزش، پژوهش و تولید محتوای تخصصی در حوزه کوچینگ، مهارت‌های زندگی و توسعه فردی بلومیا کلاب.',
  };

  await client.createOrReplace(academyAuthor);
  console.log('✅ Created/Updated author-bloomia-academy in Sanity.');

  // Find posts currently referencing author-raya or any AI author
  console.log('🔍 Finding posts authored by "رایا" or AI personas...');
  const posts = await client.fetch(`*[_type == "post" && (author._ref == "author-raya" || author->name == "رایا" || author->name == "ماری")]{
    _id,
    title,
    "slug": slug.current,
    author
  }`);

  console.log(`Found ${posts.length} post(s) to migrate.`);

  for (const post of posts) {
    console.log(`🔄 Updating post "${post.title}" (${post._id}) to "آکادمی بلومیا"...`);
    await client
      .patch(post._id)
      .set({
        author: {
          _type: 'reference',
          _ref: 'author-bloomia-academy',
        },
      })
      .commit();
    console.log(`  ✅ Post ${post._id} successfully re-assigned to "آکادمی بلومیا".`);
  }

  // Delete author-raya and author-mari if they exist
  console.log('🗑️ Deleting AI personas (author-raya, author-mari) from Sanity...');
  const raya = await client.getDocument('author-raya').catch(() => null);
  if (raya) {
    await client.delete('author-raya');
    console.log('  ✅ Deleted author-raya.');
  }

  const mari = await client.getDocument('author-mari').catch(() => null);
  if (mari) {
    await client.delete('author-mari');
    console.log('  ✅ Deleted author-mari.');
  }

  console.log('🎉 Migration completed successfully!');
}

run().catch(console.error);
