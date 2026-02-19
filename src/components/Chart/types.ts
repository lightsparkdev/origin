import * as React from 'react';

export interface Series {
  key: string;
  label?: string;
  color?: string;
  style?: 'solid' | 'dashed' | 'dotted';
}

export type ResolvedSeries = {
  key: string;
  label: string;
  color: string;
  style: 'solid' | 'dashed' | 'dotted';
};

export interface ReferenceLine {
  value: number;
  label?: string;
  color?: string;
}

export type TooltipProp =
  | boolean
  | 'simple'
  | 'compact'
  | 'detailed'
  | ((
      datum: Record<string, unknown>,
      series: ResolvedSeries[],
    ) => React.ReactNode);

export type TooltipMode = 'off' | 'simple' | 'compact' | 'detailed' | 'custom';

export const SERIES_COLORS = [
  'var(--border-primary)',
  'var(--text-secondary)',
  'var(--surface-blue-strong)',
  'var(--surface-purple-strong)',
  'var(--surface-green-strong)',
  'var(--surface-pink-strong)',
];

export const PAD_TOP = 8;
export const PAD_RIGHT = 8;
export const PAD_BOTTOM_AXIS = 28;
export const PAD_LEFT_AXIS = 48;
export const TOOLTIP_GAP = 12;

export function resolveTooltipMode(prop: TooltipProp | undefined): TooltipMode {
  if (!prop) return 'off';
  if (prop === true || prop === 'detailed') return 'detailed';
  if (prop === 'simple') return 'simple';
  if (prop === 'compact') return 'compact';
  return 'custom';
}

export function resolveSeries(
  seriesProp: Series[] | undefined,
  dataKey: string | undefined,
  color: string | undefined,
): ResolvedSeries[] {
  if (seriesProp) {
    return seriesProp.map((s, i) => ({
      key: s.key,
      label: s.label ?? s.key,
      color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
      style: s.style ?? 'solid',
    }));
  }
  if (dataKey) {
    return [
      { key: dataKey, label: dataKey, color: color ?? SERIES_COLORS[0], style: 'solid' },
    ];
  }
  return [];
}

export const DASH_PATTERNS: Record<string, string | undefined> = {
  solid: undefined,
  dashed: '4 4',
  dotted: '1 3',
};
