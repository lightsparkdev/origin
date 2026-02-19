'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss';

export interface LiveDotProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Status determines color: active (green), idle (neutral), error (red), processing (accent). */
  status?: 'active' | 'idle' | 'error' | 'processing';
  /** Show pulsing ring animation. Defaults to true for active and processing. */
  pulse?: boolean;
  /** Dot size in px. */
  size?: number;
}

const STATUS_COLORS: Record<string, string> = {
  active: 'var(--surface-green-strong)',
  idle: 'var(--text-tertiary)',
  error: 'var(--surface-red-strong)',
  processing: 'var(--surface-blue-strong)',
};

export const LiveDot = React.forwardRef<HTMLSpanElement, LiveDotProps>(
  function LiveDot(
    { status = 'active', pulse, size = 8, className, style, ...props },
    ref,
  ) {
    const shouldPulse = pulse ?? (status === 'active' || status === 'processing');
    const color = STATUS_COLORS[status] ?? STATUS_COLORS.active;

    return (
      <span
        ref={ref}
        className={clsx(styles.liveDot, shouldPulse && styles.liveDotPulse, className)}
        style={{
          '--live-dot-color': color,
          '--live-dot-size': `${size}px`,
          ...style,
        } as React.CSSProperties}
        role="status"
        aria-label={status}
        {...props}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  LiveDot.displayName = 'Chart.LiveDot';
}
