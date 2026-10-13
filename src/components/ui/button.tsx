import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Bloomia button system.
 * Pill shaped, calm, brand-green. Variants cover light and dark surfaces.
 */
const buttonVariants = cva(
  [
    'group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out',
    'active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-brand-teal-900 text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-12px_rgba(31,61,58,0.55)] hover:bg-brand-teal-700 focus-visible:ring-brand-teal-900 ring-offset-brand-surface',
        secondary:
          'border border-brand-surface-border bg-white text-brand-neutral-900 hover:border-brand-teal-900/40 hover:bg-brand-teal-50 focus-visible:ring-brand-teal-900 ring-offset-brand-surface',
        ghost:
          'text-brand-neutral-900 hover:bg-brand-teal-50 focus-visible:ring-brand-teal-900 ring-offset-brand-surface',
        light:
          'bg-white text-brand-teal-900 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] hover:bg-brand-teal-50 focus-visible:ring-white ring-offset-brand-teal-900',
        outlineLight:
          'border border-white/30 text-white hover:border-white/70 hover:bg-white/10 focus-visible:ring-white ring-offset-brand-teal-900',
        link: 'rounded-md px-0 text-brand-teal-900 underline-offset-[6px] hover:underline focus-visible:ring-brand-teal-900 ring-offset-brand-surface',
      },
      size: {
        sm: 'min-h-[44px] px-5 text-sm',
        md: 'min-h-[48px] px-7 text-[0.95rem]',
        lg: 'min-h-[56px] px-8 text-base',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
