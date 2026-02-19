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
  type Point,
} from './utils';
import { useResizeWidth, useChartScrub } from './hooks';
import {
  type Series,
  type ResolvedSeries,
  type TooltipProp,
  type ReferenceLine,
  SERIES_COLORS,
  DASH_PATTERNS,
  PAD_TOP,
  PAD_RIGHT,
  PAD_BOTTOM_AXIS,
  PAD_LEFT_AXIS,
  BAR_GROUP_GAP,
  BAR_ITEM_GAP,
  resolveTooltipMode,
} from './types';
import { ChartWrapper } from './ChartWrapper';
import styles from './Chart.module.scss';

export interface ComposedSeries extends Series {
  /** Render this series as bars or a line. */
  type: 'bar' | 'line';
  /** Which Y axis this series binds to. Default: 'left'. */
  axis?: 'left' | 'right';
}

type ResolvedComposedSeries = {
  key: string;
  label: string;
  color: string;
  style: 'solid' | 'dashed' | 'dotted';
  type: 'bar' | 'line';
  axis: 'left' | 'right';
};

export interface ComposedChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, unknown>[];
  series: ComposedSeries[];
  xKey?: string;
  height?: number;
  grid?: boolean;
  tooltip?: TooltipProp;
  curve?: 'monotone' | 'linear';
  /** Reference lines on the left Y axis. */
  referenceLines?: ReferenceLine[];
  /** Show legend below chart. */
  legend?: boolean;
  /** Show loading skeleton. */
  loading?: boolean;
  /** Content when data is empty. */
  empty?: React.ReactNode;
  /** Control animation. */
  animate?: boolean;
  ariaLabel?: string;
  onActiveChange?: (
    index: number | null,
    datum: Record<string, unknown> | null,
  ) => void;
  /** Called when a data point is clicked. */
  onClickDatum?: (
    index: number,
    datum: Record<string, unknown>,
  ) => void;
  formatValue?: (value: number) => string;
  formatXLabel?: (value: unknown) => string;
  formatYLabel?: (value: number) => string;
  /** Formatter for the right Y axis labels. */
  formatYLabelRight?: (value: number) => string;
}

const PAD_RIGHT_DUAL = PAD_LEFT_AXIS;

export const Composed = React.forwardRef<HTMLDivElement, ComposedChartProps>(
  function Composed(
    {
      data,
      series: seriesProp,
      xKey,
      height = 300,
      grid = false,
      tooltip: tooltipProp,
      curve = 'monotone',
      referenceLines,
      legend,
      loading,
      empty,
      animate = true,
      ariaLabel,
      onActiveChange,
      onClickDatum,
      formatValue,
      formatXLabel,
      formatYLabel,
      formatYLabelRight,
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

    // Resolve series
    const series = React.useMemo<ResolvedComposedSeries[]>(
      () =>
        seriesProp.map((s, i) => ({
          key: s.key,
          label: s.label ?? s.key,
          color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
          style: s.style ?? 'solid',
          type: s.type,
          axis: s.axis ?? 'left',
        })),
      [seriesProp],
    );

    const barSeries = React.useMemo(() => series.filter((s) => s.type === 'bar'), [series]);
    const lineSeries = React.useMemo(() => series.filter((s) => s.type === 'line'), [series]);
    const hasRightAxis = React.useMemo(() => series.some((s) => s.axis === 'right'), [series]);

    // Geometry
    const showXAxis = Boolean(xKey);
    const showYAxis = grid;
    const padBottom = showXAxis ? PAD_BOTTOM_AXIS : 0;
    const padLeft = showYAxis ? PAD_LEFT_AXIS : 0;
    const padRight = hasRightAxis ? PAD_RIGHT_DUAL : PAD_RIGHT;
    const plotWidth = Math.max(0, width - padLeft - padRight);
    const plotHeight = Math.max(0, height - PAD_TOP - padBottom);

    // Left Y domain (bar series + left-axis lines)
    const leftDomain = React.useMemo(() => {
      let max = -Infinity;
      for (const s of series.filter((s) => s.axis === 'left')) {
        for (const d of data) {
          const v = Number(d[s.key]);
          if (!isNaN(v) && v > max) max = v;
        }
      }
      if (referenceLines) {
        for (const rl of referenceLines) {
          if (rl.value > max) max = rl.value;
        }
      }
      if (max === -Infinity) max = 1;
      return niceTicks(0, max, 5);
    }, [data, series, referenceLines]);

    // Right Y domain (right-axis lines)
    const rightDomain = React.useMemo(() => {
      if (!hasRightAxis) return { min: 0, max: 1, ticks: [0, 1] };
      let min = Infinity;
      let max = -Infinity;
      for (const s of series.filter((s) => s.axis === 'right')) {
        for (const d of data) {
          const v = Number(d[s.key]);
          if (!isNaN(v)) {
            if (v < min) min = v;
            if (v > max) max = v;
          }
        }
      }
      if (min === Infinity) return { min: 0, max: 1, ticks: [0, 1] };
      return niceTicks(min, max, 5);
    }, [data, series, hasRightAxis]);

    // Bar geometry
    const slotWidth = data.length > 0 ? plotWidth / data.length : 0;
    const groupWidth = slotWidth * (1 - BAR_GROUP_GAP);
    const barWidth = barSeries.length > 0
      ? Math.max(1, (groupWidth - BAR_ITEM_GAP * (barSeries.length - 1)) / barSeries.length)
      : 0;

    // Line points and paths
    const linePoints = React.useMemo(() => {
      if (plotWidth <= 0 || plotHeight <= 0 || data.length === 0) return [];
      return lineSeries.map((s) => {
        const domain = s.axis === 'right' ? rightDomain : leftDomain;
        const points: Point[] = [];
        for (let i = 0; i < data.length; i++) {
          const v = Number(data[i][s.key]);
          if (isNaN(v)) continue;
          const x = data.length === 1
            ? plotWidth / 2
            : (i + 0.5) * slotWidth;
          const y = linearScale(v, domain.min, domain.max, plotHeight, 0);
          points.push({ x, y });
        }
        return points;
      });
    }, [data, lineSeries, plotWidth, plotHeight, slotWidth, leftDomain, rightDomain]);

    const linePaths = React.useMemo(() => {
      const build = curve === 'monotone' ? monotonePath : linearPath;
      return linePoints.map((pts) => build(pts));
    }, [linePoints, curve]);

    // Interpolators for line dot tracking
    const interpolators = React.useMemo(() => {
      const build = curve === 'monotone' ? monotoneInterpolator : linearInterpolator;
      return linePoints.map((pts) => build(pts));
    }, [linePoints, curve]);

    const interpolatorsRef = React.useRef(interpolators);
    React.useLayoutEffect(() => {
      interpolatorsRef.current = interpolators;
    }, [interpolators]);

    // Scrub
    const scrub = useChartScrub({
      dataLength: data.length,
      seriesCount: lineSeries.length,
      plotWidth,
      padLeft,
      tooltipMode,
      interpolatorsRef,
      data,
      onActiveChange,
    });

    // Y axis labels
    const yLabelsLeft = React.useMemo(() => {
      if (!showYAxis || plotHeight <= 0) return [];
      return leftDomain.ticks.map((v) => ({
        y: linearScale(v, leftDomain.min, leftDomain.max, plotHeight, 0),
        text: formatYLabel ? formatYLabel(v) : String(v),
      }));
    }, [showYAxis, leftDomain, plotHeight, formatYLabel]);

    const yLabelsRight = React.useMemo(() => {
      if (!hasRightAxis || !showYAxis || plotHeight <= 0) return [];
      return rightDomain.ticks.map((v) => ({
        y: linearScale(v, rightDomain.min, rightDomain.max, plotHeight, 0),
        text: formatYLabelRight ? formatYLabelRight(v) : String(v),
      }));
    }, [hasRightAxis, showYAxis, rightDomain, plotHeight, formatYLabelRight]);

    const fmtValue = React.useCallback(
      (v: number) => (formatValue ? formatValue(v) : String(v)),
      [formatValue],
    );

    const ready = width > 0;

    const handleClick = React.useCallback(() => {
      if (!onClickDatum || scrub.activeIndex === null || scrub.activeIndex >= data.length) return;
      onClickDatum(scrub.activeIndex, data[scrub.activeIndex]);
    }, [onClickDatum, scrub.activeIndex, data]);

    const svgDesc = React.useMemo(() => {
      if (series.length === 0 || data.length === 0) return undefined;
      const names = series.map((s) => s.label).join(', ');
      return `Composed chart with ${data.length} data points showing ${names}.`;
    }, [series, data.length]);

    const ariaLiveContent = React.useMemo(() => {
      if (scrub.activeIndex === null || scrub.activeIndex >= data.length) return '';
      const d = data[scrub.activeIndex];
      const parts: string[] = [];
      if (xKey) parts.push(String(d[xKey] ?? ''));
      series.forEach((s) => {
        const v = Number(d[s.key]);
        parts.push(`${s.label}: ${isNaN(v) ? 'no data' : fmtValue(v)}`);
      });
      return parts.join(', ');
    }, [scrub.activeIndex, data, series, xKey, fmtValue]);

    const wrapperSeries = React.useMemo<ResolvedSeries[]>(
      () => series.map((s) => ({ key: s.key, label: s.label, color: s.color, style: s.style })),
      [series],
    );

    return (
      <ChartWrapper
        loading={loading}
        empty={empty}
        dataLength={data.length}
        height={height}
        legend={legend}
        series={wrapperSeries}
        activeIndex={scrub.activeIndex}
        ariaLiveContent={ariaLiveContent}
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
              aria-label={ariaLabel ?? svgDesc ?? 'Composed chart'}
              tabIndex={0}
              width={width}
              height={height}
              className={styles.svg}
              onMouseMove={scrub.handleMouseMove}
              onMouseLeave={scrub.hideHover}
              onTouchStart={scrub.handleTouchStart}
              onTouchMove={scrub.handleTouchMove}
              onTouchEnd={scrub.hideHover}
              onTouchCancel={scrub.hideHover}
              onKeyDown={scrub.handleKeyDown}
              onClick={onClickDatum ? handleClick : undefined}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              <g transform={`translate(${padLeft},${PAD_TOP})`}>
                {/* Grid lines from left axis */}
                {grid &&
                  yLabelsLeft.map(({ y }, i) => (
                    <line key={i} x1={0} y1={y} x2={plotWidth} y2={y} className={styles.gridLine} />
                  ))}

                {/* Reference lines */}
                {referenceLines?.map((rl, i) => {
                  const ry = linearScale(rl.value, leftDomain.min, leftDomain.max, plotHeight, 0);
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
                  const delay = Math.min(di * 40, 400);
                  return (
                    <g key={di}>
                      {barSeries.map((s, si) => {
                        const v = Number(d[s.key]) || 0;
                        const domain = s.axis === 'right' ? rightDomain : leftDomain;
                        const barH = ((v - domain.min) / (domain.max - domain.min)) * plotHeight;
                        const barY = plotHeight - barH;
                        const barX = slotX + si * (barWidth + BAR_ITEM_GAP);
                        return (
                          <rect
                            key={s.key}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={Math.max(0, barH)}
                            fill={s.color}
                            className={clsx(animate && styles.barAnimate)}
                            style={animate ? { animationDelay: `${delay}ms` } : undefined}
                          />
                        );
                      })}
                    </g>
                  );
                })}

                {/* Line paths */}
                {linePaths.map((d, i) => {
                  const s = lineSeries[i];
                  const isDashed = s.style !== 'solid';
                  return (
                    <path
                      key={s.key}
                      d={d}
                      pathLength={animate && !isDashed ? 1 : undefined}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={isDashed ? 1 : 2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={DASH_PATTERNS[s.style]}
                      className={clsx(animate && !isDashed && styles.lineAnimate)}
                    />
                  );
                })}

                {/* Cursor line */}
                <line
                  ref={scrub.cursorRef}
                  x1={0} y1={0} x2={0} y2={plotHeight}
                  className={styles.cursorLine}
                  style={{ display: 'none' }}
                />

                {/* Line dots */}
                {lineSeries.map((s, i) => (
                  <circle
                    key={s.key}
                    ref={(el) => { scrub.dotRefs.current[i] = el; }}
                    cx={0} cy={0} r={3}
                    fill={s.color}
                    className={styles.activeDot}
                    style={{ display: 'none' }}
                  />
                ))}

                {/* Left Y axis labels */}
                {yLabelsLeft.map(({ y, text }, i) => (
                  <text key={i} x={-8} y={y} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                    {text}
                  </text>
                ))}

                {/* Right Y axis labels */}
                {yLabelsRight.map(({ y, text }, i) => (
                  <text key={i} x={plotWidth + 8} y={y} className={styles.axisLabel} textAnchor="start" dominantBaseline="middle">
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
                ref={scrub.tooltipRef}
                className={styles.tooltip}
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
                    tooltipRender(
                      data[scrub.activeIndex],
                      series.map((s) => ({ key: s.key, label: s.label, color: s.color, style: s.style })),
                    )
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
  Composed.displayName = 'Chart.Composed';
}
