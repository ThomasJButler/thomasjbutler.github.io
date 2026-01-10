/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description About page showcasing programming journey, qualifications,
 *              certifications, and expandable content sections
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css';

const techStack = [
  // Frontend
  { icon: "fab fa-react", name: "React", glowClass: "react-glow" },
  { icon: "fab fa-js", name: "JavaScript", glowClass: "js-glow" },
  { icon: "fas fa-code", name: "TypeScript", glowClass: "ts-glow" },
  { icon: "fab fa-html5", name: "HTML/CSS", glowClass: "html-glow" },
  { icon: "fas fa-bolt", name: "Vite", glowClass: "vite-glow" },

  // Backend
  { icon: "fab fa-node-js", name: "Node.js", glowClass: "node-glow" },
  { icon: "fab fa-python", name: "Python", glowClass: "python-glow" },
  { icon: "fas fa-database", name: "PostgreSQL", glowClass: "db-glow" },
  { icon: "fas fa-server", name: "REST APIs", glowClass: "api-glow" },

  // Cloud/DevOps
  { icon: "fab fa-aws", name: "AWS", glowClass: "aws-glow" },
  { icon: "fab fa-microsoft", name: "Azure", glowClass: "azure-glow" },
  { icon: "fab fa-docker", name: "Docker", glowClass: "docker-glow" },
  { icon: "fas fa-rocket", name: "CI/CD", glowClass: "cicd-glow" },
  { icon: "fas fa-cloud", name: "Vercel", glowClass: "vercel-glow" },
  { icon: "fas fa-cloud-upload-alt", name: "Netlify", glowClass: "netlify-glow" },

  // AI/ML
  { icon: "fas fa-brain", name: "TensorFlow", glowClass: "tf-glow" },
  { icon: "fas fa-robot", name: "PyTorch", glowClass: "pytorch-glow" },
  { icon: "fas fa-comments", name: "LLMs", glowClass: "llm-glow" },
  { icon: "fas fa-chart-line", name: "ML Models", glowClass: "ml-glow" },
  { icon: "fas fa-database", name: "Pinecone", glowClass: "pinecone-glow" },

  // Frameworks
  { icon: "fas fa-code", name: ".NET", glowClass: "dotnet-glow" }
];

/**
 * About page component - simplified credibility scanner
 * @return {JSX.Element}
 * @constructor
 */
export const AboutPage: React.FC = () => {
  /**
   * @constructs Scrolls page to top on mount
   */
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="page-wrapper page-about">
      {/* SECTION 1: Why I Love Programming */}
      <section id="why-love-programming" className="about-section">
        <div className="container">
          <h2 className="section-title">Why I Love Programming</h2>
          <div className="story-content">
            <p className="highlight-text">
              Programming is not just a profession for me, it's a passion. There's something magical about transforming ideas into reality through code. The ability to create something from nothing, to build tools that solve real problems, and to see the immediate impact of your work is incredibly satisfying. Every project is a blank canvas, and the only limit is imagination and determination.
            </p>
            <p className="highlight-text">
              What truly captivates me is the puzzle-solving aspect of development. Each challenge is an opportunity to think critically, to break down complex problems into elegant solutions. The moment when everything clicks into place, when the code finally works after hours of debugging, is pure joy. It's like solving a thousand puzzles at once, each one teaching you something new.
            </p>
            <p className="highlight-text">
              The technology landscape never stops evolving, and that's what keeps me energised. There's always a new framework to explore, a better pattern to learn, or an innovative approach to discover. This constant growth and the vibrant community of developers sharing knowledge makes programming an endless journey of learning and improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Matrix Rain Divider */}
      <div className="services-matrix-divider" aria-hidden="true"></div>

      {/* SECTION 2: Tech Stack Gallery */}
      <section id="tech-stack" className="about-section tech-stack-section">
        <div className="container">
          <h2 className="section-title">Tech Stack</h2>
          <p className="tech-stack-intro">
            Technologies I work with to build modern, scalable solutions
          </p>

          <div className="tech-stack-grid">
            {techStack.map((tech, index) => (
              <div key={index} className={`tech-item ${tech.glowClass}`} data-tech={tech.name}>
                <i className={tech.icon} aria-hidden="true"></i>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix Rain Divider */}
      <div className="services-matrix-divider" aria-hidden="true"></div>

      {/* SECTION 3: My Programming Journey - with Timeline Button at Bottom */}
      <section id="programming-journey" className="about-section">
        <div className="container">
          <h2 className="section-title">My Programming Journey</h2>
          <p className="journey-intro">
            What started as curiosity with simple HTML pages has evolved into a comprehensive career building production systems, exploring cutting-edge technologies, and continuously pushing the boundaries of what's possible with code.
          </p>
          <div className="journey-grid">
            <div className="journey-item">
              <i className="fas fa-lightbulb"></i>
              <h4>The Beginning</h4>
              <p>Started with simple HTML websites and Python scripts, discovering the joy of creating something from scratch.</p>
            </div>
            <div className="journey-item">
              <i className="fas fa-code"></i>
              <h4>Learning & Growth</h4>
              <p>Expanded into full-stack development, mastering React, Node.js, and various other technologies.</p>
            </div>
            <div className="journey-item">
              <i className="fas fa-robot"></i>
              <h4>AI Exploration</h4>
              <p>Discovered the fascinating world of AI and machine learning, leading to innovative projects and solutions.</p>
            </div>
            <div className="journey-item">
              <i className="fas fa-briefcase"></i>
              <h4>Professional Development</h4>
              <p>Transitioned from hobby projects to production systems, working with clients and delivering scalable solutions that impact real users.</p>
            </div>
            <div className="journey-item">
              <i className="fab fa-github"></i>
              <h4>Open Source Contribution</h4>
              <p>Engaged with the developer community, contributing to open-source projects and building tools that help other developers.</p>
            </div>
            <div className="journey-item">
              <i className="fas fa-rocket"></i>
              <h4>Current Focus</h4>
              <p>Exploring cutting-edge AI integration, modern development tools, and pushing the boundaries of what's possible with current technology.</p>
            </div>
          </div>

          {/* EPIC TIMELINE BUTTON - AT BOTTOM OF JOURNEY SECTION */}
          <div className="timeline-cta-section timeline-cta-compact">
            <Link to="/updates" className="epic-timeline-button timeline-button-compact">
              <div className="button-glow"></div>
              <div className="button-inner">
                <div className="button-icon-wrapper">
                  <i className="fas fa-timeline"></i>
                  <div className="icon-pulse"></div>
                </div>
                <div className="button-content">
                  <span className="button-title">View My Full Dev Timeline</span>
                  <span className="button-subtitle">
                    <i className="fas fa-calendar-alt"></i>
                    25 Milestones  •  2000 - 2025
                  </span>
                </div>
                <div className="button-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
