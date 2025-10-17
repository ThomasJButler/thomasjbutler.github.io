import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [, forceUpdate] = useState({});

  // Force re-render when theme changes
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