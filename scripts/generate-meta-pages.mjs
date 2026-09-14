import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
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

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const BASE_URL = 'https://bloomiaclub.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'بلومیا | پلتفرم خدمات کوچینگ و رشد فردی';

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
  replaceOrInjectMeta('property', 'og:image:type', meta.image.includes('.png') ? 'image/png' : 'image/jpeg');
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

  // 2. Fetch all Posts from Sanity
  console.log('📡 Fetching blog posts from Sanity...');
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    excerpt,
    mainImage,
    publishedAt,
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

    const postHtml = updateHtmlMeta(baseHtml, {
      title: postTitle,
      description: postDescription,
      image: imageUrl,
      url: postUrl,
      type: 'article',
    });

    const targetDir = path.resolve('build/blog', post.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), postHtml, 'utf8');
    console.log(`  ✅ Pre-rendered blog post: /blog/${post.slug}`);
  }

  console.log('🎉 All static Open Graph pages successfully generated!');
}

run().catch(console.error);
