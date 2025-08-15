import React from 'react';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "Website Development",
      description: "Responsive, fast-loading websites built with modern technologies.",
      tooltip: "Professional web development services"
    },
    {
      title: "AI Integration",
      description: "Practical n8n AI Workflow solutions to automate workflows and enhance business efficiency.",
      tooltip: "Modern AI solutions for your business"
    },
    {
      title: "Mobile Applications",
      description: "Custom mobile apps developed for both iOS and Android platforms.",
      tooltip: "iOS and Android development"
    },
    {
      title: "Digital Design",
      description: "Brand identity, logos, and marketing materials designed to professional standards.",
      tooltip: "Professional design services"
    },
    {
      title: "Tech Consultation",
      description: "Professional advice and training for your technical projects and team.",
      tooltip: "Expert technical guidance"
    },
    {
      title: "Custom Projects",
      description: "Tailored solutions for unique requirements. Contact me to discuss your specific needs.",
      tooltip: "Bespoke solutions"
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title">Professional Services</h2>
        <p>Bespoke digital solutions tailored to your needs. All services include consultation, delivery and support.</p>
        <ul className="services-list">
          {services.map((service, index) => (
            <li key={index} data-tooltip={service.tooltip}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};