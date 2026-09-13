import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.resolve(process.cwd(), '.env');
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

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectSupabasePosts() {
  console.log('🔍 Fetching posts from Supabase...');
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*');

  if (postsError) {
    console.error('❌ Supabase posts error:', postsError);
    return;
  }

  const { data: coaches, error: coachesError } = await supabase
    .from('v2_coaches')
    .select('*');

  if (coachesError) {
    console.error('❌ Supabase coaches error:', coachesError);
  }

  console.log(`✅ Total posts found: ${posts?.length || 0}`);
  console.log(`✅ Total coaches found: ${coaches?.length || 0}`);

  // Link coaches to posts
  const coachesMap = new Map((coaches || []).map((c) => [c.id, c]));

  const combined = (posts || []).map((p) => ({
    ...p,
    coach: coachesMap.get(p.author_id_v2) || coachesMap.get(p.author_id) || null,
  }));

  fs.writeFileSync('scripts/sanity/supabase-posts-dump.json', JSON.stringify(combined, null, 2), 'utf8');
  console.log('💾 Saved dump to scripts/sanity/supabase-posts-dump.json');

  combined.forEach((p, idx) => {
    console.log(`\n--- [${idx + 1}] ---`);
    console.log(`ID: ${p.id}`);
    console.log(`Title: ${p.title}`);
    console.log(`Slug: ${p.post_slug}`);
    console.log(`Coach/Author: ${p.coach ? p.coach.full_name : 'No Coach'} (Slug: ${p.coach?.slug})`);
    console.log(`Category: ${p.category}`);
    console.log(`Image: ${p.image_url}`);
    console.log(`Content Length: ${p.content ? p.content.length : 0} chars`);
  });
}

inspectSupabasePosts().catch(console.error);
