import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { CheckCircle2, AlertCircle, Info, Lightbulb, ExternalLink } from 'lucide-react';

interface PortableTextRendererProps {
  value: any[];
}

function renderSpan(span: any, markDefs: any[] = []) {
  if (!span) return null;
  let element: React.ReactNode = span.text;

  if (!span.marks || span.marks.length === 0) {
    return element;
  }

  span.marks.forEach((mark: string) => {
    if (mark === 'strong') {
      element = <strong className="font-extrabold text-brand-neutral-900">{element}</strong>;
    } else if (mark === 'em') {
      element = <em className="italic">{element}</em>;
    } else if (mark === 'underline') {
      element = <span className="underline underline-offset-4 decoration-brand-teal-400">{element}</span>;
    } else if (mark === 'strike-through') {
      element = <span className="line-through text-brand-neutral-400">{element}</span>;
    } else if (mark === 'code') {
      element = (
        <code className="px-1.5 py-0.5 rounded bg-brand-surface-muted text-brand-teal-900 font-mono text-sm border border-brand-neutral-200" dir="ltr">
          {element}
        </code>
      );
    } else {
      const markDef = markDefs.find((def: any) => def._key === mark);
      if (markDef && markDef._type === 'link') {
        const isExternal = markDef.isExternal || markDef.href?.startsWith('http');
        if (isExternal) {
          element = (
            <a
              href={markDef.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal-800 hover:text-brand-teal-600 underline decoration-brand-teal-300 font-semibold transition-colors inline-flex items-center gap-0.5"
            >
              <span>{element}</span>
              <ExternalLink className="w-3.5 h-3.5 inline shrink-0 opacity-70" />
            </a>
          );
        } else {
          element = (
            <Link
              href={markDef.href || '#'}
              className="text-brand-teal-800 hover:text-brand-teal-600 underline decoration-brand-teal-300 font-semibold transition-colors"
            >
              {element}
            </Link>
          );
        }
      }
    }
  });

  return element;
}

function renderChildren(children: any[], markDefs: any[] = []) {
  if (!children || !Array.isArray(children)) return null;
  return children.map((child, idx) => (
    <React.Fragment key={child._key || idx}>
      {renderSpan(child, markDefs)}
    </React.Fragment>
  ));
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ value }) => {
  if (!value || !Array.isArray(value)) return null;

  // Group consecutive list items into listGroup blocks
  const processedBlocks: any[] = [];
  let currentList: any = null;

  for (let i = 0; i < value.length; i++) {
    const block = value[i];
    if (block._type === 'block' && block.listItem) {
      if (currentList && currentList.listItem === block.listItem) {
        currentList.items.push(block);
      } else {
        if (currentList) {
          processedBlocks.push(currentList);
        }
        currentList = {
          _type: 'listGroup',
          listItem: block.listItem,
          items: [block],
          _key: block._key || `list-group-${i}`,
        };
      }
    } else {
      if (currentList) {
        processedBlocks.push(currentList);
        currentList = null;
      }
      processedBlocks.push(block);
    }
  }
  if (currentList) {
    processedBlocks.push(currentList);
  }

  return (
    <div className="article-body-content text-brand-neutral-800 leading-[2.1] sm:leading-[2.25] text-base sm:text-lg">
      {processedBlocks.map((block, index) => {
        const key = block._key || index;

        // 1. Grouped Lists
        if (block._type === 'listGroup') {
          const isOrdered = block.listItem === 'number';

          if (isOrdered) {
            return (
              <ol key={key} className="space-y-3.5 my-8 pr-6 list-decimal marker:text-brand-teal-800 marker:font-bold marker:text-lg">
                {block.items.map((item: any, itemIdx: number) => {
                  let children = item.children;
                  if (Array.isArray(children) && children.length > 0) {
                    const firstTextIndex = children.findIndex(
                      (c) => c && typeof c.text === 'string' && c.text.trim().length > 0
                    );
                    if (firstTextIndex !== -1) {
                      const firstChild = children[firstTextIndex];
                      const cleanedText = firstChild.text.replace(
                        /^[\d\u0660-\u0669\u06F0-\u06F9]+[\.\-\:\)\s]+\s*/,
                        ''
                      );
                      children = [
                        ...children.slice(0, firstTextIndex),
                        { ...firstChild, text: cleanedText },
                        ...children.slice(firstTextIndex + 1),
                      ];
                    }
                  }
                  return (
                    <li key={item._key || itemIdx} className="pr-2 leading-relaxed">
                      {renderChildren(children, item.markDefs)}
                    </li>
                  );
                })}
              </ol>
            );
          }

          return (
            <ul key={key} className="space-y-3 my-8 pr-5 list-disc marker:text-brand-teal-700">
              {block.items.map((item: any, itemIdx: number) => (
                <li key={item._key || itemIdx} className="pr-2 leading-relaxed">
                  {renderChildren(item.children, item.markDefs)}
                </li>
              ))}
            </ul>
          );
        }

        // 2. Embedded Images
        if (block._type === 'image') {
          if (!block.asset) return null;
          let imgUrl = typeof block.asset === 'string' ? block.asset : '';
          try {
            if (!imgUrl && block.asset) {
              imgUrl = urlFor(block)?.width(1200).fit('max').auto('format').url() || '';
            }
          } catch {
            // fallback
          }

          if (!imgUrl) return null;

          return (
            <figure key={key} className="my-10 overflow-hidden rounded-3xl border border-brand-neutral-200/80 bg-brand-surface-muted shadow-soft">
              <img
                src={imgUrl}
                alt={block.alt || 'تصویر مقاله بلومیا کلاب'}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover max-h-[550px]"
              />
              {block.caption && (
                <figcaption className="p-4 text-center text-xs sm:text-sm text-brand-neutral-500 bg-brand-surface border-t border-brand-neutral-200/60">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // 3. Callout Boxes
        if (block._type === 'callout') {
          const tone = block.tone || 'tip';
          const isWarning = tone === 'warning';
          const isInfo = tone === 'info';

          return (
            <div
              key={key}
              className={`my-8 p-6 rounded-2xl border-r-4 transition-all ${
                isWarning
                  ? 'bg-amber-50/70 border-amber-500 text-amber-950'
                  : isInfo
                  ? 'bg-sky-50/70 border-sky-500 text-sky-950'
                  : 'bg-brand-teal-50 border-brand-teal-700 text-brand-teal-950'
              }`}
            >
              <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg mb-2">
                {isWarning ? (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                ) : isInfo ? (
                  <Info className="w-5 h-5 text-sky-600 shrink-0" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-brand-teal-700 shrink-0" />
                )}
                <span>{block.title || (isWarning ? 'نکته احتیاطی' : isInfo ? 'اطلاعات تکمیلی' : 'بینش کاربردی کوچینگ')}</span>
              </div>
              <div className="text-sm sm:text-base leading-relaxed opacity-95">
                {block.content}
              </div>
            </div>
          );
        }

        // 4. Key Takeaways Box
        if (block._type === 'keyTakeaways') {
          return (
            <div key={key} className="my-10 p-6 sm:p-7 rounded-3xl bg-brand-teal-900 text-white shadow-elevated">
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-brand-teal-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-teal-300 shrink-0" />
                <span>{block.title || 'نکات کلیدی این بخش'}</span>
              </h4>
              <ul className="space-y-3 pr-2 text-sm sm:text-base text-brand-teal-50/90 leading-relaxed">
                {(block.points || []).map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-300 mt-2.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // 5. Highlighted Stat Box
        if (block._type === 'highlightedStat') {
          return (
            <div key={key} className="my-10 p-8 rounded-3xl bg-brand-surface-muted border border-brand-neutral-200 text-center shadow-soft">
              <div className="text-4xl sm:text-5xl font-black text-brand-teal-900 mb-2 font-sans tracking-tight">
                {block.number}
              </div>
              <div className="text-base sm:text-lg font-bold text-brand-neutral-800 max-w-lg mx-auto">
                {block.label}
              </div>
              {block.source && (
                <div className="mt-2 text-xs text-brand-neutral-500">
                  منبع: {block.source}
                </div>
              )}
            </div>
          );
        }

        // 6. Unified FAQ Section Box
        if (block._type === 'faqSection') {
          return (
            <div key={key} className="my-12 p-6 sm:p-8 rounded-3xl bg-brand-surface border border-brand-neutral-200 shadow-soft">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-neutral-900 mb-6 pb-3 border-b border-brand-neutral-200">
                {block.title || 'پرسش‌های متداول این مبحث'}
              </h3>
              <div className="space-y-6">
                {(block.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-brand-teal-900">
                      {item.question}
                    </h4>
                    <p className="text-sm sm:text-base text-brand-neutral-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 7. Video Embed
        if (block._type === 'videoEmbed') {
          if (!block.videoId) return null;
          const src =
            block.provider === 'aparat'
              ? `https://www.aparat.com/video/video/embed/videohash/${block.videoId}/vt/frame`
              : `https://www.youtube.com/embed/${block.videoId}`;

          return (
            <div key={key} className="my-10 rounded-3xl overflow-hidden border border-brand-neutral-200 shadow-soft">
              {block.title && (
                <div className="p-4 bg-brand-surface border-b border-brand-neutral-200 text-sm font-bold text-brand-neutral-800">
                  {block.title}
                </div>
              )}
              <div className="relative aspect-video w-full bg-black">
                <iframe src={src} title={block.title || 'ویدیو'} allowFullScreen className="absolute inset-0 w-full h-full border-0" />
              </div>
            </div>
          );
        }

        // 8. Standard Typography Blocks
        if (block._type === 'block') {
          const children = renderChildren(block.children, block.markDefs);
          const style = block.style || 'normal';

          if (style === 'h2') {
            return (
              <h2
                key={key}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-neutral-900 mt-14 mb-5 pt-4 tracking-tight leading-snug"
              >
                {children}
              </h2>
            );
          }

          if (style === 'h3') {
            return (
              <h3
                key={key}
                className="text-lg sm:text-xl md:text-2xl font-bold text-brand-teal-900 mt-10 mb-4 tracking-tight leading-snug"
              >
                {children}
              </h3>
            );
          }

          if (style === 'h4') {
            return (
              <h4 key={key} className="text-base sm:text-lg font-bold text-brand-neutral-800 mt-8 mb-3">
                {children}
              </h4>
            );
          }

          if (style === 'blockquote') {
            return (
              <blockquote
                key={key}
                className="my-8 pr-6 pl-4 py-4 border-r-4 border-brand-teal-800 bg-brand-teal-50/40 rounded-2xl text-brand-neutral-800 font-medium italic text-base sm:text-lg"
              >
                {children}
              </blockquote>
            );
          }

          return (
            <p key={key} className="mb-6 leading-[2.1] sm:leading-[2.25]">
              {children}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};
