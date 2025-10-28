/**
 * @author Tom Butler
 * @date 2025-10-27
 * @description Theme context provider for application-wide theme management.
 *              Manages Matrix and dark theme switching with localStorage persistence.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'matrix' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context
 * @return {ThemeContextType} Theme context values
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component
 * @param {Object} props
 * @param {ReactNode} props.children - Child components
 * @return {JSX.Element}
 * @constructor
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('matrix');

  /**
   * @constructs - Loads saved theme from localStorage on mount
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && ['matrix', 'dark'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  /**
   * @listens theme - Applies theme to document and persists to localStorage
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['matrix', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
