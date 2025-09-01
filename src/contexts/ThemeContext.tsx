import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'matrix' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('matrix');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && ['matrix', 'dark'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    // Update CSS variables based on theme
    const root = document.documentElement;
    
    switch (theme) {
      case 'dark':
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#0f0f0f');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#cccccc');
        root.style.setProperty('--accent-color', '#40a040');
        root.style.setProperty('--matrix-green', '#40a040');
        root.style.setProperty('--border-color', '#404040');
        root.style.setProperty('--card-bg', 'rgba(15, 15, 15, 0.95)');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        break;
      
      case 'matrix':
      default:
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#0a0a0a');
        root.style.setProperty('--text-primary', '#00ff00');
        root.style.setProperty('--text-secondary', 'rgba(0, 255, 0, 0.8)');
        root.style.setProperty('--accent-color', '#00ff00');
        root.style.setProperty('--matrix-green', '#00ff00');
        root.style.setProperty('--border-color', 'rgba(0, 255, 0, 0.3)');
        root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.9)');
        root.style.setProperty('--shadow-color', 'rgba(0, 255, 0, 0.2)');
        break;
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'matrix' ? 'dark' : 'matrix');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};