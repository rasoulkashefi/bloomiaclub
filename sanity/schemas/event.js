export default {
  name: 'event',
  title: 'رویداد و وبینار (Event)',
  type: 'document',
  groups: [
    { name: 'basic', title: '۱. اطلاعات اصلی', default: true },
    { name: 'timing', title: '۲. زمان و مکان برگزاری' },
    { name: 'registration', title: '۳. ثبت‌نام و هزینه (ایسمینار / ایوند)' },
    { name: 'content', title: '۴. محتوا و سرفصل‌ها' },
    { name: 'faq', title: '۵. سوالات متداول' },
    { name: 'seo', title: '۶. سئو و پیش‌نمایش' },
  ],
  fields: [
    // -------------------------------------------------------------
    // GROUP 1: BASIC INFO
    // -------------------------------------------------------------
    {
      name: 'title',
      title: 'عنوان رویداد یا وبینار',
      type: 'string',
      group: 'basic',
      description: 'مثال: وبینار مدیریت زمان و غلبه بر اهمال‌کاری',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'اسلاگ انگلیسی (Slug)',
      type: 'slug',
      group: 'basic',
      description: 'آدرس URL رویداد (مانند time-management-webinar)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventType',
      title: 'نوع رویداد',
      type: 'string',
      group: 'basic',
      initialValue: 'webinar',
      options: {
        list: [
          { title: 'وبینار تخصصی آنلاین', value: 'webinar' },
          { title: 'کارگاه تعاملی (Workshop)', value: 'workshop' },
          { title: 'مسترکلاس کوچینگ (Masterclass)', value: 'masterclass' },
          { title: 'همایش حضوری', value: 'in_person' },
          { title: 'پنل پرسش و پاسخ زنده', value: 'panel' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'وضعیت رویداد',
      type: 'string',
      group: 'basic',
      initialValue: 'open',
      options: {
        list: [
          { title: 'در حال ثبت‌نام (Open)', value: 'open' },
          { title: 'به زودی (Coming Soon)', value: 'soon' },
          { title: 'ظرفیت تکمیل (Sold Out)', value: 'sold_out' },
          { title: 'پایان‌یافته / آرشیو (Completed)', value: 'completed' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'نمایش ویژه (Featured)',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'نمایش در بالای صفحه رویدادها یا نشان ویژه برگزیده',
    },
    {
      name: 'coach',
      title: 'کوچ برگزارکننده (کوچ اصلی)',
      type: 'reference',
      to: [{ type: 'coach' }],
      group: 'basic',
      description: 'کوچ اصلی بلومیا که این رویداد را برگزار یا تدریس می‌کند',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coaches',
      title: 'کوچ‌های همکار یا مهمان (اختیاری)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'coach' }] }],
      group: 'basic',
      description: 'در صورت برگزاری اشتراکی توسط چند کوچ',
    },
    {
      name: 'coverImage',
      title: 'تصویر کاور رویداد (Cover Image)',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'متن جایگزین تصویر (Alt Text)',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'چکیده و معرفی کوتاه (Excerpt)',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'خلاصه ۲ تا ۳ خطی برای کارت‌های لیست رویدادها و توضیحات متا',
      validation: (Rule) => Rule.required().max(300),
    },

    // -------------------------------------------------------------
    // GROUP 2: TIMING & LOCATION
    // -------------------------------------------------------------
    {
      name: 'date',
      title: 'تاریخ و ساعت شروع',
      type: 'datetime',
      group: 'timing',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'تاریخ و ساعت پایان (اختیاری)',
      type: 'datetime',
      group: 'timing',
    },
    {
      name: 'duration',
      title: 'مدت زمان رویداد',
      type: 'string',
      group: 'timing',
      description: 'مثال: ۹۰ دقیقه / ۲ ساعت / ۳ جلسه ۲ ساعته',
      initialValue: '۹۰ دقیقه',
    },
    {
      name: 'location',
      title: 'محل برگزاری / پلتفرم',
      type: 'string',
      group: 'timing',
      description: 'مثال: آنلاین در ایسمینار / آنلاین در اسکای‌روم / حضوری، سالن همایش‌های...',
      initialValue: 'آنلاین در ایسمینار',
    },
    {
      name: 'platform',
      title: 'پلتفرم ثبت‌نام یا برگزاری',
      type: 'string',
      group: 'timing',
      initialValue: 'eseminar',
      options: {
        list: [
          { title: 'ایسمینار (eSeminar)', value: 'eseminar' },
          { title: 'ایوند (Evand)', value: 'evand' },
          { title: 'اسکای‌روم (Skyroom)', value: 'skyroom' },
          { title: 'گوگل میت (Google Meet)', value: 'google_meet' },
          { title: 'حضوری (In-Person)', value: 'in_person' },
          { title: 'سایر', value: 'other' },
        ],
      },
    },

    // -------------------------------------------------------------
    // GROUP 3: REGISTRATION & PRICING
    // -------------------------------------------------------------
    {
      name: 'registrationUrl',
      title: 'لینک مستقیم ثبت‌نام (ایسمینار، ایوند یا پلتفرم خارجی)',
      type: 'url',
      group: 'registration',
      description: 'کاربر با کلیک روی ثبت‌نام مستقیماً به این صفحه بیرونی هدایت می‌شود',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'price',
      title: 'مبلغ ثبت‌نام (تومان)',
      type: 'number',
      group: 'registration',
      description: 'مبلغ قابل پرداخت به تومان (برای رویداد رایگان عدد 0 وارد کنید)',
      initialValue: 0,
    },
    {
      name: 'originalPrice',
      title: 'مبلغ اصلی قبل از تخفیف (تومان - اختیاری)',
      type: 'number',
      group: 'registration',
      description: 'در صورت وجود تخفیف زودهنگام، قیمت خط‌خورده را وارد کنید',
    },
    {
      name: 'capacity',
      title: 'ظرفیت رویداد (اختیاری)',
      type: 'string',
      group: 'registration',
      description: 'مثال: ۵۰ نفر / ظرفیت محدود',
    },

    // -------------------------------------------------------------
    // GROUP 4: CONTENT & SYLLABUS
    // -------------------------------------------------------------
    {
      name: 'body',
      title: 'توضیحات و بدنه کامل رویداد (Rich Text)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'عادی', value: 'normal' },
            { title: 'تیتر اصلی H2', value: 'h2' },
            { title: 'تیتر فرعی H3', value: 'h3' },
            { title: 'نقل قول (Quote)', value: 'blockquote' },
          ],
          lists: [
            { title: 'گلوله‌ای (Bullet)', value: 'bullet' },
            { title: 'عددی (Numbered)', value: 'number' },
          ],
        },
      ],
    },
    {
      name: 'syllabus',
      title: 'سرفصل‌های کارگاه / وبینار',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'مباحث و موضوعاتی که در این جلسه تدریس و تمرین می‌شوند',
    },
    {
      name: 'targetAudience',
      title: 'این رویداد برای چه کسانی است؟',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'مثال: مادران شاغل، مدیران سازمان‌ها، علاقه‌مندان به رشد فردی',
    },
    {
      name: 'features',
      title: 'امکانات و مزایای شرکت در رویداد',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      initialValue: [
        'دسترسی دائمی به ویدیو ضبط‌شده در ایسمینار',
        'امکان پرسش و پاسخ مستقیم با کوچ',
        'دریافت اسلایدها و کاربرگ‌های تمرینی',
      ],
    },

    // -------------------------------------------------------------
    // GROUP 5: FAQ
    // -------------------------------------------------------------
    {
      name: 'faqs',
      title: 'سوالات متداول این رویداد',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'پرسش',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'پاسخ',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // GROUP 6: SEO
    // -------------------------------------------------------------
    {
      name: 'metaTitle',
      title: 'عنوان سئو (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'در صورت خالی بودن از عنوان اصلی استفاده می‌شود',
    },
    {
      name: 'metaDescription',
      title: 'توضیحات سئو (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'در صورت خالی بودن از چکیده رویداد استفاده می‌شود',
    },
    {
      name: 'order',
      title: 'ترتیب نمایش دستی (اختیاری)',
      type: 'number',
      group: 'basic',
      description: 'عدد کمتر = اولویت بالاتر در لیست',
    },
  ],
  orderings: [
    {
      title: 'تاریخ برگزاری (نزدیک‌ترین)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'ترتیب دستی',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      coach: 'coach.name',
      date: 'date',
      media: 'coverImage',
      status: 'status',
    },
    prepare({ title, coach, date, media, status }) {
      const statusMap = {
        open: '🟢 در حال ثبت‌نام',
        soon: '⏳ به زودی',
        sold_out: '🔴 تکمیل ظرفیت',
        completed: '⚪ پایان‌یافته',
      };
      return {
        title,
        subtitle: `${coach ? `کوچ: ${coach} | ` : ''}${statusMap[status] || ''} | ${date ? new Date(date).toLocaleDateString('fa-IR') : 'بدون تاریخ'}`,
        media,
      };
    },
  },
};
