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
        root.style.setProperty('--bg-secondary', '#0a0a0a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#b8b8b8');
        root.style.setProperty('--text-base', '#CCCCCC'); // Keep readable body text
        root.style.setProperty('--accent-color', '#4A9EFF'); // Blue accent for dark theme
        root.style.setProperty('--matrix-green', '#4A9EFF'); // Blue instead of green
        root.style.setProperty('--matrix-yellow', '#FFD700');
        root.style.setProperty('--matrix-cyan', '#00D4FF');
        root.style.setProperty('--matrix-red', '#FF5555');
        root.style.setProperty('--matrix-gold', '#FFD700');
        root.style.setProperty('--border-color', 'rgba(74, 158, 255, 0.3)');
        root.style.setProperty('--card-bg', 'rgba(10, 10, 10, 0.95)');
        root.style.setProperty('--shadow-color', 'rgba(74, 158, 255, 0.2)');
        root.style.setProperty('--phosphor-glow', '0 0 2px #4A9EFF, 0 0 8px rgba(74, 158, 255, 0.4)');
        root.style.setProperty('--matrix-glow', '0 0 10px #4A9EFF');
        root.style.setProperty('--matrix-glow-intense', '0 0 20px #4A9EFF');
        break;

      case 'matrix':
      default:
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#0a0a0a');
        root.style.setProperty('--text-primary', 'rgba(0, 255, 0, 0.92)');
        root.style.setProperty('--text-secondary', 'rgba(0, 255, 0, 0.7)');
        root.style.setProperty('--text-base', '#CCCCCC'); // Ensure readable body text
        root.style.setProperty('--accent-color', '#00ff00');
        root.style.setProperty('--matrix-green', '#00ff00');
        root.style.setProperty('--matrix-yellow', '#FFEA00');
        root.style.setProperty('--matrix-cyan', '#00FFFF');
        root.style.setProperty('--matrix-red', '#FF0000');
        root.style.setProperty('--matrix-gold', '#FFD700');
        root.style.setProperty('--border-color', 'rgba(0, 255, 0, 0.3)');
        root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.9)');
        root.style.setProperty('--shadow-color', 'rgba(0, 255, 0, 0.2)');
        root.style.setProperty('--phosphor-glow', '0 0 2px #00ff00, 0 0 8px rgba(0, 255, 0, 0.4)');
        root.style.setProperty('--matrix-glow', '0 0 10px #00ff00');
        root.style.setProperty('--matrix-glow-intense', '0 0 20px #00ff00');
        break;
    }
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