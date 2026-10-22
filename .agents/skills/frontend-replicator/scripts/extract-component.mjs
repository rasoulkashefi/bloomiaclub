#!/usr/bin/env node
/**
 * Frontend Component Extractor (Playwright-powered)
 * Part of the frontend-replicator skill.
 *
 * Extracts computed styles, screenshots (desktop & mobile), DOM semantics,
 * SVG icons, and color palettes from any live URL or element selector.
 * Fully portable: resolves Playwright locally, globally, or from fallbacks.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Parse CLI arguments
const args = process.argv.slice(2);
function getArg(key, defaultValue = null) {
  const index = args.indexOf(`--${key}`);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return defaultValue;
}
const hasFlag = (key) => args.includes(`--${key}`);

const targetUrl = getArg('url');
const selector = getArg('selector', 'body');
const outputDir = path.resolve(process.cwd(), getArg('output', './extracted-ui'));
const waitMs = Number.parseInt(getArg('wait', '2000'), 10);
const fullPage = hasFlag('fullpage');

if (!targetUrl) {
  console.error('Usage: node extract-component.mjs --url <URL> [--selector <CSS_SELECTOR>] [--output <DIR>] [--wait <MS>] [--fullpage]');
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log(`\n========================================`);
  console.log(`  Frontend Component Extractor`);
  console.log(`========================================`);
  console.log(`Target URL: ${targetUrl}`);
  console.log(`Selector:   ${selector}`);
  console.log(`Output Dir: ${outputDir}`);
  console.log(`----------------------------------------\n`);

  let playwrightModule;
  // 1. Try local project import
  try {
    playwrightModule = await import('playwright');
  } catch (localErr) {
    // 2. Try global npm install in AppData
    try {
      const globalNpmDir = path.join(process.env.APPDATA || '', 'npm', 'node_modules', 'playwright');
      const { createRequire } = await import('node:module');
      const req = createRequire(import.meta.url);
      playwrightModule = req(globalNpmDir);
    } catch (globalErr) {
      // 3. Try known fallback directory
      try {
        const { createRequire } = await import('node:module');
        const req = createRequire(import.meta.url);
        playwrightModule = req('d:/bloomiaclub/node_modules/playwright');
      } catch (fbErr) {
        console.error('Playwright not found in local or global npm modules.');
        process.exit(1);
      }
    }
  }

  const { chromium } = playwrightModule;

  // Prefer existing Chrome/Edge on Windows to avoid massive downloads
  let browser;
  const launchOptions = { headless: true };
  try {
    browser = await chromium.launch({ ...launchOptions, channel: 'chrome' });
    console.log('Launched Chrome successfully.');
  } catch (chromeErr) {
    try {
      browser = await chromium.launch({ ...launchOptions, channel: 'msedge' });
      console.log('Launched Edge successfully.');
    } catch (edgeErr) {
      browser = await chromium.launch(launchOptions);
      console.log('Launched Chromium successfully.');
    }
  }

  try {
    // 1. Desktop Viewport (1280x800)
    console.log('Capturing Desktop view (1280x800)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(async () => {
      console.log('Network idle timed out, waiting for domcontentloaded...');
      await desktopPage.waitForLoadState('domcontentloaded');
    });

    if (waitMs > 0) {
      await desktopPage.waitForTimeout(waitMs);
    }

    const desktopScreenshotPath = path.join(outputDir, 'desktop.png');
    await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage });
    console.log(`Saved desktop screenshot: ${desktopScreenshotPath}`);

    // If specific selector exists, take focused element screenshot
    let elementScreenshotPath = null;
    const elementExists = await desktopPage.$(selector);
    if (elementExists && selector !== 'body') {
      elementScreenshotPath = path.join(outputDir, 'element.png');
      await elementExists.screenshot({ path: elementScreenshotPath });
      console.log(`Saved element screenshot: ${elementScreenshotPath}`);
    }

    // 2. Mobile Viewport (390x844 - iPhone 14 / standard modern mobile)
    console.log('Capturing Mobile view (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(async () => {
      await mobilePage.waitForLoadState('domcontentloaded');
    });
    if (waitMs > 0) {
      await mobilePage.waitForTimeout(waitMs);
    }
    const mobileScreenshotPath = path.join(outputDir, 'mobile.png');
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`Saved mobile screenshot: ${mobileScreenshotPath}`);

    // 3. Extract Deep Computed Styles & Structure
    console.log('Extracting computed styles and DOM data...');
    const extractedData = await desktopPage.evaluate((targetSelector) => {
      const root = document.querySelector(targetSelector) || document.body;

      const getStyleObj = (el) => {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          display: cs.display,
          flexDirection: cs.flexDirection,
          flexWrap: cs.flexWrap,
          justifyContent: cs.justifyContent,
          alignItems: cs.alignItems,
          gridTemplateColumns: cs.gridTemplateColumns,
          gap: cs.gap,
          width: cs.width,
          maxWidth: cs.maxWidth,
          minHeight: cs.minHeight,
          padding: cs.padding,
          margin: cs.margin,
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage : null,
          color: cs.color,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          textAlign: cs.textAlign,
          borderRadius: cs.borderRadius,
          border: cs.border,
          borderColor: cs.borderColor,
          borderWidth: cs.borderWidth,
          boxShadow: cs.boxShadow !== 'none' ? cs.boxShadow : null,
          backdropFilter: cs.backdropFilter !== 'none' ? cs.backdropFilter : null,
        };
      };

      // Headings
      const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4')).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.innerText.trim(),
        styles: getStyleObj(h),
      }));

      // Paragraphs & subtitles
      const paragraphs = Array.from(root.querySelectorAll('p, [class*="description"], [class*="subtitle"], [class*="lead"]')).map((p) => ({
        text: p.innerText.trim(),
        styles: getStyleObj(p),
      })).filter((p) => p.text.length > 0 && p.text.length < 500).slice(0, 5);

      // Buttons & CTAs
      const ctas = Array.from(root.querySelectorAll('button, a[class*="btn"], a[class*="button"], a[role="button"]')).map((btn) => ({
        tag: btn.tagName.toLowerCase(),
        text: btn.innerText.trim(),
        href: btn.getAttribute('href') || null,
        styles: getStyleObj(btn),
      })).filter((btn) => btn.text.length > 0).slice(0, 6);

      // Badges / Tags
      const badges = Array.from(root.querySelectorAll('[class*="badge"], [class*="tag"], [class*="pill"], [class*="chip"]')).map((b) => ({
        text: b.innerText.trim(),
        styles: getStyleObj(b),
      })).filter((b) => b.text.length > 0 && b.text.length < 50).slice(0, 5);

      // SVGs
      const svgs = Array.from(root.querySelectorAll('svg')).map((svg) => {
        const rect = svg.getBoundingClientRect();
        return {
          viewBox: svg.getAttribute('viewBox'),
          width: svg.getAttribute('width') || rect.width,
          height: svg.getAttribute('height') || rect.height,
          fill: svg.getAttribute('fill') || window.getComputedStyle(svg).fill,
          stroke: svg.getAttribute('stroke') || window.getComputedStyle(svg).stroke,
          snippet: svg.outerHTML.slice(0, 400),
        };
      }).slice(0, 10);

      // Images
      const images = Array.from(root.querySelectorAll('img')).map((img) => ({
        src: img.src,
        alt: img.alt || '',
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        styles: {
          borderRadius: window.getComputedStyle(img).borderRadius,
          boxShadow: window.getComputedStyle(img).boxShadow,
          objectFit: window.getComputedStyle(img).objectFit,
        },
      })).slice(0, 6);

      // Deep Semantic Color Roles Extraction
      const colorRoles = {
        backgrounds: new Set(),
        surfaces: new Set(),
        texts: new Set(),
        mutedTexts: new Set(),
        borders: new Set(),
        accents: new Set(),
        gradients: new Set(),
        shadows: new Set()
      };

      const elements = [root, ...root.querySelectorAll('*')];
      elements.forEach((el) => {
        const s = window.getComputedStyle(el);
        const tag = el.tagName.toLowerCase();
        const cls = (el.className && typeof el.className === 'string') ? el.className : '';
        const isInteractive = ['button', 'a'].includes(tag) || /btn|cta|badge|pill|accent/i.test(cls);
        const isCard = /card|box|panel|surface|glass/i.test(cls);

        if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') {
          if (el === root) colorRoles.backgrounds.add(s.backgroundColor);
          else if (isInteractive) colorRoles.accents.add(s.backgroundColor);
          else if (isCard) colorRoles.surfaces.add(s.backgroundColor);
          else colorRoles.backgrounds.add(s.backgroundColor);
        }

        if (s.backgroundImage && s.backgroundImage.includes('gradient')) {
          colorRoles.gradients.add(s.backgroundImage);
        }

        if (s.color) {
          if (['h1', 'h2', 'h3', 'strong'].includes(tag)) colorRoles.texts.add(s.color);
          else if (['p', 'span', 'small'].includes(tag)) colorRoles.mutedTexts.add(s.color);
        }

        if (s.borderColor && s.borderWidth !== '0px') colorRoles.borders.add(s.borderColor);
        if (s.boxShadow && s.boxShadow !== 'none') colorRoles.shadows.add(s.boxShadow);
      });

      return {
        url: window.location.href,
        title: document.title,
        containerStyles: getStyleObj(root),
        headings,
        paragraphs,
        ctas,
        badges,
        svgs,
        images,
        colorRoles: {
          backgrounds: [...colorRoles.backgrounds],
          surfaces: [...colorRoles.surfaces],
          texts: [...colorRoles.texts],
          mutedTexts: [...colorRoles.mutedTexts],
          borders: [...colorRoles.borders],
          accents: [...colorRoles.accents],
          gradients: [...colorRoles.gradients],
          shadows: [...colorRoles.shadows]
        },
      };
    }, selector);

    // Save JSON data
    const jsonPath = path.join(outputDir, 'styles.json');
    fs.writeFileSync(jsonPath, JSON.stringify(extractedData, null, 2), 'utf-8');
    console.log(`Saved JSON styles: ${jsonPath}`);

    // Generate Markdown summary for quick inspection
    const markdownSummary = generateMarkdownSummary(extractedData, {
      desktopScreenshotPath,
      mobileScreenshotPath,
      elementScreenshotPath,
    });
    const summaryPath = path.join(outputDir, 'summary.md');
    fs.writeFileSync(summaryPath, markdownSummary, 'utf-8');
    console.log(`Saved markdown summary: ${summaryPath}`);

    console.log(`\n========================================`);
    console.log(`  Extraction Complete!`);
    console.log(`  Artifacts stored in: ${outputDir}`);
    console.log(`========================================\n`);

    await desktopContext.close();
    await mobileContext.close();
  } finally {
    await browser.close();
  }
}

function generateMarkdownSummary(data, files) {
  const c = data.containerStyles || {};
  return `# Extracted UI Component Report

- **Source URL:** ${data.url}
- **Page Title:** ${data.title}
- **Element Selector:** ${selector}

---

## 1. Visual Captures
- **Desktop (1280x800):** \`${files.desktopScreenshotPath}\`
- **Mobile (390x844):** \`${files.mobileScreenshotPath}\`
${files.elementScreenshotPath ? `- **Element:** \`${files.elementScreenshotPath}\`` : ''}

---

## 2. Container Layout & Tokens
- **Display:** \`${c.display || 'block'}\` (Flex/Grid: \`${c.flexDirection || c.gridTemplateColumns || 'none'}\`)
- **Gap:** \`${c.gap || 'none'}\`
- **Max Width:** \`${c.maxWidth || 'none'}\`
- **Padding:** \`${c.padding || 'none'}\`
- **Background:** \`${c.backgroundColor || c.background || 'transparent'}\`
- **Border Radius:** \`${c.borderRadius || '0px'}\`
- **Box Shadow:** \`${c.boxShadow || 'none'}\`

---

## 3. Typography & Headings
${data.headings.map((h, i) => `### Heading ${i + 1} (<${h.tag}>)
- **Text:** "${h.text}"
- **Font Size:** \`${h.styles.fontSize}\` | **Weight:** \`${h.styles.fontWeight}\` | **Line Height:** \`${h.styles.lineHeight}\`
- **Color:** \`${h.styles.color}\`
- **Font Family:** \`${h.styles.fontFamily}\`
`).join('\n')}

---

## 4. CTAs & Buttons
${data.ctas.map((btn, i) => `### CTA ${i + 1} (${btn.tag})
- **Text:** "${btn.text}" ${btn.href ? `(href: \`${btn.href}\`)` : ''}
- **Background:** \`${btn.styles.backgroundColor || btn.styles.background}\`
- **Text Color:** \`${btn.styles.color}\`
- **Border Radius:** \`${btn.styles.borderRadius}\`
- **Padding:** \`${btn.styles.padding}\`
- **Font:** \`${btn.styles.fontSize}\` / \`${btn.styles.fontWeight}\`
`).join('\n')}

---

## 5. Detected Semantic Color Roles
- **Backgrounds:** ${data.colorRoles?.backgrounds?.join(', ') || 'None'}
- **Surfaces / Cards:** ${data.colorRoles?.surfaces?.join(', ') || 'None'}
- **Accents / CTAs:** ${data.colorRoles?.accents?.join(', ') || 'None'}
- **Text Primary:** ${data.colorRoles?.texts?.join(', ') || 'None'}
- **Text Muted:** ${data.colorRoles?.mutedTexts?.join(', ') || 'None'}
- **Borders:** ${data.colorRoles?.borders?.join(', ') || 'None'}
- **Gradients:** ${data.colorRoles?.gradients?.join(', ') || 'None'}
- **Shadows:** ${data.colorRoles?.shadows?.join(', ') || 'None'}

---

## 6. Icons & SVGs (${data.svgs.length} detected)
${data.svgs.map((svg, i) => `### SVG ${i + 1}
- **Size:** ${svg.width} x ${svg.height} | **ViewBox:** \`${svg.viewBox}\`
- **Stroke/Fill:** \`${svg.stroke || svg.fill}\`
`).join('\n')}
`;
}

run().catch((err) => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
