import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

interface SiteLink {
  name: string;
  path: string;
  description: string;
  external?: boolean;
}

interface SiteSection {
  title: string;
  links: SiteLink[];
}

const SitemapPageComponent: React.FC = () => {
  // SEO Configuration
  useSEO({
    title: 'Site Map - Thomas J Butler Portfolio Navigation',
    description: 'Complete navigation structure and site map for Thomas J Butler\'s portfolio website. Find all pages, blog articles, and external links.',
    keywords: 'sitemap, navigation, portfolio structure, website map, Thomas J Butler',
    ogTitle: 'Site Map - Thomas J Butler Portfolio',
    ogDescription: 'Navigate through all pages and content on Thomas J Butler\'s portfolio website',
    ogUrl: `${window.location.origin}/sitemap`,
    twitterTitle: 'Site Map - Thomas J Butler Portfolio',
    twitterDescription: 'Complete navigation structure for Thomas J Butler\'s portfolio',
    canonicalUrl: `${window.location.origin}/sitemap`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "name": "Site Map",
      "description": "Complete navigation structure for Thomas J Butler portfolio",
      "url": `${window.location.origin}/sitemap`
    }
  });

  // Memoize site structure to prevent unnecessary re-renders
  const siteStructure: SiteSection[] = useMemo(() => [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/', description: 'Portfolio homepage with featured projects' },
        { name: 'About Me', path: '/about', description: 'Learn about my journey and expertise' },
        { name: 'Skills', path: '/skills', description: 'Technical skills and proficiencies' },
        { name: 'Projects', path: '/projects', description: 'Complete project portfolio' },
        { name: 'Services', path: '/services', description: 'Services I offer' },
        { name: 'Contact', path: '/contact', description: 'Get in touch' }
      ]
    },
    {
      title: 'Blog',
      links: [
        { name: 'All Articles', path: '/blog', description: 'Thought leadership on AI and development' },
        { name: 'AI & Automation', path: '/blog?tag=ai', description: 'Articles about AI integration' },
        { name: 'Development', path: '/blog?tag=development', description: 'Development best practices' },
        { name: 'Human-Centered Tech', path: '/blog?tag=human', description: 'Technology for humans' }
      ]
    },
    {
      title: 'External Links',
      links: [
        { name: 'GitHub', path: 'https://github.com/ThomasJButler', description: 'View my code', external: true },
        { name: 'LinkedIn', path: 'https://linkedin.com/in/thomasjbutler', description: 'Professional profile', external: true },
        { name: 'Buy Me a Coffee', path: 'https://buymeacoffee.com/ojrwoqkgmv', description: 'Support my work', external: true }
      ]
    }
  ], []);

  // Memoize the current date to prevent unnecessary re-renders
  const lastUpdated = useMemo(() => new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }), []);

  // Helper function for rendering links with proper accessibility
  const renderLink = (link: SiteLink, index: number) => {
    const commonProps = {
      key: index,
      className: `sitemap-link ${link.external ? 'external' : ''}`,
      'aria-describedby': `link-desc-${index}`
    };

    if (link.external) {
      return (
        <a 
          {...commonProps}
          href={link.path} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`${link.name} (opens in new tab)`}
        >
          <span className="link-name">{link.name}</span>
          <i className="fas fa-external-link-alt" aria-hidden="true"></i>
          <span 
            id={`link-desc-${index}`} 
            className="link-description"
          >
            {link.description}
          </span>
        </a>
      );
    }

    return (
      <Link 
        {...commonProps}
        to={link.path}
        aria-label={link.name}
      >
        <span className="link-name">{link.name}</span>
        <span 
          id={`link-desc-${index}`} 
          className="link-description"
        >
          {link.description}
        </span>
      </Link>
    );
  };

  return (
    <section id="sitemap" className="sitemap-section">
      <div className="container">
        <header>
          <h1 className="page-title">Site Map</h1>
          <p className="page-subtitle">Complete navigation structure of thomasjbutler.me</p>
        </header>

        <nav className="sitemap-grid" role="navigation" aria-label="Site navigation">
          {siteStructure.map((section, sectionIndex) => (
            <section 
              key={sectionIndex} 
              className="sitemap-section"
              aria-labelledby={`section-${sectionIndex}`}
            >
              <h2 
                id={`section-${sectionIndex}`}
                className="section-title"
              >
                {section.title}
              </h2>
              <ul className="sitemap-links" role="list">
                {section.links.map((link, linkIndex) => {
                  const globalIndex = sectionIndex * 100 + linkIndex;
                  return (
                    <li key={linkIndex} role="listitem">
                      {renderLink(link, globalIndex)}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <footer className="sitemap-footer" role="contentinfo">
          <p>
            <time dateTime={new Date().toISOString()}>
              Last updated: {lastUpdated}
            </time>
          </p>
          <p>© {new Date().getFullYear()} Thomas J Butler. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

// Export memoized component for performance
export const SitemapPage = memo(SitemapPageComponent);