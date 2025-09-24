import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CubeFace, type CubeProject } from '../components/CubeFace';
import { useScrollAnimation, useScrollReveal } from '../hooks/useScrollAnimation';
import { animate } from 'animejs';
import { useCardAnimations } from '../hooks/useCardAnimations';
import '../css/rotating-cube.css';
import '../css/hover-effects.css';

// Cube projects data
const cubeProjects: Record<string, CubeProject> = {
  front: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/commercialv20_rus9qz.png",
    title: "Commercial Portfolio v2.0",
    description: "Complete site revamp to V2.0 showcasing all commercial work, with Notion integration for dynamic content management.",
    tags: ["Portfolio", "Notion API", "CMS"],
    links: {
      website: "https://thomasjbutler.me",
      github: "https://github.com/ThomasJButler/commercial-portfolio-react"
    }
  },
  right: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754541799/v30_sesrmp.png",
    title: "Portfolio v3.0 - React Migration",
    description: "Complete migration to React 19 with TypeScript, Vite 7, and Anime.js v4.",
    tags: ["React 19", "TypeScript", "Vite 7"],
    links: {}
  },
  back: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png",
    title: "AI Model Comparison Tool",
    description: "Part of AiTomatic Suite - Compare and evaluate different AI models side-by-side. Features real-time testing, performance metrics, and model recommendations.",
    tags: ["AI/ML", "Python", "APIs", "Analytics", "Dashboard"],
    links: {
      website: "https://ai-comparison-showcase.vercel.app/",
      github: "https://github.com/ThomasJButler/AI-Comparison-Showcase-"
    }
  },
  left: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/matrixarcade_xofygu.png",
    title: "The Matrix Arcade",
    description: "An arcade website built using Vite, Python, and React to showcase playable mini-games created during my learning journey.",
    tags: ["React", "Python", "Vite", "Canvas API", "Game Dev"],
    links: {
      website: "https://www.tomatic.tech/",
      github: "https://github.com/ThomasJButler/The-Matrix-Arcade"
    }
  },
  top: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214157/cssshowcase_q25veb.png",
    title: "CSS Showcase",
    description: "Interactive showcase of advanced CSS techniques, animations, and creative web designs demonstrating modern CSS capabilities.",
    tags: ["CSS3", "Animation", "Grid", "Flexbox", "Creative"],
    links: {
      website: "https://thomasjbutler.github.io/css-showcase/",
      github: "https://github.com/ThomasJButler/css-showcase"
    }
  },
  bottom: {
    icon: "https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/dotnetreactapp_qflyte.png",
    title: "Dotnet React Calculator",
    description: "Initially started as a code assessment, I continued developing this project to explore and master the ins and outs of .NET backend development and API customization alongside React frontend integration.",
    tags: [".NET", "React", "C#", "API", "Full Stack"],
    links: {
      website: "https://dotnet-react-calendar.vercel.app/",
      github: "https://github.com/ThomasJButler/Dotnet-React-Calendar"
    }
  }
};

export const HomePage: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const currentFaceRef = useRef<string>('front');
  
  // Unified cube rotation state system
  const rotationState = useRef({
    idle: { x: -15, y: 0 },
    scroll: { x: 0, y: 0, translateY: 0 },
    user: { x: 0, y: 0 },
    entrance: { scale: 1, translateY: 0 },
    isIdle: true,
    isUserControlled: false,
    lastInteraction: Date.now()
  });
  
  // Single function to update cube transform combining all states
  const updateCubeTransform = () => {
    if (!cubeRef.current) return;
    
    const state = rotationState.current;
    let transform = '';
    
    // Combine transforms based on active states
    if (state.isUserControlled) {
      // User control takes priority
      transform = `rotateX(${state.user.x}deg) rotateY(${state.user.y}deg)`;
    } else if (state.isIdle) {
      // Idle animation + scroll effects
      const totalX = state.idle.x;
      const totalY = state.idle.y + state.scroll.y;
      const translateY = state.scroll.translateY;
      transform = `translateY(${translateY}px) rotateX(${totalX}deg) rotateY(${totalY}deg)`;
    } else {
      // Just scroll effects when not idle
      transform = `translateY(${state.scroll.translateY}px) rotateX(${state.scroll.x}deg) rotateY(${state.scroll.y}deg)`;
    }
    
    // Apply entrance animation if needed
    if (state.entrance.scale !== 1 || state.entrance.translateY !== 0) {
      transform = `scale(${state.entrance.scale}) translateY(${state.entrance.translateY}px) ${transform}`;
    }
    
    cubeRef.current.style.transform = transform;
  };
  
  // Card animations hook
  useCardAnimations();
  
  // Scroll animation refs
  const latestUpdatesRef = useScrollAnimation({ threshold: 0.2 });
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

  useEffect(() => {
    // Initialize cube rotation functionality
    const rotateCube = (face: string) => {
      const cube = cubeRef.current;
      if (!cube) return;

      // Update button states
      document.querySelectorAll('.cube-nav button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      let rotation = { x: 0, y: 0 };
      let buttonIndex = 1;
      
      switch(face) {
        case 'front':
          rotation = { x: 0, y: 0 };
          buttonIndex = 1;
          break;
        case 'right':
          rotation = { x: 0, y: -90 };
          buttonIndex = 2;
          break;
        case 'back':
          rotation = { x: 0, y: -180 };
          buttonIndex = 3;
          break;
        case 'left':
          rotation = { x: 0, y: 90 };
          buttonIndex = 4;
          break;
        case 'top':
          rotation = { x: -90, y: 0 };
          buttonIndex = 5;
          break;
        case 'bottom':
          rotation = { x: 90, y: 0 };
          buttonIndex = 6;
          break;
      }
      
      // Update unified state instead of direct transform
      rotationState.current.user = rotation;
      rotationState.current.isUserControlled = true;
      rotationState.current.isIdle = false;
      rotationState.current.lastInteraction = Date.now();
      updateCubeTransform();
      
      document.querySelector(`.cube-nav button:nth-child(${buttonIndex})`)?.classList.add('active');
      currentFaceRef.current = face;
      
      // Resume idle after 5 seconds
      setTimeout(() => {
        if (Date.now() - rotationState.current.lastInteraction >= 5000) {
          rotationState.current.isIdle = true;
          rotationState.current.isUserControlled = false;
        }
      }, 5000);
    };

    // Make rotateCube available globally for button clicks
    (window as any).rotateCube = rotateCube;
    
    // Animation frame reference
    let idleAnimationFrame: number | null = null;
    
    // Continuous idle rotation for 3D effect - using unified state
    const animateIdleRotation = () => {
      if (rotationState.current.isIdle && !rotationState.current.isUserControlled) {
        rotationState.current.idle.y += 0.2;
        rotationState.current.idle.x = -15 + Math.sin(rotationState.current.idle.y * 0.008) * 3;
        updateCubeTransform();
        
        // Subtle pulse glow effect
        if (cubeRef.current) {
          const glowIntensity = 0.3 + Math.sin(rotationState.current.idle.y * 0.03) * 0.15;
          cubeRef.current.style.boxShadow = `
            0 0 ${15 + glowIntensity * 8}px rgba(0, 255, 0, ${glowIntensity * 0.8}),
            inset 0 0 ${5 + glowIntensity * 3}px rgba(0, 255, 0, ${glowIntensity * 0.2})
          `;
        }
      }
      idleAnimationFrame = requestAnimationFrame(animateIdleRotation);
    };
    
    // Start idle animation after a delay
    setTimeout(() => {
      animateIdleRotation();
    }, 500);
    
    return () => {
      delete (window as any).rotateCube;
      if (idleAnimationFrame) {
        cancelAnimationFrame(idleAnimationFrame);
      }
    };
  }, []);

  const handleCubeRotate = (face: string) => {
    (window as any).rotateCube?.(face);
  };
  
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
          
          // Update scroll values in unified state
          if (!rotationState.current.isUserControlled) {
            rotationState.current.scroll.translateY = scrolled * 0.1;
            rotationState.current.scroll.y = scrolled * 0.05;
            updateCubeTransform();
          }
          
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
    // Cascade entrance animations on page load
    const animatePageEntrance = () => {
      // Animate main introduction text with subtle cascade effect
      const introElements = document.querySelectorAll('#introduction h2, .welcome-text');
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
        
        // Add glitch effect to welcome text and typing animation
        if (el.classList.contains('welcome-text')) {
          el.classList.add('typing-text');
          setTimeout(() => {
            el.classList.add('glitch-text');
            setTimeout(() => {
              el.classList.remove('glitch-text');
              el.classList.remove('typing-text');
            }, 500);
          }, 2000);
        }
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
      
      // Animate cube with smooth entrance using unified state
      if (cubeRef.current) {
        cubeRef.current.style.opacity = '0';
        rotationState.current.entrance.scale = 0.8;
        rotationState.current.entrance.translateY = 30;
        updateCubeTransform();
        
        animate(cubeRef.current, {
          opacity: [0, 1],
          duration: 1000,
          delay: 600,
          easing: 'easeOutQuart',
          update: (anim) => {
            const progress = (anim.currentTime / anim.duration) || 0;
            rotationState.current.entrance.scale = 0.8 + (0.2 * progress);
            rotationState.current.entrance.translateY = 30 * (1 - progress);
            updateCubeTransform();
          },
          complete: () => {
            rotationState.current.entrance.scale = 1;
            rotationState.current.entrance.translateY = 0;
            updateCubeTransform();
          }
        });
      }
      
      // Animate gallery cards with stagger effect
      const galleryCards = document.querySelectorAll('.gallery-card');
      galleryCards.forEach((card, index) => {
        // Remove inline styles - let CSS classes handle initial state
        card.classList.add('revealed');

        animate(card as HTMLElement, {
          opacity: [0, 1],
          translateY: [50, 0],
          rotateX: [-15, 0],
          duration: 1000,
          delay: 1200 + index * 100,
          easing: 'easeOutQuint'
        });
      });
      
      // Animate buttons with bounce effect
      const buttons = document.querySelectorAll('.btn-professional, .neo-matrix-btn');
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
    const buttons = document.querySelectorAll('.neo-matrix-btn, .btn-professional, .matrix-btn, button');
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
            <a href="#galleries" className="btn-professional glass-card hover-lift">
              <i className="fas fa-images"></i>
              View Galleries
            </a>
            <Link to="/blog" className="btn-professional glass-card hover-lift" style={{background: 'linear-gradient(135deg, #00ff00 0%, #003300 100%)'}}>
              <i className="fas fa-book-open"></i>
              View Blog
            </Link>
          </div>
        </div>
      </section>

      <section id="latest-updates" className="reveal" ref={latestUpdatesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <h2 className="section-title">--| Latest Updates |--</h2>
          <p style={{textAlign: 'center', marginBottom: '5rem'}}>
            <span style={{fontWeight: 'bold'}}>You can timetravel through different iterations of this portfolio since day 1 via this link:</span>
            <a href="https://thomasjbutler.github.io/version-timetravel/" target="_blank" rel="noopener" className="neo-matrix-btn" style={{marginLeft: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="btn-text">Enter TimeTravel</span>
              <i className="fas fa-history"></i>
            </a>
          </p>
          
          <div className="cube-showcase">
            <div className="cube-container" id="cube" ref={cubeRef}>
              <CubeFace face="front" project={cubeProjects.front} />
              <CubeFace face="right" project={cubeProjects.right} />
              <CubeFace face="back" project={cubeProjects.back} />
              <CubeFace face="left" project={cubeProjects.left} />
              <CubeFace face="top" project={cubeProjects.top} />
              <CubeFace face="bottom" project={cubeProjects.bottom} />
            <div className="cube-nav">
              <button onClick={() => handleCubeRotate('front')} className="active">1</button>
              <button onClick={() => handleCubeRotate('right')}>2</button>
              <button onClick={() => handleCubeRotate('back')}>3</button>
              <button onClick={() => handleCubeRotate('left')}>4</button>
              <button onClick={() => handleCubeRotate('top')}>5</button>
              <button onClick={() => handleCubeRotate('bottom')}>6</button>
            </div>
            </div>
          </div>
        </div>
      </section>


      <section id="galleries" className="reveal" ref={galleriesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <h2 className="section-heading">--| Galleries & Blogs |--</h2>
          <div className="galleries-grid">
            <div className="gallery-card">
              <div className="gallery-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Thought Leadership Blog</h3>
              <p>20+ articles on AI, development, and human-centered technology.</p>
              <Link to="/blog" className="gallery-link">
                Read Blog <i className="fas fa-arrow-right"></i>
              </Link>
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