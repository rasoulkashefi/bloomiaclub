'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function ConditionalGlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide global layout elements (Navbar & Footer) on individual coach profile pages
  // (which have bespoke full-viewport SoleaNavbar and bespoke footer)
  if (pathname && (/^\/coaches\/[^/]+$/.test(pathname) || /^\/coaches\/[^/]+\//.test(pathname))) {
    return null;
  }
  
  return <>{children}</>;
}
