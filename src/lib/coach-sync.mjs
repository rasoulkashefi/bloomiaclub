/**
 * Shared by the Next.js webhook (src/app/api/webhooks/sanity-coach/route.ts) and the CLI scripts in
 * scripts/sanity. Plain ESM on purpose so that both Node and Next can import it.
 *
 * Sanity is the source of truth for coaches. Supabase `v2_coaches` is kept as a read-only backup:
 *  - the legacy columns (full_name, bio_short, ...) stay in sync so the old site and the fallback keep working;
 *  - the whole published document is stored in `sanity_snapshot` (jsonb) so the page can be rebuilt from Supabase alone.
 */

/** Document ID of a coach profile in Sanity. (`coach-<slug>` is reserved for the blog author document.) */
export const coachDocId = (slug) => `coach-profile-${slug}`;

/** GROQ projection used everywhere a full coach is read. Images are resolved to CDN URLs. */
export const COACH_PROJECTION = `{
  _id,
  "id": _id,
  "slug": slug.current,
  name,
  title,
  description,
  longDescription,
  "imageUrl": avatar.asset->url,
  "avatarRef": avatar.asset._ref,
  "coverImage": coverImage.asset->url,
  "aboutImage": aboutImage.asset->url,
  "cutoutImageUrl": cutoutImage.asset->url,
  specialties,
  experienceYears,
  languages,
  sessionMode,
  location,
  rating,
  totalReviews,
  totalSessions,
  coachingHours,
  satisfiedClients,
  videoUrl,
  "videoCover": videoCover.asset->url,
  videoTitle,
  videoDescription,
  packagePrices,
  packageDiscounts,
  instagramUrl,
  linkedinUrl,
  bookingUrl,
  audience[]{ "id": _key, title },
  method[]{ "id": _key, title, description },
  services[]{ "id": _key, title, duration, description, isFree },
  packages[]{ "id": _key, title, sessions, duration, description, price, isPopular, features },
  testimonials[]{ "id": _key, quote, author, context },
  events[]{ "id": _key, title, date, type, location, href },
  credentials[]{ "id": _key, title, organization, year },
  faqs[]{ question, answer },
  isActive,
  order,
  _updatedAt
}`;

export const ALL_COACHES_QUERY = `*[_type == "coach" && isActive != false] | order(order asc, _createdAt desc) ${COACH_PROJECTION}`;
export const COACH_BY_SLUG_QUERY = `*[_type == "coach" && slug.current == $slug && isActive != false][0] ${COACH_PROJECTION}`;
/** Same as above but ignores isActive, used by the sync so that hiding a coach also hides the backup row. */
export const COACH_BY_SLUG_ANY_QUERY = `*[_type == "coach" && slug.current == $slug][0] ${COACH_PROJECTION}`;
export const ALL_COACHES_ANY_QUERY = `*[_type == "coach"] ${COACH_PROJECTION}`;

/** Map a Sanity coach (COACH_PROJECTION shape) to a `v2_coaches` row. */
export function buildSupabaseRow(doc) {
  const social = {};
  if (doc.instagramUrl) social.instagram = doc.instagramUrl;
  if (doc.linkedinUrl) social.linkedin = doc.linkedinUrl;
  if (doc.bookingUrl) social.booking = doc.bookingUrl;

  return {
    slug: doc.slug,
    full_name: doc.name,
    job_title: doc.title ?? null,
    bio_short: doc.description ?? null,
    bio_full: doc.longDescription ?? null,
    tags: doc.specialties ?? [],
    avatar_url: doc.imageUrl ?? null,
    hero_image_url: doc.coverImage ?? null,
    coaching_hours: doc.coachingHours ?? doc.totalSessions ?? 0,
    satisfied_clients: doc.satisfiedClients ?? 0,
    average_rating: doc.rating ?? null,
    review_count: doc.totalReviews ?? 0,
    intro_video_url: doc.videoUrl ?? null,
    intro_video_cover: doc.videoCover ?? null,
    intro_video_title: doc.videoTitle ?? null,
    intro_video_description: doc.videoDescription ?? null,
    social_links: social,
    package_prices: doc.packagePrices ?? {},
    package_discounts: doc.packageDiscounts ?? {},
    is_active: doc.isActive !== false,
    sanity_id: doc._id,
    sanity_snapshot: doc,
    synced_at: new Date().toISOString(),
  };
}

/** Upsert the backup row (match on slug, since `v2_coaches` was created before Sanity). */
export async function upsertCoachBackup(supabase, doc) {
  const row = buildSupabaseRow(doc);
  const { data: existing, error: findError } = await supabase
    .from('v2_coaches')
    .select('id')
    .eq('slug', row.slug)
    .maybeSingle();
  if (findError) throw new Error(`Supabase lookup failed: ${findError.message}`);

  if (existing?.id) {
    const { error } = await supabase.from('v2_coaches').update(row).eq('id', existing.id);
    if (error) throw new Error(`Supabase update failed: ${error.message}`);
    return 'updated';
  }
  const { error } = await supabase.from('v2_coaches').insert(row);
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  return 'inserted';
}

/** Mark the backup row inactive (the coach was unpublished or deleted in Sanity). The row is never deleted. */
export async function deactivateCoachBackup(supabase, slug) {
  const { error } = await supabase
    .from('v2_coaches')
    .update({ is_active: false, synced_at: new Date().toISOString() })
    .eq('slug', slug);
  if (error) throw new Error(`Supabase deactivate failed: ${error.message}`);
}

/**
 * Keep the blog `author` document (`coach-<slug>`) in step with the coach profile so a new coach can
 * be assigned as an article author without any extra data entry. Never touches an existing author's image
 * unless the coach has one.
 */
export async function syncAuthorDoc(sanityWrite, doc) {
  const id = `coach-${doc.slug}`;
  const base = {
    _id: id,
    _type: 'author',
    name: doc.name,
    slug: { _type: 'slug', current: doc.slug },
    jobTitle: doc.title ?? undefined,
    bio: doc.description ?? undefined,
    coachSlug: doc.slug,
    isCoach: true,
    isAi: false,
  };
  await sanityWrite.createIfNotExists(base);
  const patch = {
    name: doc.name,
    jobTitle: doc.title ?? '',
    bio: doc.description ?? '',
    coachSlug: doc.slug,
    isCoach: true,
  };
  if (doc.avatarRef) patch.image = { _type: 'image', asset: { _type: 'reference', _ref: doc.avatarRef } };
  await sanityWrite.patch(id).set(patch).commit();
  return id;
}
