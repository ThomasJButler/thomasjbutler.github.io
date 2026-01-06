/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Services page showcasing web development, backend, AI, mobile, design,
 *              and consultancy offerings with expandable tech stack categories
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import '../css/pages/services.css';

const professionalCertifications = [
  {
    icon: "fab fa-aws",
    name: "AWS Qualified",
    detail: "Cloud Architecture & Serverless",
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
    detail: "Network Security & Analytics",
    glowClass: "cisco-glow"
  },
  {
    icon: "fas fa-robot",
    name: "ML & LLM Bootcamp",
    detail: "CodeCademy Certificate",
    glowClass: "ai-glow"
  },
  {
    icon: "fas fa-code",
    name: "Full Stack Engineer",
    detail: "CodeCademy Certificate",
    glowClass: "code-glow"
  },
  {
    icon: "fas fa-graduation-cap",
    name: "Level 4 Software Dev",
    detail: "Estio Apprenticeship",
    glowClass: "primary-glow"
  }
];

const processSteps = [
  {
    icon: "fas fa-comments",
    title: "1. Discovery Call",
    description: "Free consultation to understand your goals, timeline, and requirements."
  },
  {
    icon: "fas fa-file-invoice",
    title: "2. Detailed Quote",
    description: "Clear, itemised proposal with no hidden costs or surprises."
  },
  {
    icon: "fas fa-rocket",
    title: "3. Build & Deliver",
    description: "Agile development with regular updates and milestone reviews."
  },
  {
    icon: "fas fa-headset",
    title: "4. Ongoing Support",
    description: "Post-launch support, maintenance, and future enhancements."
  }
];

/**
 * Services showcase page with expandable service cards and tech stack
 * @return {JSX.Element}
 * @constructor
 */
export const ServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useCardAnimations();

  const services = [
    {
      title: "Website & Web Apps",
      icon: "fas fa-code",
      description: "Responsive, performance-first websites and web apps built with modern stacks.",
      highlights: [
        { icon: "fab fa-react", text: "React / Next.js" },
        { icon: "fas fa-bolt", text: "Performance & SEO" },
        { icon: "fas fa-universal-access", text: "Accessible & Responsive" }
      ],
      tech: ["TypeScript", "Tailwind", "SASS"]
    },
    {
      title: "Backend & APIs",
      icon: "fas fa-server",
      description: "Robust servers and APIs that scale with your product. Production-ready from day one.",
      highlights: [
        { icon: "fab fa-node-js", text: "Node.js / Python" },
        { icon: "fas fa-database", text: "PostgreSQL / MongoDB" },
        { icon: "fas fa-shield-alt", text: "Auth & Security" }
      ],
      tech: ["Express", "Django", "Redis", "REST"]
    },
    {
      title: "AI & Automation",
      icon: "fas fa-robot",
      description: "Practical AI features and automation to save time and make data useful.",
      highlights: [
        { icon: "fas fa-brain", text: "GPT Integration" },
        { icon: "fas fa-cogs", text: "n8n Workflows" },
        { icon: "fas fa-project-diagram", text: "Custom ML Models" }
      ],
      tech: ["ChatGPT", "Claude", "TensorFlow", "LangChain"]
    },
    {
      title: "Mobile Applications",
      icon: "fas fa-mobile-alt",
      description: "Cross-platform apps with native feel and store readiness.",
      highlights: [
        { icon: "fab fa-react", text: "React Native" },
        { icon: "fab fa-apple", text: "iOS & Android" },
        { icon: "fas fa-bell", text: "Push & Offline" }
      ],
      tech: ["Expo", "Native APIs", "App Store"]
    },
    {
      title: "Design & Brand",
      icon: "fas fa-palette",
      description: "Clear, usable interfaces and identity design that scales with your product.",
      highlights: [
        { icon: "fas fa-pencil-ruler", text: "UI/UX Design" },
        { icon: "fas fa-shapes", text: "Brand Identity" },
        { icon: "fas fa-layer-group", text: "Design Systems" }
      ],
      tech: ["Figma", "Logo", "Style Guides"]
    },
    {
      title: "Consultancy & Custom",
      icon: "fas fa-handshake",
      description: "Architecture reviews, training and bespoke engineering for special requirements.",
      highlights: [
        { icon: "fas fa-sitemap", text: "Architecture Review" },
        { icon: "fas fa-chalkboard-teacher", text: "Team Training" },
        { icon: "fas fa-puzzle-piece", text: "Bespoke Solutions" }
      ],
      tech: ["API Dev", "Integration", "Support"]
    }
  ];

  /**
   * @constructs Scrolls page to top on mount
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  /**
   * @constructs Initialises title text and triggers staggered card animations
   */
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = 'WEB, MOBILE, AND AI';
    }

    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll('.service-card');
      matrixAnimations.staggerIn(Array.from(cards) as HTMLElement[], 100);
    }
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.service-icon') as HTMLElement;
    if (icon) {
      icon.style.transform = 'rotateY(360deg)';
      setTimeout(() => {
        icon.style.transform = 'rotateY(0deg)';
      }, 600);
    }
  };

  return (
    <div className="page-wrapper page-services">
      <section id="services" className="servicesSection">
      <div className="container">
        <h2 ref={titleRef} className="section-title"></h2>
        <p className="servicesIntro">
          I build fast, resilient digital products and systems. From performance-first websites to production AI integrations and mobile apps, I handle the architecture, delivery and support so you can focus on outcomes.
        </p>

        <div ref={servicesRef} className="servicesGrid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card serviceCard"
              onMouseEnter={handleCardHover}
            >
              <div className="serviceHeader">
                <i
                  className={`${service.icon} service-icon serviceIcon`}
                  aria-hidden="true"
                ></i>
                <h3 className="serviceTitle">{service.title}</h3>
              </div>

              <p className="serviceDescription">{service.description}</p>

              <ul className="serviceHighlights">
                {service.highlights.map((highlight, idx) => (
                  <li key={idx} className="highlightItem">
                    <i className={highlight.icon} aria-hidden="true"></i>
                    <span>{highlight.text}</span>
                  </li>
                ))}
              </ul>

              <div className="serviceTechTags">
                {service.tech.map((tech, idx) => (
                  <span key={idx} className="techTag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Certifications Section */}
        <div className="certifications-section">
          <h3 className="certifications-title">
            <span className="tier-glyph">▣</span>
            Professional Certifications
            <span className="tier-glyph">▣</span>
          </h3>
          <div className="certifications-grid">
            {professionalCertifications.map((cert, index) => (
              <div key={index} className={`cert-card ${cert.glowClass}`}>
                <i className={cert.icon} aria-hidden="true"></i>
                <div className="cert-info">
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-detail">{cert.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="process-section">
          <h3 className="process-title">How We Work Together</h3>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-icon">
                  <i className={step.icon} aria-hidden="true"></i>
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="value-section">
          <div className="value-card">
            <i className="fas fa-pound-sign" aria-hidden="true"></i>
            <div className="value-content">
              <h4>Competitive Pricing, Effective Results</h4>
              <p>Quality work doesn't have to break the bank. I offer transparent, competitive rates with a focus on delivering measurable outcomes for your business.</p>
            </div>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="ctaSection ctaSection-enhanced">
          <h3>Ready to start your project?</h3>
          <p className="cta-subtitle">Let's discuss your requirements and build something great together.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="ctaButton ctaButton-primary">
              Get A Free Quote
              <i className="fas fa-arrow-right icon-margin-left"></i>
            </Link>
            <a href="mailto:hello@thomasjbutler.co.uk" className="ctaButton ctaButton-secondary">
              Email Me Directly
              <i className="fas fa-envelope icon-margin-left"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
