import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import styles from './GodModeDisplay.module.css';

interface TransformationMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
}

export const GodModeDisplay: React.FC = () => {
  const [showDisplay, setShowDisplay] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  
  const metrics: TransformationMetric[] = [
    { label: 'React Components', value: 12, target: 50, unit: 'components' },
    { label: 'Animation Quality', value: 95, target: 100, unit: '%' },
    { label: 'Performance Score', value: 92, target: 95, unit: '/100' },
    { label: 'Code Quality', value: 88, target: 95, unit: '%' },
    { label: 'Type Safety', value: 100, target: 100, unit: '%' },
    { label: 'Build Speed', value: 3.2, target: 2.5, unit: 's' }
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        setShowDisplay(!showDisplay);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [showDisplay]);

  useEffect(() => {
    if (showDisplay && metricsRef.current) {
      // Animate metrics in
      const metricElements = metricsRef.current.querySelectorAll('.metric');
      
      animate(metricElements as NodeListOf<HTMLElement>, {
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: stagger(100),
        duration: 800,
        ease: 'outExpo'
      });

      // Animate progress bars
      metricElements.forEach((element, index) => {
        const progressBar = element.querySelector('.progress-fill');
        if (progressBar) {
          const width = metrics[index].value / metrics[index].target * 100;
          animate(progressBar as HTMLElement, {
            width: `${Math.min(width, 100)}%`,
            delay: 500 + (index * 100),
            duration: 1000,
            ease: 'outExpo'
          });
        }
      });
    }
  }, [showDisplay]);

  if (!showDisplay) return null;

  return (
    <div className={styles.godModeOverlay}>
      <div className={styles.godModePanel}>
        <div className={styles.header}>
          <h2>GODMODE TRANSFORMATION STATUS</h2>
          <button 
            className={styles.closeButton}
            onClick={() => setShowDisplay(false)}
          >
            ×
          </button>
        </div>
        
        <div className={styles.statusSection}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>TRANSFORMATION ACTIVE</span>
          </div>
          
          <div className={styles.phaseInfo}>
            <span>Current Phase:</span>
            <span className={styles.phaseValue}>REACT MIGRATION</span>
          </div>
        </div>

        <div ref={metricsRef} className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={metric.label} className={`${styles.metric} metric`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricValue}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} progress-fill`}
                  style={{ width: '0%' }}
                ></div>
              </div>
              <div className={styles.metricTarget}>
                Target: {metric.target}{metric.unit}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.completedSection}>
          <h3>Completed Transformations</h3>
          <ul className={styles.completedList}>
            <li>✓ React & TypeScript Setup</li>
            <li>✓ Anime.js Integration</li>
            <li>✓ Component Architecture</li>
            <li>✓ Animation System</li>
            <li>✓ Matrix Theme Enhancement</li>
            <li>✓ CSS Modularization</li>
          </ul>
        </div>

        <div className={styles.footer}>
          <p>Press Ctrl+Shift+G to toggle this display</p>
          <p className={styles.signature}>Powered by Thomas J Butler | Liverpool 🇬🇧</p>
        </div>
      </div>
    </div>
  );
};