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
      // Matrix-style glitch transition
      const glitchAnimation = animate(contentRef.current, {
        opacity: [1, 0.8, 0.3, 0.9, 0],
        filter: [
          'hue-rotate(0deg) brightness(1)',
          'hue-rotate(90deg) brightness(1.2)',
          'hue-rotate(-90deg) brightness(0.8)',
          'hue-rotate(0deg) brightness(1.1)',
          'hue-rotate(0deg) brightness(1)'
        ],
        translateY: [0, -5, 5, -10],
        duration: 200,
        ease: 'linear',
        complete: () => {
          // Enter animation with fade and slide
          animate(contentRef.current!, {
            opacity: [0, 1],
            translateY: [30, 0],
            filter: 'hue-rotate(0deg) brightness(1)',
            duration: 500,
            ease: 'outExpo'
          });
        }
      });
    }

    // Animate header on route change
    const header = document.querySelector('header');
    if (header) {
      animate(header, {
        translateY: [-5, 0],
        duration: 400,
        ease: 'outQuad'
      });
    }

    // Scroll to top on route change with smooth animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
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