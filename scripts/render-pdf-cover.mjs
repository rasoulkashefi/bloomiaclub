import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  const pdfPath = 'C:/Users/Mr Kashefi/.gemini/antigravity/brain/1b2895d9-f27d-4cc4-871e-7fb1915fbac2/.user_uploaded/media_1793544288830_95867858.pdf';
  if (!fs.existsSync(pdfPath)) {
    throw new Error('PDF not found at: ' + pdfPath);
  }

  // Also copy PDF to public/documents/welcome-packets/
  const destDir = path.resolve(process.cwd(), 'public/documents/welcome-packets');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const destPdf = path.join(destDir, 'fatemeh_darkhosh_welcome_packet.pdf');
  fs.copyFileSync(pdfPath, destPdf);
  console.log('✅ Copied PDF to:', destPdf);

  const pdfBytes = fs.readFileSync(pdfPath).toString('base64');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        </script>
      </head>
      <body style="margin:0; background:transparent;">
        <canvas id="pdf-canvas"></canvas>
        <script>
          async function render() {
            const raw = atob('${pdfBytes}');
            const uint8Array = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) {
              uint8Array[i] = raw.charCodeAt(i);
            }
            const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
            const p1 = await pdf.getPage(1);
            const viewport = p1.getViewport({ scale: 2.0 });
            const canvas = document.getElementById('pdf-canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await p1.render({ canvasContext: ctx, viewport }).promise;
            window.rendered = true;
          }
          render().catch(err => { window.renderError = err.message; });
        </script>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction(() => window.rendered === true || window.renderError != null, { timeout: 30000 });

  const err = await page.evaluate(() => window.renderError);
  if (err) throw new Error('PDF render error: ' + err);

  const canvas = await page.$('#pdf-canvas');
  const coverPath = path.resolve(process.cwd(), 'public/images/solea/fatemeh_darkhosh_welcome_packet_cover.png');
  await canvas.screenshot({ path: coverPath });
  console.log('✅ Saved cover image to:', coverPath);

  await browser.close();
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
