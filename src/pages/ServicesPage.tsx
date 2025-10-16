import React, { useEffect, useRef, useState } from 'react';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import '../css/pages/services.css';

export const ServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // On mobile, expand first card by default for better UX
  const [expandedCards, setExpandedCards] = useState<Set<number>>(
    () => window.innerWidth < 768 ? new Set([0]) : new Set()
  );
  const [showAllTech, setShowAllTech] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  // Apply card animations
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

  const techStackCategories = [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "SASS", "CSS3", "HTML5", "Vue.js", "Webpack", "Vite", "Redux"]
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express", "Python", "Django", "PHP", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "MySQL", "RESTful APIs", "WebSockets"]
    },
    {
      category: "AI & ML",
      technologies: ["ChatGPT", "GPT-4", "Claude", "OpenAI API", "LangChain", "Prompt Engineering", "n8n", "Zapier", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "RAG", "Vector Databases", "Fine-tuning", "AI Agents"]
    },
    {
      category: "Mobile & Mobile Web Apps",
      technologies: ["React Native", "iOS & Android", "PWA", "Responsive Design", "Mobile-First"]
    },
    {
      category: "APIs",
      technologies: ["REST APIs", "GraphQL", "Apollo", "tRPC", "WebSockets", "API Design", "Swagger/OpenAPI", "Postman", "Rate Limiting", "Authentication"]
    },
    {
      category: "DevOps & Cloud",
      technologies: ["Docker", "Git", "AWS", "Azure", "CI/CD", "GitHub Actions", "Vercel", "Netlify"]
    }
  ];

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    console.log('[DEBUG] ServicesPage mounted');
  }, []);

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

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => {
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

        {/* Tech Stack Badges */}
        <div className="techStackSection">
          <h3 className="techStackTitle">$ Tech Stack</h3>
          <div className="techStackContent">
            {techStackCategories.map((category, catIndex) => {
              const isVisible = showAllTech || catIndex === 0;
              const isCategoryExpanded = expandedCategories.has(catIndex);
              const visibleTech = category.technologies.slice(0, 7);
              const hiddenTech = category.technologies.slice(7);
              const hasMore = hiddenTech.length > 0;

              return (
                <div
                  key={catIndex}
                  className={`techCategory ${!isVisible ? 'hiddenOnMobile' : ''}`}
                >
                  <h4 className="categoryTitle">{category.category}</h4>

                  {/* First line - always visible */}
                  <div className="techBadges">
                    {visibleTech.map((tech, techIndex) => (
                      <span key={techIndex} className="techBadge">
                        [{tech}]
                      </span>
                    ))}
                  </div>

                  {/* Additional badges - collapsible on desktop */}
                  {hasMore && (
                    <>
                      <div className={`techBadges techBadgesExtra ${isCategoryExpanded ? 'expanded' : ''}`}>
                        {hiddenTech.map((tech, techIndex) => (
                          <span key={techIndex + 7} className="techBadge">
                            [{tech}]
                          </span>
                        ))}
                      </div>

                      <button
                        className="categoryToggle"
                        onClick={() => toggleCategory(catIndex)}
                        aria-expanded={isCategoryExpanded}
                        aria-label={isCategoryExpanded ? `Show less ${category.category} technologies` : `Show ${hiddenTech.length} more ${category.category} technologies`}
                      >
                        {isCategoryExpanded ? (
                          <>
                            Show Less <i className="fas fa-chevron-up"></i>
                          </>
                        ) : (
                          <>
                            +{hiddenTech.length} More <i className="fas fa-chevron-down"></i>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <button
            className="showMoreTech"
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
        <div className="ctaSection">
          <h3>Ready to start your project?</h3>
          <p>Let's talk, I'll help bring your ideas to life.</p>
          <a href="/contact" className="ctaButton">
            Get In Touch
            <i className="fas fa-envelope icon-margin-left"></i>
          </a>
        </div>
      </div>
    </section>
    </div>
  );
};