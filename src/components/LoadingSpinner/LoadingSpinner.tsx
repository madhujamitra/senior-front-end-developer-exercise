import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} />
    <div className={styles.loadingText}>Loading...</div>
  </div>
);

export default LoadingSpinner; 