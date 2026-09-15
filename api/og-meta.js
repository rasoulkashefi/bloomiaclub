// Standalone zero-dependency meta generator for crawlers / social bots on Vercel
const SITE_NAME = 'بلومیا | پلتفرم تخصصی کوچینگ';
const DEFAULT_IMAGE = 'https://www.bloomiaclub.com/og-image.jpg';
const BASE_URL = 'https://www.bloomiaclub.com';

const SANITY_PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88';
const SANITY_DATASET = process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

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
    image: 'https://www.bloomiaclub.com/images/og-coaching.jpg',
  },
  'coaching/what-is-coaching': {
    title: 'کوچینگ چیست و چه کمکی به شما می‌کند؟ | بلومیا',
    description: 'راهنمای جامع آشنایی با کوچینگ حرفه‌ای، تفاوت آن با مشاوره و روان‌درمانی و نحوه اثرگذاری بر رشد فردی.',
    image: 'https://www.bloomiaclub.com/images/og-what-is-coaching.jpg',
  },
  'coaching/free-intro-session': {
    title: 'جلسه معارفه رایگان کوچینگ | بلومیا کلاب',
    description: 'فرصت گفتگوی مستقیم و شفاف‌سازی اهداف در یک جلسه معارفه رایگان با کوچ‌های تاییدشده بلومیا.',
    image: 'https://www.bloomiaclub.com/images/og-coaching.jpg',
  },
  'coaches': {
    title: 'کوچ‌های رسمی و تاییدشده بلومیا کلاب',
    description: 'لیست کوچ‌های حرفه‌ای بلومیا در حوزه‌های توسعه فردی، مدیریت زمان، مسیر شغلی و والدگری.',
    image: DEFAULT_IMAGE,
  },
  'about': {
    title: 'درباره ما | داستان و مأموریت بلومیا کلاب',
    description: 'آشنایی با هویت، رسالت و چشم‌انداز پلتفرم بلومیا در ارتقای کیفیت زندگی، کار و سلامت روان.',
    image: 'https://www.bloomiaclub.com/images/og-about.jpg',
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
  'fatemeh-derakhsh': {
    name: 'دکتر فاطمه درخوش',
    title: 'دکتر فاطمه درخوش | کوچ رشد فردی و مسیر شغلی - بلومیا کلاب',
    description: 'دکترای داروسازی، کوچ تایید شده ICF با تمرکز بر خودشناسی شغلی و تصمیم‌گیری آگاهانه برای خروج از سردرگمی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/Fatemeh_Darkhosh.png',
  },
  'fatemeh_esmaeeli': {
    name: 'فاطمه اسماعیلی',
    title: 'فاطمه اسماعیلی | کوچ مادران، بانوان و نوجوانان - بلومیا کلاب',
    description: 'همراه مادران و نوجوانان در مدیریت فرسودگی، رفع احساس گناه مادری، تنظیم اولویت‌ها و حل تعارض‌های سن بلوغ.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/fatemeh_esmaeeli.jpeg',
  },
  'payam-esmi': {
    name: 'پیام اسمی',
    title: 'پیام اسمی | کوچ هدفمندی، مدیریت زمان و برنامه‌ریزی - بلومیا کلاب',
    description: 'همراه شما برای عبور از تله پرمشغله بودن و تبدیل شدن به فردی متمرکز، موثر و مسلط بر زمان.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/payam_esmi.jpg',
  },
  'mahya_shakoori': {
    name: 'محیا شکوری',
    title: 'محیا شکوری | کوچ رشد فردی، لایف کوچینگ و خودآگاهی - بلومیا کلاب',
    description: 'همراهی برای کشف خود، ارتقای خودآگاهی، شکستن باورهای محدودکننده و ساخت آرامش درونی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/mahya_shakouri.jpg',
  },
  'saloomeh_fathijou': {
    name: 'سالومه فتحی‌جو',
    title: 'سالومه فتحی‌جو | کوچ حرفه‌ای و توسعه فردی - بلومیا کلاب',
    description: 'کوچ حرفه‌ای در پلتفرم بلومیا کلاب، همراه شما در مسیر تحول و رشد فردی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/saloomeh_fathijou.jpg',
  },
  'Arezoo_Ghaffari': {
    name: 'آرزو غفاری',
    title: 'آرزو غفاری | کوچ حرفه‌ای و رشد فردی - بلومیا کلاب',
    description: 'کوچ حرفه‌ای در پلتفرم بلومیا کلاب، همراه شما در مسیر تحول و ارتقای فردی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/arezoo_ghafari.jpg',
  },
  'shabnam_nematimalek': {
    name: 'شبنم نعمتی‌ملک',
    title: 'شبنم نعمتی‌ملک | کوچ حرفه‌ای - بلومیا کلاب',
    description: 'کوچ حرفه‌ای در پلتفرم بلومیا کلاب، تسهیل‌گر رشد و خودآگاهی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/shabnam_nematimalek.jpg',
  },
  'maryam_johari': {
    name: 'مریم جوهری',
    title: 'مریم جوهری | کوچ حرفه‌ای - بلومیا کلاب',
    description: 'کوچ حرفه‌ای در پلتفرم بلومیا کلاب، همراه مراجعین در مسیر اهداف فردی و شغلی.',
    image: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_images/maryam_johari.jpg',
  },
};

function formatSanityImageUrl(mainImage) {
  if (!mainImage) return null;
  const ref = mainImage.asset?._ref || mainImage._ref;
  if (!ref || typeof ref !== 'string') return null;
  // Format: image-13d8b20f650aa03900e5d83b590f8f0d61c7ced7-1376x768-jpg
  const parts = ref.split('-');
  if (parts.length >= 4) {
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}?rect=0,0,${dimensions.replace('x', ',')}&w=1200&h=630&fm=jpg&q=82&fit=crop`;
  }
  return null;
}

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
  let cleanPath = '';
  let meta = {
    title: 'بلومیا | پلتفرم خدمات کوچینگ و رشد فردی',
    description: 'با کوچ‌های متخصص بلومیا، مسیر تغییر خود را از همین امروز شفاف کنید. اولین جلسه ارزیابی رایگان!',
    image: DEFAULT_IMAGE,
    type: 'website',
    url: BASE_URL,
  };

  try {
    const rawPath = (req && req.query && req.query.path) || (req && req.url) || '';
    cleanPath = String(rawPath).replace(/^\/+/, '').replace(/\/+$/, '').split('?')[0];
    meta.url = `${BASE_URL}/${cleanPath}`;

    // 1. Blog posts: blog/[slug]
    if (cleanPath.startsWith('blog/')) {
      const slug = cleanPath.replace(/^blog\//, '').trim();
      if (slug) {
        try {
          const query = `*[_type == "post" && slug.current == "${slug}"][0]{
            title,
            excerpt,
            metaTitle,
            metaDescription,
            mainImage,
            publishedAt,
            "authorName": author->name
          }`;
          const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
          const postRes = await fetch(sanityUrl, { signal: AbortSignal.timeout(3000) });
          if (postRes.ok) {
            const data = await postRes.json();
            const post = data && data.result;
            if (post) {
              meta.type = 'article';
              meta.title = post.metaTitle || `${post.title} | وبلاگ بلومیا`;
              meta.description = post.metaDescription || post.excerpt || meta.description;
              meta.url = `${BASE_URL}/blog/${slug}`;
              const imgUrl = formatSanityImageUrl(post.mainImage);
              if (imgUrl) meta.image = imgUrl;
            }
          }
        } catch (e) {
          console.warn('Error fetching blog post from Sanity API:', e);
        }
      }
    } else if (cleanPath.startsWith('coaches/')) {
      const coachId = cleanPath.replace(/^coaches\//, '').split('/')[0];
      if (COACH_META[coachId]) {
        meta.type = 'profile';
        meta.title = COACH_META[coachId].title;
        meta.description = COACH_META[coachId].description;
        if (COACH_META[coachId].image) meta.image = COACH_META[coachId].image;
      }
    } else if (STATIC_PAGES[cleanPath]) {
      meta.title = STATIC_PAGES[cleanPath].title;
      meta.description = STATIC_PAGES[cleanPath].description;
      if (STATIC_PAGES[cleanPath].image) meta.image = STATIC_PAGES[cleanPath].image;
    }
  } catch (err) {
    console.error('Error in og-meta calculation:', err);
  }

  // Generate HTML response safely
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

  <!-- Instant Browser Redirect for human users -->
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

  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (sendErr) {
    console.error('Error sending response:', sendErr);
    return res.status(200).send(html);
  }
};
