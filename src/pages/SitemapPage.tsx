import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

interface SiteLink {
  name: string;
  path: string;
  external?: boolean;
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

  // Site structure for clean minimalist design
  const mainPages: SiteLink[] = useMemo(() => [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SKILLS', path: '/skills' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'BLOG', path: '/blog' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' }
  ], []);

  const externalLinks: SiteLink[] = useMemo(() => [
    { name: 'GITHUB', path: 'https://github.com/ThomasJButler', external: true },
    { name: 'LINKEDIN', path: 'https://linkedin.com/in/thomasjbutler', external: true },
    { name: 'BUY ME A COFFEE', path: 'https://buymeacoffee.com/ojrwoqkgmv', external: true }
  ], []);

  // Memoize the current date to prevent unnecessary re-renders
  const lastUpdated = useMemo(() => new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }), []);

  // Helper function for rendering links
  const renderLink = (link: SiteLink, index: number) => {
    if (link.external) {
      return (
        <li key={index}>
          <a
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name} (opens in new tab)`}
          >
            {link.name}
          </a>
        </li>
      );
    }

    return (
      <li key={index}>
        <Link to={link.path}>
          {link.name}
        </Link>
      </li>
    );
  };

  return (
    <section id="sitemap" className="sitemap-container">
      <div className="container">
        <header>
          <h1 className="page-title">SITE MAP</h1>
        </header>

        <div className="sitemap-content">
          <div className="sitemap-column">
            <h2>MAIN PAGES</h2>
            <ul>
              {mainPages.map((link, index) => renderLink(link, index))}
            </ul>
          </div>

          <div className="sitemap-column">
            <h2>EXTERNAL</h2>
            <ul>
              {externalLinks.map((link, index) => renderLink(link, index + 100))}
            </ul>
          </div>
        </div>

        <div className="sitemap-last-updated">
          <p>Last updated: {lastUpdated}</p>
        </div>
      </div>
    </section>
  );
};

// Export memoized component for performance
export const SitemapPage = memo(SitemapPageComponent);