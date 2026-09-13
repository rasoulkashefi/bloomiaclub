import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  estimatedReadTime,
  publishedAt,
  isFeatured,
  status,
  author->{
    name,
    "slug": slug.current,
    image,
    bio,
    jobTitle,
    coachSlug,
    isCoach,
    isAi
  },
  category->{
    title,
    "slug": slug.current,
    color
  }
`;

const SINGLE_POST_FIELDS = `
  ${POST_FIELDS},
  body,
  metaTitle,
  metaDescription,
  canonicalUrl,
  searchIntent,
  keywords,
  aiQuickAnswer,
  focusEntity,
  semanticEntities,
  targetQuestions
`;

export const useSanityAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "post" && status == "published"] | order(publishedAt desc) { ${POST_FIELDS} }`;
        const data = await sanityClient.fetch(query);
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching Sanity posts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export const useSanityFeaturedPost = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "post" && status == "published" && isFeatured == true][0] { ${POST_FIELDS} }`;
        const data = await sanityClient.fetch(query);
        setFeaturedPost(data || null);
      } catch (err) {
        console.error('Error fetching featured post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredPost, loading };
};

export const useSanityPostBySlug = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "post" && slug.current == $slug][0] { ${SINGLE_POST_FIELDS} }`;
        const data = await sanityClient.fetch(query, { slug });
        setPost(data || null);
      } catch (err) {
        console.error('Error fetching post by slug:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
