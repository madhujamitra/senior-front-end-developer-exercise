import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggleContent from '../ThemeToggleContent/ThemeToggleContent';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'switch';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'button'
}) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === 'switch') {
    return (
      <div className={`${styles.switchContainer} ${styles[size]} ${className}`}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className={styles.switchInput}
          />
          <span className={styles.slider}>
            <span className={styles.sliderIcon}>
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
          </span>
        </label>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.themeToggle} ${styles[size]} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <ThemeToggleContent 
        theme={theme} 
        iconClassName={styles.icon}
        textClassName={styles.text}
      />
    </button>
  );
};

export default ThemeToggle; 