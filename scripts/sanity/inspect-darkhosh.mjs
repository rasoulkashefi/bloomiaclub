import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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

const sanityClient = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseKey ? createSupabaseClient(supabaseUrl, supabaseKey) : null;

async function run() {
  console.log('=== SUPABASE FATEMEH DARKHOSH ===');
  if (supabase) {
    const { data, error } = await supabase
      .from('v2_coaches')
      .select('*')
      .or('slug.ilike.%derakhsh%,full_name.ilike.%درخوش%');
    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
  }

  console.log('\n=== SANITY FATEMEH DARKHOSH ===');
  const coaches = await sanityClient.fetch('*[_type in ["coach", "author"] && (slug.current match "*derakhsh*" || name match "*درخوش*")]');
  console.log(JSON.stringify(coaches, null, 2));
}

run().catch(console.error);
