import { env } from './_env.mjs';
import { createClient as createSanity } from '@sanity/client';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { COACH_PROJECTION, syncAuthorDoc, upsertCoachBackup } from '../../src/lib/coach-sync.mjs';

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: env.sanityToken,
});

const keyed = (items) => items.map((item, i) => ({ _key: `fe_k${i + 1}`, ...item }));

const fatemehData = {
  _id: 'coach-profile-fatemeh_esmaeeli',
  _type: 'coach',
  name: 'فاطمه اسماعیلی',
  slug: { _type: 'slug', current: 'fatemeh_esmaeeli' },
  title: 'کوچ بین‌المللی مادران، بانوان و نوجوانان (Level 2 ICF)',
  description: 'همراهی تخصصی با مادران و بانوان برای رهایی از فرسودگی، شنیدن صدای درون، مدیریت تعارض با فرزندان و ساختن زندگی متعادل و اصیل.',
  longDescription: `باور دارم هر زنی در درون خود صدایی دارد که اگر شنیده شود، می‌تواند مسیر زندگی‌اش را با وضوح و آرامش بیشتری انتخاب کند. رسالت من همراهی با زنانی است که میان نقش‌های متعدد مادری، کار و خانواده، می‌خواهند به خودِ واقعی‌شان بازگردند و با اعتمادبه‌نفس تصمیم بگیرند.

مسیر حرفه‌ای من از تحصیل در رشته حسابداری و فعالیت در دنیای مالی آغاز شد. اما خیلی زود دریافتم که اشتیاق واقعی من جایی فراتر از اعداد است؛ جایی که بتوانم در کنار زنان و مادران بایستم تا قدرت درونی‌شان را بازیابند. برای ساخت این مسیر، آموزش حرفه‌ای‌ام را در آکادمی بین‌المللی فراکوچ آغاز کردم و سپس در آکادمی Impact Coaching آمریکا با موفقیت دوره بین‌المللی کوچینگ سطح ۲ (Level 2 ICF) را به پایان رساندم.

در جلسات کوچینگ، فضایی امن، کاملاً محرمانه و عاری از هرگونه قضاوت می‌سازیم؛ جایی برای مکث، عبور از احساس گناه مادری و کشف دوباره ارزش‌های فردی. در کنار جلسات فردی، افتخار همراهی داوطلبانه با مادران در یک سازمان مردم‌نهاد بین‌المللی را داشته‌ام؛ تجربه‌ای که ایمانم را به قدرت تحول‌آفرین و آرامش‌بخش گفتگوهای عمیق کوچینگ دوچندان کرد.`,
  
  specialties: [
    'کوچینگ مادران و والدگری آگاهانه',
    'رهایی از احساس گناه مادری و فرسودگی',
    'خودشناسی و اعتماد‌به‌نفس بانوان',
    'کوچینگ نوجوانان و مهارت‌های ارتباطی',
    'تعادل کار و زندگی و مدیریت اولویت‌ها',
  ],
  
  experienceYears: 4,
  languages: ['فارسی'],
  sessionMode: 'online',
  location: 'تهران',
  rating: 5.0,
  totalReviews: 28,
  totalSessions: 120,
  coachingHours: 120,
  satisfiedClients: 30,
  order: 1,
  isActive: true,

  // Images already hosted on Sanity
  avatar: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-27fd1b5e3721da11a6a011e1265772d8bf8b74e7-864x1184-jpg',
    },
  },
  coverImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-561e20adf7a6bbf9daaf9e4098f2e3bdb4746937-928x1152-png',
    },
  },
  aboutImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-561e20adf7a6bbf9daaf9e4098f2e3bdb4746937-928x1152-png',
    },
  },

  // Video
  videoUrl: 'https://qxacvupalbfcoqkuydba.supabase.co/storage/v1/object/public/coaches_video/fatemeh_esmaeeli_video.mp4',
  videoCover: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-5af5f5471aed0c484db43ec84d7a33e86c14cff4-1376x768-png',
    },
  },
  videoTitle: 'کوچینگ برای مادران؛ جایی برای شنیدنِ خود',
  videoDescription: 'کوچینگ به مادران کمک می‌کند در میان نقش‌ها و مسئولیت‌ها، ارتباط عمیق‌تری با خودشان برقرار کنند.',

  // Links
  instagramUrl: 'https://www.instagram.com/fatemeh.esmaeili.sohi',
  bookingUrl: 'https://calendly.com/fatemehesmaeeli7788/30min',

  // 1. Audience
  audience: keyed([
    { title: 'میان وظایف مادری، کار و انتظارات دیگران خودتان را گم کرده‌اید و به دنبال آرامش درونی هستید.' },
    { title: 'با احساس گناه مداوم («آیا مادر به اندازه کافی خوبی هستم؟») و فرسودگی دست‌وپنجه نرم می‌کنید.' },
    { title: 'در برقراری ارتباط موثر و بدون تنش با فرزند نوجوان‌تان با چالش روبه‌رو شده‌اید.' },
    { title: 'می‌خواهید مرزهای سالمی در روابط و کار بسازید و بدون ترس، برای خواسته‌های خودتان وقت بگذارید.' },
  ]),

  // 2. Method
  method: keyed([
    {
      title: 'شنیدن صدای درون و تخلیه بار ذهنی',
      description: 'ایجاد فضایی امن و کاملاً بدون قضاوت تا دغدغه‌ها، خستگی‌ها و بارهای ناگفته مادری و فردی را بی‌پرده روی میز بگذارید.',
    },
    {
      title: 'واکاوی باورها و ریشه‌یابی تعارضات',
      description: 'شناسایی تله‌های کمال‌گرایی، احساس گناه کاذب و انتظارات سنگینی که مانع دیدن ارزش‌ها و نیازهای واقعی شما می‌شوند.',
    },
    {
      title: 'بازطراحی مرزها و تدوین اولویت‌ها',
      description: 'تبدیل بینش‌ها به تصمیمات مشخص و قابل اجرا؛ ایجاد زمان اختصاصی برای خود و طراحی سبک والدگری مبتنی بر پذیرش.',
    },
    {
      title: 'همراهی در مسیر ثبات و تعادل پایدار',
      description: 'پایش مستمر در جریان چالش‌های روزمره زندگی، بازبینی موانع و استقرار عاداتی که آرامش و توانمندی را در شما ماندگار می‌کنند.',
    },
  ]),

  // 3. Services
  services: keyed([
    {
      title: 'جلسه معارفه (جلسه صفر)',
      duration: '۳۰ دقیقه',
      description: 'یک گفتگوی آنلاین رایگان برای آشنایی، شنیدن چالش‌های شما و بررسی اینکه آیا کوچینگ و سبک همراهی من برای شرایط فعلی شما مناسب است یا نه.',
      isFree: true,
    },
    {
      title: 'جلسه کوچینگ اختصاصی',
      duration: '۶۰ دقیقه',
      description: 'جلسه فردی عمیق و متمرکز برای واکاوی یک چالش مشخص در زمینه مادری، رابطه با نوجوان، یا خودآگاهی و تصمیم‌گیری‌های کلیدی.',
      isFree: false,
    },
  ]),

  // 4. Packages
  packages: keyed([
    {
      title: 'پکیج «شروع»',
      sessions: 4,
      duration: '۶۰ دقیقه',
      description: 'شروعی هدفمند برای شفاف‌سازی دغدغه اصلی، تعیین اولویت‌ها و برداشتن نخستین گام‌های عملی.',
      price: 5000000,
      isPopular: false,
      features: [
        '۴ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'شناسایی و تفکیک اولویت‌های فوری زندگی',
        'تمرین‌های اختصاصی خودآگاهی و مدیریت استرس',
        'پیگیری روند پیشرفت میان جلسات',
      ],
    },
    {
      title: 'پکیج «کشف»',
      sessions: 6,
      duration: '۶۰ دقیقه',
      description: 'کاوش عمیق‌تر در الگوهای ذهنی، غلبه بر احساس گناه مادری و بازتعریف ارتباط با خود و فرزندان.',
      price: 7000000,
      isPopular: true,
      features: [
        '۶ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'واکاوی ریشه‌های کمال‌گرایی و فرسودگی',
        'ابزارهای کاربردی ارتباط همدلانه با نوجوان',
        'پشتیبانی و همراهی پیامکی در طول دوره',
        'طراحی برنامه اختصاصی تعادل نقش‌ها',
      ],
    },
    {
      title: 'پکیج «تحول»',
      sessions: 8,
      duration: '۶۰ دقیقه',
      description: 'مسیر عمیق کوچینگ برای ایجاد دگرگونی پایدار در باورها، بازسازی مرزهای فردی و دستیابی به آرامش ماندگار.',
      price: 9000000,
      isPopular: false,
      features: [
        '۸ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'بازسازی بنیادین سبک زندگی و اولویت‌ها',
        'مهار تعارض‌های خانوادگی و تثبیت گفتگوی بدون قضاوت',
        'ارزیابی و بازبینی روند تغییرات در میانه مسیر',
        'پشتیبانی کامل پیامکی میان جلسات',
      ],
    },
    {
      title: 'پکیج «تعالی»',
      sessions: 12,
      duration: '۶۰ دقیقه',
      description: 'برنامه جامع خودآگاهی و توانمندسازی فردی برای مادرانی که خواهان تحولی بنیادین و استقرار نسخه‌ای مستقل و شاداب از خویش هستند.',
      price: 13000000,
      isPopular: false,
      features: [
        '۱۲ جلسه کوچینگ آنلاین ۶۰ دقیقه‌ای',
        'همراهی پیوسته در تمام فراز و فرودهای مسیر والدگری و کار',
        'دسترسی اختصاصی به کاربرگ‌ها و منابع توسعه فردی',
        'پشتیبانی نامحدود پیامکی در طول دوره',
      ],
    },
  ]),

  packagePrices: {
    start: 5000000,
    discovery: 7000000,
    transformation: 9000000,
    excellence: 13000000,
  },
  packageDiscounts: {
    discovery: 15,
    transformation: 20,
  },

  // 5. Credentials
  credentials: keyed([
    {
      title: 'مدرک بین‌المللی کوچینگ سطح ۲ (Level 2 ICF)',
      organization: 'آکادمی بین‌المللی Impact Coaching آمریکا',
      year: '۱۴۰۲',
    },
    {
      title: 'دوره جامع تربیت کوچ حرفه‌ای',
      organization: 'آکادمی بین‌المللی فراکوچ',
      year: '۱۴۰۱',
    },
    {
      title: 'تسهیل‌گر و کوچ داوطلب مادران',
      organization: 'سازمان مردم‌نهاد بین‌المللی (NGO)',
      year: '۱۴۰۱ تا کنون',
    },
    {
      title: 'کارشناسی حسابداری و مدیریت مالی',
      organization: 'دانشگاه آزاد اسلامی',
      year: '۱۳۹۶',
    },
  ]),

  // 6. Testimonials
  testimonials: keyed([
    {
      quote: 'وقتی کسی را کوچ می‌کنی، در واقع یک گوشه امن برای آرام شدن به او می‌دهی. در جلسات با شما به این گوشه امن رسیدم؛ گویا با چراغی پرنور مرا به عمق درونم بردید تا با مهارت و صبوری‌تان به آرامش و شفافیت برسم.',
      author: 'نسترن م.',
      context: 'مراجع دوره خودشناسی و وضوح ذهنی',
    },
    {
      quote: 'شما با صبوری و مهارت بالا خیلی خوب به حرف‌هایم گوش دادید و مسائلی که برایم غیرقابل‌حل و مبهم بودند، کاملاً روشن و شفاف شدند. نوع حضورتان در جلسات حس امنیت فوق‌العاده‌ای می‌دهد تا به‌راحتی به آگاهی برسم.',
      author: 'مهسا ر.',
      context: 'مراجع جلسات کوچینگ فردی',
    },
    {
      quote: 'در تمام طول جلسه حس امنیت و آرامش داشتم. آرامش شما کمک کرد خیلی راحت‌تر و عمیق‌تر فکر کنم؛ مسائلی که تا دیروز برایم سخت و ترسناک بودند آسان شدند و توانستم از زوایای تازه‌ای به آن‌ها نگاه کنم.',
      author: 'سارا ک.',
      context: 'مراجع دوره عبور از تعارض و ترس‌ها',
    },
    {
      quote: 'از همدلی و درکتان در جلسات کوچینگ خیلی لذت بردم. آن‌قدر قشنگ ارتباط مؤثر را زندگی می‌کنید که از همان لحظه اول احساس کردم می‌توانم کاملاً راحت باشم و یک فرد امن برای شنیدنم حضور دارد.',
      author: 'الهام ش.',
      context: 'مراجع جلسات کوچینگ فردی',
    },
    {
      quote: 'در تمام این مدت واقعاً درکم کردید و با من همدل بودید. از صمیم قلب ممنونم که روی جرأت و جسارتم کار کردید و این باور ارزشمند را در من زنده کردید که توانایی رسیدن به اهدافم را دارم.',
      author: 'پریسا ع.',
      context: 'مراجع دوره تقویت اعتمادبه‌نفس و اهداف',
    },
    {
      quote: 'یک دوره ۶ جلسه‌ای عالی را با شما تجربه کردم که تک‌تک لحظاتش برایم پربار بود. ممنونم که این‌قدر عمیق می‌شنوید و با پرسش‌های به‌جا کمک می‌کنید از زاویه‌ای جدید به ابعاد مختلف دغدغه‌هایم نگاه کنم.',
      author: 'زهرا ت.',
      context: 'مراجع پکیج ۶ جلسه‌ای کشف',
    },
  ]),

  // 7. FAQs
  faqs: keyed([
    {
      question: 'آیا جلسات فقط برای مادران است یا سایر بانوان و نوجوانان هم می‌توانند شرکت کنند؟',
      answer: 'تمرکز اصلی من بر کوچینگ مادران و مسائل والدگری است، اما جلسات توانمندسازی، خودشناسی و مهارت‌های ارتباطی برای تمامی بانوان و همچنین جلسات اختصاصی برای نوجوانان نیز به صورت فردی برگزار می‌شود.',
    },
    {
      question: 'در جلسه صفر رایگان دقیقاً چه اتفاقی می‌افتد؟',
      answer: 'جلسه صفر یک گفتگوی آنلاین ۳۰ دقیقه‌ای بدون هیچ‌گونه هزینه یا تعهد مالی است. در این جلسه، چالش‌های اصلی شما شنیده می‌شود، متدولوژی کاری من توضیح داده می‌شود و با هم بررسی می‌کنیم که آیا این مسیر در این مقطع برای شما مناسب و کارآمد است یا خیر.',
    },
    {
      question: 'تفاوت کوچینگ مادران با مشاوره فرزندپروری چیست؟',
      answer: 'در مشاوره معمولاً راه‌حل‌های تجویزی و رفتاری برای اصلاح رفتار کودک داده می‌شود. اما در کوچینگ، تمرکز بر خودِ مادر، احساسات، باورها، سطح انرژی و کیفیت ارتباط اوست تا با بازیابی آرامش درون، بتواند بهترین تصمیمات را متناسب با خانواده خود بگیرد.',
    },
    {
      question: 'جلسات آنلاین چگونه برگزار می‌شوند و آیا محرمانه هستند؟',
      answer: 'جلسات از طریق بستر گوگل‌میت یا زوم در زمان هماهنگ‌شده برگزار می‌شوند. رازداری و حفظ محرمانگی ۱۰۰٪ کدهای اخلاقی فدراسیون بین‌المللی کوچینگ (ICF) اساس جلسات است و تمام صحبت‌های شما کاملاً امن باقی می‌ماند.',
    },
    {
      question: 'فاصله میان جلسات معمولاً چقدر است؟',
      answer: 'استانداردترین فاصله، هر ۷ تا ۱۰ روز یک جلسه است تا زمان کافی برای تجربه، انجام اقدامات در بطن زندگی روزمره و مشاهده تغییرات عملی میان جلسات فراهم باشد.',
    },
  ]),

  // 8. Events
  events: keyed([
    {
      title: 'کارگاه آنلاین: هنر گفتگوی موثر و مهار تعارض با فرزند نوجوان',
      date: '۲۸ آبان ۱۴۰۵',
      type: 'کارگاه آنلاین',
      location: 'آنلاین (گوگل‌میت)',
      href: '#booking',
    },
    {
      title: 'وبینار تخصصی: رهایی از احساس گناه مادری و بازیابی انرژی درونی',
      date: '۱۲ آذر ۱۴۰۵',
      type: 'وبینار رایگان',
      location: 'آنلاین (اسکای‌روم)',
      href: '#booking',
    },
  ]),
};

async function updateFatemeh() {
  console.log('🚀 Updating Fatemeh Esmaeeli in Sanity...');
  const res = await sanity.createOrReplace(fatemehData);
  console.log(`✅ Sanity coach document updated successfully: ${res._id}`);

  console.log('🔗 Synchronizing author document for blog integration...');
  await syncAuthorDoc(sanity, {
    slug: fatemehData.slug.current,
    name: fatemehData.name,
    title: fatemehData.title,
    description: fatemehData.description,
    avatarRef: fatemehData.avatar.asset._ref,
  });
  console.log('✅ Author document synced!');

  if (env.supabaseServiceKey) {
    try {
      console.log('💾 Syncing backup row to Supabase v2_coaches...');
      const supabase = createSupabase(env.supabaseUrl, env.supabaseServiceKey, {
        auth: { persistSession: false },
      });
      const fullDoc = await sanity.fetch(`*[_id == $id][0] ${COACH_PROJECTION}`, { id: fatemehData._id });
      if (fullDoc) {
        const updateRes = await upsertCoachBackup(supabase, fullDoc);
        console.log(`✅ Supabase backup row: ${updateRes}!`);
      }
    } catch (err) {
      console.warn('⚠️ Supabase sync warning:', err.message);
    }
  }

  // Update catalog
  try {
    const { execSync } = await import('child_process');
    execSync('node scripts/sanity/dump-coaches-catalog.mjs', { stdio: 'inherit' });
  } catch (err) {
    console.warn('⚠️ Catalog update warning:', err.message);
  }

  console.log('\n🎉 Fatemeh Esmaeeli V3 profile is now 100% complete and live!');
  console.log('🔗 Public URL: https://bloomiaclub.com/coaches/fatemeh_esmaeeli');
  console.log('🔗 V3 URL: https://bloomiaclub.com/coaches/fatemeh_esmaeeli/v3');
}

updateFatemeh().catch((err) => {
  console.error('❌ Update failed:', err);
  process.exit(1);
});
