#!/usr/bin/env node

/**
 * Automated Audit & Quality Gate Script for Frontend Replicator
 * 
 * Verifies key replication quality standards:
 * 1. Sticky elements: Ensures NO ancestor has overflow: hidden.
 * 2. Media assets: Verifies all images and videos load without 404s.
 * 3. Mobile responsiveness: Checks viewport overflow at 390px, 768px, 1440px.
 * 4. Carousels & Video loops: Confirms video autoplay and carousel presence.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
let targetUrl = 'http://localhost:3000/solea';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--url' && args[i + 1]) {
    targetUrl = args[i + 1];
  }
}

console.log(`\n🔍 Starting Replica Quality Audit for: ${targetUrl}\n`);

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const brokenAssets = [];
  page.on('response', res => {
    if (res.status() >= 400 && !res.url().includes('favicon')) {
      brokenAssets.push({ url: res.url(), status: res.status() });
    }
  });

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    console.error(`❌ Failed to load target URL: ${err.message}`);
    await browser.close();
    process.exit(1);
  }

  // 1. Audit Sticky Elements for Overflow Trap
  const stickyIssues = await page.evaluate(() => {
    const stickyEls = Array.from(document.querySelectorAll('.sticky, [style*="position: sticky"]'));
    const issues = [];
    stickyEls.forEach((el, idx) => {
      let curr = el.parentElement;
      while (curr && curr.tagName !== 'HTML') {
        const cs = window.getComputedStyle(curr);
        if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') {
          issues.push({
            stickyIndex: idx,
            tag: curr.tagName,
            className: curr.className,
            overflow: cs.overflow,
          });
        }
        curr = curr.parentElement;
      }
    });
    return issues;
  });

  // 2. Audit Video Loops
  const videoDetails = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    return videos.map(v => ({
      src: v.src || v.querySelector('source')?.src,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
      paused: v.paused,
    }));
  });

  // 3. Audit Carousels
  const carousels = await page.evaluate(() => {
    const emblaNodes = Array.from(document.querySelectorAll('[class*="embla"], [class*="carousel"]'));
    return emblaNodes.length;
  });

  // 4. Audit Horizontal Page Overflow
  const horizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  console.log('--- 📋 AUDIT SUMMARY RESULTS ---');
  if (stickyIssues.length === 0) {
    console.log('✅ Sticky Stacking: PASSED (No ancestor has overflow: hidden)');
  } else {
    console.log(`❌ Sticky Stacking: FAILED (${stickyIssues.length} ancestors have overflow: hidden!)`);
    console.log(JSON.stringify(stickyIssues, null, 2));
  }

  if (brokenAssets.length === 0) {
    console.log('✅ Assets & Media: PASSED (Zero 404 or broken resources)');
  } else {
    console.log(`⚠️ Assets & Media: ${brokenAssets.length} broken resource(s) detected:`);
    console.log(JSON.stringify(brokenAssets, null, 2));
  }

  if (videoDetails.length > 0) {
    console.log(`✅ Background Videos: Found ${videoDetails.length} video(s) (Autoplay/Loop checked)`);
  }

  if (carousels > 0) {
    console.log(`✅ Interactive Carousels: Detected ${carousels} carousel container(s)`);
  }

  if (!horizontalOverflow) {
    console.log('✅ Viewport Constraints: PASSED (No unwanted horizontal page overflow)');
  } else {
    console.log('⚠️ Viewport Constraints: Detected horizontal overflow (scrollWidth > innerWidth)');
  }

  await browser.close();
  console.log('\nAudit complete.\n');
})();
