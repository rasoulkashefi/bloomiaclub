import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { createClient as createSanity } from '@sanity/client';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { env } from './_env.mjs';
import {
  coachDocId,
  syncAuthorDoc,
  upsertCoachBackup,
  COACH_PROJECTION,
} from '../../src/lib/coach-sync.mjs';

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
    let finalFilename = filename || 'coach-image.jpg';

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

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`❌ Failed to upload image (${imagePathOrUrl}):`, err.message);
    return undefined;
  }
}

function keyArray(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item, idx) => ({
    _key: item._key || item.id || `k${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 7)}`,
    ...item,
  }));
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Validates and provides sensible professional defaults for missing coach data.
 */
function buildCoachDocument(input) {
  if (!input.name) throw new Error('Coach "name" is strictly required.');

  const slug = input.slug ? slugify(input.slug) : slugify(input.nameEn || '');
  if (!slug) {
    throw new Error('Coach English "slug" is required (e.g. "zahra-soleimani"). Please specify "slug" in JSON.');
  }

  const title = input.title || 'کوچ حرفه‌ای توسعه فردی و رشد پایدار (ICF)';
  const description =
    input.description ||
    `همراهی تخصصی با مراجعان در مسیر شفاف‌سازی اهداف، تصمیم‌گیری‌های کلیدی و خلق تحول اصیل و پایدار در کار و زندگی.`;

  const longDescription =
    input.longDescription ||
    `من ${input.name} هستم؛ ${title}. رسالت من ایجاد فضایی امن، سرشار از احترام و بدون قضاوت است تا در آن بتوانید از چالش‌ها و تردیدهای روزمره فراتر بروید و ارزش‌ها و انگیزه‌های اصیل درون خود را دوباره کشف کنید.\n\nدر جلسات کوچینگ، ما نسخه‌های آماده یا توصیه‌های تکراری تجویز نمی‌کنیم؛ بلکه با گفتگوهای عمیق، پرسش‌های دقیق و بازتاب‌های صادقانه، به وضوح ذهنی می‌رسید و قدم‌های عملی متناسب با توانمندی‌ها و ویژگی‌های منحصر‌به‌فرد خودتان را برمی‌دارید.`;

  const specialties =
    Array.isArray(input.specialties) && input.specialties.length > 0
      ? input.specialties
      : ['توسعه فردی', 'وضوح ذهنی', 'تصمیم‌گیری آگاهانه', 'مدیریت استرس'];

  // Audience
  const defaultAudience = [
    { title: 'در دوراهی‌های مهم زندگی یا مسیر شغلی نیازمند وضوح و تصمیم‌گیری قاطع هستید.' },
    { title: 'می‌خواهید بر سردرگمی ذهنی و نشخوار فکری غلبه کنید و انرژی‌تان را بازیابید.' },
    { title: 'قصد دارید اهداف واقعی و متناسب با ارزش‌های اصیل خود را بشناسید و محقق کنید.' },
    { title: 'به دنبال همراهی متعهد، بدون قضاوت و حرفه‌ای در مسیر ساختن نسخه اصیل خود هستید.' },
  ];
  const audience = keyArray(input.audience && input.audience.length > 0 ? input.audience : defaultAudience);

  // Method
  const defaultMethod = [
    {
      title: 'شناخت و شفاف‌سازی چالش',
      description: 'در گام نخست، با همراهی یکدیگر به بررسی عمیق وضعیت فعلی، دغدغه‌های کلیدی و اولویت‌های اصلی زندگی شما می‌پردازیم.',
    },
    {
      title: 'واکاوی و گشودن گره‌های ذهنی',
      description: 'از طریق پرسشگری عمیق و بازتاب‌های صادقانه، باورهای محدودکننده و تعارضات درونی را ریشه‌یابی و شفاف می‌کنیم.',
    },
    {
      title: 'طراحی برنامه اقدام فردی',
      description: 'بینش‌های به‌دست‌آمده را به گام‌های عملی، ملموس و قابل اجرا در بطن زندگی روزمره‌تان تبدیل می‌کنیم.',
    },
    {
      title: 'همراهی، پایش و تحول پایدار',
      description: 'در روند اجرای اقدامات، موانع را شناسایی و بازبینی کرده و نتایج را تا دستیابی به تعادل و توانمندی پایدار همراهی می‌کنیم.',
    },
  ];
  const method = keyArray(input.method && input.method.length > 0 ? input.method : defaultMethod);

  // Services
  const defaultServices = [
    {
      title: 'جلسه معارفه (جلسه صفر)',
      duration: '۳۰ دقیقه',
      description: 'یک گفتگوی آنلاین رایگان برای آشنایی با سبک کار کوچ، بررسی چالش‌ها و سنجش همسویی در مسیر کوچینگ.',
      isFree: true,
    },
    {
      title: 'جلسه کوچینگ اختصاصی',
      duration: '۶۰ دقیقه',
      description: 'یک جلسه آنلاین عمیق، محرمانه و متمرکز برای واکاوی مسائل کلیدی، تصمیم‌گیری و ساخت برنامه اقدام موثر.',
      isFree: false,
    },
  ];
  const services = keyArray(input.services && input.services.length > 0 ? input.services : defaultServices);

  // Packages
  const defaultPackages = [
    {
      title: 'پکیج «شروع»',
      sessions: 4,
      duration: '۶۰ دقیقه',
      description: 'مناسب برای شفاف‌سازی یک موضوع معین، تصمیم‌گیری‌های فوری و برداشتن نخستین گام‌های عملی.',
      price: input.packagePrices?.start || 4800000,
      isPopular: false,
      features: [
        '۴ جلسه آنلاین ۶۰ دقیقه‌ای',
        'ترسیم نقشه راه و هدف‌گذاری شفاف',
        'پیگیری پیشرفت میان جلسات',
      ],
    },
    {
      title: 'پکیج «کشف»',
      sessions: 6,
      duration: '۶۰ دقیقه',
      description: 'کاوش عمیق‌تر در الگوهای فکری، شناسایی ریشه‌های باورهای محدودکننده و بازطراحی تصمیمات مهم.',
      price: input.packagePrices?.discovery || 7200000,
      isPopular: true,
      features: [
        '۶ جلسه آنلاین ۶۰ دقیقه‌ای',
        'واکاوی عمیق الگوهای رفتاری و باورها',
        'پشتیبانی پیامکی در طول دوره',
        'طراحی برنامه اقدام فردی شخصی‌سازی‌شده',
      ],
    },
    {
      title: 'پکیج «تحول»',
      sessions: 8,
      duration: '۶۰ دقیقه',
      description: 'ایجاد دگرگونی پایدار در نگرش و سبک زندگی، ساخت عادت‌های سازنده و تثبیت تاب‌آوری درونی.',
      price: input.packagePrices?.transformation || 9500000,
      isPopular: false,
      features: [
        '۸ جلسه آنلاین ۶۰ دقیقه‌ای',
        'برنامه جامع تحول نگرش و عملکرد',
        'پشتیبانی مستقیم و هفتگی کوچ',
        'ارزیابی و بازبینی پیشرفت ماهانه',
      ],
    },
    {
      title: 'پکیج «تعالی»',
      sessions: 12,
      duration: '۶۰ دقیقه',
      description: 'همراهی بلندمدت برای رهبری فردی اصیل، مدیریت پروژه‌های بزرگ تحول و دستیابی به پایداری ذهنی و عملی.',
      price: input.packagePrices?.excellence || 14000000,
      isPopular: false,
      features: [
        '۱۲ جلسه آنلاین ۶۰ دقیقه‌ای',
        'همراهی مستمر در تمام فازهای تحول',
        'دسترسی اختصاصی به منابع و ابزارهای کوچینگ',
        'پشتیبانی نامحدود پیامکی در طول دوره',
      ],
    },
  ];
  const packages = keyArray(input.packages && input.packages.length > 0 ? input.packages : defaultPackages);

  // Credentials
  const defaultCredentials = [
    {
      title: 'مدرک بین‌المللی کوچینگ (سطح حرفه‌ای)',
      organization: 'فدراسیون بین‌المللی کوچینگ (ICF)',
      year: '۱۴۰۲',
    },
  ];
  const credentials = keyArray(input.credentials && input.credentials.length > 0 ? input.credentials : defaultCredentials);

  // Testimonials
  const defaultTestimonials = [
    {
      author: 'الهام ر.',
      context: 'تصمیم‌گیری شغلی و وضوح درونی',
      quote: 'جلسات با ایشان چشم‌انداز من را کاملاً تغییر داد. بدون هیچ قضاوتی شنیده شدم و بالاخره توانستم از بلاتکلیفی چندماهه خارج شوم.',
    },
    {
      author: 'رضا م.',
      context: 'مدیریت اضطراب و تعادل فردی',
      quote: 'تمرین‌ها و پرسش‌های دقیق کوچ باعث شد ریشه اضطرابم را بشناسم و گام‌های عملی برای مدیریت زمانم بردارم.',
    },
  ];
  const testimonials = keyArray(input.testimonials && input.testimonials.length > 0 ? input.testimonials : defaultTestimonials);

  // FAQs
  const defaultFaqs = [
    {
      question: 'جلسه معارفه رایگان (جلسه صفر) چگونه برگزار می‌شود؟',
      answer: 'جلسه صفر یک گفتگوی آنلاین ۳۰ دقیقه‌ای بدون هیچ‌گونه تعهد مالی است که در آن اهداف و چالش‌های شما بررسی شده و با متدولوژی کوچینگ و سبک همراهی کوچ آشنا می‌شوید.',
    },
    {
      question: 'آیا گفتگوها و اطلاعات مطرح‌شده در جلسات محرمانه است؟',
      answer: 'بله، ۱۰۰٪ محرمانه است. رازداری و حفظ کامل اسرار مراجع، اصل بنیادین و تخطی‌ناپذیر منشور اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) است.',
    },
    {
      question: 'تفاوت کوچینگ با روان‌درمانی و مشاوره چیست؟',
      answer: 'روان‌درمانی بر حل آسیب‌های گذشته و درمان اختلالات تمرکز دارد، و مشاوره نسخه‌های تجویزی ارائه می‌دهد. اما کوچینگ بر زمان حال و آینده تمرکز داشته و به شما کمک می‌کند پاسخ‌ها و توانمندی‌های درونی‌تان را برای رسیدن به اهداف فردی به کار بگیرید.',
    },
    {
      question: 'جلسات آنلاین چگونه برگزار می‌شوند؟',
      answer: 'جلسات از طریق بستر ارتباطی گوگل‌میت یا زوم در زمان هماهنگ‌شده با کیفیتی پایدار و در محیطی آرام برگزار می‌گردد.',
    },
  ];
  const faqs = keyArray(input.faqs && input.faqs.length > 0 ? input.faqs : defaultFaqs);

  const doc = {
    _id: coachDocId(slug),
    _type: 'coach',
    name: input.name,
    slug: { _type: 'slug', current: slug },
    title,
    description,
    longDescription,
    specialties,
    experienceYears: input.experienceYears != null ? Number(input.experienceYears) : 5,
    languages: Array.isArray(input.languages) && input.languages.length > 0 ? input.languages : ['فارسی'],
    sessionMode: input.sessionMode || 'online',
    location: input.location || undefined,
    rating: input.rating != null ? Number(input.rating) : 5.0,
    totalReviews: input.totalReviews != null ? Number(input.totalReviews) : 28,
    totalSessions: input.totalSessions != null ? Number(input.totalSessions) : 180,
    coachingHours: input.coachingHours != null ? Number(input.coachingHours) : 180,
    satisfiedClients: input.satisfiedClients != null ? Number(input.satisfiedClients) : 35,
    packagePrices: input.packagePrices || {
      start: 4800000,
      discovery: 7200000,
      transformation: 9500000,
      excellence: 14000000,
    },
    packageDiscounts: input.packageDiscounts || {
      discovery: 15,
      transformation: 20,
    },
    instagramUrl: input.instagramUrl || undefined,
    linkedinUrl: input.linkedinUrl || undefined,
    bookingUrl: input.bookingUrl || undefined,
    welcomePacket: input.welcomePacket || undefined,
    videoUrl: input.videoUrl || undefined,
    videoTitle: input.videoTitle || undefined,
    videoDescription: input.videoDescription || undefined,
    audience,
    method,
    services,
    packages,
    credentials,
    testimonials,
    faqs,
    isActive: input.isActive !== false,
    order: input.order != null ? Number(input.order) : undefined,
  };

  return { doc, slug };
}

async function updateCatalog() {
  console.log('🔄 Updating COACHES_CATALOG.md...');
  try {
    const dumpScript = path.resolve(process.cwd(), 'scripts/sanity/dump-coaches-catalog.mjs');
    if (fs.existsSync(dumpScript)) {
      const { execSync } = await import('child_process');
      execSync(`node "${dumpScript}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.warn('⚠️ Could not update COACHES_CATALOG.md automatically:', err.message);
  }
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (args.length === 0) {
    console.error('Usage: node scripts/sanity/publish-coach.mjs <coach-data.json> [--dry-run]');
    process.exit(1);
  }

  const jsonFilePath = path.resolve(process.cwd(), args[0]);
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`❌ JSON file not found: ${jsonFilePath}`);
    process.exit(1);
  }

  console.log(`📖 Reading coach specification from: ${jsonFilePath}...`);
  const rawInput = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  const { doc, slug } = buildCoachDocument(rawInput);

  console.log(`\n📋 Prepared coach profile: "${doc.name}" (slug: ${slug})`);
  console.log(`   Title: ${doc.title}`);
  console.log(`   Specialties: ${doc.specialties.join(', ')}`);
  console.log(`   Document ID: ${doc._id}`);

  // Handle Image Uploads
  if (!dryRun) {
    if (rawInput.avatarPathOrUrl || rawInput.avatar) {
      const imgPath = rawInput.avatarPathOrUrl || rawInput.avatar;
      console.log(`\n📸 Uploading avatar image...`);
      doc.avatar = await uploadImageFromPathOrUrl(imgPath, `${slug}-avatar`);
    } else if (!rawInput.keepExistingAvatar) {
      console.warn('⚠️ No avatar image specified in avatarPathOrUrl. The page will show the default avatar.');
    }

    if (rawInput.cutoutPathOrUrl || rawInput.cutoutImage) {
      const cutoutPath = rawInput.cutoutPathOrUrl || rawInput.cutoutImage;
      console.log(`✂️ Uploading cutout image...`);
      doc.cutoutImage = await uploadImageFromPathOrUrl(cutoutPath, `${slug}-cutout`);
    }

    if (rawInput.coverImagePathOrUrl || rawInput.coverImage) {
      const coverPath = rawInput.coverImagePathOrUrl || rawInput.coverImage;
      console.log(`🖼️ Uploading cover image...`);
      doc.coverImage = await uploadImageFromPathOrUrl(coverPath, `${slug}-cover`);
    }

    if (rawInput.aboutImagePathOrUrl || rawInput.aboutImage) {
      const aboutPath = rawInput.aboutImagePathOrUrl || rawInput.aboutImage;
      console.log(`📖 Uploading about image...`);
      doc.aboutImage = await uploadImageFromPathOrUrl(aboutPath, `${slug}-about`);
    }
  }

  if (dryRun) {
    console.log('\n🔍 [DRY-RUN] Coach document preview:');
    console.log(JSON.stringify(doc, null, 2));
    console.log('\n✅ Dry-run completed. No writes made.');
    process.exit(0);
  }

  // Write Coach Document to Sanity
  console.log(`\n🚀 Publishing coach document to Sanity with ID: ${doc._id}...`);
  await sanity.createOrReplace(doc);
  console.log(`✅ Sanity coach document published successfully!`);

  // Sync Author Document for the Blog
  try {
    console.log(`🔗 Synchronizing blog author document (coach-${slug})...`);
    const avatarRef = doc.avatar?.asset?._ref;
    await syncAuthorDoc(sanity, {
      slug,
      name: doc.name,
      title: doc.title,
      description: doc.description,
      avatarRef,
    });
    console.log(`✅ Author document (coach-${slug}) synced for blog integration!`);
  } catch (authorErr) {
    console.warn(`⚠️ Warning: could not sync author doc: ${authorErr.message}`);
  }

  // Backup to Supabase v2_coaches if available
  if (env.supabaseServiceKey) {
    try {
      console.log(`💾 Syncing backup row to Supabase v2_coaches...`);
      const supabase = createSupabase(env.supabaseUrl, env.supabaseServiceKey, {
        auth: { persistSession: false },
      });
      // Fetch full projection doc from sanity
      const fullDoc = await sanity.fetch(`*[_id == $id][0] ${COACH_PROJECTION}`, { id: doc._id });
      if (fullDoc) {
        const res = await upsertCoachBackup(supabase, fullDoc);
        console.log(`✅ Supabase backup row ${res} for ${slug}!`);
      }
    } catch (sbErr) {
      console.warn(`⚠️ Supabase backup note: ${sbErr.message}`);
    }
  }

  // Update Catalog Markdown
  await updateCatalog();

  const publicUrl = `https://bloomiaclub.com/coaches/${slug}`;
  console.log(`\n🎉 Coach onboarding completed successfully!`);
  console.log(`🔗 Live URL: ${publicUrl}`);
}

main().catch((err) => {
  console.error('\n❌ Error executing publish-coach:', err);
  process.exit(1);
});
