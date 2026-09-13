export default {
  name: 'author',
  title: 'نویسنده (Author)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'نام و نام خانوادگی',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'اسلاگ (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'تصویر پروفایل',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'بیوگرافی کوتاه‌',
      type: 'text',
      rows: 3,
    },
    {
      name: 'jobTitle',
      title: 'عنوان شغلی یا تخصصی',
      type: 'string',
      description: 'مانند: کوچ مادران و بانوان یا روانشناس و کوچ رشد فردی',
    },
    {
      name: 'coachSlug',
      title: 'اسلاگ پروفایل کوچ در سایت بلومیا',
      type: 'string',
      description: 'در صورتی که نویسنده یکی از کوچ‌های بلومیا است، اسلاگ او (مانند fatemeh_esmaeeli) را وارد کنید تا مقالات به صفحه رزرو کوچ متصل شوند.',
    },
    {
      name: 'isCoach',
      title: 'آیا این نویسنده کوچ رسمی بلومیا است؟',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'isAi',
      title: 'پرسونای هوش مصنوعی (AI Persona)',
      description: 'اگر این پرسونای مجازی هوش مصنوعی است، این گزینه را فعال کنید.',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      isAi: 'isAi',
      jobTitle: 'jobTitle',
      media: 'image',
    },
    prepare({ title, isAi, jobTitle, media }) {
      return {
        title,
        subtitle: isAi ? '🤖 پرسونای هوش مصنوعی' : `🎯 کوچ بلومیا ${jobTitle ? `(${jobTitle})` : ''}`,
        media,
      };
    },
  },
};
