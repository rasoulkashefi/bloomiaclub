import { createClient as createSanity } from '@sanity/client';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { env } from './_env.mjs';
import {
  coachDocId,
  syncAuthorDoc,
  upsertCoachBackup,
  COACH_PROJECTION,
} from '../../src/lib/coach-sync.mjs';

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: env.sanityToken,
});

async function main() {
  console.log('🚀 Starting publication for Dr. Fatemeh Darkhosh (fatemeh-derakhsh)...');

  const slug = 'fatemeh-derakhsh';
  const docId = coachDocId(slug);

  const existing = await sanity.fetch(`*[_id == $id][0]`, { id: docId });
  console.log('Found existing Sanity document:', existing ? existing._id : 'None');

  const avatarRef = existing?.avatar?.asset?._ref || 'image-41f62ec8f93c6d2603daa60dbfb483937df3af6e-1024x1024-png';

  const doc = {
    _id: docId,
    _type: 'coach',
    name: 'دکتر فاطمه درخوش',
    slug: { _type: 'slug', current: slug },
    title: 'کوچ رشد فردی و مسیر شغلی | دکترای داروسازی',
    description: 'دکترای داروسازی، کوچ تایید شده ICF؛ همراهی با مراجعان در عبور از سردرگمی یا مکث در کار و زندگی برای کشف و بازطراحی مسیر اصیل.',
    longDescription: `من دکتر فاطمه درخوش هستم؛ با بیش از ۱۰ سال سابقه فعالیت حرفه‌ای در صنعت دارو، تجربه چندین ساله در دانشگاه و آموزش تخصصی، و کوچ حرفه‌ای مورد تأیید فدراسیون بین‌المللی کوچینگ آمریکا (ICF).\n\nدر مسیر کاری‌ام، بارها با متخصصان و افرادی مواجه شدم که از نگاه بیرونی کاملاً «موفق» به نظر می‌رسیدند، اما در درون، دچار سردرگمی، فرسودگی یا نارضایتی شغلی بودند؛ و خودم نیز این تجربه‌ها را در مقاطع مختلف زندگی زیسته‌ام. همین تجربیات ارزشمند باعث شد تا عمیقاً به موضوع خودشناسی فردی و شغلی، تصمیم‌گیری آگاهانه و بازتعریف نسبت انسان با کار و زندگی بپردازم.\n\nدر جلسات کوچینگ، با ترکیب نگاه تحلیلی، تجربه زیسته و چارچوب‌های حرفه‌ای ICF، همراه مراجعان می‌شوم تا به جای دریافت نسخه‌های آماده، به بینش، شفافیت و انتخاب‌های اصیل خودشان برسند. باور من این است که تغییر پایدار از درک عمیق خود و پذیرش مسئولیت انتخاب‌ها آغاز می‌شود؛ و کوچینگ فضایی امن و بدون قضاوت است برای مکث، دیدن و دوباره انتخاب‌کردن.`,
    avatar: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: avatarRef,
      },
    },
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: avatarRef,
      },
    },
    aboutImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: avatarRef,
      },
    },
    specialties: [
      'خودشناسی فردی و شغلی و شفاف‌سازی مسیر حرفه‌ای',
      'تصمیم‌گیری‌های مهم و استراتژیک زندگی و کار',
      'عبور از سردرگمی، فرسودگی و بن‌بست‌های ذهنی',
      'بازتعریف ارزش‌ها، اولویت‌ها و معنا',
      'ایجاد تعادل میان زندگی شخصی و حرفه‌ای',
      'کوچینگ حرفه‌ای بین‌المللی (ICF)',
    ],
    experienceYears: 10,
    rating: 5,
    totalReviews: 38,
    totalSessions: 160,
    coachingHours: 160,
    satisfiedClients: 40,
    sessionMode: 'online',
    languages: ['فارسی', 'انگلیسی'],
    location: 'تهران',
    order: 7,
    isActive: true,
    instagramUrl: 'https://www.instagram.com/fatemedarkhosh',
    linkedinUrl: 'https://www.linkedin.com/in/fatemedarkhosh',
    packagePrices: {
      start: 850000,
      discovery: 4800000,
      transformation: 4800000,
      excellence: 9500000,
    },
    packageDiscounts: {
      discovery: 6,
      excellence: 7,
    },
    welcomePacket: {
      title: 'بسته راهنمای خدمات کوچینگ با دکتر فاطمه درخوش',
      subtitle: 'راهنمای جامع ورود به فرآیند کوچینگ رشد فردی و مسیر شغلی؛ تبیین نقش کوچ و مراجع، منشور محرمانگی، ساختار جلسات و آمادگی کامل برای جلسه معارفه رایگان با دکتر فاطمه درخوش.',
      fileUrl: '/documents/welcome-packets/fatemeh_darkhosh_welcome_packet.pdf',
      coverImageUrl: '/images/solea/fatemeh_darkhosh_welcome_packet_cover.png',
      buttonText: 'دریافت بسته راهنما (PDF)',
      features: [
        'آشنایی با اصول، فلسفه و مرزهای کوچینگ رشد فردی و مسیر شغلی',
        'شفافیت در شرایط، نحوه برگزاری، هزینه‌ها و ضمانت بازگشت وجه',
        'معرفی پکیج‌های خودشناسی، شفاف‌سازی و طراحی زندگی و اقدام',
        'راهنمای گام‌به‌گام آمادگی برای جلسه اکتشافی معارفه رایگان',
      ],
    },
    services: [
      {
        _key: 'srv-zero',
        title: 'جلسه اکتشافی معارفه (رایگان ۳۰ دقیقه‌ای)',
        duration: '۳۰ دقیقه',
        description: 'یک گفتگوی آنلاین ۳۰ دقیقه‌ای در بستر Google Meet برای آشنایی با سبک کار کوچ، بررسی نیازها و انتظارات شما و تصمیم‌گیری درباره مناسب‌بودن مسیر همکاری.',
        price: 0,
        isFree: true,
      },
      {
        _key: 'srv-coaching',
        title: 'تک‌جلسه کوچینگ رشد فردی و مسیر شغلی',
        duration: '۶۰ دقیقه',
        description: 'یک جلسه آنلاین عمیق، محرمانه و ۶۰ دقیقه‌ای در Google Meet برای واکاوی یک تصمیم حساس کاری، خروج از مکث مقطعی یا بررسی موانع ذهنی.',
        price: 850000,
        isFree: false,
      },
    ],
    packages: [
      {
        _key: 'pkg-self-discovery',
        title: 'پکیج ۶ جلسه‌ای «خودشناسی و شفاف‌سازی»',
        sessions: 6,
        duration: '۶۰ دقیقه',
        description: 'مناسب برای افرادی که دچار سردرگمی یا مکث شده‌اند، بین چند انتخاب مرددند و نیاز به شفاف‌سازی ارزش‌ها دارند.',
        price: 4800000,
        discountPercent: 6,
        validityDays: 90,
        isPopular: true,
        features: [
          '۶ جلسه کوچینگ ساختارمند ۶۰ دقیقه‌ای آنلاین در Google Meet',
          'استفاده از ابزارهای تخصصی خودشناسی فردی و شغلی',
          'شفاف‌سازی ارزش‌ها و اولویت‌های بنیادین زندگی و کار',
          'تحلیل و واکاوی الگوهای تصمیم‌گیری و رفتاری',
          'ارائه تمرین‌های اختصاصی بین جلسات و جمع‌بندی مسیر',
          'ضمانت بازگشت ۱۰۰٪ وجه تا پایان جلسه دوم در صورت عدم رضایت',
        ],
      },
      {
        _key: 'pkg-life-design',
        title: 'پکیج ۱۲ جلسه‌ای «طراحی زندگی و اقدام»',
        sessions: 12,
        duration: '۶۰ دقیقه',
        description: 'مناسب افرادی که قصد تغییر مسیر جدی دارند یا می‌خواهند مسیر حرفه‌ای و فردی خود را آگاهانه بازطراحی کنند.',
        price: 9500000,
        discountPercent: 7,
        validityDays: 90,
        isPopular: false,
        features: [
          '۱۲ جلسه عمیق و اختصاصی کوچینگ ۶۰ دقیقه‌ای در Google Meet',
          'ابزارهای جامع خودشناسی و بازتعریف هویت فردی و شغلی',
          'کار ریشه‌ای روی موانع درونی و باورهای محدودکننده',
          'تصمیم‌سازی استراتژیک، برنامه اقدام و پیگیری مستمر پیشرفت',
          'تمرین‌ها و تکالیف کاربردی متناسب با متن زندگی واقعی',
          'ضمانت بازگشت ۱۰۰٪ وجه تا پایان جلسه دوم در صورت عدم رضایت',
        ],
      },
    ],
    audience: [
      { _key: 'aud-1', title: 'در زندگی فردی یا مسیر شغلی خود دچار سردرگمی، فرسودگی یا مکث شده‌اید.' },
      { _key: 'aud-2', title: 'بین چند انتخاب مهم مردد هستید و نیازمند تصمیم‌گیری آگاهانه و استراتژیک می‌باشید.' },
      { _key: 'aud-3', title: 'از نگاه بیرونی موفقید اما در درون با فرسودگی، یکنواختی یا نارضایتی شغلی مواجهید.' },
      { _key: 'aud-4', title: 'قصد تغییر مسیر جدی دارید یا می‌خواهید هویت شغلی‌تان را آگاهانه بازطراحی کنید.' },
    ],
    method: [
      { _key: 'm-1', title: 'خودشناسی و دیدن شفاف موانع', description: 'شناخت عمیق‌تر خود، ریشه‌یابی موانع درونی و بیرونی و ایجاد فضایی امن و بدون قضاوت برای شنیدن دغدغه‌ها.' },
      { _key: 'm-2', title: 'بازتعریف ارزش‌ها و اولویت‌ها', description: 'واکاوی الگوهای فکری و رفتاری، بازیابی معنا و اهداف اصیل و خروج از سردرگمی و بن‌بست‌های ذهنی.' },
      { _key: 'm-3', title: 'تصمیم‌گیری آگاهانه و طراحی مسیر', description: 'تبدیل بینش‌ها به انتخاب‌های اصیل و همسو با زندگی واقعی و طراحی نقشه اقدام گام‌به‌گام.' },
      { _key: 'm-4', title: 'اقدام متعهدانه و تغییر پایدار', description: 'به‌کارگیری آموخته‌ها و تمرین‌ها در زندگی واقعی، پایش پیشرفت و تثبیت دستاوردها با مسئولیت‌پذیری.' },
    ],
    credentials: [
      { _key: 'cred-1', title: 'دکترای داروسازی (Pharm.D) و سابقه ۱۰ ساله در صنعت دارو', organization: 'دانشگاه علوم پزشکی', year: '۲۰۱۵' },
      { _key: 'cred-2', title: 'کوچ حرفه‌ای بین‌المللی مورد تایید ICF', organization: 'فدراسیون بین‌المللی کوچینگ (ICF)', year: '۱۴۰۲' },
      { _key: 'cred-3', title: 'مدرس و محقق دانشگاهی در حوزه آموزش تخصصی', organization: 'دانشگاه', year: '۱۴۰۰' },
      { _key: 'cred-4', title: 'متخصص خودشناسی فردی و شغلی و تصمیم‌گیری آگاهانه', organization: 'بلومیا کلاب', year: '۱۴۰۳' },
    ],
    faqs: [
      {
        _key: 'faq-1',
        question: 'کوچینگ چیست و چه تفاوتی با درمان یا مشاوره دارد؟',
        answer: 'کوچینگ یک همکاری آگاهانه و هدفمند میان کوچ و مراجع است. هدف آن کمک به شماست تا خودتان را عمیق‌تر بشناسید، موانع را شفاف ببینید و تصمیم‌هایی هم‌راستا با ارزش‌های واقعی‌تان بگیرید. کوچینگ درمان یا مشاوره نیست؛ تمرکز آن بر حال، آینده و حرکت آگاهانه به‌سوی تغییر است.',
      },
      {
        _key: 'faq-2',
        question: 'نقش کوچ و نقش مراجع در جلسات چیست؟',
        answer: 'به عنوان کوچ فضایی امن، محرمانه و بدون قضاوت فراهم می‌کنم تا با گوش‌دادن فعال و پرسش‌های عمیق، مسیر شما شفاف شود؛ راه‌حل آماده ارائه نمی‌دهم بلکه شما را در کشف پاسخ‌های اصیل همراهی می‌کنم. موفقیت فرآیند وابسته به مشارکت متعهدانه، صداقت و اجرای تمرین‌ها توسط مراجع است.',
      },
      {
        _key: 'faq-3',
        question: 'جلسات چگونه و در چه بستری برگزار می‌شوند؟',
        answer: 'روش برگزاری جلسات به صورت آنلاین از طریق بستر Google Meet است. مدت هر جلسه ۶۰ دقیقه است و زمان برگزاری با توافق دوجانبه تعیین می‌شود.',
      },
      {
        _key: 'faq-4',
        question: 'آیا امکان رزرو جلسه معارفه رایگان پیش از شروع وجود دارد؟',
        answer: 'بله، پیش از شروع همکاری امکان رزرو جلسه اکتشافی ۳۰ دقیقه‌ای رایگان وجود دارد تا با هم آشنا شویم، نیازها و انتظارات شما بررسی شود و درباره مناسب‌بودن مسیر همکاری تصمیم بگیریم.',
      },
      {
        _key: 'faq-5',
        question: 'ضمانت کارآمدی و بازگشت وجه جلسات چگونه است؟',
        answer: 'در پایان جلسه دوم، اگر مراجع به هر دلیلی احساس کند که جلسات برای او مفید نبوده است، با توافق طرفین می‌توانیم به همکاری خاتمه دهیم و هزینه هر دو جلسه به طور کامل عودت داده خواهد شد.',
      },
      {
        _key: 'faq-6',
        question: 'شرایط و نحوه پرداخت مبالغ جلسات چگونه است؟',
        answer: 'بعد از انتخاب نوع جلسات (پکیج ۶ یا ۱۲ جلسه یا تک‌جلسه)، مبلغ به صورت یکجا پیش از برگزاری اولین جلسه پرداخت می‌شود. هزینه جلسات نباید مانعی برای دریافت کوچینگ باشد و در صورت نیاز، امکان استفاده از نرخ انعطاف‌پذیر وجود دارد.',
      },
    ],
    testimonials: [
      {
        _key: 'test-1',
        quote: 'دیدگاه تحلیلی خانم دکتر درخوش در کنار مهارت کوچینگ ایشان، کمکم کرد در پیچیده‌ترین دوراهی شغلی زندگی‌ام بهترین تصمیم را با خیال راحت بگیرم.',
        author: 'سامان ع.',
        context: 'مدیر توسعه کسب‌وکار',
      },
      {
        _key: 'test-2',
        quote: 'بعد از سال‌ها کار در صنعت احساس بی‌انگیزگی می‌کردم. این دوره به من کمک کرد انگیزه واقعی‌ام را دوباره پیدا کنم و جایگاهم را ارتقا دهم.',
        author: 'فرشته ر.',
        context: 'متخصص صنایع دارویی',
      },
    ],
  };

  console.log(`📤 Publishing updated coach document to Sanity (${doc._id})...`);
  const published = await sanity.createOrReplace(doc);
  console.log(`✅ Sanity document published successfully! Rev: ${published._rev}`);

  // Sync author doc for blog
  try {
    console.log(`🔗 Syncing blog author document (coach-${slug})...`);
    await syncAuthorDoc(sanity, {
      slug,
      name: doc.name,
      title: doc.title,
      description: doc.description,
      avatarRef,
    });
    console.log(`✅ Blog author doc synced!`);
  } catch (authorErr) {
    console.warn(`⚠️ Warning syncing author doc: ${authorErr.message}`);
  }

  // Backup to Supabase
  if (env.supabaseServiceKey) {
    try {
      console.log(`💾 Syncing backup row to Supabase v2_coaches...`);
      const supabase = createSupabase(env.supabaseUrl, env.supabaseServiceKey, {
        auth: { persistSession: false },
      });
      const fullDoc = await sanity.fetch(`*[_id == $id][0] ${COACH_PROJECTION}`, { id: doc._id });
      if (fullDoc) {
        const res = await upsertCoachBackup(supabase, fullDoc);
        console.log(`✅ Supabase backup row ${res} for ${slug}!`);
      }
    } catch (sbErr) {
      console.warn(`⚠️ Supabase backup note: ${sbErr.message}`);
    }
  }

  console.log(`\n🎉 Publication completely finished!`);
  console.log(`🌐 Live URL: https://bloomiaclub.com/coaches/${slug}`);
}

main().catch((err) => {
  console.error('❌ Error publishing to Sanity:', err);
  process.exit(1);
});
