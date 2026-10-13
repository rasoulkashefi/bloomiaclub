import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

import type { Article } from '@/lib/coaches';
import { cn } from '@/lib/utils';

type ArticleCardProps = {
  article: Article;
  variant?: 'featured' | 'compact';
  /** Image is above the fold for the first card only. */
  priority?: boolean;
};

const meta = (article: Article) => [article.date, article.readTime].filter(Boolean).join(' · ');

export function ArticleCard({ article, variant = 'compact', priority = false }: ArticleCardProps) {
  const Wrapper = article.href ? 'a' : 'div';
  const wrapperProps = article.href ? { href: article.href } : {};

  if (variant === 'featured') {
    return (
      <article className="h-full">
        <Wrapper
          {...wrapperProps}
          className="group flex h-full flex-col gap-7 rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-4"
        >
          {article.imageUrl && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-brand-teal-50">
              <Image
                src={article.imageUrl}
                alt=""
                fill
                priority={priority}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-brand-neutral-600">{meta(article)}</p>
            <h3 className="text-balance text-[1.6rem] font-extrabold leading-[1.7] text-brand-neutral-900 transition-colors group-hover:text-brand-teal-700 md:text-[2rem] md:leading-[1.65]">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="line-clamp-3 max-w-[56ch] text-base leading-[2.1] text-brand-neutral-600">{article.excerpt}</p>
            )}
            {article.href && (
              <span className="mt-1 inline-flex items-center gap-2 text-base font-bold text-brand-teal-900">
                خواندن مقاله
                <ArrowLeft className="size-[1.1em] transition-transform group-hover:-translate-x-1.5 motion-reduce:transform-none" aria-hidden="true" />
              </span>
            )}
          </div>
        </Wrapper>
      </article>
    );
  }

  return (
    <article>
      <Wrapper
        {...wrapperProps}
        className={cn(
          'group flex items-center gap-5 rounded-2xl py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-4'
        )}
      >
        {article.imageUrl && (
          <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-brand-teal-50 md:size-28">
            <Image src={article.imageUrl} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-brand-neutral-600">{meta(article)}</p>
          <h3 className="line-clamp-3 text-lg font-bold leading-[1.9] text-brand-neutral-900 transition-colors group-hover:text-brand-teal-700">
            {article.title}
          </h3>
        </div>
      </Wrapper>
    </article>
  );
}
