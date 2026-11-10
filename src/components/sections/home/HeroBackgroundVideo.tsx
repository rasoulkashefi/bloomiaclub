'use client';

import React, { useEffect, useState } from 'react';

const DESKTOP_VIDEO_SRC = '/videos/personal-development-coaching-session-hero-video.mp4';
const MOBILE_VIDEO_SRC = '/videos/personal-development-coaching-session-mobile-hero-video.mp4';

/**
 * Loads only the device-appropriate ambient hero video after initial load/idle
 * so the SSR poster image paints as LCP without dual-video network contention.
 */
export const HeroBackgroundVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion || connection?.saveData) {
      return;
    }

    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const activateVideo = () => {
      if (cancelled) return;
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      setVideoSrc(isDesktop ? DESKTOP_VIDEO_SRC : MOBILE_VIDEO_SRC);
    };

    const scheduleActivation = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(activateVideo, { timeout: 1500 });
      } else {
        timeoutId = setTimeout(activateVideo, 600);
      }
    };

    if (document.readyState === 'complete') {
      scheduleActivation();
    } else {
      window.addEventListener('load', scheduleActivation, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleActivation);
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!videoSrc) {
    return null;
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      src={videoSrc}
      onCanPlay={() => setIsReady(true)}
      className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-700 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <track
        kind="captions"
        src="/videos/hero-ambient-captions.vtt"
        srcLang="fa"
        label="فارسی"
      />
    </video>
  );
};
