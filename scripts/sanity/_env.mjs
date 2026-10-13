import fs from 'fs';
import path from 'path';

/** Loads .env, then .env.local (local wins) into process.env. Imported for its side effect. */
for (const file of ['.env', '.env.local']) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    let value = match[2] || '';
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

export const env = {
  sanityProjectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7yjhdw88',
  sanityDataset: process.env.REACT_APP_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  sanityToken: process.env.SANITY_WRITE_TOKEN,
  supabaseUrl:
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.REACT_APP_SUPABASE_URL ||
    'https://qxacvupalbfcoqkuydba.supabase.co',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
