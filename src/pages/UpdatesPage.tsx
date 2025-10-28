/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Development timeline page showcasing career milestones and journey
 *              from childhood tech passion to professional developer
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { timelineData } from '../utils/timelineData';
import type { TimelineEntry } from '../utils/timelineData';
import '../css/pages/updates.css';

/**
 * Timeline page displaying development journey milestones
 * @return {JSX.Element}
 * @constructor
 */
export const UpdatesPage: React.FC = () => {
  /**
   * @constructs Scrolls to top and sets page title on mount
   */
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Dev Timeline & Journey | Thomas J Butler';
  }, []);

  const renderLinks = (links?: TimelineEntry['links']) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="timeline-links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="timeline-link"
          >
            <i className={`fas ${link.icon}`}></i>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    );
  };

  const renderAchievements = (achievements: string[]) => {
    if (!achievements || achievements.length === 0) return null;

    return (
      <ul className="timeline-achievements">
        {achievements.map((achievement, index) => (
          <li key={index} className="achievement-item">
            <span className="terminal-symbol">{'>'}</span>
            <span className="achievement-text">{achievement}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="updates-page">
      {/* Hero Section */}
      <section className="updates-hero">
        <div className="container">
          <Link to="/about" className="back-button">
            <i className="fas fa-arrow-left"></i>
            <span>Back to About</span>
          </Link>

          <div className="hero-content">
            <div className="terminal-decoration">
              <span className="terminal-prompt">// USER:</span>
              <span className="terminal-cursor">▮</span>
            </div>
            <h1 className="hero-title">
              Dev Timeline & <span className="highlight">Journey</span>
            </h1>
            <p className="hero-subtitle">
              From childhood tech passion to professional developer - tracking my evolution through code, AI, and continuous learning
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{timelineData.length}</span>
                <span className="stat-label">Milestones</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{new Date().getFullYear() - 2022}</span>
                <span className="stat-label">Years Coding</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Passion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="updates-timeline">
        <div className="container">
          <VerticalTimeline
            lineColor="var(--matrix-green)"
            animate={true}
          >
            {timelineData.map((entry) => (
              <VerticalTimelineElement
                key={entry.id}
                className={`timeline-element timeline-${entry.category}`}
                contentStyle={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 3px 0 var(--matrix-green)',
                  border: '1px solid var(--border-color)',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid var(--card-bg)',
                }}
                date={entry.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: entry.iconBg,
                  color: '#fff',
                  boxShadow: `0 0 0 4px ${entry.iconBg}33, 0 0 20px ${entry.iconBg}66`,
                }}
                icon={
                  <div className="timeline-icon">
                    <i className={`fas ${entry.icon}`}></i>
                  </div>
                }
              >
                <div className="timeline-content">
                  {/* Header */}
                  <div className="timeline-header">
                    <h3 className="timeline-title">{entry.title}</h3>
                    <div className="timeline-meta">
                      <span className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        {entry.location}
                      </span>
                      <span className="institution">
                        <i className="fas fa-building"></i>
                        {entry.institution}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="timeline-description">{entry.description}</p>

                  {/* Achievements */}
                  {renderAchievements(entry.achievements)}

                  {/* Links */}
                  {renderLinks(entry.links)}

                  {/* Category Badge */}
                  <div className="category-badge" data-category={entry.category}>
                    {entry.category.replace('-', ' ').toUpperCase()}
                  </div>
                </div>
              </VerticalTimelineElement>
            ))}

            {/* Final Element - The Beginning */}
            <VerticalTimelineElement
              iconStyle={{
                background: 'var(--matrix-green)',
                color: '#000',
                boxShadow: '0 0 0 4px var(--matrix-green-glow), 0 0 30px var(--matrix-green)',
              }}
              icon={
                <div className="timeline-icon">
                  <i className="fas fa-star"></i>
                </div>
              }
            />
          </VerticalTimeline>
        </div>
      </section>

      {/* Call to Action */}
      <section className="updates-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              <span className="terminal-symbol">//</span> Want to work together?
            </h2>
            <p className="cta-text">
              I'm always interested in new opportunities and collaborations. Let's create something amazing together.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                <i className="fas fa-envelope"></i>
                <span>Get in Touch</span>
              </Link>
              <Link to="/projects" className="cta-button secondary">
                <i className="fas fa-folder-open"></i>
                <span>View Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdatesPage;
