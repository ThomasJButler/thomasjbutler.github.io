import React from 'react';
import { Providers } from '@/Providers';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../components/layout/Layout';

describe('Neurodiversity and Cognitive Load Tests', () => {
  test('provides motion reduction options', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <Layout />
      </Providers></BrowserRouter>
    );
    
    // Should have a control for motion/effects. Case-insensitive: the MotionToggle's
    // accessible name is "Motion and effects" (sentence case).
    const motionControl = container.querySelector(
      '[aria-label*="motion" i], [aria-label*="animation" i], [aria-label*="effects" i], .reduce-motion, .calm-mode'
    );

    expect(motionControl).toBeTruthy();
  });

  test('limits choices to reduce cognitive load', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    // Check primary navigation choices
    const navItems = container.querySelectorAll('nav a, nav button');
    
    // Should have reasonable number of choices (not overwhelming)
    expect(navItems.length).toBeLessThanOrEqual(7); // Miller's Law: 7±2 items
  });

  test('provides clear escape routes', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <Layout />
      </Providers></BrowserRouter>
    );
    
    // Should have home link or logo that returns to safety
    const escapeRoutes = container.querySelectorAll(
      'a[href="/"], a[href*="home"], .logo, .home-link'
    );
    
    expect(escapeRoutes.length).toBeGreaterThan(0);
  });

  test('uses gentle, encouraging language', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    const text = container.textContent || '';
    
    // Should not contain harsh or demanding language
    const harshWords = [
      'must',
      'required',
      'mandatory',
      'failed',
      'error',
      'wrong',
      'invalid'
    ];
    
    harshWords.forEach(word => {
      const containsHarshWord = text.toLowerCase().includes(word);
      if (containsHarshWord) {
        // Check if it's in a gentle context
        const context = text.substring(
          text.toLowerCase().indexOf(word) - 20,
          text.toLowerCase().indexOf(word) + 20
        );
        
        // Allow if part of gentle phrasing
        const isGentle = context.includes('please') || 
                         context.includes('optional') ||
                         context.includes('help');
        
        expect(isGentle).toBe(true);
      }
    });
  });

  test('provides predictable interactions', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    // All links should have clear indicators
    const links = container.querySelectorAll('a');
    
    links.forEach(link => {
      const hasHref = link.hasAttribute('href');
      const hasRole = link.hasAttribute('role');
      const hasAriaLabel = link.hasAttribute('aria-label');
      
      // Should be predictable
      expect(hasHref || hasRole || hasAriaLabel).toBe(true);
    });
  });

  test('avoids sensory overwhelm', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );

    // Counting elements whose class happens to contain "transition" measures
    // Tailwind utilities, not motion — hover colour fades are not sensory overwhelm.
    // What actually matters is that under reduced motion (the default in these tests)
    // nothing animates on its own: no autoplaying media and no looping animations.
    const autoplayMedia = container.querySelectorAll('video[autoplay], audio[autoplay]');
    expect(autoplayMedia.length).toBe(0);

    const infiniteAnimations = container.querySelectorAll(
      '[style*="animation-iteration-count: infinite"], [class*="animate-spin"], [class*="animate-ping"]'
    );
    expect(infiniteAnimations.length).toBe(0);
  });

  test('provides clear feedback for actions', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    // Buttons should have clear states
    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(button => {
      const hasAriaLabel = button.hasAttribute('aria-label');
      const hasText = button.textContent && button.textContent.trim().length > 0;
      const hasTitle = button.hasAttribute('title');
      
      // Should provide clear feedback
      expect(hasAriaLabel || hasText || hasTitle).toBe(true);
    });
  });

  test('supports executive function with clear structure', () => {
    // Landmarks live in the shell, so render Layout rather than a bare page.
    const { container } = render(
      <BrowserRouter><Providers>
        <Layout />
      </Providers></BrowserRouter>
    );

    const landmarks = container.querySelectorAll(
      'header, nav, main, footer, section[aria-label], article'
    );

    expect(landmarks.length).toBeGreaterThan(0);
    
    // Should have consistent heading hierarchy
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    let hasValidHierarchy = true;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      if (level > lastLevel + 1) {
        hasValidHierarchy = false;
      }
      lastLevel = level;
    });
    
    expect(hasValidHierarchy).toBe(true);
  });
});