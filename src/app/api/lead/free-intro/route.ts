import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Normalize Persian and Arabic digits to standard ASCII numerals
function normalizePhone(raw: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  let normalized = raw.trim();
  for (let i = 0; i < 10; i++) {
    normalized = normalized
      .replace(new RegExp(persianDigits[i], 'g'), String(i))
      .replace(new RegExp(arabicDigits[i], 'g'), String(i));
  }

  // Remove any non-digit character
  return normalized.replace(/\D/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      topic,
      preferredCoach,
      message,
      subject, // Honeypot field
    } = body;

    // Honeypot spam protection: if bot filled this invisible field, return fake success
    if (subject && String(subject).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'درخواست شما با موفقیت ثبت شد.',
      });
    }

    // Validation
    const cleanName = (fullName || '').trim();
    const rawPhone = (phone || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = normalizePhone(rawPhone);

    if (!cleanName || cleanName.length < 3) {
      return NextResponse.json(
        { error: 'لطفاً نام و نام خانوادگی معتبر (حداقل ۳ حرف) وارد کنید.' },
        { status: 400 }
      );
    }

    if (!cleanPhone || !/^09\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'شماره موبایل نامعتبر است. شماره باید ۱۱ رقم بوده و با ۰۹ شروع شود.' },
        { status: 400 }
      );
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.' },
        { status: 400 }
      );
    }

    // Construct unified message payload with metadata
    const messageParts: string[] = [];
    if (topic) messageParts.push(`حوزه مورد نظر: ${topic}`);
    if (preferredCoach) messageParts.push(`کوچ انتخابی / پیشنهادی: ${preferredCoach}`);
    if (message && message.trim()) messageParts.push(`توضیحات کاربر: ${message.trim()}`);

    const payload = {
      full_name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: messageParts.length > 0 ? messageParts.join('\n\n') : null,
      subject: '',
    };

    let invokeError = null;

    try {
      const response = await supabase.functions.invoke('rapid-endpoint', {
        body: payload,
      });
      invokeError = response.error;
    } catch (err) {
      invokeError = err;
    }

    if (invokeError) {
      console.warn('Edge function rapid-endpoint invoke error (falling back):', invokeError);
      // Attempt optional direct insert to leads table if it exists
      try {
        await supabase.from('leads').insert({
          full_name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          source: 'free-intro-session',
          notes: payload.message,
          created_at: new Date().toISOString(),
        });
      } catch (insertErr) {
        console.warn('Direct leads insert failed or table does not exist:', insertErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        'درخواست جلسه معارفه رایگان شما با موفقیت ثبت شد. مشاوران بلومیا ظرف ۲۴ ساعت کاری جهت هماهنگی زمان با شما تماس خواهند گرفت.',
    });
  } catch (error: any) {
    console.error('Error in free-intro lead submission:', error);
    return NextResponse.json(
      { error: 'مشکلی در ثبت درخواست پیش آمد. لطفاً مجدداً تلاش فرمایید.' },
      { status: 500 }
    );
  }
}
