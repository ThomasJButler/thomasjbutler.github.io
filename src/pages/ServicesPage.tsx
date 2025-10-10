import React, { useEffect, useRef, useState } from 'react';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './ServicesPage.module.css';

export const ServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // On mobile, expand first card by default for better UX
  const [expandedCards, setExpandedCards] = useState<Set<number>>(
    () => window.innerWidth < 768 ? new Set([0]) : new Set()
  );
  const [showAllTech, setShowAllTech] = useState(false);

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
      description: "Cross-platform apps with native feel and store readiness. Built for iOS and Android.",
      features: [
        "React Native · iOS & Android · Cross-platform",
        "Push notifications · Offline functionality · Analytics",
        "Native performance · App store submission & compliance"
      ],
      color: "#00cc00"
    },
    {
      title: "Design & Brand",
      icon: "fas fa-palette",
      description: "Clear, usable interfaces and identity design that scales with your product.",
      features: [
        "UI/UX design · Brand identity · Design systems",
        "Logo design · Component libraries · Responsive mockups",
        "Marketing assets · Brand guidelines documentation"
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

  const techStackCategories = [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind", "SASS"]
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      category: "AI & ML",
      technologies: ["ChatGPT", "n8n", "TensorFlow", "PyTorch", "NLP"]
    },
    {
      category: "Mobile",
      technologies: ["React Native"]
    },
    {
      category: "APIs",
      technologies: ["REST APIs", "GraphQL"]
    },
    {
      category: "DevOps & Cloud",
      technologies: ["Docker", "Git", "AWS", "Azure"]
    }
  ];

  useEffect(() => {
    // Set title text directly without animation to prevent glitching
    if (titleRef.current) {
      titleRef.current.textContent = 'WEB, MOBILE, AND AI';
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
          I build fast, resilient digital products and systems. From performance-first websites to production AI integrations and mobile apps, I handle the architecture, delivery and support so you can focus on outcomes.
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
          <div className={styles.techStackContent}>
            {techStackCategories.map((category, catIndex) => {
              const isVisible = showAllTech || catIndex === 0;
              return (
                <div
                  key={catIndex}
                  className={`${styles.techCategory} ${!isVisible ? styles.hiddenOnMobile : ''}`}
                >
                  <h4 className={styles.categoryTitle}>{category.category}</h4>
                  <div className={styles.techBadges}>
                    {category.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techBadge}>
                        [{tech}]
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className={styles.showMoreTech}
            onClick={() => setShowAllTech(!showAllTech)}
            aria-expanded={showAllTech}
            aria-label={showAllTech ? "Hide technologies" : "Show all technologies"}
          >
            {showAllTech ? (
              <>
                Show Less <i className="fas fa-chevron-up"></i>
              </>
            ) : (
              <>
                Show All Technologies <i className="fas fa-chevron-down"></i>
              </>
            )}
          </button>
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