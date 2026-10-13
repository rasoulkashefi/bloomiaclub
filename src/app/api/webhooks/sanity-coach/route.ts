import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import { sanityClient, sanityWriteClient } from '@/lib/sanity';
import {
  COACH_BY_SLUG_ANY_QUERY,
  deactivateCoachBackup,
  syncAuthorDoc,
  upsertCoachBackup,
} from '@/lib/coach-sync.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Sanity webhook for `coach` documents (create / update / delete).
 *
 * Studio setup (manage.sanity.io -> API -> Webhooks -> Create):
 *   URL         https://bloomiaclub.com/api/webhooks/sanity-coach
 *   Dataset     production
 *   Trigger on  Create, Update, Delete
 *   Filter      _type == "coach"
 *   Projection  {_id, "slug": coalesce(slug.current, before().slug.current), "operation": delta::operation()}
 *   Secret      same value as SANITY_WEBHOOK_SECRET
 *
 * What it does, in order:
 *   1. refreshes the cached public pages (instant publish);
 *   2. keeps the blog `author` document in step so the coach can be picked as an article author;
 *   3. mirrors the coach into Supabase `v2_coaches` as a backup (needs SUPABASE_SERVICE_ROLE_KEY).
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'SANITY_WEBHOOK_SECRET is not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? '';
  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 });
  }

  let payload: { _id?: string; slug?: string | null; operation?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const slug =
    payload.slug || (payload._id ? payload._id.replace(/^(drafts\.)?coach-profile-/, '') : '') || '';
  if (!slug) {
    return NextResponse.json({ ok: false, error: 'Missing slug' }, { status: 400 });
  }

  const report: Record<string, string> = {};

  // Always read the current published document instead of trusting the webhook payload.
  const doc = await sanityClient.fetch(COACH_BY_SLUG_ANY_QUERY, { slug });

  // 1. Public pages
  for (const path of ['/', '/coaches', `/coaches/${slug}`, `/coaches/${slug}/v2`, `/coaches/${slug}/v3`]) {
    revalidatePath(path);
  }
  report.revalidate = 'done';

  // 2. Blog author document
  if (doc) {
    try {
      report.author = `synced (${await syncAuthorDoc(sanityWriteClient, doc)})`;
    } catch (error) {
      report.author = `failed: ${(error as Error).message}`;
    }
  }

  // 3. Supabase backup
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.REACT_APP_SUPABASE_URL ||
    'https://qxacvupalbfcoqkuydba.supabase.co';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    report.backup = 'skipped: SUPABASE_SERVICE_ROLE_KEY is not configured';
  } else {
    try {
      const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      if (doc) {
        report.backup = await upsertCoachBackup(supabase, doc);
      } else {
        await deactivateCoachBackup(supabase, slug);
        report.backup = 'deactivated (coach no longer exists in Sanity)';
      }
    } catch (error) {
      report.backup = `failed: ${(error as Error).message}`;
    }
  }

  const failed = Object.values(report).some((v) => v.startsWith('failed'));
  return NextResponse.json({ ok: !failed, slug, operation: payload.operation ?? null, report }, { status: failed ? 500 : 200 });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Sanity coach webhook. Use POST.' });
}
