import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import styles from './UpdatesFeed.module.css';
import updatesData from '../../../updates.json';

interface Update {
  id: string;
  date: string;
  type: string;
  mood: string;
  title: string;
  description: string;
  content: string;
  tech?: string[];
  impact?: string;
  links?: {
    live?: string;
    github?: string;
    devlog?: string;
    changelog?: string;
  };
  featured?: boolean;
}

interface UpdatesFeedProps {
  limit?: number;
  featured?: boolean;
  showStats?: boolean;
}

const typeEmojis: Record<string, string> = {
  feature: '🎉',
  achievement: '🏆',
  learning: '📚',
  milestone: '🚀',
  thought: '💭'
};

const moodColors: Record<string, string> = {
  celebrating: '#00FF00',
  reflecting: '#00FFFF',
  building: '#FF00FF',
  conquering: '#FFFF00'
};

export const UpdatesFeed: React.FC<UpdatesFeedProps> = ({ 
  limit = 5, 
  featured = false,
  showStats = false 
}) => {
  const feedRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Stagger animation for feed items
    animate(itemsRef.current, {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: 'outExpo'
    });
  }, []);

  const handleUpdateHover = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      scale: 1.02,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleUpdateLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      duration: 300,
      ease: 'outQuad'
    });
  };

  // Filter and limit updates
  let displayUpdates = updatesData.updates;
  if (featured) {
    displayUpdates = displayUpdates.filter(update => update.featured);
  }
  displayUpdates = displayUpdates.slice(0, limit);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className={styles.updatesFeed} ref={feedRef}>
      {showStats && (
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Updates:</span>
            <span className={styles.statValue}>{updatesData.stats.totalUpdates}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Streak:</span>
            <span className={styles.statValue}>{updatesData.stats.currentStreak} days</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Projects:</span>
            <span className={styles.statValue}>{updatesData.stats.totalProjects}+</span>
          </div>
        </div>
      )}

      <div className={styles.feedItems}>
        {displayUpdates.map((update, index) => (
          <div
            key={update.id}
            className={`${styles.updateItem} ${styles[update.type]}`}
            ref={el => { if (el) itemsRef.current[index] = el; }}
            onMouseEnter={handleUpdateHover}
            onMouseLeave={handleUpdateLeave}
            style={{
              borderColor: moodColors[update.mood] || '#00FF00'
            }}
          >
            <div className={styles.updateHeader}>
              <span className={styles.updateType}>
                {typeEmojis[update.type]} {update.type}
              </span>
              <span className={styles.updateDate}>{formatDate(update.date)}</span>
            </div>

            <h3 className={styles.updateTitle}>{update.title}</h3>
            <p className={styles.updateDescription}>{update.description}</p>

            {update.tech && update.tech.length > 0 && (
              <div className={styles.techTags}>
                {update.tech.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            )}

            {update.impact && (
              <p className={styles.updateImpact}>
                <span className={styles.impactLabel}>Impact:</span> {update.impact}
              </p>
            )}

            {update.links && Object.keys(update.links).length > 0 && (
              <div className={styles.updateLinks}>
                {update.links.live && (
                  <a 
                    href={update.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.updateLink}
                  >
                    <i className="fas fa-external-link-alt"></i> Live
                  </a>
                )}
                {update.links.github && (
                  <a 
                    href={update.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.updateLink}
                  >
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
                {update.links.devlog && (
                  <a 
                    href={update.links.devlog}
                    className={styles.updateLink}
                  >
                    <i className="fas fa-book"></i> Details
                  </a>
                )}
              </div>
            )}

            <div 
              className={styles.moodIndicator}
              style={{ backgroundColor: moodColors[update.mood] || '#00FF00' }}
              title={`Mood: ${update.mood}`}
            />
          </div>
        ))}
      </div>

      <div className={styles.feedFooter}>
        <a href="/devlog.md" className={styles.viewAllLink}>
          View Full Dev Journal <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};