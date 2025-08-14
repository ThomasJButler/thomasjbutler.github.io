import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { animate } from 'animejs';
import { loadBlogPost, BlogPost } from '../utils/blogLoader';

export const BlogReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('blogFontSize');
    return saved ? parseInt(saved) : 18;
  });
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  // Load blog post
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      const loadedPost = await loadBlogPost(slug);
      
      if (loadedPost) {
        setPost(loadedPost);
        // Parse markdown to HTML (simple version - in production use a proper markdown parser)
        const htmlContent = parseMarkdown(loadedPost.content);
        if (contentRef.current) {
          contentRef.current.innerHTML = htmlContent;
        }
      } else {
        navigate('/blog');
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

  // Simple markdown parser (for production, use marked or remark)
  const parseMarkdown = (markdown: string): string => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      // Code blocks
      .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Lists
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Wrap in paragraphs
    if (!html.startsWith('<')) {
      html = `<p>${html}</p>`;
    }
    
    return html;
  };

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

  if (!post) {
    return (
      <div className="blog-reader-error">
        <h2>Article not found</h2>
        <Link to="/blog" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>
      </div>
    );
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
            ref={contentRef}
            className="article-content"
            style={{ lineHeight: fontSize >= 20 ? '1.8' : '1.6' }}
          />

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