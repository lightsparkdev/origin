'use client';

import * as React from 'react';
import clsx from 'clsx';
import { SERIES_COLORS } from './types';
import styles from './Chart.module.scss';

export interface SplitSegment {
  key?: string;
  label: string;
  value: number;
  color?: string;
}

export interface SplitChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: SplitSegment[];
  formatValue?: (value: number) => string;
  showPercentage?: boolean;
  showValues?: boolean;
  height?: number;
  legend?: boolean;
  loading?: boolean;
  empty?: React.ReactNode;
  ariaLabel?: string;
  onClickDatum?: (segment: SplitSegment, index: number) => void;
}

export const Split = React.forwardRef<HTMLDivElement, SplitChartProps>(
  function Split(
    {
      data,
      formatValue,
      showPercentage = true,
      showValues = false,
      height = 24,
      legend = true,
      loading,
      empty,
      ariaLabel,
      onClickDatum,
      className,
      ...props
    },
    ref,
  ) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const barRef = React.useRef<HTMLDivElement>(null);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (data.length === 0) return;
        let next = activeIndex ?? -1;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            next = Math.min(data.length - 1, next + 1);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            next = Math.max(0, next - 1);
            break;
          case 'Home':
            next = 0;
            break;
          case 'End':
            next = data.length - 1;
            break;
          case 'Escape':
            setActiveIndex(null);
            return;
          case 'Enter':
          case ' ':
            if (onClickDatum && activeIndex !== null && activeIndex < data.length) {
              e.preventDefault();
              onClickDatum(data[activeIndex], activeIndex);
            }
            return;
          default:
            return;
        }
        e.preventDefault();
        setActiveIndex(next);
      },
      [activeIndex, data, onClickDatum],
    );

    if (loading) {
      return (
        <div ref={ref} className={clsx(styles.splitRoot, className)} {...props}>
          <div className={styles.splitBarWrap} style={{ height }}>
            <div className={styles.splitSkeleton} />
          </div>
        </div>
      );
    }

    if (data.length === 0 && empty !== undefined) {
      return (
        <div ref={ref} className={clsx(styles.splitRoot, className)} {...props}>
          <div className={styles.chartEmpty}>
            {typeof empty === 'boolean' ? 'No data' : empty}
          </div>
        </div>
      );
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const fmtValue = (v: number) => (formatValue ? formatValue(v) : String(v));

    const segments = data.map((d, i) => ({
      ...d,
      color: d.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
      pct: total > 0 ? (d.value / total) * 100 : 0,
    }));

    const desc = ariaLabel ??
      `Distribution: ${segments.map((s) => `${s.label} ${Math.round(s.pct)}%`).join(', ')}`;

    return (
      <div ref={ref} className={clsx(styles.splitRoot, className)} {...props}>
        <div
          ref={barRef}
          className={styles.splitBarWrap}
          style={{ height }}
          role="img"
          aria-label={desc}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onBlur={() => setActiveIndex(null)}
        >
          {segments.map((seg, i) => {
            return (
              <div
                key={seg.key ?? i}
                className={clsx(
                  styles.splitSegment,
                  onClickDatum && styles.splitSegmentClickable,
                )}
                style={{
                  flexBasis: `${seg.pct}%`,
                  backgroundColor: seg.color,
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={onClickDatum ? () => onClickDatum(seg, i) : undefined}
              />
            );
          })}
        </div>

        {legend && (
          <div className={styles.legend}>
            {activeIndex !== null && segments[activeIndex] ? (
              <div className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: segments[activeIndex].color }}
                />
                <span className={styles.legendLabel}>
                  {segments[activeIndex].label}
                  {showValues && ` ${fmtValue(segments[activeIndex].value)}`}
                  {showPercentage && ` (${Math.round(segments[activeIndex].pct)}%)`}
                </span>
              </div>
            ) : (
              segments.map((seg, i) => (
                <div key={seg.key ?? i} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: seg.color }} />
                  <span className={styles.legendLabel}>
                    {seg.label}
                    {showPercentage && ` (${Math.round(seg.pct)}%)`}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Split.displayName = 'Chart.Split';
}
