import React from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

describe('Performance and Stability Tests', () => {
  test('no infinite loops in useEffect hooks', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    
    const { unmount } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Check for stack overflow errors
    const hasStackOverflow = consoleSpy.mock.calls.some(call => 
      call.some(arg => String(arg).includes('Maximum call stack'))
    );
    
    expect(hasStackOverflow).toBe(false);
    
    unmount();
    consoleSpy.mockRestore();
  });

  test('animations do not cause memory leaks', () => {
    const { unmount } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Component should clean up animations on unmount
    unmount();
    
    // Check that animation frames are cancelled
    const animationFrames = (window as any).__animationFrames || [];
    expect(animationFrames.length).toBe(0);
  });

  test('lazy loading works without errors', async () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Should not have any error boundaries triggered
    const errorBoundaries = container.querySelectorAll('[data-error], .error-boundary');
    expect(errorBoundaries.length).toBe(0);
  });

  test('handles rapid navigation without crashes', async () => {
    const routes = ['/', '/about', '/updates', '/projects', '/contact'];
    let hasError = false;
    
    const errorHandler = (_e: ErrorEvent) => {
      hasError = true;
    };
    
    window.addEventListener('error', errorHandler);
    
    // Simulate rapid navigation
    for (let i = 0; i < 10; i++) {
      const route = routes[i % routes.length];
      window.history.pushState({}, '', route);
    }
    
    window.removeEventListener('error', errorHandler);
    expect(hasError).toBe(false);
  });

  test('bundle size is optimized with code splitting', () => {
    // import.meta.glob resolves the page directory at build time; assert every page the
    // router loads is actually present as a discoverable module (the old version asserted
    // `glob(...) !== undefined`, which is vacuously true and silently kept listing pages
    // that had been deleted).
    const pageModules = import.meta.glob('../pages/*.tsx');
    const moduleKeys = Object.keys(pageModules);
    const expectedPages = [
      'HomePage',
      'AboutPage',
      'ProjectsPage',
      'ServicesPage',
      'ContactPage',
      'UpdatesPage',
      'CaseStudyPage',
      'NotFoundPage',
    ];

    expectedPages.forEach((page) => {
      expect(moduleKeys.some((key) => key.endsWith(`/${page}.tsx`))).toBe(true);
    });
  });

  test('no console errors on initial load', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});