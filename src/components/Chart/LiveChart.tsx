'use client';

import * as React from 'react';
import clsx from 'clsx';
import { filerp } from './utils';
import styles from './Chart.module.scss';

export interface LivePoint {
  time: number;
  value: number;
}

export interface LiveChartProps extends React.ComponentPropsWithoutRef<'div'> {
  data: LivePoint[];
  value: number;
  /** Accent color — derives fill gradient and dot glow. */
  color?: string;
  /** Visible time window in seconds. */
  window?: number;
  /** Show Y-axis grid lines and labels. */
  grid?: boolean;
  /** Show gradient fill under the curve. */
  fill?: boolean;
  /** Show pulsing live dot. */
  pulse?: boolean;
  /** Show crosshair on hover. */
  scrub?: boolean;
  height?: number;
  /** Interpolation speed (0-1). Higher = snappier. */
  lerpSpeed?: number;
  formatValue?: (v: number) => string;
  formatTime?: (t: number) => string;
  ariaLabel?: string;
  onHover?: (point: { time: number; value: number; x: number; y: number } | null) => void;
}

// Layout constants
const PAD = { top: 12, right: 16, bottom: 28, left: 12 };
const PAD_GRID_LEFT = 48;
const FADE_EDGE_WIDTH = 40;
const MAX_DELTA_MS = 50;
const MIN_GRID_GAP = 36;
const PULSE_INTERVAL = 1500;
const PULSE_DURATION = 900;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function resolveColor(color: string, el: HTMLElement): [number, number, number] {
  if (color.startsWith('#')) return hexToRgb(color);
  if (color.startsWith('rgb')) {
    const m = color.match(/\d+/g);
    if (m && m.length >= 3) return [+m[0], +m[1], +m[2]];
  }
  if (color.startsWith('var(')) {
    const prop = color.slice(4, -1).trim();
    const resolved = getComputedStyle(el).getPropertyValue(prop).trim();
    if (resolved) return resolveColor(resolved, el);
  }
  return [59, 130, 246]; // fallback blue
}

// Fritsch-Carlson monotone cubic spline on canvas
function drawSpline(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  if (pts.length < 2) return;
  if (pts.length === 2) { ctx.lineTo(pts[1][0], pts[1][1]); return; }
  const n = pts.length;
  const h: number[] = [];
  const delta: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    h.push(pts[i + 1][0] - pts[i][0]);
    delta.push(h[i] === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / h[i]);
  }
  const m: number[] = new Array(n);
  m[0] = delta[0]; m[n - 1] = delta[n - 2];
  for (let i = 1; i < n - 1; i++) {
    m[i] = delta[i - 1] * delta[i] <= 0 ? 0 : (delta[i - 1] + delta[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(delta[i]) < 1e-10) { m[i] = 0; m[i + 1] = 0; }
    else {
      const a = m[i] / delta[i], b = m[i + 1] / delta[i];
      const s2 = a * a + b * b;
      if (s2 > 9) { const s = 3 / Math.sqrt(s2); m[i] = s * a * delta[i]; m[i + 1] = s * b * delta[i]; }
    }
  }
  for (let i = 0; i < n - 1; i++) {
    ctx.bezierCurveTo(
      pts[i][0] + h[i] / 3, pts[i][1] + m[i] * h[i] / 3,
      pts[i + 1][0] - h[i] / 3, pts[i + 1][1] - m[i + 1] * h[i] / 3,
      pts[i + 1][0], pts[i + 1][1],
    );
  }
}

function pickInterval(range: number, pxPerUnit: number, prev: number): number {
  if (prev > 0) {
    const px = prev * pxPerUnit;
    if (px >= MIN_GRID_GAP * 0.5 && px <= MIN_GRID_GAP * 4) return prev;
  }
  const divisors = [2, 2.5, 2];
  let span = Math.pow(10, Math.ceil(Math.log10(range || 1)));
  let i = 0;
  while (span / divisors[i % 3] * pxPerUnit >= MIN_GRID_GAP && i < 30) {
    span /= divisors[i % 3];
    i++;
  }
  return span;
}

function interpolateAtTime(pts: LivePoint[], t: number): number {
  if (pts.length === 0) return 0;
  if (pts.length === 1) return pts[0].value;
  if (t <= pts[0].time) return pts[0].value;
  if (t >= pts[pts.length - 1].time) return pts[pts.length - 1].value;
  let lo = 0, hi = pts.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].time <= t) lo = mid; else hi = mid;
  }
  const d = pts[hi].time - pts[lo].time;
  if (d === 0) return pts[lo].value;
  const r = (t - pts[lo].time) / d;
  return pts[lo].value + (pts[hi].value - pts[lo].value) * r;
}

function formatDefaultTime(t: number): string {
  const d = new Date(t * 1000);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
}

export const Live = React.forwardRef<HTMLDivElement, LiveChartProps>(
  function Live(
    {
      data,
      value,
      color = 'var(--border-primary)',
      window: windowSecs = 30,
      grid = true,
      fill = true,
      pulse = true,
      scrub = true,
      height = 200,
      lerpSpeed = 0.08,
      formatValue,
      formatTime,
      ariaLabel,
      onHover,
      className,
      ...props
    },
    ref,
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const rafRef = React.useRef(0);
    const lastFrameRef = React.useRef(0);
    const sizeRef = React.useRef({ w: 0, h: 0 });
    const hoverXRef = React.useRef<number | null>(null);

    // Mutable animation state (no React re-renders)
    const stateRef = React.useRef({
      displayValue: value,
      displayMin: 0,
      displayMax: 1,
      gridInterval: 0,
      gridLabels: new Map<number, number>(),
      scrubAmount: 0,
    });

    // Config ref so rAF callback doesn't need recreation
    const configRef = React.useRef({
      data, value, color, windowSecs, grid, fill, pulse, scrub,
      lerpSpeed, formatValue, formatTime, onHover, height,
    });
    React.useLayoutEffect(() => {
      configRef.current = {
        data, value, color, windowSecs, grid, fill, pulse, scrub,
        lerpSpeed, formatValue, formatTime, onHover, height,
      };
    });

    // Resolve accent color to RGB
    const rgbRef = React.useRef<[number, number, number]>([59, 130, 246]);
    React.useEffect(() => {
      if (containerRef.current) {
        rgbRef.current = resolveColor(color, containerRef.current);
      }
    }, [color]);

    if (process.env.NODE_ENV !== 'production') {
      if (data.some((p) => p.time > 1e12)) {
        // eslint-disable-next-line no-console
        console.warn(
          'Chart.Live: `time` values appear to be in milliseconds. Expected unix seconds.',
        );
      }
    }

    // ResizeObserver — writes to ref, no re-renders
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        const e = entries[0];
        if (e) sizeRef.current = { w: e.contentRect.width, h: e.contentRect.height };
      });
      ro.observe(el);
      const rect = el.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      return () => ro.disconnect();
    }, []);

    // Hover handlers
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const onMove = (e: MouseEvent) => {
        if (!configRef.current.scrub) return;
        const rect = el.getBoundingClientRect();
        hoverXRef.current = e.clientX - rect.left;
      };
      const onLeave = () => {
        hoverXRef.current = null;
        configRef.current.onHover?.(null);
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!configRef.current.scrub || !e.touches[0]) return;
        const rect = el.getBoundingClientRect();
        hoverXRef.current = e.touches[0].clientX - rect.left;
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      el.addEventListener('touchmove', onTouchMove, { passive: true });
      el.addEventListener('touchend', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onLeave);
      };
    }, []);

    // Main render loop
    const draw = React.useCallback(() => {
      if (document.hidden) { rafRef.current = 0; return; }

      const canvas = canvasRef.current;
      const { w, h } = sizeRef.current;
      if (!canvas || w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const now_ms = performance.now();
      const dt = lastFrameRef.current ? Math.min(now_ms - lastFrameRef.current, MAX_DELTA_MS) : 16.67;
      lastFrameRef.current = now_ms;

      const dpr = window.devicePixelRatio || 1;
      const tw = Math.round(w * dpr);
      const th = Math.round(h * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cfg = configRef.current;
      const st = stateRef.current;
      const [r, g, b] = rgbRef.current;

      // Lerp display value
      st.displayValue = filerp(st.displayValue, cfg.value, cfg.lerpSpeed, dt);
      if (Math.abs(st.displayValue - cfg.value) < Math.abs(st.displayMax - st.displayMin) * 0.001) {
        st.displayValue = cfg.value;
      }

      // Time window
      const now = Date.now() / 1000;
      const rightEdge = now + cfg.windowSecs * 0.05;
      const leftEdge = rightEdge - cfg.windowSecs;

      // Visible points
      const visible = cfg.data.filter((p) => p.time >= leftEdge - 2 && p.time <= rightEdge);

      // Y domain
      let dataMin = Infinity, dataMax = -Infinity;
      for (const p of visible) {
        if (p.value < dataMin) dataMin = p.value;
        if (p.value > dataMax) dataMax = p.value;
      }
      if (st.displayValue < dataMin) dataMin = st.displayValue;
      if (st.displayValue > dataMax) dataMax = st.displayValue;
      if (dataMin === Infinity) { dataMin = 0; dataMax = 1; }
      if (dataMin === dataMax) { dataMin -= 1; dataMax += 1; }
      const padding = (dataMax - dataMin) * 0.1;
      const targetMin = dataMin - padding;
      const targetMax = dataMax + padding;

      if (st.displayMin === 0 && st.displayMax === 1 && visible.length > 0) {
        st.displayMin = targetMin;
        st.displayMax = targetMax;
      } else {
        if (targetMin < st.displayMin) st.displayMin = targetMin;
        else st.displayMin = filerp(st.displayMin, targetMin, cfg.lerpSpeed, dt);
        if (targetMax > st.displayMax) st.displayMax = targetMax;
        else st.displayMax = filerp(st.displayMax, targetMax, cfg.lerpSpeed, dt);
      }

      // Layout
      const padLeft = cfg.grid ? PAD_GRID_LEFT : PAD.left;
      const chartW = w - padLeft - PAD.right;
      const chartH = h - PAD.top - PAD.bottom;
      const toX = (t: number) => padLeft + ((t - leftEdge) / (rightEdge - leftEdge)) * chartW;
      const toY = (v: number) => PAD.top + (1 - (v - st.displayMin) / (st.displayMax - st.displayMin)) * chartH;
      const clampY = (y: number) => Math.max(PAD.top, Math.min(PAD.top + chartH, y));

      // Grid
      if (cfg.grid) {
        const valRange = st.displayMax - st.displayMin;
        const pxPerUnit = chartH / (valRange || 1);
        st.gridInterval = pickInterval(valRange, pxPerUnit, st.gridInterval);
        const interval = st.gridInterval;

        const first = Math.ceil(st.displayMin / interval) * interval;
        const targets = new Map<number, number>();
        for (let v = first; v <= st.displayMax; v += interval) {
          const y = toY(v);
          const edgeFade = y < PAD.top + 32 ? Math.max(0, (y - PAD.top) / 32)
            : y > PAD.top + chartH - 32 ? Math.max(0, (PAD.top + chartH - y) / 32) : 1;
          targets.set(Math.round(v * 1000), edgeFade);
        }

        for (const [key, alpha] of st.gridLabels) {
          const target = targets.get(key) ?? 0;
          const speed = target >= alpha ? 0.18 : 0.12;
          const next = filerp(alpha, target, speed, dt);
          if (next < 0.01 && target === 0) st.gridLabels.delete(key);
          else st.gridLabels.set(key, next);
        }
        for (const [key, target] of targets) {
          if (!st.gridLabels.has(key)) st.gridLabels.set(key, 0.01);
        }

        const fmtVal = cfg.formatValue ?? ((v: number) => v.toFixed(v % 1 === 0 ? 0 : 2));
        ctx.lineWidth = 1;
        for (const [key, alpha] of st.gridLabels) {
          if (alpha < 0.01) continue;
          const v = key / 1000;
          const y = Math.round(toY(v)) + 0.5;
          ctx.globalAlpha = alpha * 0.06;
          ctx.strokeStyle = `rgb(0,0,0)`;
          ctx.setLineDash([1, 3]);
          ctx.beginPath(); ctx.moveTo(padLeft, y); ctx.lineTo(padLeft + chartW, y); ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = alpha * 0.4;
          ctx.fillStyle = 'rgb(0,0,0)';
          ctx.font = '11px "Suisse Intl Mono", "SF Mono", Menlo, monospace';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(fmtVal(v), padLeft - 8, y);
        }
        ctx.globalAlpha = 1;
      }

      // Build screen points
      const pts: [number, number][] = visible.map((p, i) =>
        i === visible.length - 1
          ? [toX(p.time), clampY(toY(st.displayValue))]
          : [toX(p.time), clampY(toY(p.value))]
      );
      if (pts.length > 0) {
        pts.push([toX(now), clampY(toY(st.displayValue))]);
      }

      if (pts.length >= 2) {
        // Fill
        if (cfg.fill) {
          const grad = ctx.createLinearGradient(0, PAD.top, 0, h - PAD.bottom);
          grad.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.moveTo(pts[0][0], h - PAD.bottom);
          ctx.lineTo(pts[0][0], pts[0][1]);
          drawSpline(ctx, pts);
          ctx.lineTo(pts[pts.length - 1][0], h - PAD.bottom);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Line stroke
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        drawSpline(ctx, pts);
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Left-edge fade (destination-out)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const fadeGrad = ctx.createLinearGradient(padLeft, 0, padLeft + FADE_EDGE_WIDTH, 0);
      fadeGrad.addColorStop(0, 'rgba(0,0,0,1)');
      fadeGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, padLeft + FADE_EDGE_WIDTH, h);
      ctx.restore();

      // Time axis
      if (cfg.grid) {
        const fmtTime = cfg.formatTime ?? formatDefaultTime;
        const timeStep = Math.max(1, Math.ceil(cfg.windowSecs / 5));
        const firstT = Math.ceil(leftEdge / timeStep) * timeStep;
        ctx.font = '11px "Suisse Intl Mono", "SF Mono", Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'rgb(0,0,0)';
        for (let t = firstT; t <= rightEdge; t += timeStep) {
          const x = toX(t);
          if (x < padLeft + 20 || x > padLeft + chartW - 20) continue;
          ctx.globalAlpha = 0.35;
          ctx.fillText(fmtTime(t), x, PAD.top + chartH + 10);
        }
        ctx.globalAlpha = 1;
      }

      // Live dot
      if (pts.length > 0) {
        const dotX = pts[pts.length - 1][0];
        const dotY = pts[pts.length - 1][1];
        const dim = st.scrubAmount * 0.7;

        // Pulse ring
        if (cfg.pulse && dim < 0.3) {
          const t = (Date.now() % PULSE_INTERVAL) / PULSE_DURATION;
          if (t < 1) {
            const radius = 9 + t * 12;
            ctx.globalAlpha = 0.35 * (1 - t) * (1 - dim * 3);
            ctx.beginPath();
            ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgb(${r},${g},${b})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Outer circle
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 6 * (1 - dim);
        ctx.shadowOffsetY = 1;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
        ctx.restore();

        // Inner dot
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }

      // Crosshair / scrub
      const hoverX = hoverXRef.current;
      const scrubTarget = hoverX !== null && cfg.scrub ? 1 : 0;
      st.scrubAmount += (scrubTarget - st.scrubAmount) * 0.12;
      if (st.scrubAmount < 0.01) st.scrubAmount = 0;
      if (st.scrubAmount > 0.99) st.scrubAmount = 1;

      if (st.scrubAmount > 0 && hoverX !== null && pts.length > 0) {
        const liveDotX = pts[pts.length - 1][0];
        const dist = liveDotX - hoverX;
        const fadeStart = Math.min(80, chartW * 0.3);
        const opacity = dist < 5 ? 0 : dist >= fadeStart ? st.scrubAmount : ((dist - 5) / (fadeStart - 5)) * st.scrubAmount;

        if (opacity > 0.01) {
          const clampedX = Math.max(padLeft, Math.min(toX(now), hoverX));

          // Vertical line
          ctx.globalAlpha = opacity * 0.1;
          ctx.strokeStyle = 'rgb(0,0,0)';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(Math.round(clampedX) + 0.5, PAD.top);
          ctx.lineTo(Math.round(clampedX) + 0.5, PAD.top + chartH);
          ctx.stroke();

          // Intersection dot
          const hoverTime = leftEdge + ((clampedX - padLeft) / chartW) * (rightEdge - leftEdge);
          const hoverVal = interpolateAtTime(visible.length > 0 ? visible : cfg.data, hoverTime);
          const hoverY = clampY(toY(hoverVal));

          ctx.globalAlpha = Math.min(opacity * 3, 1);
          ctx.beginPath();
          ctx.arc(clampedX, hoverY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();

          // Tooltip text — tracks horizontally with crosshair
          const fmtVal = cfg.formatValue ?? ((v: number) => v.toFixed(2));
          const fmtTime = cfg.formatTime ?? formatDefaultTime;
          const label = `${fmtVal(hoverVal)}  ·  ${fmtTime(hoverTime)}`;
          ctx.globalAlpha = opacity;
          ctx.font = '12px "Suisse Intl Mono", "SF Mono", Menlo, monospace';
          ctx.textBaseline = 'top';

          const labelWidth = ctx.measureText(label).width;
          const labelX = Math.max(padLeft + 4, Math.min(padLeft + chartW - labelWidth - 4, clampedX - labelWidth / 2));
          const labelY = PAD.top + 2;

          ctx.textAlign = 'left';
          ctx.fillStyle = 'rgb(26,26,26)';
          ctx.fillText(label, labelX, labelY);

          cfg.onHover?.({ time: hoverTime, value: hoverVal, x: clampedX, y: hoverY });
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }, []);

    // Start/stop loop
    React.useEffect(() => {
      rafRef.current = requestAnimationFrame(draw);
      const onVisibility = () => {
        if (!document.hidden && !rafRef.current) {
          lastFrameRef.current = 0;
          rafRef.current = requestAnimationFrame(draw);
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }, [draw]);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    return (
      <div
        ref={mergedRef}
        className={clsx(styles.root, className)}
        style={{ height, cursor: scrub ? 'crosshair' : undefined }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className={styles.svg}
          role="img"
          aria-label={ariaLabel ?? 'Live chart'}
        />
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Live.displayName = 'Chart.Live';
}
