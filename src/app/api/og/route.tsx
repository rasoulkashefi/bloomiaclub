import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'بلومیا کلاب | پلتفرم تخصصی کوچینگ و توسعه فردی';
    const subtitle =
      searchParams.get('subtitle') || 'همراه شما در مسیر شکوفایی فردی و شغلی با برترین کوچ‌های ICF';
    const badge = searchParams.get('badge') || 'پلتفرم تخصصی کوچینگ با استاندارد بین‌المللی ICF';
    const brand = searchParams.get('brand') || 'BLOOMIACLUB.COM';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#183633',
            backgroundImage: 'radial-gradient(circle at 50% 45%, #244d48 0%, #183633 60%, #0f211f 100%)',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            padding: '50px 60px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle Frame */}
          <div
            style={{
              position: 'absolute',
              top: '25px',
              left: '25px',
              right: '25px',
              bottom: '25px',
              border: '2px solid rgba(54, 107, 100, 0.4)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }}
          />

          {/* Top Eyebrow Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1b3935',
              border: '1.2px solid #3d726b',
              padding: '10px 28px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#bfe8e2',
              marginTop: '10px',
            }}
          >
            {badge}
          </div>

          {/* Main Title & Subtitle Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '1050px',
              margin: 'auto 0',
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? '42px' : '52px',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '20px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 500,
                color: '#c3d5d2',
                lineHeight: 1.5,
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: '#d4af37',
              letterSpacing: '3px',
              marginBottom: '10px',
            }}
          >
            {brand}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
