/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Main application layout wrapper providing theme-aware backgrounds,
 *              page transitions, and consistent header/footer structure
 */

import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { Header } from './Header';
import { Footer } from './Footer';
import { MatrixRain } from './MatrixRain';
import { ParticleBackground } from './ParticleBackground';
import { CRTEffect } from './CRTEffect';
import { usePageTransition } from '../hooks/useMatrixAnimation';
import { useTheme } from '../contexts/ThemeContext';
import { performanceOptimizer } from '../utils/performanceOptimizer';
import styles from './Layout.module.css';

/**
 * Application layout component with theme-aware backgrounds and page transitions
 * @return {JSX.Element}
 * @constructor
 */
export const Layout: React.FC = () => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const pageRef = usePageTransition();
  const { theme } = useTheme();

  // Matrix rain respects performance optimizer whilst prioritising Matrix theme experience
  const shouldShowMatrixRain = theme === 'matrix' && performanceOptimizer.getMatrixRainEnabled(theme);

  /**
   * @listens location - Triggers page transition and scroll reset on route changes
   *                     Uses lightweight fade over heavy filters for better performance
   */
  useEffect(() => {
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [0.8, 1],
        translateY: [10, 0],
        duration: 300,
        ease: 'outQuad'
      });
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  const content = (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className={styles.appLayout}>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {theme === 'matrix' && shouldShowMatrixRain && <MatrixRain />}
      {theme === 'dark' && <ParticleBackground />}

      <Header />

      <main id="main-content" ref={contentRef} className={styles.mainContent} role="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );

  if (theme === 'matrix') {
    return (
      <CRTEffect
        intensity="subtle"
        scanlines={true}
        flicker={false}
        curve={false}
      >
        {content}
      </CRTEffect>
    );
  }

  return content;
};
