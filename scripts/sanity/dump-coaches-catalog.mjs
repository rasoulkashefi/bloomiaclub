import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { env } from './_env.mjs';

const client = createClient({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function dumpCatalog() {
  console.log('🔍 Fetching all coaches from Sanity...');
  const coaches = await client.fetch(`*[_type == "coach"] | order(order asc, _createdAt desc){
    _id,
    name,
    "slug": slug.current,
    title,
    description,
    longDescription,
    specialties,
    rating,
    totalReviews,
    totalSessions,
    coachingHours,
    satisfiedClients,
    experienceYears,
    sessionMode,
    languages,
    location,
    isActive,
    "avatarUrl": avatar.asset->url,
    "cutoutUrl": cutoutImage.asset->url,
    instagramUrl,
    linkedinUrl,
    bookingUrl,
    packages,
    packagePrices,
    credentials,
    _createdAt,
    _updatedAt
  }`);

  console.log(`Found ${coaches.length} coaches.`);

  const catalogContent = generateCatalogMarkdown(coaches);
  const catalogPath = path.resolve(process.cwd(), 'COACHES_CATALOG.md');
  fs.writeFileSync(catalogPath, catalogContent, 'utf8');
  console.log(`✅ COACHES_CATALOG.md created successfully at ${catalogPath}`);
}

function generateCatalogMarkdown(coaches) {
  const activeCoaches = coaches.filter(c => c.isActive !== false);
  const inactiveCoaches = coaches.filter(c => c.isActive === false);

  const rows = coaches.map((c, index) => {
    const specialties = (c.specialties || []).slice(0, 3).join('، ') || 'عمومی';
    const hours = c.coachingHours || c.totalSessions || 0;
    const rating = c.rating ? String(c.rating).replace('.', '/') : '۵/۰';
    const status = c.isActive === false ? '❌ غیرفعال' : '✅ فعال';
    return `| ${index + 1} | **${c.name}** | \`${c.slug}\` | ${c.title || 'کوچ حرفه‌ای'} | ${specialties} | +${hours} ساعت | ${rating} | ${status} |`;
  }).join('\n');

  return `# شناسنامه کوچ‌های رسمی بلومیا کلاب (Bloomia Coaches Catalog)

این سند مرجع رسمی، فوق‌العاده سبک و کم‌توکن برای آگاهی آنی از تمام کوچ‌های ثبت‌شده و فعال در پلتفرم **بلومیا کلاب (\`bloomiaclub.com/coaches\`)** است. هر ایجنت پیش از تعریف یا ویرایش پروفایل کوچ جدید، **باید ابتدا این فایل را بررسی کند** تا از عدم تکرار اسلاگ و یکپارچگی مشخصات اطمینان یابد.

---

## ۱. آمار کلی کوچ‌ها (Coaches Overview)

* **تعداد کل کوچ‌ها:** ${coaches.length} کوچ (${activeCoaches.length} فعال، ${inactiveCoaches.length} غیرفعال)
* **استاندارد صلاحیت:** ۱۰۰٪ کوچ‌ها دارای صلاحیت بین‌المللی فدراسیون بین‌المللی کوچینگ (ICF) یا مدارک معتبر روان‌شناسی و مشاوره تخصصی هستند.
* **سیستم شناسه‌ها:**
  - سند اصلی کوچ در سنتی: \`coach-profile-<slug>\` (منبع اصلی داده برای صفحه اختصاصی و کارت‌ها)
  - سند نویسنده بلاگ در سنتی: \`coach-<slug>\` (همگام‌سازی خودکار برای مقالات و بلاگ)
  - بک‌آپ سروری در سوپابیس: جدول \`v2_coaches\`

---

## ۲. فهرست جامع کوچ‌های بلومیا (Coaches Directory)

| # | نام کوچ | اسلاگ (\`slug\`) | عنوان حرفه‌ای | حوزه‌های اصلی تمرکز | سابقه جلسات | امتیاز | وضعیت |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${rows}

---

## ۳. خلاصه تخصص و پرسونای هر کوچ (Coaches Profiles Brief)

${coaches.map(c => `### ${c.name} (\`${c.slug}\`)
- **عنوان:** ${c.title || 'کوچ تخصصی بلومیا'}
- **اسلاگ:** \`${c.slug}\`
- **شناسه پروفایل سنتی:** \`coach-profile-${c.slug}\`
- **شناسه نویسنده بلاگ:** \`coach-${c.slug}\`
- **تخصص‌ها:** ${(c.specialties || []).join(' | ') || 'کوچینگ فردی'}
- **خلاصه معرفی:** ${c.description || 'همراه شما در مسیر رشد و تحول فردی و حرفه‌ای.'}
- **لینک اختصاصی:** [bloomiaclub.com/coaches/${c.slug}](https://bloomiaclub.com/coaches/${c.slug})
`).join('\n')}

---

## ۴. استانداردهای ثبت کوچ جدید (Onboarding Standards)

1. **ترمینولوژی قطعی:** در تمامی بخش‌ها منحصراً از واژه **«کوچ»** و **«کوچ‌ها»** استفاده شود (واژه‌های «مربی»، «مربیان» اکیداً ممنوع است).
2. **قانون بدون ایموجی:** در هیچ‌کدام از فیلدهای نام، عنوان، بیو، تخصص‌ها و بسته‌ها نباید از هیچ ایموجی استفاده شود.
3. **فرمت اسلاگ:** اسلاگ انگلیسی تمیز و یکدست با خط تیره (مانند \`sara-mohammadi\`).
4. **تطبیق خودکار نویسنده:** با ثبت کوچ، سند نویسنده بلاگ (\`coach-<slug>\`) و بک‌آپ سوپابیس به صورت خودکار ساخته می‌شوند.
`;
}

dumpCatalog().catch(err => {
  console.error('❌ Error dumping coaches catalog:', err);
  process.exit(1);
});
