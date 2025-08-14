import React from 'react';
import { BlogPost } from '../utils/blogLoader';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="blog-card">
      {post.featured && (
        <div className="featured-badge">
          <i className="fas fa-star"></i> Featured
        </div>
      )}
      
      <div className="blog-card-header">
        <h2 className="blog-card-title">{post.title}</h2>
        <div className="blog-meta">
          <span className="read-time">
            <i className="far fa-clock"></i> {post.readTime} min read
          </span>
        </div>
      </div>

      <p className="blog-card-excerpt">{post.excerpt}</p>

      <div className="blog-card-footer">
        <div className="blog-tags">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
        
        <span className="read-more">
          Read More <i className="fas fa-arrow-right"></i>
        </span>
      </div>
    </article>
  );
};