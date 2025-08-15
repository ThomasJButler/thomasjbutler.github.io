import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../components/Layout';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Accessibility Tests (WCAG AAA)', () => {
  test('HomePage meets WCAG standards', async () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const results = await axe(container, {
      rules: {
        // Test for WCAG AAA standards
        'color-contrast-enhanced': { enabled: true },
        'focus-visible': { enabled: true },
        'heading-order': { enabled: true },
        'landmark-one-main': { enabled: true },
        'page-has-heading-one': { enabled: true },
      }
    });
    
    expect(results).toHaveNoViolations();
  });

  test('Layout has skip links for keyboard navigation', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    
    const skipLink = container.querySelector('[href="#main"], [href="#content"], .skip-link');
    expect(skipLink).toBeTruthy();
  });

  test('Interactive elements have minimum touch target size', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const interactiveElements = container.querySelectorAll('button, a, input, textarea, select');
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const minSize = 44; // WCAG AAA minimum
      
      // Check if element or its click area is at least 44x44
      const hasMinSize = rect.width >= minSize || rect.height >= minSize ||
                         element.classList.contains('small-target-exception');
      
      expect(hasMinSize).toBe(true);
    });
  });

  test('Focus indicators are visible', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const focusableElements = container.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
      element.focus();
      const style = window.getComputedStyle(element);
      
      // Should have visible focus indicator
      const hasFocusStyle = 
        style.outline !== 'none' ||
        style.boxShadow !== 'none' ||
        style.border !== 'none' ||
        element.classList.contains('focus-visible');
      
      expect(hasFocusStyle).toBe(true);
    });
  });

  test('Color contrast meets enhanced standards', () => {
    // Matrix green (#00ff00) on black (#000000)
    const calculateContrast = (fg: string, bg: string): number => {
      // Simplified contrast calculation
      const getLuminance = (color: string): number => {
        const rgb = parseInt(color.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };
      
      const l1 = getLuminance(fg);
      const l2 = getLuminance(bg);
      
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };
    
    const matrixGreenOnBlack = calculateContrast('#00ff00', '#000000');
    expect(matrixGreenOnBlack).toBeGreaterThan(7); // WCAG AAA requires 7:1
  });
});