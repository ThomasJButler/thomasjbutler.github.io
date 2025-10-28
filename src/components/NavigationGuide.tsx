/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Interactive navigation cards with Matrix-themed animations,
 *              intersection observer triggers, and particle effects
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'animejs';
import '../css/navigation-guide.css';

interface NavigationCard {
  title: string;
  description: string;
  path: string;
  icon: string;
  external?: boolean;
  color?: string;
}

const navigationCards: NavigationCard[] = [
  {
    title: "About Me",
    description: "Discover my journey, qualifications, and what drives my passion for technology",
    path: "/about",
    icon: "fas fa-user-circle",
    color: "#00ff00"
  },
  {
    title: "Skills & Tech",
    description: "Explore my technical expertise and the tools I use to build amazing solutions",
    path: "/skills",
    icon: "fas fa-code",
    color: "#00ffff"
  },
  {
    title: "Projects Portfolio",
    description: "Browse my latest work and see innovation in action",
    path: "/projects",
    icon: "fas fa-briefcase",
    color: "#00ff00"  // Changed from magenta to Matrix green
  },
  {
    title: "Services",
    description: "Learn how I can help transform your digital presence",
    path: "/services",
    icon: "fas fa-rocket",
    color: "#ffff00"
  },
  {
    title: "Blog & Insights",
    description: "Read my thoughts on AI, development, and the future of tech",
    path: "/blog",
    icon: "fas fa-book-open",
    color: "#ff6600"
  },
  {
    title: "Get in Touch",
    description: "Let's discuss your next project or collaboration",
    path: "/contact",
    icon: "fas fa-envelope",
    color: "#00ff88"
  }
];

/**
 * Animated navigation card grid for site exploration
 * @return {JSX.Element}
 * @constructor
 */
export const NavigationGuide: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  /**
   * @constructs Sets up intersection observer for entrance animations and hover interactions
   *             Applies staggered card animations with elastic easing for visual impact
   */
  useEffect(() => {
    const animateEntrance = () => {
      const title = sectionRef.current?.querySelector('.nav-guide-title');
      if (title) {
        animate(title as HTMLElement, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutQuad',
          complete: () => {
            title.classList.add('glitch-text');
            setTimeout(() => {
              title.classList.remove('glitch-text');
            }, 1000);
          }
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          animate(card, {
            opacity: [0, 1],
            translateY: [50, 0],
            rotateX: [-15, 0],
            scale: [0.8, 1],
            duration: 1000,
            delay: 400 + index * 150,
            easing: 'easeOutElastic(1, .8)'
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            animateEntrance();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const setupCardAnimations = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          const icon = card.querySelector('.nav-card-icon i') as HTMLElement;
          const particles = card.querySelector('.nav-card-particles') as HTMLElement;

          card.addEventListener('mouseenter', () => {
            animate(icon, {
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              duration: 600,
              easing: 'easeOutBack'
            });

            particles?.classList.add('active');

            animate(card, {
              translateY: [-10],
              scale: [1.05],
              duration: 300,
              easing: 'easeOutQuad'
            });
          });

          card.addEventListener('mouseleave', () => {
            particles?.classList.remove('active');

            animate(card, {
              translateY: [0],
              scale: [1],
              duration: 300,
              easing: 'easeOutQuad'
            });
          });

          card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--ripple-x', `${x}%`);
            card.style.setProperty('--ripple-y', `${y}%`);

            card.classList.add('ripple-effect');
            setTimeout(() => {
              card.classList.remove('ripple-effect');
            }, 600);

            animate(card, {
              scale: [1, 0.95, 1.02, 1],
              duration: 400,
              easing: 'easeOutElastic(1, .5)'
            });
          });
        }
      });
    };

    setTimeout(setupCardAnimations, 1000);

    return () => {
      observer.disconnect();
    };
  }, []);

  const setCardRef = (el: HTMLAnchorElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="navigation-guide"
      className="nav-guide-section"
    >
      <div className="container">
        <h2 className="nav-guide-title">Navigate Your Journey</h2>
        <p className="nav-guide-subtitle">
          Choose your path through my digital realm
        </p>

        <div className="nav-guide-grid">
          {navigationCards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="nav-card"
              ref={(el) => setCardRef(el, index)}
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              <div className="nav-card-background">
                <div className="nav-card-scanlines"></div>
                <div className="nav-card-particles"></div>
              </div>

              <div className="nav-card-content">
                <div className="nav-card-icon">
                  <i className={card.icon}></i>
                </div>

                <h3 className="nav-card-title">{card.title}</h3>
                <p className="nav-card-description">{card.description}</p>

                <div className="nav-card-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>

              <div className="nav-card-glow"></div>
              <div className="nav-card-border"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
