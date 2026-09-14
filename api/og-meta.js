const { createClient } = require('@sanity/client');
const imageUrlPkg = require('@sanity/image-url');
const imageUrlBuilder = imageUrlPkg.createImageUrlBuilder || imageUrlPkg.default || imageUrlPkg;

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const SITE_NAME = 'بلومیا | پلتفرم تخصصی کوچینگ';
const DEFAULT_IMAGE = 'https://bloomiaclub.com/og-image.png';
const BASE_URL = 'https://bloomiaclub.com';

const STATIC_PAGES = {
  '': {
    title: 'بلومیا | پلتفرم خدمات کوچینگ و رشد فردی',
    description: 'با کوچ‌های متخصص بلومیا، مسیر تغییر و تحول فردی و شغلی خود را شفاف کنید. اولین جلسه ارزیابی رایگان!',
    image: DEFAULT_IMAGE,
  },
  'blog': {
    title: 'وبلاگ تخصصی کوچینگ و ارتقای فردی | بلومیا کلاب',
    description: 'مجموعه مقالات تخصصی و کاربردی در حوزه لایف کوچینگ، والدگری، مدیریت اولویت‌ها، بهبود روابط و توسعه شغلی.',
    image: DEFAULT_IMAGE,
  },
  'coaching': {
    title: 'خدمات کوچینگ و رزرو جلسه معارفه | بلومیا کلاب',
    description: 'با همراهی کوچ‌های معتبر و حرفه‌ای بلومیا، موانع ذهنی را پشت سر بگذارید و به اهداف شغلی و فردی خود دست یابید.',
    image: 'https://bloomiaclub.com/images/coaching-free-intro-session.png',
  },
  'coaching/what-is-coaching': {
    title: 'کوچینگ چیست و چه کمکی به شما می‌کند؟ | بلومیا',
    description: 'راهنمای جامع آشنایی با کوچینگ حرفه‌ای، تفاوت آن با مشاوره و روان‌درمانی و نحوه اثرگذاری بر رشد فردی.',
    image: 'https://bloomiaclub.com/images/the-modern-professional-coach.png',
  },
  'coaching/free-intro-session': {
    title: 'جلسه معارفه رایگان کوچینگ | بلومیا کلاب',
    description: 'فرصت گفتگوی مستقیم و شفاف‌سازی اهداف در یک جلسه معارفه رایگان با کوچ‌های تاییدشده بلومیا.',
    image: 'https://bloomiaclub.com/images/coaching-free-intro-session.png',
  },
  'coaches': {
    title: 'کوچ‌های رسمی و تاییدشده بلومیا کلاب',
    description: 'لیست کوچ‌های حرفه‌ای بلومیا در حوزه‌های توسعه فردی، مدیریت زمان، مسیر شغلی و والدگری.',
    image: DEFAULT_IMAGE,
  },
  'about': {
    title: 'درباره ما | داستان و مأموریت بلومیا کلاب',
    description: 'آشنایی با هویت، رسالت و چشم‌انداز پلتفرم بلومیا در ارتقای کیفیت زندگی، کار و سلامت روان.',
    image: 'https://bloomiaclub.com/images/about_us.png',
  },
  'contact': {
    title: 'تماس با بلومیا کلاب | پشتیبانی و ارتباط با ما',
    description: 'راه‌های تماس، پشتیبانی مراجعین و پاسخ به پرسش‌های شما در بلومیا کلاب.',
    image: DEFAULT_IMAGE,
  },
  'faq': {
    title: 'پرسش‌های متداول درباره خدمات کوچینگ | بلومیا',
    description: 'پاسخ به پرتکرارترین سوالات درباره فرآیند جلسات کوچینگ، نحوه انتخاب کوچ و هزینه‌ها.',
    image: DEFAULT_IMAGE,
  },
};

const COACH_META = {
  'fatemeh_esmaeeli': {
    name: 'فاطمه اسماعیلی',
    title: 'فاطمه اسماعیلی | کوچ مادران، بانوان و نوجوانان - بلومیا',
    description: 'همراه مادران و نوجوانان در مدیریت فرسودگی، رفع احساس گناه مادری، تنظیم اولویت‌ها و حل تعارض‌های سن بلوغ.',
  },
  'payam-esmi': {
    name: 'پیام اسمی',
    title: 'پیام اسمی | کوچ هدفمندی، مدیریت زمان و برنامه‌ریزی - بلومیا',
    description: 'همراه شما برای عبور از تله پرمشغله بودن و تبدیل شدن به فردی متمرکز، موثر و مسلط بر زمان.',
  },
  'mahya_shakoori': {
    name: 'محیا شکوری',
    title: 'محیا شکوری | کوچ رشد فردی، لایف کوچینگ و خودآگاهی - بلومیا',
    description: 'همراهی برای کشف خود، ارتقای خودآگاهی، شکستن باورهای محدودکننده و ساخت آرامش درونی.',
  },
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async (req, res) => {
  try {
    const rawPath = req.query.path || req.url || '';
    const cleanPath = rawPath.replace(/^\/+/, '').replace(/\/+$/, '').split('?')[0];

    let meta = {
      title: 'بلومیا | پلتفرم خدمات کوچینگ و رشد فردی',
      description: 'با کوچ‌های متخصص بلومیا، مسیر تغییر خود را از همین امروز شفاف کنید. اولین جلسه ارزیابی رایگان!',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/${cleanPath}`,
    };

    // 1. Check if it's a blog post: blog/[slug]
    if (cleanPath.startsWith('blog/')) {
      const slug = cleanPath.replace(/^blog\//, '').trim();
      if (slug) {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          title,
          excerpt,
          metaTitle,
          metaDescription,
          mainImage,
          publishedAt,
          "authorName": author->name
        }`;
        const post = await client.fetch(query, { slug });

        if (post) {
          meta.type = 'article';
          meta.title = post.metaTitle || `${post.title} | وبلاگ بلومیا`;
          meta.description = post.metaDescription || post.excerpt || meta.description;
          meta.url = `${BASE_URL}/blog/${slug}`;

          if (post.mainImage) {
            try {
              meta.image = urlFor(post.mainImage).width(1200).height(630).fit('crop').url();
            } catch (e) {
              console.warn('Error formatting sanity image:', e);
            }
          }
        }
      }
    } else if (cleanPath.startsWith('coaches/')) {
      const coachId = cleanPath.replace(/^coaches\//, '').split('/')[0];
      if (COACH_META[coachId]) {
        meta.title = COACH_META[coachId].title;
        meta.description = COACH_META[coachId].description;
      }
    } else if (STATIC_PAGES[cleanPath]) {
      meta.title = STATIC_PAGES[cleanPath].title;
      meta.description = STATIC_PAGES[cleanPath].description;
      if (STATIC_PAGES[cleanPath].image) meta.image = STATIC_PAGES[cleanPath].image;
    }

    const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <link rel="canonical" href="${escapeHtml(meta.url)}" />

  <!-- Open Graph / Facebook / Telegram / WhatsApp -->
  <meta property="og:type" content="${escapeHtml(meta.type)}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:url" content="${escapeHtml(meta.url)}" />
  <meta property="og:image" content="${escapeHtml(meta.image)}" />
  <meta property="og:image:secure_url" content="${escapeHtml(meta.image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
  <meta property="og:locale" content="fa_IR" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@bloomiaclub" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(meta.image)}" />

  <!-- Instant Browser Redirect if a real user arrives here -->
  <meta http-equiv="refresh" content="0; url=/${escapeHtml(cleanPath)}" />
  <script>
    if (typeof window !== 'undefined') {
      window.location.replace('/${escapeHtml(cleanPath)}');
    }
  </script>
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 40px; background: #fafaf8; color: #1f3d3a;">
  <h2>${escapeHtml(meta.title)}</h2>
  <p>${escapeHtml(meta.description)}</p>
  <p><a href="/${escapeHtml(cleanPath)}">در حال انتقال به صفحه اصلی...</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (err) {
    console.error('Error in og-meta handler:', err);
    return res.status(500).send('Internal Server Error');
  }
};
