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
  { label: 'BLOG', href: '/blog', tooltip: 'Read My Blog' },
  { label: 'SERVICES', href: '/services', tooltip: 'Explore My Services' },
  { label: 'CONTACT', href: '/contact', tooltip: 'Get in Touch' }
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Use scroll detection hook
  const { getState } = useHeaderVisibility({
    headerSelector: 'header',
    hideThreshold: 100,
    showThreshold: 50
  });

  // Handle scroll state updates
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

  // Animate nav items on mount
  useEffect(() => {
    if (navRef.current) {
      matrixAnimations.staggerIn(Array.from(navRef.current.children) as HTMLElement[]);
    }
  }, []);

  // Menu toggle animation
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

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Handle nav item hover
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    matrixAnimations.pulse(e.currentTarget);
  };

  return (
    <header ref={headerRef} className={`${styles.siteHeader} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.headerTitle}>
          <h1>Thomas J Butler</h1>
        </Link>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul ref={navRef} className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
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
                    onMouseEnter={handleNavHover}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {item.icon && <i className={`${styles.navIcon} ${item.icon}`}></i>}
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