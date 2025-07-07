import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  type?: 'spinner' | 'card' | 'detail' | 'list' | 'dashboard' | 'profile' | 'map' | 'auth';
  count?: number;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  type = 'spinner', 
  count = 1, 
  message = 'Loading...' 
}) => {
  if (type === 'spinner') {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
        <div className={styles.loadingText}>{message}</div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={styles.skeletonContainer}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonDetail}>
          <div className={styles.skeletonImageLarge} />
          <div className={styles.skeletonDetailContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonSubtitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonPriceSection}>
              <div className={styles.skeletonPrice} />
              <div className={styles.skeletonBadge} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={styles.skeletonContainer}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.skeletonListItem}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonListContent}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonText} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonDashboard}>
          {/* Profile Section */}
          <div className={styles.skeletonProfileSection}>
            <div className={styles.skeletonProfileImage} />
            <div className={styles.skeletonProfileInfo}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
            </div>
          </div>
          
          {/* Favorites Section */}
          <div className={styles.skeletonSection}>
            <div className={styles.skeletonSectionTitle} />
            <div className={styles.skeletonCardGrid}>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className={styles.skeletonMiniCard}>
                  <div className={styles.skeletonMiniImage} />
                  <div className={styles.skeletonMiniContent}>
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonText} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonProfile}>
          <div className={styles.skeletonProfileHeader}>
            <div className={styles.skeletonProfileImageLarge} />
            <div className={styles.skeletonProfileDetails}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonSubtitle} />
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
            </div>
          </div>
          <div className={styles.skeletonProfileContent}>
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'map') {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonMap}>
          <div className={styles.skeletonMapPlaceholder}>
            <div className={styles.skeletonMapIcon} />
            <div className={styles.skeletonText}>Loading map...</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'auth') {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonAuth}>
          <div className={styles.skeletonAuthIcon} />
          <div className={styles.skeletonText}>Initializing...</div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner; 