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

const BASE_URL = 'https://www.bloomiaclub.com';
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
  { path: 'coaches', priority: '0.9', changefreq: 'weekly' },
  { path: 'coaching', priority: '0.9', changefreq: 'weekly' },
  { path: 'coaching/free-intro-session', priority: '0.9', changefreq: 'weekly' },
  { path: 'coaching/what-is-coaching', priority: '0.8', changefreq: 'monthly' },
  { path: 'blog', priority: '0.8', changefreq: 'daily' },
  { path: 'about', priority: '0.7', changefreq: 'monthly' },
  { path: 'faq', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.6', changefreq: 'monthly' },
];

async function generateSitemap() {
  console.log('🗺️ Generating comprehensive XML Sitemap for Bloomia Club...');
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

  // 2. Active Coaches from Supabase
  if (supabaseAnonKey) {
    try {
      console.log('📡 Fetching coaches from Supabase...');
      const supabase = createSupabaseClient(supabaseBaseUrl, supabaseAnonKey);
      const { data: coaches, error } = await supabase
        .from('v2_coaches')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Supabase error fetching coaches:', error);
      } else if (coaches) {
        console.log(`  Found ${coaches.length} active coaches.`);
        for (const coach of coaches) {
          if (!coach.slug) continue;
          const loc = `${BASE_URL}/coaches/${coach.slug}`;
          const lastModDate = coach.created_at ? coach.created_at.split('T')[0] : today;
          const imageUrl = resolveCoachImageUrl(coach.avatar_url || coach.hero_image_url);

          let imageTag = '';
          if (imageUrl) {
            imageTag = `\n    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(coach.full_name || 'کوچ بلومیا')}</image:title>
    </image:image>`;
          }

          urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`);
        }
      }
    } catch (err) {
      console.error('❌ Error fetching coaches for sitemap:', err);
    }
  } else {
    console.warn('⚠️ Supabase anon key not found; skipping coach sitemap generation.');
  }

  // 3. Blog Posts from Sanity
  try {
    console.log('📡 Fetching blog posts from Sanity...');
    const posts = await sanityClient.fetch(`*[_type == "post"]{
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      _updatedAt
    }`);

    console.log(`  Found ${posts.length} blog posts.`);
    for (const post of posts) {
      if (!post.slug) continue;
      const loc = `${BASE_URL}/blog/${post.slug}`;
      const modDate = post._updatedAt ? post._updatedAt.split('T')[0] : (post.publishedAt ? post.publishedAt.split('T')[0] : today);

      let imageTag = '';
      if (post.mainImage) {
        try {
          const imgUrl = urlForSanity(post.mainImage).width(1200).height(630).url();
          imageTag = `\n    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${escapeXml(post.title || 'مقاله بلومیا')}</image:title>
    </image:image>`;
        } catch (e) {
          // ignore image error
        }
      }

      urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`);
    }
  } catch (err) {
    console.error('❌ Error fetching posts from Sanity for sitemap:', err);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>
`;

  // Write to public/sitemap.xml
  const publicSitemapPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`✅ Saved sitemap to ${publicSitemapPath} (${urlEntries.length} URLs)`);

  // Also write to build/sitemap.xml if build directory exists
  const buildDir = path.resolve('build');
  if (fs.existsSync(buildDir)) {
    const buildSitemapPath = path.join(buildDir, 'sitemap.xml');
    fs.writeFileSync(buildSitemapPath, sitemapXml, 'utf8');
    console.log(`✅ Saved sitemap to ${buildSitemapPath}`);
  }
}

generateSitemap().catch(console.error);
