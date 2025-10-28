import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  mountTime: number;
  updateCount: number;
}

interface PerformanceConfig {
  componentName: string;
  enableLogging?: boolean;
  logThreshold?: number; // Log if render time exceeds this threshold (ms)
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

export const usePerformanceMonitor = (config: PerformanceConfig) => {
  const {
    componentName,
    enableLogging = process.env.NODE_ENV === 'development',
    logThreshold = 16, // Target 60fps = 16.67ms per frame
    onMetrics
  } = config;

  const renderStartTime = useRef<number>(0);
  const mountTime = useRef<number>(0);
  const updateCount = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);

  // Mark render start
  renderStartTime.current = performance.now();

  useEffect(() => {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;

    if (isFirstRender.current) {
      mountTime.current = renderTime;
      isFirstRender.current = false;
    } else {
      updateCount.current += 1;
    }

    const metrics: PerformanceMetrics = {
      componentName,
      renderTime,
      mountTime: mountTime.current,
      updateCount: updateCount.current
    };

    if (enableLogging && renderTime > logThreshold) {
      console.warn(
        `[PERF] Slow render detected in ${componentName}:`,
        `${renderTime.toFixed(2)}ms (threshold: ${logThreshold}ms)`
      );
    }

    // Call custom metrics handler
    if (onMetrics) {
      onMetrics(metrics);
    }

    if (enableLogging && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.groupCollapsed(`[PERF] ${componentName} Performance`);
      console.warn(`Render time: ${renderTime.toFixed(2)}ms`);
      console.warn(`Mount time: ${mountTime.current.toFixed(2)}ms`);
      console.warn(`Update count: ${updateCount.current}`);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  });

  // Return performance utilities
  return {
    markStart: (label: string) => performance.mark(`${componentName}-${label}-start`),
    markEnd: (label: string) => {
      performance.mark(`${componentName}-${label}-end`);
      performance.measure(
        `${componentName}-${label}`,
        `${componentName}-${label}-start`,
        `${componentName}-${label}-end`
      );
    },
    measureAsync: async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
      const start = performance.now();
      try {
        const result = await fn();
        const end = performance.now();
        if (enableLogging) {
          console.warn(`[PERF] ${componentName} ${label}: ${(end - start).toFixed(2)}ms`);
        }
        return result;
      } catch (error) {
        const end = performance.now();
        if (enableLogging) {
          console.error(`[ERROR] ${componentName} ${label} failed after ${(end - start).toFixed(2)}ms:`, error);
        }
        throw error;
      }
    }
  };
};

// Web Vitals monitoring hook
export const useWebVitals = (enableLogging = process.env.NODE_ENV === 'development') => {
  useEffect(() => {
    if (!enableLogging) return;

    // Measure Largest Contentful Paint (LCP)
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry && enableLogging) {
            console.warn(`[LCP] ${lastEntry.startTime.toFixed(2)}ms`);
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        return () => observer.disconnect();
      } catch (error) {
        console.warn('LCP measurement not supported:', error);
      }
    };

    // Measure First Input Delay (FID)
    const observeFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (enableLogging) {
              console.warn(`[FID] ${entry.processingStart - entry.startTime}ms`);
            }
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
        
        return () => observer.disconnect();
      } catch (error) {
        console.warn('FID measurement not supported:', error);
      }
    };

    // Measure Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          if (enableLogging) {
            console.warn(`[CLS] ${clsValue.toFixed(4)}`);
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        return () => observer.disconnect();
      } catch (error) {
        console.warn('CLS measurement not supported:', error);
      }
    };

    const cleanupFunctions = [
      observeLCP(),
      observeFID(),
      observeCLS()
    ].filter(Boolean);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup && cleanup());
    };
  }, [enableLogging]);
};

// Performance budget monitoring
export const usePerformanceBudget = (budget: { [key: string]: number }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const checkBudget = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (!navigation) return;

      const metrics = {
        'Time to First Byte': navigation.responseStart - navigation.requestStart,
        'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.navigationStart,
        'Load Complete': navigation.loadEventEnd - navigation.navigationStart,
        'DOM Interactive': navigation.domInteractive - navigation.navigationStart
      };

      Object.entries(metrics).forEach(([metric, value]) => {
        const budgetValue = budget[metric];
        if (budgetValue && value > budgetValue) {
          console.warn(
            `[BUDGET] Exceeded for ${metric}: ${value.toFixed(2)}ms (budget: ${budgetValue}ms)`
          );
        } else if (budgetValue) {
          console.warn(`[OK] ${metric}: ${value.toFixed(2)}ms (under budget: ${budgetValue}ms)`);
        }
      });
    };

    // Check budget after page load
    if (document.readyState === 'complete') {
      checkBudget();
    } else {
      window.addEventListener('load', checkBudget);
      return () => window.removeEventListener('load', checkBudget);
    }
  }, [budget]);
};

export default usePerformanceMonitor;
