import React from 'react';
import { Providers } from '@/Providers';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';

describe('Content Visibility Tests', () => {
  test('HomePage content is visible', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    // Check that main content is not hidden
    const mainContent = container.querySelector('main, .content, .hero, section');
    if (mainContent) {
      const style = window.getComputedStyle(mainContent);
      expect(style.display).not.toBe('none');
      expect(style.visibility).not.toBe('hidden');
      expect(parseFloat(style.opacity || '1')).toBeGreaterThan(0);
    }

    // Check for text content
    const hasVisibleText = container.textContent && container.textContent.trim().length > 0;
    expect(hasVisibleText).toBe(true);
  });

  test('AboutPage content is visible', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <AboutPage />
      </Providers></BrowserRouter>
    );
    
    const hasVisibleText = container.textContent && container.textContent.trim().length > 0;
    expect(hasVisibleText).toBe(true);
  });

  test('No elements have opacity 0 by default', () => {
    const { container } = render(
      <BrowserRouter><Providers>
        <HomePage />
      </Providers></BrowserRouter>
    );
    
    const allElements = container.querySelectorAll('*');
    let invisibleCount = 0;
    
    allElements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.opacity === '0' && !element.classList.contains('animate')) {
        invisibleCount++;
      }
    });
    
    // Allow some elements to be invisible for animations, but not majority
    expect(invisibleCount).toBeLessThan(allElements.length * 0.1);
  });
});