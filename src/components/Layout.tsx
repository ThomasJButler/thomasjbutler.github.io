import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { Header } from './Header';
import { Footer } from './Footer';
import { MatrixRain } from './MatrixRain';
import { ParticleBackground } from './ParticleBackground';
import { BackToTop } from './BackToTop';
import { CRTEffect } from './CRTEffect';
import { TerminalMode } from './TerminalMode';
import { MatrixEasterEggs } from './MatrixEasterEggs';
import { usePageTransition } from '../hooks/useMatrixAnimation';
import { useTheme } from '../contexts/ThemeContext';
import { performanceOptimizer } from '../utils/performanceOptimizer';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const pageRef = usePageTransition();
  const { theme } = useTheme();

  // Check if Matrix rain should be enabled, overriding performance restrictions for Matrix theme
  const shouldShowMatrixRain = theme === 'matrix' && performanceOptimizer.getMatrixRainEnabled(theme);


  useEffect(() => {
    // Simple fade transition for better performance
    if (contentRef.current) {
      // Quick fade transition without heavy filters
      animate(contentRef.current, {
        opacity: [0.8, 1],
        translateY: [10, 0],
        duration: 300,
        ease: 'outQuad'
      });
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  // Wrap in CRT effect for Matrix theme
  const content = (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className={styles.appLayout}>
      {/* Theme-specific backgrounds */}
      {theme === 'matrix' && shouldShowMatrixRain && <MatrixRain theme="matrix" />}
      {theme === 'neo' && <MatrixRain theme="neo" />}
      {theme === 'dark' && <ParticleBackground />}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main ref={contentRef} className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop
        threshold={300}
        showText={true}
        enableScanLine={true}
      />

      {/* Terminal Mode */}
      <TerminalMode />

      {/* Easter Eggs */}
      <MatrixEasterEggs />
    </div>
  );

  // Apply CRT effect only in Matrix theme
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