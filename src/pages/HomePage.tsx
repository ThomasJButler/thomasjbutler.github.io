import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavigationGuide } from '../components/NavigationGuide';
import { useScrollAnimation, useScrollReveal } from '../hooks/useScrollAnimation';
import { animate } from 'animejs';
import { useCardAnimations } from '../hooks/useCardAnimations';
// hover effects now included in utilities.css via main.css


export const HomePage: React.FC = () => {

  // Card animations hook
  useCardAnimations();

  // Scroll animation refs
  const expertiseRef = useScrollReveal();
  const galleriesRef = useScrollAnimation({
    threshold: 0.3,
    animationProps: {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1200,
      ease: 'outElastic'
    }
  });

  
  // Parallax scrolling effect - refined for smoother performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          
          // Subtle parallax for introduction images
          const introImages = document.querySelectorAll('.introduction-img img');
          introImages.forEach((img, index) => {
            const speed = 0.05 + index * 0.02; // Much more subtle
            (img as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
          });
          
          
          // Reveal animations on scroll - only once per element
          const revealElements = document.querySelectorAll('.gallery-card:not(.revealed), .introduction-expertise-card:not(.revealed)');
          revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

            if (isVisible) {
              el.classList.add('revealed');
              animate(el as HTMLElement, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutQuad'
              });
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Add hover effects for buttons and cards
  useEffect(() => {
    // Add matrix-loaded class to galleries section after delay to prevent visual glitch
    const galleries = document.getElementById('galleries');
    if (galleries) {
      setTimeout(() => {
        galleries.classList.add('matrix-loaded');
      }, 2000);
    }

    // Cascade entrance animations on page load
    const animatePageEntrance = () => {
      // Animate main introduction text with subtle cascade effect (excluding welcome-text)
      const introElements = document.querySelectorAll('#introduction h2:not(.welcome-text)');
      introElements.forEach((el, index) => {
        // Remove inline styles - let CSS classes handle initial state
        el.classList.add('animated');

        animate(el as HTMLElement, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: index * 100,
          easing: 'easeOutQuad'
        });
      });
      
      // Animate introduction images with subtle entrance
      const introImages = document.querySelectorAll('.introduction-img img');
      introImages.forEach((img, index) => {
        // Remove inline styles - let CSS classes handle initial state
        img.classList.add('animated');

        animate(img as HTMLElement, {
          opacity: [0, 1],
          scale: [0.9, 1],
          translateY: [20, 0],
          duration: 700,
          delay: 400 + index * 150,
          easing: 'easeOutQuad'
        });
      });
      
      
      // Animate gallery cards with stagger effect
      const galleryCards = document.querySelectorAll('.gallery-card');
      galleryCards.forEach((card, index) => {
        animate(card as HTMLElement, {
          opacity: [0, 1],
          translateY: [50, 0],
          rotateX: [-15, 0],
          duration: 1000,
          delay: 1200 + index * 100,
          easing: 'easeOutQuint'
        });

        // Add revealed class after animation completes and sync with MatrixRain delay
        setTimeout(() => {
          card.classList.add('revealed');
        }, 2200 + index * 100); // 2200ms = 2000ms MatrixRain delay + 200ms buffer
      });
      
      // Animate buttons with bounce effect
      const buttons = document.querySelectorAll('.btn-professional, .matrix-btn-primary');
      buttons.forEach((btn, index) => {
        // Remove inline styles - let CSS classes handle initial state
        btn.classList.add('animated');

        animate(btn as HTMLElement, {
          opacity: [0, 1],
          scale: [0, 1.1, 1],
          duration: 600,
          delay: 1500 + index * 100,
          easing: 'easeOutBack'
        });
      });
    };
    
    // Run entrance animations
    animatePageEntrance();
    
    // Hover effects for gallery cards
    const cards = document.querySelectorAll('.gallery-card, .introduction-expertise-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (e.currentTarget) {
          animate(e.currentTarget as HTMLElement, {
            scale: 1.05,
            translateY: -5,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      });
      
      card.addEventListener('mouseleave', (e) => {
        if (e.currentTarget) {
          animate(e.currentTarget as HTMLElement, {
            scale: 1,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      });
    });
    
    // Enhanced button effects with magnetic cursor and ripple
    const buttons = document.querySelectorAll('.matrix-btn-primary, .btn-professional, .matrix-btn, button');
    buttons.forEach(button => {
      const btn = button as HTMLElement;
      
      // Magnetic cursor effect
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * 0.3;
          const translateX = x * strength;
          const translateY = y * strength;
          
          btn.style.setProperty('--magnetic-transform', `translate(${translateX}px, ${translateY}px)`);
          btn.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.02)`;
        }
      };
      
      const handleMouseLeave = () => {
        btn.style.transform = '';
        btn.style.removeProperty('--magnetic-transform');
      };
      
      // Create particle effect - reduced for better performance
      const createParticles = (x: number, y: number) => {
        const particleCount = 8; // Reduced particle count
        let container = document.querySelector('.particle-container');
        
        if (!container) {
          container = document.createElement('div');
          container.className = 'particle-container';
          document.body.appendChild(container);
        }
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          
          const angle = (Math.PI * 2 * i) / particleCount;
          const velocity = 30 + Math.random() * 40; // Reduced velocity
          const tx = Math.cos(angle) * velocity;
          const ty = Math.sin(angle) * velocity;
          
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particle.style.setProperty('--tx', `${tx}px`);
          particle.style.setProperty('--ty', `${ty}px`);
          
          container.appendChild(particle);
          
          setTimeout(() => particle.remove(), 1000);
        }
        
        // Create sound wave effect
        const wave = document.createElement('div');
        wave.className = 'sound-wave';
        wave.style.left = `${x - 50}px`;
        wave.style.top = `${y - 50}px`;
        container.appendChild(wave);
        setTimeout(() => wave.remove(), 600);
      };
      
      // Ripple effect on click with particles
      const handleClick = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        btn.style.setProperty('--ripple-x', `${x}%`);
        btn.style.setProperty('--ripple-y', `${y}%`);
        
        // Create particle effect at click position
        createParticles(e.clientX, e.clientY);
        
        // Pulse animation
        animate(btn, {
          scale: [1, 0.95, 1.05, 1],
          duration: 400,
          easing: 'easeOutElastic(1, .5)'
        });
      };
      
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
      btn.addEventListener('click', handleClick);
    });
  }, []);

  return (
    <>
      <section id="introduction">
        <div className="container">
          <h2 className="welcome-text">Hey, I'm Tom.</h2>
          <br />
          <h2>A Web Developer and Designer from Liverpool, England, UK</h2>
          <h2>With a passion for cutting-edge technology and creative problem-solving, I'm here to help transform your digital visions into reality.</h2>
          <h2 className="introduction-h2">My expertise spans web development, AI integration, and innovative design solutions.</h2>
          <div className="introduction-img">
            <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693667/CreateAiModel_oufvro.png" alt="AiTomatic Create a Model" />
            <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693678/MatrixArcade2_eg34bs.png" alt="The Matrix Arcade" />
            <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693677/Usage_Patterns_iw5j6a.png" alt="AiTomatic Usage Pattern" />
          </div>
          <div className="galleries-mobile">
            <Link to="/projects" className="btn-professional glass-card hover-lift">
              <i className="fas fa-images"></i>
              View Projects
            </Link>
            <Link to="/blog" className="btn-professional glass-card hover-lift bg-matrix-gradient-button">
              <i className="fas fa-book-open"></i>
              View Blog
            </Link>
          </div>
        </div>
      </section>

      <NavigationGuide />

      <section id="galleries" ref={galleriesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <h2 className="section-heading">--| Showcases |--</h2>
          <div className="galleries-grid">
            <div className="gallery-card">
              <div className="gallery-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>GenAI Bootcamp Portfolio</h3>
              <p>Comprehensive AI portfolio showcasing practical applications and innovative solutions.</p>
              <a href="https://aitomatic.io/" target="_blank" rel="noopener noreferrer" className="gallery-link">
                View Portfolio <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <div className="gallery-card">
              <div className="gallery-icon">
                <i className="fas fa-history"></i>
              </div>
              <h3>Version TimeTravel</h3>
              <p>Journey through the evolution of my portfolio website.</p>
              <a href="https://thomasjbutler.github.io/version-timetravel/" target="_blank" className="gallery-link">
                Time Travel <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>--| Get in Touch |--</h2>
          <p>Interested in working together or have a question? Please don't hesitate to reach out!</p>
          <div className="contact-button-container">
            <Link to="/contact" className="btn-contact-us">
              <i className="fas fa-envelope"></i>
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};