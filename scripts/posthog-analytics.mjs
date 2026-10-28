import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

// Read .env.local safely
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      env[trimmed.substring(0, eqIdx).trim()] = trimmed.substring(eqIdx + 1).trim();
    }
  }
  return env;
}

const env = loadEnv();
const API_KEY = env.POSTHOG_PERSONAL_API_KEY;
const PROJECT_ID = env.POSTHOG_PROJECT_ID || '324405';
const HOST = 'eu.posthog.com';

if (!API_KEY) {
  console.error('Error: POSTHOG_PERSONAL_API_KEY is not defined in .env.local');
  process.exit(1);
}

function posthogRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: HOST,
      path: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'User-Agent': 'Bloomia-Assistant-CLI',
        ...(postData
          ? {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
            }
          : {}),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runReport() {
  console.log(`\n======================================================`);
  console.log(`📊 گزارش تحلیل هوشمند بلومیا کلاب (PostHog Analytics)`);
  console.log(`پروژه: ${PROJECT_ID} | هاست: ${HOST}`);
  console.log(`======================================================\n`);

  // 1. Fetch recent events summary
  const eventsRes = await posthogRequest(`/api/projects/${PROJECT_ID}/events/?limit=20`);
  if (eventsRes.status !== 200 || !eventsRes.data.results) {
    console.error('Failed to fetch events:', eventsRes);
    return;
  }

  const events = eventsRes.data.results;
  console.log(`📌 تعداد کل رویدادهای اخیر ثبت‌شده: ${events.length}`);

  const eventCounts = {};
  events.forEach((e) => {
    eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
  });

  console.log('\nتفکیک نوع رویدادها:');
  for (const [evt, count] of Object.entries(eventCounts)) {
    console.log(`  • ${evt}: ${count} بار`);
  }

  console.log('\nآخرین رویدادهای زنده:');
  events.slice(0, 5).forEach((e, idx) => {
    const time = new Date(e.timestamp).toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
    const url = e.properties?.$current_url || e.properties?.$pathname || '-';
    console.log(`  ${idx + 1}. [${e.event}] در ${url} (زمان: ${time})`);
  });

  console.log('\n======================================================\n');
}

runReport().catch((err) => {
  console.error('Execution error:', err);
});
