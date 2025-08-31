import React from 'react';

export const SkillsPage: React.FC = () => {
  const skills = [
    {
      title: "HTML5",
      icon: "fab fa-html5",
      description: "Adept at creating semantic, accessible, and SEO-friendly markup.",
      tooltip: "Crafting Semantic and Accessible Web Structures"
    },
    {
      title: "CSS3",
      icon: "fab fa-css3-alt",
      description: "Skilled in responsive design, animations, and CSS preprocessors like SASS.",
      tooltip: "Styling with Precision and Responsiveness"
    },
    {
      title: "JavaScript",
      icon: "fab fa-js",
      description: "Proficient in ES6+, asynchronous programming, and popular frameworks like React.",
      tooltip: "Bringing Interactivity and Dynamism to the Web"
    },
    {
      title: "Python",
      icon: "fab fa-python",
      description: "Experienced in data analysis, web scraping, and frameworks like Django and Flask.",
      tooltip: "Building Robust and Scalable Backend Systems"
    },
    {
      title: "Git",
      icon: "fab fa-git-alt",
      description: "Adept at version control, branching strategies, and collaborative development workflows.",
      tooltip: "Versioning and Collaboration"
    },
    {
      title: "Node.js",
      icon: "fab fa-node-js",
      description: "Capable of building scalable backend services and RESTful APIs with Express.js.",
      tooltip: "Server-Side JavaScript"
    },
    {
      title: "C# & .NET",
      icon: "fab fa-microsoft",
      description: "Proficient in developing robust backend systems and desktop applications.",
      tooltip: "Microsoft's Powerful Development Framework"
    },
    {
      title: "Networking",
      icon: "fas fa-network-wired",
      description: "Well-versed in network protocols, subnetting, and system configuration.",
      tooltip: "Connecting the Digital World"
    },
    {
      title: "AI & Machine Learning",
      icon: "fas fa-brain",
      description: "Knowledgeable in machine learning algorithms, neural networks, and AI model deployment.",
      tooltip: "Harnessing the Power of Artificial Intelligence"
    },
    {
      title: "AI Asset Generation",
      icon: "fas fa-palette",
      description: "Experienced in leveraging AI for generating unique and captivating visual assets using a variety of tools.",
      tooltip: "AI-Powered Visual Creativity"
    },
    {
      title: "Database Management",
      icon: "fas fa-database",
      description: "Skilled in SQL, database design, and optimisation techniques.",
      tooltip: "Managing and Optimising Data"
    },
    {
      title: "API Development",
      icon: "fas fa-plug",
      description: "Experienced in designing and implementing RESTful and GraphQL APIs.",
      tooltip: "Connecting Systems Seamlessly"
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2>My Skills</h2>
        <p>A comprehensive overview of my technical expertise and proficiencies</p>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index} data-tooltip={skill.tooltip}>
              <h3>
                <i 
                  className={`${skill.icon} skill-icon`}
                  style={{
                    marginRight: '0.75rem',
                    fontSize: '1.2rem',
                    color: '#00FF00',
                    textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-hidden="true"
                ></i>
                {skill.title}
              </h3>
              <p>{skill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};