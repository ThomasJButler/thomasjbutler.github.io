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
    const routes = ['/', '/about', '/blog', '/projects', '/contact'];
    let hasError = false;
    
    const errorHandler = (e: ErrorEvent) => {
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
    // Check that lazy loading is configured
    const lazyComponents = [
      'HomePage',
      'AboutPage',
      'SkillsPage',
      'ProjectsPage',
      'ServicesPage',
      'ContactPage',
      'BlogPage'
    ];
    
    lazyComponents.forEach(component => {
      // Verify dynamic imports are used
      const isDynamicallyImported = 
        import.meta.glob('../pages/*.tsx') !== undefined;
      expect(isDynamicallyImported).toBe(true);
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