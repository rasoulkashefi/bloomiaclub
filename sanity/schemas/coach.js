/**
 * Coach profile (the single source of truth for /coaches and /coaches/[slug]).
 *
 * Document ID convention: `coach-profile-<slug>`.
 * (The blog author document keeps the ID `coach-<slug>`; it is created/updated
 * automatically from this document by the sync webhook, so articles keep working.)
 *
 * Every optional section is hidden on the public page when it is left empty.
 */
export default {
  name: 'coach',
  title: 'کوچ (Coach)',
  type: 'document',
  groups: [
    { name: 'basic', title: '۱. مشخصات اصلی', default: true },
    { name: 'about', title: '۲. درباره و مخاطب' },
    { name: 'method', title: '۳. روش و خدمات' },
    { name: 'packages', title: '۴. پکیج‌ها و رزرو' },
    { name: 'proof', title: '۵. اعتبار و نظرات' },
    { name: 'faq', title: '۶. سوالات متداول' },
    { name: 'media', title: '۷. تصاویر و لینک‌ها' },
    { name: 'publish', title: '۸. انتشار' },
  ],
  fields: [
    // ------------------------------------------------------------ 1. BASIC
    {
      name: 'name',
      title: 'نام و نام خانوادگی',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'اسلاگ (آدرس صفحه)',
      type: 'slug',
      group: 'basic',
      description: 'آدرس صفحه: bloomiaclub.com/coaches/اسلاگ. فقط حروف انگلیسی کوچک، عدد و خط تیره یا آندرلاین. بعد از انتشار تغییر ندهید.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'عنوان حرفه‌ای',
      type: 'string',
      group: 'basic',
      description: 'مثال: کوچ مادران، بانوان و نوجوانان',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'معرفی کوتاه (۱ تا ۲ جمله)',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'در هیرو صفحه و کارت‌ها نمایش داده می‌شود. بدون ایموجی.',
      validation: (Rule) => Rule.required().max(280),
    },
    {
      name: 'specialties',
      title: 'تخصص‌ها',
      type: 'array',
      group: 'basic',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'بین ۳ تا ۶ مورد.',
    },
    {
      name: 'experienceYears',
      title: 'سال‌های تجربه',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.min(0).max(60).integer(),
    },
    {
      name: 'languages',
      title: 'زبان جلسات',
      type: 'array',
      group: 'basic',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      initialValue: ['فارسی'],
    },
    {
      name: 'sessionMode',
      title: 'شیوه برگزاری جلسات',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'آنلاین', value: 'online' },
          { title: 'حضوری', value: 'in-person' },
          { title: 'آنلاین و حضوری', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'online',
    },
    {
      name: 'location',
      title: 'شهر (برای جلسات حضوری)',
      type: 'string',
      group: 'basic',
    },
    {
      name: 'rating',
      title: 'امتیاز (از ۵)',
      type: 'number',
      group: 'basic',
      description: 'خالی بگذارید تا امتیاز نمایش داده نشود.',
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: 'totalReviews',
      title: 'تعداد نظرات',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.min(0).integer(),
    },
    {
      name: 'totalSessions',
      title: 'تعداد جلسات کوچینگ برگزارشده',
      type: 'number',
      group: 'basic',
      description: 'در نوار آمار صفحه نمایش داده می‌شود. خالی یا صفر = نمایش داده نمی‌شود.',
      validation: (Rule) => Rule.min(0).integer(),
    },
    {
      name: 'coachingHours',
      title: 'ساعات کوچینگ',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'satisfiedClients',
      title: 'تعداد مراجعان همراهی‌شده',
      type: 'number',
      group: 'basic',
      validation: (Rule) => Rule.min(0).integer(),
    },

    // ------------------------------------------------------------ 2. ABOUT
    {
      name: 'longDescription',
      title: 'درباره من (معرفی کامل)',
      type: 'text',
      rows: 10,
      group: 'about',
      description: 'چند پاراگراف. بین پاراگراف‌ها یک خط خالی بگذارید.',
    },
    {
      name: 'audience',
      title: 'این صفحه برای چه کسانی است؟',
      type: 'array',
      group: 'about',
      description: 'هر مورد یک جمله کوتاه از زبان مراجع، مثل «می‌خواهید مسیر شغلی‌تان را روشن‌تر کنید».',
      of: [
        {
          type: 'object',
          name: 'audienceItem',
          fields: [{ name: 'title', title: 'جمله', type: 'string', validation: (Rule) => Rule.required() }],
          preview: { select: { title: 'title' } },
        },
      ],
    },

    // ------------------------------------------------------------ 3. METHOD
    {
      name: 'method',
      title: 'روش کار (مراحل)',
      type: 'array',
      group: 'method',
      description: 'بین ۳ تا ۵ مرحله. ترتیب با کشیدن و رها کردن تغییر می‌کند.',
      of: [
        {
          type: 'object',
          name: 'methodStep',
          fields: [
            { name: 'title', title: 'عنوان مرحله', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'توضیح', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    },
    {
      name: 'services',
      title: 'خدمات',
      type: 'array',
      group: 'method',
      description: 'نوع جلسه‌ها (مثل جلسه صفر، جلسه کوچینگ). قیمت‌ها در بخش پکیج‌ها آمده است.',
      of: [
        {
          type: 'object',
          name: 'service',
          fields: [
            { name: 'title', title: 'عنوان', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'duration', title: 'مدت (مثلا ۶۰ دقیقه)', type: 'string' },
            { name: 'description', title: 'توضیح', type: 'text', rows: 3 },
            { name: 'isFree', title: 'رایگان است', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: { title: 'title', subtitle: 'duration', isFree: 'isFree' },
            prepare: ({ title, subtitle, isFree }) => ({ title, subtitle: [subtitle, isFree ? 'رایگان' : null].filter(Boolean).join(' · ') }),
          },
        },
      ],
    },

    // ------------------------------------------------------------ 4. PACKAGES
    {
      name: 'packages',
      title: 'پکیج‌ها',
      type: 'array',
      group: 'packages',
      description: 'قیمت به تومان. اگر فقط یک پکیج دارید، به‌صورت پیشنهاد ویژه نمایش داده می‌شود.',
      of: [
        {
          type: 'object',
          name: 'package',
          fields: [
            { name: 'title', title: 'نام پکیج', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'sessions', title: 'تعداد جلسات', type: 'number', validation: (Rule) => Rule.required().min(1).integer() },
            { name: 'duration', title: 'مدت هر جلسه (مثلا ۶۰ دقیقه)', type: 'string' },
            { name: 'description', title: 'توضیح', type: 'text', rows: 3 },
            { name: 'price', title: 'قیمت (تومان)', type: 'number', validation: (Rule) => Rule.required().min(0).integer() },
            { name: 'isPopular', title: 'پیشنهاد ویژه (برجسته شود)', type: 'boolean', initialValue: false },
            { name: 'features', title: 'شامل چه چیزهایی است؟', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'title', sessions: 'sessions', price: 'price' },
            prepare: ({ title, sessions, price }) => ({
              title,
              subtitle: `${sessions ?? '?'} جلسه · ${price != null ? Number(price).toLocaleString('fa-IR') : '?'} تومان`,
            }),
          },
        },
      ],
    },
    {
      name: 'bookingUrl',
      title: 'لینک رزرو خارجی (اختیاری)',
      type: 'url',
      group: 'packages',
      description: 'اگر پر شود دکمه‌ی رزرو به جای فرم داخلی بلومیا به این لینک می‌رود.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    },

    // ------------------------------------------------------------ 5. PROOF
    {
      name: 'credentials',
      title: 'مدارک و تحصیلات',
      type: 'array',
      group: 'proof',
      description: 'فقط مدارک واقعی و قابل استعلام (مثلا مدرک ICF).',
      of: [
        {
          type: 'object',
          name: 'credential',
          fields: [
            { name: 'title', title: 'عنوان مدرک', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'organization', title: 'سازمان / دانشگاه', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'year', title: 'سال', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'organization' } },
        },
      ],
    },
    {
      name: 'testimonials',
      title: 'نظرات مراجعان',
      type: 'array',
      group: 'proof',
      description: 'فقط نظرهای واقعی و با رضایت مراجع.',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          fields: [
            { name: 'quote', title: 'متن نظر', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
            { name: 'author', title: 'نام (مثلا مریم)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'context', title: 'موضوع همراهی (مثلا تغییر مسیر شغلی)', type: 'string' },
          ],
          preview: { select: { title: 'author', subtitle: 'quote' } },
        },
      ],
    },
    {
      name: 'events',
      title: 'رویدادهای پیش رو',
      type: 'array',
      group: 'proof',
      description: 'رویدادهای گذشته را حذف کنید.',
      of: [
        {
          type: 'object',
          name: 'event',
          fields: [
            { name: 'title', title: 'عنوان', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'date', title: 'تاریخ (مثلا ۲۸ مهر ۱۴۰۵)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'type', title: 'نوع (وبینار، کارگاه، ...)', type: 'string' },
            { name: 'location', title: 'مکان', type: 'string', initialValue: 'آنلاین' },
            { name: 'href', title: 'لینک ثبت‌نام', type: 'url' },
          ],
          preview: { select: { title: 'title', subtitle: 'date' } },
        },
      ],
    },

    // ------------------------------------------------------------ 6. FAQ
    {
      name: 'faqs',
      title: 'سوالات متداول',
      type: 'array',
      group: 'faq',
      description: 'پاسخ کوتاه و مستقیم در جمله‌ی اول بنویسید (برای گوگل و موتورهای هوش مصنوعی).',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            { name: 'question', title: 'سوال', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'answer', title: 'پاسخ', type: 'text', rows: 4, validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        },
      ],
    },

    // ------------------------------------------------------------ 7. MEDIA
    {
      name: 'avatar',
      title: 'عکس اصلی (پرتره)',
      type: 'image',
      group: 'media',
      description: 'عمودی ۴:۵، چهره در بالا. حداقل ۱۰۰۰ پیکسل عرض.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'عکس دوم (کاور / OG)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    },
    {
      name: 'aboutImage',
      title: 'عکس بخش درباره من (اختیاری)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    },
    {
      name: 'cutoutImage',
      title: 'عکس بدون پس‌زمینه (اختیاری)',
      type: 'image',
      group: 'media',
    },
    { name: 'instagramUrl', title: 'اینستاگرام', type: 'url', group: 'media' },
    { name: 'linkedinUrl', title: 'لینکدین', type: 'url', group: 'media' },
    { name: 'videoUrl', title: 'ویدیوی معرفی (لینک)', type: 'url', group: 'media' },
    { name: 'videoCover', title: 'کاور ویدیو', type: 'image', group: 'media' },
    { name: 'videoTitle', title: 'عنوان ویدیو', type: 'string', group: 'media' },
    { name: 'videoDescription', title: 'توضیح ویدیو', type: 'text', rows: 2, group: 'media' },
    {
      name: 'packagePrices',
      title: 'قیمت پکیج‌های قدیمی (فقط برای نسخه‌های قبلی صفحه)',
      type: 'object',
      group: 'media',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'start', title: 'شروع', type: 'number' },
        { name: 'discovery', title: 'کشف', type: 'number' },
        { name: 'transformation', title: 'تحول', type: 'number' },
        { name: 'excellence', title: 'تعالی', type: 'number' },
      ],
    },
    {
      name: 'packageDiscounts',
      title: 'تخفیف پکیج‌های قدیمی (درصد)',
      type: 'object',
      group: 'media',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'discovery', title: 'کشف', type: 'number' },
        { name: 'transformation', title: 'تحول', type: 'number' },
      ],
    },

    // ------------------------------------------------------------ 8. PUBLISH
    {
      name: 'isActive',
      title: 'نمایش در سایت',
      type: 'boolean',
      group: 'publish',
      initialValue: true,
      description: 'خاموش = صفحه و لیست کوچ‌ها او را نشان نمی‌دهند.',
    },
    {
      name: 'order',
      title: 'ترتیب نمایش در لیست',
      type: 'number',
      group: 'publish',
      description: 'عدد کمتر = بالاتر. خالی = آخر لیست.',
    },
  ],
  orderings: [
    { title: 'ترتیب نمایش', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'نام', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'avatar', isActive: 'isActive' },
    prepare: ({ title, subtitle, media, isActive }) => ({
      title: isActive === false ? `${title} (مخفی)` : title,
      subtitle,
      media,
    }),
  },
};
