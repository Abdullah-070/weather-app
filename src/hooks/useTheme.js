import { useState, useEffect, useCallback } from 'react';
import { getTheme, setTheme as saveTheme } from '../utils/storage';

export const useTheme = () => {
  const [theme, setThemeState] = useState(getTheme());
  const [isDark, setIsDark] = useState(false);

  // Determine if dark mode should be active
  const calculateIsDark = useCallback((themeValue) => {
    if (themeValue === 'dark') return true;
    if (themeValue === 'light') return false;
    
    // Auto mode - check system preference and time
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    // Time-based fallback
    const hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  }, []);

  // Update theme
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDark, setTheme]);

  // Apply theme to document
  useEffect(() => {
    const dark = calculateIsDark(theme);
    setIsDark(dark);

    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, calculateIsDark]);

  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setIsDark(calculateIsDark('auto'));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, calculateIsDark]);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
};
