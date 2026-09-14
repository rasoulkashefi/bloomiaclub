import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Load environment variables from .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '7yjhdw88';
const dataset = process.env.REACT_APP_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN;

if (!token) {
  console.warn('⚠️ WARNING: SANITY_WRITE_TOKEN is not set. Publishing will fail unless write permissions exist.');
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImageAsset(filePath, alt = '', caption = '') {
  if (!filePath || !fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Image file not found at ${filePath}`);
    return null;
  }

  console.log(`📤 Uploading image asset: ${path.basename(filePath)}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt,
    caption,
  };
}

async function ensureAuthor(authorId, authorName, coachSlug, jobTitle) {
  let docId = authorId;
  if (!docId) {
    if (coachSlug) {
      docId = `coach-${coachSlug}`;
    } else if (authorName && (authorName.includes('آکادمی') || authorName.includes('بلومیا') || authorName.includes('تحریریه'))) {
      docId = 'author-bloomia-academy';
    } else {
      docId = 'author-bloomia-academy';
    }
  }
  
  const existing = await client.getDocument(docId).catch(() => null);
  if (existing) {
    console.log(`👤 Using existing author: ${existing.name} (${existing._id})`);
    return { _type: 'reference', _ref: existing._id };
  }

  const name = authorName || 'آکادمی بلومیا';
  console.log(`👤 Creating new author: ${name}...`);

  const created = await client.createIfNotExists({
    _id: docId,
    _type: 'author',
    name,
    slug: { _type: 'slug', current: coachSlug || name.toLowerCase().replace(/\s+/g, '-') },
    coachSlug: coachSlug || null,
    isCoach: !!coachSlug,
    isAi: false,
    jobTitle: jobTitle || 'کوچ حرفه‌ای بلومیا',
    bio: 'کوچ رسمی و تاییدشده در مجموعه بلومیا کلاب',
  });

  return { _type: 'reference', _ref: created._id };
}

async function ensureCategory(categoryTitle, categorySlug) {
  const title = categoryTitle || 'کوچینگ و رشد';
  const slugStr = categorySlug || 'coaching-growth';
  const docId = `category-${slugStr}`;

  const existing = await client.getDocument(docId).catch(() => null);
  if (existing) {
    console.log(`🏷️ Using existing category: ${existing.title} (${existing._id})`);
    return { _type: 'reference', _ref: existing._id };
  }

  console.log(`🏷️ Creating new category: ${title}...`);
  const created = await client.createIfNotExists({
    _id: docId,
    _type: 'category',
    title,
    slug: { _type: 'slug', current: slugStr },
    color: '#1f3d3a',
  });

  return { _type: 'reference', _ref: created._id };
}

async function buildPortableText(blocks) {
  const portableText = [];

  for (const block of blocks || []) {
    if (block.type === 'paragraph' || block.type === 'h2' || block.type === 'h3' || block.type === 'h4' || block.type === 'blockquote') {
      const style = block.type === 'paragraph' ? 'normal' : block.type;
      portableText.push({
        _type: 'block',
        style,
        children: [
          {
            _type: 'span',
            text: block.text || '',
            marks: block.marks || [],
          },
        ],
      });
    } else if (block.type === 'image') {
      const imgRef = await uploadImageAsset(block.filePath || block.imagePath, block.alt, block.caption);
      if (imgRef) portableText.push(imgRef);
    } else if (block.type === 'callout') {
      portableText.push({
        _type: 'callout',
        tone: block.tone || 'tip',
        title: block.title || 'نکته مهم',
        content: block.content || block.text || '',
      });
    } else if (block.type === 'keyTakeaways') {
      portableText.push({
        _type: 'keyTakeaways',
        title: block.title || 'نکات کلیدی این بخش',
        points: block.points || [],
      });
    } else if (block.type === 'highlightedStat') {
      portableText.push({
        _type: 'highlightedStat',
        number: block.number || '',
        label: block.label || '',
        source: block.source || '',
      });
    } else if (block.type === 'faqSection') {
      portableText.push({
        _type: 'faqSection',
        title: block.title || 'سوالات متداول',
        items: (block.items || []).map((item) => ({
          _type: 'object',
          question: item.question,
          answer: item.answer,
        })),
      });
    } else if (block.type === 'codeSnippet') {
      portableText.push({
        _type: 'codeSnippet',
        language: block.language || 'javascript',
        code: block.code || '',
      });
    } else if (block.type === 'videoEmbed') {
      portableText.push({
        _type: 'videoEmbed',
        provider: block.provider || 'aparat',
        videoId: block.videoId || '',
        title: block.title || '',
      });
    }
  }

  return portableText;
}

async function publishArticle(jsonFilePath) {
  if (!jsonFilePath) {
    console.error('❌ Usage: node scripts/sanity/publish-article.mjs <path-to-json-file>');
    process.exit(1);
  }

  const absolutePath = path.resolve(process.cwd(), jsonFilePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${absolutePath}`);
    process.exit(1);
  }

  console.log(`📄 Reading article payload from: ${absolutePath}...`);
  const rawData = fs.readFileSync(absolutePath, 'utf8');
  const payload = JSON.parse(rawData);

  // Upload Cover Image
  let mainImage = null;
  if (payload.coverImagePath) {
    mainImage = await uploadImageAsset(payload.coverImagePath, payload.coverImageAlt || payload.title, payload.coverImageCaption);
  }

  // Author & Category
  const authorRef = await ensureAuthor(payload.authorId, payload.authorName, payload.coachSlug, payload.jobTitle);
  const categoryRef = await ensureCategory(payload.categoryTitle, payload.categorySlug);

  // Convert PortableText
  console.log('🧱 Processing rich PortableText body blocks...');
  const bodyBlocks = await buildPortableText(payload.bodyBlocks);

  const docId = `post-${payload.slug}`;

  const postDocument = {
    _id: docId,
    _type: 'post',
    title: payload.title,
    slug: { _type: 'slug', current: payload.slug },
    excerpt: payload.excerpt,
    mainImage,
    author: authorRef,
    category: categoryRef,
    estimatedReadTime: payload.estimatedReadTime || 5,
    body: bodyBlocks,

    // SEO Suite
    metaTitle: payload.metaTitle || payload.title,
    metaDescription: payload.metaDescription || payload.excerpt,
    canonicalUrl: payload.canonicalUrl || `https://bloomiaclub.com/blog/${payload.slug}`,
    searchIntent: payload.searchIntent || 'informational',
    keywords: payload.tags || payload.keywords || [],

    // GEO AI Engine
    aiQuickAnswer: payload.aiQuickAnswer || '',
    focusEntity: payload.focusEntity || payload.title,
    semanticEntities: payload.semanticEntities || [],
    targetQuestions: payload.targetQuestions || [],

    // Workflow
    status: 'published',
    publishedAt: new Date().toISOString(),
    isFeatured: payload.isFeatured || false,
  };

  console.log(`🚀 Publishing post to Sanity CMS (Document ID: ${docId})...`);
  const result = await client.createOrReplace(postDocument);

  console.log(`✅ SUCCESS! Article successfully published to Sanity CMS.`);
  console.log(`📌 Document ID: ${result._id}`);
  console.log(`🌐 URL: https://bloomiaclub.com/blog/${payload.slug}`);
}

const targetJson = process.argv[2];
publishArticle(targetJson).catch((err) => {
  console.error('❌ Error publishing article to Sanity:', err);
  process.exit(1);
});
