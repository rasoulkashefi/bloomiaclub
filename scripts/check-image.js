const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cropImage() {
  try {
    // ابعاد جدید
    const targetWidth = 480;
    const targetHeight = 600;
    const inputPath = 'public/images/blomia-self-reflection-journey.png';
    const tempPath = 'public/images/blomia-self-reflection-journey-temp.png';
    
    // کراپ عکس به نسبت 4:5 و تغییر سایز به فایل موقت
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(tempPath);
    
    // جایگزینی فایل اصلی
    fs.renameSync(tempPath, inputPath);
    
    console.log(`✓ عکس با موفقیت کراپ شد: ${targetWidth}x${targetHeight} پیکسل`);
  } catch (error) {
    console.error('خطا در کراپ عکس:', error.message);
  }
}

cropImage();
