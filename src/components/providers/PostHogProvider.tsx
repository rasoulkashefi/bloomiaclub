'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { capturePageView, initPostHog } from '@/lib/analytics';

function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      let url = window.origin + pathname;
      const searchStr = searchParams?.toString();
      if (searchStr) {
        url = `${url}?${searchStr}`;
      }
      capturePageView(url);
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
  const startedRef = useRef(false);

  useEffect(() => {
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';
    if (typeof window === 'undefined' || !posthogKey) return;

    const isEu = posthogHost.includes('eu.i.posthog.com') || posthogHost.includes('eu.posthog.com');
    const uiHost = isEu ? 'https://eu.posthog.com' : 'https://us.posthog.com';

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startAnalytics = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      cleanupListeners();
      void initPostHog(posthogKey, `${window.location.origin}/ingest`, uiHost);
    };

    const scheduleIdleStart = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(startAnalytics, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(startAnalytics, 1800);
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('load', scheduleIdleStart);
      window.removeEventListener('pointerdown', startAnalytics);
      window.removeEventListener('keydown', startAnalytics);
      window.removeEventListener('scroll', startAnalytics);
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };

    // Start immediately on first user interaction or after page load + idle
    window.addEventListener('pointerdown', startAnalytics, { once: true, passive: true });
    window.addEventListener('keydown', startAnalytics, { once: true, passive: true });
    window.addEventListener('scroll', startAnalytics, { once: true, passive: true });

    if (document.readyState === 'complete') {
      scheduleIdleStart();
    } else {
      window.addEventListener('load', scheduleIdleStart, { once: true });
    }

    return cleanupListeners;
  }, [posthogKey]);

  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
