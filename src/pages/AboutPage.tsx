import React, { useEffect, useRef } from 'react';
import { useMatrixAnimation } from '../hooks/useMatrixAnimation';
import anime from '../utils/anime';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: 'fa-code',
    skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'CSS3/SASS', 'Tailwind CSS'],
    color: '#00ff00'
  },
  {
    title: 'Backend Development',
    icon: 'fa-server',
    skills: ['Node.js', 'Python', 'Express.js', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    color: '#00ffff'
  },
  {
    title: 'AI & Machine Learning',
    icon: 'fa-brain',
    skills: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI API', 'Claude API', 'RAG Systems'],
    color: '#ff00ff'
  },
  {
    title: 'Cloud & DevOps',
    icon: 'fa-cloud',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions'],
    color: '#ffff00'
  }
];

const timeline = [
  {
    year: '2020',
    title: 'Started Web Development Journey',
    description: 'Began learning HTML, CSS, and JavaScript. Built first portfolio website.',
    icon: 'fa-rocket'
  },
  {
    year: '2021',
    title: 'Mastered Modern Frameworks',
    description: 'Deep dive into React, Node.js, and full-stack development.',
    icon: 'fa-layer-group'
  },
  {
    year: '2022',
    title: 'AI Integration Specialist',
    description: 'Started integrating AI models into web applications. Worked with GPT-3 and early LLMs.',
    icon: 'fa-robot'
  },
  {
    year: '2023',
    title: 'Founded AiTomatic',
    description: 'Launched AI platform that streamlines workflows with 10+ integrated models.',
    icon: 'fa-building'
  },
  {
    year: '2024',
    title: 'Open Source Contributor',
    description: 'Active contributions to major open source projects and community involvement.',
    icon: 'fa-code-branch'
  }
];

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useMatrixAnimation(containerRef);

  useEffect(() => {
    // Animate skills on mount
    if (skillsRef.current) {
      anime({
        targets: skillsRef.current.querySelectorAll('.skill-card'),
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad'
      });
    }

    // Animate timeline
    if (timelineRef.current) {
      anime({
        targets: timelineRef.current.querySelectorAll('.timeline-item'),
        opacity: [0, 1],
        translateX: function(el: any, i: number) {
          return i % 2 === 0 ? [-50, 0] : [50, 0];
        },
        delay: anime.stagger(150, {start: 300}),
        duration: 1000,
        easing: 'easeOutQuad'
      });
    }
  }, []);

  const handleSkillHover = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const icons = card.querySelectorAll('.skill-item');
    
    anime({
      targets: icons,
      scale: [1, 1.1],
      duration: 300,
      delay: anime.stagger(50),
      easing: 'easeOutQuad'
    });
  };

  const handleSkillLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const icons = card.querySelectorAll('.skill-item');
    
    anime({
      targets: icons,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  return (
    <div ref={containerRef} className="about-section">
      <div className="container">
        <section className="about-intro">
          <h1 className="about-title">About Me</h1>
          <div className="about-content">
            <div className="about-text">
              <p className="lead">
                I'm a full-stack developer with a passion for creating innovative web solutions 
                that leverage the power of artificial intelligence.
              </p>
              <p>
                With expertise spanning from responsive front-end interfaces to scalable backend 
                architectures, I specialize in building modern web applications that push the 
                boundaries of what's possible with today's technologies.
              </p>
              <p>
                My journey in tech has been driven by curiosity and a desire to solve complex 
                problems. From crafting pixel-perfect UIs to implementing sophisticated AI 
                integrations, I bring a holistic approach to every project.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">AI Models Integrated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section" ref={skillsRef}>
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="skill-card"
                onMouseEnter={handleSkillHover}
                onMouseLeave={handleSkillLeave}
                style={{ '--skill-color': category.color } as React.CSSProperties}
              >
                <div className="skill-header">
                  <i className={`fas ${category.icon}`}></i>
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-list">
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className="skill-item">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline-section" ref={timelineRef}>
          <h2 className="section-title">My Journey</h2>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="timeline-info">
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="timeline-line"></div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Let's Build Something Amazing Together</h2>
          <p>
            Whether you need a cutting-edge web application, AI integration, or creative 
            technical solutions, I'm here to help bring your vision to life.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">
              <span>Get In Touch</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="/projects" className="btn-secondary">
              <span>View My Work</span>
              <i className="fas fa-code"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};