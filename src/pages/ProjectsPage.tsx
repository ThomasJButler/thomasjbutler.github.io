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
    category: 'personal'
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
    category: 'personal'
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
    category: 'web'
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
    category: 'web'
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
    category: 'games'
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
    category: 'ml'
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
    category: 'web'
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
    category: 'web'
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
    category: 'web'
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
    category: 'personal'
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
    category: 'ml'
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
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMatrixAnimation(containerRef);
  useCardAnimations();

  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    if (gridRef.current) {
      animate(gridRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100, {from: 'first'}),
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }, [visibleProjects]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    
    // Animate tab change
    const tabButtons = document.querySelectorAll('.matrix-tab-button');
    animate(tabButtons, {
      scale: [1, 0.95, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });
  };

  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.02,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
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
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="matrix-project-card"
              data-category={project.category}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="matrix-project-header">
                <h3 className="matrix-project-title">
                  <i className="fas fa-terminal"></i> {project.name}
                </h3>
                <div className="matrix-project-stats">
                  <span className="stat">
                    <i className="fas fa-star"></i> {project.stats.stars}
                  </span>
                  <span className="stat">
                    <i className="fas fa-code-branch"></i> {project.stats.forks}
                  </span>
                </div>
              </div>
              
              <div className="matrix-project-content">
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
              
              <div className="matrix-project-buttons">
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
      </div>
    </div>
  );
};