/**
 * Loader Component
 * 
 * A simple 3×3 dot grid loading indicator with pulse animation.
 * Pure CSS animation - no Base UI needed.
 */

'use client';

import * as React from 'react';
import styles from './Loader.module.scss';

export interface LoaderProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
}

export function Loader({
  size = 'md',
  className,
  label = 'Loading',
}: LoaderProps) {
  return (
    <div
      className={`${styles.loader} ${styles[size]} ${className || ''}`}
      role="status"
      aria-label={label}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={styles.dot}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

export default Loader;

