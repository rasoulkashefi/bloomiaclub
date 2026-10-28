'use client';

import React, { useEffect, Suspense } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && posthog.__loaded) {
      let url = window.origin + pathname;
      const searchStr = searchParams?.toString();
      if (searchStr) {
        url = `${url}?${searchStr}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const posthogKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  useEffect(() => {
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

    // Only initialize if an API key is provided and on client
    if (typeof window !== 'undefined' && posthogKey) {
      const isEu = posthogHost.includes('eu.i.posthog.com') || posthogHost.includes('eu.posthog.com');

      posthog.init(posthogKey, {
        // Reverse proxy through Next.js rewrite (/ingest) to bypass ad blockers
        api_host: `${window.location.origin}/ingest`,
        ui_host: isEu ? 'https://eu.posthog.com' : 'https://us.posthog.com',
        capture_pageview: false, // Captured manually above on route change
        capture_pageleave: true,
        autocapture: true,
        person_profiles: 'identified_only',
        // In local development, you can see PostHog console logs if needed
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            ph.debug(false);
          }
        },
      });
    }
  }, [posthogKey]);

  // If no PostHog key configured yet, cleanly render children without breaking anything
  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
