'use client';

import * as React from 'react';
import { Line, type LineChartProps } from './LineChart';

export interface SparklineProps
  extends Omit<LineChartProps, 'grid' | 'tooltip' | 'interactive' | 'xKey' | 'animate'> {}

export const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  function Sparkline(props, ref) {
    return (
      <Line
        ref={ref}
        height={40}
        strokeWidth={1.5}
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
