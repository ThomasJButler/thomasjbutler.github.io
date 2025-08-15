import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <>
      <section id="why-love-programming" className="about-section">
        <div className="container">
          <h2 className="section-title">Why I Love Programming</h2>
          <div className="story-content">
            <p className="highlight-text">
              Programming is not just a profession for me; it's a passion. The ability to create something from nothing, to solve complex problems, and to continuously learn and innovate drives me every day.
            </p>
            <p>
              From a young age, I was fascinated by technology and how it can be used to create amazing things. This curiosity led me to explore various programming languages and frameworks, and I quickly realized that programming was the perfect outlet for my creativity and problem-solving skills.
            </p>
            <p>
              Over the years, I have honed my skills and gained experience in different areas of software development. I love the challenge of tackling complex problems and finding innovative solutions. Whether it's building a web application, developing an AI model, or creating a mobile app, I am always excited to take on new projects and push the boundaries of what is possible.
            </p>
          </div>
          <div className="programming-journey">
            <h2 className="section-title">My Programming Journey</h2>
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
            </div>
          </div>
        </div>
      </section>

      <section id="technical-expertise" className="about-section">
        <div className="container">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3>Frontend Development</h3>
              <ul className="expertise-list">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Modern CSS (Tailwind, SASS)</li>
                <li>Performance Optimization</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="expertise-card">
              <h3>Backend Development</h3>
              <ul className="expertise-list">
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>RESTful APIs</li>
                <li>Database Design</li>
                <li>Microservices</li>
              </ul>
            </div>
            <div className="expertise-card">
              <h3>AI & Machine Learning</h3>
              <ul className="expertise-list">
                <li>Natural Language Processing</li>
                <li>TensorFlow & PyTorch</li>
                <li>Custom GPT Models</li>
                <li>Computer Vision</li>
                <li>Data Analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="continuous-learning" className="about-section">
        <div className="container">
          <h2 className="section-title">Qualifications & Certifications</h2>
          <div className="learning-content">
            <p className="highlight-text">
              I believe in staying current with technology trends and continuously expanding my knowledge base.
            </p>
            
            <div className="qualifications-grid">
              <div className="qualification-card">
                <h3>Estio Level 4 Software Developer Apprenticeship</h3>
                <p className="qualification-date">Completed 2024</p>
                <p>Advanced software development training with real-world application</p>
              </div>
              
              <div className="qualification-card">
                <h3>City & Guilds Level 2 ICT Systems Support Diploma</h3>
                <p className="qualification-date">July 2025</p>
                <a href="https://digitalcredentials.cityandguilds.com/46a4d6de-63e8-4e80-9949-50e4ed5b91c4#acc.pzMH8SWw" 
                   target="_blank" 
                   rel="noopener"
                   className="verify-link">
                    Verify Credential →
                </a>
                <div className="badge-embed">
                  <img src="https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/155335744" 
                       alt="City & Guilds Certification Badge"
                       className="certification-badge" />
                </div>
              </div>
              
              <div className="qualification-card">
                <h3>CodeCademy Machine Learning and LLM Bootcamp</h3>
                <p className="qualification-date">Starting August 2025</p>
                <p>Mastering Generative AI and advanced machine learning techniques</p>
              </div>
            </div>
            
            <div className="additional-certifications">
              <h3>Additional Certifications & Training</h3>
              <ul className="certification-list">
                <li>
                  <i className="fas fa-check-circle"></i>
                  🏆 AWS Qualified - Cloud Architecture & Serverless Computing
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  🏆 Azure Qualified - Cloud Infrastructure & DevOps
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  🏆 Cisco Qualified - Network Security & Data Analytics
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  🏆 HubSpot Qualified - CMS Development & Integration
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  CodeCademy Full Stack Engineer Certificate
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Free Code Camp - Data Analysis With Python
                </li>
              </ul>
              <p style={{marginTop: '1.5rem'}}>
                <a href="https://www.thomasjbutler.me/#education" 
                   target="_blank" 
                   rel="noopener" 
                   className="neo-matrix-btn" 
                   style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>View Full Education & Certification Details</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog-cta" className="about-section">
        <div className="container">
          <div style={{textAlign: 'center', padding: '40px 0'}}>
            <h2 className="section-title">Explore My Thoughts on Tech</h2>
            <p className="highlight-text" style={{marginBottom: '30px'}}>
              Dive into my collection of articles on AI, development, and human-centered technology
            </p>
            <Link to="/blog" 
                  className="neo-matrix-btn" 
                  style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '15px 30px'}}>
              <i className="fas fa-book-open"></i>
              <span>Read My Blog</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            <p style={{marginTop: '20px', color: 'rgba(0, 255, 0, 0.7)'}}>
              20+ articles on making technology more human
            </p>
          </div>
        </div>
      </section>
    </>
  );
};