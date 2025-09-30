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
        root.style.setProperty('--text-primary', '#FFFFFF'); // Pure white for all text
        root.style.setProperty('--text-secondary', '#CCCCCC'); // Light grey for secondary text
        root.style.setProperty('--text-base', '#FFFFFF'); // White for body text
        root.style.setProperty('--accent-color', '#4A9EFF'); // Blue accent for dark theme
        root.style.setProperty('--accent-rgb', '74, 158, 255'); // Blue RGB values
        root.style.setProperty('--accent-hover', '#5AADFF'); // Lighter blue for hover
        root.style.setProperty('--matrix-green', '#4A9EFF'); // Override green with blue
        root.style.setProperty('--matrix-yellow', '#4A9EFF'); // Override yellow with blue
        root.style.setProperty('--matrix-cyan', '#4A9EFF'); // All accents blue
        root.style.setProperty('--matrix-red', '#FF5555'); // Keep red for errors
        root.style.setProperty('--matrix-gold', '#4A9EFF'); // Override gold with blue
        root.style.setProperty('--border-color', 'rgba(74, 158, 255, 0.3)');
        root.style.setProperty('--card-bg', 'rgba(15, 15, 15, 0.95)');
        root.style.setProperty('--shadow-color', 'rgba(74, 158, 255, 0.2)');
        root.style.setProperty('--phosphor-glow', '0 0 2px #4A9EFF, 0 0 5px rgba(74, 158, 255, 0.3)'); // Subtle blue glow
        root.style.setProperty('--matrix-glow', '0 0 8px #4A9EFF'); // Blue glow
        root.style.setProperty('--matrix-glow-intense', '0 0 15px #4A9EFF'); // Blue glow
        break;

      case 'matrix':
      default:
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#0a0a0a');
        root.style.setProperty('--text-primary', '#FFFFFF'); // White for primary text
        root.style.setProperty('--text-secondary', '#CCCCCC'); // Light grey for secondary
        root.style.setProperty('--text-base', '#FFFFFF'); // White for body text
        root.style.setProperty('--accent-color', '#00FFFF'); // Cyan for accents
        root.style.setProperty('--accent-rgb', '0, 255, 255'); // Cyan RGB values
        root.style.setProperty('--accent-hover', '#00DDDD'); // Darker cyan for hover
        root.style.setProperty('--matrix-green', '#00ff00'); // Keep green for borders/icons
        root.style.setProperty('--matrix-yellow', '#FFEA00');
        root.style.setProperty('--matrix-cyan', '#00FFFF');
        root.style.setProperty('--matrix-red', '#FF0000');
        root.style.setProperty('--matrix-gold', '#FFD700');
        root.style.setProperty('--border-color', 'rgba(0, 255, 0, 0.3)');
        root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.9)');
        root.style.setProperty('--shadow-color', 'rgba(0, 255, 0, 0.2)');
        root.style.setProperty('--phosphor-glow', '0 0 2px #00FFFF, 0 0 5px rgba(0, 255, 255, 0.3)'); // Subtle cyan glow
        root.style.setProperty('--matrix-glow', '0 0 8px #00FFFF'); // Reduced cyan glow
        root.style.setProperty('--matrix-glow-intense', '0 0 15px #00FFFF'); // Reduced cyan glow
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