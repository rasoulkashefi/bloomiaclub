import { ArrowLeft } from 'lucide-react';

import type { CoachProfile } from '@/lib/coaches';
import { Button } from '@/components/ui/button';
import { Reveal } from './animations/Reveal';
import { ArticleCard } from './cards/ArticleCard';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/**
 * Editorial content grid: one large featured article, the rest as a quiet list.
 * Rendered only when the coach has real published articles.
 */
export function CoachArticles({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const articles = coach.articles;
  if (!articles || articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <Section id="articles" labelledBy="articles-title" tone={tone}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <EditorialHeading id="articles-title" lead="یادداشت‌هایی درباره کوچینگ، توسعه فردی و تحول.">
            نوشته‌های {coach.name}
          </EditorialHeading>
        </Reveal>
        {articles.length > 1 && (
          <Reveal>
            <Button asChild variant="secondary">
              <a href="https://bloomiaclub.com/blog">
                مشاهده همه مقالات
                <ArrowLeft aria-hidden="true" className="transition-transform group-hover/btn:-translate-x-1 motion-reduce:transform-none" />
              </a>
            </Button>
          </Reveal>
        )}
      </div>

      <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className={rest.length > 0 ? 'lg:col-span-7' : 'lg:col-span-8 lg:col-start-3'}>
          <ArticleCard article={featured} variant="featured" />
        </Reveal>

        {rest.length > 0 && (
          <ul className="flex flex-col divide-y divide-brand-surface-border border-y border-brand-surface-border lg:col-span-5 lg:self-start">
            {rest.map((article, index) => (
              <Reveal as="li" key={article.id} delay={0.1 + index * 0.08}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
