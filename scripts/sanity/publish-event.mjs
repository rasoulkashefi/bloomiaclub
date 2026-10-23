import fs from 'fs';
import path from 'path';
import { createClient as createSanity } from '@sanity/client';
import { env } from './_env.mjs';

const dryRun = process.argv.includes('--dry-run');

if (!env.sanityToken && !dryRun) {
  console.error('❌ SANITY_WRITE_TOKEN is missing in environment (.env or .env.local).');
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

async function uploadImageFromPathOrUrl(imagePathOrUrl, filename) {
  if (!imagePathOrUrl) return undefined;

  try {
    let streamOrBuffer;
    let finalFilename = filename || 'event-cover.jpg';

    if (imagePathOrUrl.startsWith('http://') || imagePathOrUrl.startsWith('https://')) {
      console.log(`🌐 Downloading image from: ${imagePathOrUrl}...`);
      const res = await fetch(imagePathOrUrl);
      if (!res.ok) {
        console.warn(`⚠️ Failed to download image from ${imagePathOrUrl}: ${res.statusText}`);
        return undefined;
      }
      const arrayBuffer = await res.arrayBuffer();
      streamOrBuffer = Buffer.from(arrayBuffer);
      const urlObj = new URL(imagePathOrUrl);
      const ext = path.extname(urlObj.pathname) || '.jpg';
      if (!finalFilename.includes('.')) finalFilename += ext;
    } else {
      const fullPath = path.resolve(process.cwd(), imagePathOrUrl);
      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Local image not found at: ${fullPath}`);
        return undefined;
      }
      console.log(`📤 Uploading local image: ${path.basename(fullPath)}...`);
      streamOrBuffer = fs.createReadStream(fullPath);
      const ext = path.extname(fullPath) || '.jpg';
      if (!finalFilename.includes('.')) finalFilename += ext;
    }

    const asset = await sanity.assets.upload('image', streamOrBuffer, {
      filename: finalFilename,
    });

    console.log(`✅ Uploaded image asset: ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn(`⚠️ Image upload failed for ${imagePathOrUrl}:`, err.message);
    return undefined;
  }
}

async function findCoachId(coachSlug) {
  if (!coachSlug) return null;
  // Try coach-profile-<slug>
  const expectedId = `coach-profile-${coachSlug}`;
  try {
    const existing = await sanity.fetch(`*[_id == $id][0]._id`, { id: expectedId });
    if (existing) return existing;

    // Search by slug
    const bySlug = await sanity.fetch(`*[_type == "coach" && slug.current == $slug][0]._id`, { slug: coachSlug });
    if (bySlug) return bySlug;
  } catch (e) {
    console.warn('⚠️ Could not query coach in Sanity:', e.message);
  }
  return expectedId;
}

export async function updateEventsCatalog(eventItem) {
  const catalogPath = path.resolve(process.cwd(), 'EVENTS_CATALOG.md');
  console.log('📝 Updating EVENTS_CATALOG.md...');

  let content = '';
  if (fs.existsSync(catalogPath)) {
    content = fs.readFileSync(catalogPath, 'utf8');
  } else {
    content = `# شناسنامه و کاتالوگ رویدادها و کارگاه‌های بلومیا کلاب (Events Catalog)

این سند مرجع رسمی و فوق‌سریع تمامی کارگاه‌ها، وبینارها و رویدادهای تخصصی ثبت‌شده در بلومیا کلاب است.

---

## ۱. جدول رویدادهای فعال و برنامه‌ریزی‌شده

| # | عنوان رویداد | اسلاگ (\`slug\`) | کوچ مدرس | فرمت | تاریخ و ساعت | پلتفرم | هزینه | وضعیت | لینک |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;
  }

  // Check if slug already in catalog
  if (!content.includes(`\`${eventItem.slug}\``)) {
    const lines = content.split('\n');
    let tableIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('| :---')) {
        tableIndex = i;
        break;
      }
    }

    const priceText = eventItem.price === 0 ? 'رایگان' : `${eventItem.price.toLocaleString('fa-IR')} تومان`;
    const newRow = `| + | **${eventItem.title}** | \`${eventItem.slug}\` | ${eventItem.coachName} | ${eventItem.eventTypeName} | ${eventItem.formattedDate} | ${eventItem.platformName} | ${priceText} | ${eventItem.statusName} | [مشاهده](https://bloomiaclub.com/events/${eventItem.slug}) |`;

    if (tableIndex !== -1) {
      lines.splice(tableIndex + 1, 0, newRow);
      content = lines.join('\n');
    } else {
      content += `\n${newRow}\n`;
    }

    fs.writeFileSync(catalogPath, content, 'utf8');
    console.log(`✅ EVENTS_CATALOG.md updated with ${eventItem.slug}!`);
  }
}

async function syncFallbackEvents(eventItem) {
  const eventsLibPath = path.resolve(process.cwd(), 'src/lib/events.ts');
  if (!fs.existsSync(eventsLibPath)) return;

  try {
    let code = fs.readFileSync(eventsLibPath, 'utf8');
    if (code.includes(`slug: '${eventItem.slug}'`)) {
      console.log(`ℹ️ Event ${eventItem.slug} already present in src/lib/events.ts`);
      return;
    }

    const eventObjCode = `  {
    id: '${eventItem._id}',
    slug: '${eventItem.slug}',
    title: '${eventItem.title.replace(/'/g, "\\'")}',
    eventType: '${eventItem.eventType}',
    eventTypeName: '${eventItem.eventTypeName}',
    status: '${eventItem.status}',
    statusName: '${eventItem.statusName}',
    featured: ${Boolean(eventItem.featured)},
    coach: {
      id: 'coach-profile-${eventItem.coachSlug}',
      name: '${eventItem.coachName}',
      slug: '${eventItem.coachSlug}',
      title: '${eventItem.coachTitle || 'کوچ حرفه‌ای بلومیا'}',
      imageUrl: '${eventItem.coachImageUrl || '/images/coaches/default.webp'}',
      rating: 4.9,
    },
    date: '${eventItem.date}',
    formattedDate: '${eventItem.formattedDate}',
    formattedTime: '${eventItem.formattedTime}',
    duration: '${eventItem.duration}',
    location: '${eventItem.location.replace(/'/g, "\\'")}',
    platform: '${eventItem.platform}',
    platformName: '${eventItem.platformName}',
    registrationUrl: '${eventItem.registrationUrl}',
    price: ${eventItem.price},
    originalPrice: ${eventItem.originalPrice || 'undefined'},
    formattedPrice: '${eventItem.price === 0 ? 'رایگان' : `${eventItem.price.toLocaleString('fa-IR')} تومان`}',
    coverImage: '${eventItem.coverImageUrl || 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80'}',
    coverImageAlt: '${(eventItem.coverImageAlt || eventItem.title).replace(/'/g, "\\'")}',
    excerpt: '${eventItem.excerpt.replace(/'/g, "\\'")}',
    syllabus: ${JSON.stringify(eventItem.syllabus || [], null, 6)},
    targetAudience: ${JSON.stringify(eventItem.targetAudience || [], null, 6)},
    features: ${JSON.stringify(eventItem.features || [], null, 6)},
    faqs: ${JSON.stringify(eventItem.faqs || [], null, 6)},
  },
`;

    code = code.replace('export const FALLBACK_EVENTS: EventItem[] = [', `export const FALLBACK_EVENTS: EventItem[] = [\n${eventObjCode}`);
    fs.writeFileSync(eventsLibPath, code, 'utf8');
    console.log(`✅ Synced fallback event into src/lib/events.ts`);
  } catch (err) {
    console.warn('⚠️ Could not sync into src/lib/events.ts:', err.message);
  }
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (args.length === 0) {
    console.error('Usage: node scripts/sanity/publish-event.mjs <event-spec.json> [--dry-run]');
    process.exit(1);
  }

  const jsonFilePath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`❌ Event JSON file not found: ${jsonFilePath}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  const slug = raw.slug || 'bloomia-event';
  const docId = `event-${slug}`;
  const coachSlug = raw.coachSlug || raw.coach || 'fatemeh_esmaeeli';

  console.log(`\n📋 Preparing event: "${raw.title}" (slug: ${slug})`);
  console.log(`   Coach: ${coachSlug}`);
  console.log(`   Event Type: ${raw.eventType || 'workshop'}`);
  console.log(`   Status: ${raw.status || 'open'}`);

  let coachRefId = `coach-profile-${coachSlug}`;
  if (!dryRun) {
    coachRefId = await findCoachId(coachSlug);
    console.log(`   Matched coach ID in Sanity: ${coachRefId}`);
  }

  // Upload cover image
  let coverImageObj;
  let uploadedCoverUrl = raw.coverImageUrl;
  if (!dryRun && raw.coverImagePathOrUrl) {
    console.log(`\n📸 Uploading event cover/poster to Sanity CDN...`);
    coverImageObj = await uploadImageFromPathOrUrl(raw.coverImagePathOrUrl, `${slug}-cover`);
    if (coverImageObj && coverImageObj.asset?._ref) {
      coverImageObj.alt = raw.coverImageAlt || raw.title;
      // Get asset url
      try {
        const assetDoc = await sanity.fetch(`*[_id == $id][0].url`, { id: coverImageObj.asset._ref });
        if (assetDoc) uploadedCoverUrl = assetDoc;
      } catch (e) {
        // ignore
      }
    }
  }

  const doc = {
    _id: docId,
    _type: 'event',
    title: raw.title,
    slug: { _type: 'slug', current: slug },
    eventType: raw.eventType || 'workshop',
    status: raw.status || 'open',
    featured: Boolean(raw.featured),
    coach: { _type: 'reference', _ref: coachRefId },
    date: raw.date || new Date().toISOString(),
    endDate: raw.endDate,
    duration: raw.duration || '۹۰ دقیقه',
    location: raw.location || 'آنلاین',
    platform: raw.platform || 'other',
    registrationUrl: raw.registrationUrl || 'https://t.me/bloomiaclub',
    price: typeof raw.price === 'number' ? raw.price : 0,
    originalPrice: typeof raw.originalPrice === 'number' ? raw.originalPrice : undefined,
    coverImage: coverImageObj,
    excerpt: raw.excerpt || '',
    syllabus: raw.syllabus || [],
    targetAudience: raw.targetAudience || [],
    features: raw.features || [],
    faqs: raw.faqs || [],
    metaTitle: raw.metaTitle || raw.title,
    metaDescription: raw.metaDescription || raw.excerpt,
    order: raw.order || 1,
  };

  if (dryRun) {
    console.log('\n🔍 [DRY-RUN] Event document preview:');
    console.log(JSON.stringify(doc, null, 2));
    console.log('\n✅ Dry-run completed. No writes made.');
    process.exit(0);
  }

  // Publish to Sanity
  console.log(`\n🚀 Publishing event to Sanity with ID: ${doc._id}...`);
  await sanity.createOrReplace(doc);
  console.log(`✅ Sanity event document published successfully!`);

  // Update Catalog & Fallback
  const eventItemMeta = {
    _id: doc._id,
    slug,
    title: doc.title,
    coachSlug,
    coachName: raw.coachName || 'فاطمه اسماعیلی',
    coachTitle: raw.coachTitle || 'کوچ مادران، بانوان و نوجوانان (Level 2 ICF)',
    coachImageUrl: raw.coachImageUrl,
    eventType: doc.eventType,
    eventTypeName: raw.eventTypeName || 'کارگاه تعاملی',
    status: doc.status,
    statusName: raw.statusName || 'در حال ثبت‌نام',
    featured: doc.featured,
    date: doc.date,
    formattedDate: raw.formattedDate || 'جمعه ۱۵ آبان',
    formattedTime: raw.formattedTime || 'ساعت ۱۸:۰۰',
    duration: doc.duration,
    location: doc.location,
    platform: doc.platform,
    platformName: raw.platformName || 'بله و تلگرام',
    registrationUrl: doc.registrationUrl,
    price: doc.price,
    originalPrice: doc.originalPrice,
    coverImageUrl: uploadedCoverUrl,
    coverImageAlt: raw.coverImageAlt || raw.title,
    excerpt: doc.excerpt,
    syllabus: doc.syllabus,
    targetAudience: doc.targetAudience,
    features: doc.features,
    faqs: doc.faqs,
  };

  await updateEventsCatalog(eventItemMeta);
  await syncFallbackEvents(eventItemMeta);

  const publicUrl = `https://bloomiaclub.com/events/${slug}`;
  console.log(`\n🎉 Event creation completed successfully!`);
  console.log(`🔗 Live URL: ${publicUrl}`);
}

main().catch((err) => {
  console.error('\n❌ Error executing publish-event:', err);
  process.exit(1);
});
