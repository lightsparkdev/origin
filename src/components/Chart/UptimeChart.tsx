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
  /**
   * Always-visible resting label shown below the bars. On hover it
   * updates to the hovered bar's label, then returns to this value.
   * Set to `false` to hide the label row entirely.
   */
  label?: string | false;
  /**
   * Status dot color shown next to the resting label.
   * Ignored when a bar is hovered (uses the hovered bar's status color).
   */
  labelStatus?: UptimePoint['status'];
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
      label: labelProp,
      labelStatus = 'up',
      onHover,
      className,
      ...props
    },
    ref,
  ) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const colors = { ...DEFAULT_COLORS, ...colorsProp };
    const showLabel = labelProp !== false;

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

    const activePoint = activeIndex !== null ? data[activeIndex] : null;
    const displayLabel = activePoint?.label ?? labelProp ?? null;
    const displayStatus = activePoint?.status ?? labelStatus;

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
                activeIndex === i && styles.uptimeBarActive,
              )}
              style={{ backgroundColor: colors[point.status] }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>
        {showLabel && (
          <div className={styles.uptimeTooltip}>
            {displayLabel ? (
              <>
                <span
                  className={styles.uptimeDot}
                  style={{ backgroundColor: colors[displayStatus] }}
                />
                <span className={styles.uptimeLabel}>{displayLabel}</span>
              </>
            ) : (
              <span className={styles.uptimeLabel} aria-hidden="true">&nbsp;</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Uptime.displayName = 'Chart.Uptime';
}
