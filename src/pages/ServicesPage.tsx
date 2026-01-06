/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Services page showcasing web development, backend, AI, mobile, design,
 *              and consultancy offerings with expandable tech stack categories
 */

import React, { useEffect, useRef, useState } from 'react';
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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(
    () => window.innerWidth < 768 ? new Set([0]) : new Set()
  );

  useCardAnimations();

  const services = [
    {
      title: "Website & Web Apps",
      icon: "fas fa-code",
      description: "Responsive, performance-first websites and web apps built with modern stacks.",
      features: [
        { main: "React / Next.js", sub: ["TypeScript", "Tailwind", "SASS"] },
        { main: "Performance optimization", sub: ["SEO ready"] },
        { main: "Accessibility & responsive design", sub: [] }
      ],
      color: "#00ff00"
    },
    {
      title: "Backend & APIs",
      icon: "fas fa-server",
      description: "Robust servers and APIs that scale with your product. Production-ready architecture from day one.",
      features: [
        { main: "Node.js / Express", sub: ["Python / Django", "RESTful APIs"] },
        { main: "PostgreSQL", sub: ["MongoDB", "Redis", "Database optimization"] },
        { main: "Microservices", sub: ["System integration", "Authentication & security"] }
      ],
      color: "#00cc00"
    },
    {
      title: "AI & Automation",
      icon: "fas fa-robot",
      description: "Practical AI features and automation to save time and make data useful.",
      features: [
        { main: "ChatGPT integration", sub: ["n8n automation workflows"] },
        { main: "Custom GPT models", sub: ["NLP", "Computer vision"] },
        { main: "TensorFlow / PyTorch", sub: ["Data processing"] }
      ],
      color: "#00ff00"
    },
    {
      title: "Mobile Applications",
      icon: "fas fa-mobile-alt",
      description: "Cross-platform apps with native feel and store readiness. Built for iOS and Android.",
      features: [
        { main: "React Native", sub: ["iOS & Android", "Cross-platform"] },
        { main: "Push notifications", sub: ["Offline functionality", "Analytics"] },
        { main: "Native performance", sub: ["App store submission & compliance"] }
      ],
      color: "#00cc00"
    },
    {
      title: "Design & Brand",
      icon: "fas fa-palette",
      description: "Clear, usable interfaces and identity design that scales with your product.",
      features: [
        { main: "UI/UX design", sub: ["Brand identity", "Design systems"] },
        { main: "Logo design", sub: ["Component libraries", "Responsive mockups"] },
        { main: "Marketing assets", sub: ["Brand guidelines documentation"] }
      ],
      color: "#00ff00"
    },
    {
      title: "Consultancy & Custom",
      icon: "fas fa-handshake",
      description: "Architecture reviews, training and bespoke engineering for special requirements.",
      features: [
        { main: "Architecture review", sub: ["Team training"] },
        { main: "API development", sub: ["Bespoke solutions"] },
        { main: "System integration", sub: ["Support"] }
      ],
      color: "#00cc00"
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

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      const isCurrentlyExpanded = newSet.has(index);

      if (window.innerWidth >= 768) {
        const cardsPerRow = 3;
        const rowStart = Math.floor(index / cardsPerRow) * cardsPerRow;
        const rowEnd = rowStart + cardsPerRow;

        if (isCurrentlyExpanded) {
          for (let i = rowStart; i < rowEnd && i < services.length; i++) {
            newSet.delete(i);
          }
        } else {
          for (let i = rowStart; i < rowEnd && i < services.length; i++) {
            newSet.add(i);
          }
        }
      } else {
        if (isCurrentlyExpanded) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
      }

      return newSet;
    });
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
          {services.map((service, index) => {
            const isExpanded = expandedCards.has(index);
            return (
              <div
                key={index}
                className={`service-card serviceCard ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={handleCardHover}
                style={{ '--card-color': service.color } as React.CSSProperties}
              >
                <div className="serviceHeader">
                  <i
                    className={`${service.icon} service-icon serviceIcon`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="serviceTitle">{service.title}</h3>
                </div>

                <p className="serviceDescription">{service.description}</p>

                <ul className={`serviceFeatures ${isExpanded ? 'show' : ''}`}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="featureItem">
                      <div className="featureMain">
                        <span className="featureBullet">▸</span>
                        <span>{feature.main}</span>
                      </div>
                      {feature.sub.length > 0 && (
                        <ul className="featureSub">
                          {feature.sub.map((subItem, subIdx) => (
                            <li key={subIdx}>{subItem}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  className="expandButton"
                  onClick={() => toggleCard(index)}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Show less" : "Show more"}
                >
                  {isExpanded ? (
                    <>
                      Show Less <i className="fas fa-chevron-up"></i>
                    </>
                  ) : (
                    <>
                      View Details <i className="fas fa-chevron-down"></i>
                    </>
                  )}
                </button>
              </div>
            );
          })}
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
