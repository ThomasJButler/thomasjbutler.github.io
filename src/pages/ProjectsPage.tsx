import React, { useState, useEffect, useRef } from 'react';
import { useMatrixAnimation } from '../hooks/useMatrixAnimation';
import { animate, stagger } from 'animejs';
import { useCardAnimations } from '../hooks/useCardAnimations';

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
  status?: 'completed' | 'in-progress' | 'coming-soon';
  featured?: boolean;
}

const projects: Project[] = [
  // AI/ML Projects - Featured showcase from aitomatic.io
  {
    id: 'ai-comparison-showcase',
    name: 'AI Comparison Showcase',
    visibility: 'Public',
    description: 'Compare responses from multiple AI models side-by-side in real-time. Features GPT-4, Claude 3.5, DeepSeek, and Perplexity models with performance metrics and beautiful visualizations.',
    topics: ['AI/ML', 'Next.js', 'TypeScript', 'Multiple AI APIs', 'Performance Metrics', 'Real-time'],
    language: {
      name: 'TypeScript',
      color: '#3178c6',
      percent: 75
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://ai-comparison-showcase.vercel.app/',
      github: 'https://github.com/ThomasJButler/AI-Comparison-Showcase-'
    },
    category: 'ai',
    status: 'completed',
    featured: true,
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'ai-code-generator',
    name: 'AI Code Generator',
    visibility: 'Public',
    description: 'Generate production-ready code with AI assistance. Built with LangChain and React. Choose your language and generate code, unit tests, and documentation.',
    topics: ['LangChain', 'GPT-4o', 'Python', 'Flask', 'React', 'Code Generation'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 60
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/AICodeGenerator'
    },
    category: 'ai',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201680/codegeneratorfrontend_jccy53.png',
    gradient: 'linear-gradient(135deg, rgba(53, 114, 165, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'sql-ball',
    name: 'SQL-Ball',
    visibility: 'Public',
    description: 'Football data analytics with natural language queries and AI insights. RAG-powered NL-to-SQL using a custom collated dataset of European football results.',
    topics: ['Supabase', 'LangChain', 'React', 'OpenAI', 'PostgreSQL', 'RAG', 'Football Analytics'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 65
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/SQL-Ball'
    },
    category: 'ai',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758053629/generatesql_yclpkb.png',
    gradient: 'linear-gradient(135deg, rgba(0, 150, 0, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'mastering-ai-portfolio',
    name: 'Mastering AI Course Portfolio',
    visibility: 'Public',
    description: 'Interactive AI course portfolio showcasing projects and learning journey. A portfolio of web apps for the CodeCademy Mastering Generative AI & Agents for Developers Bootcamp.',
    topics: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Anime.js', 'Portfolio', 'Course Projects'],
    language: {
      name: 'TypeScript',
      color: '#3178c6',
      percent: 80
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://www.aitomatic.io/',
      github: 'https://github.com/ThomasJButler/MasteringAICoursePortfolio'
    },
    category: 'ai',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758053628/aicourseportfolio_pejlr2.png',
    gradient: 'linear-gradient(135deg, rgba(49, 120, 198, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },

  // Web Development Projects
  {
    id: 'web-agency-showcase',
    name: 'Web Agency Showcase',
    visibility: 'Public',
    description: 'Comprehensive documentation of commercial web development work designed for employers and recruiters. Features 10+ detailed project case studies with step-by-step processes, technical decisions, and outcomes.',
    topics: ['Case Studies', 'Commercial Work', 'Documentation', 'Portfolio', 'Web Development', 'Professional'],
    language: {
      name: 'Documentation',
      color: '#10B981',
      percent: 100
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://tombutler.notion.site/Web-Agency-Showcase-1a11b94bcaea80ffa87ae2fb8994e4de',
      github: ''
    },
    category: 'web',
    status: 'completed',
    featured: true,
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754541799/v30_sesrmp.png',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 40, 0, 0.95) 100%)'
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
      stars: 0,
      forks: 0
    },
    links: {
      demo: '/react.html',
      github: 'https://github.com/ThomasJButler/ThomasJButler'
    },
    category: 'web',
    status: 'completed',
    featured: true,
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754541799/v30_sesrmp.png',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 40, 0, 0.95) 100%)'
  },
  {
    id: 'lfc-news-reddit',
    name: 'LFC News Reddit App',
    visibility: 'Public',
    description: 'A minimal Reddit app created with React, Redux and Reddit API to bring the latest transfer rumours across a variety of different subreddits.',
    topics: ['React', 'Redux', 'Reddit API', 'Sports', 'News Aggregation', 'Real-time'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 80
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/LFC-News-Reddit-App'
    },
    category: 'web',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214152/lfcreddit_hgvxyz.png',
    gradient: 'linear-gradient(135deg, rgba(241, 224, 90, 0.1) 0%, rgba(200, 16, 46, 0.8) 100%)'
  },
  {
    id: 'dotnet-react-calendar',
    name: 'Dotnet React Calendar',
    visibility: 'Public',
    description: 'A Calendar app project built with .NET, Fast Endpoints, React.js. Initially started as a code assessment, continued to master .NET backend development.',
    topics: ['.NET', 'React', 'C#', 'Fast Endpoints', 'API', 'Full Stack'],
    language: {
      name: 'C#',
      color: '#178600',
      percent: 55
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://dotnet-react-calendar.vercel.app/',
      github: 'https://github.com/ThomasJButler/Dotnet-React-Calendar'
    },
    category: 'web',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/dotnetcalculator_hjltgc.png',
    gradient: 'linear-gradient(135deg, rgba(23, 134, 0, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'css-showcase',
    name: 'CSS Showcase',
    visibility: 'Public',
    description: 'An interactive showcase of modern CSS foundations for learning and education purposes. Pure CSS, no frameworks.',
    topics: ['Pure CSS', 'Vanilla JS', ':has()', 'Container Queries', 'Responsive', 'No Framework'],
    language: {
      name: 'CSS',
      color: '#563d7c',
      percent: 85
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://thomasjbutler.github.io/css-showcase/',
      github: 'https://github.com/ThomasJButler/css-showcase'
    },
    category: 'web',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214157/cssshowcase_q25veb.png',
    gradient: 'linear-gradient(135deg, rgba(86, 61, 124, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },

  // Creative & Games
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    visibility: 'Public',
    description: 'A collection of games in the style of \'The Matrix\' movies. An arcade website built using Vite, Python, and React to showcase playable mini-games.',
    topics: ['React', 'Python', 'Vite', 'Canvas API', 'Game Dev', 'Matrix Theme'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 72
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://www.tomatic.tech/',
      github: 'https://github.com/ThomasJButler/The-Matrix-Arcade'
    },
    category: 'games',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/matrixarcade_xofygu.png',
    gradient: 'linear-gradient(135deg, rgba(241, 224, 90, 0.1) 0%, rgba(0, 40, 0, 0.95) 100%)'
  },
  {
    id: 'bigbang-gallery',
    name: 'Big Bang Gallery',
    visibility: 'Public',
    description: 'A creative image gallery / canvas inspired by the big bang. Creative visual gallery showcasing design work and experiments.',
    topics: ['Gallery', 'Creative', 'Visual', 'Design', 'Canvas', 'Animation'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 65
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://thomasjbutler.github.io/bigbang-gallery/',
      github: 'https://github.com/ThomasJButler/bigbang-gallery'
    },
    category: 'creative',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214155/bigbang_cqxwzy.png',
    gradient: 'linear-gradient(135deg, rgba(255, 100, 0, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },

  // Python Projects
  {
    id: 'python-projects',
    name: 'Python Projects',
    visibility: 'Public',
    description: 'This is a collection of Python hobby projects, from climate visualisations in Project Aetheris to the terminal text adventure of Ctrl-S the World.',
    topics: ['Python', 'Algorithms', 'Mathematics', 'Fractals', 'Machine Learning', 'Games'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 100
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/PythonProjects'
    },
    category: 'personal',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214156/pythonprojects_vvszeh.png',
    gradient: 'linear-gradient(135deg, rgba(53, 114, 165, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },

  // Personal Projects
  {
    id: 'version-timetravel',
    name: 'Version TimeTravel',
    visibility: 'Public',
    description: 'Personal journey documenting the gradual transformation of my portfolio website. Visual timeline of portfolio evolution and version history.',
    topics: ['Timeline', 'Version Control', 'Interactive', 'History', 'Portfolio Evolution'],
    language: {
      name: 'JavaScript',
      color: '#f1e05a',
      percent: 70
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      demo: 'https://thomasjbutler.github.io/version-timetravel/',
      github: 'https://github.com/ThomasJButler/version-timetravel'
    },
    category: 'personal',
    status: 'completed',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1754214155/timetravel_dqpgqu.png',
    gradient: 'linear-gradient(135deg, rgba(241, 224, 90, 0.1) 0%, rgba(0, 40, 0, 0.9) 100%)'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'web', label: 'Web Development' },
  { id: 'games', label: 'Games & Creative' },
  { id: 'creative', label: 'Creative Projects' },
  { id: 'personal', label: 'Personal Projects' }
];

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Pagination configuration
  const projectsPerPage = 6;
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);

  // Calculate projects for current page
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = visibleProjects.slice(startIndex, endIndex);

  useMatrixAnimation(containerRef as React.RefObject<HTMLElement>, {});
  useCardAnimations();

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(p => p.category === activeCategory));
    }
    // Reset to first page when category changes
    setCurrentPage(1);
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
  }, [currentProjects]);
  
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
    const handleButtonClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      createParticleBurst(mouseEvent.clientX, mouseEvent.clientY);
    };

    const buttons = document.querySelectorAll('.matrix-btn-primary') as NodeListOf<HTMLElement>;
    buttons.forEach(btn => {
      btn.addEventListener('click', handleButtonClick);
    });

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('click', handleButtonClick);
      });
    };
  }, [currentProjects]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of projects section
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

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

  // Removed handleCardHover and handleCardLeave for performance optimization
  // Now using CSS-only hover effects for 60fps smooth animations

  // Handle magical card flip
  const handleCardFlip = (projectId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <div ref={containerRef} id="matrix-projects-showcase" className="projects-section">
      <div className="matrix-project-container">
        <h2 className="section-title">--| Project Showcase |--</h2>
        <p className="section-description">Explore my open source contributions and personal projects</p>
        
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

        <div ref={gridRef} className="matrix-project-grid">
          {currentProjects.map((project) => {
            const isFlipped = flippedCards.has(project.id);

            return (
              <article
                key={project.id}
                className={`matrix-project-card ${isFlipped ? 'is-flipped' : ''}`}
                data-category={project.category}
              >
                {/* 3D Card Inner Container */}
                <div className="card-3d-inner">

                  {/* FRONT FACE */}
                  <div
                    className="card-face card-front"
                    style={{
                      background: project.gradient || 'rgba(0, 20, 0, 0.6)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
              {/* Background overlay for better text readability */}
              <div className="project-card-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 20, 0, 0.9) 60%, rgba(0, 20, 0, 0.95) 100%)',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
              
              {/* Action buttons in top-right corner */}
              <div className="matrix-project-actions">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-icon-link"
                    title="View Code on GitHub"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-icon-link"
                    title="Live Demo"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                )}
              </div>

              <div className="matrix-project-header relative z-20">
                <h3 className="matrix-project-title">
                  <i className="fas fa-terminal"></i> {project.name}
                </h3>
                {project.status && project.status !== 'completed' && (
                  <span className={`status-badge status-${project.status}`}>
                    {project.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                  </span>
                )}
              </div>
              
              <div className="matrix-project-content relative z-20">
                <p className="matrix-project-description">{project.description}</p>
                
                <div className="matrix-project-tags">
                  {project.topics.map((topic, index) => (
                    <span key={index} className="matrix-tag">{topic}</span>
                  ))}
                </div>
                
                <div className="matrix-project-language">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: project.language.color }}
                  ></span>
                  <span className="language-name">{project.language.name}</span>
                  <span className="language-percent">{project.language.percent}%</span>
                </div>
              </div>
            </div>
            {/* End FRONT FACE */}

            {/* BACK FACE - Project Image */}
            <div className="card-face card-back">
              <div
                className="project-showcase-image"
                style={{
                  backgroundImage: `url(${project.backgroundImage || 'https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  position: 'relative'
                }}
              >
                {/* Gradient overlay for depth */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 40, 0, 0.7) 100%)',
                  borderRadius: '16px'
                }} />

                {/* Project name overlay */}
                <div className="project-name-overlay">
                  {project.name}
                </div>
              </div>
            </div>
            {/* End BACK FACE */}

          </div>
          {/* End 3D Inner */}

          {/* Flip Button - works on both sides */}
          <button
            className="card-flip-trigger"
            onClick={() => handleCardFlip(project.id)}
            title="Flip card"
          >
            <i className="fas fa-sync-alt"></i>
          </button>

        </article>
      );
    })}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="matrix-pagination">
            <button
              className={`matrix-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
              Prev
            </button>

            <div className="matrix-pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`matrix-pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={`matrix-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {totalPages > 1 && (
          <div className="matrix-pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, visibleProjects.length)} of {visibleProjects.length} projects
          </div>
        )}
      </div>
    </div>
  );
};