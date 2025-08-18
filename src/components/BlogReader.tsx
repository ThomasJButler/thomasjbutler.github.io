import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { animate } from 'animejs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadBlogPost, BlogPost } from '../utils/blogLoader';

// Custom components for ReactMarkdown
const markdownComponents = {
  h1: ({children}: any) => <h1 className="article-h1">{children}</h1>,
  h2: ({children}: any) => <h2 className="article-h2">{children}</h2>,
  h3: ({children}: any) => <h3 className="article-h3">{children}</h3>,
  h4: ({children}: any) => <h4 className="article-h4">{children}</h4>,
  p: ({children}: any) => <p className="article-paragraph">{children}</p>,
  ul: ({children}: any) => <ul className="article-list">{children}</ul>,
  ol: ({children}: any) => <ol className="article-list article-list-ordered">{children}</ol>,
  li: ({children}: any) => <li className="article-list-item">{children}</li>,
  blockquote: ({children}: any) => <blockquote className="article-blockquote">{children}</blockquote>,
  code: ({inline, children}: any) => 
    inline ? (
      <code className="inline-code">{children}</code>
    ) : (
      <pre className="code-block">
        <code>{children}</code>
      </pre>
    ),
  a: ({href, children}: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="article-link">
      {children}
    </a>
  ),
  img: ({src, alt}: any) => (
    <img src={src} alt={alt} className="article-image" loading="lazy" />
  ),
  table: ({children}: any) => (
    <div className="table-wrapper">
      <table className="article-table">{children}</table>
    </div>
  ),
};

export const BlogReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('blogFontSize');
    return saved ? parseInt(saved) : 18;
  });
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Load blog post
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No blog post specified');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const loadedPost = await loadBlogPost(slug);
        
        if (loadedPost) {
          setPost(loadedPost);
          console.log('Loading blog post:', loadedPost.title);
          console.log('Raw content length:', loadedPost.content.length);
          
          // Content will be rendered directly by ReactMarkdown
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      }
      
      setLoading(false);
    };
    
    loadPost();
  }, [slug, navigate]);

  // Animate on mount
  useEffect(() => {
    if (!loading && articleRef.current) {
      animate(articleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: 'outQuad'
      });
    }
  }, [loading]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(24, Math.max(14, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('blogFontSize', newSize.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/blog');
    }
  };

  if (loading) {
    return (
      <div className="blog-reader-loading">
        <div className="matrix-spinner">
          <span>Loading article...</span>
        </div>
      </div>
    );
  }

  if (error || (!loading && !post)) {
    return (
      <div className="blog-reader-error">
        <h2>{error || 'Article not found'}</h2>
        <p>The blog post you're looking for could not be loaded.</p>
        <Link to="/blog" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return null; // Still loading
  }

  return (
    <div className="blog-reader" onKeyDown={handleKeyPress}>
      {/* Reading progress bar */}
      <div className="reading-progress-bar">
        <div 
          className="reading-progress-fill" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader header */}
      <header className="reader-header">
        <div className="reader-header-content">
          <Link to="/blog" className="back-button">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Blog</span>
          </Link>
          
          <div className="reader-controls">
            <div className="font-controls">
              <button 
                onClick={() => adjustFontSize(-2)}
                className="font-size-btn"
                title="Decrease font size"
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="font-size-label">{fontSize}px</span>
              <button 
                onClick={() => adjustFontSize(2)}
                className="font-size-btn"
                title="Increase font size"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article content */}
      <article ref={articleRef} className="blog-article">
        <div className="article-container" style={{ fontSize: `${fontSize}px` }}>
          <header className="article-header">
            <h1 className="article-title">{post.title}</h1>
            
            <div className="article-meta">
              <span className="read-time">
                <i className="far fa-clock"></i> {post.readTime} min read
              </span>
              <span className="article-date">
                <i className="far fa-calendar"></i> {post.publishDate}
              </span>
            </div>

            <div className="article-tags">
              {post.tags.map(tag => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="article-content"
            style={{ lineHeight: fontSize >= 20 ? '1.8' : '1.6' }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="article-footer">
            <div className="article-nav">
              <Link to="/blog" className="nav-link">
                <i className="fas fa-th"></i>
                <span>All Articles</span>
              </Link>
            </div>

            <div className="share-section">
              <span className="share-label">Share this article:</span>
              <div className="share-buttons">
                <button 
                  className="share-btn"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  title="Copy link"
                >
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Mobile bottom bar */}
      <div className="mobile-bottom-bar">
        <Link to="/blog" className="mobile-back">
          <i className="fas fa-arrow-left"></i>
        </Link>
        
        <div className="mobile-font-controls">
          <button onClick={() => adjustFontSize(-2)}>
            <i className="fas fa-minus"></i>
          </button>
          <span>{fontSize}px</span>
          <button onClick={() => adjustFontSize(2)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        <div className="progress-indicator">
          {Math.round(readingProgress)}%
        </div>
      </div>
    </div>
  );
};