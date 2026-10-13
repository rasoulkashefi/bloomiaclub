'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function ConditionalGlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide global layout elements on v3 coach profiles
  if (pathname && /^\/coaches\/[^/]+\/v3\/?$/.test(pathname)) {
    return null;
  }
  
  return <>{children}</>;
}
