/**
 * @author Tom Butler
 * @date 2025-10-28
 * @description Theme toggle button for switching between Dark and Matrix themes
 */

import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * Theme toggle component with dynamic icon and label based on current theme
 * @return {JSX.Element}
 * @constructor
 */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [, forceUpdate] = useState({});

  /**
   * @listens theme - Forces component re-render to update icon and label
   */
  useEffect(() => {
    forceUpdate({});
  }, [theme]);

  const getThemeIcon = () => {
    switch (theme) {
      case 'matrix':
        return 'fas fa-moon';
      case 'dark':
      default:
        return 'fas fa-code';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Matrix Mode';
      case 'matrix':
      default:
        return 'Dark Mode';
    }
  };

  return (
    <button
      key={theme} // Force re-render on theme change
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch theme. Current: ${getThemeLabel()}`}
      title={`Current theme: ${getThemeLabel()}`}
    >
      <i className={getThemeIcon()} aria-hidden="true"></i>
      <span className={styles.themeLabel}>{getThemeLabel()}</span>
    </button>
  );
};
