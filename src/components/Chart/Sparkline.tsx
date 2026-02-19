'use client';

import * as React from 'react';
import clsx from 'clsx';
import { linearScale, niceTicks } from './utils';
import { useResizeWidth } from './hooks';
import { SERIES_COLORS } from './types';
import { Line, type LineChartProps } from './LineChart';
import styles from './Chart.module.scss';

export interface SparklineProps
  extends Omit<LineChartProps, 'grid' | 'tooltip' | 'interactive' | 'xKey' | 'animate'> {
  /** Render as a line (default) or micro bar chart. */
  variant?: 'line' | 'bar';
}

const SparklineBar = React.forwardRef<HTMLDivElement, SparklineProps>(
  function SparklineBar(
    { data, dataKey, color, height = 40, className, ...props },
    ref,
  ) {
    const { width, attachRef } = useResizeWidth();

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        attachRef(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, attachRef],
    );

    const key = dataKey ?? 'value';
    const barColor = color ?? SERIES_COLORS[0];

    const { yMin, yMax } = React.useMemo(() => {
      let min = Infinity;
      let max = -Infinity;
      for (const d of data) {
        const v = Number(d[key]);
        if (!isNaN(v)) {
          if (v < min) min = v;
          if (v > max) max = v;
        }
      }
      if (min === Infinity) return { yMin: 0, yMax: 1 };
      const result = niceTicks(0, max, 5);
      return { yMin: result.min, yMax: result.max };
    }, [data, key]);

    const ready = width > 0;
    const barWidth = data.length > 0 ? width / data.length : 0;

    return (
      <div
        ref={mergedRef}
        className={clsx(styles.root, className)}
        style={{ height }}
        {...props}
      >
        {ready && (
          <svg
            role="img"
            aria-label="Sparkline bar chart"
            width={width}
            height={height}
            className={styles.svg}
          >
            {data.map((d, i) => {
              const v = Number(d[key]) || 0;
              const barH = linearScale(v, yMin, yMax, 0, height);
              return (
                <rect
                  key={i}
                  x={i * barWidth}
                  y={height - barH}
                  width={Math.max(0, barWidth - 0.5)}
                  height={Math.max(0, barH)}
                  fill={barColor}
                />
              );
            })}
          </svg>
        )}
      </div>
    );
  },
);

export const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  function Sparkline({ variant = 'line', ...props }, ref) {
    if (variant === 'bar') {
      return <SparklineBar ref={ref} {...props} />;
    }

    return (
      <Line
        ref={ref}
        height={40}
        strokeWidth={1.25}
        animate={false}
        interactive={false}
        {...props}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Sparkline.displayName = 'Chart.Sparkline';
}
