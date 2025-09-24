import React, { useState, useEffect, useRef } from 'react';
import { useMatrixAnimation } from '../hooks/useMatrixAnimation';
import { animate, stagger } from 'animejs';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { WebGL3DGallery } from '../components/projects/WebGL3DGallery';
import '../css/components/webgl-3d-gallery.css';

interface Project {
  id: string;
  name: string;
  visibility: string;
  description: string;
  topics: string[];
  language: {
    name: string;
    color: string;
    percent: number;
  };
  stats: {
    stars: number;
    forks: number;
  };
  links: {
    demo?: string;
    github: string;
  };
  category: string;
  backgroundImage?: string;
  gradient?: string;
}

const projects: Project[] = [
  {
    id: 'python-projects',
    name: 'Python Projects',
    visibility: 'Public',
    description: 'Discover how I leverage Python to create mathematical fractals, fibonacci calculations, model prediction and mini python games.',
    topics: ['Python', 'Algorithms', 'Mathematics', 'Fractals', 'Machine Learning', 'Games'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 100
    },
    stats: {
      stars: 5,
      forks: 2
    },
    links: {
      github: 'https://github.com/ThomasJButler/PythonProjects'
    },
    category: 'personal',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214156/pythonprojects_vvszeh.png',
    gradient: 'linear-gradient(135deg, rgba(53, 114, 165, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'commercial-portfolio',
    name: 'Commercial Portfolio v2.0',
    visibility: 'Public',
    description: 'Complete site revamp to V2.0 and added section showcasing all commercial work, with Notion integration for dynamic content management.',
    topics: ['Portfolio', 'Notion API', 'CMS', 'Professional', 'Dynamic', 'Responsive'],
    language: {
      name: 'TypeScript',
      color: '#3178c6',
      percent: 68
    },
    stats: {
      stars: 12,
      forks: 3
    },
    links: {
      demo: 'https://thomasjbutler.me',
      github: 'https://github.com/ThomasJButler/commercial-portfolio-react'
    },
    category: 'personal',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/commercialv20_rus9qz.png',
    gradient: 'linear-gradient(135deg, rgba(49, 120, 198, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'portfolio-v3',
    name: 'Portfolio v3.0 - React Migration',
    visibility: 'Public',
    description: 'Complete migration to React 19 with TypeScript, Vite 7, and Anime.js v4. Modern component architecture with maintained Matrix aesthetic.',
    topics: ['React 19', 'TypeScript', 'Vite 7', 'Anime.js', 'Components', 'Migration'],
    language: {
      name: 'TypeScript',
      color: '#3178c6',
      percent: 45
    },
    stats: {
      stars: 8,
      forks: 2
    },
    links: {
      demo: '/react.html',
      github: 'https://github.com/ThomasJButler/ThomasJButler'
    },
    category: 'web',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754541799/v30_sesrmp.png',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 40, 0, 0.95) 100%)'
  },
  {
    id: 'css-showcase',
    name: 'CSS Showcase',
    visibility: 'Public',
    description: 'Interactive showcase of advanced CSS techniques, animations, and creative web designs demonstrating modern CSS capabilities.',
    topics: ['Pure CSS', 'Vanilla JS', ':has()', 'Container Queries', 'Responsive', 'No Framework'],
    language: {
      name: 'CSS',
      color: '#563d7c',
      percent: 85
    },
    stats: {
      stars: 23,
      forks: 7
    },
    links: {
      demo: 'https://thomasjbutler.github.io/css-showcase/',
      github: 'https://github.com/ThomasJButler/css-showcase'
    },
    category: 'web',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214157/cssshowcase_q25veb.png',
    gradient: 'linear-gradient(135deg, rgba(86, 61, 124, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    visibility: 'Public',
    description: 'An arcade website built using Vite, Python, and React to showcase playable mini-games created during my learning journey.',
    topics: ['React', 'Python', 'Vite', 'Canvas API', 'Game Dev'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 72
    },
    stats: {
      stars: 15,
      forks: 5
    },
    links: {
      demo: 'https://www.tomatic.tech/',
      github: 'https://github.com/ThomasJButler/The-Matrix-Arcade'
    },
    category: 'games',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/matrixarcade_xofygu.png',
    gradient: 'linear-gradient(135deg, rgba(241, 224, 90, 0.1) 0%, rgba(0, 40, 0, 0.95) 100%)'
  },
  {
    id: 'ai-comparison',
    name: 'AI Model Comparison Tool',
    visibility: 'Public',
    description: 'Part of AiTomatic Suite - Compare and evaluate different AI models side-by-side. Features real-time testing, performance metrics, and model recommendations.',
    topics: ['AI/ML', 'Python', 'APIs', 'Analytics', 'Dashboard'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 60
    },
    stats: {
      stars: 10,
      forks: 4
    },
    links: {
      demo: 'https://ai-comparison-showcase.vercel.app/',
      github: 'https://github.com/ThomasJButler/AI-Comparison-Showcase-'
    },
    category: 'ml',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'dotnet-calculator',
    name: 'Dotnet React Calculator',
    visibility: 'Public',
    description: 'Initially started as a code assessment, I continued developing this project to explore and master the ins and outs of .NET backend development and API customization alongside React frontend integration.',
    topics: ['.NET', 'React', 'C#', 'API', 'Full Stack'],
    language: {
      name: 'C#',
      color: '#178600',
      percent: 55
    },
    stats: {
      stars: 6,
      forks: 1
    },
    links: {
      demo: 'https://dotnet-react-calendar.vercel.app/',
      github: 'https://github.com/ThomasJButler/Dotnet-React-Calendar'
    },
    category: 'web',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/dotnetcalculator_hjltgc.png',
    gradient: 'linear-gradient(135deg, rgba(23, 134, 0, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    visibility: 'Public',
    description: 'Interactive landing page with Matrix-inspired animations and effects',
    topics: ['HTML5', 'CSS3', 'JavaScript', 'Animations', 'Matrix Theme'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 65
    },
    stats: {
      stars: 3,
      forks: 1
    },
    links: {
      demo: 'landingpage.html',
      github: 'https://github.com/ThomasJButler/landing-page'
    },
    category: 'web',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/landingpage_nxcdeb.png',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 0, 0.2) 0%, rgba(0, 20, 0, 0.95) 100%)'
  },
  {
    id: 'version-timetravel',
    name: 'Version TimeTravel',
    visibility: 'Public',
    description: 'Visual timeline of portfolio evolution and version history',
    topics: ['Timeline', 'Version Control', 'Interactive', 'History'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 70
    },
    stats: {
      stars: 2,
      forks: 0
    },
    links: {
      demo: 'timetravel.html',
      github: 'https://github.com/ThomasJButler/version-timetravel'
    },
    category: 'web',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214155/timetravel_dqpgqu.png',
    gradient: 'linear-gradient(135deg, rgba(241, 224, 90, 0.1) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'big-bang-gallery',
    name: 'The Big Bang Gallery',
    visibility: 'Public',
    description: 'Creative visual gallery showcasing design work and experiments',
    topics: ['Gallery', 'Creative', 'Visual', 'Design', 'Showcase'],
    language: {
      name: 'CSS',
      color: '#563d7c',
      percent: 80
    },
    stats: {
      stars: 4,
      forks: 2
    },
    links: {
      demo: 'gallery.html',
      github: 'https://github.com/ThomasJButler/big-bang-gallery'
    },
    category: 'personal',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214152/bigbanggallery_s7lkfg.png',
    gradient: 'linear-gradient(135deg, rgba(86, 61, 124, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'premier-league-oracle',
    name: 'The Premier League Oracle',
    visibility: 'Public',
    description: 'Football statistics and prediction system using data analysis',
    topics: ['Python', 'Data Analysis', 'Machine Learning', 'Sports', 'Predictions'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 85
    },
    stats: {
      stars: 7,
      forks: 3
    },
    links: {
      github: 'https://github.com/ThomasJButler/premier-league-oracle'
    },
    category: 'ml',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214155/plpredictor_w4fqjr.png',
    gradient: 'linear-gradient(135deg, rgba(53, 114, 165, 0.3) 0%, rgba(0, 40, 0, 0.9) 100%)'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'ml', label: 'AI & ML' },
  { id: 'games', label: 'Games' },
  { id: 'personal', label: 'Personal' }
];

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMatrixAnimation(containerRef, {});
  useCardAnimations();

  // Convert projects to 3D Gallery format
  const convert3DProjects = (projectList: Project[]) => {
    return projectList.map(project => ({
      id: project.id,
      title: project.name,
      description: project.description,
      image: project.backgroundImage || '',
      tags: project.topics,
      liveUrl: project.links.demo,
      githubUrl: project.links.github,
      featured: project.stats.stars > 10 // Mark high-starred projects as featured
    }));
  };

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    if (gridRef.current) {
      const children = Array.from(gridRef.current.children) as HTMLElement[];
      animate(children, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100, {from: 'first'}),
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }, [visibleProjects]);
  
  // Create particle burst effect - refined for better performance
  const createParticleBurst = (x: number, y: number) => {
    const particleCount = 10; // Reduced particle count
    let container = document.querySelector('.particle-container');
    
    if (!container) {
      container = document.createElement('div');
      container.className = 'particle-container';
      document.body.appendChild(container);
    }
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-burst';
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 50 + Math.random() * 50; // Reduced velocity
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--x', `${tx}px`);
      particle.style.setProperty('--y', `${ty}px`);
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      
      container.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  };
  
  // Add particle effects to buttons
  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      createParticleBurst(e.clientX, e.clientY);
    };
    
    const buttons = document.querySelectorAll('.neo-matrix-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', handleButtonClick);
    });
    
    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('click', handleButtonClick);
      });
    };
  }, [visibleProjects]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    
    // Animate tab change
    const tabButtons = document.querySelectorAll('.matrix-tab-button');
    animate(tabButtons as NodeListOf<HTMLElement>, {
      scale: [1, 0.95, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });
  };

  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    
    // Enhanced 3D tilt effect
    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // Reduced tilt
      const rotateY = ((x - centerX) / centerX) * 5;  // Reduced tilt
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateZ(10px)`;
      
      // Enhanced glass morphism hover effect
      const overlay = card.querySelector('.project-card-overlay') as HTMLElement;
      const contentBg = card.querySelector('.content-glass-bg') as HTMLElement;

      if (overlay) {
        overlay.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(0, 255, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.5) 25%,
            rgba(0, 20, 0, 0.8) 60%,
            rgba(0, 0, 0, 0.95) 100%
          )
        `;
        overlay.style.backdropFilter = 'blur(12px) saturate(1.4)';
        (overlay.style as any).WebkitBackdropFilter = 'blur(12px) saturate(1.4)';
      }

      if (contentBg) {
        contentBg.style.background = `
          linear-gradient(to top,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 255, 0, 0.1) 30%,
            rgba(0, 20, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.2) 100%
          )
        `;
        contentBg.style.backdropFilter = 'blur(16px) saturate(1.6)';
        (contentBg.style as any).WebkitBackdropFilter = 'blur(16px) saturate(1.6)';
        contentBg.style.borderTop = '1px solid rgba(0, 255, 0, 0.4)';
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.dataset.mouseHandler = 'true';
    
    // Animate in
    animate(card, {
      scale: 1.05,
      boxShadow: ['0 2px 10px rgba(0, 0, 0, 0.3)', '0 20px 40px rgba(0, 255, 0, 0.4)'],
      duration: 300,
      easing: 'easeOutQuad'
    });
    
    // Glow effect
    card.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 20px rgba(0, 255, 0, 0.1)';
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;

    // Remove mouse move handler
    if (card.dataset.mouseHandler) {
      card.style.transform = '';
      delete card.dataset.mouseHandler;
    }

    // Reset glass morphism overlays
    const overlay = card.querySelector('.project-card-overlay') as HTMLElement;
    const contentBg = card.querySelector('.content-glass-bg') as HTMLElement;

    if (overlay) {
      overlay.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 20, 0, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%)';
      overlay.style.backdropFilter = 'blur(8px) saturate(1.2)';
      (overlay.style as any).WebkitBackdropFilter = 'blur(8px) saturate(1.2)';
    }

    if (contentBg) {
      contentBg.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 100%)';
      contentBg.style.backdropFilter = 'blur(12px) saturate(1.5)';
      (contentBg.style as any).WebkitBackdropFilter = 'blur(12px) saturate(1.5)';
      contentBg.style.borderTop = '1px solid rgba(0, 255, 0, 0.2)';
    }

    // Animate out
    animate(card, {
      scale: 1,
      boxShadow: ['0 20px 40px rgba(0, 255, 0, 0.4)', '0 2px 10px rgba(0, 0, 0, 0.3)'],
      duration: 300,
      easing: 'easeOutQuad'
    });

    card.style.boxShadow = '';
  };

  // Handle 3D Gallery project selection
  const handle3DProjectSelect = (project: any) => {
    // Find the original project from our data
    const originalProject = projects.find(p => p.id === project.id);
    if (originalProject) {
      setSelectedProject(originalProject);
      // You could add additional logic here, like opening a modal
      console.log('Selected project:', originalProject);
    }
  };

  return (
    <div ref={containerRef} id="matrix-projects-showcase" className="projects-section">
      <div className="matrix-project-container">
        <h2 className="section-title">--| Project Showcase |--</h2>
        <p className="section-description">Explore my open source contributions and personal projects</p>

        {/* View Mode Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0',
          gap: '10px'
        }}>
          <button
            className={`matrix-tab-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 255, 0, 0.5)',
              color: '#00ff00',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-th"></i> Grid View
          </button>
          <button
            className={`matrix-tab-button ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
            style={{
              background: viewMode === '3d' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 255, 0, 0.5)',
              color: '#00ff00',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-cube"></i> 3D Gallery
          </button>
        </div>

        <div className="matrix-project-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`matrix-tab-button ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
              data-category={cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering based on view mode */}
        {viewMode === '3d' ? (
          <WebGL3DGallery
            projects={convert3DProjects(visibleProjects)}
            onProjectSelect={handle3DProjectSelect}
            autoRotate={true}
            cameraControls={true}
          />
        ) : (
          <div ref={gridRef} className="matrix-project-grid">
            {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="matrix-project-card"
              data-category={project.category}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              style={{
                background: project.gradient || 'rgba(0, 20, 0, 0.6)',
                backgroundImage: project.backgroundImage ? `url(${project.backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
              }}
            >
              {/* Enhanced glass morphism overlay for better text readability */}
              <div className="project-card-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 20, 0, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%)',
                backdropFilter: 'blur(8px) saturate(1.2)',
                WebkitBackdropFilter: 'blur(8px) saturate(1.2)', // Safari support
                zIndex: 1,
                pointerEvents: 'none'
              }} />

              {/* Content glass background for enhanced readability */}
              <div className="content-glass-bg" style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '65%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 100%)',
                backdropFilter: 'blur(12px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.5)', // Safari support
                borderTop: '1px solid rgba(0, 255, 0, 0.2)',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
              
              <div className="matrix-project-header" style={{
                position: 'relative',
                zIndex: 3,
                textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)'
              }}>
                <h3 className="matrix-project-title" style={{
                  color: '#00ff00',
                  fontWeight: 'bold',
                  textShadow: '0 0 15px rgba(0, 255, 0, 0.8), 0 0 5px rgba(0, 0, 0, 1)'
                }}>
                  <i className="fas fa-terminal"></i> {project.name}
                </h3>
                <div className="matrix-project-stats">
                  <span className="stat" style={{
                    textShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
                    color: '#ffffff'
                  }}>
                    <i className="fas fa-star"></i> {project.stats.stars}
                  </span>
                  <span className="stat" style={{
                    textShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
                    color: '#ffffff'
                  }}>
                    <i className="fas fa-code-branch"></i> {project.stats.forks}
                  </span>
                </div>
              </div>

              <div className="matrix-project-content" style={{
                position: 'relative',
                zIndex: 3,
                textShadow: '0 0 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)'
              }}>
                <p className="matrix-project-description" style={{
                  color: '#ffffff',
                  fontWeight: '500',
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 1)'
                }}>{project.description}</p>

                <div className="matrix-project-tags">
                  {project.topics.map((topic, index) => (
                    <span key={index} className="matrix-tag" style={{
                      background: 'rgba(0, 255, 0, 0.15)',
                      border: '1px solid rgba(0, 255, 0, 0.4)',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      color: '#00ff00',
                      textShadow: '0 0 8px rgba(0, 0, 0, 0.9)'
                    }}>{topic}</span>
                  ))}
                </div>

                <div className="matrix-project-language" style={{
                  color: '#ffffff',
                  textShadow: '0 0 8px rgba(0, 0, 0, 0.9)'
                }}>
                  <span
                    className="language-dot"
                    style={{
                      backgroundColor: project.language.color,
                      boxShadow: `0 0 8px ${project.language.color}`
                    }}
                  ></span>
                  <span className="language-name">{project.language.name}</span>
                  <span className="language-percent">{project.language.percent}%</span>
                </div>
              </div>

              <div className="matrix-project-buttons" style={{ position: 'relative', zIndex: 3 }}>
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="neo-matrix-btn"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="neo-matrix-btn"
                  >
                    <i className="fab fa-github"></i>
                    View Code
                  </a>
                )}
              </div>
            </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};