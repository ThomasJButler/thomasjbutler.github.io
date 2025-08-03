import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { animate } from 'animejs';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
  tooltip?: string;
}

const navigation: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about', tooltip: 'Learn About Me' },
  { label: 'SKILLS', href: '/skills', tooltip: 'Check My Skills' },
  { label: 'PROJECTS', href: '/projects', tooltip: 'View My Projects' },
  { label: 'SERVICES', href: '/services', tooltip: 'Explore My Services' },
  { label: 'CONTACT', href: '/contact', tooltip: 'Get in Touch' }
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const lastScrollTop = useRef(0);

  // Handle scroll behavior
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Hide/show header on scroll
          if (headerRef.current) {
            if (scrollTop > lastScrollTop.current && scrollTop > 100) {
              animate(headerRef.current, {
                translateY: '-100%',
                duration: 300,
                ease: 'inQuad'
              });
            } else {
              animate(headerRef.current, {
                translateY: 0,
                duration: 300,
                ease: 'outQuad'
              });
            }
          }
          
          // Add shadow on scroll
          setIsScrolled(scrollTop > 50);
          
          lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
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
        <div className={styles.headerTitle}>
          <h1 onMouseEnter={(e) => matrixAnimations.glitchText(e.currentTarget)}>
            Thomas J Butler
          </h1>
          <h3>Full Stack Developer | AI Integration Specialist</h3>
        </div>
        
        <nav>
          <button 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul ref={navRef} className={isMenuOpen ? styles.show : ''}>
            {navigation.map((item) => (
              <li 
                key={item.href}
                data-tooltip={item.tooltip}
                className={location.pathname === item.href ? styles.active : ''}
              >
                {item.external ? (
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-text={item.label}
                    onMouseEnter={handleNavHover}
                  >
                    {item.label} |
                    {item.icon && <i className={item.icon}></i>}
                  </a>
                ) : (
                  <Link 
                    to={item.href}
                    data-text={item.label}
                    onMouseEnter={handleNavHover}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label} |
                    {item.icon && <i className={item.icon}></i>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};