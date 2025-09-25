import React, { useEffect, useRef } from 'react';
import { useCardAnimations } from '../hooks/useCardAnimations';
import { matrixAnimations } from '../utils/animations/matrixAnimations';
import styles from './ServicesPage.module.css';

export const ServicesPage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Apply card animations
  useCardAnimations();

  const services = [
    {
      title: "Website Development",
      icon: "fas fa-code",
      description: "Responsive, fast-loading websites built with modern technologies.",
      features: ["React/Next.js", "TypeScript", "Performance Optimized", "SEO Ready"],
      color: "#00ff00"
    },
    {
      title: "AI Integration",
      icon: "fas fa-robot",
      description: "Practical n8n AI Workflow solutions to automate workflows and enhance business efficiency.",
      features: ["ChatGPT Integration", "Automation Workflows", "Custom AI Solutions", "Data Processing"],
      color: "#00cc00"
    },
    {
      title: "Mobile Applications",
      icon: "fas fa-mobile-alt",
      description: "Custom mobile apps developed for both iOS and Android platforms.",
      features: ["React Native", "Cross-Platform", "Native Performance", "App Store Ready"],
      color: "#00ff00"
    },
    {
      title: "Digital Design",
      icon: "fas fa-palette",
      description: "Brand identity, logos, and marketing materials designed to professional standards.",
      features: ["UI/UX Design", "Brand Identity", "Logo Design", "Marketing Materials"],
      color: "#00cc00"
    },
    {
      title: "Tech Consultation",
      icon: "fas fa-handshake",
      description: "Professional advice and training for your technical projects and team.",
      features: ["Architecture Review", "Team Training", "Tech Stack Selection", "Best Practices"],
      color: "#00ff00"
    },
    {
      title: "Custom Projects",
      icon: "fas fa-cogs",
      description: "Tailored solutions for unique requirements. Contact me to discuss your specific needs.",
      features: ["Bespoke Solutions", "API Development", "System Integration", "Automation"],
      color: "#00cc00"
    }
  ];

  useEffect(() => {
    // Set title text directly without animation to prevent glitching
    if (titleRef.current) {
      titleRef.current.textContent = 'Professional Services';
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

  return (
    <>
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
       <section id="services" className={styles.servicesSection}>
      <div className="container">
        <h2 ref={titleRef} className="section-title"></h2>
        <p className={styles.servicesIntro}>
          Bespoke digital solutions tailored to your needs. All services include consultation, delivery and support.
        </p>
        
        <div ref={servicesRef} className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card ${styles.serviceCard}`}
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
              
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className={styles.featureBullet}>▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={styles.serviceButton}>
                Learn More
                <i className="fas fa-arrow-right icon-margin-left"></i>
              </button>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3>Ready to Start Your Project?</h3>
          <p>Let's discuss how I can help bring your ideas to life.</p>
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