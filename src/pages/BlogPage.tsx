/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Blog listing page with search, filtering, sorting, and pagination
 *              functionality for browsing articles
 */

import React, { useState, useEffect, useRef } from 'react';
import { useMatrixAnimation } from '../hooks/useMatrixAnimation';
import { animate, stagger } from 'animejs';
import {
  loadAllBlogPosts,
  searchBlogPosts,
  filterByTag,
  getAllTags,
  BlogPost
} from '../utils/blogLoader';
import '../css/blog.css';
import { BlogList } from '../components/BlogList';
import { BlogCardSkeleton } from '../components/SkeletonLoader';

/**
 * Blog page with search, filtering, sorting, and pagination
 * @return {JSX.Element}
 * @constructor
 */
export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const containerRef = useRef<HTMLDivElement>(null);
  const matrixAnim = useMatrixAnimation();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const loadedPosts = await loadAllBlogPosts();
      
      if (loadedPosts.length === 0) {
        setError('No blog posts found. Please check your connection and try again.');
      } else {
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
        setAllTags(getAllTags(loadedPosts));
      }
    } catch (err) {
      console.error('Error loading blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * @constructs Loads blog posts on component mount
   */
  useEffect(() => {
    loadPosts();
  }, []);

  /**
   * @listens loading - Triggers entrance animations after posts finish loading
   */
  useEffect(() => {
    if (containerRef.current && !loading) {
      matrixAnim.animateIn(containerRef.current);
      
      // Animate header elements
      animate(containerRef.current.querySelectorAll('.blog-header > *') as NodeListOf<HTMLElement>, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100),
        duration: 800,
        ease: 'outQuad'
      });
    }
  }, [loading, matrixAnim]);

  /**
   * @listens posts, searchQuery, selectedTag, sortBy - Updates filtered posts when filters change
   */
  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = searchBlogPosts(filtered, searchQuery);
    }

    if (selectedTag) {
      filtered = filterByTag(filtered, selectedTag);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      } else {
        return a.title.localeCompare(b.title); // Alphabetical
      }
    });

    setFilteredPosts(sorted);
    setCurrentPage(1); // Reset to first page when filters change
  }, [posts, searchQuery, selectedTag, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <div className="blog-header-container">
          <div className="blog-header">          
            <h1 className="blog-title">
              <span className="typing-effect">Loading Blog</span>
            </h1>
          </div>
          <div className="blog-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <div className="error-content">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Unable to Load Blog</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={loadPosts}>
            <i className="fas fa-redo"></i> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="blog-page">
      <div className="container">
        <header className="blog-header">
          <h1 className="blog-title">
            <span className="matrix-text">Thought Leadership</span>
            <span className="subtitle">Ideas on AI, Development & Human-Centered Tech</span>
          </h1>
          
          <div className="blog-stats">
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {posts.reduce((acc, post) => acc + post.readTime, 0)}
              </span>
              <span className="stat-label">Min Read Time</span>
            </div>
            <div className="stat">
              <span className="stat-number">{allTags.length}</span>
              <span className="stat-label">Topics</span>
            </div>
          </div>
        </header>

        <section className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              className="blog-search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          {/* Mobile filter toggle */}
          <button 
            className="filter-toggle mobile-only"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Toggle filters"
          >
            <i className="fas fa-filter"></i>
            <span>Filter by Topic</span>
            {selectedTag && <span className="active-badge">1</span>}
            <i className={`fas fa-chevron-${showFilters ? 'up' : 'down'}`}></i>
          </button>

          {/* Desktop and Mobile dropdown */}
          <div className={`tags-container ${!showFilters && 'collapsed-mobile'}`}>
            <div className="tags-dropdown-wrapper">
              <label htmlFor="topic-filter" className="tags-label">
                <i className="fas fa-tags"></i>
                Filter by topic:
              </label>

              {/* Unified dropdown for both desktop and mobile */}
              <select
                id="topic-filter"
                className="tags-select"
                value={selectedTag || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedTag(value === '' ? null : value);
                  setShowFilters(false);
                }}
              >
                <option value="">All Topics</option>
                {allTags.map(tag => {
                  const count = posts.filter(post => post.tags.includes(tag)).length;
                  return (
                    <option key={tag} value={tag}>
                      {tag} ({count})
                    </option>
                  );
                })}
              </select>

              {/* Clear selection button if tag is selected */}
              {selectedTag && (
                <button
                  className="clear-tag-btn"
                  onClick={() => setSelectedTag(null)}
                  aria-label="Clear topic filter"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="tags-dropdown-wrapper">
              <label htmlFor="sort-filter" className="tags-label">
                <i className="fas fa-sort"></i>
                Sort by:
              </label>

              <select
                id="sort-filter"
                className="tags-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              >
                <option value="date">Newest First</option>
                <option value="title">A-Z</option>
              </select>
            </div>
          </div>

          {(searchQuery || selectedTag) && (
            <div className="active-filters">
              <span>
                Showing {filteredPosts.length} of {posts.length} articles
              </span>
              <button className="clear-filters" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>

        <BlogList posts={currentPosts} />

        {filteredPosts.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              <span>
                Page {currentPage} of {totalPages} ({filteredPosts.length} articles)
              </span>
            </div>

            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left"></i>
              <span className="button-text">Previous</span>
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={currentPage === pageNumber ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span className="button-text">Next</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
