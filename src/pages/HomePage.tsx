import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize cube rotation
    const script = document.createElement('script');
    script.innerHTML = `
      const cube = document.getElementById('cube');
      if (cube) {
        let currentRotation = { x: 0, y: 0 };
        window.rotateCube = function(face) {
          document.querySelectorAll('.cube-nav button').forEach(btn => {
            btn.classList.remove('active');
          });
          
          switch(face) {
            case 'front':
              currentRotation = { x: 0, y: 0 };
              document.querySelector('.cube-nav button:nth-child(1)')?.classList.add('active');
              break;
            case 'right':
              currentRotation = { x: 0, y: 90 };
              document.querySelector('.cube-nav button:nth-child(2)')?.classList.add('active');
              break;
            case 'back':
              currentRotation = { x: 0, y: 180 };
              document.querySelector('.cube-nav button:nth-child(3)')?.classList.add('active');
              break;
            case 'left':
              currentRotation = { x: 0, y: -90 };
              document.querySelector('.cube-nav button:nth-child(4)')?.classList.add('active');
              break;
            case 'top':
              currentRotation = { x: -90, y: 0 };
              document.querySelector('.cube-nav button:nth-child(5)')?.classList.add('active');
              break;
            case 'bottom':
              currentRotation = { x: 90, y: 0 };
              document.querySelector('.cube-nav button:nth-child(6)')?.classList.add('active');
              break;
          }
          
          cube.style.transform = \`rotateX(\${currentRotation.x}deg) rotateY(\${currentRotation.y}deg)\`;
        };
      }
    `;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
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
            <div className="cube-container" id="cube">
              {/* Cube faces - using dangerouslySetInnerHTML for complex HTML */}
              <div className="cube-face front" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754214153/commercialv20_rus9qz.png" alt="Commercial Portfolio Preview">
                  </div>
                  <h3>Commercial Portfolio v2.0</h3>
                  <p class="cube-project-description">Complete site revamp to V2.0 showcasing all commercial work, with Notion integration for dynamic content management.</p>
                  <div class="cube-project-tags">
                    <span>Portfolio</span>
                    <span>Notion API</span>
                    <span>CMS</span>
                  </div>
                  <div class="cube-project-buttons">
                    <a href="https://thomasjbutler.me" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">Website</span>
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              `}} />
              
              {/* Add other cube faces similarly */}
              <div className="cube-face right" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754541799/v30_sesrmp.png" alt="React Migration Preview">
                  </div>
                  <h3>Portfolio v3.0 - React Migration</h3>
                  <p class="cube-project-description">Complete migration to React 19 with TypeScript, Vite 7, and Anime.js v4.</p>
                  <div class="cube-project-tags">
                    <span>React 19</span>
                    <span>TypeScript</span>
                    <span>Vite 7</span>
                  </div>
                </div>
              `}} />
              
              <div className="cube-face back" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754529216/aicomparison_xoherd.png" alt="AiTomatic Preview">
                  </div>
                  <h3>AI Model Comparison Tool</h3>
                  <p class="cube-project-description">Part of AiTomatic Suite - Compare and evaluate different AI models side-by-side. Features real-time testing, performance metrics, and model recommendations.</p>
                  <div class="cube-project-tags">
                    <span>AI/ML</span>
                    <span>Python</span>
                    <span>APIs</span>
                    <span>Analytics</span>
                    <span>Dashboard</span>
                  </div>
                  <div class="cube-project-buttons">
                    <a href="https://ai-comparison-showcase.vercel.app/" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">Website</span>
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="https://github.com/ThomasJButler/AI-Comparison-Showcase-" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">GitHub</span>
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              `}} />
              
              <div className="cube-face left" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/matrixarcade_xofygu.png" alt="Matrix Arcade Preview">
                  </div>
                  <h3>The Matrix Arcade</h3>
                  <p class="cube-project-description">An arcade website built using Vite, Python, and React to showcase playable mini-games created during my learning journey.</p>
                  <div class="cube-project-tags">
                    <span>React</span>
                    <span>Python</span>
                    <span>Vite</span>
                    <span>Canvas API</span>
                    <span>Game Dev</span>
                  </div>
                  <div class="cube-project-buttons">
                    <a href="https://www.tomatic.tech/" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">Website</span>
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="https://github.com/ThomasJButler/The-Matrix-Arcade" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">GitHub</span>
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              `}} />
              
              <div className="cube-face top" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754214157/cssshowcase_q25veb.png" alt="CSS Showcase Preview">
                  </div>
                  <h3>CSS Showcase</h3>
                  <p class="cube-project-description">Interactive showcase of advanced CSS techniques, animations, and creative web designs demonstrating modern CSS capabilities.</p>
                  <div class="cube-project-tags">
                    <span>CSS3</span>
                    <span>Animation</span>
                    <span>Grid</span>
                    <span>Flexbox</span>
                    <span>Creative</span>
                  </div>
                  <div class="cube-project-buttons">
                    <a href="https://thomasjbutler.github.io/css-showcase/" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">Website</span>
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="https://github.com/ThomasJButler/css-showcase" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">GitHub</span>
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              `}} />
              
              <div className="cube-face bottom" dangerouslySetInnerHTML={{__html: `
                <div class="cube-project">
                  <div class="cube-project-icon">
                    <img src="https://res.cloudinary.com/depqttzlt/image/upload/v1754214154/dotnetreactapp_qflyte.png" alt="Dotnet React Calculator">
                  </div>
                  <h3>Dotnet React Calculator</h3>
                  <p class="cube-project-description">Initially started as a code assessment, I continued developing this project to explore and master the ins and outs of .NET backend development and API customization alongside React frontend integration.</p>
                  <div class="cube-project-tags">
                    <span>.NET</span>
                    <span>React</span>
                    <span>C#</span>
                    <span>API</span>
                    <span>Full Stack</span>
                  </div>
                  <div class="cube-project-buttons">
                    <a href="https://dotnet-react-calendar.vercel.app/" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">View App</span>
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="https://github.com/ThomasJButler/Dotnet-React-Calendar" target="_blank" rel="noopener" class="neo-matrix-btn">
                      <span class="btn-text">GitHub</span>
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              `}} />
            </div>
            
            <div className="cube-nav">
              <button onClick={() => (window as any).rotateCube('front')} className="active">1</button>
              <button onClick={() => (window as any).rotateCube('right')}>2</button>
              <button onClick={() => (window as any).rotateCube('back')}>3</button>
              <button onClick={() => (window as any).rotateCube('left')}>4</button>
              <button onClick={() => (window as any).rotateCube('top')}>5</button>
              <button onClick={() => (window as any).rotateCube('bottom')}>6</button>
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

            {/* Add other expertise cards similarly */}
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