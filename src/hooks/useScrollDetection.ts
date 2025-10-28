/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Scroll detection hooks for header visibility and back-to-top functionality
 *              with throttled scroll handling and state management
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
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

/**
 * Comprehensive scroll detection with header visibility and back-to-top controls
 * @param {UseScrollDetectionOptions} [options={}] - Configuration options
 * @return {{ getState: Function, forceUpdate: Function, setHeaderVisible: Function, scrollToTop: Function, isInitialized: boolean }}
 */
export const useScrollDetection = (options: UseScrollDetectionOptions = {}) => {
  const scrollDetectionRef = useRef<ScrollDetection | null>(null);
  const stateRef = useRef<ScrollDetectionState>({
    isScrollingDown: false,
    isHeaderHidden: false,
    isBackToTopVisible: false,
    scrollY: 0
  });

  const defaultOptions = useMemo(() => ({
    headerSelector: 'header',
    backToTopSelector: '#back-to-top',
    showThreshold: 100,
    hideThreshold: 200,
    backToTopThreshold: 300,
    throttleMs: 16,
    enableBackToTop: false,
    ...options
  }), [options]);

  /**
   * @constructs Initialises scroll detection with cleanup on unmount
   */
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
  }, [defaultOptions]);

  /**
   * @listens defaultOptions - Updates scroll detection configuration when options change
   */
  useEffect(() => {
    if (scrollDetectionRef.current) {
      scrollDetectionRef.current.updateOptions(defaultOptions);
    }
  }, [defaultOptions]);

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

  const forceUpdate = useCallback(() => {
    if (scrollDetectionRef.current) {
      scrollDetectionRef.current.forceUpdate();
    }
  }, []);

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

/**
 * Simplified hook for header visibility management only
 * @param {UseScrollDetectionOptions} [options={}] - Configuration options
 * @return {{ getState: Function, setHeaderVisible: Function }}
 */
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

/**
 * Simplified hook for back-to-top functionality only
 * @param {number} [threshold=300] - Scroll distance before showing button
 * @return {{ isVisible: Function, scrollToTop: Function, threshold: number }}
 */
export const useBackToTop = (threshold: number = 300) => {
  const { getState, scrollToTop } = useScrollDetection({
    backToTopThreshold: threshold,
    enableBackToTop: false
  });

  return {
    isVisible: () => getState().isBackToTopVisible,
    scrollToTop,
    threshold
  };
};
