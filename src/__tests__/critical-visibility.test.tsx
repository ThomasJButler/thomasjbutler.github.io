import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

describe('CRITICAL: Content Visibility Issues', () => {
  test('HomePage elements are not hidden by opacity:0', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    // Check all elements with inline styles
    const elementsWithOpacity = container.querySelectorAll('[style*="opacity"]');
    
    console.log('Elements with opacity styles:', elementsWithOpacity.length);
    
    elementsWithOpacity.forEach(element => {
      const style = element.getAttribute('style');
      console.log('Element style:', style);
      
      // Check if opacity is 0
      if (style && style.includes('opacity: 0')) {
        console.warn('Found element with opacity: 0', {
          tagName: element.tagName,
          className: element.className,
          text: element.textContent?.substring(0, 50)
        });
      }
    });
    
    // Count visible vs hidden elements
    let visibleCount = 0;
    let hiddenCount = 0;
    
    const allElements = container.querySelectorAll('*');
    allElements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.opacity === '0' || style.display === 'none' || style.visibility === 'hidden') {
        hiddenCount++;
      } else {
        visibleCount++;
      }
    });
    
    console.log(`Visible: ${visibleCount}, Hidden: ${hiddenCount}`);
    
    // Most elements should be visible
    expect(visibleCount).toBeGreaterThan(hiddenCount);
  });

  test('Navigation items should be visible', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    const navItems = container.querySelectorAll('nav li');
    
    navItems.forEach(item => {
      const style = item.getAttribute('style');
      console.log('Nav item style:', style);
      
      // Navigation should not be hidden
      expect(style).not.toContain('opacity: 0');
    });
  });

  test('Main content sections are visible', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    // Check main content areas
    const sections = container.querySelectorAll('section, .hero, .content, main');
    
    sections.forEach(section => {
      const style = window.getComputedStyle(section);
      
      // Should be visible
      expect(parseFloat(style.opacity || '1')).toBeGreaterThan(0);
      expect(style.display).not.toBe('none');
      expect(style.visibility).not.toBe('hidden');
    });
  });
});