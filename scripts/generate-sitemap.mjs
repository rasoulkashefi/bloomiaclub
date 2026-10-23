import fs from 'fs';
import path from 'path';
import { createClient as createSanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Load environment variables
for (const file of ['.env', '.env.local']) {
  const envPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach((line) => {
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

// Canonical non-www base URL matching site metadata
const BASE_URL = 'https://bloomiaclub.com';
const supabaseBaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YWN2dXBhbGJmY29xa3V5ZGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDQwMDgsImV4cCI6MjA3NDk4MDAwOH0.c0TCM2eTu_GNhScWk4Rozc5vtXQMZItW1v43wd4fo_o';

const sanityClient = createSanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);
function urlForSanity(source) {
  return builder.image(source);
}

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'coaches', priority: '0.95', changefreq: 'daily' },
  { path: 'coaching/free-intro-session', priority: '0.95', changefreq: 'daily' },
  { path: 'coaching/what-is-coaching', priority: '0.9', changefreq: 'weekly' },
  { path: 'blog', priority: '0.9', changefreq: 'daily' },
  { path: 'events', priority: '0.9', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'faq', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.75', changefreq: 'monthly' },
  { path: 'legal', priority: '0.6', changefreq: 'monthly' },
];

const KNOWN_COACHES = [
  { slug: 'fatemeh_esmaeeli', name: 'فاطمه اسماعیلی' },
  { slug: 'mahya_shakoori', name: 'محیا شکوری' },
  { slug: 'saloomeh_fathijou', name: 'سالومه فتحی‌جو' },
  { slug: 'Arezoo_Ghaffari', name: 'آرزو غفاری' },
  { slug: 'fatemeh-derakhsh', name: 'دکتر فاطمه درخوش' },
  { slug: 'shabnam_nematimalek', name: 'شبنم نعمتی‌ملک' },
  { slug: 'maryam_johari', name: 'مریم جوهری' },
  { slug: 'payam-esmi', name: 'پیام اسمی' },
];

const KNOWN_EVENTS = [
  { slug: 'mbti-parenting-coaching-workshop', title: 'کارگاه تعاملی فرزندپروری آگاهانه با رویکرد MBTI' },
];

async function generateSitemap() {
  console.log('Generating comprehensive XML Sitemap for Bloomia Club...');
  const today = new Date().toISOString().split('T')[0];
  const urlEntries = [];

  // 1. Static Pages
  for (const page of STATIC_ROUTES) {
    const loc = page.path ? `${BASE_URL}/${page.path}` : `${BASE_URL}/`;
    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  // 2. Active Coaches
  const seenCoaches = new Set();
  if (supabaseAnonKey) {
    try {
      const supabase = createSupabaseClient(supabaseBaseUrl, supabaseAnonKey);
      const { data: coaches } = await supabase
        .from('v2_coaches')
        .select('*')
        .eq('is_active', true);

      if (coaches && coaches.length > 0) {
        for (const coach of coaches) {
          if (!coach.slug) continue;
          seenCoaches.add(coach.slug);
          const loc = `${BASE_URL}/coaches/${coach.slug}`;
          const lastModDate = coach.created_at ? coach.created_at.split('T')[0] : today;
          urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
        }
      }
    } catch (err) {
      console.warn('Supabase fetch failed, will use local coaches fallback');
    }
  }

  // Fallback known coaches
  for (const kc of KNOWN_COACHES) {
    if (!seenCoaches.has(kc.slug)) {
      seenCoaches.add(kc.slug);
      urlEntries.push(`  <url>
    <loc>${escapeXml(`${BASE_URL}/coaches/${kc.slug}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
    }
  }

  // 3. Events
  for (const ev of KNOWN_EVENTS) {
    urlEntries.push(`  <url>
    <loc>${escapeXml(`${BASE_URL}/events/${ev.slug}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
  }

  // 4. Blog Posts from Sanity
  try {
    const posts = await sanityClient.fetch(`*[_type == "post"]{
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      _updatedAt
    }`);

    if (posts && posts.length > 0) {
      for (const post of posts) {
        if (!post.slug) continue;
        const loc = `${BASE_URL}/blog/${post.slug}`;
        const modDate = post._updatedAt
          ? post._updatedAt.split('T')[0]
          : post.publishedAt
          ? post.publishedAt.split('T')[0]
          : today;

        let imageTag = '';
        if (post.mainImage) {
          try {
            const imgUrl = urlForSanity(post.mainImage).width(1200).height(630).url();
            imageTag = `\n    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${escapeXml(post.title || 'مقاله بلومیا')}</image:title>
    </image:image>`;
          } catch (e) {}
        }

        urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`);
      }
    }
  } catch (err) {
    console.warn('Sanity posts fetch failed, reading fallback slugs');
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>
`;

  const publicSitemapPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`Saved sitemap to ${publicSitemapPath} (${urlEntries.length} URLs)`);
}

generateSitemap().catch(console.error);
