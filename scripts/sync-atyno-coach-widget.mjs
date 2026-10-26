/**
 * sync-atyno-coach-widget.mjs
 * 
 * End-to-end synchronization between Atyno booking engine and Bloomia Club:
 * 1. Finds coach by email in Atyno database (d:/atyno/.env.local).
 * 2. Ensures Pro plan & watermark removal (is_premium = true, removeWatermark = true).
 * 3. Applies Bloomia Club design system tokens to Atyno widget:
 *    - brand_color: #1f3d3a
 *    - widget_primary_color: #1f3d3a
 *    - widget_bg_color: #ffffff
 *    - widget_text_color: #1e1e1e
 *    - widget_border_color: #e5e5e2
 *    - widget_card_bg: #fafaf8
 *    - widget_font_family: vazirmatn
 *    - widget_show_avatar: false
 *    - widget_show_name: false
 *    - widget_show_description: false
 * 4. Extracts meeting slug (e.g. zero-coaching-session) and generates embed URL:
 *    https://atyno.com/fa/embed/<user_id>?meeting=<slug>
 * 5. Updates coach document in Sanity CMS.
 * 6. Syncs backup to Supabase (v2_coaches).
 * 
 * Usage:
 *   node scripts/sync-atyno-coach-widget.mjs <coach-email> <coach-slug>
 * 
 * Example:
 *   node scripts/sync-atyno-coach-widget.mjs yariparmiss120@gmail.com parmiss-yari
 */

import fs from 'fs';
import path from 'path';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { createClient as createSanity } from '@sanity/client';
import { env as bloomiaEnv } from './sanity/_env.mjs';
import { COACH_PROJECTION, upsertCoachBackup } from '../src/lib/coach-sync.mjs';

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function main() {
  const coachEmail = process.argv[2];
  const coachSlug = process.argv[3];

  if (!coachEmail) {
    console.error('Usage: node scripts/sync-atyno-coach-widget.mjs <coach-email> [coach-slug]');
    process.exit(1);
  }

  console.log(`[Atyno Sync] Starting widget synchronization for: ${coachEmail}`);

  // 1. Connect to Atyno Supabase
  const atynoEnvPath = path.resolve('d:/atyno/.env.local');
  const atynoEnv = parseEnvFile(atynoEnvPath);

  const atynoSupabaseUrl = atynoEnv.NEXT_PUBLIC_SUPABASE_URL;
  const atynoServiceKey = atynoEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!atynoSupabaseUrl || !atynoServiceKey) {
    throw new Error('Missing Atyno Supabase credentials in d:/atyno/.env.local');
  }

  const atynoDb = createSupabase(atynoSupabaseUrl, atynoServiceKey, {
    auth: { persistSession: false },
  });

  // 2. Lookup Coach in Atyno
  const { data: usersData, error: authErr } = await atynoDb.auth.admin.listUsers({ perPage: 1000 });
  if (authErr) throw authErr;

  const authUser = usersData.users.find(
    (u) => u.email?.toLowerCase() === coachEmail.toLowerCase()
  );

  if (!authUser) {
    throw new Error(`Coach with email ${coachEmail} not found in Atyno auth users!`);
  }

  const userId = authUser.id;
  console.log(`[Atyno Sync] Found Atyno User UUID: ${userId}`);

  // 3. Ensure Pro Plan & White-label
  await atynoDb
    .from('profiles')
    .update({ is_premium: true })
    .eq('id', userId);

  await atynoDb
    .from('workspaces')
    .update({
      plan: 'pro',
      subscription_status: 'active',
      custom_features: {
        removeWatermark: true,
        directPaymentIntegration: true,
      },
    })
    .eq('owner_user_id', userId);

  // 4. Configure Widget Appearance for Bloomia Club
  const bloomiaTokens = {
    brand_color: '#1f3d3a',
    widget_primary_color: '#1f3d3a',
    widget_bg_color: '#ffffff',
    widget_text_color: '#1e1e1e',
    widget_border_color: '#e5e5e2',
    widget_card_bg: '#fafaf8',
    widget_font_family: 'vazirmatn',
    widget_show_avatar: false,
    widget_show_name: false,
    widget_show_description: false,
    widget_embed_type: 'all',
    widget_meeting_slug: null,
    widget_view: 'default',
  };

  const { data: pageRow, error: pageErr } = await atynoDb
    .from('booking_pages')
    .update(bloomiaTokens)
    .eq('owner_user_id', userId)
    .select('id, slug, brand_color, widget_primary_color')
    .single();

  if (pageErr) throw pageErr;
  console.log(`[Atyno Sync] Updated widget tokens on booking page (${pageRow.slug}):`, pageRow);

  // 5. Query active session types
  const { data: sessions, error: sessErr } = await atynoDb
    .from('booking_session_types')
    .select('id, slug, title, duration_min, is_active')
    .eq('owner_user_id', userId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (sessErr) throw sessErr;

  const zeroSession = sessions?.find((s) => s.slug.includes('zero')) || sessions?.[0];
  const meetingSlug = zeroSession ? zeroSession.slug : null;

  const embedUrl = meetingSlug
    ? `https://atyno.com/fa/embed/${userId}?meeting=${meetingSlug}`
    : `https://atyno.com/fa/embed/${userId}`;

  console.log(`[Atyno Sync] Generated Seamless Embed URL: ${embedUrl}`);

  // 6. If coachSlug is provided, update Bloomia Sanity CMS and Supabase
  if (coachSlug) {
    console.log(`[Atyno Sync] Updating Bloomia Sanity CMS for coach: ${coachSlug}`);

    const sanity = createSanity({
      projectId: bloomiaEnv.sanityProjectId,
      dataset: bloomiaEnv.sanityDataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: bloomiaEnv.sanityToken,
    });

    const coachDoc = await sanity.fetch(
      `*[_type == "coach" && (_id == $id || slug == $slug || slug.current == $slug)][0]`,
      { id: `coach-profile-${coachSlug}`, slug: coachSlug }
    );

    if (!coachDoc) {
      console.warn(`[Atyno Sync] Coach ${coachSlug} not found in Sanity. Skipping Sanity patch.`);
    } else {
      await sanity.patch(coachDoc._id).set({ bookingUrl: embedUrl }).commit();
      console.log(`[Atyno Sync] Successfully patched bookingUrl in Sanity doc: ${coachDoc._id}`);

      // 7. Sync to Bloomia Supabase
      if (bloomiaEnv.supabaseServiceKey) {
        const bloomiaDb = createSupabase(bloomiaEnv.supabaseUrl, bloomiaEnv.supabaseServiceKey, {
          auth: { persistSession: false },
        });
        const updatedCoachDoc = await sanity.fetch(
          `*[_type == "coach" && _id == $id][0] ${COACH_PROJECTION}`,
          { id: coachDoc._id }
        );
        const backupResult = await upsertCoachBackup(bloomiaDb, updatedCoachDoc);
        console.log(`[Atyno Sync] Synced coach to Bloomia Supabase: ${backupResult}`);
      }
    }
  }

  console.log('\n=============================================');
  console.log('SYNC COMPLETE!');
  console.log(`Coach: ${coachEmail}`);
  console.log(`Embed URL: ${embedUrl}`);
  console.log('=============================================\n');
}

main().catch((err) => {
  console.error('[Atyno Sync Error]:', err);
  process.exit(1);
});
