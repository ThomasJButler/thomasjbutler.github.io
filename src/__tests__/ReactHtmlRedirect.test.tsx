import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, test, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Test component that mimics the current (broken) ReactHtmlRedirect
const BrokenReactHtmlRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect');
    
    console.log('BrokenReactHtmlRedirect - URL params:', window.location.search);
    console.log('BrokenReactHtmlRedirect - Redirect to:', redirectTo);
    
    if (redirectTo) {
      navigate('/' + redirectTo);
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  return <div>Redirecting...</div>;
};

// Test component with the fix
const FixedReactHtmlRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
  
  useEffect(() => {
    if (!hasRedirected) {
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get('redirect');
      
      console.log('FixedReactHtmlRedirect - URL params:', window.location.search);
      console.log('FixedReactHtmlRedirect - Redirect to:', redirectTo);
      
      setHasRedirected(true);
      
      if (redirectTo) {
        navigate('/' + redirectTo, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, hasRedirected]);
  
  return <div>Redirecting...</div>;
};

describe('ReactHtmlRedirect', () => {
  let originalLocation: Location;

  beforeAll(() => {
    originalLocation = window.location;
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    mockNavigate.mockClear();
    // Set URL with redirect param
    delete (window as any).location;
    (window as any).location = { 
      search: '?redirect=blog',
      href: 'http://localhost:3000/ThomasJButler/react.html?redirect=blog'
    };
  });

  describe('Broken Implementation', () => {
    test('demonstrates the double navigation bug', async () => {
      const { rerender } = render(
        <BrowserRouter>
          <BrokenReactHtmlRedirect />
        </BrowserRouter>
      );
      
      // Wait for initial navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/blog');
      });
      
      // Simulate URL change after navigation (what React Router does)
      window.location.search = '';
      
      // Force re-render (simulating Router state change)
      rerender(
        <BrowserRouter>
          <BrokenReactHtmlRedirect />
        </BrowserRouter>
      );
      
      // Wait for unintended second navigation
      await waitFor(() => {
        // BUG: navigate gets called twice, second time to home page
        expect(mockNavigate).toHaveBeenCalledTimes(2);
        expect(mockNavigate).toHaveBeenNthCalledWith(1, '/blog');
        expect(mockNavigate).toHaveBeenNthCalledWith(2, '/');
      });
    });
  });

  describe('Fixed Implementation', () => {
    test('should only navigate once despite multiple renders', async () => {
      const { rerender } = render(
        <BrowserRouter>
          <FixedReactHtmlRedirect />
        </BrowserRouter>
      );
      
      // Wait for initial navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/blog', { replace: true });
      });
      
      // Simulate URL change after navigation
      window.location.search = '';
      
      // Force re-render
      rerender(
        <BrowserRouter>
          <FixedReactHtmlRedirect />
        </BrowserRouter>
      );
      
      // Add small delay to ensure no second navigation occurs
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify navigate was only called once
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/blog', { replace: true });
    });

    test('handles missing redirect parameter correctly', async () => {
      // Set URL without redirect param
      window.location.search = '';
      
      render(
        <BrowserRouter>
          <FixedReactHtmlRedirect />
        </BrowserRouter>
      );
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
      });
      
      // Should still only be called once
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('handles different redirect targets', async () => {
      // Test with different redirect target
      window.location.search = '?redirect=about';
      
      render(
        <BrowserRouter>
          <FixedReactHtmlRedirect />
        </BrowserRouter>
      );
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/about', { replace: true });
      });
      
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});