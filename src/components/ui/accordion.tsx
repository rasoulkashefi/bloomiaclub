'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-brand-surface-border first:border-t', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex min-h-[64px] flex-1 items-center justify-between gap-6 py-5 text-start text-base font-semibold leading-8 text-brand-neutral-900 transition-colors md:text-lg',
        'hover:text-brand-teal-700 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900 focus-visible:ring-offset-4 focus-visible:ring-offset-white',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-surface-border text-brand-teal-900 transition-all duration-300 group-hover:border-brand-teal-900/40 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand-teal-900 group-data-[state=open]:bg-brand-teal-900 group-data-[state=open]:text-white"
      >
        <Plus className="size-4" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    /* forceMount keeps every answer in the server-rendered HTML (SEO/GEO); closed panels are hidden via CSS. */
    forceMount
    className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('max-w-[62ch] pb-7 pe-14 text-base leading-[2] text-brand-neutral-600', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
