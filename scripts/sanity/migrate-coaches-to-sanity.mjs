/**
 * One-time migration: Supabase `v2_coaches` -> Sanity `coach` documents (id: coach-profile-<slug>).
 *
 *   node scripts/sanity/migrate-coaches-to-sanity.mjs --dry-run   # show what would happen
 *   node scripts/sanity/migrate-coaches-to-sanity.mjs             # create missing coaches
 *   node scripts/sanity/migrate-coaches-to-sanity.mjs --force     # overwrite existing coach docs (loses Studio edits!)
 *
 * By default a coach that already exists in Sanity is left untouched so edits made in the Studio are safe.
 * Only data that exists in Supabase is migrated. Nothing is invented: testimonials, credentials,
 * events and packages are NOT created here, add real ones in the Studio.
 */
import { Readable } from 'stream';
import { env } from './_env.mjs';
import { createClient as createSanity } from '@sanity/client';
import { COACH_BY_SLUG_ANY_QUERY, coachDocId, syncAuthorDoc } from '../../src/lib/coach-sync.mjs';

const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');

if (!env.sanityToken && !dryRun) {
  console.error('SANITY_WRITE_TOKEN is missing in .env.local');
  process.exit(1);
}
if (!env.supabaseAnonKey) {
  console.error('REACT_APP_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) is missing in .env');
  process.exit(1);
}

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: env.sanityToken,
});

/* ---------------------------------------------------------------- Supabase */

async function fetchSupabaseCoaches() {
  const url = `${env.supabaseUrl}/rest/v1/v2_coaches?select=*&order=created_at.asc`;
  const res = await fetch(url, {
    headers: { apikey: env.supabaseAnonKey, Authorization: `Bearer ${env.supabaseAnonKey}` },
  });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}: ${await res.text()}`);
  return res.json();
}

function publicUrl(value, bucket = 'coaches_images') {
  if (!value) return null;
  const v = String(value).trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  return `${env.supabaseUrl}/storage/v1/object/public/${bucket}/${v.replace(/^\/+/, '')}`;
}

async function uploadImage(url, filename) {
  if (!url) return undefined;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! image not downloadable (${res.status}): ${url}`);
      return undefined;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await sanity.assets.upload('image', Readable.from(buffer), { filename });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (error) {
    console.warn(`  ! image upload failed for ${url}: ${error.message}`);
    return undefined;
  }
}

/* ------------------------------------------------- Editorial copy per coach */
/*
 * Page-structure copy written for the v3 profile (audience, method, services, FAQ).
 * Review it in the Studio before the site goes live. Keyed by slug.
 */
const keyed = (items) => items.map((item, i) => ({ _key: `i${i + 1}`, ...item }));

const EDITORIAL = {
  saloomeh_fathijou: {
    audience: keyed([
      { title: 'می‌خواهید مسیر شغلی‌تان را روشن‌تر کنید' },
      { title: 'در یک تصمیم مهم مانده‌اید' },
      { title: 'می‌خواهید خودتان را بهتر بشناسید' },
      { title: 'می‌خواهید تغییر را از آگاهی شروع کنید' },
    ]),
    method: keyed([
      { title: 'شناخت', description: 'ابتدا با هم مرور می‌کنیم که الان کجا ایستاده‌اید، چه چیزی برایتان مهم است و دقیقاً با چه چالشی روبه‌رو هستید.' },
      { title: 'وضوح', description: 'با پرسش‌های درست، گره‌های ذهنی را باز می‌کنیم تا گزینه‌ها و ارزش‌هایتان روشن‌تر دیده شوند.' },
      { title: 'اقدام', description: 'وضوح را به یک برنامه عملی تبدیل می‌کنیم؛ قدم‌هایی کوچک، مشخص و متناسب با زندگی واقعی شما.' },
      { title: 'همراهی', description: 'در مسیر اجرا کنار شما می‌مانم تا موانع را بشناسیم، مسیر را اصلاح کنیم و پیشرفت‌تان پایدار شود.' },
    ]),
    services: keyed([
      { title: 'جلسه صفر', duration: '۳۰ دقیقه', description: 'یک گفتگوی کوتاه برای آشنایی، شنیدن چالش شما و بررسی اینکه کوچینگ و سبک کار من برایتان مناسب است یا نه.', isFree: true },
      { title: 'جلسه کوچینگ', duration: '۶۰ دقیقه', description: 'یک جلسه فردی و متمرکز برای کار روی یک موضوع مشخص؛ از تصمیمی که معطل مانده تا مسیری که می‌خواهید روشن‌تر شود.', isFree: false },
    ]),
    faqs: keyed([
      { question: 'جلسه صفر رایگان چیست؟', answer: 'یک گفتگوی ۳۰ دقیقه‌ای برای آشنایی با روش کار من و بررسی اینکه آیا کوچینگ برای چالش شما مناسب است یا خیر. هیچ تعهدی برای ادامه همکاری ندارد.' },
      { question: 'آیا جلسات فقط آنلاین برگزار می‌شوند؟', answer: 'بله، در حال حاضر تمام جلسات به صورت آنلاین (تصویری) برگزار می‌شوند و لینک جلسه پس از هماهنگی زمان برای شما ارسال می‌شود.' },
      { question: 'هر جلسه کوچینگ چقدر طول می‌کشد؟', answer: 'جلسه‌های کوچینگ ۶۰ دقیقه‌ای هستند و جلسه صفر حدود ۳۰ دقیقه طول می‌کشد.' },
    ]),
  },
};

/* ------------------------------------------------------------------- Build */

const parseJson = (value, fallback) => {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
};

const compactNumbers = (obj) =>
  Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => typeof v === 'number' && Number.isFinite(v)));

async function buildDoc(row, order) {
  const slug = row.slug;
  const social = parseJson(row.social_links, {}) || {};
  const tags = parseJson(row.tags, []) || [];
  const prices = compactNumbers(parseJson(row.package_prices, {}));
  const discounts = compactNumbers(parseJson(row.package_discounts, {}));

  const doc = {
    _id: coachDocId(slug),
    _type: 'coach',
    name: row.full_name,
    slug: { _type: 'slug', current: slug },
    title: row.job_title || undefined,
    description: row.bio_short || undefined,
    longDescription: row.bio_full || undefined,
    specialties: Array.isArray(tags) ? tags : [],
    rating: row.average_rating != null ? Number(row.average_rating) : undefined,
    totalReviews: row.review_count ?? undefined,
    // Supabase only stored "coaching_hours"; it was already shown as the session count on the site.
    totalSessions: row.coaching_hours ?? undefined,
    coachingHours: row.coaching_hours ?? undefined,
    satisfiedClients: row.satisfied_clients ?? undefined,
    videoUrl: row.intro_video_url || undefined,
    videoTitle: row.intro_video_title || undefined,
    videoDescription: row.intro_video_description || undefined,
    packagePrices: Object.keys(prices).length ? prices : undefined,
    packageDiscounts: Object.keys(discounts).length ? discounts : undefined,
    instagramUrl: social.instagram || undefined,
    linkedinUrl: social.linkedin || undefined,
    bookingUrl: social.booking || undefined,
    isActive: row.is_active !== false,
    order,
    ...(EDITORIAL[slug] || {}),
  };

  if (!dryRun) {
    doc.avatar = await uploadImage(publicUrl(row.avatar_url), `${slug}-avatar`);
    doc.coverImage = await uploadImage(publicUrl(row.hero_image_url), `${slug}-cover`);
    if (row.cutout_image_url) doc.cutoutImage = await uploadImage(publicUrl(row.cutout_image_url), `${slug}-cutout`);
    if (row.intro_video_cover) doc.videoCover = await uploadImage(publicUrl(row.intro_video_cover), `${slug}-video-cover`);
  }

  // Drop undefined keys so Sanity does not store nulls.
  return JSON.parse(JSON.stringify(doc));
}

/* -------------------------------------------------------------------- Main */

const rows = await fetchSupabaseCoaches();
console.log(`Supabase coaches: ${rows.length}${dryRun ? '  (dry run)' : ''}`);

let created = 0;
let skipped = 0;
for (const [index, row] of rows.entries()) {
  const id = coachDocId(row.slug);
  const existing = dryRun && !env.sanityToken ? null : await sanity.getDocument(id).catch(() => null);

  if (existing && !force) {
    console.log(`skip     ${row.slug}  (already in Sanity)`);
    skipped++;
    continue;
  }

  console.log(`${dryRun ? 'would create' : 'creating'} ${row.slug}  (${row.full_name})${EDITORIAL[row.slug] ? '  + editorial copy' : ''}`);
  if (dryRun) continue;

  const doc = await buildDoc(row, index + 1);
  await sanity.createOrReplace(doc);

  // Keep the blog author document in step (same as the webhook does later).
  const published = await sanity.fetch(COACH_BY_SLUG_ANY_QUERY, { slug: row.slug });
  if (published) await syncAuthorDoc(sanity, published);
  created++;
}

console.log(dryRun ? 'Dry run finished.' : `Done. created=${created} skipped=${skipped}`);
