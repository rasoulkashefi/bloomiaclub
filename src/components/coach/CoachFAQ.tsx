import type { CoachProfile } from '@/lib/coaches';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Reveal } from './animations/Reveal';
import { EditorialHeading } from './editorial/EditorialHeading';
import { Section, type SectionTone } from './editorial/Section';

/** Minimal accordion (shadcn/ui + Radix): hairlines only, no cards. */
export function CoachFAQ({ coach, tone }: { coach: CoachProfile; tone?: SectionTone }) {
  const faqs = coach.faqs;
  if (!faqs || faqs.length === 0) return null;

  return (
    <Section id="faq" labelledBy="faq-title" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <EditorialHeading id="faq-title" lead="پاسخ پرسش‌هایی که پیش از رزرو اولین جلسه بیشتر می‌پرسند.">
                سوالات متداول
              </EditorialHeading>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08} className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="faq-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
