import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  separatorClassName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  itemClassName,
  activeClassName,
  separatorClassName,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="مسیریابی"
      className={cn(
        'w-full max-w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1',
        className
      )}
    >
      <ol className="inline-flex items-center gap-1.5 sm:gap-2 text-xs text-[#6b6b6b] whitespace-nowrap flex-nowrap min-w-max leading-none">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={idx}
              className="inline-flex items-center gap-1.5 sm:gap-2 shrink-0 leading-none align-middle"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center transition-colors duration-150 hover:text-[#1f3d3a] shrink-0 leading-none min-h-0 min-w-0 h-auto py-1',
                    itemClassName
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center font-semibold text-[#1e1e1e] shrink-0 leading-none min-h-0 min-w-0 h-auto py-1',
                    activeClassName
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronLeft
                  className={cn(
                    'w-3.5 h-3.5 text-[#d4d4ce] shrink-0 select-none pointer-events-none self-center',
                    separatorClassName
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
