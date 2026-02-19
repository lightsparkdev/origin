'use client';

import * as React from 'react';
import clsx from 'clsx';
import {
  linearScale,
  niceTicks,
  monotonePath,
  linearPath,
  monotoneInterpolator,
  linearInterpolator,
  stackData,
  type Point,
} from './utils';
import { useResizeWidth, useChartScrub } from './hooks';
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

export interface StackedAreaChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, unknown>[];
  series: [Series, Series, ...Series[]];
  xKey?: string;
  height?: number;
  grid?: boolean;
  tooltip?: TooltipProp;
  curve?: 'monotone' | 'linear';
  fillOpacity?: number;
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

export const StackedArea = React.forwardRef<HTMLDivElement, StackedAreaChartProps>(
  function StackedArea(
    {
      data,
      series: seriesProp,
      xKey,
      height = 300,
      grid = false,
      tooltip: tooltipProp,
      curve = 'monotone',
      fillOpacity = 0.5,
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
    const uid = React.useId().replace(/:/g, '');

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
      () => resolveSeries(seriesProp, undefined, undefined),
      [seriesProp],
    );

    const showXAxis = Boolean(xKey);
    const showYAxis = grid;
    const padBottom = showXAxis ? PAD_BOTTOM_AXIS : 0;
    const padLeft = showYAxis ? PAD_LEFT_AXIS : 0;
    const plotWidth = Math.max(0, width - padLeft - PAD_RIGHT);
    const plotHeight = Math.max(0, height - PAD_TOP - padBottom);

    // Stack the data
    const stacked = React.useMemo(
      () => stackData(data, series.map((s) => s.key)),
      [data, series],
    );

    // Y domain from stacked totals
    const { yMin, yMax, yTicks } = React.useMemo(() => {
      let max = -Infinity;
      for (const band of stacked) {
        for (const v of band.topline) {
          if (v > max) max = v;
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
    }, [stacked, referenceLines]);

    // Compute pixel points for top edge of each band (for interpolators and line paths)
    const bandTopPoints = React.useMemo(() => {
      if (plotWidth <= 0 || plotHeight <= 0 || data.length === 0) return [];
      return stacked.map((band) => {
        const points: Point[] = [];
        for (let i = 0; i < data.length; i++) {
          const x = data.length === 1 ? plotWidth / 2 : (i / (data.length - 1)) * plotWidth;
          const y = linearScale(band.topline[i], yMin, yMax, plotHeight, 0);
          points.push({ x, y });
        }
        return points;
      });
    }, [data.length, stacked, plotWidth, plotHeight, yMin, yMax]);

    // Compute pixel points for baseline of each band
    const bandBasePoints = React.useMemo(() => {
      if (plotWidth <= 0 || plotHeight <= 0 || data.length === 0) return [];
      return stacked.map((band) => {
        const points: Point[] = [];
        for (let i = 0; i < data.length; i++) {
          const x = data.length === 1 ? plotWidth / 2 : (i / (data.length - 1)) * plotWidth;
          const y = linearScale(band.baseline[i], yMin, yMax, plotHeight, 0);
          points.push({ x, y });
        }
        return points;
      });
    }, [data.length, stacked, plotWidth, plotHeight, yMin, yMax]);

    // Top edge paths (for stroke accent and interpolators)
    const topPaths = React.useMemo(() => {
      const build = curve === 'monotone' ? monotonePath : linearPath;
      return bandTopPoints.map((pts) => build(pts));
    }, [bandTopPoints, curve]);

    // Area paths: top edge left-to-right, then base edge right-to-left
    const areaPaths = React.useMemo(() => {
      const build = curve === 'monotone' ? monotonePath : linearPath;
      return bandTopPoints.map((topPts, i) => {
        if (topPts.length === 0) return '';
        const basePts = bandBasePoints[i];
        const topPath = build(topPts);
        const reversedBase = [...basePts].reverse();
        const basePath = build(reversedBase);
        return `${topPath} ${basePath.replace(/^M/, 'L')} Z`;
      });
    }, [bandTopPoints, bandBasePoints, curve]);

    // Interpolators on top edge of each band (for dot tracking)
    const interpolators = React.useMemo(() => {
      const build = curve === 'monotone' ? monotoneInterpolator : linearInterpolator;
      return bandTopPoints.map((pts) => build(pts));
    }, [bandTopPoints, curve]);

    const interpolatorsRef = React.useRef(interpolators);
    React.useLayoutEffect(() => {
      interpolatorsRef.current = interpolators;
    }, [interpolators]);

    const scrub = useChartScrub({
      dataLength: data.length,
      seriesCount: series.length,
      plotWidth,
      padLeft,
      tooltipMode,
      interpolatorsRef,
      data,
      onActiveChange,
    });

    // X axis labels
    const xLabels = React.useMemo(() => {
      if (!xKey || data.length === 0 || plotWidth <= 0) return [];
      const maxLabels = Math.max(2, Math.floor(plotWidth / 60));
      let indices: number[];
      if (data.length <= maxLabels) {
        indices = data.map((_, i) => i);
      } else {
        indices = [0];
        const step = (data.length - 1) / (maxLabels - 1);
        for (let i = 1; i < maxLabels - 1; i++) indices.push(Math.round(i * step));
        indices.push(data.length - 1);
      }
      return indices.map((i) => {
        const x = data.length === 1 ? plotWidth / 2 : (i / (data.length - 1)) * plotWidth;
        const raw = data[i][xKey];
        const text = formatXLabel ? formatXLabel(raw) : String(raw ?? '');
        return { x, text, index: i };
      });
    }, [xKey, data, plotWidth, formatXLabel]);

    // Y axis labels
    const yLabels = React.useMemo(() => {
      if (!showYAxis || plotHeight <= 0) return [];
      return yTicks.map((v) => ({
        y: linearScale(v, yMin, yMax, plotHeight, 0),
        text: formatYLabel ? formatYLabel(v) : String(v),
      }));
    }, [showYAxis, yTicks, yMin, yMax, plotHeight, formatYLabel]);

    const fmtValue = React.useCallback(
      (v: number) => (formatValue ? formatValue(v) : String(v)),
      [formatValue],
    );

    const ready = width > 0;

    const svgDesc = React.useMemo(() => {
      if (series.length === 0 || data.length === 0) return undefined;
      const names = series.map((s) => s.label).join(', ');
      return `Stacked area chart with ${data.length} data points showing ${names}.`;
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
              aria-label={ariaLabel ?? svgDesc ?? 'Stacked area chart'}
              width={width}
              height={height}
              className={styles.svg}
              onMouseMove={scrub.handleMouseMove}
              onMouseLeave={scrub.hideHover}
              onTouchStart={scrub.handleTouchStart}
              onTouchMove={scrub.handleTouchMove}
              onTouchEnd={scrub.hideHover}
              onTouchCancel={scrub.hideHover}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              <defs>
                <clipPath id={`${uid}-clip-active`}>
                  <rect ref={scrub.clipLeftRef} x={0} y={-PAD_TOP} width={plotWidth + PAD_RIGHT} height={height} />
                </clipPath>
                <clipPath id={`${uid}-clip-inactive`}>
                  <rect ref={scrub.clipRightRef} x={plotWidth + PAD_RIGHT} y={-PAD_TOP} width={0} height={height} />
                </clipPath>
              </defs>

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

                {/* Stacked area bands — rendered bottom to top, active color clipped left */}
                <g clipPath={`url(#${uid}-clip-active)`}>
                  {areaPaths.map((d, i) =>
                    d ? (
                      <path key={`${series[i].key}-area`} d={d} fill={series[i].color} fillOpacity={fillOpacity} stroke="none" />
                    ) : null,
                  )}
                  {topPaths.map((d, i) =>
                    d ? (
                      <path key={`${series[i].key}-edge`} d={d} fill="none" stroke={series[i].color} strokeWidth={1} strokeOpacity={0.6} strokeLinejoin="round" />
                    ) : null,
                  )}
                </g>
                {/* Inactive muted version */}
                <g clipPath={`url(#${uid}-clip-inactive)`} opacity={0.4}>
                  {areaPaths.map((d, i) =>
                    d ? (
                      <path key={`${series[i].key}-area-inactive`} d={d} fill={series[i].color} fillOpacity={fillOpacity} stroke="none" />
                    ) : null,
                  )}
                  {topPaths.map((d, i) =>
                    d ? (
                      <path key={`${series[i].key}-edge-inactive`} d={d} fill="none" stroke={series[i].color} strokeWidth={1} strokeOpacity={0.6} strokeLinejoin="round" />
                    ) : null,
                  )}
                </g>

                <line
                  ref={scrub.cursorRef}
                  x1={0} y1={0} x2={0} y2={plotHeight}
                  className={styles.cursorLine}
                  style={{ display: 'none' }}
                />

                {series.map((s, i) => (
                  <rect
                    key={s.key}
                    ref={(el) => { scrub.dotRefs.current[i] = el; }}
                    x={0} y={0} width={8} height={8} rx={2}
                    fill={s.color}
                    className={styles.activeDot}
                    style={{ display: 'none' }}
                  />
                ))}

                {yLabels.map(({ y, text }, i) => (
                  <text key={i} x={-8} y={y} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                    {text}
                  </text>
                ))}

                {xLabels.map(({ x, text, index: labelIndex }, i) => (
                  <text
                    key={`${labelIndex}-${text}`}
                    x={x}
                    y={plotHeight + 20}
                    className={styles.axisLabel}
                    textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}
                    dominantBaseline="auto"
                  >
                    {text}
                  </text>
                ))}
              </g>
            </svg>

            {showTooltip && (
              <div
                ref={scrub.tooltipRef}
                className={clsx(
                  styles.tooltip,
                  tooltipMode === 'simple' && styles.tooltipSimple,
                  tooltipMode === 'compact' && styles.tooltipCompact,
                )}
                style={{
                  position: 'absolute',
                  top: PAD_TOP,
                  left: 0,
                  pointerEvents: 'none',
                  display: 'none',
                }}
              >
                {scrub.activeIndex !== null &&
                  scrub.activeIndex < data.length &&
                  (tooltipMode === 'custom' && tooltipRender ? (
                    tooltipRender(data[scrub.activeIndex], series)
                  ) : (
                    <>
                      {xKey && (
                        <p className={styles.tooltipLabel}>
                          {formatXLabel
                            ? formatXLabel(data[scrub.activeIndex][xKey])
                            : String(data[scrub.activeIndex][xKey] ?? '')}
                        </p>
                      )}
                      <div className={styles.tooltipItems}>
                        {series.map((s) => {
                          const v = Number(data[scrub.activeIndex!][s.key]);
                          return (
                            <div key={s.key} className={styles.tooltipItem}>
                              <span className={styles.tooltipIndicator} style={{ backgroundColor: s.color }} />
                              <span className={styles.tooltipName}>{s.label}</span>
                              <span className={styles.tooltipValue}>{isNaN(v) ? '--' : fmtValue(v)}</span>
                            </div>
                          );
                        })}
                        <div className={styles.tooltipItem} style={{ borderTop: '1px solid var(--border-tertiary)', paddingTop: 4, marginTop: 2 }}>
                          <span className={styles.tooltipIndicator} style={{ visibility: 'hidden' }} />
                          <span className={styles.tooltipName}>Total</span>
                          <span className={styles.tooltipValue}>
                            {fmtValue(series.reduce((sum, s) => sum + (Number(data[scrub.activeIndex!][s.key]) || 0), 0))}
                          </span>
                        </div>
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
  StackedArea.displayName = 'Chart.StackedArea';
}
