import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const coaches = [
  {
    slug: 'fatemeh_esmaeeli',
    name: 'فاطمه اسماعیلی',
    title: 'کوچ بین‌المللی مادران، بانوان و نوجوانان',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/27fd1b5e3721da11a6a011e1265772d8bf8b74e7-864x1184.jpg',
  },
  {
    slug: 'mahya_shakoori',
    name: 'محیا شکوری',
    title: 'کوچ رشد فردی و خودآگاهی',
    imageUrl: 'public/images/solea/mahya_about.jpg',
  },
  {
    slug: 'mahya_shakouri',
    name: 'محیا شکوری',
    title: 'کوچ رشد فردی و خودآگاهی',
    imageUrl: 'public/images/solea/mahya_about.jpg',
  },
  {
    slug: 'saloomeh_fathijou',
    name: 'سالومه فتحی‌جو',
    title: 'کوچ حرفه‌ای تحول فردی و توسعه شغلی (PCC)',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/8f01f1da6f4c32287935980474bbf5c00ec57c48-1024x1024.png',
  },
  {
    slug: 'Arezoo_Ghaffari',
    name: 'آرزو غفاری',
    title: 'روان‌شناس بالینی و کوچ رشد فردی | متخصص ACT',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/e4cc60370befd73b0e9c920276df8215bf75c9d3-640x640.png',
  },
  {
    slug: 'fatemeh-derakhsh',
    name: 'دکتر فاطمه درخوش',
    title: 'کوچ رشد فردی و مسیر شغلی | دکترای داروسازی',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/41f62ec8f93c6d2603daa60dbfb483937df3af6e-1024x1024.png',
  },
  {
    slug: 'shabnam_nematimalek',
    name: 'شبنم نعمتی‌ملک',
    title: 'کوچ رشد فردی و خودآگاهی',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/87be0ca9091fb5a28213a3a19f4888d45a180361-960x1280.png',
  },
  {
    slug: 'maryam_johari',
    name: 'مریم جوهری',
    title: 'کوچ رشد فردی، خودشناسی و شفقت به خود',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/795c7cb8d4da50a4ee5bef5b0799894d322db363-335x335.png',
  },
  {
    slug: 'payam-esmi',
    name: 'پیام اسمی',
    title: 'کوچ هدفمندی، مدیریت زمان و انضباط فردی',
    imageUrl: 'https://cdn.sanity.io/images/7yjhdw88/production/1a4eb3c4ddcec6f743bc75b65a299e237d2cb90b-928x1152.png',
  },
  {
    slug: 'parmiss-yari',
    name: 'پارمیس یاری',
    title: 'لایف کوچ و تسهیل‌گر خودآگاهی (ICF Level 1)',
    imageUrl: 'public/images/solea/parmiss_hero_v4.png',
  },
];

async function fetchImageBuffer(urlOrPath) {
  if (urlOrPath.startsWith('http')) {
    const res = await fetch(urlOrPath);
    if (!res.ok) throw new Error(`Failed to fetch ${urlOrPath}`);
    return Buffer.from(await res.arrayBuffer());
  }
  const cleanPath = urlOrPath.replace(/^\//, '');
  return fs.readFileSync(cleanPath);
}

async function generateCoachOgImages() {
  const width = 1200;
  const height = 630;
  const outDir = path.resolve('public/images/coaches');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const logoPath = path.resolve('public/images/bloomia-club-logo.png');
  let logoInput;
  if (fs.existsSync(logoPath)) {
    logoInput = await sharp(logoPath)
      .resize({ width: 280, height: 110, fit: 'inside' })
      .toBuffer();
  }

  for (const c of coaches) {
    const dest = path.join(outDir, `og-${c.slug}.jpg`);
    console.log(`Generating OG for ${c.name} (${c.slug})...`);

    // Prepare coach photo
    let coachAvatarBuffer;
    try {
      const rawImg = await fetchImageBuffer(c.imageUrl);
      // Create a rounded circular crop 380x380
      const circleSvg = Buffer.from(
        `<svg width="360" height="360"><circle cx="180" cy="180" r="176" fill="#fff" /></svg>`
      );
      coachAvatarBuffer = await sharp(rawImg)
        .resize(360, 360, { fit: 'cover', position: 'top' })
        .composite([{ input: circleSvg, blend: 'dest-in' }])
        .png()
        .toBuffer();
    } catch (err) {
      console.warn(`Could not process image for ${c.slug}:`, err.message);
    }

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

        <!-- Glows -->
        <circle cx="1000" cy="315" r="260" fill="#32635d" opacity="0.35" />
        <circle cx="200" cy="150" r="220" fill="#2d5752" opacity="0.25" />

        <!-- Frame -->
        <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#366b64" stroke-width="2" opacity="0.4" />
        <rect x="44" y="44" width="1112" height="542" rx="20" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.2" />

        <!-- Photo Outer Glowing Ring -->
        <circle cx="980" cy="315" r="190" fill="none" stroke="#3d726b" stroke-width="3" opacity="0.5" />
        <circle cx="980" cy="315" r="184" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.4" />

        <!-- Left/Center Content (RTL) -->
        <!-- Badge -->
        <g transform="translate(420, 150)">
          <rect x="-190" y="-18" width="380" height="36" rx="18" fill="#1b3935" stroke="#3d726b" stroke-width="1.2" />
          <text x="0" y="5" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="14" font-weight="600" fill="#bfe8e2" text-anchor="middle">
            کوچ رسمی با گواهینامه بین‌المللی ICF
          </text>
        </g>

        <!-- Coach Name -->
        <text x="740" y="245" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="46" font-weight="800" fill="#ffffff" text-anchor="end">
          ${c.name}
        </text>

        <!-- Coach Title -->
        <text x="740" y="300" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="20" font-weight="500" fill="#bfe8e2" text-anchor="end">
          ${c.title}
        </text>

        <!-- Value Proposition / CTA info -->
        <g transform="translate(470, 375)">
          <rect x="-240" y="-22" width="480" height="44" rx="22" fill="#2b544e" stroke="#3d726b" stroke-width="1.5" />
          <text x="0" y="6" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">
            رزرو آنلاین جلسه معارفه رایگان (جلسه صفر)
          </text>
        </g>

        <!-- Subtitle Note -->
        <text x="470" y="445" font-family="'Vazirmatn', 'Segoe UI', 'Tahoma', sans-serif" font-size="16" font-weight="400" fill="#c3d5d2" text-anchor="middle">
          یک گفتگوی محرمانه و اختصاصی برای سنجش شیمی و نقشه راه رشد
        </text>

        <!-- Brand Footer -->
        <g transform="translate(470, 520)">
          <text x="0" y="0" font-family="'Segoe UI', 'Inter', sans-serif" font-size="16" font-weight="700" fill="#d4af37" text-anchor="middle" letter-spacing="2">
            BLOOMIACLUB.COM/COACHES/${c.slug.toUpperCase()}
          </text>
        </g>
      </svg>
    `;

    const composites = [];
    if (logoInput) {
      composites.push({
        input: logoInput,
        top: 60,
        left: 70,
      });
    }
    if (coachAvatarBuffer) {
      composites.push({
        input: coachAvatarBuffer,
        top: 315 - 180,
        left: 980 - 180,
      });
    }

    const imgBuffer = await sharp(Buffer.from(svgBg))
      .composite(composites)
      .jpeg({ quality: 85 })
      .toBuffer();

    fs.writeFileSync(dest, imgBuffer);
    console.log(`Saved ${dest} (${imgBuffer.length} bytes)`);
  }
  console.log('All coach OG images generated successfully!');
}

generateCoachOgImages().catch(console.error);
