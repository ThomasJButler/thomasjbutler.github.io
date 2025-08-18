import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const location = useLocation();
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  
  // Check if we're on a blog page
  const isBlogPage = location.pathname.startsWith('/blog');

  useEffect(() => {
    // Animate footer on scroll into view
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
        <div className={styles.footerSection}>
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
              href="https://linkedin.com/in/thomas-j-butler" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a 
              href="https://twitter.com/thomasjbutler" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            >
              <i className="fab fa-twitter"></i>
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

        {!isBlogPage && (
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/projects">Featured Projects</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Get in Touch</a></li>
              <li><a href="https://aitomatic.co.uk/" target="_blank" rel="noopener noreferrer">AI Apps</a></li>
            </ul>
          </div>
        )}

        <div className={styles.footerSection}>
          <h3>Tech Stack</h3>
          <div className={styles.techStack}>
            <span className={styles.techBadge}>React</span>
            <span className={styles.techBadge}>TypeScript</span>
            <span className={styles.techBadge}>Node.js</span>
            <span className={styles.techBadge}>Python</span>
            <span className={styles.techBadge}>AI/ML</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Thomas J Butler. All rights reserved.</p>
        <p className={styles.location}>
          <i className="fas fa-map-marker-alt"></i> Liverpool, UK | Making technology more human
        </p>
      </div>
    </footer>
  );
};