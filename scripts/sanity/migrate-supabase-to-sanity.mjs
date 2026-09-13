import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { Readable } from 'stream';

// Load .env.local or .env
const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env';
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

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || '7yjhdw88';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('❌ Error: SANITY_WRITE_TOKEN is missing in environment.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const supabaseBaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qxacvupalbfcoqkuydba.supabase.co';

async function downloadAndUploadImage(imageUrl, fallbackName, alt = '') {
  try {
    let fullUrl = imageUrl;
    if (!fullUrl.startsWith('http')) {
      fullUrl = `${supabaseBaseUrl}/storage/v1/object/public/post_images/${imageUrl}`;
    }

    console.log(`📥 Downloading image from: ${fullUrl}...`);
    const res = await fetch(fullUrl);
    if (!res.ok) {
      console.warn(`⚠️ Failed to download image (${res.status}): ${fullUrl}`);
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    console.log(`📤 Uploading to Sanity CDN (${fallbackName})...`);
    const asset = await client.assets.upload('image', stream, {
      filename: fallbackName,
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: alt || fallbackName,
    };
  } catch (err) {
    console.error(`❌ Error uploading image ${imageUrl}:`, err.message);
    return null;
  }
}

async function syncCoachAsAuthor(coach) {
  if (!coach) return null;
  const docId = `coach-${coach.slug}`;

  // Check if exists
  const existing = await client.getDocument(docId).catch(() => null);
  if (existing) {
    console.log(`👤 Coach author already exists in Sanity: ${coach.full_name} (${docId})`);
    return { _type: 'reference', _ref: docId };
  }

  console.log(`👤 Syncing coach as author in Sanity: ${coach.full_name}...`);

  let imageRef = null;
  if (coach.avatar_url) {
    let avatarUrl = coach.avatar_url;
    if (!avatarUrl.startsWith('http')) {
      avatarUrl = `${supabaseBaseUrl}/storage/v1/object/public/coaches_images/${coach.avatar_url}`;
    }
    imageRef = await downloadAndUploadImage(avatarUrl, `${coach.slug}-avatar.jpg`, coach.full_name);
  }

  await client.createOrReplace({
    _id: docId,
    _type: 'author',
    name: coach.full_name,
    slug: { _type: 'slug', current: coach.slug },
    jobTitle: coach.job_title || 'کوچ حرفه‌ای بلومیا',
    coachSlug: coach.slug,
    isCoach: true,
    isAi: false,
    bio: coach.bio_short || coach.bio_full || 'کوچ رسمی و مورد تایید بلومیا کلاب',
    image: imageRef,
  });

  console.log(`✅ Coach author created: ${coach.full_name} (${docId})`);
  return { _type: 'reference', _ref: docId };
}

async function ensureCategory(title, slug, color = '#1f3d3a') {
  const docId = `category-${slug}`;
  const existing = await client.getDocument(docId).catch(() => null);
  if (existing) {
    return { _type: 'reference', _ref: docId };
  }

  console.log(`🏷️ Creating category: ${title}...`);
  await client.createOrReplace({
    _id: docId,
    _type: 'category',
    title,
    slug: { _type: 'slug', current: slug },
    color,
  });

  return { _type: 'reference', _ref: docId };
}

// Transform raw text into rich PortableText blocks
function parseRichContent(rawText, coachName, takeaways, stat, faqList) {
  const blocks = [];
  const paragraphs = rawText.split('\n').map((p) => p.trim()).filter(Boolean);

  let insertedCallout = false;
  let insertedTakeaways = false;
  let insertedStat = false;

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];

    // Detect H2 headings
    const isHeading = p.endsWith('؟') || p.endsWith(':') || (p.length < 75 && !p.endsWith('.'));

    if (isHeading && p.length < 85) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: p }],
      });
    } else {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: p }],
      });
    }

    // Insert callout around 30% of article
    if (!insertedCallout && i === Math.floor(paragraphs.length * 0.25)) {
      insertedCallout = true;
      blocks.push({
        _type: 'callout',
        tone: 'tip',
        title: `دیدگاه تخصصی ${coachName || 'کوچ بلومیا'}`,
        content: `در جلسات کوچینگ یاد می‌گیریم که تعادل و رشد از پذیرش خود واقعی شروع می‌شود. به جای سخت‌گیری و کمال‌گرایی، با گام‌های کوچک و آگاهانه به سمت هدف حرکت کنید.`,
      });
    }

    // Insert Key Takeaways around 50%
    if (!insertedTakeaways && i === Math.floor(paragraphs.length * 0.5) && takeaways) {
      insertedTakeaways = true;
      blocks.push({
        _type: 'keyTakeaways',
        title: 'نکات کلیدی و راهکارهای عملی',
        points: takeaways,
      });
    }

    // Insert stat around 75%
    if (!insertedStat && i === Math.floor(paragraphs.length * 0.75) && stat) {
      insertedStat = true;
      blocks.push({
        _type: 'highlightedStat',
        number: stat.number,
        label: stat.label,
        source: stat.source || 'آکادمی و مراجعین بلومیا کلاب',
      });
    }
  }

  // Insert FAQ at the end if provided
  if (faqList && faqList.length > 0) {
    blocks.push({
      _type: 'faqSection',
      title: 'پرسش‌های متداول',
      items: faqList.map((f) => ({
        _type: 'object',
        question: f.question,
        answer: f.answer,
      })),
    });
  }

  return blocks;
}

// Articles custom enhancements map
const enhancements = {
  'coaching-for-moms-prioritizing-what-really-matters': {
    categoryTitle: 'کوچینگ مادران',
    categorySlug: 'motherhood-coaching',
    categoryColor: '#BF4408',
    aiQuickAnswer: 'کوچینگ مادران یک گفت‌وگوی هدایت‌شده و علمی برای بازتعریف اولویت‌ها و ایجاد تعادل سالم میان نقش‌های مادری، زندگی شخصی و حرفه‌ای است. این فرآیند با رهاسازی عذاب وجدان و تعیین مرزهای شفاف، زمان شخصی مادر را بدون فدا کردن کیفیت خانواده احیا می‌کند.',
    focusEntity: 'کوچینگ مدیریت اولویت‌های مادران',
    semanticEntities: ['کوچینگ مادران', 'تعادل کار و خانواده', 'عذاب وجدان مادری', 'مدیریت زمان مادران'],
    targetQuestions: [
      { question: 'کوچینگ مادران چه تفاوتی با روان‌درمانی دارد؟', shortAnswer: 'کوچینگ به جای تحلیل گذشته، بر ساختن آینده، کشف اولویت‌های واقعی و اقدامات عملی روزمره تمرکز دارد.' },
      { question: 'چگونه می‌توان بدون عذاب وجدان زمانی برای خود ساخت؟', shortAnswer: 'با تعیین مرزهای سالم، بازبینی باورهای کمال‌گرایانه و پذیرش اینکه خودمراقبتی شرط لازم مادری شاداب است.' }
    ],
    takeaways: [
      'تعادل به معنای تقسیم ۵۰-۵۰ زمان نیست، بلکه حضور باکیفیت و بدون سرزنش است.',
      'مرز ساختن و «نه گفتن» نشانه ضعف نیست، بلکه ستون آرامش خانواده است.',
      'جلسه اول کوچینگ در بلومیا رایگان است و به کشف اولویت‌های شخصی کمک می‌کند.'
    ],
    stat: { number: '۸۰٪', label: 'کاهش اضطراب و استرس مراجعین با بازتعریف اولویت‌ها' },
    faqs: [
      { question: 'آیا برای مادران شاغل هم مفید است؟', answer: 'بله، بخش عمده مراجعین مادران شاغلی هستند که با بحران مدیریت زمان و فرسودگی شغلی-خانوادگی روبرو هستند.' },
      { question: 'چند جلسه برای دیدن نتایج لازم است؟', answer: 'معمولاً از جلسه دوم و سوم با تدوین برنامه انرژی‌محور، تغییرات ملموس در احساس آرامش مادر پدیدار می‌شود.' }
    ]
  },

  'breaking-limiting-beliefs-for-personal-growth': {
    categoryTitle: 'رشد فردی و خودشناسی',
    categorySlug: 'personal-growth',
    categoryColor: '#1f3d3a',
    aiQuickAnswer: 'باورهای محدودکننده افکار و پیش‌فرض‌های نادرست ریشه‌دار در ناخودآگاه هستند که مانع اقدام شجاعانه و تحقق پتانسیل واقعی فرد می‌شوند. کوچینگ با ایجاد آگاهی و بازنویسی ساختار فکری، باورهای توانمندساز را جایگزین دیوارهای نامرئی ذهن می‌کند.',
    focusEntity: 'باورهای محدودکننده ذهنی',
    semanticEntities: ['باورهای محدودکننده', 'رشد فردی', 'طرحواره‌های ذهنی', 'کوچینگ خودآگاهی', 'عزت نفس'],
    targetQuestions: [
      { question: 'رایج‌ترین باورهای محدودکننده کدامند؟', shortAnswer: 'من به اندازه کافی خوب نیستم، برای موفقیت باید بی‌نقص باشم، و اگر شکست بخورم همه چیز نابود می‌شود.' },
      { question: 'چگونه می‌توان باور قدیمی را جایگزین کرد؟', shortAnswer: 'با مشاهده بدون قضاوت باور، به چالش کشیدن شواهد آن، و تثبیت گزاره‌های واقع‌بینانه از طریق اقدامات کوچک مستمر.' }
    ],
    takeaways: [
      'باورها واقعیت مطلق نیستند؛ تنها فیلترهایی ذهنی هستند که با تصمیم آگاهانه قابل بازنویسی‌اند.',
      'کمال‌گرایی افراطی و ترس از اشتباه، اصلی‌ترین دشمنان شکوفایی فردی هستند.',
      'کوچ همچون آینه‌ای شفاف عمل می‌کند تا تله‌های نامرئی ذهن خود را بشناسید.'
    ],
    stat: { number: '۳ برابر', label: 'افزایش احتمال تحقق اهداف با اصلاح باورهای محدودکننده' },
    faqs: [
      { question: 'آیا باورهای کهنه دوران کودکی قابل تغییر هستند؟', answer: 'بله، با تمرین خودآگاهی و بازخورد مستمر از یک کوچ متخصص، مسیرهای عصبی جدیدی در ذهن شکل می‌گیرند.' }
    ]
  },

  'work_life_balance_coaching': {
    categoryTitle: 'تعادل کار و زندگی',
    categorySlug: 'work-life-balance',
    categoryColor: '#E65103',
    aiQuickAnswer: 'تعادل واقعی بین کار و زندگی تقسیم برابر ساعات نیست، بلکه حضور ذهنی کامل، توانایی جابجایی هوشمندانه بین نقش‌ها و مدیریت انرژی بدون احساس گناه و فرسودگی است. کمال‌گرایی پنهان مانع اصلی این تعادل است.',
    focusEntity: 'تعادل کار و زندگی و مدیریت انرژی',
    semanticEntities: ['تعادل کار و زندگی', 'مدیریت انرژی', 'کمال‌گرایی منفی', 'مرزبندی سالم', 'خودمراقبتی'],
    targetQuestions: [
      { question: 'چرا تقسیم مساوی زمان برای نقش‌ها اشتباه است؟', shortAnswer: 'زیرا شرایط زندگی پویاست و آنچه اهمیت دارد کیفیت حضور و تناسب انرژی با نیاز روز است، نه ساعت مساوی.' },
      { question: 'چگونه کمال‌گرایی تعادل را از بین می‌برد؟', shortAnswer: 'کمال‌گرایی استاندارد غیرواقعی «بی‌نقص بودن در همه چیز» را تحمیل می‌کند که لاجرم به احساس شکست مداوم و فرسودگی می‌انجامد.' }
    ],
    takeaways: [
      'تعادل یعنی وقتی با خانواده‌ای، واقعاً کناری‌شان باشی و وقتی کار می‌کنی، خودسرزنش‌گری را کنار بگذاری.',
      'خودمراقبتی ضرورت حیات و سلامت روانی است، نه یک هدیه لوکس یا تفریحی.',
      '«به اندازه کافی خوب بودن» بالاترین سطح کمال در زندگی روزمره است.'
    ],
    stat: { number: '۷۵٪', label: 'احساس آرامش بیشتر مراجعین با رهاسازی کمال‌گرایی' },
    faqs: [
      { question: 'آیا با شاغل بودن و داشتن دو فرزند هم می‌توان به تعادل رسید؟', answer: 'بله، با سبک‌سازی وظایف کم‌اثر، کمک گرفتن از خانواده و ایجاد بلاک‌های زمان متمرکز می‌توان به تعادلی واقعی رسید.' }
    ]
  },

  'mom-burnout-symptoms-causes-coaching': {
    categoryTitle: 'کوچینگ مادران',
    categorySlug: 'motherhood-coaching',
    categoryColor: '#BF4408',
    aiQuickAnswer: 'فرسودگی مادرانه (Mom Burnout) حالت خستگی مفرط جسمی، هیجانی و روانی ناشی از فشارهای مستمر مادری و نادیده گرفتن نیازهای خود است. کوچینگ با بازنگری نقش‌ها، تدوین استراتژی خودمراقبتی و آموزش تفویض اختیار، انرژی از دست رفته را احیا می‌کند.',
    focusEntity: 'فرسودگی مادرانه (Mom Burnout)',
    semanticEntities: ['فرسودگی مادرانه', 'سلامت روان بانوان', 'بازیابی انرژی', 'استرس والدین'],
    targetQuestions: [
      { question: 'علائم اصلی فرسودگی مادرانه چیست؟', shortAnswer: 'بی‌حوصلگی مزمن، خستگی با خواب جبران‌ناپذیر، تحریک‌پذیری زودهنگام و حس جداافتادگی از خود و خانواده.' },
      { question: 'کوچینگ چه کمکی به رفع فرسودگی می‌کند؟', shortAnswer: 'با ایجاد فضای امن برای مکث، شناسایی نشتی‌های انرژی و طراحی برنامه عملی بازیابی توان روحی.' }
    ],
    takeaways: [
      'مادری که مخزن انرژی‌اش خالی است، نمی‌تواند برای عزیزانش منبع محبت پایدار باشد.',
      'کمک خواستن و واگذاری کارها نشانه شجاعت و تدبیر مادری است.',
      'روزانه حتی ۱۵ دقیقه تنهایی آگاهانه می‌تواند چرخه فرسودگی را بشکند.'
    ],
    stat: { number: '۶۵٪', label: 'مادران در مراحلی از فرزندپروری دچار فرسودگی پنهان می‌شوند' },
    faqs: [
      { question: 'چطور بفهمم فرسوده شده‌ام یا فقط خسته‌ام؟', answer: 'اگر بعد از استراحت و خواب هم احساس تهی بودن و ناتوانی روحی دارید، با فرسودگی روبرو هستید.' }
    ]
  },

  'mom-guilt-and-how-to-overcome-it': {
    categoryTitle: 'کوچینگ مادران',
    categorySlug: 'motherhood-coaching',
    categoryColor: '#BF4408',
    aiQuickAnswer: 'عذاب وجدان مادری (Mom Guilt) بار روانی سرزنشگر درونی است که مادر را دائماً به «کافی نبودن» متهم می‌کند. کوچینگ تخصصی با ریشه‌یابی انتظارات غیرمنطقی جامعه و تفکیک عشق واقعی از سرزنش، به مادران آرامش اصیل می‌بخشد.',
    focusEntity: 'عذاب وجدان مادری (Mom Guilt)',
    semanticEntities: ['احساس گناه مادری', 'عزت نفس مادران', 'پرورش کودک', 'رهایی از سرزنش درون'],
    targetQuestions: [
      { question: 'چرا مادران همیشه احساس عذاب وجدان دارند؟', shortAnswer: 'به دلیل استانداردهای کمال‌گرایانه غیرواقعی ترویج‌شده در رسانه‌ها و ناتوانی در پذیرش محدودیت‌های انسانی.' },
      { question: 'چگونه از تله کافی نبودن رها شویم؟', shortAnswer: 'با تمرین شفقت به خود، گفتگو با کوچ حرفه‌ای و تمرکز بر ارتباط عاطفی گرم به جای کمال ظاهری.' }
    ],
    takeaways: [
      'کودکان به مادر کامل احتیاج ندارند؛ آن‌ها به مادری خوشحال و حاضر در لحظه نیاز دارند.',
      'سرزنش‌گر درونی را با صدای مهربان مادری جایگزین کنید.',
      'وقت گذراندن برای ارتقای شخصی خود، بهترین الگوسازی برای آینده فرزندانتان است.'
    ],
    stat: { number: '۸۸٪', label: 'مادران شاغل به طور منظم با عذاب وجدان مادری دست‌وپنجه نرم می‌کنند' },
    faqs: [
      { question: 'آیا کار کردن مادر به فرزند آسیب می‌زند؟', answer: 'تحقیقات متعدد نشان داده که مادری که از شغلش رضایت دارد و کیفیت زمان حضورش بالاست، فرزندانی مستقل‌تر و موفق‌تر پرورش می‌دهد.' }
    ]
  },

  'purposeful-time-management-coaching': {
    categoryTitle: 'مدیریت زمان و بهره‌وری',
    categorySlug: 'time-management',
    categoryColor: '#1f3d3a',
    aiQuickAnswer: 'مدیریت زمان هدفمند تمایز میان «پرمشغله بودن» و «موثر بودن» است. با تمرکز بر اولویت‌های استراتژیک، حذف اتلاف‌کننده‌های زمان و تسلط بر ساعات کاری، می‌توان ناخدای مقتدر زندگی خود شد و از دستاوردهای روزمره لذت برد.',
    focusEntity: 'مدیریت زمان هدفمند و بهره‌وری اصیل',
    semanticEntities: ['مدیریت زمان', 'بهره‌وری شخصی', 'اصل پارتو', 'تمرکز عمیق', 'کوچینگ فردی'],
    targetQuestions: [
      { question: 'تفاوت پرمشغله بودن با موثر بودن چیست؟', shortAnswer: 'پرمشغله بودن یعنی صرف انرژی زیاد برای کارهای بی‌ارزش، اما موثر بودن یعنی انجام ۲۰٪ کارهایی که ۸۰٪ نتایج را به بار می‌آورند.' },
      { question: 'چگونه از تله پرمشغلگی فرار کنیم؟', shortAnswer: 'با شناسایی دزدان زمان، ثبت روزانه ساعت‌های کاری و پایبندی به اهداف کلیدی هفتگی.' }
    ],
    takeaways: [
      'شلوغ بودن نشانه موفقیت نیست، بلکه اغلب نشانه فقدان اولویت‌بندی شفاف است.',
      'مدیریت انرژی اهمیت بیشتری از مدیریت ساعت‌ها دارد.',
      'بلاک‌های تمرکز عمیق (Deep Work) راندمان کاری شما را چند برابر می‌کنند.'
    ],
    stat: { number: '۴۰٪', label: 'افزایش زمان آزاد با تفکیک کارهای فوری از کارهای واقعاً مهم' },
    faqs: [
      { question: 'بهترین ابزار برای شروع مدیریت زمان چیست؟', answer: 'ساده‌ترین روش، ماتریس آیزنهاور (مهم و فوری) همراه با ارزیابی هفتگی با یک کوچ بهره‌وری است.' }
    ]
  },

  'parenting-in-crisis-managing-anxiety-mothers': {
    categoryTitle: 'کوچینگ مادران',
    categorySlug: 'motherhood-coaching',
    categoryColor: '#BF4408',
    aiQuickAnswer: 'مدیریت اضطراب مادران در شرایط بحرانی نیازمند خودتنظیمی هیجانی، حفظ روتین‌های آرامش‌بخش و ایجاد پناهگاه امن عاطفی برای فرزندان است. کوچینگ به مادران کمک می‌کند ابتدا ماسک اکسیژن روحی خود را بزنند تا تکیه‌گاهی استوار برای کودک باشند.',
    focusEntity: 'مدیریت اضطراب مادران در بحران‌ها',
    semanticEntities: ['مدیریت بحران خانوادگی', 'اضطراب والدین', 'حمایت عاطفی کودک', 'خودتنظیمی مادر'],
    targetQuestions: [
      { question: 'چگونه اضطراب خود را به کودکان منتقل نکنیم؟', shortAnswer: 'با تمرین تنفس آگاهانه، گفتگو درباره احساسات به زبان کودکانه و پرهیز از پیگیری وسواس‌گونه اخبار.' },
      { question: 'نقش کوچینگ در شرایط پرتنش چیست؟', shortAnswer: 'کوچینگ فضایی امن برای تخلیه هیجانی، تفکیک موارد تحت کنترل از خارج از کنترل و ساخت راهکارهای آرامش‌بخش فراهم می‌کند.' }
    ],
    takeaways: [
      'کودکان جهان را از درون چشم‌های مادرشان می‌بینند؛ آرامش شما آرامش آن‌هاست.',
      'ماسک اکسیژن خود را اول بزنید: مادر مضطرب نمی‌تواند پناهگاه امن فرزند باشد.',
      'تمرکز بر آنچه تحت کنترل ماست، اضطراب را تا حد زیادی خنثی می‌کند.'
    ],
    stat: { number: '۹۰٪', label: 'کودکان به طور مستقیم واکنش‌های هیجانی والدین را در بحران‌ها تقلید می‌کنند' },
    faqs: [
      { question: 'وقتی در اوج تنش هستیم چه کاری فوراً کمک می‌کند؟', answer: 'توقف چند لحظه‌ای، نوشیدن یک لیوان آب، و ۵ بار تنفس عمیق شکمی (دم ۴ ثانیه، بازدم ۶ ثانیه).' }
    ]
  }
};

async function migrateAllArticles() {
  const dumpPath = path.resolve('scripts/sanity/supabase-posts-dump.json');
  if (!fs.existsSync(dumpPath)) {
    console.error('❌ Error: supabase-posts-dump.json not found. Run fetch-supabase-posts.mjs first.');
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
  console.log(`🚀 Starting migration of ${posts.length} articles from Supabase into Sanity CMS...`);

  for (let idx = 0; idx < posts.length; idx++) {
    const post = posts[idx];
    const slug = post.post_slug;
    console.log(`\n======================================================`);
    console.log(`[${idx + 1}/${posts.length}] Migrating: "${post.title}" (${slug})`);

    const config = enhancements[slug] || {
      categoryTitle: 'کوچینگ و توسعه فردی',
      categorySlug: 'coaching-growth',
      categoryColor: '#1f3d3a',
      aiQuickAnswer: post.excerpt || post.title,
      focusEntity: post.title,
      semanticEntities: ['کوچینگ', 'رشد فردی'],
      targetQuestions: [],
      takeaways: ['رشد فردی با تعهد به عمل حاصل می‌شود.'],
      stat: { number: '۷۰٪', label: 'افزایش بهره‌وری مراجعین' },
      faqs: [],
    };

    // 1. Author (Coach)
    const authorRef = await syncCoachAsAuthor(post.coach);

    // 2. Category
    const categoryRef = await ensureCategory(config.categoryTitle, config.categorySlug, config.categoryColor);

    // 3. Cover Image
    let mainImage = null;
    if (post.image_url) {
      mainImage = await downloadAndUploadImage(post.image_url, `${slug}-cover.png`, post.title);
    }

    // 4. Build Rich PortableText
    console.log('🧱 Generating rich PortableText with Callouts, Stats, Key Takeaways & FAQs...');
    const bodyBlocks = parseRichContent(
      post.content || '',
      post.coach?.full_name,
      config.takeaways,
      config.stat,
      config.faqs
    );

    // 5. Document ID
    const docId = `post-${slug}`;

    const postDoc = {
      _id: docId,
      _type: 'post',
      title: post.title.trim(),
      slug: { _type: 'slug', current: slug },
      excerpt: post.excerpt || `${post.title} - راهنمای جامع بلومیا کلاب`,
      mainImage,
      author: authorRef,
      category: categoryRef,
      estimatedReadTime: Math.max(4, Math.round((post.content?.length || 1000) / 500)),
      body: bodyBlocks,

      // SEO Suite
      metaTitle: `${post.title.trim().slice(0, 50)} | بلومیا`,
      metaDescription: post.excerpt || config.aiQuickAnswer.slice(0, 150),
      canonicalUrl: `https://bloomiaclub.com/blog/${slug}`,
      searchIntent: 'informational',
      keywords: config.semanticEntities || ['کوچینگ', 'بلومیا'],

      // GEO AI Engine
      aiQuickAnswer: config.aiQuickAnswer,
      focusEntity: config.focusEntity,
      semanticEntities: config.semanticEntities,
      targetQuestions: config.targetQuestions,

      // Workflow
      status: 'published',
      publishedAt: post.created_at || new Date().toISOString(),
      isFeatured: idx === 0, // Feature the first mom coaching post
    };

    console.log(`🚀 Publishing to Sanity (ID: ${docId})...`);
    await client.createOrReplace(postDoc);
    console.log(`✅ Successfully published: ${slug}`);
  }

  console.log(`\n🎉 MIGRATION FINISHED! All ${posts.length} articles have been successfully migrated and published to Sanity CMS.`);
}

migrateAllArticles().catch(console.error);
