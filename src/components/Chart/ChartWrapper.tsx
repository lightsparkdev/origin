'use client';

import * as React from 'react';
import clsx from 'clsx';
import type { ResolvedSeries } from './types';
import styles from './Chart.module.scss';

export interface ChartWrapperProps {
  loading?: boolean;
  empty?: React.ReactNode;
  dataLength: number;
  height: number;
  legend?: boolean;
  series?: ResolvedSeries[];
  children: React.ReactNode;
  className?: string;
  activeIndex?: number | null;
  ariaLiveContent?: string;
}

export function ChartWrapper({
  loading,
  empty,
  dataLength,
  height,
  legend,
  series,
  children,
  className,
  activeIndex: _activeIndex,
  ariaLiveContent,
}: ChartWrapperProps) {
  if (loading) {
    return (
      <div className={clsx(styles.root, className)} style={{ height }}>
        <div className={styles.loading}>
          <div className={styles.loadingSkeleton} />
        </div>
      </div>
    );
  }

  if (dataLength === 0 && empty !== undefined) {
    return (
      <div className={clsx(styles.root, className)} style={{ height }}>
        <div className={styles.empty}>
          {typeof empty === 'boolean' ? 'No data' : empty}
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {legend && series && series.length > 1 && (
        <div className={styles.legend}>
          {series.map((s) => (
            <div key={s.key} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: s.color }} />
              <span className={styles.legendLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      {ariaLiveContent !== undefined && (
        <div role="status" aria-live="polite" aria-atomic="true" className={styles.srOnly}>
          {ariaLiveContent}
        </div>
      )}
    </>
  );
}
