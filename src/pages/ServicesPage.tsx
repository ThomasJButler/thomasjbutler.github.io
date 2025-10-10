import React, { useEffect, useRef, useState } from 'react';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './ServicesPage.module.css';

export const ServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // Apply card animations
  useCardAnimations();

  const services = [
    {
      title: "Website & Web Apps",
      icon: "fas fa-code",
      description: "Responsive, performance-first websites and web apps built with modern stacks.",
      features: [
        "React / Next.js · TypeScript · Tailwind / SASS",
        "Performance optimization · SEO ready",
        "Accessibility & responsive design"
      ],
      color: "#00ff00"
    },
    {
      title: "Backend & APIs",
      icon: "fas fa-server",
      description: "Robust servers and APIs that scale with your product. Production-ready architecture from day one.",
      features: [
        "Node.js / Express · Python / Django · RESTful APIs",
        "PostgreSQL · MongoDB · Redis · Database optimization",
        "Microservices · System integration · Authentication & security"
      ],
      color: "#00cc00"
    },
    {
      title: "AI & Automation",
      icon: "fas fa-robot",
      description: "Practical AI features and automation to save time and make data useful.",
      features: [
        "ChatGPT integration · n8n automation workflows",
        "Custom GPT models · NLP · Computer vision",
        "TensorFlow / PyTorch · Data processing"
      ],
      color: "#00ff00"
    },
    {
      title: "Mobile Applications",
      icon: "fas fa-mobile-alt",
      description: "Cross-platform apps with native feel and store readiness.",
      features: [
        "React Native · Cross-platform",
        "Native performance",
        "App store submission"
      ],
      color: "#00cc00"
    },
    {
      title: "Design & Brand",
      icon: "fas fa-palette",
      description: "Clear, usable interfaces and identity design that scales with your product.",
      features: [
        "UI/UX · Brand identity",
        "Logo design",
        "Marketing assets"
      ],
      color: "#00ff00"
    },
    {
      title: "Consultancy & Custom",
      icon: "fas fa-handshake",
      description: "Architecture reviews, training and bespoke engineering for special requirements.",
      features: [
        "Architecture review · Team training",
        "API development · Bespoke solutions",
        "System integration · Support"
      ],
      color: "#00cc00"
    }
  ];

  const techStack = [
    "React", "Next.js", "TypeScript", "Tailwind", "SASS",
    "Node.js", "Express", "Python", "Django", "PostgreSQL",
    "n8n", "ChatGPT", "TensorFlow", "PyTorch", "React Native",
    "REST APIs", "GraphQL", "Docker", "Git", "AWS", "Azure"
  ];

  useEffect(() => {
    // Set title text directly without animation to prevent glitching
    if (titleRef.current) {
      titleRef.current.textContent = '// WEB, MOBILE, AND AI';
    }

    // Stagger service cards animation
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
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <>
      <section id="services" className={styles.servicesSection}>
      <div className="container">
        <h2 ref={titleRef} className="section-title"></h2>
        <p className={styles.servicesIntro}>
          {'> '}I build fast, resilient digital products and systems. From performance-first websites to production AI integrations and mobile apps, I handle the architecture, delivery and support so you can focus on outcomes.
        </p>

        <div ref={servicesRef} className={styles.servicesGrid}>
          {services.map((service, index) => {
            const isExpanded = expandedCards.has(index);
            return (
              <div
                key={index}
                className={`service-card ${styles.serviceCard} ${isExpanded ? styles.expanded : ''}`}
                onMouseEnter={handleCardHover}
                style={{ '--card-color': service.color } as React.CSSProperties}
              >
                <div className={styles.serviceHeader}>
                  <i
                    className={`${service.icon} service-icon ${styles.serviceIcon}`}
                    aria-hidden="true"
                  ></i>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                </div>

                <p className={styles.serviceDescription}>{service.description}</p>

                <ul className={`${styles.serviceFeatures} ${isExpanded ? styles.show : ''}`}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className={styles.featureBullet}>▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={styles.expandButton}
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

        {/* Tech Stack Badges */}
        <div className={styles.techStackSection}>
          <h3 className={styles.techStackTitle}>$ Tech Stack</h3>
          <div className={styles.techBadges}>
            {techStack.map((tech, index) => (
              <span key={index} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className={styles.ctaSection}>
          <h3>Ready to start your project?</h3>
          <p>Let's talk — I'll help bring your ideas to life.</p>
          <a href="/contact" className={styles.ctaButton}>
            Get In Touch
            <i className="fas fa-envelope icon-margin-left"></i>
          </a>
        </div>
      </div>
    </section>
    </>
  );
};