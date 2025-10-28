/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Footer component with social links, quick navigation, and
 *              intersection observer-based animation triggers
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './Footer.module.css';

/**
 * Site footer component with animated social links and navigation
 * @return {JSX.Element}
 * @constructor
 */
export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  /**
   * @constructs Triggers animation when footer scrolls into viewport
   *             Uses intersection observer to detect visibility at 20% threshold
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (footerRef.current) {
            matrixAnimations.fadeInUp(footerRef.current);
          }
          if (socialLinksRef.current) {
            matrixAnimations.staggerIn(Array.from(socialLinksRef.current.children) as HTMLElement[], 50);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: [1, 1.2],
      rotate: [0, 360],
      duration: 500,
      ease: 'outElastic(1, 0.5)'
    });
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 300,
      ease: 'outQuad'
    });
  };

  return (
    <footer ref={footerRef} className={styles.siteFooter}>
      <div className={styles.footerContent}>
        <div className={styles.socialSection}>
          <h3>Connect With Me</h3>
          <div ref={socialLinksRef} className={styles.socialLinks}>
            <a
              href="https://github.com/ThomasJButler"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/thomasbutleruk/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://codepen.io/thomasbutler"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodePen"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fab fa-codepen"></i>
            </a>
            <a
              href="mailto:dev@thomasjbutler.me"
              aria-label="Email"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <h3>Quick Links</h3>
          <div className={styles.footerLinks}>
            <a href="https://thomasjbutler.me" target="_blank" rel="noopener noreferrer">Commercial Work</a>
            <Link to="/contact">Contact</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>

        <div className={styles.infoSection}>
          <p>&copy; {new Date().getFullYear()} Thomas J Butler. All rights reserved.</p>
          <p className={styles.location}>
            <i className="fas fa-map-marker-alt"></i> UK | Making technology more human
          </p>
        </div>
      </div>
    </footer>
  );
};
