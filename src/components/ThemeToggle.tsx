import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return 'fas fa-moon';
      case 'neo':
        return 'fas fa-star';
      case 'matrix':
      default:
        return 'fas fa-code';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark Mode';
      case 'neo':
        return 'Neo Mode';
      case 'matrix':
      default:
        return 'Matrix Mode';
    }
  };

  return (
    <button
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