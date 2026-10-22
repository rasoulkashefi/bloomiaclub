'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  term: string;
  features: string[];
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$42',
    term: 'Lifetime access',
    features: [
      'Access pre recoded course',
      'Personalized guidance based on your goals',
      'Clear next steps you can act on',
      'Confidence to move forward',
    ],
  },
  {
    name: 'Deep Dive',
    price: '$197',
    term: 'Lifetime access',
    features: [
      'Everything in Starter',
      'Weekly live coaching',
      'Replay library and Books',
      'Quick support',
    ],
  },
  {
    name: 'Mentorship',
    price: '$397',
    term: 'Lifetime access',
    features: [
      'Everything in Deep Dive',
      '1:1 Live session with me',
      'Personal roadmap',
      'Quick support',
    ],
  },
];

export const SoleaPricing: React.FC = () => {
  return (
    <section className="w-full bg-[#b47c86] py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Centered Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl">
            Choose your<br />
            Journey
          </h2>
        </motion.div>

        {/* 3 Pricing Cards with Staggered Entrance */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group flex flex-col justify-between rounded-[2.5rem] bg-white p-8 text-[#3f2a24] shadow-xl sm:p-10 transition-shadow hover:shadow-2xl"
            >
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#bb7462]">
                  {tier.name}
                </span>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[#3f2a24] sm:text-5xl">
                    {tier.price}
                  </span>
                  <span className="text-xs text-[#606060]">{tier.term}</span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-3.5 border-t border-black/10 pt-8 text-sm text-[#606060]">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ffefd9] text-[#bb7462]">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Started Button */}
              <div className="mt-10">
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-black/15 bg-transparent py-3.5 text-xs font-semibold uppercase tracking-wider text-[#3f2a24] transition-all hover:border-[#bb7462] hover:bg-[#ffefd9] hover:text-[#bb7462] active:scale-98"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
