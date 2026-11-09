import fs from 'fs';
import path from 'path';
import { createClient as createSanity } from '@sanity/client';
import { createClient as createSupabase } from '@supabase/supabase-js';
import { env } from './_env.mjs';
import { upsertCoachBackup } from '../../src/lib/coach-sync.mjs';

const pdfPath = path.resolve(process.cwd(), 'public/documents/welcome-packets/payam_esmi_welcome_packet.pdf');

if (!fs.existsSync(pdfPath)) {
  console.error('❌ PDF not found at:', pdfPath);
  process.exit(1);
}

const stats = fs.statSync(pdfPath);
console.log(`📄 PDF found (${stats.size} bytes). Preparing upload to Sanity...`);

if (!env.sanityToken) {
  console.error('❌ SANITY_WRITE_TOKEN is missing.');
  process.exit(1);
}

const sanity = createSanity({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: env.sanityToken,
});

async function main() {
  console.log('🚀 Uploading new Welcome Packet PDF to Sanity Asset Storage...');
  const fileAsset = await sanity.assets.upload('file', fs.createReadStream(pdfPath), {
    filename: 'payam_esmi_welcome_packet.pdf',
    contentType: 'application/pdf',
  });
  console.log('✅ Uploaded PDF asset:', fileAsset._id, fileAsset.url);

  console.log('🔍 Fetching current coach-profile-payam-esmi doc...');
  const currentDoc = await sanity.fetch('*[_type == "coach" && slug.current == "payam-esmi"][0]');
  if (!currentDoc) {
    throw new Error('Coach doc coach-profile-payam-esmi not found in Sanity!');
  }

  // Update services: change intro-call to isFree: true, price: 0
  const updatedServices = (currentDoc.services || []).map((srv) => {
    if (srv.id === 'intro-call' || srv._key === 'srv_intro-call_5t99') {
      return {
        ...srv,
        title: 'جلسه آشنایی و معارفه (رایگان)',
        duration: '۳۰ دقیقه',
        description:
          'یک گفتگوی آنلاین ۳۰ دقیقه‌ای رایگان برای بررسی موشکافانه مسئله شما، سنجش نیاز به کوچینگ یا مشاوره، و بررسی تناسب متدولوژی همراهی با اهدافتان.',
        price: 0,
        isFree: true,
      };
    }
    return srv;
  });

  // Update welcomePacket
  const updatedWelcomePacket = {
    ...(currentDoc.welcomePacket || {}),
    title: 'بسته راهنمای خدمات کوچینگ با پیام اسمی',
    subtitle:
      'راهنمای جامع ورود به دنیای کوچینگ هدفمندی و بهره‌وری پایدار؛ اصول همکاری، منشور محرمانگی، ساختار جلسات و نقشه راه تبدیل مشغله‌های فرساینده به اثرگذاری و آرامش با پیام اسمی.',
    fileUrl: fileAsset.url,
    buttonText: 'دریافت بسته راهنما (PDF)',
    features: [
      'آشنایی با متدولوژی کوچینگ هدفمندی، مدیریت زمان و انضباط فردی',
      'شفافیت در شرایط، ضوابط همکاری، زمان‌بندی و منشور محرمانگی',
      'تضمین کیفیت و بازگشت کامل ۱۰۰٪ وجه تا پایان جلسه دوم',
      'راهنمای گام‌به‌گام اولین تمرین و آمادگی برای جلسه معارفه رایگان',
    ],
  };

  console.log('📝 Patching coach-profile-payam-esmi in Sanity...');
  const patched = await sanity
    .patch('coach-profile-payam-esmi')
    .set({
      services: updatedServices,
      welcomePacket: updatedWelcomePacket,
    })
    .commit();

  console.log('✅ Sanity patch committed successfully. Revision:', patched._rev);

  // If a draft exists, remove it or update it too so it does not override published
  try {
    const draft = await sanity.getDocument('drafts.coach-profile-payam-esmi');
    if (draft) {
      console.log('🗑️ Removing outdated draft doc drafts.coach-profile-payam-esmi...');
      await sanity.delete('drafts.coach-profile-payam-esmi');
      console.log('✅ Draft removed.');
    }
  } catch (err) {
    console.log('No draft found or error checking draft:', err.message);
  }

  // Also sync to Supabase backup if configured
  if (env.supabaseServiceKey) {
    console.log('🔄 Syncing updated coach to Supabase...');
    try {
      const supabase = createSupabase(env.supabaseUrl, env.supabaseServiceKey, {
        auth: { persistSession: false },
      });
      const updatedFullCoach = await sanity.fetch('*[_type == "coach" && slug.current == "payam-esmi"][0]');
      const res = await upsertCoachBackup(supabase, updatedFullCoach);
      console.log('✅ Supabase sync result:', res);
    } catch (sbErr) {
      console.warn('⚠️ Supabase sync warning:', sbErr.message);
    }
  } else {
    console.log('ℹ️ SUPABASE_SERVICE_ROLE_KEY not configured, skipping Supabase sync.');
  }

  console.log('\n🎉 Successfully updated Payam Esmi in Sanity!');
}

main().catch((err) => {
  console.error('❌ Error updating Payam Esmi:', err);
  process.exit(1);
});
