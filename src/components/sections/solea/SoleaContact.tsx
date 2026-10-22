'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Globe } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const SoleaContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="w-full bg-[#101010] py-20 lg:py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Secondary Floating Nav Pill */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex justify-center"
        >
          <div className="flex w-full max-w-3xl items-center justify-between rounded-[14px] bg-white px-6 py-3 text-[#3f2a24] shadow-lg">
            <Link href="/solea" className="flex items-center">
              <Image
                src="/images/solea/img_0.svg"
                alt="Solea Logo"
                width={60}
                height={24}
                className="h-5 w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#3f2a24] sm:flex">
              <Link href="#home" className="hover:text-[#bb7462]">Home</Link>
              <Link href="#projects" className="hover:text-[#bb7462]">Project</Link>
              <Link href="#about" className="hover:text-[#bb7462]">About</Link>
              <Link href="#contact" className="hover:text-[#bb7462]">Contact Us</Link>
            </nav>

            <Link
              href="#about"
              className="rounded-[10px] bg-[#bb7462] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a66252] transition-colors"
            >
              About Me
            </Link>
          </div>
        </motion.div>

        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12"
        >
          <h2 className="font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl">
            Let’s Connect
          </h2>
        </motion.div>

        {/* Contact Form and Side Card Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-white/10 bg-[#232323] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#fff7a2] focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-[#232323] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#fff7a2] focus:outline-none transition-colors"
                />
              </div>

              <select
                className="w-full rounded-2xl border border-white/10 bg-[#232323] px-5 py-4 text-sm text-white/80 focus:border-[#fff7a2] focus:outline-none transition-colors"
                defaultValue="Feminine brand Elevation"
              >
                <option value="Feminine brand Elevation">Feminine brand Elevation</option>
                <option value="Personal brand Glow-Up">Personal brand Glow-Up</option>
                <option value="Clarity Coaching Session">Clarity Coaching Session</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>

              <textarea
                rows={4}
                required
                placeholder="Your Message"
                className="w-full rounded-2xl border border-white/10 bg-[#232323] px-5 py-4 text-sm text-white placeholder-white/40 focus:border-[#fff7a2] focus:outline-none transition-colors"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#fff7a2] py-4 text-center text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-all hover:bg-[#fff58e] active:scale-[0.99]"
              >
                {submitted ? 'Message Sent Successfully!' : 'Submit Now'}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Schedule a Call Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-[2.5rem] bg-white p-8 text-[#3f2a24] shadow-2xl sm:p-10 lg:col-span-5"
          >
            {/* Avatar */}
            <div className="relative mb-6 h-20 w-20 overflow-hidden rounded-full bg-[#ffe0d9]">
              <Image
                src="/images/solea/img_29.png"
                alt="Solea Marry Avatar"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-serif text-3xl font-normal leading-snug text-[#3f2a24]">
              Schedule a<br />
              Call with me
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#606060]">
              A simple call to gain clarity and direction.
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <a
                href="tel:+1234567890"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#bb7462] py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#a66252] active:scale-98"
              >
                <Phone className="h-4 w-4" />
                <span>Book A Call</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Global Footer Elements */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            
            {/* Left: Email */}
            <div className="md:col-span-5">
              <span className="text-xs uppercase tracking-widest text-white/50">
                Email me
              </span>
              <a
                href="mailto:hello@solea.com"
                className="mt-2 block font-serif text-3xl font-normal text-white hover:text-[#fff7a2] transition-colors sm:text-4xl"
              >
                hello@solea.com
              </a>
            </div>

            {/* Middle: Socials */}
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-white/50">
                Contact Us
              </span>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="#home"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="flex flex-col gap-2 md:col-span-3 text-sm text-white/70">
              <Link href="#about" className="hover:text-white transition-colors">About Me</Link>
              <Link href="#projects" className="hover:text-white transition-colors">Project</Link>
              <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
            </div>

          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row">
            <span>© 2026 Solea Marry. All rights reserved.</span>
            <span>Replicated with precision via Antigravity Frontend Replicator.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
