'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface TestimonialItem {
  video: string;
  poster: string;
  quote: string;
  author: string;
}

const testimonials: TestimonialItem[] = [
  {
    video: '/videos/solea/testimonial_anolta.mp4',
    poster: '/images/solea/img_18.png',
    quote: 'The best decision I made for myself this year. Clarity and real growth all in one place.”',
    author: 'Anolta Marry',
  },
  {
    video: '/videos/solea/testimonial_mercedes.mp4',
    poster: '/images/solea/img_19.png',
    quote: 'This journey brought me focus, self-trust, and real progress without the overwhelm.',
    author: 'Mercedes Kutch',
  },
  {
    video: '/videos/solea/testimonial_sophia.mp4',
    poster: '/images/solea/img_20.png',
    quote: 'I found focus, built trust in myself, and moved forward without feeling overwhelmed.',
    author: 'Sophia Taylor',
  },
];

// Single Testimonial Video Card Component
const TestimonialCard: React.FC<{ item: TestimonialItem; idx: number }> = ({ item, idx }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[440px] sm:h-[480px] lg:h-[500px] w-full overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
    >
      {/* Background Full Video Loop */}
      <video
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

      {/* Sleek Play/Pause Toggle on Top-Right */}
      <button
        type="button"
        onClick={togglePlay}
        className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-white" />
        ) : (
          <Play className="h-4 w-4 fill-white ml-0.5" />
        )}
      </button>

      {/* Floating White Quote Card Overlay */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-20 rounded-[16px] bg-white/95 p-5 sm:p-6 text-center backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-white/60">
        {/* Terracotta Double Quote SVG */}
        <div className="flex justify-center mb-3">
          <svg
            viewBox="0 0 20 16"
            className="h-5 w-7 text-[#bb7462]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M 8.009 8.149 C 7.438 7.577 6.722 7.17 5.939 6.972 C 5.905 6.964 5.873 6.95 5.846 6.93 C 5.818 6.909 5.794 6.884 5.776 6.854 C 5.76 6.827 5.749 6.796 5.745 6.765 C 5.741 6.733 5.743 6.701 5.751 6.67 C 5.98 5.869 6.335 5.11 6.804 4.421 C 7.21 3.793 7.664 3.198 8.162 2.64 C 8.283 2.509 8.374 2.353 8.429 2.183 C 8.484 2.013 8.501 1.834 8.48 1.657 C 8.457 1.484 8.396 1.319 8.303 1.171 C 8.21 1.024 8.086 0.899 7.939 0.804 L 6.979 0.197 C 6.783 0.068 6.553 0 6.319 0 C 6.084 0 5.855 0.068 5.659 0.197 C 4.058 1.288 2.714 2.714 1.721 4.376 C 0.606 6.155 0.01 8.21 0 10.309 C 0 12.017 0.455 13.359 1.349 14.294 C 1.785 14.756 2.314 15.12 2.9 15.365 C 3.486 15.609 4.117 15.728 4.752 15.713 C 5.337 15.719 5.917 15.607 6.458 15.384 C 6.999 15.161 7.49 14.831 7.901 14.415 C 8.339 13.988 8.684 13.475 8.914 12.909 C 9.144 12.342 9.254 11.734 9.237 11.123 C 9.25 10.569 9.148 10.019 8.936 9.507 C 8.725 8.995 8.409 8.532 8.009 8.149 Z M 7.236 13.731 C 6.913 14.062 6.527 14.323 6.1 14.5 C 5.673 14.676 5.214 14.764 4.752 14.759 C 4.246 14.775 3.742 14.683 3.275 14.49 C 2.807 14.296 2.386 14.005 2.039 13.636 C 1.32 12.882 0.954 11.762 0.954 10.309 C 0.967 8.384 1.518 6.501 2.545 4.873 C 3.468 3.33 4.716 2.008 6.203 0.998 C 6.241 0.975 6.285 0.963 6.33 0.963 C 6.381 0.963 6.43 0.977 6.473 1.005 L 7.427 1.615 C 7.457 1.634 7.482 1.66 7.501 1.689 C 7.519 1.719 7.531 1.752 7.535 1.787 C 7.541 1.826 7.537 1.866 7.525 1.903 C 7.513 1.941 7.493 1.975 7.465 2.003 C 6.934 2.602 6.449 3.24 6.015 3.912 C 5.489 4.692 5.092 5.551 4.838 6.457 C 4.797 6.61 4.787 6.769 4.809 6.926 C 4.831 7.083 4.884 7.234 4.965 7.37 C 5.047 7.509 5.155 7.63 5.285 7.727 C 5.415 7.823 5.562 7.892 5.719 7.929 C 6.339 8.087 6.904 8.41 7.354 8.865 C 7.665 9.157 7.91 9.511 8.075 9.905 C 8.239 10.298 8.319 10.722 8.308 11.148 C 8.319 11.63 8.229 12.108 8.044 12.553 C 7.86 12.997 7.585 13.399 7.236 13.731 Z"
              transform="translate(10.667, 0.145)"
            />
            <path
              d="M 5.939 6.975 C 5.905 6.968 5.873 6.953 5.846 6.933 C 5.818 6.913 5.794 6.887 5.776 6.858 C 5.745 6.802 5.736 6.736 5.751 6.673 C 5.981 5.873 6.337 5.114 6.804 4.424 C 7.21 3.797 7.664 3.201 8.162 2.643 C 8.282 2.514 8.372 2.36 8.426 2.192 C 8.48 2.024 8.496 1.847 8.475 1.672 C 8.453 1.497 8.393 1.329 8.299 1.18 C 8.206 1.031 8.081 0.904 7.933 0.808 L 6.979 0.197 C 6.783 0.068 6.554 0 6.32 0 C 6.086 0 5.857 0.068 5.662 0.197 C 4.06 1.286 2.715 2.711 1.721 4.373 C 0.606 6.152 0.01 8.207 0 10.306 C 0 12.014 0.455 13.356 1.352 14.291 C 1.788 14.753 2.317 15.118 2.903 15.362 C 3.489 15.607 4.12 15.725 4.755 15.71 C 5.34 15.715 5.92 15.603 6.461 15.38 C 7.002 15.157 7.493 14.828 7.904 14.412 C 8.341 13.984 8.684 13.471 8.913 12.905 C 9.142 12.338 9.253 11.731 9.237 11.12 C 9.251 10.566 9.149 10.016 8.938 9.504 C 8.727 8.992 8.412 8.53 8.013 8.146 C 7.439 7.577 6.722 7.172 5.939 6.975 Z M 7.236 13.728 C 6.914 14.058 6.528 14.32 6.101 14.496 C 5.675 14.673 5.217 14.761 4.755 14.756 C 4.249 14.772 3.745 14.681 3.276 14.487 C 2.808 14.293 2.386 14.002 2.039 13.633 C 1.32 12.879 0.954 11.759 0.954 10.306 C 0.967 8.381 1.518 6.498 2.545 4.87 C 3.468 3.328 4.717 2.006 6.203 0.995 C 6.241 0.973 6.285 0.961 6.33 0.96 C 6.382 0.96 6.432 0.974 6.476 1.002 L 7.43 1.612 C 7.46 1.631 7.486 1.656 7.505 1.686 C 7.524 1.716 7.537 1.749 7.542 1.784 C 7.546 1.823 7.541 1.863 7.529 1.9 C 7.516 1.938 7.495 1.972 7.469 2 C 6.939 2.6 6.455 3.238 6.021 3.909 C 5.493 4.688 5.096 5.547 4.844 6.454 C 4.802 6.606 4.791 6.766 4.812 6.923 C 4.834 7.08 4.887 7.231 4.968 7.367 C 5.05 7.506 5.159 7.627 5.288 7.724 C 5.418 7.82 5.565 7.889 5.722 7.926 C 6.341 8.084 6.906 8.406 7.357 8.858 C 7.665 9.152 7.908 9.508 8.07 9.902 C 8.232 10.296 8.308 10.72 8.296 11.145 C 8.308 11.626 8.221 12.104 8.039 12.549 C 7.856 12.993 7.583 13.395 7.236 13.728 Z"
              transform="translate(0, 0.148)"
            />
          </svg>
        </div>

        {/* Quote Copy */}
        <p className="font-serif text-[17px] sm:text-[19px] lg:text-[20px] font-normal leading-[1.38] text-[#3f2a24]">
          {item.quote}
        </p>

        {/* Author Name */}
        <p className="mt-2.5 text-[14px] sm:text-[15px] font-medium text-[#606060]">
          {item.author}
        </p>
      </div>
    </motion.div>
  );
};

export const SoleaTestimonials: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="w-full bg-[#f5f5f5] py-12 lg:py-16 text-[#3f2a24] overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-[30px]">
        
        {/* Section Header with Carousel Navigation & Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-8 lg:pb-10"
        >
          <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.18] text-[#3f2a24]">
            What women
            <br />
            are Saying
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-black/15 text-[#3f2a24] transition-all hover:bg-[#3f2a24] hover:text-white active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-black/15 text-[#3f2a24] transition-all hover:bg-[#3f2a24] hover:text-white active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6 lg:-ml-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:-ml-0 lg:pl-8"
              >
                <TestimonialCard item={item} idx={idx} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
