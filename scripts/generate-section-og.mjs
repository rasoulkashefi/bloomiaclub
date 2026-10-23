import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateSectionOgImages() {
  const width = 1200;
  const height = 630;

  console.log('Generating pixel-perfect 1200x630 OpenGraph banners for all sections...');

  const logoPath = path.resolve('public/images/bloomia-club-logo.png');
  let logoInput;
  if (fs.existsSync(logoPath)) {
    logoInput = await sharp(logoPath)
      .resize({ width: 440, height: 180, fit: 'inside' })
      .toBuffer();
  }

  const sections = [
    {
      dest: 'public/images/og-coaches.jpg',
      badge: 'فهرست کوچ‌های رسمی و تاییدشده ICF',
      title: 'کوچ‌های حرفه‌ای بلومیا کلاب',
      subtitle: 'همراهی با برترین کوچ‌های توسعه فردی، شغلی و کسب‌وکار در ایران',
    },
    {
      dest: 'public/images/og-blog.jpg',
      badge: 'وبلاگ و یادداشت‌های تخصصی',
      title: 'وبلاگ تخصصی کوچینگ و رشد فردی',
      subtitle: 'مقالات تحلیلی، متدهای علمی و راهکارهای کاربردی به قلم کوچ‌های بلومیا',
    },
    {
      dest: 'public/images/og-events.jpg',
      badge: 'رویدادها، وبینارها و کارگاه‌های تخصصی',
      title: 'رویدادها و وبینارهای بلومیا کلاب',
      subtitle: 'تقویم کارگاه‌های تعاملی رشد فردی، مسیر شغلی و والدگری با کوچ‌های بین‌المللی',
    },
    {
      dest: 'public/images/og-faq.jpg',
      badge: 'پرسش‌های متداول و راهنمای مراجعان',
      title: 'پرسش‌های متداول درباره کوچینگ',
      subtitle: 'پاسخ شفاف به تمام سوالات پیرامون جلسه صفر، انتخاب کوچ، هزینه‌ها و محرمانگی',
    },
    {
      dest: 'public/images/og-contact.jpg',
      badge: 'ارتباط مستقیم با تیم بلومیا کلاب',
      title: 'تماس با بلومیا کلاب | پشتیبانی و مشاوره',
      subtitle: 'تلفن مستقیم ۰۲۱۹۱۰۰۰۰۰۰ | هماهنگی جلسات و درخواست کوچینگ سازمانی',
    },
    {
      dest: 'public/images/og-legal.jpg',
      badge: 'منشور اخلاقی و حریم خصوصی',
      title: 'قوانین و منشور محرمانگی بلومیا کلاب',
      subtitle: 'تعهد کامل به استانداردهای بین‌المللی ICF و حفظ صددرصدی حریم خصوصی مراجعان',
    },
  ];

  for (const s of sections) {
    const svgBg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stop-color="#244d48" />
            <stop offset="60%" stop-color="#183633" />
            <stop offset="100%" stop-color="#0f211f" />
          </radialGradient>
        </defs>

        <rect width="${width}" height="${height}" fill="url(#bg)" />

        <circle cx="140" cy="120" r="280" fill="#32635d" opacity="0.25" />
        <circle cx="1060" cy="520" r="320" fill="#2d5752" opacity="0.3" />

        <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#366b64" stroke-width="2" opacity="0.4" />
        <rect x="44" y="44" width="1112" height="542" rx="20" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.2" />

        <!-- Badge -->
        <g transform="translate(600, 95)">
          <rect x="-180" y="-18" width="360" height="36" rx="18" fill="#1b3935" stroke="#3d726b" stroke-width="1.2" />
          <text x="0" y="5" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="15" font-weight="600" fill="#bfe8e2" text-anchor="middle">
            ${s.badge}
          </text>
        </g>

        <!-- Main Headline -->
        <text x="600" y="405" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="42" font-weight="800" fill="#ffffff" text-anchor="middle">
          ${s.title}
        </text>

        <!-- Subtitle -->
        <text x="600" y="465" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="21" font-weight="500" fill="#c3d5d2" text-anchor="middle">
          ${s.subtitle}
        </text>

        <!-- Footer Brand URL -->
        <g transform="translate(600, 535)">
          <text x="0" y="0" font-family="'Segoe UI', 'Inter', sans-serif" font-size="18" font-weight="700" fill="#d4af37" text-anchor="middle" letter-spacing="3">
            BLOOMIACLUB.COM
          </text>
        </g>
      </svg>
    `;

    const composites = [];
    if (logoInput) {
      composites.push({
        input: logoInput,
        top: 145,
        left: Math.round((width - 440) / 2),
      });
    }

    const imgBuffer = await sharp(Buffer.from(svgBg))
      .composite(composites)
      .jpeg({ quality: 85 })
      .toBuffer();

    fs.writeFileSync(s.dest, imgBuffer);
    console.log(`Saved ${s.dest} (${imgBuffer.length} bytes, 1200x630)`);
  }
}

generateSectionOgImages().catch(console.error);
