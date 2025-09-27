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
      demo: 'https://ai-code-generator.vercel.app/',
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
      demo: 'https://sql-ball.vercel.app/',
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
  {
    id: 'git-review-assistant',
    name: 'Git Review Assistant',
    visibility: 'Public',
    description: 'AI-powered code review system with automated PR feedback. Intelligent analysis of code changes with contextual suggestions and quality metrics.',
    topics: ['LangChain', 'GitHub API', 'FastAPI', 'Code Review', 'AI Analysis', 'Automation'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 70
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/git-review-assistant'
    },
    category: 'ai',
    status: 'in-progress',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201681/gitreview_placeholder.png',
    gradient: 'linear-gradient(135deg, rgba(255, 69, 0, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'rag-chatbot',
    name: 'RAG Chatbot',
    visibility: 'Public',
    description: 'Document-based Q&A system with semantic search and citations. Advanced retrieval-augmented generation for intelligent document interaction.',
    topics: ['Pinecone', 'OpenAI', 'LangChain', 'RAG', 'Vector Search', 'Document Analysis'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 80
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/rag-chatbot'
    },
    category: 'ai',
    status: 'in-progress',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201682/ragchatbot_placeholder.png',
    gradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'multi-agent-system',
    name: 'Multi-Agent System',
    visibility: 'Public',
    description: 'Collaborative AI agents for complex task orchestration. Advanced multi-agent workflows with LangGraph for sophisticated problem-solving.',
    topics: ['LangGraph', 'Multiple LLMs', 'WebSocket', 'Agent Orchestration', 'Workflow', 'Collaboration'],
    language: {
      name: 'Python',
      color: '#3572A5',
      percent: 85
    },
    stats: {
      stars: 0,
      forks: 0
    },
    links: {
      github: 'https://github.com/ThomasJButler/multi-agent-system'
    },
    category: 'ai',
    status: 'coming-soon',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201683/multiagent_placeholder.png',
    gradient: 'linear-gradient(135deg, rgba(30, 144, 255, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },
  {
    id: 'dev-workflow-agent',
    name: 'Dev Workflow Agent',
    visibility: 'Public',
    description: 'Automate development workflows with MCP integration. Intelligent automation for CI/CD, testing, and deployment processes.',
    topics: ['MCP', 'GitHub Actions', 'Docker', 'CI/CD', 'Automation', 'DevOps'],
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
      github: 'https://github.com/ThomasJButler/dev-workflow-agent'
    },
    category: 'ai',
    status: 'coming-soon',
    backgroundImage: 'https://res.cloudinary.com/depqttzlt/image/upload/v1758201684/devworkflow_placeholder.png',
    gradient: 'linear-gradient(135deg, rgba(50, 205, 50, 0.2) 0%, rgba(0, 40, 0, 0.9) 100%)'
  },

  // Web Development Projects
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
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const PROJECTS_PER_PAGE = 9; // 3x3 grid

  useMatrixAnimation(containerRef as React.RefObject<HTMLElement>, {});
  useCardAnimations();

  // Filter projects by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory]);

  // Apply pagination to filtered projects
  useEffect(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    setVisibleProjects(filteredProjects.slice(startIndex, endIndex));
  }, [filteredProjects, currentPage]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

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
    const handleButtonClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      createParticleBurst(mouseEvent.clientX, mouseEvent.clientY);
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

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
      // Smooth scroll to top of projects section
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
      // Smooth scroll to top of projects section
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Epic card flip system - like a reverse Pokemon card!
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

  // Mobile touch support for better UX
  const handleTouchStart = (e: React.TouchEvent, projectId: string) => {
    e.preventDefault();
    handleCardFlip(projectId);
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
          {visibleProjects.map((project) => {
            const isFlipped = flippedCards.has(project.id);
            return (
              <article
                key={project.id}
                className={`matrix-flip-card ${isFlipped ? 'flipped' : ''}`}
                data-category={project.category}
                onClick={() => handleCardFlip(project.id)}
                onTouchStart={(e) => handleTouchStart(e, project.id)}
              >
                <div className="matrix-flip-card-inner">
                  {/* FRONT FACE - Project Image (like Pokemon card front) */}
                  <div
                    className="matrix-flip-card-front"
                    style={{
                      backgroundImage: project.backgroundImage
                        ? `linear-gradient(135deg, rgba(0, 40, 0, 0.3), rgba(0, 20, 0, 0.6)), url('${project.backgroundImage}')`
                        : `linear-gradient(135deg, rgba(0, 40, 0, 0.3), rgba(0, 20, 0, 0.6)), url('src/images/MyAmazingPhoto.png')`,
                      backgroundSize: 'cover, cover',
                      backgroundPosition: 'center, center',
                      backgroundRepeat: 'no-repeat, no-repeat',
                      backgroundBlendMode: 'multiply'
                    }}
                  >
                    {/* Top overlay with title and badges */}
                    <div className="matrix-card-header">
                      <h3 className="matrix-project-title">
                        <i className="fas fa-terminal"></i> {project.name}
                      </h3>
                      <div className="matrix-badges">
                        {project.featured && (
                          <span className="featured-badge">
                            <i className="fas fa-star"></i> Featured
                          </span>
                        )}
                        {project.status && project.status !== 'completed' && (
                          <span className={`status-badge status-${project.status}`}>
                            {project.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                          </span>
                        )}
                        <span className="visibility-badge">{project.visibility}</span>
                      </div>
                    </div>

                    {/* Bottom call-to-action */}
                    <div className="matrix-flip-indicator">
                      <div className="flip-text">
                        <i className="fas fa-redo-alt"></i>
                        <span>CLICK TO SEE STATS</span>
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE - Project Stats & Details (like Pokemon card back) */}
                  <div className="matrix-flip-card-back">
                    {/* Epic stats display */}
                    <div className="matrix-stats-header">
                      <div className="stat-display">
                        <div className="stat-item">
                          <i className="fas fa-star"></i>
                          <span className="stat-number">{project.stats.stars}</span>
                          <span className="stat-label">STARS</span>
                        </div>
                        <div className="stat-item">
                          <i className="fas fa-code-branch"></i>
                          <span className="stat-number">{project.stats.forks}</span>
                          <span className="stat-label">FORKS</span>
                        </div>
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="matrix-card-content">
                      <p className="matrix-project-description">{project.description}</p>

                      <div className="matrix-project-language">
                        <span
                          className="language-dot"
                          style={{ backgroundColor: project.language.color }}
                        ></span>
                        <span className="language-name">{project.language.name}</span>
                        <span className="language-percent">{project.language.percent}%</span>
                      </div>

                      <div className="matrix-project-tags">
                        {project.topics.slice(0, 4).map((topic, index) => (
                          <span key={index} className="matrix-tag">{topic}</span>
                        ))}
                      </div>

                      {/* GODMODE Epic Buttons */}
                      <div className="matrix-project-buttons">
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-matrix-btn demo-btn-epic"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fas fa-external-link-alt"></i>
                            LIVE DEMO
                          </a>
                        )}
                        <a
                          href={project.links.github || `https://github.com/ThomasJButler/${project.name.replace(/\s+/g, '-')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-matrix-btn github-btn-godmode"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-github"></i>
                          VIEW CODE
                        </a>
                      </div>
                    </div>

                    {/* Flip back indicator */}
                    <div className="matrix-flip-indicator flip-back">
                      <div className="flip-text">
                        <i className="fas fa-image"></i>
                        <span>CLICK TO SEE IMAGE</span>
                        <i className="fas fa-redo-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Matrix-themed Pagination Controls */}
        {totalPages > 1 && (
          <div className="matrix-pagination" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '3rem',
            padding: '2rem 0'
          }}>
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className="matrix-pagination-btn"
              style={{
                background: hasPrevPage ? 'rgba(0, 20, 0, 0.8)' : 'rgba(0, 10, 0, 0.4)',
                border: `2px solid ${hasPrevPage ? 'rgba(0, 255, 0, 0.6)' : 'rgba(0, 255, 0, 0.2)'}`,
                color: hasPrevPage ? '#00ff00' : 'rgba(0, 255, 0, 0.4)',
                padding: '0.8rem 1.2rem',
                borderRadius: '4px',
                cursor: hasPrevPage ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className="fas fa-chevron-left"></i>
              PREV
            </button>

            {/* Page Numbers */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className="matrix-page-btn"
                  style={{
                    background: page === currentPage ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 20, 0, 0.6)',
                    border: `2px solid ${page === currentPage ? '#00ff00' : 'rgba(0, 255, 0, 0.4)'}`,
                    color: page === currentPage ? '#00ff00' : 'rgba(0, 255, 0, 0.8)',
                    padding: '0.6rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    minWidth: '40px',
                    transition: 'all 0.3s ease',
                    textShadow: page === currentPage ? '0 0 10px rgba(0, 255, 0, 0.8)' : 'none',
                    boxShadow: page === currentPage ? '0 0 15px rgba(0, 255, 0, 0.4)' : 'none'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className="matrix-pagination-btn"
              style={{
                background: hasNextPage ? 'rgba(0, 20, 0, 0.8)' : 'rgba(0, 10, 0, 0.4)',
                border: `2px solid ${hasNextPage ? 'rgba(0, 255, 0, 0.6)' : 'rgba(0, 255, 0, 0.2)'}`,
                color: hasNextPage ? '#00ff00' : 'rgba(0, 255, 0, 0.4)',
                padding: '0.8rem 1.2rem',
                borderRadius: '4px',
                cursor: hasNextPage ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              NEXT
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Page Info */}
            <div style={{
              color: 'rgba(0, 255, 0, 0.7)',
              fontFamily: 'var(--font-primary)',
              fontSize: '0.9rem',
              marginLeft: '1rem',
              letterSpacing: '1px'
            }}>
              PAGE {currentPage} OF {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};