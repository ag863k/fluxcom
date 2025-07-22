import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
          <path d="M12 2h-1v3h2V2h-1zM12 19h-1v3h2v-3h-1zM5 11v2h3v-2H5zM16 11v2h3v-2h-3z"/>
          <path d="M6.3 4.9l-.7.7 2.1 2.1.7-.7L6.3 4.9zM15.6 19.1l-.7-.7 2.1-2.1.7.7-2.1 2.1zM4.9 17.7l.7.7 2.1-2.1-.7-.7-2.1 2.1zM17.7 6.3l.7-.7-2.1-2.1-.7.7 2.1 2.1z"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
