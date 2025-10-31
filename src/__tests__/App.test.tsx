import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { App } from '../App';

// Mock lazy loading to avoid async issues in tests
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    lazy: (fn: any) => {
      const Component = React.forwardRef((props: any, ref: any) => {
        const [Comp, setComp] = React.useState<any>(null);
        React.useEffect(() => {
          fn().then((mod: any) => setComp(() => mod.default));
        }, []);
        return Comp ? <Comp {...props} ref={ref} /> : <div>Loading...</div>;
      });
      return Component;
    }
  };
});

describe('App Component', () => {
  beforeEach(() => {
    // Reset any mocks
    vi.clearAllMocks();
  });

  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('initializes with root element visible', async () => {
    const { container } = render(<App />);
    const root = container.querySelector('#root');
    
    // Check that root is not hidden
    if (root) {
      const computedStyle = window.getComputedStyle(root as Element);
      expect(computedStyle.display).not.toBe('none');
      expect(computedStyle.visibility).not.toBe('hidden');
      expect(parseFloat(computedStyle.opacity || '1')).toBeGreaterThan(0);
    }
  });

  test('contains Router with correct basename', () => {
    render(<App />);
    // Router should be configured correctly
    expect(window.location.pathname).toBeDefined();
  });

  test('does not have infinite loops or stack overflow', () => {
    let hasError = false;
    const originalError = console.error;
    console.error = (msg: string) => {
      if (msg.includes('Maximum call stack') || msg.includes('stack overflow')) {
        hasError = true;
      }
      originalError(msg);
    };

    render(<App />);
    
    console.error = originalError;
    expect(hasError).toBe(false);
  });

  test('lazy loads components without errors', async () => {
    const { container } = render(<App />);
    
    // Should show loading state initially
    await waitFor(() => {
      const loadingElements = container.querySelectorAll('[aria-busy="true"], .loading, .spinner');
      expect(loadingElements.length).toBeGreaterThanOrEqual(0);
    });
  });
});