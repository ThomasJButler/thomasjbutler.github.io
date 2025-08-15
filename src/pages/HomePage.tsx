import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CubeFace, type CubeProject } from '../components/CubeFace';

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
          rotation = { x: 0, y: 90 };
          buttonIndex = 2;
          break;
        case 'back':
          rotation = { x: 0, y: 180 };
          buttonIndex = 3;
          break;
        case 'left':
          rotation = { x: 0, y: -90 };
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
      
      cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      document.querySelector(`.cube-nav button:nth-child(${buttonIndex})`)?.classList.add('active');
      currentFaceRef.current = face;
    };

    // Make rotateCube available globally for button clicks
    (window as any).rotateCube = rotateCube;
    
    return () => {
      delete (window as any).rotateCube;
    };
  }, []);

  const handleCubeRotate = (face: string) => {
    (window as any).rotateCube?.(face);
  };

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

      <section id="latest-updates" className="reveal">
        <div className="container">
          <h2 className="section-title">--| Latest Updates |--</h2>
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>
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
            </div>
            
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
      </section>

      <section id="introduction-expertise">
        <div className="container">
          <h2 className="introduction-heading">--| Core Expertise |--</h2>
          <ul className="introduction-expertise-grid">
            <li className="introduction-expertise-card">
              <div className="introduction-expertise-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Full-Stack Development</h3>
              <p className="introduction-expertise-description">Crafting robust web applications with modern technologies and best practices.</p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{width: '95%'}}></div>
                </div>
                <span className="introduction-expertise-level">Advanced</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>HTML5/CSS3</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Node.js</span>
              </div>
            </li>

            <li className="introduction-expertise-card">
              <div className="introduction-expertise-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Integration</h3>
              <p className="introduction-expertise-description">Implementing cutting-edge AI solutions for real-world applications.</p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{width: '90%'}}></div>
                </div>
                <span className="introduction-expertise-level">Advanced</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>ChatGPT</span>
                <span>Claude</span>
                <span>ML</span>
                <span>API</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="galleries" className="reveal">
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