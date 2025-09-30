import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { animate } from 'animejs';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { loadBlogPost, BlogPost } from '../utils/blogLoader';
import '../css/components/markdown-preview-override.css';

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
  const [showShareToast, setShowShareToast] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
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

  // Track reading progress with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrollTop = window.scrollY;
          const progress = (scrollTop / documentHeight) * 100;
          setReadingProgress(Math.min(100, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(24, Math.max(14, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('blogFontSize', newSize.toString());
  };

  const shareArticle = async (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    const text = `Check out this article: ${title}`;
    
    switch (platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setShareMessage('Link copied to clipboard!');
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 3000);
        } catch (err) {
          setShareMessage('Failed to copy link');
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 3000);
        }
        break;
      
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/blog');
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'ArrowDown' && e.ctrlKey) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else if (e.key === '+' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      adjustFontSize(2);
    } else if (e.key === '-' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      adjustFontSize(-2);
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
      <div className="reading-progress-bar" role="progressbar" aria-valuenow={readingProgress} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="reading-progress-fill" 
          style={{ width: `${readingProgress}%` }}
        />
        <div className="progress-glow" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Mobile top bar - moved from bottom */}
      <div className="mobile-top-bar">
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
              <span className="reading-position">
                <i className="fas fa-book-reader"></i> {Math.round(readingProgress)}% read
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
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: fontSize >= 20 ? '1.8' : '1.7'
            }}
          >
            <MarkdownPreview
              source={post.content}
              style={{
                background: 'transparent',
                color: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                padding: 0
              }}
              wrapperElement={{
                'data-color-mode': 'dark'
              }}
              skipHtml={false}
              className="blog-markdown-content"
            />
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
                  onClick={() => shareArticle('copy')}
                  title="Copy link"
                  aria-label="Copy link to clipboard"
                >
                  <i className="fas fa-link"></i>
                </button>
                <button 
                  className="share-btn"
                  onClick={() => shareArticle('twitter')}
                  title="Share on Twitter"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button 
                  className="share-btn"
                  onClick={() => shareArticle('linkedin')}
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </button>
                <button 
                  className="share-btn"
                  onClick={() => shareArticle('email')}
                  title="Share via Email"
                  aria-label="Share via Email"
                >
                  <i className="fas fa-envelope"></i>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>


      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="share-toast">
          <i className="fas fa-check-circle"></i>
          <span>{shareMessage}</span>
        </div>
      )}
    </div>
  );
};