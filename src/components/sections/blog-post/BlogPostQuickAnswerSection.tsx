import React from 'react';
import { BookmarkCheck } from 'lucide-react';

interface BlogPostQuickAnswerSectionProps {
  answer: string | null | undefined;
}

export const BlogPostQuickAnswerSection: React.FC<BlogPostQuickAnswerSectionProps> = ({ answer }) => {
  if (!answer) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 my-8">
      <div className="p-6 sm:p-7 rounded-3xl bg-brand-surface-paper border-2 border-brand-teal-900/20 shadow-soft-sm relative overflow-hidden">
        {/* Accent strip */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-brand-teal-900" />

        <div className="flex items-center gap-2 mb-3 text-brand-teal-950 font-extrabold text-base sm:text-lg">
          <BookmarkCheck className="w-5 h-5 text-brand-teal-800 shrink-0" />
          <span>خلاصه در یک نگاه</span>
        </div>

        <p className="text-sm sm:text-base text-brand-neutral-800 leading-[2] sm:leading-[2.1] font-medium text-justify">
          {answer}
        </p>
      </div>
    </section>
  );
};
