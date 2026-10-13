/**
 * Verifies or creates the Sanity webhook for coaches.
 * Run with: node scripts/sanity/ensure-coach-webhook.mjs
 */
import crypto from 'crypto';
import { env } from './_env.mjs';

async function main() {
  if (!env.sanityToken) {
    console.error('SANITY_WRITE_TOKEN is missing');
    process.exit(1);
  }

  const res = await fetch(`https://api.sanity.io/v2025-02-19/hooks/projects/${env.sanityProjectId}`, {
    headers: { Authorization: `Bearer ${env.sanityToken}` },
  });

  if (!res.ok) {
    console.error('Failed to fetch hooks:', res.status, await res.text());
    process.exit(1);
  }

  const hooks = await res.json();
  const existing = hooks.find((h) => h.name === 'bloomia-coach-webhook' || h.url?.includes('sanity-coach'));

  if (existing) {
    console.log(`Sanity coach webhook already exists (id: ${existing.id}).`);
    console.log(`URL: ${existing.url}`);
    console.log(`Filter: ${existing.rule?.filter}`);
    console.log(`Status: ${existing.isDisabled ? 'DISABLED' : 'ACTIVE'}`);
    return;
  }

  const secret = process.env.SANITY_WEBHOOK_SECRET || crypto.randomBytes(32).toString('hex');
  const payload = {
    type: 'document',
    name: 'bloomia-coach-webhook',
    url: 'https://bloomiaclub.com/api/webhooks/sanity-coach',
    dataset: env.sanityDataset || 'production',
    apiVersion: 'v2024-01-01',
    httpMethod: 'POST',
    rule: {
      on: ['create', 'update', 'delete'],
      filter: '_type == "coach"',
      projection: '{_id, "slug": coalesce(slug.current, before().slug.current), "operation": delta::operation()}',
    },
    secret,
  };

  const createRes = await fetch(`https://api.sanity.io/v2025-02-19/hooks/projects/${env.sanityProjectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.sanityToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!createRes.ok) {
    console.error('Failed to create hook:', createRes.status, await createRes.text());
    process.exit(1);
  }

  const created = await createRes.json();
  console.log(`Created webhook (id: ${created.id}) with secret: ${secret}`);
}

main().catch(console.error);
