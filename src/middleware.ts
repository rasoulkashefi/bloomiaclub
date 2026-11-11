import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Case-exact canonicalization for coach slugs.
 * Handles mixed-case URLs like /coaches/arezoo_ghaffari -> /coaches/Arezoo_Ghaffari
 * without triggering Next.js case-insensitive redirects() loops or Windows ISR cache collisions.
 */
const CANONICAL_BY_LOWERCASE: Record<string, string> = {
  arezoo_ghaffari: 'Arezoo_Ghaffari',
  fatemeh_esmaeeli: 'fatemeh_esmaeeli',
  mahya_shakoori: 'mahya_shakoori',
  saloomeh_fathijou: 'saloomeh_fathijou',
  'fatemeh-derakhsh': 'fatemeh-derakhsh',
  shabnam_nematimalek: 'shabnam_nematimalek',
  maryam_johari: 'maryam_johari',
  'payam-esmi': 'payam-esmi',
  'parmiss-yari': 'parmiss-yari',
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/coaches/')) return NextResponse.next();

  const slug = pathname.slice('/coaches/'.length);
  if (!slug || slug.includes('/')) return NextResponse.next();

  const canonical = CANONICAL_BY_LOWERCASE[slug.toLowerCase()];
  if (canonical && canonical !== slug) {
    const url = req.nextUrl.clone();
    url.pathname = `/coaches/${canonical}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/coaches/:slug'],
};
