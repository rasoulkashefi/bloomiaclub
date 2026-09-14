import React from 'react';
import { urlFor } from '../lib/sanity';

function renderSpan(span, markDefs = []) {
  if (!span) return null;
  let text = span.text || '';

  if (!span.marks || span.marks.length === 0) {
    return text;
  }

  let element = text;

  span.marks.forEach((mark) => {
    if (mark === 'strong') {
      element = <strong>{element}</strong>;
    } else if (mark === 'em') {
      element = <em>{element}</em>;
    } else if (mark === 'code') {
      element = <code>{element}</code>;
    } else if (mark === 'underline') {
      element = <u>{element}</u>;
    } else if (mark === 'strike-through') {
      element = <del>{element}</del>;
    } else {
      const linkDef = markDefs.find((def) => def._key === mark || def._type === 'link');
      if (linkDef) {
        element = (
          <a
            href={linkDef.href}
            target={linkDef.isExternal ? '_blank' : undefined}
            rel={linkDef.isExternal ? 'noopener noreferrer' : undefined}
            className="portable-link"
          >
            {element}
          </a>
        );
      }
    }
  });

  return element;
}

function renderChildren(children, markDefs = []) {
  if (!children || !Array.isArray(children)) return null;
  return children.map((child, idx) => (
    <React.Fragment key={child._key || idx}>
      {renderSpan(child, markDefs)}
    </React.Fragment>
  ));
}

export const PortableTextRenderer = ({ value }) => {
  if (!value || !Array.isArray(value)) return null;

  // Group consecutive list items into listGroup blocks
  const processedBlocks = [];
  let currentList = null;

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
    <div className="portable-text-wrapper">
      {processedBlocks.map((block, index) => {
        const key = block._key || index;

        if (block._type === 'listGroup') {
          const Tag = block.listItem === 'number' ? 'ol' : 'ul';
          const listClass = block.listItem === 'number' ? 'portable-list-number' : 'portable-list-bullet';
          return (
            <Tag key={key} className={listClass}>
              {block.items.map((item, itemIdx) => {
                const itemChildren = renderChildren(item.children, item.markDefs);
                return <li key={item._key || itemIdx}>{itemChildren}</li>;
              })}
            </Tag>
          );
        }

        if (block._type === 'image') {
          if (!block.asset) return null;
          const imgUrl = typeof block.asset === 'string'
            ? block.asset
            : urlFor(block).width(1200).fit('max').auto('format').url();

          return (
            <figure key={key} className="portable-image-container">
              <img
                src={imgUrl}
                alt={block.alt || 'تصویر مقاله بلومیا'}
                loading="lazy"
                decoding="async"
                className="portable-image"
              />
              {block.caption && <figcaption className="portable-image-caption">{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block._type === 'callout') {
          const toneMap = {
            tip: { bg: '#f0fdf4', border: '#16a34a', color: '#14532d', icon: '💡', title: 'نکته کاربردی' },
            warning: { bg: '#fffbeb', border: '#f59e0b', color: '#92400e', icon: '⚠️', title: 'هشدار' },
            info: { bg: '#eff6ff', border: '#3b82f6', color: '#1e40af', icon: 'ℹ️', title: 'اطلاعات' },
          };
          const style = toneMap[block.tone] || toneMap.tip;

          return (
            <div
              key={key}
              className="portable-callout"
              style={{
                backgroundColor: style.bg,
                borderRight: `4px solid ${style.border}`,
                color: style.color,
                padding: '1.25rem 1.6rem',
                borderRadius: '12px',
                margin: '2rem 0',
                direction: 'rtl',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                <span>{style.icon}</span>
                <span>{block.title || style.title}</span>
              </div>
              <div style={{ fontSize: '0.98rem', lineHeight: '1.8' }}>{block.content}</div>
            </div>
          );
        }

        if (block._type === 'keyTakeaways') {
          return (
            <div key={key} className="portable-key-takeaways">
              <div className="key-takeaways-header">
                <span>📌</span>
                <h4>{block.title || 'نکات کلیدی این بخش'}</h4>
              </div>
              <ul className="key-takeaways-list">
                {(block.points || []).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          );
        }

        if (block._type === 'highlightedStat') {
          return (
            <div key={key} className="portable-stat-box">
              <div className="stat-number">{block.number}</div>
              <div className="stat-label">{block.label}</div>
              {block.source && <div className="stat-source">منبع: {block.source}</div>}
            </div>
          );
        }

        if (block._type === 'faqSection') {
          return (
            <div key={key} className="portable-faq-box">
              <h3 className="faq-box-title">❓ {block.title || 'سوالات متداول'}</h3>
              <div className="faq-box-items">
                {(block.items || []).map((item, idx) => (
                  <div key={idx} className="faq-item">
                    <h4 className="faq-item-question">Q: {item.question}</h4>
                    <p className="faq-item-answer">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block._type === 'codeSnippet') {
          return (
            <div key={key} className="portable-code-box" style={{ direction: 'ltr' }}>
              <div className="code-language">{block.language || 'code'}</div>
              <pre>
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block._type === 'videoEmbed') {
          if (!block.videoId) return null;
          let src = block.provider === 'aparat'
            ? `https://www.aparat.com/video/video/embed/videohash/${block.videoId}/vt/frame`
            : `https://www.youtube.com/embed/${block.videoId}`;

          return (
            <div key={key} className="portable-video-embed">
              {block.title && <h4 className="video-embed-title">🎬 {block.title}</h4>}
              <div className="video-aspect-ratio">
                <iframe src={src} title={block.title || 'ویدیو'} allowFullScreen frameBorder="0" />
              </div>
            </div>
          );
        }

        if (block._type === 'block') {
          const children = renderChildren(block.children, block.markDefs);
          const style = block.style || 'normal';

          if (style === 'h2') return <h2 key={key} className="portable-h2">{children}</h2>;
          if (style === 'h3') return <h3 key={key} className="portable-h3">{children}</h3>;
          if (style === 'h4') return <h4 key={key} className="portable-h4">{children}</h4>;
          if (style === 'blockquote') return <blockquote key={key} className="portable-blockquote">{children}</blockquote>;

          return <p key={key} className="portable-paragraph">{children}</p>;
        }

        return null;
      })}
    </div>
  );
};

export default PortableTextRenderer;
