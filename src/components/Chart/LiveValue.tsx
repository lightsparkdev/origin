'use client';

import * as React from 'react';
import clsx from 'clsx';
import { filerp } from './utils';
import styles from './Chart.module.scss';

export interface LiveValueProps extends React.ComponentPropsWithoutRef<'span'> {
  /** The target value to animate toward. */
  value: number;
  /** Interpolation speed (0-1). Higher = snappier. */
  lerpSpeed?: number;
  /** Format the displayed value. */
  formatValue?: (v: number) => string;
}

const MAX_DELTA_MS = 50;

export const LiveValue = React.forwardRef<HTMLSpanElement, LiveValueProps>(
  function LiveValue(
    { value, lerpSpeed = 0.08, formatValue, className, ...props },
    ref,
  ) {
    const elRef = React.useRef<HTMLSpanElement>(null);
    const rafRef = React.useRef(0);
    const lastFrameRef = React.useRef(0);
    const displayRef = React.useRef(value);
    const targetRef = React.useRef(value);
    const formatRef = React.useRef(formatValue);
    const speedRef = React.useRef(lerpSpeed);

    React.useLayoutEffect(() => {
      formatRef.current = formatValue;
      speedRef.current = lerpSpeed;
    });

    const tick = React.useCallback(() => {
      const now = performance.now();
      const dt = lastFrameRef.current ? Math.min(now - lastFrameRef.current, MAX_DELTA_MS) : 16.67;
      lastFrameRef.current = now;

      const target = targetRef.current;
      let display = displayRef.current;
      display = filerp(display, target, speedRef.current, dt);

      const range = Math.abs(target) || 1;
      if (Math.abs(display - target) < range * 0.001) display = target;
      displayRef.current = display;

      const el = elRef.current;
      if (el) {
        const fmt = formatRef.current;
        el.textContent = fmt ? fmt(display) : display.toFixed(display % 1 === 0 && Math.abs(display - target) < 0.01 ? 0 : 2);
      }

      if (display === target) {
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }, []);

    // Restart loop when target changes
    React.useEffect(() => {
      targetRef.current = value;
      if (!rafRef.current) {
        lastFrameRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    }, [value, tick]);

    React.useEffect(() => {
      rafRef.current = requestAnimationFrame(tick);
      const onVisibility = () => {
        if (!document.hidden && !rafRef.current && displayRef.current !== targetRef.current) {
          lastFrameRef.current = 0;
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }, [tick]);

    const mergedRef = React.useCallback(
      (node: HTMLSpanElement | null) => {
        (elRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const fmt = formatValue ?? ((v: number) => v.toFixed(v % 1 === 0 ? 0 : 2));

    return (
      <span
        ref={mergedRef}
        className={clsx(styles.liveValue, className)}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {fmt(value)}
      </span>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  LiveValue.displayName = 'Chart.LiveValue';
}
