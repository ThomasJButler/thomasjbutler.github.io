/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description About page showcasing programming journey, qualifications,
 *              certifications, and expandable content sections
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css';

const certifications = [
  {
    icon: "fas fa-graduation-cap",
    name: "Estio Level 4 Software Developer",
    detail: "Advanced Full-Stack Development • Completed 2024",
    glowClass: "primary-glow"
  },
  {
    icon: "fas fa-certificate",
    name: "City & Guilds Level 2 ICT Systems Support",
    detail: "Infrastructure Management • July 2025",
    verifyLink: "https://digitalcredentials.cityandguilds.com/46a4d6de-63e8-4e80-9949-50e4ed5b91c4#acc.pzMH8SWw",
    glowClass: "verify-glow"
  },
  {
    icon: "fas fa-robot",
    name: "Machine Learning & LLM Bootcamp",
    detail: "CodeCademy Certificate • September 2025",
    verifyLink: "https://www.codecademy.com/bootcamps/ai-1/certificates/61bbd81425580b633fee49f6",
    glowClass: "ai-glow"
  },
  {
    icon: "fas fa-database",
    name: "Cisco Data Science Introduction",
    detail: "Data Analytics & AI/ML • April 2023",
    verifyLink: "https://www.credly.com/badges/4167931a-2128-4e5a-b6a8-c2c0493325f6/linked_in_profile",
    glowClass: "cisco-glow"
  },
  {
    icon: "fab fa-aws",
    name: "AWS Qualified",
    detail: "Cloud Architecture & Serverless Computing",
    glowClass: "aws-glow"
  },
  {
    icon: "fab fa-microsoft",
    name: "Azure Qualified",
    detail: "Cloud Infrastructure & DevOps",
    glowClass: "azure-glow"
  },
  {
    icon: "fas fa-network-wired",
    name: "Cisco Qualified",
    detail: "Network Security & Data Analytics",
    glowClass: "cisco-glow"
  },
  {
    icon: "fas fa-hubspot",
    name: "HubSpot Qualified",
    detail: "CMS Development & Integration",
    glowClass: "hubspot-glow"
  },
  {
    icon: "fas fa-code",
    name: "Full Stack Engineer",
    detail: "CodeCademy Certificate",
    glowClass: "code-glow"
  },
  {
    icon: "fab fa-python",
    name: "Data Analysis with Python",
    detail: "Free Code Camp",
    glowClass: "python-glow"
  }
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
              Programming is not just a profession for me, it's a passion. I love creating something from nothing and continuously learning to push the boundaries of what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Matrix Rain Divider */}
      <div className="services-matrix-divider" aria-hidden="true"></div>

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

      {/* Matrix Rain Divider */}
      <div className="services-matrix-divider" aria-hidden="true"></div>

      {/* SECTION 3: Qualifications & Certifications */}
      <section id="continuous-learning" className="about-section qualifications-section">
        <div className="container">
          <h2 className="section-title">Qualifications & Certifications</h2>
          <p className="servicesIntro">
            I believe in staying current with technology trends and continuously expanding my knowledge base.
          </p>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className={`cert-card ${cert.glowClass}`}>
                <i className={cert.icon} aria-hidden="true"></i>
                <div className="cert-info">
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-detail">{cert.detail}</span>
                  {cert.verifyLink && (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="verify-link-simple"
                    >
                      Verify →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
