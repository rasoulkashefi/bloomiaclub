'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  slideCount: number;
  isRtl: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

/**
 * shadcn/ui Carousel API (Carousel > CarouselContent > CarouselItem) backed by Embla,
 * made direction-aware so it behaves correctly in RTL layouts.
 */
const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [slideCount, setSlideCount] = React.useState(0);
    const isRtl = opts?.direction === 'rtl';

    const onSelect = React.useCallback((embla: CarouselApi) => {
      if (!embla) return;
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
      setSelectedIndex(embla.selectedScrollSnap());
      setSlideCount(embla.scrollSnapList().length);
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const towardsNext = isRtl ? 'ArrowLeft' : 'ArrowRight';
        const towardsPrev = isRtl ? 'ArrowRight' : 'ArrowLeft';
        if (event.key === towardsPrev) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === towardsNext) {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext, isRtl]
    );

    React.useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => {
        api.off('reInit', onSelect);
        api.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          slideCount,
          isRtl,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { viewportClassName?: string }
>(({ className, viewportClassName, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={cn('overflow-hidden', viewportClassName)}>
      <div
        ref={ref}
        className={cn('flex', orientation === 'horizontal' ? '-ms-4 md:-ms-6' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'ps-4 md:ps-6' : 'pt-4',
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = 'secondary', size = 'icon', ...props }, ref) => {
    const { scrollPrev, canScrollPrev, isRtl } = useCarousel();
    const Icon = isRtl ? ArrowRight : ArrowLeft;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('size-12', className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <Icon aria-hidden="true" />
        <span className="sr-only">اسلاید قبلی</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = 'secondary', size = 'icon', ...props }, ref) => {
    const { scrollNext, canScrollNext, isRtl } = useCarousel();
    const Icon = isRtl ? ArrowLeft : ArrowRight;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('size-12', className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <Icon aria-hidden="true" />
        <span className="sr-only">اسلاید بعدی</span>
      </Button>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
