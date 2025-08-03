import React, { useState, useEffect, useRef } from 'react';
import { useMatrixAnimation } from '../hooks/useMatrixAnimation';
import { animate, stagger } from 'animejs';

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
    id: 'aitomatic',
    name: 'AiTomatic',
    visibility: 'Public',
    description: 'Revolutionary AI/ML platform streamlining workflows with 10+ integrated models including ChatGPT, Claude, and Gemini.',
    topics: ['React', 'TypeScript', 'AI/ML', 'API Integration'],
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
      demo: 'https://aitomatic.rocks',
      github: 'https://github.com/ThomasJButler/aitomatic'
    },
    category: 'personal'
  },
  {
    id: 'thomasjbutler',
    name: 'ThomasJButler',
    visibility: 'Public',
    description: 'Personal portfolio website showcasing full-stack development projects with Matrix-themed design.',
    topics: ['React', 'TypeScript', 'Anime.js', 'CSS3'],
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
      demo: 'https://thomasjbutler.co.uk',
      github: 'https://github.com/ThomasJButler/ThomasJButler'
    },
    category: 'personal'
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    visibility: 'Public',
    description: 'Interactive gaming platform with multiple mini-games built with React and Canvas API.',
    topics: ['React', 'Canvas API', 'Game Development', 'TypeScript'],
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
      github: 'https://github.com/ThomasJButler/the-matrix-arcade'
    },
    category: 'personal'
  },
  {
    id: 'css-showcase',
    name: 'CSS Showcase',
    visibility: 'Public',
    description: 'Advanced CSS demonstrations featuring complex animations, 3D transforms, and modern layout techniques.',
    topics: ['CSS3', 'Animations', 'Web Design', 'Creative'],
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
      github: 'https://github.com/ThomasJButler/css-showcase'
    },
    category: 'opensource'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'personal', label: 'Personal Projects' },
  { id: 'client', label: 'Client Work' },
  { id: 'opensource', label: 'Open Source' }
];

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMatrixAnimation(containerRef);

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
        ease: 'outQuad'
      });
    }
  }, [visibleProjects]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    
    // Animate tab change
    const tabButtons = document.querySelectorAll('.tab-button');
    animate(tabButtons, {
      scale: [1, 0.95, 1],
      duration: 300,
      ease: 'inOutQuad'
    });
  };

  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.02,
      duration: 300,
      ease: 'outQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      duration: 300,
      ease: 'outQuad'
    });
  };

  return (
    <div ref={containerRef} className="projects-section">
      <div className="container">
        <h2 className="section-title">GitHub Repository Showcase</h2>
        <p className="section-description">Explore my open source contributions and personal projects</p>
        
        <div className="project-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`tab-button ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
              data-category={cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="github-projects-grid">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="github-card"
              data-category={project.category}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="github-card-header">
                <div className="repo-info">
                  <h3 className="repo-name">
                    <i className="fab fa-github"></i>
                    {project.name}
                  </h3>
                  <span className="repo-visibility">{project.visibility}</span>
                </div>
                <div className="repo-stats">
                  <span className="stat">
                    <i className="fas fa-star"></i> {project.stats.stars}
                  </span>
                  <span className="stat">
                    <i className="fas fa-code-branch"></i> {project.stats.forks}
                  </span>
                </div>
              </div>
              
              <div className="github-card-body">
                <p className="repo-description">{project.description}</p>
                
                <div className="repo-topics">
                  {project.topics.map((topic, index) => (
                    <span key={index} className="topic">{topic}</span>
                  ))}
                </div>
                
                <div className="repo-language">
                  <span 
                    className="language-color" 
                    style={{ backgroundColor: project.language.color }}
                  ></span>
                  <span className="language-name">{project.language.name}</span>
                  <span className="language-percent">{project.language.percent}%</span>
                </div>
              </div>
              
              <div className="github-card-footer">
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="repo-link live"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                )}
                <a 
                  href={project.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-link github"
                >
                  <i className="fab fa-github"></i>
                  View on GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};