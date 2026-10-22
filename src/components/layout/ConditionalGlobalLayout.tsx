'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function ConditionalGlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide global layout elements on v3 & v4 coach profiles and cloned template routes
  if (pathname && (/^\/coaches\/[^/]+\/(v3|v4)\/?$/.test(pathname) || pathname.startsWith('/solea'))) {
    return null;
  }
  
  return <>{children}</>;
}
