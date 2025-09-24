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

    // Temporarily disable transitions for instant theme switching
    const root = document.documentElement;
    root.classList.add('theme-switching');

    // Use requestAnimationFrame to batch CSS variable updates
    requestAnimationFrame(() => {
      const variables = getThemeVariables(theme);

      // Batch all CSS variable updates
      Object.entries(variables).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });

      // Re-enable transitions after variables are set
      requestAnimationFrame(() => {
        root.classList.remove('theme-switching');
      });
    });
  }, [theme]);

  const getThemeVariables = (selectedTheme: Theme): Record<string, string> => {
    switch (selectedTheme) {
      case 'dark':
        return {
          '--bg-primary': '#000000',
          '--bg-secondary': '#0f0f0f',
          '--text-primary': '#ffffff',
          '--text-secondary': '#cccccc',
          '--accent-color': '#40a040',
          '--matrix-green': '#40a040',
          '--border-color': '#404040',
          '--card-bg': 'rgba(15, 15, 15, 0.95)',
          '--shadow-color': 'rgba(0, 0, 0, 0.3)'
        };

      case 'matrix':
      default:
        return {
          '--bg-primary': '#000000',
          '--bg-secondary': '#0a0a0a',
          '--text-primary': '#00ff00',
          '--text-secondary': 'rgba(0, 255, 0, 0.8)',
          '--accent-color': '#00ff00',
          '--matrix-green': '#00ff00',
          '--border-color': 'rgba(0, 255, 0, 0.3)',
          '--card-bg': 'rgba(0, 0, 0, 0.9)',
          '--shadow-color': 'rgba(0, 255, 0, 0.2)'
        };
    }
  };

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