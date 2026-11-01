import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateIcfPdf() {
  console.log('Generating official ICF Core Competencies PDF...');

  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>منشور شایستگی‌های بنیادین کوچینگ (ICF) | بلومیا کلاب</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #fafaf8;
      color: #1e1e1e;
      line-height: 1.8;
      padding: 0;
      margin: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 24mm 20mm;
      margin: 0 auto;
      background: #ffffff;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: auto;
    }

    /* Cover Page */
    .cover-container {
      background: linear-gradient(145deg, #10201e 0%, #1f3d3a 60%, #152b28 100%);
      color: #ffffff;
      border-radius: 20px;
      padding: 40px 36px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(201, 157, 102, 0.3);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .brand-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding-bottom: 20px;
    }

    .brand-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #ffffff;
    }

    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 30px;
      background: rgba(201, 157, 102, 0.15);
      border: 1px solid #c99d66;
      color: #ecd4a8;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .cover-hero {
      text-align: center;
      margin: auto 0;
      padding: 20px 0;
    }

    .cover-icon-circle {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #c99d66;
      background: rgba(201, 157, 102, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 28px;
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .cover-subtitle-en {
      font-size: 14px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #ecd4a8;
      margin-bottom: 14px;
      font-weight: 600;
    }

    .cover-title-fa {
      font-size: 34px;
      font-weight: 900;
      line-height: 1.4;
      color: #ffffff;
      margin-bottom: 18px;
    }

    .cover-desc {
      font-size: 16px;
      color: #dfece9;
      max-width: 580px;
      margin: 0 auto;
      line-height: 1.9;
    }

    .cover-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }

    /* Content Pages */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #1f3d3a;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }

    .header-bar .doc-title {
      font-size: 14px;
      font-weight: 700;
      color: #1f3d3a;
    }

    .header-bar .meta {
      font-size: 12px;
      color: #6b6b6b;
    }

    .page-footer {
      border-top: 1px solid #e5e5e2;
      padding-top: 12px;
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #888888;
    }

    h2.section-heading {
      font-size: 22px;
      font-weight: 800;
      color: #1f3d3a;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h2.section-heading::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 22px;
      background: #1f3d3a;
      border-radius: 3px;
    }

    .lead-box {
      background: #f2f7f6;
      border: 1px solid #dfece9;
      border-right: 4px solid #1f3d3a;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 22px;
      font-size: 14px;
      color: #1f3d3a;
      line-height: 1.8;
    }

    .competency-card {
      background: #fafaf8;
      border: 1px solid #e5e5e2;
      border-radius: 12px;
      padding: 16px 18px;
      margin-bottom: 14px;
      break-inside: avoid;
    }

    .comp-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .comp-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #1f3d3a;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .comp-title-fa {
      font-size: 16px;
      font-weight: 800;
      color: #1e1e1e;
    }

    .comp-title-en {
      font-size: 11px;
      color: #6b6b6b;
      margin-top: 1px;
      font-family: sans-serif;
    }

    .comp-body {
      font-size: 13px;
      color: #4a4a4a;
      padding-right: 44px;
      line-height: 1.75;
    }

    .group-label {
      font-size: 15px;
      font-weight: 700;
      color: #1f3d3a;
      background: #dfece9;
      display: inline-block;
      padding: 4px 14px;
      border-radius: 20px;
      margin-top: 8px;
      margin-bottom: 14px;
    }

    .ethics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 12px;
      margin-bottom: 20px;
    }

    .ethics-item {
      background: #fafaf8;
      border: 1px solid #e5e5e2;
      border-radius: 10px;
      padding: 14px 16px;
    }

    .ethics-item h4 {
      font-size: 14px;
      font-weight: 700;
      color: #1f3d3a;
      margin-bottom: 6px;
    }

    .ethics-item p {
      font-size: 12.5px;
      color: #555555;
      line-height: 1.7;
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      font-size: 12.5px;
    }

    .comparison-table th {
      background: #1f3d3a;
      color: #ffffff;
      padding: 10px 14px;
      text-align: right;
      font-weight: 700;
    }

    .comparison-table td {
      border: 1px solid #e5e5e2;
      padding: 10px 14px;
      color: #333333;
    }

    .comparison-table tr:nth-child(even) td {
      background: #fafaf8;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page">
    <div class="cover-container">
      <div class="brand-header">
        <div class="brand-title">بلومیا کلاب • Bloomia Club</div>
        <div class="badge">سند رسمی فدراسیون بین‌المللی کوچینگ (ICF)</div>
      </div>

      <div class="cover-hero">
        <div class="cover-icon-circle">ICF</div>
        <div class="cover-subtitle-en">International Coaching Federation • Core Competencies</div>
        <h1 class="cover-title-fa">
          منشور شایستگی‌های بنیادین
          <br />
          و استانداردهای اخلاقی کوچینگ
        </h1>
        <p class="cover-desc">
          راهنمای جامع آشنایی با شایستگی‌های هشت‌گانه جهانی، تعهد محرمانگی و منشور حرفه‌ای کوچینگ؛
          استاندارد طلایی همکاری میان مراجع و کوچ در پلتفرم بین‌المللی بلومیا کلاب.
        </p>
      </div>

      <div class="cover-footer">
        <div>مرجع رسمی: فدراسیون بین‌المللی کوچینگ (coachingfederation.org)</div>
        <div>انتشار اختصاصی در کتابخانه بلومیا کلاب • نسخه ۲۰۲۶</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: CORE COMPETENCIES 1-4 -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="doc-title">منشور شایستگی‌های بنیادین کوچینگ (ICF) • بخش اول</span>
        <span class="meta">بلومیا کلاب • bloomiaclub.com</span>
      </div>

      <h2 class="section-heading">مدل شایستگی‌های بنیادین هشت‌گانه ICF</h2>
      
      <div class="lead-box">
        فدراسیون بین‌المللی کوچینگ (ICF) به عنوان معتبرترین نهاد ناظر بر کوچینگ حرفه‌ای در جهان، مدل شایستگی‌های محوری را برای تعریف مهارت‌ها، رفتارها و رویکردهای اصیل یک کوچ استاندارد تدوین کرده است. این مدل تضمین می‌کند جلسات شما در بالاترین سطح امنیت روانی، کارآمدی و اخلاق برگزار شود.
      </div>

      <div class="group-label">بخش الف: پایه‌گذاری (Foundation)</div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۱</div>
          <div>
            <div class="comp-title-fa">پایبندی و نشان دادن اخلاق حرفه‌ای</div>
            <div class="comp-title-en">Demonstrates Ethical Practice</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ اصول اخلاقی و منشور ICF را در تمامی سطوح رفتاری، گفتاری و قراردادها درک و اعمال می‌کند. او تفاوت ظریف کوچینگ را با مشاوره، روان‌درمانی و آموزش می‌شناسد و محرمانگی ۱۰۰٪ اطلاعات مراجع را در تمام مراحل حفظ می‌نماید.
        </div>
      </div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۲</div>
          <div>
            <div class="comp-title-fa">تجسم ذهنیت کوچینگی</div>
            <div class="comp-title-en">Embodies a Coaching Mindset</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ ذهنیتی باز، کنجکاو، منعطف و متمرکز بر مراجع را پرورش می‌دهد. او مراجع را فردی کامل، توانمند، خلاق و مسئول زندگی خود می‌داند و از تحمیل نظرات یا پیش‌داوری‌های شخصی خودداری می‌کند.
        </div>
      </div>

      <div class="group-label">بخش ب: خلق مشترک رابطه (Co-Creating the Relationship)</div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۳</div>
          <div>
            <div class="comp-title-fa">برقراری و حفظ توافق‌نامه‌ها</div>
            <div class="comp-title-en">Establishes and Maintains Agreements</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ در همراهی با مراجع، اهداف کلان فرایند و هدف مشخص هر تک‌جلسه را شفاف می‌کند. مشخص می‌شود که مراجع می‌خواهد به چه نتیجه ملموسی برسد و چگونه موفقیت جلسه را ارزیابی خواهد کرد.
        </div>
      </div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۴</div>
          <div>
            <div class="comp-title-fa">پرورش اعتماد و امنیت روانی</div>
            <div class="comp-title-en">Cultivates Trust and Safety</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ فضایی امن و کاملاً عاری از قضاوت ایجاد می‌کند تا مراجع بتواند با آرامش و صداقت، آسیب‌پذیری‌ها، ترس‌ها، باورهای محدودکننده و رویاهای ناگفته‌اش را بدون نگرانی به اشتراک بگذارد.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div>استاندارد شایستگی‌های محوری فدراسیون بین‌المللی کوچینگ (ICF)</div>
      <div>صفحه ۲ از ۳</div>
    </div>
  </div>

  <!-- PAGE 3: CORE COMPETENCIES 5-8 & ETHICS & COMPARISON -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="doc-title">منشور شایستگی‌های بنیادین کوچینگ (ICF) • بخش دوم</span>
        <span class="meta">بلومیا کلاب • bloomiaclub.com</span>
      </div>

      <div class="group-label">بخش ج: ارتباط مؤثر (Communicating Effectively)</div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۵</div>
          <div>
            <div class="comp-title-fa">حفظ حضور کامل و پویا</div>
            <div class="comp-title-en">Maintains Presence</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ در سراسر جلسه کاملاً آگاه و حاضر است؛ او با شیوه‌ای باز، منعطف و مطمئن در لحظه «اکنون» با مراجع همراهی می‌کند و به سکوت‌ها و نوسانات انرژی مراجع فضا می‌دهد.
        </div>
      </div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۶</div>
          <div>
            <div class="comp-title-fa">گوش دادن فعال و عمیق</div>
            <div class="comp-title-en">Listens Actively</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ فراتر از کلمات، به لحن صدا، زبان بدن، احساسات ناگفته و زمینه‌های بافتی مراجع توجه می‌کند تا آنچه را مراجع ابراز می‌کند و آنچه ناگفته می‌ماند را عمیقاً درک کند.
        </div>
      </div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۷</div>
          <div>
            <div class="comp-title-fa">برانگیختن آگاهی و بینش نو</div>
            <div class="comp-title-en">Evokes Awareness</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ با طرح پرسش‌های قدرتمند، بازتاب استعاره‌ها و نگاه به الگوهای رفتاری، جرقه‌های فکری و بینش‌های عمیقی را برای شکستن بن‌بست‌ها و باورهای محدودکننده در مراجع خلق می‌کند.
        </div>
      </div>

      <div class="group-label">بخش د: تسهیل یادگیری و رشد (Cultivating Learning and Growth)</div>

      <div class="competency-card">
        <div class="comp-header">
          <div class="comp-num">۸</div>
          <div>
            <div class="comp-title-fa">تسهیل رشد و پایدارسازی تحول مراجع</div>
            <div class="comp-title-en">Facilitates Client Growth</div>
          </div>
        </div>
        <div class="comp-body">
          کوچ به مراجع کمک می‌کند تا بینش‌ها و آگاهی‌های به‌دست‌آمده را به برنامه اقدام مشخص و عملیاتی تبدیل کند؛ مسئولیت‌پذیری را در مراجع تثبیت کرده و دستاوردهای تحول را پایدار سازد.
        </div>
      </div>

      <h2 class="section-heading" style="margin-top: 20px;">تمایز کوچینگ حرفه‌ای با سایر رشته‌ها</h2>

      <table class="comparison-table">
        <thead>
          <tr>
            <th>حوزه</th>
            <th>تمرکز زمانی</th>
            <th>نقش متخصص</th>
            <th>هدف نهایی</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>کوچینگ (Coaching)</strong></td>
            <td>اکنون و آینده</td>
            <td>تسهیل‌گر و همراه هم‌سطح</td>
            <td>خلق وضوح، توانمندسازی و تحول اقدام‌محور</td>
          </tr>
          <tr>
            <td><strong>روان‌درمانی (Therapy)</strong></td>
            <td>گذشته و حال</td>
            <td>متخصص درمانگر بالینی</td>
            <td>التیام تروما و حل اختلالات روانی</td>
          </tr>
          <tr>
            <td><strong>مشاوره (Consulting)</strong></td>
            <td>حال و آینده</td>
            <td>ارائه‌دهنده راه‌حل و تجویز</td>
            <td>حل تخصصی یک مسئله فنی یا سازمانی</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-footer">
      <div>بلومیا کلاب • تضمین کیفیت و اخلاق حرفه‌ای کوچ‌های بین‌المللی ICF</div>
      <div>صفحه ۳ از ۳</div>
    </div>
  </div>

</body>
</html>`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(html, { waitUntil: 'networkidle' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  await browser.close();

  const outDir = path.resolve('public/documents/welcome-packets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const dest1 = path.join(outDir, 'icf-core-competencies.pdf');
  const dest2 = path.resolve('public/documents/icf-core-competencies.pdf');

  fs.writeFileSync(dest1, pdfBuffer);
  fs.writeFileSync(dest2, pdfBuffer);

  console.log(`✅ Successfully generated: ${dest1} (${pdfBuffer.length} bytes)`);
  console.log(`✅ Successfully generated: ${dest2} (${pdfBuffer.length} bytes)`);
}

generateIcfPdf().catch((err) => {
  console.error('Error generating ICF PDF:', err);
  process.exit(1);
});
