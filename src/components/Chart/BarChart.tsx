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
  resolveSeries,
} from './types';
import { ChartWrapper } from './ChartWrapper';
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
  /** Fixed Y-axis domain. Overrides auto-computed domain from data. */
  yDomain?: [number, number];
  /** Show legend below chart. */
  legend?: boolean;
  /** Show loading skeleton. */
  loading?: boolean;
  /** Content to display when data is empty. */
  empty?: React.ReactNode;
  /** Click handler called with the active data index and datum. */
  onClickDatum?: (index: number, datum: Record<string, unknown>) => void;
  /** Control bar mount animation. Defaults to `true`. */
  animate?: boolean;
  /** Per-data-point color override. Return a CSS color string to override `series.color`, or `undefined` to keep the default. */
  getBarColor?: (datum: Record<string, unknown>, index: number, seriesKey: string) => string | undefined;
  /** Bar orientation. Horizontal swaps axes — categories on Y, values on X. */
  orientation?: 'vertical' | 'horizontal';
}

const GROUP_GAP = 0.12;
const BAR_GAP = 1;

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
      referenceLines,
      ariaLabel,
      onActiveChange,
      formatValue,
      formatXLabel,
      formatYLabel,
      yDomain,
      legend,
      loading,
      empty,
      onClickDatum,
      animate = true,
      getBarColor,
      orientation = 'vertical',
      className,
      ...props
    },
    ref,
  ) {
    const { width, attachRef } = useResizeWidth();
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const tooltipRender =
      typeof tooltipProp === 'function' ? tooltipProp : undefined;
    const tooltipMode = tooltipRender
      ? 'custom' as const
      : tooltipProp === 'detailed'
        ? 'detailed' as const
        : tooltipProp
          ? 'value' as const
          : 'off' as const;
    const showTooltip = tooltipMode !== 'off';

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

    const isHorizontal = orientation === 'horizontal';
    const showCategoryAxis = Boolean(xKey);
    const showValueAxis = grid;

    const padBottom = !isHorizontal && showCategoryAxis ? PAD_BOTTOM_AXIS : 0;
    const padLeft = isHorizontal ? (showCategoryAxis ? 60 : 12) : (showValueAxis ? PAD_LEFT_AXIS : 0);
    const padRight = isHorizontal && showValueAxis ? 40 : PAD_RIGHT;
    const plotWidth = Math.max(0, width - padLeft - padRight);
    const plotHeight = Math.max(0, height - PAD_TOP - padBottom);

    // Value domain
    const { yMin, yMax, yTicks } = React.useMemo(() => {
      if (yDomain) {
        const result = niceTicks(yDomain[0], yDomain[1], 5);
        return { yMin: result.min, yMax: result.max, yTicks: result.ticks };
      }
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
    }, [data, series, stacked, referenceLines, yDomain]);

    // Bar geometry — slot is along the category axis, bar extends along the value axis
    const categoryLength = isHorizontal ? plotHeight : plotWidth;
    const slotSize = data.length > 0 ? categoryLength / data.length : 0;
    const groupSize = slotSize * (1 - GROUP_GAP);
    const barThickness = stacked
      ? groupSize
      : Math.max(1, (groupSize - BAR_GAP * (series.length - 1)) / series.length);

    // Value axis labels
    const valueLabels = React.useMemo(() => {
      if (!showValueAxis) return [];
      const axisLength = isHorizontal ? plotWidth : plotHeight;
      if (axisLength <= 0) return [];
      return yTicks.map((v) => ({
        pos: linearScale(v, yMin, yMax, isHorizontal ? 0 : axisLength, isHorizontal ? axisLength : 0),
        text: formatYLabel ? formatYLabel(v) : String(v),
      }));
    }, [showValueAxis, yTicks, yMin, yMax, plotHeight, plotWidth, formatYLabel, isHorizontal]);

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
        if (data.length === 0 || categoryLength <= 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const raw = isHorizontal
          ? e.clientY - rect.top - PAD_TOP
          : e.clientX - rect.left - padLeft;
        const idx = Math.max(0, Math.min(data.length - 1, Math.floor(raw / slotSize)));
        setActiveIndex((prev) => (prev === idx ? prev : idx));

        const tip = tooltipRef.current;
        if (tip) {
          if (isHorizontal) {
            const absY = PAD_TOP + (idx + 0.5) * slotSize;
            tip.style.top = `${absY}px`;
            tip.style.left = `${padLeft + plotWidth + 8}px`;
            tip.style.transform = 'none';
          } else {
            const absX = padLeft + (idx + 0.5) * slotSize;
            const isLeftHalf = raw <= categoryLength / 2;
            tip.style.left = `${absX}px`;
            tip.style.top = `${PAD_TOP}px`;
            tip.style.transform = isLeftHalf
              ? 'translateX(12px)'
              : 'translateX(calc(-100% - 12px))';
          }
          tip.style.display = '';
        }
      },
      [data.length, categoryLength, padLeft, slotSize, isHorizontal, plotWidth],
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

    const ariaLiveContent = React.useMemo(() => {
      if (activeIndex === null || activeIndex >= data.length) return '';
      const d = data[activeIndex];
      const parts: string[] = [];
      if (xKey) parts.push(String(d[xKey] ?? ''));
      series.forEach((s) => {
        const v = Number(d[s.key]);
        parts.push(`${s.label}: ${isNaN(v) ? 'no data' : fmtValue(v)}`);
      });
      return parts.join(', ');
    }, [activeIndex, data, series, xKey, fmtValue]);

    const handleClick = React.useCallback(() => {
      if (onClickDatum && activeIndex !== null && activeIndex < data.length) {
        onClickDatum(activeIndex, data[activeIndex]);
      }
    }, [onClickDatum, activeIndex, data]);

    return (
      <ChartWrapper
        loading={loading}
        empty={empty}
        dataLength={data.length}
        height={height}
        legend={legend}
        series={series}
        activeIndex={activeIndex}
        ariaLiveContent={showTooltip ? ariaLiveContent : undefined}
      >
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
              tabIndex={0}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={onClickDatum ? handleClick : undefined}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              <g transform={`translate(${padLeft},${PAD_TOP})`}>
                {/* Grid lines along value axis */}
                {grid &&
                  valueLabels.map(({ pos }, i) =>
                    isHorizontal ? (
                      <line key={i} x1={pos} y1={0} x2={pos} y2={plotHeight} className={styles.gridLine} />
                    ) : (
                      <line key={i} x1={0} y1={pos} x2={plotWidth} y2={pos} className={styles.gridLine} />
                    ),
                  )}

                {/* Reference lines */}
                {referenceLines?.map((rl, i) => {
                  const rlColor = rl.color ?? 'var(--text-primary)';
                  if (isHorizontal) {
                    const rx = linearScale(rl.value, yMin, yMax, 0, plotWidth);
                    return (
                      <g key={`ref-${i}`} className={styles.referenceLine}>
                        <line x1={rx} y1={0} x2={rx} y2={plotHeight} stroke={rlColor} strokeOpacity={0.15} strokeWidth={1} strokeDasharray="4 4" />
                        {rl.label && (
                          <text x={rx + 4} y={8} className={styles.referenceLineLabel} fill={rlColor} fillOpacity={0.45}>{rl.label}</text>
                        )}
                      </g>
                    );
                  }
                  const ry = linearScale(rl.value, yMin, yMax, plotHeight, 0);
                  return (
                    <g key={`ref-${i}`} className={styles.referenceLine}>
                      <line x1={0} y1={ry} x2={plotWidth} y2={ry} stroke={rlColor} strokeOpacity={0.15} strokeWidth={1} strokeDasharray="4 4" />
                      {rl.label && (
                        <text x={plotWidth} y={ry - 5} textAnchor="end" className={styles.referenceLineLabel} fill={rlColor} fillOpacity={0.45}>{rl.label}</text>
                      )}
                    </g>
                  );
                })}

                {/* Hover highlight */}
                {activeIndex !== null && (
                  isHorizontal ? (
                    <rect
                      x={0}
                      y={activeIndex * slotSize + (slotSize - groupSize) / 2}
                      width={plotWidth}
                      height={groupSize}
                      fill="var(--text-primary)"
                      fillOpacity={0.03}
                    />
                  ) : (
                    <rect
                      x={activeIndex * slotSize + (slotSize - groupSize) / 2}
                      y={0}
                      width={groupSize}
                      height={plotHeight}
                      fill="var(--text-primary)"
                      fillOpacity={0.03}
                    />
                  )
                )}

                {/* Bars */}
                {data.map((d, di) => {
                  const slotStart = di * slotSize + (slotSize - groupSize) / 2;
                  const delay = Math.min(di * 40, 400);

                  if (stacked) {
                    let cum = 0;
                    return (
                      <g key={di}>
                        {series.map((s) => {
                          const v = Number(d[s.key]) || 0;
                          cum += v;
                          const barFill = getBarColor?.(d, di, s.key) ?? s.color;
                          if (isHorizontal) {
                            const barW = (v / (yMax - yMin)) * plotWidth;
                            const barX = linearScale(cum - v, yMin, yMax, 0, plotWidth);
                            return (
                              <rect key={s.key} x={barX} y={slotStart} width={Math.max(0, barW)} height={barThickness} fill={barFill}
                                className={animate ? styles.barAnimate : undefined} style={animate ? { animationDelay: `${delay}ms` } : undefined} />
                            );
                          }
                          const barH = (v / (yMax - yMin)) * plotHeight;
                          const barY = linearScale(cum, yMin, yMax, plotHeight, 0);
                          return (
                            <rect key={s.key} x={slotStart} y={barY} width={barThickness} height={Math.max(0, barH)} fill={barFill}
                              className={animate ? styles.barAnimate : undefined} style={animate ? { animationDelay: `${delay}ms` } : undefined} />
                          );
                        })}
                      </g>
                    );
                  }

                  return (
                    <g key={di}>
                      {series.map((s, si) => {
                        const v = Number(d[s.key]) || 0;
                        const barFill = getBarColor?.(d, di, s.key) ?? s.color;
                        const barOffset = slotStart + si * (barThickness + BAR_GAP);
                        if (isHorizontal) {
                          const barW = (v / (yMax - yMin)) * plotWidth;
                          return (
                            <rect key={s.key} x={0} y={barOffset} width={Math.max(0, barW)} height={barThickness} fill={barFill}
                              className={animate ? styles.barAnimate : undefined} style={animate ? { animationDelay: `${delay}ms` } : undefined} />
                          );
                        }
                        const barH = (v / (yMax - yMin)) * plotHeight;
                        const barY = plotHeight - barH;
                        return (
                          <rect key={s.key} x={barOffset} y={barY} width={barThickness} height={Math.max(0, barH)} fill={barFill}
                            className={animate ? styles.barAnimate : undefined} style={animate ? { animationDelay: `${delay}ms` } : undefined} />
                        );
                      })}
                    </g>
                  );
                })}

                {/* Value axis labels */}
                {valueLabels.map(({ pos, text }, i) =>
                  isHorizontal ? (
                    <text key={i} x={pos} y={plotHeight + 20} className={styles.axisLabel} textAnchor="middle" dominantBaseline="auto">{text}</text>
                  ) : (
                    <text key={i} x={-8} y={pos} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">{text}</text>
                  ),
                )}

                {/* Category axis labels */}
                {xKey &&
                  data.map((d, i) =>
                    isHorizontal ? (
                      <text key={i} x={-8} y={(i + 0.5) * slotSize} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                        {formatXLabel ? formatXLabel(d[xKey]) : String(d[xKey] ?? '')}
                      </text>
                    ) : (
                      <text key={i} x={(i + 0.5) * slotSize} y={plotHeight + 20} className={styles.axisLabel} textAnchor="middle" dominantBaseline="auto">
                        {formatXLabel ? formatXLabel(d[xKey]) : String(d[xKey] ?? '')}
                      </text>
                    ),
                  )}
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
                          <div className={clsx(styles.tooltipItem, styles.tooltipFooter)}>
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
      </ChartWrapper>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Bar.displayName = 'Chart.Bar';
}
