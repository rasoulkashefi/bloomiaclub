#!/usr/bin/env node
/**
 * UI/UX Pro Max + Frontend Replicator Unified Search Engine
 * Native Node.js & cross-platform BM25 search engine for UI/UX style guides, stacks, and design systems.
 * 
 * Usage:
 *   node search.mjs "<query>" [--domain <domain>] [--stack <stack>] [--max-results 3]
 *   node search.mjs "<query>" --design-system [-p "Project Name"]
 *   node search.mjs "<query>" --design-system --variance 8 --motion 9 --density 7
 *   node search.mjs "<query>" --design-system --persist -p "Project Name" --output-dir "<project-root>" [--page "dashboard"]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', 'data');

// Configuration
const CSV_CONFIG = {
  style: {
    file: "styles.csv",
    search_cols: ["Style ID", "Style Category", "Aliases", "Keywords", "Best For", "Type", "AI Prompt Keywords"],
    output_cols: ["Style ID", "Style Category", "Aliases", "Status", "Parent Style ID", "Preferred Mode", "Type", "Keywords", "Primary Colors", "Effects & Animation", "Best For", "Light Mode ✓", "Dark Mode ✓", "Performance", "Accessibility", "Framework Compatibility", "Complexity", "AI Prompt Keywords", "CSS/Technical Keywords", "Implementation Checklist", "Design System Variables"]
  },
  color: {
    file: "colors.csv",
    search_cols: ["Product Type", "Notes"],
    output_cols: ["Product Type", "Primary", "On Primary", "Secondary", "On Secondary", "Accent", "On Accent", "Background", "Foreground", "Card", "Card Foreground", "Muted", "Muted Foreground", "Border", "Destructive", "On Destructive", "Ring", "Notes"]
  },
  chart: {
    file: "charts.csv",
    search_cols: ["Data Type", "Keywords", "Best Chart Type", "When to Use", "When NOT to Use", "Accessibility Notes"],
    output_cols: ["Data Type", "Keywords", "Best Chart Type", "Secondary Options", "When to Use", "When NOT to Use", "Data Volume Threshold", "Color Guidance", "Accessibility Grade", "Accessibility Risk", "Accessibility Notes", "A11y Fallback", "Library Recommendation", "Interactive Level"]
  },
  landing: {
    file: "landing.csv",
    search_cols: ["Pattern ID", "Pattern Name", "Aliases", "Keywords", "Conversion Optimization", "Section Order"],
    output_cols: ["Pattern ID", "Pattern Name", "Aliases", "Keywords", "Section Order", "Primary CTA Placement", "Color Strategy", "Conversion Optimization"]
  },
  product: {
    file: "products.csv",
    search_cols: ["Product Type", "Keywords", "Primary Style Recommendation", "Key Considerations"],
    output_cols: ["Product Type", "Keywords", "Primary Style Recommendation", "Secondary Styles", "Landing Page Pattern", "Dashboard Style (if applicable)", "Color Palette Focus"]
  },
  ux: {
    file: "ux-guidelines.csv",
    search_cols: ["Category", "Issue", "Description", "Platform"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  typography: {
    file: "typography.csv",
    search_cols: ["Font Pairing Name", "Category", "Mood/Style Keywords", "Best For", "Heading Font", "Body Font"],
    output_cols: ["Font Pairing Name", "Category", "Heading Font", "Body Font", "Mood/Style Keywords", "Best For", "Google Fonts URL", "CSS Import", "Tailwind Config", "Notes"]
  },
  icons: {
    file: "icons.csv",
    search_cols: ["Category", "Icon Name", "Keywords", "Best For", "Library"],
    output_cols: ["Category", "Icon Name", "Keywords", "Library", "Import Code", "Usage", "Best For", "Style", "Semantic Role", "Allowed Contexts"]
  },
  gsap: {
    file: "motion.csv",
    search_cols: ["Category", "Intensity Tier", "Keywords", "Trigger"],
    output_cols: ["Category", "Intensity Tier", "Trigger", "Duration", "Easing", "GSAP Snippet", "Framework Notes", "Do", "Don't", "Performance Notes"]
  },
  react: {
    file: "react-performance.csv",
    search_cols: ["Category", "Issue", "Keywords", "Description"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  web: {
    file: "app-interface.csv",
    search_cols: ["Category", "Issue", "Keywords", "Description"],
    output_cols: ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Code Example Good", "Code Example Bad", "Severity"]
  },
  'google-fonts': {
    file: "google-fonts.csv",
    search_cols: ["Family", "Category", "Stroke", "Classifications", "Keywords", "Subsets", "Designers"],
    output_cols: ["Family", "Category", "Stroke", "Classifications", "Styles", "Variable Axes", "Subsets", "Designers", "Popularity Rank", "Google Fonts URL"]
  }
};

const STACK_FILES = {
  "react": "stacks/react.csv",
  "nextjs": "stacks/nextjs.csv",
  "vue": "stacks/vue.csv",
  "svelte": "stacks/svelte.csv",
  "astro": "stacks/astro.csv",
  "swiftui": "stacks/swiftui.csv",
  "react-native": "stacks/react-native.csv",
  "flutter": "stacks/flutter.csv",
  "nuxtjs": "stacks/nuxtjs.csv",
  "nuxt-ui": "stacks/nuxt-ui.csv",
  "html-tailwind": "stacks/html-tailwind.csv",
  "shadcn": "stacks/shadcn.csv",
  "jetpack-compose": "stacks/jetpack-compose.csv",
  "threejs": "stacks/threejs.csv",
  "angular": "stacks/angular.csv",
  "laravel": "stacks/laravel.csv",
  "javafx": "stacks/javafx.csv",
  "wpf": "stacks/wpf.csv",
  "winui": "stacks/winui.csv",
  "avalonia": "stacks/avalonia.csv",
  "uno": "stacks/uno.csv",
  "uwp": "stacks/uwp.csv"
};

const STACK_COLS = {
  search_cols: ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad"],
  output_cols: ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad", "Severity", "Docs URL", "Applies To", "Status", "Verified At"]
};

const UNTRUNCATED_COLS = new Set([
  "Code Example Good", "Code Example Bad", "Code Good", "Code Bad",
  "Implementation Checklist", "Design System Variables", "CSS Import",
  "Tailwind Config", "GSAP Snippet"
]);

// RFC 4180 compliant CSV parser
function parseCSV(content) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal.trim());
      if (currentRow.some(c => c.length > 0)) rows.push(currentRow);
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(c => c.length > 0)) rows.push(currentRow);
  }
  if (rows.length === 0) return [];
  
  const headers = rows[0];
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = r[idx] || ''; });
    return obj;
  });
}

// Tokenizer & BM25 Scoring
const STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was', 'were', 'will']);

function tokenize(text) {
  if (!text) return [];
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

class BM25 {
  constructor(docs, searchCols, k1 = 1.5, b = 0.75) {
    this.docs = docs;
    this.searchCols = searchCols;
    this.k1 = k1;
    this.b = b;
    this.docTokens = [];
    this.docLengths = [];
    this.avgDocLength = 0;
    this.df = new Map();
    this.N = docs.length;
    this.buildIndex();
  }

  buildIndex() {
    let totalLength = 0;
    for (const doc of this.docs) {
      const text = this.searchCols.map(c => doc[c] || '').join(' ');
      const tokens = tokenize(text);
      this.docTokens.push(tokens);
      this.docLengths.push(tokens.length);
      totalLength += tokens.length;

      const uniqueTokens = new Set(tokens);
      for (const t of uniqueTokens) {
        this.df.set(t, (this.df.get(t) || 0) + 1);
      }
    }
    this.avgDocLength = this.N > 0 ? totalLength / this.N : 0;
  }

  score(queryTokens) {
    const scores = new Array(this.N).fill(0);
    for (const q of queryTokens) {
      const df = this.df.get(q) || 0;
      if (df === 0) continue;
      const idf = Math.log((this.N - df + 0.5) / (df + 0.5) + 1.0);

      for (let i = 0; i < this.N; i++) {
        const tokens = this.docTokens[i];
        const tf = tokens.filter(t => t === q).length;
        if (tf === 0) continue;
        const len = this.docLengths[i];
        const denom = tf + this.k1 * (1 - this.b + this.b * (len / (this.avgDocLength || 1)));
        scores[i] += idf * ((tf * (this.k1 + 1)) / denom);
      }
    }
    return scores;
  }
}

// Auto-detect domain based on query keywords
function autoDetectDomain(query) {
  const q = query.toLowerCase();
  if (/style|bento|glass|brutal|minimal|neumorph|dark mode|clean|gradient|retro/i.test(q)) return 'style';
  if (/color|palette|primary|secondary|accent|background|card|theme/i.test(q)) return 'color';
  if (/chart|graph|plot|visualiz|data|metric|funnel|scatter/i.test(q)) return 'chart';
  if (/landing|hero|cta|social proof|pricing|feature|section/i.test(q)) return 'landing';
  if (/product|saas|fintech|ecommerce|health|portal|dashboard/i.test(q)) return 'product';
  if (/accessib|contrast|focus|aria|keyboard|touch|tap|a11y/i.test(q)) return 'ux';
  if (/font|typograph|heading|serif|sans|inter|geist|vazir/i.test(q)) return 'typography';
  if (/icon|lucide|svg|heroicon|glyph/i.test(q)) return 'icons';
  if (/animation|gsap|scrolltrigger|motion|stagger|transition/i.test(q)) return 'gsap';
  if (/react|memo|useeffect|usecallback|suspense|virtual/i.test(q)) return 'react';
  return 'product';
}

function search(query, domain = null, maxResults = 3) {
  let autoDetected = false;
  if (!domain || !CSV_CONFIG[domain]) {
    domain = autoDetectDomain(query);
    autoDetected = true;
  }

  const config = CSV_CONFIG[domain];
  const filePath = path.join(DATA_DIR, config.file);
  if (!fs.existsSync(filePath)) {
    return { error: `File not found: ${filePath}` };
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const docs = parseCSV(raw);
  if (docs.length === 0) return { domain, query, count: 0, results: [] };

  const bm25 = new BM25(docs, config.search_cols);
  const qTokens = tokenize(query);
  const scores = bm25.score(qTokens);

  const ranked = docs
    .map((doc, idx) => ({ doc, score: scores[idx] }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => {
      const res = {};
      for (const col of config.output_cols) {
        if (item.doc[col] !== undefined) res[col] = item.doc[col];
      }
      return res;
    });

  // Fallback if 0 results
  if (ranked.length === 0 && docs.length > 0) {
    const fallback = docs.slice(0, 1).map(doc => {
      const res = {};
      for (const col of config.output_cols) {
        if (doc[col] !== undefined) res[col] = doc[col];
      }
      return res;
    });
    return {
      domain,
      query,
      file: config.file,
      count: 0,
      auto_detected: autoDetected,
      suggestions: docs.slice(0, 3).map(d => d[config.output_cols[0]]),
      results: []
    };
  }

  return {
    domain,
    query,
    file: config.file,
    count: ranked.length,
    auto_detected: autoDetected,
    results: ranked
  };
}

function searchStack(query, stack, maxResults = 3) {
  const relPath = STACK_FILES[stack];
  if (!relPath) return { error: `Unknown stack: ${stack}. Available: ${Object.keys(STACK_FILES).join(', ')}` };

  const filePath = path.join(DATA_DIR, relPath);
  if (!fs.existsSync(filePath)) return { error: `Stack file not found: ${filePath}` };

  const raw = fs.readFileSync(filePath, 'utf8');
  const docs = parseCSV(raw);
  const bm25 = new BM25(docs, STACK_COLS.search_cols);
  const qTokens = tokenize(query);
  const scores = bm25.score(qTokens);

  const ranked = docs
    .map((doc, idx) => ({ doc, score: scores[idx] }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => {
      const res = {};
      for (const col of STACK_COLS.output_cols) {
        if (item.doc[col] !== undefined) res[col] = item.doc[col];
      }
      return res;
    });

  return {
    stack,
    query,
    file: relPath,
    count: ranked.length,
    results: ranked.length > 0 ? ranked : docs.slice(0, 1)
  };
}

// Design System Generator with Dials (Variance, Motion, Density)
function generateDesignSystem(query, projectName = "My Project", options = {}) {
  const { variance = 5, motion = 5, density = 5, outputDir = null, page = null, persist = false, force = false } = options;

  const productRes = search(query, 'product', 1);
  const styleRes = search(query, 'style', 2);
  const colorRes = search(query, 'color', 2);
  const landingRes = search(query, 'landing', 1);
  const typoRes = search(query, 'typography', 1);
  const gsapRes = search(motion > 7 ? 'Complex' : motion < 4 ? 'Subtle' : 'Standard', 'gsap', 1);

  const product = (productRes.results && productRes.results[0]) || {};
  const style = (styleRes.results && styleRes.results[0]) || {};
  const color = (colorRes.results && colorRes.results[0]) || {};
  const landing = (landingRes.results && landingRes.results[0]) || {};
  const typo = (typoRes.results && typoRes.results[0]) || {};
  const gsap = (gsapRes.results && gsapRes.results[0]) || {};

  // Spacing based on Density dial (1-10)
  let spacingScale = {
    xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", "2xl": "48px", "3xl": "64px"
  };
  if (density <= 3) {
    spacingScale = { xs: "4px", sm: "8px", md: "24px", lg: "32px", xl: "48px", "2xl": "64px", "3xl": "96px" };
  } else if (density >= 8) {
    spacingScale = { xs: "2px", sm: "4px", md: "8px", lg: "12px", xl: "16px", "2xl": "24px", "3xl": "32px" };
  }

  const ds = {
    project: projectName,
    query,
    dials: { variance, motion, density },
    pattern: {
      name: landing['Pattern Name'] || "Hero-Centric Conversion Flow",
      sectionOrder: landing['Section Order'] || "Hero -> Features -> Social Proof -> Pricing -> CTA -> Footer",
      ctaPlacement: landing['Primary CTA Placement'] || "Above the fold & repeated after social proof"
    },
    style: {
      name: style['Style ID'] || "Modern Clean Editorial",
      category: style['Style Category'] || "Minimalist / Modern",
      keywords: style['Keywords'] || "Clean, high contrast, generous whitespace, subtle depth",
      effects: style['Effects & Animation'] || "Subtle shadows, smooth spring transitions, gentle hover lifts",
      performance: style['Performance'] || "cost: low",
      accessibility: style['Accessibility'] || "risk: low; WCAG AA compliant"
    },
    colors: {
      primary: color['Primary'] || "#1f3d3a",
      onPrimary: color['On Primary'] || "#ffffff",
      secondary: color['Secondary'] || "#bb7462",
      onSecondary: color['On Secondary'] || "#ffffff",
      accent: color['Accent'] || "#1f3d3a",
      onAccent: color['On Accent'] || "#ffffff",
      background: color['Background'] || "#fafaf8",
      foreground: color['Foreground'] || "#1e1e1e",
      card: color['Card'] || "#ffffff",
      cardForeground: color['Card Foreground'] || "#1e1e1e",
      muted: color['Muted'] || "#f2f7f6",
      mutedForeground: color['Muted Foreground'] || "#6b6b6b",
      border: color['Border'] || "#e5e5e2"
    },
    typography: {
      headingFont: typo['Heading Font'] || "Vazirmatn / Peyda (Persian) / Inter (Latin)",
      bodyFont: typo['Body Font'] || "Vazirmatn (Persian) / Inter (Latin)",
      pairingName: typo['Font Pairing Name'] || "Modern Geometric Sans",
      lineHeightHeadings: "1.35 - 1.5",
      lineHeightBody: "1.75 - 1.9",
      tracking: "0em (normal; strictly no negative tracking in Persian)"
    },
    spacing: spacingScale,
    motionSnippet: gsap['GSAP Snippet'] || "gsap.from(el, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' })",
    antiPatterns: [
      "No emojis as UI icons (strictly use Lucide or clean SVG icons)",
      "No negative letter-spacing in Persian / RTL typography",
      "No parent overflow:hidden on sticky stacking sections",
      "No generic AI purple/pink gradients without explicit brand palette matching",
      "No broken touch targets (<44x44px on mobile)"
    ]
  };

  // Markdown Formatted Output
  const markdown = `
# Design System: ${ds.project}
Generated for: "${ds.query}"
Dials: Variance ${variance}/10 | Motion ${motion}/10 | Density ${density}/10

## 1. Pattern & Layout Structure
- **Pattern:** ${ds.pattern.name}
- **Section Order:** ${ds.pattern.sectionOrder}
- **Primary CTA:** ${ds.pattern.ctaPlacement}

## 2. Visual Style & Craft
- **Style:** ${ds.style.name} (${ds.style.category})
- **Keywords:** ${ds.style.keywords}
- **Effects & Motion:** ${ds.style.effects}
- **Performance / A11y:** ${ds.style.performance} | ${ds.style.accessibility}

## 3. Color Tokens
- Primary: \`${ds.colors.primary}\` (On: \`${ds.colors.onPrimary}\`)
- Secondary: \`${ds.colors.secondary}\` (On: \`${ds.colors.onSecondary}\`)
- Accent / CTA: \`${ds.colors.accent}\` (On: \`${ds.colors.onAccent}\`)
- Background: \`${ds.colors.background}\`
- Foreground / Text: \`${ds.colors.foreground}\`
- Card / Surface: \`${ds.colors.card}\`
- Muted / Secondary Text: \`${ds.colors.mutedForeground}\`
- Border: \`${ds.colors.border}\`

## 4. Typography Scale & Physics
- **Heading Font:** ${ds.typography.headingFont} (Leading: ${ds.typography.lineHeightHeadings})
- **Body Font:** ${ds.typography.bodyFont} (Leading: ${ds.typography.lineHeightBody})
- **Tracking:** ${ds.typography.tracking}

## 5. Spacing System (Density Tier: ${density <= 3 ? 'Spacious' : density >= 8 ? 'Dense' : 'Standard'})
- xs: \`${ds.spacing.xs}\` | sm: \`${ds.spacing.sm}\` | md: \`${ds.spacing.md}\` | lg: \`${ds.spacing.lg}\` | xl: \`${ds.spacing.xl}\` | 2xl: \`${ds.spacing['2xl']}\`

## 6. Motion Snippet (GSAP Intensity: ${motion > 7 ? 'Complex' : motion < 4 ? 'Subtle' : 'Standard'})
\`\`\`javascript
${ds.motionSnippet}
\`\`\`

## 7. Strict Anti-Patterns to Avoid
${ds.antiPatterns.map(a => `- ⚠️ ${a}`).join('\n')}
`.trim();

  // Handle persistence if requested
  if (persist && outputDir) {
    const slug = projectName.toLowerCase().replace(/[^\w-]+/g, '-');
    const targetDir = path.join(outputDir, 'design-system', slug);
    const masterPath = path.join(targetDir, 'MASTER.md');
    fs.mkdirSync(path.join(targetDir, 'pages'), { recursive: true });

    if (!fs.existsSync(masterPath) || force) {
      fs.writeFileSync(masterPath, markdown, 'utf8');
      ds.persistence = { status: 'created', file: masterPath };
    } else {
      ds.persistence = { status: 'skipped_exists', file: masterPath };
    }

    if (page) {
      const pageFile = path.join(targetDir, 'pages', `${page}.md`);
      if (!fs.existsSync(pageFile) || force) {
        fs.writeFileSync(pageFile, `# Page Overrides: ${page}\n\nInherits from MASTER.md with page-specific adaptations.\n`, 'utf8');
        ds.persistence.pageFile = pageFile;
      }
    }
  }

  return { text: markdown, data: ds };
}

// CLI Execution & Flag Parsing
function runCLI() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
UI/UX Pro Max & Frontend Replicator Search Engine
Usage:
  node search.mjs "<query>" [--domain <domain>] [--stack <stack>] [-n <max>]
  node search.mjs "<query>" --design-system [-p "Project Name"] [--variance 1-10] [--motion 1-10] [--density 1-10]
  node search.mjs "<query>" --design-system --persist -p "Project Name" --output-dir "<path>"
  node search.mjs "<query>" --json
`);
    process.exit(0);
  }

  let query = '';
  let domain = null;
  let stack = null;
  let isDesignSystem = false;
  let projectName = "My Project";
  let variance = 5;
  let motion = 5;
  let density = 5;
  let maxResults = 3;
  let isJson = false;
  let persist = false;
  let outputDir = null;
  let page = null;
  let force = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--domain' || arg === '-d') domain = args[++i];
    else if (arg === '--stack' || arg === '-s') stack = args[++i];
    else if (arg === '--design-system' || arg === '-ds') isDesignSystem = true;
    else if (arg === '-p' || arg === '--project') projectName = args[++i];
    else if (arg === '--variance') variance = parseInt(args[++i], 10);
    else if (arg === '--motion') motion = parseInt(args[++i], 10);
    else if (arg === '--density') density = parseInt(args[++i], 10);
    else if (arg === '-n' || arg === '--max-results') maxResults = parseInt(args[++i], 10);
    else if (arg === '--json') isJson = true;
    else if (arg === '--persist') persist = true;
    else if (arg === '--output-dir') outputDir = args[++i];
    else if (arg === '--page') page = args[++i];
    else if (arg === '--force') force = true;
    else if (!arg.startsWith('-') && !query) query = arg;
    else if (!arg.startsWith('-')) query += ' ' + arg;
  }

  if (isDesignSystem) {
    const res = generateDesignSystem(query, projectName, { variance, motion, density, persist, outputDir, page, force });
    if (isJson) {
      console.log(JSON.stringify(res.data, null, 2));
    } else {
      console.log(res.text);
    }
    return;
  }

  if (stack) {
    const res = searchStack(query, stack, maxResults);
    if (isJson) {
      console.log(JSON.stringify(res, null, 2));
      return;
    }
    console.log(`\n## UI Pro Max Stack Guidelines: ${stack.toUpperCase()}\nQuery: "${query}" | Found: ${res.count} results\n`);
    res.results.forEach((row, i) => {
      console.log(`### Result ${i + 1}: ${row.Guideline || row.Category}`);
      for (const [k, v] of Object.entries(row)) {
        if (!v) continue;
        const displayVal = (!UNTRUNCATED_COLS.has(k) && v.length > 300) ? v.slice(0, 300) + '...' : v;
        console.log(`- **${k}:** ${displayVal}`);
      }
      console.log('');
    });
    return;
  }

  const res = search(query, domain, maxResults);
  if (isJson) {
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  console.log(`\n## UI Pro Max Search Results (${res.domain.toUpperCase()}${res.auto_detected ? ' - auto-detected' : ''})\nQuery: "${query}" | Found: ${res.count} results\n`);
  if (res.count === 0) {
    console.log("No exact matches found. Suggestions: " + (res.suggestions || []).join(', '));
    return;
  }

  res.results.forEach((row, i) => {
    console.log(`### Result ${i + 1}`);
    for (const [k, v] of Object.entries(row)) {
      if (!v) continue;
      const displayVal = (!UNTRUNCATED_COLS.has(k) && v.length > 300) ? v.slice(0, 300) + '...' : v;
      console.log(`- **${k}:** ${displayVal}`);
    }
    console.log('');
  });
}

runCLI();
