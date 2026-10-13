import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function normalizePhone(raw: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  let normalized = raw.trim();
  for (let i = 0; i < 10; i++) {
    normalized = normalized
      .replace(new RegExp(persianDigits[i], 'g'), String(i))
      .replace(new RegExp(arabicDigits[i], 'g'), String(i));
  }

  return normalized.replace(/\D/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      requestType,
      organizationName,
      subjectTitle,
      message,
      subject, // Honeypot field
    } = body;

    // Honeypot spam trap
    if (subject && String(subject).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'پیام شما با موفقیت ثبت شد.',
      });
    }

    const cleanName = (fullName || '').trim();
    const cleanPhone = normalizePhone(phone || '');
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanMessage = (message || '').trim();

    if (!cleanName || cleanName.length < 3) {
      return NextResponse.json(
        { error: 'لطفاً نام و نام خانوادگی معتبر (حداقل ۳ حرف) وارد کنید.' },
        { status: 400 }
      );
    }

    if (!cleanPhone || !/^09\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'شماره موبایل معتبر نیست. لطفاً شماره ۱۱ رقمی با ۰۹ وارد کنید.' },
        { status: 400 }
      );
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.' },
        { status: 400 }
      );
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { error: 'لطفاً متن پیام خود را وارد نمایید (حداقل ۵ حرف).' },
        { status: 400 }
      );
    }

    const messageParts: string[] = [];
    messageParts.push(`نوع درخواست: ${requestType === 'corporate' ? 'کوچینگ سازمانی' : 'ارتباط فردی'}`);
    if (organizationName && organizationName.trim()) {
      messageParts.push(`نام سازمان / شرکت: ${organizationName.trim()}`);
    }
    if (subjectTitle && subjectTitle.trim()) {
      messageParts.push(`موضوع: ${subjectTitle.trim()}`);
    }
    messageParts.push(`متن پیام:\n${cleanMessage}`);

    const payload = {
      full_name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: messageParts.join('\n\n'),
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
      console.warn('Edge function invoke error in contact (falling back):', invokeError);
      try {
        await supabase.from('leads').insert({
          full_name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          source: requestType === 'corporate' ? 'contact-corporate' : 'contact-general',
          notes: payload.message,
          created_at: new Date().toISOString(),
        });
      } catch (insertErr) {
        console.warn('Fallback leads insert failed:', insertErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        'پیام شما با موفقیت دریافت شد. تیم بلومیا کلاب ظرف حداکثر ۱۲ ساعت کاری با شما تماس خواهد گرفت.',
    });
  } catch (error: any) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'مشکلی در ارسال پیام پیش آمد. لطفاً مجدداً تلاش فرمایید.' },
      { status: 500 }
    );
  }
}
