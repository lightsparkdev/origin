'use client';

import * as React from 'react';
import clsx from 'clsx';
import { useResizeWidth } from './hooks';
import { SERIES_COLORS } from './types';
import styles from './Chart.module.scss';

export interface PieSegment {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: PieSegment[];
  height?: number;
  /** Render as a donut chart with an inner radius ratio (0-1). `true` defaults to 0.6. */
  donut?: boolean | number;
  /** Show a legend sidebar. */
  legend?: boolean;
  /** Show tooltip on hover. */
  tooltip?: boolean;
  ariaLabel?: string;
  formatValue?: (value: number) => string;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function arcPath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startAngle: number, endAngle: number,
): string {
  const sweep = endAngle - startAngle;
  const largeArc = sweep > Math.PI ? 1 : 0;

  if (sweep >= Math.PI * 2 - 0.001) {
    const mid = startAngle + Math.PI;
    const path1 = arcPath(cx, cy, outerR, innerR, startAngle, mid);
    const path2 = arcPath(cx, cy, outerR, innerR, mid, endAngle - 0.001);
    return path1 + ' ' + path2;
  }

  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);

  if (innerR > 0) {
    const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
      'Z',
    ].join(' ');
  }

  return [
    `M ${cx} ${cy}`,
    `L ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    'Z',
  ].join(' ');
}

const SEGMENT_GAP = 0.02;

export const Pie = React.forwardRef<HTMLDivElement, PieChartProps>(
  function Pie(
    {
      data,
      height = 240,
      donut: donutProp = false,
      legend = true,
      tooltip: tooltipEnabled = true,
      ariaLabel,
      formatValue,
      className,
      ...props
    },
    ref,
  ) {
    const { width, attachRef } = useResizeWidth();
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        attachRef(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, attachRef],
    );

    const innerRatio = donutProp === true ? 0.6 : typeof donutProp === 'number' ? donutProp : 0;

    const total = React.useMemo(
      () => data.reduce((sum, d) => sum + Math.max(0, d.value), 0),
      [data],
    );

    const segments = React.useMemo(() => {
      if (total === 0) return [];
      const gap = data.length > 1 ? SEGMENT_GAP : 0;
      let angle = -Math.PI / 2;
      return data.map((d, i) => {
        const sweep = (d.value / total) * (Math.PI * 2 - gap * data.length);
        const startAngle = angle + gap / 2;
        const endAngle = startAngle + sweep;
        angle = endAngle + gap / 2;
        return {
          ...d,
          color: d.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
          startAngle,
          endAngle,
          percentage: (d.value / total) * 100,
        };
      });
    }, [data, total]);

    const legendWidth = legend ? 140 : 0;
    const svgSize = Math.min(width - legendWidth, height);
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const outerR = svgSize / 2 - 4;
    const innerR = outerR * innerRatio;

    const fmtValue = React.useCallback(
      (v: number) => (formatValue ? formatValue(v) : String(v)),
      [formatValue],
    );

    const ready = width > 0;

    const svgDesc = React.useMemo(() => {
      if (data.length === 0) return undefined;
      return `${donutProp ? 'Donut' : 'Pie'} chart with ${data.length} segments.`;
    }, [data.length, donutProp]);

    return (
      <div
        ref={mergedRef}
        className={clsx(styles.root, styles.pieRoot, className)}
        style={{ height }}
        {...props}
      >
        {ready && (
          <>
            <svg
              role="img"
              aria-label={ariaLabel ?? svgDesc ?? 'Pie chart'}
              width={svgSize}
              height={svgSize}
              className={styles.svg}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              {segments.map((seg, i) => (
                <path
                  key={i}
                  d={arcPath(cx, cy, outerR, innerR, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  fillOpacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                  stroke="var(--surface-primary)"
                  strokeWidth={1}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{ cursor: 'pointer', transition: 'fill-opacity 150ms ease' }}
                />
              ))}

              {donutProp && activeIndex !== null && tooltipEnabled && segments[activeIndex] && (
                <g>
                  <text
                    x={cx} y={cy - 6}
                    textAnchor="middle"
                    dominantBaseline="auto"
                    className={styles.pieCenter}
                  >
                    {fmtValue(segments[activeIndex].value)}
                  </text>
                  <text
                    x={cx} y={cy + 10}
                    textAnchor="middle"
                    dominantBaseline="auto"
                    className={styles.pieCenterLabel}
                  >
                    {segments[activeIndex].name}
                  </text>
                </g>
              )}
            </svg>

            {legend && (
              <div className={styles.pieLegend}>
                {segments.map((seg, i) => (
                  <div
                    key={i}
                    className={styles.pieLegendItem}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    style={{ opacity: activeIndex === null || activeIndex === i ? 1 : 0.4 }}
                  >
                    <span className={styles.pieLegendDot} style={{ backgroundColor: seg.color }} />
                    <span className={styles.pieLegendName}>{seg.name}</span>
                    <span className={styles.pieLegendValue}>{seg.percentage.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Pie.displayName = 'Chart.Pie';
}
