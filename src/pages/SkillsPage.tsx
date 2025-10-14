import React, { useState } from 'react';

export const SkillsPage: React.FC = () => {
  const [expandedTags, setExpandedTags] = useState<Record<number, boolean>>({});

  // Core Expertise from homepage - consolidated and enhanced
  const coreExpertise = [
    {
      title: "Full-Stack Development",
      icon: "fas fa-code",
      description: "Crafting robust web applications with modern technologies and best practices.",
      tags: ["HTML5/CSS3", "JavaScript", "React", "Node.js", "C#/.NET", "Tailwind", "HubSpot/HUBL", "WordPress/PHP", "IOS/Web Apps"],
      tooltip: "Building Complete Web Solutions"
    },
    {
      title: "AI Integration",
      icon: "fas fa-robot",
      description: "Implementing cutting-edge AI solutions for real-world applications.",
      tags: ["ChatGPT", "Claude", "Midjourney", "GPT Creation", "Chatbots", "ML", "AI LLM Models", "AI Solutions", "API"],
      tooltip: "Harnessing AI Technology"
    },
    {
      title: "UI/UX Design",
      icon: "fas fa-paint-brush",
      description: "Creating intuitive and engaging user experiences with modern design principles.",
      tags: ["Figma", "Adobe XD", "Mobile First", "Wireframes", "Galileo", "Pen & Paper"],
      tooltip: "Designing User-Centered Experiences"
    },
    {
      title: "Python Development",
      icon: "fab fa-python",
      description: "Building efficient and scalable solutions with Python expertise.",
      tags: ["Django", "Flask", "Data Analysis", "PyGame", "PyScript", "Anaconda", "TensorFlow", "PyTorch", "MatPlotLib"],
      tooltip: "Python Programming Excellence"
    },
    {
      title: "Database Management",
      icon: "fas fa-database",
      description: "Optimising data structures and managing complex database systems.",
      tags: ["MongoDB", "PostgreSQL", "MySQL", "Oracle", "Supabase", "Excel"],
      tooltip: "Data Management & Optimization"
    },
    {
      title: "Cloud Computing",
      icon: "fas fa-server",
      description: "Deploying and managing scalable cloud infrastructure solutions.",
      tags: ["AWS", "Azure", "Docker", "IIS", "Cisco", "Bamboo"],
      tooltip: "Cloud Infrastructure & Deployment"
    }
  ];

  // Additional specialized skills (non-redundant)
  const additionalSkills = [
    {
      title: "Version Control & Git",
      icon: "fab fa-git-alt",
      tooltip: "Advanced Git workflows, branching strategies, and team collaboration"
    },
    {
      title: "API Development",
      icon: "fas fa-plug",
      tooltip: "RESTful and GraphQL API design, documentation, and testing"
    },
    {
      title: "Network Architecture",
      icon: "fas fa-network-wired",
      tooltip: "Network protocols, subnetting, system configuration, and security"
    },
    {
      title: "AI Asset Generation",
      icon: "fas fa-palette",
      tooltip: "Creative AI tools for visual content, image generation, and design automation"
    },
    { title: "Agile & Scrum",
      icon: "fas fa-tasks",
      tooltip: "Agile methodologies, sprint planning, and team collaboration"
    },
    { title: "DevOps Practices",
      icon: "fas fa-cogs",
      tooltip: "CI/CD pipelines, infrastructure as code, and automated deployments"
    },
    { title: "Jira & Confluence",
      icon: "fab fa-jira",
      tooltip: "Project tracking, documentation, and team collaboration"
    },
    { title: "Testing & QA",
      icon: "fas fa-vial",
      tooltip: "Unit testing, integration testing, and automated test frameworks"
    }
    ];

  const toggleTags = (index: number) => {
    setExpandedTags(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderCoreTags = (tags: string[], index: number) => {
    const isExpanded = expandedTags[index];
    const visibleTags = isExpanded ? tags : tags.slice(0, 3);
    const hasMore = tags.length > 3;

    return (
      <div className="skill-tags">
        {visibleTags.map((tag: string, tagIndex: number) => (
          <span key={tagIndex} className="skill-tag">{tag}</span>
        ))}
        {hasMore && (
          <button
            className="skill-tag skill-tag-expand"
            onClick={() => toggleTags(index)}
            aria-label={isExpanded ? "Show less" : `Show ${tags.length - 3} more`}
          >
            {isExpanded ? 'Less' : `+${tags.length - 3}`}
          </button>
        )}
      </div>
    );
  };

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">My Skills & Expertise</h2>
        <p>A comprehensive overview of my technical expertise and proficiencies</p>

        {/* Core Expertise - Main Grid */}
        <div className="core-expertise-section">
          <h3 className="skill-section-title">Core Expertise</h3>
          <ul className="core-expertise-grid">
            {coreExpertise.map((skill, index) => (
              <li key={index} className="core-expertise-card" data-tooltip={skill.tooltip}>
                <div className="expertise-header">
                  <i className={`${skill.icon} skill-icon`} aria-hidden="true"></i>
                  <h4>{skill.title}</h4>
                </div>
                <p className="expertise-description">{skill.description}</p>
                {renderCoreTags(skill.tags, index)}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Skills - Compact List */}
        <div className="additional-skills-section">
          <h3 className="skill-section-title">Other Specialisations</h3>
          <ul className="additional-skills-list">
            {additionalSkills.map((skill, index) => (
              <li key={index} className="additional-skill-item" data-tooltip={skill.tooltip}>
                <i className={`${skill.icon} skill-icon`} aria-hidden="true"></i>
                <span className="skill-title">{skill.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};