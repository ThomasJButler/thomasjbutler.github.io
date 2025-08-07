import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { Header } from './Header';
import { Footer } from './Footer';
import { MatrixRain } from './MatrixRain';
import { BackToTop } from './BackToTop';
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
      animate(contentRef.current, {
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 300,
        ease: 'inQuad',
        complete: () => {
          // Enter animation
          animate(contentRef.current!, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            ease: 'outQuad'
          });
        }
      });
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className={styles.appLayout}>
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
      
      {/* Back to Top Button */}
      <BackToTop 
        threshold={300}
        showText={true}
        enableScanLine={true}
      />
    </div>
  );
};