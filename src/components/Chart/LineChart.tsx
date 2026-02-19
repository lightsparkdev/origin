// Figma: https://www.figma.com/design/3JvbUyTqbbPL8cCpwSX0j4/Origin-design-system?node-id=6338-2213

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
  PAD_TOP,
  PAD_RIGHT,
  PAD_BOTTOM_AXIS,
  PAD_LEFT_AXIS,
  DASH_PATTERNS,
  resolveTooltipMode,
  resolveSeries,
} from './types';
import styles from './Chart.module.scss';

export type { Series, TooltipProp, ReferenceLine };

export interface LineChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: Record<string, unknown>[];
  dataKey?: string;
  series?: Series[];
  xKey?: string;
  height?: number;
  grid?: boolean;
  /**
   * Controls the hover tooltip.
   * - `false` / omitted: no tooltip
   * - `true` / `"detailed"`: full tooltip with x-label, series dots, names, and values
   * - `"simple"`: timestamp-only tooltip (just the formatted x-label)
   * - `"compact"`: inline values with dot separators
   * - `(datum, series) => ReactNode`: custom render function
   */
  tooltip?: TooltipProp;
  curve?: 'monotone' | 'linear';
  strokeWidth?: number;
  /** Stroke color shorthand for single-series charts using `dataKey`. */
  color?: string;
  animate?: boolean;
  /**
   * Enable area fill under the line.
   * `true` for 0.2 default opacity, or a number for custom opacity.
   */
  fill?: boolean | number;
  /**
   * Fade line paths to transparent on the left edge.
   * `true` for 40 px default, or a number for a custom fade width in pixels.
   */
  fadeLeft?: boolean | number;
  /** Horizontal reference lines at specific y-values. */
  referenceLines?: ReferenceLine[];
  /** Accessible label for the chart SVG. */
  ariaLabel?: string;
  /** Disables scrub interaction, cursor, dots, and tooltip. Used by Sparkline. */
  interactive?: boolean;
  onActiveChange?: (
    index: number | null,
    datum: Record<string, unknown> | null,
  ) => void;
  formatValue?: (value: number) => string;
  formatXLabel?: (value: unknown) => string;
  formatYLabel?: (value: number) => string;
}

export const Line = React.forwardRef<HTMLDivElement, LineChartProps>(
  function Line(
    {
      data,
      dataKey,
      series: seriesProp,
      xKey,
      height = 300,
      grid = false,
      tooltip: tooltipProp,
      curve = 'monotone',
      strokeWidth = 2,
      color,
      animate = true,
      fill: fillProp,
      fadeLeft,
      referenceLines,
      ariaLabel,
      interactive = true,
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
    const showTooltip = interactive && tooltipMode !== 'off';
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

    if (process.env.NODE_ENV !== 'production') {
      if (color && seriesProp) {
        // eslint-disable-next-line no-console
        console.warn(
          'Chart.Line: `color` is ignored when `series` is provided. ' +
            'Set color on each series entry instead.',
        );
      }
    }

    const fillOpacity = fillProp === true ? 0.12 : typeof fillProp === 'number' ? fillProp : 0.08;

    // Chart area geometry
    const showXAxis = Boolean(xKey);
    const showYAxis = grid;
    const padBottom = showXAxis ? PAD_BOTTOM_AXIS : 0;
    const padLeft = showYAxis ? PAD_LEFT_AXIS : 0;
    const plotWidth = Math.max(0, width - padLeft - PAD_RIGHT);
    const plotHeight = Math.max(0, height - PAD_TOP - padBottom);

    // Left-edge fade
    const fadeWidth =
      fadeLeft === true ? 40 : typeof fadeLeft === 'number' ? fadeLeft : 0;
    const hasFade = fadeWidth > 0 && plotWidth > 0;
    const fadeMaskId = hasFade ? `${uid}-fade` : undefined;
    const clipActiveId = `${uid}-clip-active`;
    const clipInactiveId = `${uid}-clip-inactive`;

    // Y domain with nice ticks (include reference lines in domain)
    const { yMin, yMax, yTicks } = React.useMemo(() => {
      let min = Infinity;
      let max = -Infinity;
      for (const s of series) {
        for (const d of data) {
          const v = Number(d[s.key]);
          if (!isNaN(v)) {
            if (v < min) min = v;
            if (v > max) max = v;
          }
        }
      }
      if (referenceLines) {
        for (const rl of referenceLines) {
          if (rl.value < min) min = rl.value;
          if (rl.value > max) max = rl.value;
        }
      }
      if (min === Infinity) {
        return { yMin: 0, yMax: 1, yTicks: [0, 1] };
      }
      const result = niceTicks(min, max, 5);
      return { yMin: result.min, yMax: result.max, yTicks: result.ticks };
    }, [data, series, referenceLines]);

    // Compute pixel points for each series
    const seriesPoints = React.useMemo(() => {
      if (plotWidth <= 0 || plotHeight <= 0 || data.length === 0) return [];
      return series.map((s) => {
        const points: Point[] = [];
        for (let i = 0; i < data.length; i++) {
          const v = Number(data[i][s.key]);
          if (isNaN(v)) continue;
          const x =
            data.length === 1
              ? plotWidth / 2
              : (i / (data.length - 1)) * plotWidth;
          const y = linearScale(v, yMin, yMax, plotHeight, 0);
          points.push({ x, y });
        }
        return points;
      });
    }, [data, series, plotWidth, plotHeight, yMin, yMax]);

    // SVG paths
    const paths = React.useMemo(() => {
      const build = curve === 'monotone' ? monotonePath : linearPath;
      return seriesPoints.map((pts) => build(pts));
    }, [seriesPoints, curve]);

    // Area paths
    const areaPaths = React.useMemo(() => {
      return seriesPoints.map((pts, i) => {
        if (pts.length === 0) return '';
        const firstX = pts[0].x;
        const lastX = pts[pts.length - 1].x;
        return `${paths[i]} L ${lastX},${plotHeight} L ${firstX},${plotHeight} Z`;
      });
    }, [seriesPoints, paths, plotHeight]);

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
        for (let i = 1; i < maxLabels - 1; i++) {
          indices.push(Math.round(i * step));
        }
        indices.push(data.length - 1);
      }
      return indices.map((i) => {
        const x =
          data.length === 1
            ? plotWidth / 2
            : (i / (data.length - 1)) * plotWidth;
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

    // Curve interpolators
    const interpolators = React.useMemo(() => {
      const build =
        curve === 'monotone' ? monotoneInterpolator : linearInterpolator;
      return seriesPoints.map((pts) => build(pts));
    }, [seriesPoints, curve]);

    const interpolatorsRef = React.useRef(interpolators);
    React.useLayoutEffect(() => {
      interpolatorsRef.current = interpolators;
    }, [interpolators]);

    // Scrub interaction
    const scrub = useChartScrub({
      dataLength: data.length,
      seriesCount: series.length,
      plotWidth,
      padLeft,
      tooltipMode: interactive ? tooltipMode : 'off',
      interpolatorsRef,
      data,
      onActiveChange,
    });

    const fmtValue = React.useCallback(
      (v: number) => (formatValue ? formatValue(v) : String(v)),
      [formatValue],
    );

    const ready = width > 0;

    const svgDesc = React.useMemo(() => {
      if (series.length === 0 || data.length === 0) return undefined;
      const names = series.map((s) => s.label).join(', ');
      return `Line chart with ${data.length} data points showing ${names}.`;
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
              aria-label={ariaLabel ?? svgDesc ?? 'Line chart'}
              width={width}
              height={height}
              className={styles.svg}
              onMouseMove={interactive ? scrub.handleMouseMove : undefined}
              onMouseLeave={interactive ? scrub.hideHover : undefined}
              onTouchStart={interactive ? scrub.handleTouchStart : undefined}
              onTouchMove={interactive ? scrub.handleTouchMove : undefined}
              onTouchEnd={interactive ? scrub.hideHover : undefined}
              onTouchCancel={interactive ? scrub.hideHover : undefined}
            >
              {svgDesc && <desc>{svgDesc}</desc>}

              <defs>
                {hasFade && (
                  <>
                    <linearGradient
                      id={`${fadeMaskId}-grad`}
                      gradientUnits="userSpaceOnUse"
                      x1={0} y1={0} x2={fadeWidth} y2={0}
                    >
                      <stop offset="0" stopColor="white" stopOpacity={0} />
                      <stop offset="1" stopColor="white" stopOpacity={1} />
                    </linearGradient>
                    <mask id={fadeMaskId}>
                      <rect x={0} y={-PAD_TOP} width={fadeWidth} height={height} fill={`url(#${fadeMaskId}-grad)`} />
                      <rect x={fadeWidth} y={-PAD_TOP} width={plotWidth - fadeWidth + PAD_RIGHT} height={height} fill="white" />
                    </mask>
                  </>
                )}

                {interactive && (
                  <>
                    <clipPath id={clipActiveId}>
                      <rect ref={scrub.clipLeftRef} x={0} y={-PAD_TOP} width={plotWidth + PAD_RIGHT} height={height} />
                    </clipPath>
                    <clipPath id={clipInactiveId}>
                      <rect ref={scrub.clipRightRef} x={plotWidth + PAD_RIGHT} y={-PAD_TOP} width={0} height={height} />
                    </clipPath>
                  </>
                )}

                {series.map((s, i) => (
                  <linearGradient
                    key={`${uid}-fill-${i}`}
                    id={`${uid}-fill-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={0} y1={0} x2={0} y2={plotHeight}
                  >
                    <stop offset="0" stopColor={s.color} stopOpacity={fillOpacity} />
                    <stop offset="1" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
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
                          x={plotWidth} y={ry - 5}
                          textAnchor="end"
                          className={styles.referenceLineLabel}
                          fill={rlColor} fillOpacity={0.45}
                        >
                          {rl.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Gradient fills */}
                <g mask={fadeMaskId ? `url(#${fadeMaskId})` : undefined}>
                  {areaPaths.map((d, i) =>
                    d ? (
                      <path
                        key={`${series[i].key}-fill`}
                        d={d}
                        fill={`url(#${uid}-fill-${i})`}
                        stroke="none"
                      />
                    ) : null,
                  )}
                </g>

                {/* Line paths */}
                <g mask={fadeMaskId ? `url(#${fadeMaskId})` : undefined}>
                  {interactive ? (
                    <>
                      <g clipPath={`url(#${clipActiveId})`}>
                        {paths.map((d, i) => {
                          const isDashed = series[i].style !== 'solid';
                          return (
                            <path
                              key={series[i].key}
                              d={d}
                              pathLength={animate && !isDashed ? 1 : undefined}
                              fill="none"
                              stroke={series[i].color}
                              strokeWidth={isDashed ? 1 : strokeWidth}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeDasharray={isDashed ? DASH_PATTERNS[series[i].style] : undefined}
                              className={clsx(animate && !isDashed && styles.lineAnimate)}
                            />
                          );
                        })}
                      </g>
                      <g clipPath={`url(#${clipInactiveId})`} opacity={0.4}>
                        {paths.map((d, i) => {
                          const isDashed = series[i].style !== 'solid';
                          return (
                            <path
                              key={`${series[i].key}-inactive`}
                              d={d}
                              fill="none"
                              stroke={series[i].color}
                              strokeWidth={isDashed ? 1 : strokeWidth}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeDasharray={DASH_PATTERNS[series[i].style]}
                            />
                          );
                        })}
                      </g>
                    </>
                  ) : (
                    paths.map((d, i) => {
                      const isDashed = series[i].style !== 'solid';
                      return (
                        <path
                          key={series[i].key}
                          d={d}
                          pathLength={animate && !isDashed ? 1 : undefined}
                          fill="none"
                          stroke={series[i].color}
                          strokeWidth={isDashed ? 1 : strokeWidth}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray={DASH_PATTERNS[series[i].style]}
                          className={clsx(animate && !isDashed && styles.lineAnimate)}
                        />
                      );
                    })
                  )}
                </g>

                {interactive && (
                  <>
                    <line
                      ref={scrub.cursorRef}
                      x1={0} y1={0} x2={0} y2={plotHeight}
                      className={styles.cursorLine}
                      style={{ display: 'none' }}
                    />
                    {series.map((s, i) => (
                      <circle
                        key={s.key}
                        ref={(el) => { scrub.dotRefs.current[i] = el; }}
                        cx={0} cy={0} r={3}
                        fill={s.color}
                        className={styles.activeDot}
                        style={{ display: 'none' }}
                      />
                    ))}
                  </>
                )}

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
                  ) : tooltipMode === 'simple' ? (
                    xKey && (
                      <span className={styles.tooltipInlineTime}>
                        {formatXLabel
                          ? formatXLabel(data[scrub.activeIndex][xKey])
                          : String(data[scrub.activeIndex][xKey] ?? '')}
                      </span>
                    )
                  ) : tooltipMode === 'compact' ? (
                    <>
                      {series.map((s, i) => {
                        const v = Number(data[scrub.activeIndex!][s.key]);
                        return (
                          <React.Fragment key={s.key}>
                            {i > 0 && <span className={styles.tooltipInlineSep}>{'  ·  '}</span>}
                            <span className={styles.tooltipInlineValue}>
                              {isNaN(v) ? '--' : fmtValue(v)}
                            </span>
                          </React.Fragment>
                        );
                      })}
                      {xKey && (
                        <>
                          <span className={styles.tooltipInlineSep}>{'  ·  '}</span>
                          <span className={styles.tooltipInlineTime}>
                            {formatXLabel
                              ? formatXLabel(data[scrub.activeIndex][xKey])
                              : String(data[scrub.activeIndex][xKey] ?? '')}
                          </span>
                        </>
                      )}
                    </>
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
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Line.displayName = 'Chart.Line';
}
