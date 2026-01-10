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
  { label: 'PROJECTS', href: '/projects', tooltip: 'View My Projects' },
  { label: 'SERVICES', href: '/services', tooltip: 'Skills & Services' },
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
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Disabled header hide-on-scroll behavior - header now stays fixed
  // useHeaderVisibility({
  //   headerSelector: 'header',
  //   hideThreshold: 100,
  //   showThreshold: 50
  // });

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -50; // Swipe down at least 50px

    if (isDownSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (navRef.current) {
      if (newState) {
        // Opening menu
        navRef.current.style.display = 'flex';

        // Animate menu container
        animate(navRef.current, {
          opacity: [0, 1],
          translateY: [-10, 0],
          translateX: '-50%', // Keep centered
          duration: 300,
          ease: 'outQuad'
        });

        // Staggered animation for menu items
        const menuItems = navRef.current.querySelectorAll('li');
        menuItems.forEach((item, index) => {
          animate(item as HTMLElement, {
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 400,
            delay: 100 + (index * 80), // Stagger delay: 100ms, 180ms, 260ms, 340ms
            ease: 'outQuad'
          });
        });
      } else {
        // Closing menu
        animate(navRef.current, {
          opacity: [1, 0],
          translateY: [0, -10],
          translateX: '-50%',
          duration: 250,
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

  /** @listens isMenuOpen - Blur page content when menu is open */
  useEffect(() => {
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (isMenuOpen) {
      if (mainContent) {
        mainContent.style.filter = 'blur(8px)';
        mainContent.style.transition = 'filter 0.3s ease';
      }
      if (footer) {
        footer.style.filter = 'blur(8px)';
        footer.style.transition = 'filter 0.3s ease';
      }
    } else {
      if (mainContent) {
        mainContent.style.filter = '';
      }
      if (footer) {
        footer.style.filter = '';
      }
    }
  }, [isMenuOpen]);

  /** @listens isMenuOpen - Prevent body scroll when menu is open */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    matrixAnimations.pulse(e.currentTarget);
  };

  return (
    <header ref={headerRef} className={`${styles.siteHeader} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.headerBrand}>
          <Link to="/" className={styles.headerTitle}>
            <img
              src="/logo.svg"
              alt="Thomas J Butler Logo"
              className={styles.headerLogo}
            />
            <h1 className={styles.headerText}>Thomas J Butler</h1>
          </Link>
          <div className={styles.socialIcons}>
            <a
              href="https://github.com/thomasjbutler"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/thomasjbutler"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        
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

          {/* Backdrop overlay */}
          {isMenuOpen && (
            <div
              className={styles.menuBackdrop}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          <ul
            id="main-navigation"
            ref={navRef}
            className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
