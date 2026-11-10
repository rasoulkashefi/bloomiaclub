'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { WebMCPToolDefinition } from '@/types/webmcp';

/**
 * Registers Bloomia Club's WebMCP tools when the browser exposes `document.modelContext`
 * or `navigator.modelContext`. Exits immediately with zero overhead in standard browsers.
 */
export function WebMCPProvider(): null {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const modelContext = document.modelContext ?? navigator.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') {
      return;
    }

    const controller = new AbortController();

    const tools: WebMCPToolDefinition[] = [
      {
        name: 'list_bloomia_coaches',
        title: 'List Bloomia Certified ICF Coaches',
        description:
          'Search and list active ICF-certified coaches at Bloomia Club by specialty, topic, or name (e.g., career, parenting, ACT, time management).',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Optional Persian or English keyword to filter coaches by name or specialty.',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of coaches to return (1-20).',
            },
          },
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
        },
        execute: async (input) => {
          const params = new URLSearchParams();
          if (typeof input.query === 'string' && input.query.trim()) {
            params.set('q', input.query.trim());
          }
          if (typeof input.limit === 'number' && input.limit > 0) {
            params.set('limit', String(Math.floor(input.limit)));
          }
          const qs = params.toString();
          const res = await fetch(`/api/coaches${qs ? `?${qs}` : ''}`);
          const data = await res.json();
          return {
            content: [{ type: 'text', text: JSON.stringify(data) }],
          };
        },
      },
      {
        name: 'get_bloomia_services',
        title: 'Get Bloomia Club Coaching Services Overview',
        description:
          'Returns structured information about Bloomia Club coaching domains, ICF standard compliance, free introductory session policy, and direct URLs.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
        },
        execute: () => {
          const info = {
            brand: 'بلومیا کلاب (Bloomia Club)',
            standard: 'International Coaching Federation (ICF) — ACC / PCC / Level 2',
            freeIntroSession: {
              durationMinutes: '30-45',
              cost: 'Free (no financial commitment)',
              format: 'Online video session',
              bookingPage: 'https://bloomiaclub.com/coaching/free-intro-session',
            },
            domains: [
              'کوچینگ توسعه فردی و خودشناسی',
              'کوچینگ شغلی و حرفه‌ای',
              'کوچینگ مادران، بانوان و نوجوانان',
              'کوچینگ مدیریت زمان، هدفمندی و انضباط فردی',
              'کوچینگ روان‌شناختی مبتنی بر ACT',
              'کوچینگ مدیران و توسعه سازمانی',
            ],
            urls: {
              home: 'https://bloomiaclub.com',
              coaches: 'https://bloomiaclub.com/coaches',
              freeIntro: 'https://bloomiaclub.com/coaching/free-intro-session',
              whatIsCoaching: 'https://bloomiaclub.com/coaching/what-is-coaching',
              events: 'https://bloomiaclub.com/events',
              blog: 'https://bloomiaclub.com/blog',
              faq: 'https://bloomiaclub.com/faq',
              contact: 'https://bloomiaclub.com/contact',
            },
          };
          return {
            content: [{ type: 'text', text: JSON.stringify(info) }],
          };
        },
      },
      {
        name: 'open_free_intro_booking',
        title: 'Open Free Intro Session Booking Page',
        description:
          'Navigates to the Bloomia Club free introductory coaching session booking page, optionally pre-selecting a specific coach slug.',
        inputSchema: {
          type: 'object',
          properties: {
            coachSlug: {
              type: 'string',
              description: 'Optional coach slug (e.g., fatemeh_esmaeeli, payam-esmi, parmiss-yari).',
            },
          },
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
        },
        execute: (input) => {
          const slug = typeof input.coachSlug === 'string' ? input.coachSlug.trim() : '';
          const target = slug
            ? `/coaching/free-intro-session?coach=${encodeURIComponent(slug)}`
            : '/coaching/free-intro-session';
          router.push(target);
          return {
            content: [
              {
                type: 'text',
                text: `Navigated to https://bloomiaclub.com${target}`,
              },
            ],
          };
        },
      },
    ];

    for (const tool of tools) {
      try {
        void Promise.resolve(
          modelContext.registerTool(tool, { signal: controller.signal })
        ).catch(() => {
          // Ignore experimental browser WebMCP runtime rejections
        });
      } catch {
        // Ignore unsupported runtime signature differences
      }
    }

    return () => {
      controller.abort();
      if (typeof modelContext.unregisterTool === 'function') {
        for (const tool of tools) {
          try {
            modelContext.unregisterTool(tool.name);
          } catch {
            // Ignore cleanup errors
          }
        }
      }
    };
  }, [router]);

  return null;
}
