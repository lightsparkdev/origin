'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss';

export interface UptimePoint {
  /** Status for this time period. */
  status: 'up' | 'down' | 'degraded' | 'unknown';
  /** Optional label (e.g., timestamp). Shown on hover. */
  label?: string;
}

export interface UptimeChartProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Array of status points, ordered chronologically. */
  data: UptimePoint[];
  /** Height of the status bars in px. */
  barHeight?: number;
  /** Color map for statuses. Defaults to green/red/yellow/gray. */
  colors?: Partial<Record<UptimePoint['status'], string>>;
  /** Accessible label. */
  ariaLabel?: string;
  /** Called when a bar is hovered. */
  onHover?: (point: UptimePoint | null, index: number | null) => void;
}

const DEFAULT_COLORS: Record<UptimePoint['status'], string> = {
  up: 'var(--color-blue-700)',
  down: 'var(--color-red-500)',
  degraded: 'var(--color-yellow-500)',
  unknown: 'var(--surface-secondary)',
};

export const Uptime = React.forwardRef<HTMLDivElement, UptimeChartProps>(
  function Uptime(
    {
      data,
      barHeight = 32,
      colors: colorsProp,
      ariaLabel,
      onHover,
      className,
      ...props
    },
    ref,
  ) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const colors = { ...DEFAULT_COLORS, ...colorsProp };

    const handleEnter = React.useCallback(
      (i: number) => {
        setActiveIndex(i);
        onHover?.(data[i], i);
      },
      [data, onHover],
    );

    const handleLeave = React.useCallback(() => {
      setActiveIndex(null);
      onHover?.(null, null);
    }, [onHover]);

    return (
      <div
        ref={ref}
        className={clsx(styles.uptime, className)}
        role="img"
        aria-label={ariaLabel ?? `Uptime chart with ${data.length} periods`}
        {...props}
      >
        <div className={styles.uptimeBars} style={{ height: barHeight }}>
          {data.map((point, i) => (
            <div
              key={i}
              className={clsx(
                styles.uptimeBar,
                activeIndex !== null && activeIndex !== i && styles.uptimeBarDimmed,
              )}
              style={{ backgroundColor: colors[point.status] }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>
        <div className={styles.uptimeTooltip} style={{ visibility: activeIndex !== null && data[activeIndex]?.label ? 'visible' : 'hidden' }}>
          {activeIndex !== null && data[activeIndex]?.label && (
            <>
              <span
                className={styles.uptimeDot}
                style={{ backgroundColor: colors[data[activeIndex].status] }}
              />
              <span className={styles.uptimeLabel}>{data[activeIndex].label}</span>
            </>
          )}
          {/* Reserve height when empty */}
          {(activeIndex === null || !data[activeIndex]?.label) && (
            <span className={styles.uptimeLabel}>&nbsp;</span>
          )}
        </div>
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Uptime.displayName = 'Chart.Uptime';
}
