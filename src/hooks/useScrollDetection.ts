/**
 * React Hook for Scroll Detection
 * Provides scroll-based header visibility and back-to-top functionality
 * for React components in the Thomas J Butler portfolio
 */

import { useEffect, useRef, useCallback } from 'react';
import { ScrollDetection } from '../utils/scrollDetection';

interface UseScrollDetectionOptions {
  headerSelector?: string;
  backToTopSelector?: string;
  showThreshold?: number;
  hideThreshold?: number;
  backToTopThreshold?: number;
  throttleMs?: number;
  enableBackToTop?: boolean;
}

interface ScrollDetectionState {
  isScrollingDown: boolean;
  isHeaderHidden: boolean;
  isBackToTopVisible: boolean;
  scrollY: number;
}

export const useScrollDetection = (options: UseScrollDetectionOptions = {}) => {
  const scrollDetectionRef = useRef<ScrollDetection | null>(null);
  const stateRef = useRef<ScrollDetectionState>({
    isScrollingDown: false,
    isHeaderHidden: false,
    isBackToTopVisible: false,
    scrollY: 0
  });

  const defaultOptions = {
    headerSelector: 'header',
    backToTopSelector: '#back-to-top',
    showThreshold: 100,
    hideThreshold: 200,
    backToTopThreshold: 300,
    throttleMs: 16,
    enableBackToTop: true,
    ...options
  };

  // Initialize scroll detection
  useEffect(() => {
    if (!scrollDetectionRef.current) {
      scrollDetectionRef.current = new ScrollDetection(defaultOptions);
      scrollDetectionRef.current.init();
    }

    return () => {
      if (scrollDetectionRef.current) {
        scrollDetectionRef.current.destroy();
        scrollDetectionRef.current = null;
      }
    };
  }, []);

  // Update options when they change
  useEffect(() => {
    if (scrollDetectionRef.current) {
      scrollDetectionRef.current.updateOptions(defaultOptions);
    }
  }, [JSON.stringify(defaultOptions)]);

  // Get current state
  const getState = useCallback((): ScrollDetectionState => {
    if (scrollDetectionRef.current) {
      const state = scrollDetectionRef.current.getState();
      return {
        isScrollingDown: state.isScrollingDown,
        isHeaderHidden: state.isHeaderHidden,
        isBackToTopVisible: state.isBackToTopVisible,
        scrollY: window.scrollY
      };
    }
    return stateRef.current;
  }, []);

  // Force update visibility
  const forceUpdate = useCallback(() => {
    if (scrollDetectionRef.current) {
      scrollDetectionRef.current.forceUpdate();
    }
  }, []);

  // Manually control header visibility
  const setHeaderVisible = useCallback((visible: boolean) => {
    const header = document.querySelector(defaultOptions.headerSelector);
    if (header) {
      if (visible) {
        header.classList.remove('header-hidden');
        header.removeAttribute('aria-hidden');
      } else {
        header.classList.add('header-hidden');
        header.setAttribute('aria-hidden', 'true');
      }
    }
  }, [defaultOptions.headerSelector]);

  // Scroll to top programmatically
  const scrollToTop = useCallback((smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, []);

  return {
    getState,
    forceUpdate,
    setHeaderVisible,
    scrollToTop,
    isInitialized: !!scrollDetectionRef.current
  };
};

// Helper hook for just header visibility
export const useHeaderVisibility = (options: UseScrollDetectionOptions = {}) => {
  const { getState, setHeaderVisible } = useScrollDetection({
    ...options,
    enableBackToTop: false
  });

  return {
    getState: () => {
      const state = getState();
      return {
        isHeaderHidden: state.isHeaderHidden,
        isScrollingDown: state.isScrollingDown,
        scrollY: state.scrollY
      };
    },
    setHeaderVisible
  };
};

// Helper hook for just back-to-top functionality
export const useBackToTop = (threshold: number = 300) => {
  const { getState, scrollToTop } = useScrollDetection({
    backToTopThreshold: threshold,
    enableBackToTop: false  // Don't create DOM elements, only manage state
  });

  return {
    isVisible: () => getState().isBackToTopVisible,
    scrollToTop,
    threshold
  };
};