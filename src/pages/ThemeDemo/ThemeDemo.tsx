import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './ThemeDemo.module.scss';

const ThemeDemo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <h1>🎨 Dark/Light Theme System Demo</h1>
        <p>Current theme: <strong>{theme}</strong></p>
      </div>

      <div className={styles.toggleSection}>
        <h2>Theme Toggle Components</h2>
        <div className={styles.toggles}>
          <div className={styles.toggleItem}>
            <h3>Button Variant</h3>
            <ThemeToggle variant="button" size="sm" />
            <ThemeToggle variant="button" size="md" />
            <ThemeToggle variant="button" size="lg" />
          </div>
          <div className={styles.toggleItem}>
            <h3>Switch Variant</h3>
            <ThemeToggle variant="switch" size="sm" />
            <ThemeToggle variant="switch" size="md" />
            <ThemeToggle variant="switch" size="lg" />
          </div>
        </div>
      </div>

      <div className={styles.colorsSection}>
        <h2>Color Palette</h2>
        <div className={styles.colorGrid}>
          <div className={styles.colorCategory}>
            <h3>Primary Colors</h3>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--primary-red)' }}>
              <span>Primary Red</span>
            </div>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--primary-red-hover)' }}>
              <span>Primary Red Hover</span>
            </div>
          </div>
          
          <div className={styles.colorCategory}>
            <h3>Background Colors</h3>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--background-primary)', border: '1px solid var(--border-light)' }}>
              <span>Background Primary</span>
            </div>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--background-secondary)', border: '1px solid var(--border-light)' }}>
              <span>Background Secondary</span>
            </div>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--background-tertiary)', border: '1px solid var(--border-light)' }}>
              <span>Background Tertiary</span>
            </div>
          </div>
          
          <div className={styles.colorCategory}>
            <h3>Text Colors</h3>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--text-primary)', color: 'var(--text-inverse)' }}>
              <span>Text Primary</span>
            </div>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--text-secondary)', color: 'var(--text-inverse)' }}>
              <span>Text Secondary</span>
            </div>
            <div className={styles.colorSwatch} style={{ backgroundColor: 'var(--text-tertiary)', color: 'var(--text-inverse)' }}>
              <span>Text Tertiary</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.componentsSection}>
        <h2>Component Examples</h2>
        
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <h3>Buttons</h3>
            <button className={styles.primaryButton}>Primary Button</button>
            <button className={styles.secondaryButton}>Secondary Button</button>
            <button className={styles.outlineButton}>Outline Button</button>
          </div>
          
          <div className={styles.componentItem}>
            <h3>Form Elements</h3>
            <input 
              type="text" 
              placeholder="Text input" 
              className={styles.input}
            />
            <textarea 
              placeholder="Textarea" 
              className={styles.textarea}
              rows={3}
            />
            <select className={styles.select}>
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          
          <div className={styles.componentItem}>
            <h3>Cards</h3>
            <div className={styles.card}>
              <h4>Sample Card</h4>
              <p>This is a sample card component that adapts to the current theme.</p>
              <button className={styles.cardButton}>Action</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statusSection}>
        <h2>Status Components</h2>
        <div className={styles.statusGrid}>
          <ErrorMessage message="This is an error message" />
          <div className={styles.statusItem}>
            <div className={styles.successMessage}>
              ✅ Success: Operation completed successfully
            </div>
          </div>
          <div className={styles.statusItem}>
            <div className={styles.warningMessage}>
              ⚠️ Warning: Please check your input
            </div>
          </div>
          <div className={styles.statusItem}>
            <div className={styles.infoMessage}>
              ℹ️ Info: Additional information available
            </div>
          </div>
        </div>
      </div>

      <div className={styles.loadingSection}>
        <h2>Loading States & Skeletons</h2>
        
        <div className={styles.skeletonShowcase}>
          <div className={styles.skeletonDemo}>
            <h3>Spinner Loading</h3>
            <LoadingSpinner type="spinner" message="Loading content..." />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Card Skeletons</h3>
            <LoadingSpinner type="card" count={2} />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Detail Skeleton</h3>
            <LoadingSpinner type="detail" />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>List Skeleton</h3>
            <LoadingSpinner type="list" count={3} />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Dashboard Skeleton</h3>
            <LoadingSpinner type="dashboard" />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Profile Skeleton</h3>
            <LoadingSpinner type="profile" />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Map Skeleton</h3>
            <LoadingSpinner type="map" />
          </div>
          
          <div className={styles.skeletonDemo}>
            <h3>Auth Skeleton</h3>
            <LoadingSpinner type="auth" />
          </div>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2>🚀 Theme System Features</h2>
        <div className={styles.featuresList}>
          <div className={styles.feature}>
            <h3>🎯 Automatic System Detection</h3>
            <p>Detects user's system preference (light/dark) on first visit</p>
          </div>
          <div className={styles.feature}>
            <h3>💾 Persistent Storage</h3>
            <p>Remembers user's theme preference across sessions</p>
          </div>
          <div className={styles.feature}>
            <h3>🔄 Smooth Transitions</h3>
            <p>All theme changes include smooth 0.3s transitions</p>
          </div>
          <div className={styles.feature}>
            <h3>📱 Responsive Design</h3>
            <p>Theme toggles adapt to different screen sizes</p>
          </div>
          <div className={styles.feature}>
            <h3>🎨 CSS Custom Properties</h3>
            <p>Uses modern CSS variables for dynamic theming</p>
          </div>
          <div className={styles.feature}>
            <h3>♿ Accessibility</h3>
            <p>Full keyboard navigation and ARIA labels</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo; 