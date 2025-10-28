/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description About page showcasing programming journey, qualifications,
 *              certifications, and expandable content sections
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css';

/**
 * About page component with expandable content and certification showcase
 * @return {JSX.Element}
 * @constructor
 */
export const AboutPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * @constructs Scrolls page to top on mount
   */
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="page-wrapper page-about">
      {/* SECTION 1: Why I Love Programming - NOW FIRST */}
      <section id="why-love-programming" className="about-section">
        <div className="container">
          <h2 className="section-title">Why I Love Programming</h2>
          <div className="story-content">
            <blockquote className="highlight-text">
              Programming is not just a profession for me, it's a passion.
              <br /> <br />
              I love the ability to create something from absolutely nothing, to continuously learn and innovate, this drives me every day to improve.
            </blockquote>

            {/* Read More button - shows when collapsed */}
            {!isExpanded && (
              <button
                className="read-more-toggle"
                onClick={toggleReadMore}
                aria-expanded={isExpanded}
                aria-label="Show more content"
              >
                Read More
                <i className="fas fa-chevron-down"></i>
              </button>
            )}

            {/* Expanded content with conditional Read Less buttons */}
            {isExpanded && (
              <div className="expanded-content">
                {/* Mobile Read Less button (at top) */}
                <button
                  className="read-more-toggle mobile-read-less"
                  onClick={toggleReadMore}
                  aria-expanded={isExpanded}
                  aria-label="Show less content"
                >
                  Read Less
                  <i className="fas fa-chevron-up"></i>
                </button>

                <blockquote className="highlight-text">
                  From a young age, I was always fascinated by technology and how things worked. This curiosity led me to explore various programming languages and frameworks. I quickly realised that programming was the perfect outlet for my creativity and problem solving skills.
                  <br /> <br />
                  Over the years, I have continued learning, fine tuned my skills and tried to stay on top of industry changes. I have gained experience in many different areas of software development, from networking, full-stack web development and cloud services, to AI and machine learning.
                  <br /> <br />
                  I love the challenge of tackling complex problems and finding innovative solutions. Whether it's building a web application, developing an AI model, or creating a mobile app, I am always excited to take on new projects and push the endless boundaries of what is possible.
                </blockquote>

                {/* Desktop Read Less button (at bottom, centered) */}
                <button
                  className="read-more-toggle desktop-read-less"
                  onClick={toggleReadMore}
                  aria-expanded={isExpanded}
                  aria-label="Show less content"
                >
                  Read Less
                  <i className="fas fa-chevron-up"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: My Programming Journey - with Timeline Button at Bottom */}
      <section id="programming-journey" className="about-section">
        <div className="container">
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

          {/* EPIC TIMELINE BUTTON - AT BOTTOM OF JOURNEY SECTION */}
          <div className="timeline-cta-section">
            <Link to="/updates" className="epic-timeline-button">
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

      {/* SECTION 3: Qualifications & Certifications - NOW THIRD */}
      <section id="continuous-learning" className="about-section qualifications-section">
        <div className="container">
          <h2 className="section-title">Qualifications & Certifications</h2>
          <div className="learning-content">
            <p className="highlight-text">
              I believe in staying current with technology trends and continuously expanding my knowledge base.
            </p>

            {/* Matrix Timeline */}
            <div className="matrix-timeline">
              <div className="timeline-line"></div>

              {/* Primary Tier - Major Certifications */}
              <div className="qualifications-tier primary-tier">
                <h3 className="tier-title">
                  <span className="tier-glyph">◉</span>
                  Primary Qualifications
                  <span className="tier-glyph">◉</span>
                </h3>

                <div className="certification-matrix-grid">
                  <div className="matrix-cert-item primary">
                    <div className="cert-icon">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <span className="cert-name">Estio Level 4 Software Developer</span>
                    <span className="cert-detail">Advanced Full-Stack Development • Completed 2024</span>
                    <div className="achievement-glow primary-glow"></div>
                  </div>

                  <div className="matrix-cert-item primary">
                    <div className="cert-icon">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <span className="cert-name">City & Guilds Level 2 ICT Systems Support</span>
                    <span className="cert-detail">Infrastructure Management • July 2025</span>
                    <a href="https://digitalcredentials.cityandguilds.com/46a4d6de-63e8-4e80-9949-50e4ed5b91c4#acc.pzMH8SWw"
                       target="_blank"
                       rel="noopener"
                       className="verify-link">
                      Verify Credential →
                    </a>
                    <div className="achievement-glow verify-glow"></div>
                  </div>

                  <div className="matrix-cert-item primary">
                    <div className="cert-icon">
                      <i className="fas fa-robot"></i>
                    </div>
                    <span className="cert-name">Machine Learning & LLM Bootcamp</span>
                    <span className="cert-detail">CodeCademy Certificate • September 2025</span>
                    <a href="https://www.codecademy.com/bootcamps/ai-1/certificates/61bbd81425580b633fee49f6"
                       target="_blank"
                       rel="noopener"
                       className="verify-link">
                      Verify Credential →
                    </a>
                    <div className="achievement-glow ai-glow"></div>
                  </div>

                  <div className="matrix-cert-item primary">
                    <div className="cert-icon">
                      <i className="fas fa-database"></i>
                    </div>
                    <span className="cert-name">Cisco Data Science Introduction</span>
                    <span className="cert-detail">Data Analytics & AI/ML • April 2023</span>
                    <a href="https://www.credly.com/badges/4167931a-2128-4e5a-b6a8-c2c0493325f6/linked_in_profile"
                       target="_blank"
                       rel="noopener"
                       className="verify-link">
                      Verify Credential →
                    </a>
                    <div className="achievement-glow cisco-glow"></div>
                  </div>
                </div>
              </div>

              {/* Secondary Tier - Additional Certifications */}
              <div className="qualifications-tier secondary-tier">
                <h3 className="tier-title">
                  <span className="tier-glyph">▣</span>
                  Professional Certifications
                  <span className="tier-glyph">▣</span>
                </h3>

                <div className="certification-matrix-grid">
                  <div className="matrix-cert-item cloud">
                    <div className="cert-icon">
                      <i className="fab fa-aws"></i>
                    </div>
                    <span className="cert-name">AWS Qualified</span>
                    <span className="cert-detail">Cloud Architecture & Serverless Computing</span>
                    <div className="achievement-glow aws-glow"></div>
                  </div>

                  <div className="matrix-cert-item cloud">
                    <div className="cert-icon">
                      <i className="fab fa-microsoft"></i>
                    </div>
                    <span className="cert-name">Azure Qualified</span>
                    <span className="cert-detail">Cloud Infrastructure & DevOps</span>
                    <div className="achievement-glow azure-glow"></div>
                  </div>

                  <div className="matrix-cert-item network">
                    <div className="cert-icon">
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <span className="cert-name">Cisco Qualified</span>
                    <span className="cert-detail">Network Security & Data Analytics</span>
                    <div className="achievement-glow cisco-glow"></div>
                  </div>

                  <div className="matrix-cert-item cms">
                    <div className="cert-icon">
                      <i className="fas fa-hubspot"></i>
                    </div>
                    <span className="cert-name">HubSpot Qualified</span>
                    <span className="cert-detail">CMS Development & Integration</span>
                    <div className="achievement-glow hubspot-glow"></div>
                  </div>

                  <div className="matrix-cert-item dev">
                    <div className="cert-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <span className="cert-name">Full Stack Engineer</span>
                    <span className="cert-detail">CodeCademy Certificate</span>
                    <div className="achievement-glow code-glow"></div>
                  </div>

                  <div className="matrix-cert-item data">
                    <div className="cert-icon">
                      <i className="fab fa-python"></i>
                    </div>
                    <span className="cert-name">Data Analysis with Python</span>
                    <span className="cert-detail">Free Code Camp</span>
                    <div className="achievement-glow python-glow"></div>
                  </div>
                </div>
              </div>

              {/* External Link */}
              <div className="external-portfolio-link">
                <a href="https://www.thomasjbutler.me/#education"
                   target="_blank"
                   rel="noopener"
                   className="matrix-portal-btn">
                  <div className="portal-ring"></div>
                  <div className="portal-content">
                    <span className="portal-text">ACCESS FULL EDUCATION MATRIX</span>
                    <i className="fas fa-external-link-alt"></i>
                  </div>
                  <div className="portal-particles"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
