import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../components/Layout';

describe('Neurodiversity and Cognitive Load Tests', () => {
  test('provides motion reduction options', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    
    // Should have option to reduce motion
    const motionControl = container.querySelector(
      '[aria-label*="motion"], [aria-label*="animation"], .reduce-motion, .calm-mode'
    );
    
    expect(motionControl).toBeTruthy();
  });

  test('limits choices to reduce cognitive load', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Check primary navigation choices
    const navItems = container.querySelectorAll('nav a, nav button');
    
    // Should have reasonable number of choices (not overwhelming)
    expect(navItems.length).toBeLessThanOrEqual(7); // Miller's Law: 7±2 items
  });

  test('provides clear escape routes', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    
    // Should have home link or logo that returns to safety
    const escapeRoutes = container.querySelectorAll(
      'a[href="/"], a[href*="home"], .logo, .home-link'
    );
    
    expect(escapeRoutes.length).toBeGreaterThan(0);
  });

  test('uses gentle, encouraging language', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
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
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
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
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Check for overwhelming animations
    const animatedElements = container.querySelectorAll(
      '[class*="animate"], [class*="transition"], [style*="animation"]'
    );
    
    // Should not have too many simultaneous animations
    expect(animatedElements.length).toBeLessThan(10);
    
    // Check for autoplay media
    const autoplayMedia = container.querySelectorAll(
      'video[autoplay], audio[autoplay]'
    );
    
    expect(autoplayMedia.length).toBe(0);
  });

  test('provides clear feedback for actions', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
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
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Should have clear page structure
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