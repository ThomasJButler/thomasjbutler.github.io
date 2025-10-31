/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Site header with responsive navigation, Matrix-themed animations,
 *              and scroll-aware visibility behaviour
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import { useHeaderVisibility } from '../hooks/useScrollDetection';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
  tooltip?: string;
}

const navigation: NavItem[] = [
  { label: 'ABOUT', href: '/about', tooltip: 'Learn About Me' },
  { label: 'SKILLS', href: '/skills', tooltip: 'Check My Skills' },
  { label: 'PROJECTS', href: '/projects', tooltip: 'View My Projects' },
  { label: 'SERVICES', href: '/services', tooltip: 'Explore My Services' },
  { label: 'CONTACT', href: '/contact', tooltip: 'Get in Touch' }
];

/**
 * Site header component with responsive navigation and theme switching
 * @return {JSX.Element}
 * @constructor
 */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useHeaderVisibility({
    headerSelector: 'header',
    hideThreshold: 100,
    showThreshold: 50
  });

  /** @constructs Initialises scroll listener with RAF throttling for performance */
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsScrolled(scrollTop > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** @constructs Animates navigation items on initial render */
  useEffect(() => {
    if (navRef.current) {
      matrixAnimations.staggerIn(Array.from(navRef.current.children) as HTMLElement[]);
    }
  }, []);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (navRef.current) {
      if (newState) {
        navRef.current.style.display = 'flex';
        animate(navRef.current, {
          opacity: [0, 1],
          translateY: [-10, 0],
          scale: [0.95, 1],
          duration: 300,
          ease: 'outQuad'
        });
      } else {
        animate(navRef.current, {
          opacity: [1, 0],
          translateY: [0, -10],
          scale: [1, 0.95],
          duration: 300,
          ease: 'inQuad',
          complete: () => {
            if (navRef.current && !isMenuOpen) {
              navRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  };

  /** @listens isMenuOpen - Adds/removes escape key handler based on menu state */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    matrixAnimations.pulse(e.currentTarget);
  };

  return (
    <header ref={headerRef} className={`${styles.siteHeader} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.headerTitle}>
          <img
            src="/logo.svg"
            alt="Thomas J Butler Logo"
            className={styles.headerLogo}
          />
          <h1 className={styles.headerText}>Thomas J Butler</h1>
        </Link>
        
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <button
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            id="main-navigation"
            ref={navRef}
            className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}
          >
            {navigation.map((item) => (
              <li 
                key={item.href}
                className={styles.navItem}
              >
                {item.external ? (
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                    onMouseEnter={handleNavHover}
                  >
                    {item.label}
                    {item.icon && <i className={`${styles.navIcon} ${item.icon}`}></i>}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={`${styles.navLink} ${location.pathname === item.href ? styles.active : ''}`}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    onMouseEnter={handleNavHover}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.icon && <i className={`${styles.navIcon} ${item.icon}`} aria-hidden="true"></i>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
