import React from 'react';

interface CubeProject {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    website?: string;
    github?: string;
  };
}

interface CubeFaceProps {
  face: 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom';
  project: CubeProject;
}

export const CubeFace: React.FC<CubeFaceProps> = ({ face, project }) => {
  return (
    <div className={`cube-face ${face}`}>
      <div className="cube-project">
        <div className="cube-project-icon">
          <img src={project.icon} alt={`${project.title} Preview`} />
        </div>
        <h3>{project.title}</h3>
        <p className="cube-project-description">{project.description}</p>
        <div className="cube-project-tags">
          {project.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div className="cube-project-buttons">
          {project.links.website && (
            <a 
              href={project.links.website} 
              target="_blank" 
              rel="noopener" 
              className="neo-matrix-btn"
            >
              <span className="btn-text">Website</span>
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
          {project.links.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener" 
              className="neo-matrix-btn"
            >
              <span className="btn-text">GitHub</span>
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export type { CubeProject };