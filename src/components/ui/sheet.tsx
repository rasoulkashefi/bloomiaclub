'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn('bl-overlay fixed inset-0 z-[60] bg-brand-teal-950/55', className)}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-[70] flex flex-col bg-brand-surface-paper text-brand-neutral-900 shadow-[0_-20px_60px_-20px_rgba(15,34,32,0.35)] focus-visible:outline-none',
  {
    variants: {
      side: {
        /** Bottom sheet on mobile, centred dialog from md and up. */
        bottom:
          'bl-sheet-bottom inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[28px] md:inset-0 md:m-auto md:h-fit md:w-[calc(100%-3rem)] md:max-w-[540px] md:rounded-[28px]',
        /** Physical right edge: the leading edge in RTL. */
        right: 'bl-sheet-right inset-y-0 right-0 h-full w-[88%] max-w-[380px] rounded-e-[28px]',
      },
    },
    defaultVariants: { side: 'bottom' },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  closeLabel?: string;
}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'bottom', className, children, closeLabel = 'بستن', ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close
          className="absolute end-4 top-4 flex size-11 items-center justify-center rounded-full text-brand-neutral-600 transition-colors hover:bg-brand-surface-muted hover:text-brand-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-900"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2 text-start', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-3', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-xl font-extrabold leading-9 text-brand-neutral-900 md:text-2xl', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm leading-7 text-brand-neutral-600', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
