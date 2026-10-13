// Dev helper: decode a CDP Page.captureScreenshot JSON response into a jpeg file.
// usage: node scripts/dev/decode-shot.mjs <cdp-response.json|latest> <out.jpg>
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

let [, , input, output] = process.argv;

if (input === 'latest') {
  const dir = join(homedir(), '.cursor', 'browser-logs');
  const newest = readdirSync(dir)
    .filter((f) => f.startsWith('cdp-response-Page.captureScreenshot'))
    .map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)[0];
  input = join(dir, newest.f);
}

const raw = JSON.parse(readFileSync(input, 'utf8'));
const data = raw?.result?.data ?? raw?.data;
if (!data) {
  console.error('no image data in', input);
  process.exit(1);
}
writeFileSync(output, Buffer.from(data, 'base64'));
console.log('wrote', output);
