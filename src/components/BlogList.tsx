/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Blog post list container with staggered card entrance animations
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { BlogPost } from '../utils/blogLoader';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
}

/**
 * Animated blog post list component
 * @param {Object} props
 * @param {BlogPost[]} props.posts - Array of blog posts to display
 * @return {JSX.Element}
 * @constructor
 */
export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * @listens posts - Triggers staggered entrance animation when posts change
   */
  useEffect(() => {
    if (listRef.current && posts.length > 0) {
      animate(listRef.current.querySelectorAll('.blog-card') as NodeListOf<HTMLElement>, {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(50, { start: 100 }),
        duration: 600,
        ease: 'outQuad'
      });
    }
  }, [posts]);

  return (
    <div ref={listRef} className="blog-list">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          to={`/blog/${post.slug}`}
          className="blog-card-link"
        >
          <BlogCard post={post} />
        </Link>
      ))}
    </div>
  );
};
