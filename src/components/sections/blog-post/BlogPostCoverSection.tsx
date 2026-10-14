import React from 'react';
import Image from 'next/image';
import { BlogPostDetail } from '@/lib/posts';

interface BlogPostCoverSectionProps {
  post: BlogPostDetail;
}

export const BlogPostCoverSection: React.FC<BlogPostCoverSectionProps> = ({ post }) => {
  return (
    <figure className="max-w-4xl mx-auto px-4 sm:px-6 my-6 sm:my-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-brand-neutral-100 border border-brand-neutral-200/80 shadow-soft">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>
      {post.imageCaption && (
        <figcaption className="mt-3 text-center text-xs sm:text-sm text-brand-neutral-500 leading-relaxed px-4">
          {post.imageCaption}
        </figcaption>
      )}
    </figure>
  );
};
