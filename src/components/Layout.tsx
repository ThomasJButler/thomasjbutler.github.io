import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import anime from '../utils/anime';
import { Header } from './Header';
import { Footer } from './Footer';
import { MatrixRain } from './MatrixRain';
import { usePageTransition } from '../hooks/useMatrixAnimation';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const pageRef = usePageTransition();

  useEffect(() => {
    // Animate page content on route change
    if (contentRef.current) {
      // Exit animation
      anime({
        targets: contentRef.current,
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          // Enter animation
          anime({
            targets: contentRef.current,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            easing: 'easeOutQuad'
          });
        }
      });
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div ref={pageRef} className={styles.appLayout}>
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main ref={contentRef} className={styles.mainContent}>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};