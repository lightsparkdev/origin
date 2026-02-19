'use client';

import * as React from 'react';
import clsx from 'clsx';
import { linearScale, niceTicks } from './utils';
import { useResizeWidth } from './hooks';
import {
  type Series,
  type ResolvedSeries,
  type TooltipProp,
  type ReferenceLine,
  PAD_TOP,
  PAD_RIGHT,
  PAD_BOTTOM_AXIS,
  PAD_LEFT_AXIS,
  resolveTooltipMode,
  resolveSeries,
} from './types';
import styles from './Chart.module.scss';

export interface BarChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, unknown>[];
  dataKey?: string;
  series?: Series[];
  xKey?: string;
  height?: number;
  grid?: boolean;
  tooltip?: TooltipProp;
  /** Stack bars on top of each other instead of side by side. */
  stacked?: boolean;
  /** Stroke color shorthand for single-series charts using `dataKey`. */
  color?: string;
  /** Corner radius on bar tops. */
  barRadius?: number;
  /** Horizontal reference lines at specific y-values. */
  referenceLines?: ReferenceLine[];
  ariaLabel?: string;
  onActiveChange?: (
    index: number | null,
    datum: Record<string, unknown> | null,
  ) => void;
  formatValue?: (value: number) => string;
  formatXLabel?: (value: unknown) => string;
  formatYLabel?: (value: number) => string;
}

const GROUP_GAP = 0.3;
const BAR_GAP = 2;

export const Bar = React.forwardRef<HTMLDivElement, BarChartProps>(
  function Bar(
    {
      data,
      dataKey,
      series: seriesProp,
      xKey,
      height = 300,
      grid = false,
      tooltip: tooltipProp,
      stacked = false,
      color,
      barRadius = 2,
      referenceLines,
      ariaLabel,
      onActiveChange,
      formatValue,
      formatXLabel,
      formatYLabel,
      className,
      ...props
    },
    ref,
  ) {
    const { width, attachRef } = useResizeWidth();
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const tooltipMode = resolveTooltipMode(tooltipProp);
    const showTooltip = tooltipMode !== 'off';
    const tooltipRender =
      typeof tooltipProp === 'function' ? tooltipProp : undefined;

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        attachRef(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, attachRef],
    );

    const series = React.useMemo<ResolvedSeries[]>(
      () => resolveSeries(seriesProp, dataKey, color),
      [seriesProp, dataKey, color],
    );

    const showXAxis = Boolean(xKey);
    const showYAxis = grid;
    const padBottom = showXAxis ? PAD_BOTTOM_AXIS : 0;
    const padLeft = showYAxis ? PAD_LEFT_AXIS : 0;
    const plotWidth = Math.max(0, width - padLeft - PAD_RIGHT);
    const plotHeight = Math.max(0, height - PAD_TOP - padBottom);

    // Y domain
    const { yMin, yMax, yTicks } = React.useMemo(() => {
      let max = -Infinity;
      if (stacked) {
        for (let i = 0; i < data.length; i++) {
          let sum = 0;
          for (const s of series) {
            sum += Number(data[i][s.key]) || 0;
          }
          if (sum > max) max = sum;
        }
      } else {
        for (const s of series) {
          for (const d of data) {
            const v = Number(d[s.key]);
            if (!isNaN(v) && v > max) max = v;
          }
        }
      }
      if (referenceLines) {
        for (const rl of referenceLines) {
          if (rl.value > max) max = rl.value;
        }
      }
      if (max === -Infinity) max = 1;
      const result = niceTicks(0, max, 5);
      return { yMin: result.min, yMax: result.max, yTicks: result.ticks };
    }, [data, series, stacked, referenceLines]);

    // Bar geometry
    const slotWidth = data.length > 0 ? plotWidth / data.length : 0;
    const groupWidth = slotWidth * (1 - GROUP_GAP);
    const barWidth = stacked
      ? groupWidth
      : Math.max(1, (groupWidth - BAR_GAP * (series.length - 1)) / series.length);

    // Y axis labels
    const yLabels = React.useMemo(() => {
      if (!showYAxis || plotHeight <= 0) return [];
      return yTicks.map((v) => ({
        y: linearScale(v, yMin, yMax, plotHeight, 0),
        text: formatYLabel ? formatYLabel(v) : String(v),
      }));
    }, [showYAxis, yTicks, yMin, yMax, plotHeight, formatYLabel]);

    // Hover
    const onActiveChangeRef = React.useRef(onActiveChange);
    React.useLayoutEffect(() => {
      onActiveChangeRef.current = onActiveChange;
    }, [onActiveChange]);

    React.useEffect(() => {
      onActiveChangeRef.current?.(
        activeIndex,
        activeIndex !== null && activeIndex < data.length ? data[activeIndex] : null,
      );
    }, [activeIndex, data]);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        if (data.length === 0 || plotWidth <= 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const rawX = e.clientX - rect.left - padLeft;
        const idx = Math.max(0, Math.min(data.length - 1, Math.floor(rawX / slotWidth)));
        setActiveIndex((prev) => (prev === idx ? prev : idx));

        const tip = tooltipRef.current;
        if (tip) {
          const absX = padLeft + (idx + 0.5) * slotWidth;
          const isLeftHalf = rawX <= plotWidth / 2;
          tip.style.left = `${absX}px`;
          tip.style.transform = isLeftHalf
            ? 'translateX(12px)'
            : 'translateX(calc(-100% - 12px))';
          tip.style.display = '';
        }
      },
      [data.length, plotWidth, padLeft, slotWidth],
    );

    const handleMouseLeave = React.useCallback(() => {
      setActiveIndex(null);
      const tip = tooltipRef.current;
      if (tip) tip.style.display = 'none';
    }, []);

    const fmtValue = React.useCallback(
      (v: number) => (formatValue ? formatValue(v) : String(v)),
      [formatValue],
    );

    const ready = width > 0;

    const svgDesc = React.useMemo(() => {
      if (series.length === 0 || data.length === 0) return undefined;
      const names = series.map((s) => s.label).join(', ');
      return `Bar chart with ${data.length} data points showing ${names}.`;
    }, [series, data.length]);

    return (
      <div
        ref={mergedRef}
        className={clsx(styles.root, className)}
        style={{ height }}
        {...props}
      >
        {ready && (
          <>
            <svg
              role="img"
              aria-label={ariaLabel ?? svgDesc ?? 'Bar chart'}
              width={width}
              height={height}
              className={styles.svg}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              <g transform={`translate(${padLeft},${PAD_TOP})`}>
                {grid &&
                  yLabels.map(({ y }, i) => (
                    <line key={i} x1={0} y1={y} x2={plotWidth} y2={y} className={styles.gridLine} />
                  ))}

                {/* Reference lines */}
                {referenceLines?.map((rl, i) => {
                  const ry = linearScale(rl.value, yMin, yMax, plotHeight, 0);
                  const rlColor = rl.color ?? 'var(--text-primary)';
                  return (
                    <g key={`ref-${i}`} className={styles.referenceLine}>
                      <line
                        x1={0} y1={ry} x2={plotWidth} y2={ry}
                        stroke={rlColor} strokeOpacity={0.15} strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                      {rl.label && (
                        <text
                          x={plotWidth} y={ry - 5} textAnchor="end"
                          className={styles.referenceLineLabel}
                          fill={rlColor} fillOpacity={0.45}
                        >
                          {rl.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Bars */}
                {data.map((d, di) => {
                  const slotX = di * slotWidth + (slotWidth - groupWidth) / 2;
                  const isActive = activeIndex === null || activeIndex === di;

                  if (stacked) {
                    let cumY = 0;
                    return (
                      <g key={di} opacity={isActive ? 1 : 0.4}>
                        {series.map((s, si) => {
                          const v = Number(d[s.key]) || 0;
                          const barH = (v / (yMax - yMin)) * plotHeight;
                          cumY += v;
                          const barY = linearScale(cumY, yMin, yMax, plotHeight, 0);
                          const isTop = si === series.length - 1;
                          return (
                            <rect
                              key={s.key}
                              x={slotX}
                              y={barY}
                              width={barWidth}
                              height={Math.max(0, barH)}
                              rx={isTop ? barRadius : 0}
                              fill={s.color}
                            />
                          );
                        })}
                      </g>
                    );
                  }

                  return (
                    <g key={di} opacity={isActive ? 1 : 0.4}>
                      {series.map((s, si) => {
                        const v = Number(d[s.key]) || 0;
                        const barH = (v / (yMax - yMin)) * plotHeight;
                        const barY = plotHeight - barH;
                        const barX = slotX + si * (barWidth + BAR_GAP);
                        return (
                          <rect
                            key={s.key}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={Math.max(0, barH)}
                            rx={barRadius}
                            fill={s.color}
                          />
                        );
                      })}
                    </g>
                  );
                })}

                {/* Y axis labels */}
                {yLabels.map(({ y, text }, i) => (
                  <text key={i} x={-8} y={y} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                    {text}
                  </text>
                ))}

                {/* X axis labels */}
                {xKey &&
                  data.map((d, i) => (
                    <text
                      key={i}
                      x={(i + 0.5) * slotWidth}
                      y={plotHeight + 20}
                      className={styles.axisLabel}
                      textAnchor="middle"
                      dominantBaseline="auto"
                    >
                      {formatXLabel ? formatXLabel(d[xKey]) : String(d[xKey] ?? '')}
                    </text>
                  ))}
              </g>
            </svg>

            {showTooltip && (
              <div
                ref={tooltipRef}
                className={styles.tooltip}
                style={{
                  position: 'absolute',
                  top: PAD_TOP,
                  left: 0,
                  pointerEvents: 'none',
                  display: 'none',
                }}
              >
                {activeIndex !== null &&
                  activeIndex < data.length &&
                  (tooltipMode === 'custom' && tooltipRender ? (
                    tooltipRender(data[activeIndex], series)
                  ) : (
                    <>
                      {xKey && (
                        <p className={styles.tooltipLabel}>
                          {formatXLabel
                            ? formatXLabel(data[activeIndex][xKey])
                            : String(data[activeIndex][xKey] ?? '')}
                        </p>
                      )}
                      <div className={styles.tooltipItems}>
                        {series.map((s) => {
                          const v = Number(data[activeIndex!][s.key]);
                          return (
                            <div key={s.key} className={styles.tooltipItem}>
                              <span className={styles.tooltipIndicator} style={{ backgroundColor: s.color }} />
                              <span className={styles.tooltipName}>{s.label}</span>
                              <span className={styles.tooltipValue}>{isNaN(v) ? '--' : fmtValue(v)}</span>
                            </div>
                          );
                        })}
                        {stacked && series.length > 1 && (
                          <div className={styles.tooltipItem} style={{ borderTop: '1px solid var(--border-tertiary)', paddingTop: 4, marginTop: 2 }}>
                            <span className={styles.tooltipIndicator} style={{ visibility: 'hidden' }} />
                            <span className={styles.tooltipName}>Total</span>
                            <span className={styles.tooltipValue}>
                              {fmtValue(series.reduce((sum, s) => sum + (Number(data[activeIndex!][s.key]) || 0), 0))}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
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
  Bar.displayName = 'Chart.Bar';
}
