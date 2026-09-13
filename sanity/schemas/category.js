export default {
  name: 'category',
  title: 'دسته‌بندی (Category)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'عنوان دسته‌بندی',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'اسلاگ (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'توضیحات کوتاه',
      type: 'text',
      rows: 3,
    },
    {
      name: 'color',
      title: 'کد رنگ شناسه (Color Hex)',
      type: 'string',
      description: 'مانند #1f3d3a یا #BF4408',
      initialValue: '#1f3d3a',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
};
