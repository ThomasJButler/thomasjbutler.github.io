import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SitemapPage } from '../SitemapPage';

// Mock the useSEO hook
jest.mock('@hooks/useSEO', () => ({
  useSEO: jest.fn()
}));

const renderSitemapPage = () => {
  return render(
    <BrowserRouter>
      <SitemapPage />
    </BrowserRouter>
  );
};

describe('SitemapPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderSitemapPage();
      expect(screen.getByText('Site Map')).toBeInTheDocument();
    });

    it('renders the page title and subtitle', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('heading', { level: 1, name: 'Site Map' })).toBeInTheDocument();
      expect(screen.getByText('Complete navigation structure of thomasjbutler.me')).toBeInTheDocument();
    });

    it('renders all main sections', () => {
      renderSitemapPage();
      
      expect(screen.getByText('Main Pages')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('External Links')).toBeInTheDocument();
    });
  });

  describe('Main Pages Section', () => {
    it('renders all main page links', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    });

    it('has correct internal link paths', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: 'About Me' })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/skills');
      expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
      expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    });

    it('displays descriptions for main pages', () => {
      renderSitemapPage();
      
      expect(screen.getByText('Portfolio homepage with featured projects')).toBeInTheDocument();
      expect(screen.getByText('Learn about my journey and expertise')).toBeInTheDocument();
      expect(screen.getByText('Technical skills and proficiencies')).toBeInTheDocument();
      expect(screen.getByText('Complete project portfolio')).toBeInTheDocument();
      expect(screen.getByText('Services I offer')).toBeInTheDocument();
      expect(screen.getByText('Get in touch')).toBeInTheDocument();
    });
  });

  describe('Blog Section', () => {
    it('renders all blog links', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('link', { name: 'All Articles' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'AI & Automation' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Development' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Human-Centered Tech' })).toBeInTheDocument();
    });

    it('has correct blog link paths with query parameters', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('link', { name: 'All Articles' })).toHaveAttribute('href', '/blog');
      expect(screen.getByRole('link', { name: 'AI & Automation' })).toHaveAttribute('href', '/blog?tag=ai');
      expect(screen.getByRole('link', { name: 'Development' })).toHaveAttribute('href', '/blog?tag=development');
      expect(screen.getByRole('link', { name: 'Human-Centered Tech' })).toHaveAttribute('href', '/blog?tag=human');
    });

    it('displays descriptions for blog sections', () => {
      renderSitemapPage();
      
      expect(screen.getByText('Thought leadership on AI and development')).toBeInTheDocument();
      expect(screen.getByText('Articles about AI integration')).toBeInTheDocument();
      expect(screen.getByText('Development best practices')).toBeInTheDocument();
      expect(screen.getByText('Technology for humans')).toBeInTheDocument();
    });
  });

  describe('External Links Section', () => {
    it('renders all external links', () => {
      renderSitemapPage();
      
      expect(screen.getByRole('link', { name: 'GitHub (opens in new tab)' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'LinkedIn (opens in new tab)' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Buy Me a Coffee (opens in new tab)' })).toBeInTheDocument();
    });

    it('has correct external link URLs and attributes', () => {
      renderSitemapPage();
      
      const githubLink = screen.getByRole('link', { name: 'GitHub (opens in new tab)' });
      const linkedinLink = screen.getByRole('link', { name: 'LinkedIn (opens in new tab)' });
      const coffeeLink = screen.getByRole('link', { name: 'Buy Me a Coffee (opens in new tab)' });
      
      expect(githubLink).toHaveAttribute('href', 'https://github.com/ThomasJButler');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/thomasjbutler');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      expect(coffeeLink).toHaveAttribute('href', 'https://buymeacoffee.com/ojrwoqkgmv');
      expect(coffeeLink).toHaveAttribute('target', '_blank');
      expect(coffeeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays external link icons', () => {
      renderSitemapPage();
      
      const externalIcons = screen.getAllByLabelText('', { selector: '.fa-external-link-alt' });
      expect(externalIcons).toHaveLength(3);
    });

    it('displays descriptions for external links', () => {
      renderSitemapPage();
      
      expect(screen.getByText('View my code')).toBeInTheDocument();
      expect(screen.getByText('Professional profile')).toBeInTheDocument();
      expect(screen.getByText('Support my work')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('renders footer with last updated date', () => {
      renderSitemapPage();
      
      expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
      expect(screen.getByText(/© \d{4} Thomas J Butler\. All rights reserved\./)).toBeInTheDocument();
    });

    it('shows current year in copyright', () => {
      renderSitemapPage();
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} Thomas J Butler. All rights reserved.`)).toBeInTheDocument();
    });

    it('has proper time element with datetime attribute', () => {
      renderSitemapPage();
      
      const timeElement = screen.getByText(/Last updated:/).closest('time');
      expect(timeElement).toHaveAttribute('dateTime');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderSitemapPage();
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      
      expect(mainHeading).toHaveTextContent('Site Map');
      expect(sectionHeadings).toHaveLength(3);
      expect(sectionHeadings[0]).toHaveTextContent('Main Pages');
      expect(sectionHeadings[1]).toHaveTextContent('Blog');
      expect(sectionHeadings[2]).toHaveTextContent('External Links');
    });

    it('has proper navigation landmark', () => {
      renderSitemapPage();
      
      const navigation = screen.getByRole('navigation', { name: 'Site navigation' });
      expect(navigation).toBeInTheDocument();
    });

    it('has proper list structure', () => {
      renderSitemapPage();
      
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(3); // One for each section
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });

    it('has proper aria-labelledby relationships', () => {
      renderSitemapPage();
      
      const sections = screen.getByRole('navigation').querySelectorAll('section');
      sections.forEach((section, index) => {
        expect(section).toHaveAttribute('aria-labelledby', `section-${index}`);
      });
    });

    it('has proper content info landmark', () => {
      renderSitemapPage();
      
      const contentInfo = screen.getByRole('contentinfo');
      expect(contentInfo).toBeInTheDocument();
    });

    it('has proper aria-describedby for links', () => {
      renderSitemapPage();
      
      const firstLink = screen.getByRole('link', { name: 'Home' });
      expect(firstLink).toHaveAttribute('aria-describedby');
    });
  });

  describe('Performance', () => {
    it('memoizes component to prevent unnecessary re-renders', () => {
      // This test verifies that the component is wrapped with memo
      expect(SitemapPage.type.$$typeof).toBe(Symbol.for('react.memo'));
    });

    it('renders efficiently with static data', () => {
      const { rerender } = renderSitemapPage();
      
      // Verify initial render
      expect(screen.getByText('Site Map')).toBeInTheDocument();
      
      // Re-render should not cause issues
      rerender(
        <BrowserRouter>
          <SitemapPage />
        </BrowserRouter>
      );
      
      expect(screen.getByText('Site Map')).toBeInTheDocument();
    });
  });

  describe('SEO', () => {
    it('calls useSEO hook with correct configuration', () => {
      const { useSEO } = require('@hooks/useSEO');
      renderSitemapPage();
      
      expect(useSEO).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Site Map - Thomas J Butler Portfolio Navigation',
          description: expect.stringContaining('Complete navigation structure'),
          keywords: expect.stringContaining('sitemap'),
          structuredData: expect.objectContaining({
            '@context': 'https://schema.org',
            '@type': 'SiteNavigationElement'
          })
        })
      );
    });
  });
});