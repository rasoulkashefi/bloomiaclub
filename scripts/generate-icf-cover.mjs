import sharp from 'sharp';
import fs from 'fs';

const width = 1200;
const height = 1700;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#142c2a" />
      <stop offset="50%" stop-color="#1b3936" />
      <stop offset="100%" stop-color="#10201e" />
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c99d66" />
      <stop offset="50%" stop-color="#ecd4a8" />
      <stop offset="100%" stop-color="#c99d66" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)" />

  <!-- Outer Decorative Border -->
  <rect x="50" y="50" width="1100" height="1600" rx="24" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.6" />
  <rect x="64" y="64" width="1072" height="1572" rx="16" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.15" />

  <!-- Top Badge / Header -->
  <g transform="translate(600, 220)" text-anchor="middle">
    <rect x="-160" y="-26" width="320" height="52" rx="26" fill="rgba(255,255,255,0.08)" stroke="url(#gold)" stroke-width="1.5" />
    <text y="8" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ecd4a8" letter-spacing="3">OFFICIAL PUBLICATION</text>
  </g>

  <!-- ICF Emblem Circle -->
  <g transform="translate(600, 480)" text-anchor="middle">
    <circle r="120" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.8" />
    <circle r="105" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.2" />
    <circle r="90" fill="rgba(201, 157, 102, 0.12)" />
    <text y="-15" font-family="sans-serif" font-size="52" font-weight="bold" fill="#ffffff" letter-spacing="4">ICF</text>
    <text y="35" font-family="sans-serif" font-size="18" font-weight="normal" fill="#ecd4a8" letter-spacing="2">EST. 1995</text>
  </g>

  <!-- Main Title Area -->
  <g transform="translate(600, 780)" text-anchor="middle">
    <text y="0" font-family="sans-serif" font-size="34" font-weight="normal" fill="#ecd4a8" letter-spacing="6">INTERNATIONAL COACHING FEDERATION</text>
    
    <text y="110" font-family="sans-serif" font-size="64" font-weight="bold" fill="#ffffff" letter-spacing="2">CORE COMPETENCIES</text>
    <text y="190" font-family="sans-serif" font-size="44" font-weight="normal" fill="#dfece9" opacity="0.95">شایستگی‌های بنیادین کوچینگ</text>
  </g>

  <!-- Decorative Divider Line -->
  <g transform="translate(600, 1060)">
    <line x1="-240" y1="0" x2="240" y2="0" stroke="url(#gold)" stroke-width="2" opacity="0.7" />
    <circle cx="0" cy="0" r="6" fill="#ecd4a8" />
  </g>

  <!-- Subtitle and 8 Competencies Pill -->
  <g transform="translate(600, 1180)" text-anchor="middle">
    <text y="0" font-family="sans-serif" font-size="28" font-weight="normal" fill="#ffffff" opacity="0.85">منشور رسمی اخلاقی و استانداردهای شایستگی‌های هشت‌گانه</text>
    <text y="50" font-family="sans-serif" font-size="22" font-weight="normal" fill="#ecd4a8" opacity="0.9">The Updated Global Benchmark for Professional Coaching</text>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(600, 1500)" text-anchor="middle">
    <text y="0" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ecd4a8" letter-spacing="4">BLOOMIA CLUB RESOURCE LIBRARY</text>
    <text y="35" font-family="sans-serif" font-size="16" font-weight="normal" fill="#ffffff" opacity="0.5">coachingfederation.org • Official PDF Document</text>
  </g>
</svg>
`;

async function main() {
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/images/solea/icf_competencies_cover.png');
  console.log('✅ Generated public/images/solea/icf_competencies_cover.png');
}

main();
