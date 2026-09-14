import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createOgImage() {
  const width = 1200;
  const height = 630;

  console.log('Rendering high-resolution OpenGraph default image (1200x630)...');

  let logoInput;
  const logoPath = path.resolve('public/images/bloomia-club-logo.png');
  if (fs.existsSync(logoPath)) {
    logoInput = await sharp(logoPath)
      .resize({ width: 520, height: 260, fit: 'inside' })
      .toBuffer();
  }

  const svgBg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="45%" r="75%">
          <stop offset="0%" stop-color="#244d48" />
          <stop offset="60%" stop-color="#183633" />
          <stop offset="100%" stop-color="#0f211f" />
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5e0a0" />
          <stop offset="100%" stop-color="#d4af37" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)" />

      <!-- Subtle geometric glow -->
      <circle cx="120" cy="100" r="280" fill="#32635d" opacity="0.25" />
      <circle cx="1100" cy="540" r="320" fill="#2d5752" opacity="0.3" />

      <!-- Border Frame -->
      <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#366b64" stroke-width="2" opacity="0.4" />
      <rect x="44" y="44" width="1112" height="542" rx="20" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.2" />

      <!-- Badge -->
      <g transform="translate(600, 95)">
        <rect x="-170" y="-18" width="340" height="36" rx="18" fill="#1b3935" stroke="#3d726b" stroke-width="1.2" />
        <text x="0" y="5" font-family="'IRANYekan', 'Vazirmatn', 'Segoe UI', sans-serif" font-size="15" font-weight="600" fill="#bfe8e2" text-anchor="middle">
          پلتفرم تخصصی خدمات کوچینگ و رشد فردی
        </text>
      </g>

      <!-- Main Headline -->
      <text x="600" y="405" font-family="'IRANYekan', 'Vazirmatn', 'Segoe UI', sans-serif" font-size="44" font-weight="800" fill="#ffffff" text-anchor="middle">
        بلومیا کلاب؛ مسیر شفاف تحول و بالندگی
      </text>

      <!-- Subtitle -->
      <text x="600" y="465" font-family="'IRANYekan', 'Vazirmatn', 'Segoe UI', sans-serif" font-size="22" font-weight="500" fill="#c3d5d2" text-anchor="middle">
        همراه با برترین کوچ‌های تاییدشده، توسعه فردی، مسیر شغلی و والدگری
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
      top: 135,
      left: Math.round((width - 520) / 2),
    });
  }

  const finalBuffer = await sharp(Buffer.from(svgBg))
    .composite(composites)
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync('public/og-image.png', finalBuffer);
  console.log(`✅ Saved public/og-image.png (${finalBuffer.length} bytes)`);

  if (fs.existsSync('build')) {
    fs.writeFileSync('build/og-image.png', finalBuffer);
    console.log(`✅ Also updated build/og-image.png`);
  }
}

createOgImage().catch(console.error);
