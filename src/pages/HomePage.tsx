/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Home page with animated introduction, navigation cards, project showcases,
 *              and interactive scroll effects with particle animations
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { animate } from 'animejs';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages';

// Featured projects for homepage showcase (no images - they appear in hero above)
const FEATURED_PROJECTS = [
  {
    id: 'modelviz',
    name: 'ModelViz - AI Model Comparison Platform',
    description: 'Interactive analytics platform for comparing AI models across multiple providers with real-time performance metrics, cost analysis, and 3D visualisations',
    links: {
      demo: 'https://modelviz.vercel.app/',
      github: 'https://github.com/ThomasJButler/MasteringAICoursePortfolio'
    }
  },
  {
    id: 'morpheus',
    name: 'Morpheus - Intelligent Document Q&A',
    description: 'Intelligent document Q&A system with semantic search and source citations using RAG, Pinecone, and Anthropic/OpenAI APIs',
    links: {
      demo: 'https://morpheusrag.vercel.app',
      github: 'https://github.com/ThomasJButler/MasteringAICoursePortfolio'
    }
  }
];

/**
 * Home page component with cascading animations and scroll effects
 * @return {JSX.Element}
 * @constructor
 */
// Typing animation phrases
const TYPING_PHRASES = [
  'AI-powered apps',
  'production web apps',
  'intelligent agents',
  'creative solutions'
];

export const HomePage: React.FC = () => {
  useCardAnimations();

  // Typing animation state
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  const animateTyping = useCallback(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause before deleting
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    // Type or delete character
    const nextText = isDeleting
      ? currentPhrase.substring(0, displayText.length - 1)
      : currentPhrase.substring(0, displayText.length + 1);

    setTimeout(() => setDisplayText(nextText), typingSpeed);
  }, [displayText, phraseIndex, isDeleting]);

  useEffect(() => {
    const timer = setTimeout(animateTyping, 100);
    return () => clearTimeout(timer);
  }, [animateTyping]);

  // Add .animated class to intro content on mount
  useEffect(() => {
    // Wait a small delay for DOM to be ready
    setTimeout(() => {
      // Animate intro media (images/videos)
      const introMedia = document.querySelectorAll('.introduction-img img, .introduction-img video');
      introMedia.forEach(media => {
        media.classList.add('animated');
      });

      // Animate intro text elements
      const introText = document.querySelectorAll('.welcome-text, .hero-tagline, .hero-subtitle');
      introText.forEach(text => {
        text.classList.add('animated');
      });
    }, 100);
  }, []);

  const galleriesRef = useScrollAnimation({
    threshold: 0.3,
    animationProps: {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1200,
      ease: 'outElastic'
    }
  });

  /**
   * @constructs Initialises parallax scrolling and reveal animations with RAF throttling
   */
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          
          // Subtle parallax for introduction images and videos
          const introMedia = document.querySelectorAll('.introduction-img img, .introduction-img video');
          introMedia.forEach((media, index) => {
            const speed = 0.05 + index * 0.02; // Much more subtle
            (media as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
          });
          
          const revealElements = document.querySelectorAll('.introduction-expertise-card:not(.revealed), .timetravel-card:not(.revealed)');
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
  
  /**
   * @constructs Sets up entrance animations, hover effects, and interactive button behaviours
   *             Includes magnetic cursor effects and particle systems
   */
  useEffect(() => {
    const timetravelCta = document.getElementById('timetravel-cta');
    if (timetravelCta) {
      setTimeout(() => {
        timetravelCta.classList.add('matrix-loaded');
      }, 2000);
    }

    const animatePageEntrance = () => {
      const welcomeText = document.querySelector('.welcome-text');
      if (welcomeText) {
        welcomeText.classList.add('animated');
        animate(welcomeText as HTMLElement, {
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 800,
          delay: 100,
          easing: 'easeOutQuad'
        });
      }

      // Animate hero subtitle ("Full Stack AI Engineer from the UK")
      const heroSubtitle = document.querySelector('.hero-subtitle');
      if (heroSubtitle) {
        heroSubtitle.classList.add('animated');
        animate(heroSubtitle as HTMLElement, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: 500,
          easing: 'easeOutQuad'
        });
      }

      const introElements = document.querySelectorAll('#introduction h2:not(.welcome-text)');
      introElements.forEach((el, index) => {
        el.classList.add('animated');

        animate(el as HTMLElement, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: 300 + index * 100,
          easing: 'easeOutQuad'
        });
      });
      
      const introMedia = document.querySelectorAll('.introduction-img img, .introduction-img video');
      introMedia.forEach((media, index) => {
        media.classList.add('animated');

        const isVideo = media.tagName === 'VIDEO';
        const isReady = isVideo
          ? (media as HTMLVideoElement).readyState >= 3
          : (media as HTMLImageElement).complete;

        if (isReady) {
          animate(media as HTMLElement, {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [20, 0],
            duration: 700,
            delay: 400 + index * 150,
            easing: 'easeOutQuad'
          });
        } else {
          const eventType = isVideo ? 'canplaythrough' : 'load';
          media.addEventListener(eventType, () => {
            animate(media as HTMLElement, {
              opacity: [0, 1],
              scale: [0.9, 1],
              translateY: [20, 0],
              duration: 700,
              delay: index * 150,
              easing: 'easeOutQuad'
            });
          });
        }
      });
      
      // Animate timetravel card
      const timetravelCard = document.querySelector('.timetravel-card');
      if (timetravelCard) {
        animate(timetravelCard as HTMLElement, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          delay: 1200,
          easing: 'easeOutQuad'
        });
      }

      const buttons = document.querySelectorAll('.btn-professional, .matrix-btn-primary');
      buttons.forEach((btn, index) => {
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
    
    animatePageEntrance();
    
    const cards = document.querySelectorAll('.introduction-expertise-card, .timetravel-card');
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
    
    const buttons = document.querySelectorAll('.matrix-btn-primary, .btn-professional, .matrix-btn, button');
    buttons.forEach(button => {
      const btn = button as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
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
      
      const createParticles = (x: number, y: number) => {
        const particleCount = 8;
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
          const velocity = 30 + Math.random() * 40;
          const tx = Math.cos(angle) * velocity;
          const ty = Math.sin(angle) * velocity;
          
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particle.style.setProperty('--tx', `${tx}px`);
          particle.style.setProperty('--ty', `${ty}px`);
          
          container.appendChild(particle);
          
          setTimeout(() => particle.remove(), 1000);
        }
        
        const wave = document.createElement('div');
        wave.className = 'sound-wave';
        wave.style.left = `${x - 50}px`;
        wave.style.top = `${y - 50}px`;
        container.appendChild(wave);
        setTimeout(() => wave.remove(), 600);
      };
      
      const handleClick = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        btn.style.setProperty('--ripple-x', `${x}%`);
        btn.style.setProperty('--ripple-y', `${y}%`);
        
        createParticles(e.clientX, e.clientY);
        
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
          <h2 className="welcome-text">Hey, I'm Tom</h2>
          <h2 className="hero-tagline">
            <span className="hero-tagline-prefix">// I build</span>
            <span className="typing-wrapper">
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor">|</span>
            </span>
          </h2>
          <p className="hero-subtitle">Full Stack AI Engineer from the UK</p>
          <div className="introduction-img">
            <img src={PLACEHOLDER_IMAGES.matrixArcadeGif} alt="The Matrix Arcade - Interactive Gaming Portal" />
            <video
              src={PLACEHOLDER_IMAGES.morpheusVideo}
              autoPlay
              loop
              muted
              playsInline
              className="intro-featured"
              aria-label="Morpheus - Intelligent Document Q&A System"
            />
            <img src={PLACEHOLDER_IMAGES.modelVizGif} alt="ModelViz - AI Model Comparison Platform" />
          </div>

          {/* Featured Projects Section */}
          <div className="featured-projects-section">
            <h3 className="featured-projects-title">
              <i className="fas fa-star"></i> Featured Projects
            </h3>
            <div className="featured-projects-grid">
              {FEATURED_PROJECTS.map(project => (
                <div key={project.id} className="featured-card featured-card-no-image">
                  <div className="featured-card-content">
                    <div className="featured-card-title">{project.name}</div>
                    <div className="featured-card-desc">{project.description}</div>
                  </div>
                  <div className="featured-card-links">
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" title="Live Demo">
                        <i className="fas fa-globe"></i>
                      </a>
                    )}
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-hub" ref={galleriesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="hub-layout">
            {/* Left Column - Purpose Text */}
            <div className="hub-left">
              <h2 className="purpose-heading">// Why I Built This Portfolio</h2>
              <div className="purpose-content">
                <p>
                  Ever since I watched The Matrix as a kid, I've been obsessed with building things on the web. This site is the sci-fi inspired playground I always dreamed of creating.
                </p>
                <p>
                  It's where I separate creative freedom from client work. I can crash things, try that new animation library everyone's talking about, and rebuild from scratch just because I can.
                </p>
                <p>
                  Cyberpunk aesthetics, AI experiments, pushing boundaries. This is my space to geek out and have fun with code.
                </p>
              </div>
            </div>

            {/* Right Column - All Navigation */}
            <div className="hub-right">
              {/* Explore Section */}
              <div className="hub-section">
                <span className="hub-label">Explore</span>
                <div className="hub-grid">
                  <Link to="/projects" className="hub-btn">
                    <i className="fas fa-images"></i>
                    Projects
                  </Link>
                  <Link to="/skills" className="hub-btn">
                    <i className="fas fa-code"></i>
                    Skills
                  </Link>
                  <Link to="/services" className="hub-btn">
                    <i className="fas fa-cogs"></i>
                    Services
                  </Link>
                  <Link to="/contact" className="hub-btn">
                    <i className="fas fa-envelope"></i>
                    Contact
                  </Link>
                </div>
              </div>

              {/* Professional Work Section */}
              <div className="hub-section">
                <span className="hub-label">Professional Work</span>
                <div className="hub-stack">
                  <a
                    href="https://thomasjbutler.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hub-btn-external"
                  >
                    <i className="fas fa-briefcase"></i>
                    Commercial Portfolio
                    <i className="fas fa-external-link-alt hub-external-icon"></i>
                  </a>
                  <a
                    href="https://agenticaiprojectsportfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hub-btn-external"
                  >
                    <i className="fas fa-robot"></i>
                    Agentic AI Portfolio
                    <i className="fas fa-external-link-alt hub-external-icon"></i>
                  </a>
                </div>
              </div>

              {/* TimeTravel Section */}
              <div className="hub-section hub-timetravel">
                <span className="hub-timetravel-text">Want to see how this project evolved?</span>
                <a
                  href="https://thomasjbutler.github.io/version-timetravel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hub-btn-timetravel"
                >
                  <i className="fas fa-history"></i>
                  Version TimeTravel
                  <i className="fas fa-external-link-alt hub-external-icon"></i>
                </a>
              </div>

              {/* Get in Touch Section */}
              <div className="hub-section hub-contact">
                <span className="hub-label">Get in Touch</span>
                <div className="hub-contact-row">
                  <Link to="/contact" className="hub-btn hub-btn-contact">
                    <i className="fas fa-envelope"></i>
                    Contact Me
                  </Link>
                  <div className="hub-social-icons">
                    <a
                      href="https://github.com/thomasjbutler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hub-social-icon"
                      aria-label="GitHub Profile"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://linkedin.com/in/thomasjbutler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hub-social-icon"
                      aria-label="LinkedIn Profile"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                      href="https://codepen.io/thomasjbutler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hub-social-icon"
                      aria-label="CodePen Profile"
                    >
                      <i className="fab fa-codepen"></i>
                    </a>
                    <a
                      href="mailto:hello@thomasjbutler.com"
                      className="hub-social-icon"
                      aria-label="Email Me"
                    >
                      <i className="fas fa-at"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
