import type { PostHogInterface } from 'posthog-js';

/**
 * Bloomia & Atyno Unified Analytics Helper (PostHog)
 *
 * Dynamically loads posthog-js after initial paint/idle so analytics never
 * bloat the critical JS bundle or block LCP/TBT, while buffering early events.
 */

const MAX_QUEUED_EVENTS = 25;
let phInstance: PostHogInterface | null = null;
let initPromise: Promise<PostHogInterface | null> | null = null;
const pendingOps: Array<(ph: PostHogInterface) => void> = [];

const enqueueOrRun = (fn: (ph: PostHogInterface) => void) => {
  if (typeof window === 'undefined') return;
  if (phInstance) {
    fn(phInstance);
    return;
  }
  if (pendingOps.length < MAX_QUEUED_EVENTS) {
    pendingOps.push(fn);
  }
};

export const initPostHog = (
  apiKey: string,
  apiHost: string,
  uiHost: string
): Promise<PostHogInterface | null> => {
  if (typeof window === 'undefined' || !apiKey) {
    return Promise.resolve(null);
  }
  if (phInstance) {
    return Promise.resolve(phInstance);
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(apiKey, {
        api_host: apiHost,
        ui_host: uiHost,
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
        person_profiles: 'identified_only',
        disable_surveys: true,
        disableDeviceModel: true,
        loaded: (ph) => {
          phInstance = ph;
          while (pendingOps.length > 0) {
            const op = pendingOps.shift();
            op?.(ph);
          }
        },
      });
      return posthog;
    })
    .catch(() => null);

  return initPromise;
};

export const capturePageView = (url: string) => {
  enqueueOrRun((ph) => {
    ph.capture('$pageview', { $current_url: url });
  });
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  enqueueOrRun((ph) => {
    ph.capture(eventName, properties);
  });
};

export const identifyUser = (distinctId: string, userProperties?: Record<string, any>) => {
  enqueueOrRun((ph) => {
    ph.identify(distinctId, userProperties);
  });
};

export const resetUser = () => {
  enqueueOrRun((ph) => {
    ph.reset();
  });
};

// ==========================================================
// Predefined Bloomia Club Conversion & Funnel Events
// ==========================================================

/**
 * Track user clicking "رزرو جلسه معارفه رایگان" CTA
 */
export const trackIntroBookingClick = (source: string, extra?: Record<string, any>) => {
  trackEvent('cta_free_intro_clicked', {
    source, // e.g. 'hero', 'navbar', 'sticky_cta', 'coach_detail'
    ...extra,
  });
};

/**
 * Track opening the coach booking modal (Atyno embed or lead modal)
 */
export const trackBookingModalOpen = (coachName: string, modalType: 'atyno' | 'lead', coachSlug?: string) => {
  trackEvent('booking_modal_opened', {
    coach_name: coachName,
    coach_slug: coachSlug,
    modal_type: modalType,
  });
};

/**
 * Track successful booking submission
 */
export const trackBookingCompleted = (coachName: string, bookingType: 'free_intro' | 'paid_session') => {
  trackEvent('booking_completed', {
    coach_name: coachName,
    booking_type: bookingType,
  });
};

/**
 * Track event registration click
 */
export const trackEventRegistrationClick = (eventSlug: string, eventTitle: string) => {
  trackEvent('event_registration_clicked', {
    event_slug: eventSlug,
    event_title: eventTitle,
  });
};

/**
 * Track coach profile view
 */
export const trackCoachProfileView = (coachSlug: string, coachName: string) => {
  trackEvent('coach_profile_viewed', {
    coach_slug: coachSlug,
    coach_name: coachName,
  });
};
