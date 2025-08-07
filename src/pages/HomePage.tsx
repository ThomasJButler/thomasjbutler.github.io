import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useScrollAnimation, useHoverAnimation } from '../hooks/useMatrixAnimation';
import { matrixAnimations } from '../utils/animations/matrixAnimations';

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLUListElement>(null);
  const updatesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      const heading = heroRef.current.querySelector('h2');
      const paragraphs = heroRef.current.querySelectorAll('p');
      const images = heroRef.current.querySelectorAll('.introduction-img img');

      // Typewriter effect for main heading
      if (heading) {
        matrixAnimations.typewriter(heading, "Hey, I'm Tom.");
      }

      // Stagger paragraphs
      animate(paragraphs, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(200, { start: 1000 }),
        duration: 800,
        ease: 'outQuad'
      });

      // Image animations
      animate(images, {
        opacity: [0, 1],
        scale: [0.8, 1],
        rotateY: [45, 0],
        delay: stagger(100, { start: 1500 }),
        duration: 1000,
        ease: 'outExpo'
      });
    }

    // Expertise cards animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.introduction-expertise-card');
          
          animate(cards, {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            delay: stagger(100),
            duration: 800,
            ease: 'outQuad'
          });

          // Animate progress bars
          cards.forEach((card, index) => {
            const progressBar = card.querySelector('.introduction-expertise-progress');
            if (progressBar) {
              const width = progressBar.style.width;
              progressBar.style.width = '0%';
              
              animate(progressBar, {
                width: width,
                delay: 200 + (index * 100),
                duration: 1000,
                ease: 'outExpo'
              });
            }
          });

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (expertiseRef.current) observer.observe(expertiseRef.current);
    if (updatesRef.current) observer.observe(updatesRef.current);

    return () => observer.disconnect();
  }, []);

  // Handle card hover
  const handleCardHover = (e: React.MouseEvent<HTMLLIElement>) => {
    animate(e.currentTarget, {
      translateY: -10,
      boxShadow: '0 20px 40px rgba(0, 255, 0, 0.3)',
      duration: 300,
      ease: 'outQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    animate(e.currentTarget, {
      translateY: 0,
      boxShadow: '0 5px 15px rgba(0, 255, 0, 0.1)',
      duration: 300,
      ease: 'outQuad'
    });
  };

  return (
    <>
      <section id="introduction" ref={heroRef}>
        <div className="container">
          <h2></h2>
          <br />
          <h2>A Web Developer and Designer from Liverpool, England, UK</h2>
          <p className="scrolling-text">
            With a passion for cutting-edge technology and creative problem-solving, 
            I'm here to help transform your digital visions into reality.
          </p>
          <h2 className="introduction-h2">
            My expertise spans web development, AI integration, and innovative design solutions.
          </h2>
          <div className="introduction-img">
            <img 
              src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693667/CreateAiModel_oufvro.png" 
              alt="AiTomatic Create a Model" 
            />
            <img 
              src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693678/MatrixArcade2_eg34bs.png" 
              alt="The Matrix Arcade" 
            />
            <img 
              src="https://res.cloudinary.com/depqttzlt/image/upload/v1737693677/Usage_Patterns_iw5j6a.png" 
              alt="AiTomatic Usage Pattern" 
            />
          </div>
          <div className="galleries-mobile">
            <a href="#galleries" className="galleries-link-mobile">
              View Galleries
              <i className="fas fa-images"></i>
            </a>
          </div>
          <p>Please explore my portfolio to see how I blend technical skill with artistic vision.</p>
        </div>
      </section>

      <section id="introduction-expertise">
        <div className="container">
          <h2 className="introduction-heading">--| Core Expertise |--</h2>
          <ul className="introduction-expertise-grid" ref={expertiseRef}>
            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Full-Stack Development</h3>
              <p className="introduction-expertise-description">
                Crafting robust web applications with modern technologies and best practices.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '95%' }}></div>
                </div>
                <span className="introduction-expertise-level">Advanced</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>HTML5/CSS3</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Node.js</span>
                <span>C#/.NET</span>
                <span>Tailwind</span>
                <span>HubSpot/HUBL</span>
                <span>WordPress/PHP</span>
                <span>IOS/Web Apps</span>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Integration</h3>
              <p className="introduction-expertise-description">
                Implementing cutting-edge AI solutions for real-world applications.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '90%' }}></div>
                </div>
                <span className="introduction-expertise-level">Advanced</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>ChatGPT</span>
                <span>Claude</span>
                <span>Midjourney</span>
                <span>GPT Creation</span>
                <span>Chatbots</span>
                <span>ML</span>
                <span>AI LLM Models</span>
                <span>AI Solutions</span>
                <span>API</span>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3>UI/UX Design</h3>
              <p className="introduction-expertise-description">
                Creating intuitive and engaging user experiences with modern design principles.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '85%' }}></div>
                </div>
                <span className="introduction-expertise-level">Proficient</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>Figma</span>
                <span>Adobe XD</span>
                <span>Mobile First</span>
                <span>Wireframes</span>
                <span>Galileo</span>
                <span>Pen & Paper</span>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fab fa-python"></i>
              </div>
              <h3>Python Development</h3>
              <p className="introduction-expertise-description">
                Building efficient and scalable solutions with Python expertise.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '92%' }}></div>
                </div>
                <span className="introduction-expertise-level">Advanced</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>Django</span>
                <span>Flask</span>
                <span>Data Analysis</span>
                <span>PyGame</span>
                <span>PyScript</span>
                <span>Anaconda</span>
                <span>TensorFlow</span>
                <span>PyTorch</span>
                <span>MatPlotLib</span>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Database Management</h3>
              <p className="introduction-expertise-description">
                Optimising data structures and managing complex database systems.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '88%' }}></div>
                </div>
                <span className="introduction-expertise-level">Proficient</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>Oracle</span>
                <span>Supabase</span>
                <span>Excel</span>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <i className="fas fa-server"></i>
              </div>
              <h3>Cloud Computing</h3>
              <p className="introduction-expertise-description">
                Deploying and managing scalable cloud infrastructure solutions.
              </p>
              <div className="introduction-expertise-details">
                <div className="introduction-expertise-bar">
                  <div className="introduction-expertise-progress" style={{ width: '85%' }}></div>
                </div>
                <span className="introduction-expertise-level">Proficient</span>
              </div>
              <div className="introduction-expertise-tags">
                <span>AWS</span>
                <span>Azure</span>
                <span>Docker</span>
                <span>IIS</span>
                <span>Cisco</span>
                <span>Bamboo</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="latest-updates" className="reveal">
        <div className="container">
          <h2 className="section-title">Latest Updates</h2>
          <ul className="introduction-expertise-grid" ref={updatesRef}>
            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <img 
                  src="https://res.cloudinary.com/depqttzlt/image/upload/v1737668117/aitomatic_i26sol.png" 
                  alt="AiTomatic Preview" 
                />
              </div>
              <h3>AiTomatic (Prototype)</h3>
              <p className="introduction-expertise-description">
                This is an AI Model Creator platform with next level features. The prototype is built with 
                Typescript, Python, React. It's showcasing the dashboard elements and model comparison / 
                creation features. I am currently working on this.
              </p>
              <div className="introduction-expertise-buttons">
                <a 
                  href="https://aitomatic.co.uk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="neo-matrix-btn"
                  onMouseEnter={(e) => matrixAnimations.pulse(e.currentTarget)}
                >
                  <span className="btn-text">Enter AiTomatic</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <img 
                  src="https://res.cloudinary.com/depqttzlt/image/upload/v1737668751/matrix-arcade_slxkuw.png" 
                  alt="Web Projects Preview" 
                />
              </div>
              <h3>The Matrix Arcade</h3>
              <p className="introduction-expertise-description">
                This is an arcade website I built using Vite, Python and React to showcase playable mini 
                games created during my learning journey. I plan to continue to add to this over time and 
                update the functionality.
              </p>
              <div className="introduction-expertise-buttons">
                <a 
                  href="https://www.tomatic.tech/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="neo-matrix-btn"
                  onMouseEnter={(e) => matrixAnimations.pulse(e.currentTarget)}
                >
                  <span className="btn-text">Enter The Arcade</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </li>

            <li 
              className="introduction-expertise-card"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="introduction-expertise-icon">
                <img 
                  src="https://res.cloudinary.com/depqttzlt/image/upload/v1737668231/landingpagedesktop_ssozki.png" 
                  alt="Python Projects Preview" 
                />
              </div>
              <h3>Landing Page</h3>
              <p className="introduction-expertise-description">
                A modern, responsive landing page showcasing clean design principles and smooth user experience.
              </p>
              <div className="introduction-expertise-buttons">
                <a 
                  href="/landingpage" 
                  className="neo-matrix-btn"
                  onMouseEnter={(e) => matrixAnimations.pulse(e.currentTarget)}
                >
                  <span className="btn-text">View Landing Page</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};