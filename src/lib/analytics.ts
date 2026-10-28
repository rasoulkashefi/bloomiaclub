import posthog from 'posthog-js';

/**
 * Bloomia & Atyno Unified Analytics Helper (PostHog)
 * 
 * Safe client-side wrapper around PostHog.
 * Can be safely called anywhere without checking for SSR or initialization.
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(eventName, properties);
  }
};

export const identifyUser = (distinctId: string, userProperties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(distinctId, userProperties);
  }
};

export const resetUser = () => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.reset();
  }
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
