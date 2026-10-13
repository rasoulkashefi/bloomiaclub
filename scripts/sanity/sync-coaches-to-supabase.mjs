/**
 * Full backup: Sanity (source of truth) -> Supabase `v2_coaches`.
 * Run it after bulk edits, or on a schedule. The webhook does the same per coach on every publish.
 *
 *   node scripts/sanity/sync-coaches-to-supabase.mjs            # write
 *   node scripts/sanity/sync-coaches-to-supabase.mjs --dry-run  # only list what would be written
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY (Supabase dashboard -> Settings -> API) and the columns from
 * supabase/migrations/20261012000000_v2_coaches_sanity_backup.sql.
 */
import { env } from './_env.mjs';
import { createClient as createSanity } from '@sanity/client';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { ALL_COACHES_ANY_QUERY, buildSupabaseRow, upsertCoachBackup } from '../../src/lib/coach-sync.mjs';

const dryRun = process.argv.includes('--dry-run');

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: env.sanityToken,
});

const coaches = await sanity.fetch(ALL_COACHES_ANY_QUERY);
console.log(`Sanity coaches: ${coaches.length}`);

if (dryRun) {
  for (const doc of coaches) {
    const row = buildSupabaseRow(doc);
    console.log(`- ${row.slug}  (${row.full_name})  active=${row.is_active}`);
  }
  console.log('Dry run: nothing written.');
  process.exit(0);
}

if (!env.supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is missing. Add it to .env.local and run again.');
  process.exit(1);
}

const supabase = createSupabase(env.supabaseUrl, env.supabaseServiceKey, { auth: { persistSession: false } });

let failed = 0;
for (const doc of coaches) {
  try {
    const result = await upsertCoachBackup(supabase, doc);
    console.log(`${result.padEnd(8)} ${doc.slug}`);
  } catch (error) {
    failed++;
    console.error(`FAILED   ${doc.slug}: ${error.message}`);
  }
}
console.log(failed ? `Done with ${failed} failure(s).` : 'Done. Supabase backup is up to date.');
process.exit(failed ? 1 : 0);
