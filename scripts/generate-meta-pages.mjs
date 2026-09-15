import fs from 'fs';
import path from 'path';
import { createClient as createSanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Load .env and .env.local if present
for (const file of ['.env', '.env.local']) {
  const envPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = (match[2] || '').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
  }
}

const BASE_URL = 'https://www.bloomiaclub.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'بلومیا | پلتفرم خدمات کوچینگ و رشد فردی';

const supabaseBaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YWN2dXBhbGJmY29xa3V5ZGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDQwMDgsImV4cCI6MjA3NDk4MDAwOH0.c0TCM2eTu_GNhScWk4Rozc5vtXQMZItW1v43wd4fo_o';

const sanityClient = createSanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const resolveCoachImageUrl = (value) => {
  if (!value) return null;
  const cleaned = String(value).trim();
  if (!cleaned) return null;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith('storage/v1/object/public/')) {
    return `${supabaseBaseUrl}/${cleaned}`;
  }
  if (cleaned.startsWith('/storage/v1/object/public/')) {
    return `${supabaseBaseUrl}${cleaned}`;
  }
  return `${supabaseBaseUrl}/storage/v1/object/public/coaches_images/${cleaned.replace(/^\/+/, '')}`;
};

const STATIC_PAGES = [
  {
    path: 'blog',
    title: 'وبلاگ تخصصی کوچینگ و ارتقای فردی | بلومیا کلاب',
    description: 'مجموعه مقالات تخصصی و کاربردی در حوزه لایف کوچینگ، والدگری، مدیریت اولویت‌ها، بهبود روابط و توسعه شغلی.',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'coaching',
    title: 'خدمات کوچینگ و رزرو جلسه معارفه | بلومیا کلاب',
    description: 'با همراهی کوچ‌های معتبر و حرفه‌ای بلومیا، موانع ذهنی را پشت سر بگذارید و به اهداف شغلی و فردی خود دست یابید.',
    image: `${BASE_URL}/images/og-coaching.jpg`,
  },
  {
    path: 'coaching/what-is-coaching',
    title: 'کوچینگ چیست و چه کمکی به شما می‌کند؟ | بلومیا',
    description: 'راهنمای جامع آشنایی با کوچینگ حرفه‌ای، تفاوت آن با مشاوره و روان‌درمانی و نحوه اثرگذاری بر رشد فردی.',
    image: `${BASE_URL}/images/og-what-is-coaching.jpg`,
  },
  {
    path: 'coaching/free-intro-session',
    title: 'جلسه معارفه رایگان کوچینگ | بلومیا کلاب',
    description: 'فرصت گفتگوی مستقیم و شفاف‌سازی اهداف در یک جلسه معارفه رایگان با کوچ‌های تاییدشده بلومیا.',
    image: `${BASE_URL}/images/og-coaching.jpg`,
  },
  {
    path: 'coaches',
    title: 'کوچ‌های رسمی و تاییدشده بلومیا کلاب',
    description: 'لیست کوچ‌های حرفه‌ای بلومیا در حوزه‌های توسعه فردی، مدیریت زمان، مسیر شغلی و والدگری.',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'about',
    title: 'درباره ما | داستان و مأموریت بلومیا کلاب',
    description: 'آشنایی با هویت، رسالت و چشم‌انداز پلتفرم بلومیا در ارتقای کیفیت زندگی، کار و سلامت روان.',
    image: `${BASE_URL}/images/og-about.jpg`,
  },
  {
    path: 'contact',
    title: 'تماس با بلومیا کلاب | پشتیبانی و ارتباط با ما',
    description: 'راه‌های تماس، پشتیبانی مراجعین و پاسخ به پرسش‌های شما در بلومیا کلاب.',
    image: DEFAULT_IMAGE,
  },
  {
    path: 'faq',
    title: 'پرسش‌های متداول درباره خدمات کوچینگ | بلومیا',
    description: 'پاسخ به پرتکرارترین سوالات درباره فرآیند جلسات کوچینگ، نحوه انتخاب کوچ و هزینه‌ها.',
    image: DEFAULT_IMAGE,
  },
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateHtmlMeta(htmlTemplate, meta) {
  let updated = htmlTemplate;

  // Replace <title>...</title>
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  // Helper to replace or inject meta tag
  const replaceOrInjectMeta = (attr, attrValue, content) => {
    if (!content) return;
    const escapedContent = escapeHtml(content);
    const regex = new RegExp(`<meta\\s+${attr}=["']${attrValue}["'][^>]*>`, 'i');
    if (regex.test(updated)) {
      updated = updated.replace(regex, `<meta ${attr}="${attrValue}" content="${escapedContent}" />`);
    } else {
      updated = updated.replace('</head>', `  <meta ${attr}="${attrValue}" content="${escapedContent}" />\n</head>`);
    }
  };

  replaceOrInjectMeta('name', 'description', meta.description);
  replaceOrInjectMeta('property', 'og:site_name', SITE_NAME);
  replaceOrInjectMeta('property', 'og:type', meta.type || 'website');
  replaceOrInjectMeta('property', 'og:title', meta.title);
  replaceOrInjectMeta('property', 'og:description', meta.description);
  replaceOrInjectMeta('property', 'og:url', meta.url);
  replaceOrInjectMeta('property', 'og:image', meta.image);
  replaceOrInjectMeta('property', 'og:image:secure_url', meta.image);
  replaceOrInjectMeta('property', 'og:image:type', (meta.image || '').includes('.png') ? 'image/png' : 'image/jpeg');
  replaceOrInjectMeta('property', 'og:image:width', '1200');
  replaceOrInjectMeta('property', 'og:image:height', '630');
  replaceOrInjectMeta('property', 'og:image:alt', meta.title);
  replaceOrInjectMeta('property', 'og:locale', 'fa_IR');

  replaceOrInjectMeta('name', 'twitter:card', 'summary_large_image');
  replaceOrInjectMeta('property', 'twitter:title', meta.title);
  replaceOrInjectMeta('property', 'twitter:description', meta.description);
  replaceOrInjectMeta('property', 'twitter:image', meta.image);

  // Canonical link
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;
  if (canonicalRegex.test(updated)) {
    updated = updated.replace(canonicalRegex, `<link rel="canonical" href="${escapeHtml(meta.url)}" />`);
  } else {
    updated = updated.replace('</head>', `  <link rel="canonical" href="${escapeHtml(meta.url)}" />\n</head>`);
  }

  // Schema JSON-LD injection
  if (meta.schema) {
    const schemaStr = `  <script type="application/ld+json">${JSON.stringify(meta.schema)}</script>\n`;
    updated = updated.replace('</head>', `${schemaStr}</head>`);
  }

  // Noscript injection for bots/crawlers
  if (meta.noscript) {
    if (updated.includes('<div id="app">')) {
      updated = updated.replace('<div id="app">', `${meta.noscript}\n<div id="app">`);
    } else if (updated.includes('<body>')) {
      updated = updated.replace('<body>', `<body>\n${meta.noscript}`);
    }
  }

  return updated;
}

async function run() {
  const buildIndexHtml = path.resolve('build/index.html');
  if (!fs.existsSync(buildIndexHtml)) {
    console.error('❌ build/index.html not found! Please run npm run build first.');
    return;
  }

  const baseHtml = fs.readFileSync(buildIndexHtml, 'utf8');
  console.log('🚀 Generating static pre-rendered Open Graph HTML pages...');

  // 1. Generate Static Site Pages
  for (const page of STATIC_PAGES) {
    const pageUrl = `${BASE_URL}/${page.path}`;
    const pageHtml = updateHtmlMeta(baseHtml, {
      title: page.title,
      description: page.description,
      image: page.image,
      url: pageUrl,
      type: 'website',
    });

    const targetDir = path.resolve('build', page.path);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
    console.log(`  📄 Created static meta page: /${page.path} [image: ${path.basename(page.image)}]`);
  }

  // 2. Fetch all Active Coaches from Supabase
  if (supabaseAnonKey) {
    try {
      console.log('📡 Fetching active coaches from Supabase...');
      const supabase = createSupabaseClient(supabaseBaseUrl, supabaseAnonKey);
      const { data: coaches, error: coachesError } = await supabase
        .from('v2_coaches')
        .select('*')
        .eq('is_active', true);

      if (coachesError) {
        console.error('❌ Supabase error fetching coaches:', coachesError);
      } else if (coaches) {
        console.log(`📝 Found ${coaches.length} active coaches. Generating dedicated profile pages...`);

        for (const coach of coaches) {
          if (!coach.slug && !coach.id) continue;

          const coachName = coach.full_name || 'کوچ بلومیا';
          const coachJob = coach.job_title || 'کوچ حرفه‌ای توسعه فردی و شغلی';
          const coachTitle = `${coachName} | ${coachJob} | بلومیا کلاب`;
          const coachDescription = coach.bio_short || coach.bio_full?.slice(0, 160) || `${coachName}، ${coachJob} در پلتفرم خدمات کوچینگ بلومیا کلاب. رزرو آنلاین جلسه.`;
          const coachImage = resolveCoachImageUrl(coach.avatar_url || coach.hero_image_url) || DEFAULT_IMAGE;
          const coachSlug = coach.slug || coach.id;
          const coachUrl = `${BASE_URL}/coaches/${coachSlug}`;

          const coachSchema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": coachName,
            "jobTitle": coachJob,
            "url": coachUrl,
            "image": coachImage,
            "description": coachDescription,
            "worksFor": {
              "@type": "Organization",
              "name": "بلومیا کلاب",
              "url": BASE_URL
            },
            "inLanguage": "fa-IR"
          };

          const coachNoscript = `
<noscript>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto; direction: rtl; font-family: IRANYekan, Vazirmatn, sans-serif; text-align: right;">
    <h1>${escapeHtml(coachName)}</h1>
    <h2>${escapeHtml(coachJob)}</h2>
    ${coach.bio_short ? `<p><strong>درباره کوچ:</strong> ${escapeHtml(coach.bio_short)}</p>` : ''}
    ${coach.bio_full ? `<p>${escapeHtml(coach.bio_full)}</p>` : ''}
    <p><a href="${BASE_URL}/coaching/free-intro-session">رزرو جلسه معارفه رایگان با ${escapeHtml(coachName)}</a></p>
  </div>
</noscript>`;

          const coachHtml = updateHtmlMeta(baseHtml, {
            title: coachTitle,
            description: coachDescription,
            image: coachImage,
            url: coachUrl,
            type: 'profile',
            schema: coachSchema,
            noscript: coachNoscript,
          });

          // Write /coaches/:slug/index.html
          const slugDir = path.resolve('build/coaches', coachSlug);
          fs.mkdirSync(slugDir, { recursive: true });
          fs.writeFileSync(path.join(slugDir, 'index.html'), coachHtml, 'utf8');
          console.log(`  👤 Pre-rendered coach page: /coaches/${coachSlug} (${coachName})`);

          // If id is different from slug, also generate /coaches/:id/index.html so both URLs work seamlessly
          if (coach.id && coach.id !== coachSlug) {
            const idDir = path.resolve('build/coaches', coach.id);
            fs.mkdirSync(idDir, { recursive: true });
            fs.writeFileSync(path.join(idDir, 'index.html'), coachHtml, 'utf8');
          }
        }
      }
    } catch (err) {
      console.error('❌ Error generating coach pages:', err);
    }
  } else {
    console.warn('⚠️ Supabase anon key not found; skipping coach profile generation.');
  }

  // 3. Fetch all Posts from Sanity
  console.log('📡 Fetching blog posts from Sanity...');
  const posts = await sanityClient.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    excerpt,
    mainImage,
    publishedAt,
    _updatedAt,
    "authorName": author->name
  }`);

  console.log(`📝 Found ${posts.length} posts. Generating dedicated static pages...`);

  for (const post of posts) {
    if (!post.slug) continue;

    let imageUrl = DEFAULT_IMAGE;
    if (post.mainImage) {
      try {
        imageUrl = urlFor(post.mainImage)
          .width(1200)
          .height(630)
          .format('jpg')
          .quality(82)
          .fit('crop')
          .url();
      } catch (err) {
        console.warn(`Could not build image url for post ${post.slug}:`, err);
      }
    }

    const postTitle = post.metaTitle || `${post.title} | وبلاگ بلومیا`;
    const postDescription = post.metaDescription || post.excerpt || 'مقاله تخصصی در وبلاگ بلومیا کلاب';
    const postUrl = `${BASE_URL}/blog/${post.slug}`;

    const postSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": postDescription,
      "image": imageUrl,
      "url": postUrl,
      "datePublished": post.publishedAt,
      "dateModified": post._updatedAt || post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.authorName || "تیم تحریریه بلومیا"
      },
      "publisher": {
        "@type": "Organization",
        "name": "بلومیا کلاب",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/images/bloomia-club-logo.png`
        }
      },
      "inLanguage": "fa-IR"
    };

    const postNoscript = `
<noscript>
  <article style="padding: 2rem; max-width: 800px; margin: 0 auto; direction: rtl; font-family: IRANYekan, Vazirmatn, sans-serif; text-align: right;">
    <h1>${escapeHtml(post.title)}</h1>
    <p>${escapeHtml(postDescription)}</p>
    ${post.authorName ? `<p><strong>نویسنده:</strong> ${escapeHtml(post.authorName)}</p>` : ''}
  </article>
</noscript>`;

    const postHtml = updateHtmlMeta(baseHtml, {
      title: postTitle,
      description: postDescription,
      image: imageUrl,
      url: postUrl,
      type: 'article',
      schema: postSchema,
      noscript: postNoscript,
    });

    const targetDir = path.resolve('build/blog', post.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), postHtml, 'utf8');
    console.log(`  ✅ Pre-rendered blog post: /blog/${post.slug}`);
  }

  console.log('🎉 All static Open Graph & Schema pages successfully generated!');
}

run().catch(console.error);
