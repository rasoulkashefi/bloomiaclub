import { SerpPreview } from '../components/SerpPreview';

export default {
  name: 'post',
  title: 'مقاله (Post)',
  type: 'document',
  groups: [
    { name: 'content', title: '۱. تب محتوا (Content)', default: true },
    { name: 'seo', title: '۲. تب سئوی پیشرفته (SEO Suite)' },
    { name: 'geo', title: '۳. موتورهای هوش مصنوعی (GEO AI Engine)' },
    { name: 'workflow', title: '۴. فرآیند انتشار (Workflow)' },
  ],
  fields: [
    // -------------------------------------------------------------
    // TAB 1: CONTENT
    // -------------------------------------------------------------
    {
      name: 'title',
      title: 'عنوان مقاله',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'اسلاگ (Slug)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'چکیده مقاله (Lead / Summary)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'توضیحات کوتاه چند خطی در ابتدای مقاله و کارت‌های آرشیو',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'تصویر شاخص (Main Image)',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'متن جایگزین (Alt Text)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'زیرنویس تصویر (Caption)',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'نویسنده مقاله',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'دسته‌بندی موضوعی',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'estimatedReadTime',
      title: 'زمان تخمینی مطالعه (دقیقه)',
      type: 'number',
      group: 'content',
      initialValue: 5,
    },
    {
      name: 'body',
      title: 'بدنه اصلی متن (Rich PortableText)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'عادی', value: 'normal' },
            { title: 'تیتر اصلی H2', value: 'h2' },
            { title: 'تیتر فرعی H3', value: 'h3' },
            { title: 'تیتر H4', value: 'h4' },
            { title: 'نقل قول (Quote)', value: 'blockquote' },
          ],
          lists: [
            { title: 'گلوله‌ای (Bullet)', value: 'bullet' },
            { title: 'عددی (Numbered)', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'لینک (URL)',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'آدرس URL',
                  },
                  {
                    name: 'isExternal',
                    type: 'boolean',
                    title: 'باز شدن در پنجره جدید (target="_blank")',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'متن جایگزین (Alt)' },
            { name: 'caption', type: 'string', title: 'زیرنویس تصویر (Caption)' },
          ],
        },
        // Rich Custom Block 1: Callout Box
        {
          name: 'callout',
          title: 'کادر اعلان / توجه (Callout Box)',
          type: 'object',
          fields: [
            {
              name: 'tone',
              title: 'نوع اعلان',
              type: 'string',
              options: {
                list: [
                  { title: '💡 نکته (Tip)', value: 'tip' },
                  { title: '⚠️ هشدار (Warning)', value: 'warning' },
                  { title: 'ℹ️ اطلاع‌رسانی (Info)', value: 'info' },
                ],
              },
              initialValue: 'tip',
            },
            { name: 'title', title: 'عنوان کادر', type: 'string' },
            { name: 'content', title: 'متن درون کادر', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'tone' },
            prepare({ title, subtitle }) {
              const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' };
              return {
                title: title || 'کادر اعلان',
                subtitle: `${icons[subtitle] || '📌'} ${subtitle}`,
              };
            },
          },
        },
        // Rich Custom Block 2: Key Takeaways
        {
          name: 'keyTakeaways',
          title: 'نکات کلیدی (Key Takeaways)',
          type: 'object',
          fields: [
            { name: 'title', title: 'عنوان بخش', type: 'string', initialValue: 'نکات کلیدی این بخش' },
            {
              name: 'points',
              title: 'لیست نکات',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: { title: 'title', points: 'points' },
            prepare({ title, points }) {
              return {
                title: title || 'نکات کلیدی',
                subtitle: `${points?.length || 0} نکته کلیدی ثبت شده`,
              };
            },
          },
        },
        // Rich Custom Block 3: Highlighted Stat
        {
          name: 'highlightedStat',
          title: 'آمار شاخص (Highlighted Stat)',
          type: 'object',
          fields: [
            { name: 'number', title: 'عدد یا درصد آمار (مثلاً ۸۵٪ یا ۴.۸)', type: 'string' },
            { name: 'label', title: 'توضیحات آمار', type: 'string' },
            { name: 'source', title: 'منبع آمار (اختیاری)', type: 'string' },
          ],
          preview: {
            select: { number: 'number', label: 'label' },
            prepare({ number, label }) {
              return {
                title: `📊 ${number || ''}`,
                subtitle: label,
              };
            },
          },
        },
        // Rich Custom Block 4: FAQ Section
        {
          name: 'faqSection',
          title: 'بخش سوالات متداول (FAQ Section)',
          type: 'object',
          fields: [
            { name: 'title', title: 'عنوان بخش سوالات', type: 'string', initialValue: 'سوالات متداول' },
            {
              name: 'items',
              title: 'پرسش‌ها و پاسخ‌ها',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  title: 'سوال و پاسخ',
                  fields: [
                    { name: 'question', title: 'پرسش', type: 'string' },
                    { name: 'answer', title: 'پاسخ مستند', type: 'text', rows: 3 },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }) {
              return {
                title: `❓ ${title || 'سوالات متداول'}`,
                subtitle: `${items?.length || 0} پرسش و پاسخ`,
              };
            },
          },
        },
        // Rich Custom Block 5: Code Snippet
        {
          name: 'codeSnippet',
          title: 'قطعه کد (Code Snippet)',
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'زبان برنامه‌نویسی',
              type: 'string',
              initialValue: 'javascript',
            },
            {
              name: 'code',
              title: 'کد',
              type: 'text',
              rows: 6,
            },
          ],
          preview: {
            select: { language: 'language' },
            prepare({ language }) {
              return { title: `💻 کد (${language})` };
            },
          },
        },
        // Rich Custom Block 6: Video Embed
        {
          name: 'videoEmbed',
          title: 'ویدیوی آپارات / یوتیوب (Video Embed)',
          type: 'object',
          fields: [
            {
              name: 'provider',
              title: 'سرویس‌دهنده ویدیو',
              type: 'string',
              options: {
                list: [
                  { title: 'آپارات (Aparat)', value: 'aparat' },
                  { title: 'یوتیوب (YouTube)', value: 'youtube' },
                ],
              },
              initialValue: 'aparat',
            },
            {
              name: 'videoId',
              title: 'شناسه یا لینک کامل ویدیو',
              type: 'string',
              description: 'مثلاً شناسه آپارات c1d2e3 یا لینک ویدیو',
            },
            { name: 'title', title: 'عنوان ویدیو', type: 'string' },
          ],
          preview: {
            select: { provider: 'provider', title: 'title' },
            prepare({ provider, title }) {
              return { title: `🎬 ویدیو (${provider}): ${title || ''}` };
            },
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // TAB 2: SEO SUITE
    // -------------------------------------------------------------
    {
      name: 'metaTitle',
      title: 'عنوان متا (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'حداکثر ۶۰ کاراکتر - جهت نمایش در نتایج گوگل',
    },
    {
      name: 'metaDescription',
      title: 'توضیحات متا (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'بین ۱۲۰ تا ۱۶۰ کاراکتر - چکیده جذاب برای جلب کلیک در موتورهای جستجو',
    },
    {
      name: 'canonicalUrl',
      title: 'آدرس کانونیکال (Canonical URL)',
      type: 'url',
      group: 'seo',
      description: 'در صورت خالی بودن، به صورت خودکار به URL مقاله اشاره می‌کند',
    },
    {
      name: 'searchIntent',
      title: 'نیت جستجوی کاربر (Search Intent)',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'اطلاعاتی (Informational)', value: 'informational' },
          { title: 'تجاری (Commercial)', value: 'commercial' },
          { title: 'معاملاتی / رزرو (Transactional)', value: 'transactional' },
          { title: 'مسیریابی (Navigational)', value: 'navigational' },
        ],
      },
      initialValue: 'informational',
    },
    {
      name: 'keywords',
      title: 'کلمات کلیدی هدف (Keywords)',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    },
    {
      name: 'serpPreview',
      title: 'پیش‌نمایش زنده در گوگل',
      type: 'string',
      group: 'seo',
      components: {
        field: SerpPreview,
      },
    },

    // -------------------------------------------------------------
    // TAB 3: GEO AI ENGINE (SearchGPT, Perplexity & AI Overviews)
    // -------------------------------------------------------------
    {
      name: 'aiQuickAnswer',
      title: 'پاسخ سریع هوش مصنوعی (AI Quick Answer)',
      type: 'text',
      rows: 4,
      group: 'geo',
      description: 'پاسخ فشرده و مستند ۴۰ تا ۶۰ کلمه‌ای ویژه موتورهای SearchGPT، Perplexity و Google AI Overviews',
    },
    {
      name: 'focusEntity',
      title: 'موجودیت اصلی تمرکز (Focus Entity)',
      type: 'string',
      group: 'geo',
      description: 'موضوع دقیق یا مفهوم پایه گراف دانش مقاله (Knowledge Graph Entity)',
    },
    {
      name: 'semanticEntities',
      title: 'موجودیت‌های معنایی مرتبط (Semantic Entities)',
      type: 'array',
      group: 'geo',
      of: [{ type: 'string' }],
    },
    {
      name: 'targetQuestions',
      title: 'پرسش و پاسخ‌های هدفمند (Target Q&A for GEO)',
      type: 'array',
      group: 'geo',
      of: [
        {
          type: 'object',
          name: 'targetQa',
          fields: [
            { name: 'question', title: 'سوال صریح کاربر', type: 'string' },
            { name: 'shortAnswer', title: 'پاسخ مستقیم و کوتاه (Direct Answer)', type: 'text', rows: 3 },
          ],
        },
      ],
    },

    // -------------------------------------------------------------
    // TAB 4: WORKFLOW & PUBLISHING
    // -------------------------------------------------------------
    {
      name: 'status',
      title: 'وضعیت انتشار (Status)',
      type: 'string',
      group: 'workflow',
      options: {
        list: [
          { title: '📝 پیش‌نویس (Draft)', value: 'draft' },
          { title: '🔍 در حال بازبینی (Review)', value: 'review' },
          { title: '✅ منتشر شده (Published)', value: 'published' },
        ],
      },
      initialValue: 'published',
    },
    {
      name: 'publishedAt',
      title: 'تاریخ و زمان انتشار',
      type: 'datetime',
      group: 'workflow',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isFeatured',
      title: 'پست ویژه آرشیو (Featured Post)',
      type: 'boolean',
      group: 'workflow',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.title',
      media: 'mainImage',
      status: 'status',
    },
    prepare({ title, author, category, media, status }) {
      const statusIcons = { draft: '📝', review: '🔍', published: '✅' };
      return {
        title,
        subtitle: `${statusIcons[status] || '📄'} ${category || 'بدون دسته‌بندی'} | نویسنده: ${author || 'نامشخص'}`,
        media,
      };
    },
  },
};
