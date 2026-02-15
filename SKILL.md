# SKILL.md — Building Excellent React Dashboards with Recharts + Origin

This is a complete playbook for building professional, accessible, fintech-grade internal BI dashboards using React, Recharts, and the **Origin design system** (`@lightsparkdev/origin`). Every dashboard built from this guide should feel like it belongs at a top-tier payments infrastructure company — and be visually consistent with the rest of Lightspark's product.

## Origin design system integration

Origin is Lightspark's design system built on [Base UI](https://base-ui.com/). It provides:

- **CSS custom property tokens** for color, spacing, typography, borders, shadows, and corner radii
- **SCSS mixins** for typography (`@include headline`, `@include body-sm`, etc.)
- **React components** for common UI patterns: `Card`, `Tabs`, `Badge`, `Button`, `Table`, `Dialog`, etc.
- **Automatic dark mode** via `[data-theme="dark"]` and `prefers-color-scheme` — all semantic tokens swap automatically

**Rule: Always use Origin tokens and components.** Hardcoded hex values, pixel sizes, and hand-rolled UI components are anti-patterns in this codebase. Recharts is the exception — it requires JS values for SVG rendering — but even there, derive values from Origin tokens (see Section 5).

### How to import Origin tokens in SCSS modules

```scss
// Typography mixins
@use 'pkg:@lightsparkdev/origin/tokens/text-styles' as *;

// All CSS custom properties (--spacing-*, --color-*, --surface-*, etc.)
// are available globally — no import needed in SCSS modules.
```

---

## Context: Lightspark dashboard requirements

Lightspark builds Lightning Network infrastructure for Bitcoin payments. Dashboards serve three audiences: (1) executive leadership wanting high-level KPIs and trends, (2) data/engineering teams wanting detailed breakdowns, and (3) cross-functional teams (partnerships, compliance, BD) wanting partner-specific and operational views. The tech stack is React with Recharts, using tabbed navigation via Origin's `Tabs` component.

Core metrics include: TPV (Total Payment Volume), transaction counts, settlement times, conversion rates, corridor-level analytics, and partner performance (SoFi, Striga, Grid Switch, etc.).

---

## 1. Dashboard layout and information hierarchy

### The 3-30-300 rule

Every dashboard must satisfy three scanning speeds:

- **3 seconds:** The user grasps overall status (on track or not) from the KPI cards at top
- **30 seconds:** The user identifies key patterns, trends, and areas needing attention from the charts
- **300 seconds:** The user drills into specific outliers, segments, and root causes via tables and drill-downs

### Layout structure

Use the F-pattern reading model: users scan horizontally across the top, then vertically down the left side. Place the single most critical KPI in the top-left position — it answers "good or not?" and everything else explains "why."

Standard dashboard layout (top to bottom):

1. **KPI card row** — 4-6 summary metric cards in a horizontal band (the "hero section")
2. **Primary chart section** — 1-2 large time-series charts (TPV trend, transaction volume)
3. **Breakdown section** — 2-3 medium charts side-by-side showing composition, comparison, or distribution
4. **Detail section** — Tables, drill-down panels, or secondary visualizations

### Grid system

Use a 12-column grid for desktop layouts. Use Origin's breakpoint tokens for responsive behavior:

| Breakpoint | Origin token | Screen width | Columns | KPI cards/row | Chart layout |
|---|---|---|---|---|---|
| 2XL | `--screens-2xl` | ≥1536px | 12 | 6 | 2-3 charts side-by-side |
| XL | `--screens-xl` | ≥1280px | 12 | 4-5 | 2 charts side-by-side |
| LG | `--screens-lg` | ≥1024px | 12 | 3-4 | 2 charts side-by-side |
| MD | `--screens-md` | ≥768px | 8 | 2-3 | Full-width stacked |
| SM | `--screens-sm` | ≥640px | 4 | 1-2 | Full-width stacked |
| Mobile | — | <640px | 4 | 1 | Full-width stacked |

Use Origin spacing tokens for gutters: `--spacing-xl` (24px) on desktop, `--spacing-md` (16px) on mobile.

```scss
.dashboard-grid {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media (max-width: 768px) {
    gap: var(--spacing-md);
  }
}
```

### Density and whitespace

Aim for high data density with clear visual hierarchy. Remove unnecessary gridlines, heavy borders, 3D effects, and decorative elements. Thoughtful whitespace improves comprehension by ~20%. Use Origin surface tokens (`--surface-primary`, `--surface-elevated`) and subtle borders (`--border-tertiary`) to define sections — but sparingly. If you cannot tell the purpose of a chart in 10 seconds, simplify it.

Limit to 5-10 meaningful KPIs per dashboard view. If every KPI is the same size and weight, the dashboard has no hierarchy — the worst possible design choice.

---

## 2. KPI card design

### Anatomy of every KPI card

Each card must contain four layers:

1. **Label** — Clear metric name (e.g., "Weekly TPV", "Success Rate"). Use short names: "Total Number of Transactions" → "Transactions"
2. **Headline value** — Large, bold, the most visually prominent element. Use appropriate formatting ($12.4M, 98.2%, 1.2s)
3. **Comparison context** — Percentage or absolute change vs. prior period (WoW, MoM, YoY). Include directional indicator (↑↓ or ▲▼)
4. **Trend visual** — A sparkline showing recent history, or a status icon

Plus: always show the date period the metric covers. Users must never guess the timeframe.

### KPI card implementation with Origin

Use Origin's `Card` component (variant `"simple"`) and `Badge` for status. Style with SCSS modules using Origin typography mixins.

```tsx
import { Card, Badge } from '@lightsparkdev/origin';
import { MiniSparkline } from './MiniSparkline';
import styles from './KPICard.module.scss';

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  sparklineData?: number[];
  period: string;
}

const KPICard = ({ label, value, change, changeLabel, sparklineData, period }: KPICardProps) => (
  <Card variant="simple">
    <Card.Body>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.changeRow}>
        <Badge variant={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </Badge>
        <span className={styles.changeLabel}>{changeLabel}</span>
      </div>
      {sparklineData && <MiniSparkline data={sparklineData} />}
      <div className={styles.period}>{period}</div>
    </Card.Body>
  </Card>
);
```

```scss
// KPICard.module.scss
@use 'pkg:@lightsparkdev/origin/tokens/text-styles' as *;

.label {
  @include label-sm; // 12px, 450 weight
  color: var(--text-secondary);
}

.value {
  @include headline; // 24px, 500 weight, -0.7px tracking
  color: var(--text-primary);
  margin-top: var(--spacing-2xs);
}

.changeRow {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.changeLabel {
  @include body-sm; // 12px, 400 weight
  color: var(--text-secondary);
}

.period {
  @include body-sm;
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
}
```

### Color and status indicators

Use Origin's semantic color tokens — never hardcoded hex values:

| Status | Badge variant | Icon token | Surface token |
|---|---|---|---|
| Positive / on-track | `green` | `--icon-success` (#11A967) | `--surface-green` |
| Warning / caution | `yellow` | `--icon-warning` (#FCBA02) | `--surface-yellow` |
| Negative / action needed | `red` | `--icon-critical` (#CC0909) | `--surface-red` |
| Neutral / informational | `blue` | `--icon-info` (#0072DB) | `--surface-blue` |
| De-emphasized / context | `gray` | `--icon-secondary` (#7C7C7C) | `--surface-secondary` |

- If a metric direction is ambiguous (neither inherently good nor bad), use `variant="blue"` or `variant="gray"` instead of semantic colors
- For KPIs where "up" is bad (e.g., decline rate, settlement time), invert the color — rising costs should use `variant="red"`, not `variant="green"`
- Always pair color with a secondary indicator (arrow, icon, or text) for accessibility

### Sizing rules

- All KPI cards in a row must have identical height and internal structure
- Use 4-6 cards per row on desktop, 2 per row on tablet, 1 per row on mobile
- Group related KPIs into logical blocks (e.g., Volume metrics | Performance metrics | Growth metrics)

---

## 3. Chart type selection guide

> **Note:** Origin does not include chart components — Recharts remains the charting library. All surrounding UI (cards, tabs, tooltips, badges, tables) should use Origin components.

### Decision matrix: what am I trying to show?

| Goal | Best chart | Recharts component | Notes |
|---|---|---|---|
| Trend over time | Line chart | `<LineChart>` + `<Line>` | Use `type="monotone"` for smooth curves. Max 4-5 lines before switching to small multiples |
| Volume over time | Area chart | `<AreaChart>` + `<Area>` | Use gradient fills. Best for showing magnitude |
| Composition over time | Stacked area | `<AreaChart>` + `<Area stackId="1">` | Max 3-5 categories. Use `stackOffset="expand"` for 100% stacked |
| Categorical comparison | Bar chart | `<BarChart>` + `<Bar>` | Horizontal bars for many categories or long labels. Always start y-axis at 0 |
| Part-to-whole | Donut chart | `<PieChart>` + `<Pie>` | 2-3 categories maximum. Prefer horizontal bar for >3 categories |
| Ranking | Horizontal bar | `<BarChart layout="vertical">` | Sort by value. Most intuitive for rankings |
| Distribution | Histogram | `<BarChart>` with binned data | Good for settlement time distributions |
| Correlation | Scatter plot | `<ScatterChart>` + `<Scatter>` | Use for outlier detection and relationship exploration |
| Actual vs. target | Bullet graph | `<ComposedChart>` with `<Bar>` + `<ReferenceLine>` | Far more space-efficient than gauge dials |
| Mixed metrics | Composed chart | `<ComposedChart>` | Combine bars + lines for volume + value dual views |
| Precise values | Table | Origin `Table` component with sparklines | Best when exact numbers matter. Add conditional formatting sparingly |

### Perceptual hierarchy (Cleveland & McGill)

Humans judge these visual encodings from most to least accurate:

1. Position on common scale (bar chart) — most accurate
2. Length
3. Angle (pie chart) — inaccurate, avoid
4. Area (bubble chart) — unreliable
5. Color saturation — least accurate

**Implication:** Prefer bar/line charts over pie/bubble charts. Seven chart types handle ~95% of business reporting: KPI card, line, bar, table with sparklines, donut (2-3 categories only), composed, and area.

### Charts to never use

- **3D charts of any kind** — they distort perception
- **Gauge/dial meters** — they waste enormous space for a single number; use a KPI card instead
- **Pie charts with >3 slices** — replace with sorted horizontal bars
- **Dual y-axes line charts** — they create false correlations. Split into two vertically aligned charts instead

---

## 4. Color system for data visualization

### Semantic colors (mapped to Origin tokens)

| Role | Origin token | Light value | Usage |
|---|---|---|---|
| Primary data | `--color-purple-600` | #8A62BB | Default chart color, primary series |
| Secondary data | `--color-sky-600` | #008DBC | Second series |
| Accent | `--color-yellow-500` | #FCBA02 | Third series, highlights |
| Success | `--icon-success` | #11A967 | Positive KPI changes, success states |
| Danger | `--icon-critical` | #CC0909 | Negative KPI changes, errors, declines |
| Warning | `--icon-warning` | #FCBA02 | Approaching thresholds, needs attention |
| Neutral text | `--text-secondary` | #7C7C7C | Secondary text, de-emphasized content |
| Grid/borders | `--border-tertiary` | rgba(0,0,0,0.10) | Chart grid lines, subtle borders |
| Card background | `--surface-elevated` | #FAFAF9 | Chart card surfaces |
| Base background | `--surface-base` | #FFFFFF | Page background |

### Categorical palette (for multi-series charts)

Use this ordered sequence derived from Origin's color scale — maximum 5-7 colors per chart:

```ts
// chartTheme.ts — categorical palette from Origin color tokens
const CHART_COLORS = [
  '#8A62BB', // --color-purple-600 (primary)
  '#008DBC', // --color-sky-600
  '#FCBA02', // --color-yellow-500
  '#11A967', // --color-green-600
  '#CC0909', // --color-red-700
  '#0072DB', // --color-blue-600
  '#FF00D4', // --color-pink-700
];
```

### Colorblind-safe palette (Okabe-Ito / Wong)

When accessibility is critical (always recommended), use this palette which is distinguishable for protanopia, deuteranopia, and tritanopia:

```ts
const COLORBLIND_SAFE = [
  '#0072B2', // blue
  '#E69F00', // orange
  '#56B4E9', // sky blue
  '#009E73', // bluish green
  '#F0E442', // yellow
  '#D55E00', // vermillion
  '#CC79A7', // reddish purple
  '#000000', // black
];
```

Maximum 8 colors. Beyond 8, it is nearly impossible to find distinguishable colors.

### Color rules

1. **Never rely on color alone** to convey meaning — always add arrows, icons, text labels, or patterns as redundant encoding
2. Use Origin's neutral tokens (`--border-tertiary`, `--text-tertiary`) for context elements (grid, borders, secondary text) and reserve saturated colors for data
3. Keep color meanings consistent across the entire dashboard — if green means "on-track" in one card, it must mean the same everywhere
4. For diverging data (profit/loss, budget variance), use a diverging palette with a neutral center
5. Ensure minimum 4.5:1 contrast ratio for text (WCAG AA) and 3:1 for non-text elements like chart bars and icons — Origin's semantic tokens are designed to meet these thresholds
6. Test all visualizations with a colorblindness simulator before shipping
7. All semantic tokens auto-swap in dark mode (`[data-theme="dark"]`), but chart hex values do not — build a theme-aware chart config (see Section 5)

---

## 5. Recharts implementation patterns

### Always use ResponsiveContainer

Every chart must be wrapped in `ResponsiveContainer`. The parent element must have defined dimensions (especially height).

```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    {/* chart children */}
  </LineChart>
</ResponsiveContainer>
```

Never set explicit width/height on the chart component itself when using `ResponsiveContainer`.

### Centralized chart theme (derived from Origin tokens)

Recharts accepts JS values for SVG attributes, not CSS custom properties. Create a theme object that mirrors Origin token values so charts stay consistent with the rest of the UI. When Origin tokens change, update this single file.

```ts
// chartTheme.ts
//
// Recharts requires concrete values (hex, px) for SVG rendering.
// This file mirrors Origin design tokens so charts match the design system.
// If Origin tokens change, update these values to match.
//
// To resolve CSS vars at runtime instead:
//   const val = getComputedStyle(document.documentElement).getPropertyValue('--token-name').trim();

export const chartTheme = {
  colors: {
    primary: '#8A62BB',   // --color-purple-600
    secondary: '#008DBC', // --color-sky-600
    accent: '#FCBA02',    // --color-yellow-500
    success: '#11A967',   // --icon-success / --color-green-600
    danger: '#CC0909',    // --icon-critical / --color-red-700
    neutral: '#7C7C7C',   // --text-secondary / --color-gray-500
    palette: [
      '#8A62BB', // --color-purple-600
      '#008DBC', // --color-sky-600
      '#FCBA02', // --color-yellow-500
      '#11A967', // --color-green-600
      '#CC0909', // --color-red-700
      '#0072DB', // --color-blue-600
      '#FF00D4', // --color-pink-700
    ],
  },
  axis: {
    stroke: '#989898',    // --text-tertiary / --color-gray-400
    tickFill: '#7C7C7C',  // --text-secondary / --color-gray-500
    fontSize: 12,         // matches Origin body-sm / --font-size-xs
  },
  grid: {
    stroke: '#E5E7EB',    // approximates --border-tertiary in light mode
    strokeDasharray: '3 3',
  },
  tooltip: {
    bg: '#FAFAF9',          // --surface-elevated
    border: '#C1C0B8',      // --border-secondary / --color-gray-300
    borderRadius: 8,        // --corner-radius-md
    shadow: '0px 1px 2px -1px rgba(0,0,0,0.04), 0px 4px 6px -1px rgba(0,0,0,0.06)', // --shadow-md
  },
} as const;

// Runtime helper: resolve a CSS custom property from Origin
export function resolveToken(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}
```

### Standard axis configuration

```tsx
<XAxis
  dataKey="date"
  tickFormatter={formatDate}
  axisLine={false}
  tickLine={false}
  tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }}
  minTickGap={20}
/>
<YAxis
  axisLine={false}
  tickLine={false}
  tickFormatter={currencyFormatter}
  tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }}
  width={60}
/>
<CartesianGrid
  strokeDasharray={chartTheme.grid.strokeDasharray}
  vertical={false}
  stroke={chartTheme.grid.stroke}
/>
```

Key axis rules:

- Always hide `tickLine` and `axisLine` for clean appearance
- Show horizontal grid lines only (`vertical={false}`)
- Use light dashed lines (`strokeDasharray="3 3"`) for grids
- Set `minTickGap={20}` to prevent label overlapping
- For large datasets, set explicit `interval={Math.ceil(data.length / 20)}` to show ~20 ticks

### Shared formatter utilities

```ts
// formatters.ts
export const formatters = {
  currency: (value: number) => {
    if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (Math.abs(value) >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
    return `$${value}`;
  },

  currencyFull: (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0,
  }).format(value),

  percent: (value: number) => `${(value * 100).toFixed(1)}%`,

  percentWhole: (value: number) => `${value.toFixed(1)}%`,

  number: (value: number) => new Intl.NumberFormat('en-US', {
    notation: 'compact', maximumFractionDigits: 1,
  }).format(value),

  date: (value: string) => new Date(value).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  }),

  monthYear: (value: string) => new Date(value).toLocaleDateString('en-US', {
    month: 'short', year: '2-digit',
  }),

  duration: (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  },
};
```

### Custom tooltip pattern

```tsx
import { chartTheme } from './chartTheme';
import { formatters } from './formatters';

interface DashboardTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
  valueFormatter?: (value: number) => string;
}

const DashboardTooltip = ({
  active,
  payload,
  label,
  valueFormatter = formatters.currency,
}: DashboardTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: chartTheme.tooltip.bg,
      border: `1px solid ${chartTheme.tooltip.border}`,
      borderRadius: chartTheme.tooltip.borderRadius,
      padding: '10px 14px', // --spacing-sm / --spacing-sm + 2
      boxShadow: chartTheme.tooltip.shadow,
    }}>
      <p style={{ margin: 0, fontWeight: 500, fontSize: 13 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, margin: '4px 0 0', fontSize: 13 }}>
          {entry.name}: {valueFormatter(entry.value)}
        </p>
      ))}
    </div>
  );
};

// Usage:
// <Tooltip content={<DashboardTooltip valueFormatter={formatters.currency} />} />
```

### Gradient fill pattern for area charts

```tsx
<AreaChart data={data}>
  <defs>
    <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={chartTheme.colors.primary} stopOpacity={0.3} />
      <stop offset="95%" stopColor={chartTheme.colors.primary} stopOpacity={0} />
    </linearGradient>
  </defs>
  <Area
    type="monotone"
    dataKey="tpv"
    stroke={chartTheme.colors.primary}
    fill="url(#gradientPrimary)"
    strokeWidth={2}
    dot={false}
    activeDot={{ r: 5, strokeWidth: 2 }}
  />
</AreaChart>
```

### Composed chart for dual-metric views (volume + value)

```tsx
<ComposedChart data={monthlyData}>
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid.stroke} />
  <XAxis dataKey="month" tickFormatter={formatters.monthYear} axisLine={false} tickLine={false} />
  <YAxis
    yAxisId="value"
    orientation="left"
    tickFormatter={formatters.currency}
    axisLine={false}
    tickLine={false}
  />
  <YAxis
    yAxisId="volume"
    orientation="right"
    tickFormatter={formatters.number}
    axisLine={false}
    tickLine={false}
  />
  <Bar yAxisId="volume" dataKey="transactionCount" fill={chartTheme.colors.secondary} opacity={0.6} radius={[4, 4, 0, 0]} />
  <Line yAxisId="value" type="monotone" dataKey="tpv" stroke={chartTheme.colors.primary} strokeWidth={2} dot={false} />
  <Tooltip content={<DashboardTooltip />} />
  <Legend />
</ComposedChart>
```

### ReferenceLine for targets and thresholds

```tsx
<ReferenceLine
  y={targetValue}
  stroke={chartTheme.colors.danger}
  strokeDasharray="6 4"
  label={{ value: 'Target', position: 'right', fill: chartTheme.colors.danger, fontSize: 12 }}
  ifOverflow="extendDomain"
/>
```

### Conditional bar coloring (positive/negative)

```tsx
<Bar dataKey="change">
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.change >= 0 ? chartTheme.colors.success : chartTheme.colors.danger}
    />
  ))}
</Bar>
```

### Brush component for time range selection

```tsx
<Brush
  dataKey="date"
  height={30}
  stroke={chartTheme.colors.primary}
  tickFormatter={formatters.date}
  startIndex={Math.round(data.length * 0.75)}
/>
```

Use `syncId="dashboard"` on multiple chart containers to synchronize Brush and Tooltip interactions across charts.

### Reusable ChartCard wrapper (using Origin Card)

```tsx
import { Card } from '@lightsparkdev/origin';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { chartTheme } from './chartTheme';
import { formatters } from './formatters';
import { DashboardTooltip } from './DashboardTooltip';
import styles from './ChartCard.module.scss';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number;
}

const ChartCard = ({ title, subtitle, children, height = 300 }: ChartCardProps) => (
  <Card variant="simple">
    <Card.Body>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);
```

```scss
// ChartCard.module.scss
@use 'pkg:@lightsparkdev/origin/tokens/text-styles' as *;

.header {
  margin-bottom: var(--spacing-md);
}

.title {
  @include label-lg; // 16px, 450 weight
  color: var(--text-primary);
  margin: 0;
}

.subtitle {
  @include body-sm; // 12px, 400 weight
  color: var(--text-secondary);
  margin: var(--spacing-3xs) 0 0;
}
```

---

## 6. Performance optimization

### Memoization (critical for Recharts)

Recharts re-renders aggressively when prop references change. Stabilize all function and object props:

```tsx
// BAD — function recreated every render, triggers full recalculation
<Line dataKey={(d) => d.value * 100} />

// GOOD — stable reference
const dataKeyFn = useCallback((d) => d.value * 100, []);
<Line dataKey={dataKeyFn} />

// Memoize data transformations
const chartData = useMemo(() => transformData(rawData), [rawData]);

// Memoize custom tooltips
const MemoizedTooltip = React.memo(DashboardTooltip);
```

### Large datasets (1000+ points)

Recharts is SVG-based — each data point creates DOM nodes. Performance degrades above ~1000 points.

Strategies:

1. **Downsample data** before rendering — show every Nth point or use LTTB (Largest-Triangle-Three-Buckets) algorithm to preserve visual shape
2. Set explicit `interval` on XAxis: `interval={Math.ceil(data.length / 20)}`
3. **Aggregate** — show hourly instead of per-minute, daily instead of hourly
4. **Data windowing** — only render visible portion, use Brush for navigation
5. **Disable animations** for frequently updating or large datasets

### Animation settings

```tsx
// Disable for large datasets or real-time dashboards
<Line isAnimationActive={false} dataKey="value" />

// Shorter animations for interactive dashboards (default is 1500ms)
<Line isAnimationActive={true} animationDuration={300} animationEasing="ease-out" />
```

### Event throttling

```tsx
<BarChart data={data} throttleDelay={100}>
```

### Lazy loading tabs

Only render chart content when a tab becomes active. Use `React.lazy` + `Suspense` for code splitting. Cache previously loaded data with TanStack Query to avoid re-fetching on tab switch.

Origin components (`Card`, `Tabs`, `Badge`, etc.) are built on Base UI and are already optimized — no extra performance work is needed for the UI shell.

---

## 7. Tab organization for multi-stakeholder dashboards

### Recommended tab structure for Lightspark

```
Overview → Partners → Corridors → Operations → Compliance
```

| Tab | Primary audience | Content |
|---|---|---|
| **Overview** | Executives, all stakeholders | Top KPIs (TPV, transactions, success rate, revenue), primary trend chart, high-level breakdowns |
| **Partners** | BD, Partnerships | Partner leaderboard, per-partner scorecards, comparison views, SLA tracking |
| **Corridors** | Operations, Product | Geography-based analytics, corridor performance table, flow visualizations |
| **Operations** | Engineering, Data | Real-time monitoring, settlement time distributions, error breakdowns, latency metrics |
| **Compliance** | Compliance, Legal | Risk scores, alert queues, regulatory metrics, screening status |

### Tab implementation with Origin

Use Origin's `Tabs` component — it is built on Base UI and handles ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, etc.) automatically. Do not hand-roll ARIA tab markup.

```tsx
import { Tabs } from '@lightsparkdev/origin';

const Dashboard = () => (
  <Tabs defaultValue="overview">
    <Tabs.List>
      <Tabs.Indicator />
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="partners">Partners</Tabs.Tab>
      <Tabs.Tab value="corridors">Corridors</Tabs.Tab>
      <Tabs.Tab value="operations">Operations</Tabs.Tab>
      <Tabs.Tab value="compliance">Compliance</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="overview"><OverviewTab /></Tabs.Panel>
    <Tabs.Panel value="partners"><PartnersTab /></Tabs.Panel>
    <Tabs.Panel value="corridors"><CorridorsTab /></Tabs.Panel>
    <Tabs.Panel value="operations"><OperationsTab /></Tabs.Panel>
    <Tabs.Panel value="compliance"><ComplianceTab /></Tabs.Panel>
  </Tabs>
);
```

**Variant options:** `Tabs.List` accepts `variant="default"` (standard) or `variant="minimal"` (stripped-down styling).

### Tab design rules

1. Maximum 5-7 tabs at a single navigation level. Beyond 7, users lose track
2. Organize by topic, not audience — it prevents duplication and lets everyone find what's relevant
3. Name tabs by content with short labels (1-3 words): "Overview", "Partners", "Corridors", "Operations", "Compliance"
4. First tab is always "Overview" — the landing view showing the most critical KPIs and trends
5. Maintain visual consistency across tabs — same grid, spacing, component patterns, and chart styling

### Tabs vs. filters vs. drill-downs

| Mechanism | When to use |
|---|---|
| **Tabs** | Switching between fundamentally different views/contexts (e.g., Overview vs. Partners vs. Corridors) |
| **Filters** | Same visualization structure, different data subsets (e.g., date range, partner, currency). Place prominently at top |
| **Drill-downs** | Exploring hierarchical data (e.g., All Partners → Single Partner → Specific Corridor → Individual Transactions) |

The **hybrid approach:** Global filters (date range, partner selection) persist across all tabs via URL params. Each tab has its own tab-specific filters. Drill-downs open in-place panels or modals (use Origin's `Dialog` component) with breadcrumb navigation.

### Tab state management

Store tab state in the URL for shareability and persistence:

```
// URL-based tab state (recommended)
/dashboard?tab=overview&dateRange=30d&partner=all

// Path-based for major views
/dashboard/overview
/dashboard/partners/:partnerId
```

Use `useSearchParams` from React Router. Global filters (date range) persist in URL params across tab switches. Tab-specific filters can be local state or URL params.

**Data loading strategy:**

- Lazy-load tab content (only fetch when tab activates)
- Cache with TanStack Query to avoid re-fetching on tab switch
- Show skeleton loaders matching the final layout during load (not spinners)
- Preload on hover/intent when possible

### Filter design

- Five precise filters beat fifteen vague ones. Ship with safe defaults so the first view is useful without clicks
- Standard filter set: Time period (Today, 7d, 30d, 90d, 12m, Custom) | Partner (All, specific) | Corridor (All, specific) | Currency (All, specific)
- Place filters in a persistent horizontal bar below the tab navigation on desktop. On mobile, collapse into a filter drawer/modal (use Origin's `Dialog`)
- Always show the active filter state clearly

---

## 8. Fintech metrics and dashboard patterns

### Metric hierarchy for payments infrastructure

**Tier 1 — North Star** (always in KPI cards):

- **TPV (Total Payment Volume):** Gross monetary value processed. The single most important metric. Show with WoW and MoM comparison
- **Transaction Count:** Usage/adoption indicator. Complements TPV since large transactions skew volume
- **Payment Success Rate:** % of attempts that succeed. Show with decline reason breakdown available on drill-down
- **Net Revenue / Take Rate:** Revenue as percentage of TPV

**Tier 2 — Operational** (prominent charts):

- **Average Transaction Value:** TPV ÷ Transaction Count
- **Settlement Time:** Time from initiation to funds arrival — critical for Lightning payments. Show P50, P90, P99
- **Decline Rate + Decline Reasons:** Categorized by error code, payment method, corridor
- **Active Partners:** Count with trend

**Tier 3 — Growth** (secondary views):

- TPV Growth Rate (MoM, QoQ, YoY)
- New Partner Onboarding Rate
- Corridor Expansion: New country/currency pairs activated
- Time to First Transaction: Partner onboarding efficiency

**Tier 4 — Conversion Funnel:**

- Payment Initiated → Authenticated → Authorized → Captured → Settled
- Track drop-off at each stage with decline/error attribution

### Time-series granularity by horizon

| Time horizon | Granularity | Use case |
|---|---|---|
| Today (live) | 5-minute intervals | Real-time monitoring, incident detection |
| Last 7 days | Hourly | Short-term trends, day-of-week patterns |
| Last 30 days | Daily | Monthly performance review, MoM comparison |
| Last 90 days | Daily or weekly | Quarterly review |
| Last 12 months | Weekly or monthly | Annual review, seasonality |

### Trend display patterns

- **Period comparison:** Always offer overlay of current period vs. same-period-prior (WoW, MoM, YoY). Show as lighter/dashed line behind the primary series
- **Moving averages:** 7-day MA for daily data smooths noise and reveals underlying trends
- **Anomaly highlighting:** Show expected range as a shaded confidence band. Flag points outside the band with distinctive markers and tooltip explanations
- **Time selectors:** Provide preset buttons (7d, 30d, 90d, 12m) plus custom date range picker

### Partner performance patterns

**Overview level:**

- Horizontal bar chart ranking top partners by TPV
- KPI cards: Total Partners, Active Partners, Total Partner TPV, Average Partner TPV

**Comparison level:**

- Side-by-side grouped bars or overlaid lines for selected partners
- Metrics grid: Partner | TPV | Transactions | Success Rate | Avg Settlement | Growth Rate
- Sortable table with sparklines for trend context

**Individual partner deep-dive:**

- Partner-specific KPIs with targets/benchmarks
- Transaction breakdown by type, corridor, currency
- SLA compliance scorecard using Origin `Badge` components:

```tsx
<Badge variant="green">On Track</Badge>
<Badge variant="yellow">Warning</Badge>
<Badge variant="red">Critical</Badge>
```

### Corridor/geography analytics

**Primary view:** Sortable corridor table (use Origin's `Table` component) with columns for Origin | Destination | Volume | Success Rate | Avg Settlement Time | Trend (sparkline). This is the most actionable format for operational use.

**Supplementary views:**

- Map visualization with connection arcs (thickness = volume) for executive presentations
- Single corridor deep-dive with time-series, settlement time distribution histogram, and success rate funnel
- Sankey diagram for flow visualization (limit to top 10-15 corridors to avoid clutter)

### Compliance dashboard components

- **Alert queue:** Prioritized list of flagged items, sortable by risk score and timestamp
- **Risk score distribution:** Histogram showing customer risk score spread
- **Regulatory metrics:** KPI cards for SAR filings, KYC completion rate, sanctions screening hit rate
- **SLA tracker:** % of alerts resolved within regulatory timeframes
- **Traffic light status** for each compliance metric against thresholds — use Origin `Badge` variants (`green`, `yellow`, `red`)

---

## 9. Anti-patterns to avoid

### Design anti-patterns

1. **Information overload:** More than 10 KPIs per view. Fix: use progressive disclosure — summary → trend → detail
2. **Vanity metrics:** Numbers that look good but don't drive decisions. Every metric must answer "What decision does this inform?"
3. **No context:** A number alone ("$500K") means nothing. Always show comparison (vs. prior period), scope (time range, units), trend (direction), and status (on/off track)
4. **Pie charts with >3 slices:** Replace with sorted horizontal bar charts
5. **Dual y-axes line charts:** They create false correlations. Split into two vertically aligned charts
6. **3D charts, gauges, decorative elements:** They distort perception and waste space
7. **Truncated bar chart y-axes:** Bar charts MUST start at zero. Line charts may truncate when the relevant signal is in the difference range
8. **Inconsistent scales across side-by-side charts:** Misleads viewers into false comparisons
9. **Evenly sized KPIs with no hierarchy:** Not all metrics are equally important — use size, position, and emphasis to signal priority
10. **Missing timestamps:** Always show when data was last updated and what time range it covers

### Origin-specific anti-patterns

11. **Bypassing Origin tokens with hardcoded values:** Always use CSS custom properties from Origin rather than hardcoded hex/px values, even in chart-adjacent code. The only exception is `chartTheme.ts`, which must use concrete values for Recharts SVG rendering — but those values should be clearly annotated with their Origin token source
12. **Hand-rolling components Origin already provides:** Use `Card`, `Tabs`, `Badge`, `Button`, `Dialog`, `Table` from Origin — don't rebuild them. Origin components are built on Base UI with proper ARIA attributes, keyboard navigation, and dark mode support
13. **Ignoring dark mode:** Origin tokens auto-swap in dark mode. If you hardcode a light-mode hex value, it will break in dark mode. Always prefer semantic tokens (`--text-primary`, `--surface-elevated`) over raw color tokens (`--color-gray-050`)

### Recharts/React performance anti-patterns

1. **Unstable function references as props:** Passing inline functions to `dataKey`, `formatter`, etc. causes full recalculation on every render. Always use `useCallback`/`useMemo`
2. **Rendering thousands of SVG points:** Aggregate or downsample before rendering. Recharts degrades above ~1000 points
3. **Heavy animations on data refresh:** Disable `isAnimationActive` for real-time or frequently updating charts
4. **Not wrapping in ResponsiveContainer:** Charts won't resize. Always wrap
5. **Forgetting to code-split:** Large chart views should use `React.lazy` + `Suspense`
6. **Re-fetching data on every tab switch:** Use TanStack Query or similar caching

### Visualization anti-patterns

1. **Red-green only encoding:** ~8% of males are red-green colorblind. Always add a secondary indicator (icon, pattern, text)
2. **Color as sole information carrier:** Violates WCAG 1.4.1. Combine color with shape, icon, or label
3. **Stacked bar charts with >5 categories:** Non-baseline categories are impossible to compare. Use small multiples instead
4. **Cherry-picked time ranges:** Always show full context or offer comparison periods
5. **Cumulative charts hiding declining trends:** Cumulative lines always slope upward even during decline. Show rate-based views alongside cumulative

---

## 10. Accessibility requirements

### Color contrast

- **Text:** Minimum 4.5:1 contrast ratio (WCAG AA). 7:1 for AAA
- **Large text** (18px+ or 14px bold): Minimum 3:1
- **Non-text elements** (chart bars, icons, lines): Minimum 3:1 against background
- **Data labels in charts:** Minimum 12px font size with sufficient contrast

Origin's semantic color tokens (`--text-primary`, `--text-secondary`, `--icon-success`, etc.) are designed to meet WCAG AA contrast requirements in both light and dark modes. Use them consistently.

### Colorblind safety

- Use the Okabe-Ito palette (listed in Section 4) as the default for all multi-series charts
- Never use red-green as the only differentiator
- Add patterns, textures, or different line styles (solid, dashed, dotted) as secondary encoding
- Test with a colorblindness simulator before shipping

### Screen reader support

```tsx
// Chart container
<div role="img" aria-label="Weekly TPV trend showing $12.4M this week, up 8% from last week">
  <ResponsiveContainer>
    <LineChart>{/* ... */}</LineChart>
  </ResponsiveContainer>
</div>

// Provide accessible data table alternative for complex charts
<details>
  <summary>View data table</summary>
  <table aria-label="Weekly TPV data">
    {/* accessible table with proper headers */}
  </table>
</details>
```

### ARIA patterns — use Origin components

Origin components built on Base UI handle ARIA automatically. Use them instead of hand-rolling:

| Pattern | Origin component | ARIA handled |
|---|---|---|
| Tab interface | `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, keyboard nav |
| Modal/dialog | `Dialog` | `role="dialog"`, `aria-modal`, focus trap, Escape to close |
| Status labels | `Badge` | Semantic color + text content |
| Data tables | `Table` | Proper `<table>` semantics, sortable column `aria-sort` |

For elements Origin doesn't cover (e.g., live data updates):

```tsx
// Live data updates
<div aria-live="polite" aria-atomic="true">
  Last updated: {timestamp}
</div>

// Filter toolbar
<div role="toolbar" aria-label="Dashboard filters">
  {/* filter controls */}
</div>
```

### Typography for dashboards (Origin typography scale)

| Element | Origin mixin | Size | Weight |
|---|---|---|---|
| KPI headline values | `@include headline` | 24px | 500 (medium) |
| KPI labels | `@include label-sm` | 12px | 450 (book) |
| Chart titles | `@include label-lg` | 16px | 450 (book) |
| Section headers | `@include headline-sm` | 18px | 500 (medium) |
| Chart axis ticks | — (use `--font-size-xs`: 12px) | 12px | — |
| Chart legends | — (use `--font-size-sm`: 13px) | 13px | — |
| Body text / table cells | `@include body` | 14px | 400 (regular) |
| Small/secondary text | `@include body-sm` | 12px | 400 (regular) |

- **Font family:** "Suisse Intl" (`--font-family-sans`) for all UI text
- **Monospace:** "Suisse Int'l Mono" (`--font-family-mono`) for code, transaction IDs, hashes
- Ideal line length: 40-60 characters per line

---

## 11. Complete example: Lightspark Overview tab

```tsx
import React, { useMemo } from 'react';
import { Card, Badge, Tabs } from '@lightsparkdev/origin';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine,
} from 'recharts';
import { chartTheme } from './chartTheme';
import { formatters } from './formatters';
import { DashboardTooltip } from './DashboardTooltip';
import styles from './Dashboard.module.scss';

// ─── KPI Row ───────────────────────────────────────────────

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  period: string;
}

const KPICard = ({ label, value, change, changeLabel, period }: KPICardProps) => (
  <Card variant="simple">
    <Card.Body>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}</div>
      <div className={styles.kpiChangeRow}>
        <Badge variant={change >= 0 ? 'green' : 'red'}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </Badge>
        <span className={styles.kpiChangeLabel}>{changeLabel}</span>
      </div>
      <div className={styles.kpiPeriod}>{period}</div>
    </Card.Body>
  </Card>
);

const OverviewKPIs = () => (
  <div className={styles.kpiRow}>
    <KPICard label="Weekly TPV" value="$12.4M" change={8.2} changeLabel="vs last week" period="Feb 7–13, 2026" />
    <KPICard label="Transactions" value="42.1K" change={12.5} changeLabel="vs last week" period="Feb 7–13, 2026" />
    <KPICard label="Success Rate" value="98.7%" change={0.3} changeLabel="vs last week" period="Feb 7–13, 2026" />
    <KPICard label="Avg Settlement" value="1.2s" change={-15} changeLabel="vs last week" period="Feb 7–13, 2026" />
    <KPICard label="Active Partners" value="8" change={1} changeLabel="new this month" period="February 2026" />
  </div>
);

// ─── Primary Chart: TPV Trend ──────────────────────────────

const TPVTrendChart = ({ data }: { data: Array<{ date: string; tpv: number; priorTPV: number }> }) => (
  <Card variant="simple">
    <Card.Body>
      <h3 className={styles.chartTitle}>Total Payment Volume</h3>
      <p className={styles.chartSubtitle}>Daily TPV with prior period comparison</p>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="tpvGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartTheme.colors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartTheme.colors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid.stroke} />
          <XAxis dataKey="date" tickFormatter={formatters.date} axisLine={false} tickLine={false}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <YAxis tickFormatter={formatters.currency} axisLine={false} tickLine={false}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <Tooltip content={<DashboardTooltip valueFormatter={formatters.currencyFull} />} />
          <Area type="monotone" dataKey="priorTPV" stroke={chartTheme.axis.stroke} fill="none"
            strokeDasharray="4 4" dot={false} name="Prior Period" />
          <Area type="monotone" dataKey="tpv" stroke={chartTheme.colors.primary}
            fill="url(#tpvGradient)" strokeWidth={2} dot={false} activeDot={{ r: 5 }} name="Current" />
        </AreaChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);

// ─── Breakdown: TPV by Partner ─────────────────────────────

const PartnerBreakdown = ({ data }: { data: Array<{ partner: string; tpv: number }> }) => (
  <Card variant="simple">
    <Card.Body>
      <h3 className={styles.chartTitle}>TPV by Partner</h3>
      <p className={styles.chartSubtitle}>Last 30 days</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartTheme.grid.stroke} />
          <XAxis type="number" tickFormatter={formatters.currency} axisLine={false} tickLine={false}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <YAxis type="category" dataKey="partner" axisLine={false} tickLine={false} width={80}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <Tooltip content={<DashboardTooltip valueFormatter={formatters.currencyFull} />} />
          <Bar dataKey="tpv" fill={chartTheme.colors.primary} radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);

// ─── Success Rate Trend ────────────────────────────────────

const SuccessRateTrend = ({ data }: { data: Array<{ date: string; successRate: number }> }) => (
  <Card variant="simple">
    <Card.Body>
      <h3 className={styles.chartTitle}>Payment Success Rate</h3>
      <p className={styles.chartSubtitle}>Daily, last 30 days</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid.stroke} />
          <XAxis dataKey="date" tickFormatter={formatters.date} axisLine={false} tickLine={false}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <YAxis domain={[95, 100]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false}
            tick={{ fill: chartTheme.axis.tickFill, fontSize: chartTheme.axis.fontSize }} />
          <ReferenceLine y={99} stroke={chartTheme.colors.success} strokeDasharray="6 4"
            label={{ value: 'Target: 99%', position: 'right', fill: chartTheme.colors.success, fontSize: 11 }} />
          <Tooltip content={<DashboardTooltip valueFormatter={(v) => `${v.toFixed(2)}%`} />} />
          <Line type="monotone" dataKey="successRate" stroke={chartTheme.colors.primary}
            strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);

// ─── Full Dashboard with Tabs ──────────────────────────────

const LightsparkDashboard = ({ dashboardData }) => (
  <div className={styles.dashboard}>
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Indicator />
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="partners">Partners</Tabs.Tab>
        <Tabs.Tab value="corridors">Corridors</Tabs.Tab>
        <Tabs.Tab value="operations">Operations</Tabs.Tab>
        <Tabs.Tab value="compliance">Compliance</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview">
        <div className={styles.tabContent}>
          <OverviewKPIs />
          <div className={styles.chartSectionFull}>
            <TPVTrendChart data={dashboardData.tpvTrend} />
          </div>
          <div className={styles.chartSectionSplit}>
            <PartnerBreakdown data={dashboardData.partnerTPV} />
            <SuccessRateTrend data={dashboardData.successRate} />
          </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="partners">{/* <PartnersTab /> */}</Tabs.Panel>
      <Tabs.Panel value="corridors">{/* <CorridorsTab /> */}</Tabs.Panel>
      <Tabs.Panel value="operations">{/* <OperationsTab /> */}</Tabs.Panel>
      <Tabs.Panel value="compliance">{/* <ComplianceTab /> */}</Tabs.Panel>
    </Tabs>
  </div>
);
```

```scss
// Dashboard.module.scss
@use 'pkg:@lightsparkdev/origin/tokens/text-styles' as *;

.dashboard {
  max-width: var(--max-width-7xl); // 1280px
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.kpiRow {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: var(--spacing-xl);
}

.kpiLabel {
  @include label-sm;
  color: var(--text-secondary);
}

.kpiValue {
  @include headline;
  color: var(--text-primary);
  margin-top: var(--spacing-2xs);
}

.kpiChangeRow {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.kpiChangeLabel {
  @include body-sm;
  color: var(--text-secondary);
}

.kpiPeriod {
  @include body-sm;
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
}

.tabContent {
  padding-top: var(--spacing-xl);
}

.chartTitle {
  @include label-lg;
  color: var(--text-primary);
  margin: 0;
}

.chartSubtitle {
  @include body-sm;
  color: var(--text-secondary);
  margin: var(--spacing-3xs) 0 var(--spacing-md);
}

.chartSectionFull {
  margin-bottom: var(--spacing-xl);
}

.chartSectionSplit {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
```

---

## 12. Quick reference checklist

Use this checklist before shipping any dashboard:

### Layout

- [ ] KPI cards at top, 4-6 per row, consistent height
- [ ] Most critical metric in top-left position
- [ ] Origin spacing tokens used throughout (`--spacing-xl`, `--spacing-md`) — no hardcoded px
- [ ] Origin breakpoint tokens for responsive behavior (`--screens-md`, `--screens-lg`, etc.)
- [ ] Responsive: cards reflow on tablet/mobile
- [ ] Whitespace between sections, padding inside cards

### KPI cards

- [ ] Every card has: label, value, comparison, trend visual, and date period
- [ ] Origin `Card` component with `variant="simple"` for containers
- [ ] Origin `Badge` component for status indicators
- [ ] Origin typography mixins: `@include headline` for values, `@include label-sm` for labels
- [ ] Semantic colors via Origin tokens — never hardcoded hex for UI elements
- [ ] Secondary indicator (arrow/icon) alongside color — never color alone

### Charts

- [ ] Correct chart type for the data question (see Section 3 matrix)
- [ ] Wrapped in `ResponsiveContainer` with fixed height
- [ ] `chartTheme.ts` used for all chart styling — values annotated with Origin token sources
- [ ] `axisLine={false}`, `tickLine={false}`, horizontal grid only
- [ ] Currency/percentage formatting on axes and tooltips via `formatters.ts`
- [ ] No more than 5 lines per chart, 5-7 colors per chart
- [ ] No pie charts with >3 slices, no 3D, no dual y-axes

### Performance

- [ ] All function/object props memoized (`useCallback`, `useMemo`)
- [ ] Animations disabled for large datasets or real-time views
- [ ] Data downsampled if >1000 points
- [ ] Tab content lazy-loaded, data cached across tab switches

### Accessibility

- [ ] Colorblind-safe palette (Okabe-Ito) for multi-series charts
- [ ] 4.5:1 contrast ratio for text, 3:1 for non-text elements — Origin semantic tokens handle this
- [ ] `role="img"` + `aria-label` on chart containers
- [ ] Origin `Tabs` component used (ARIA tab pattern handled automatically)
- [ ] Data table alternative available for complex charts
- [ ] Minimum 12px (`--font-size-xs`) font size for all chart labels

### Origin integration

- [ ] All UI chrome uses Origin components (`Card`, `Tabs`, `Badge`, `Table`, `Dialog`, `Button`)
- [ ] SCSS modules with Origin typography mixins (`@include headline`, `@include body-sm`, etc.)
- [ ] Origin semantic color tokens for all non-chart UI (`--text-primary`, `--surface-elevated`, etc.)
- [ ] Dark mode works — semantic tokens swap automatically, chart theme handles dark mode if needed
- [ ] Font family is "Suisse Intl" (`--font-family-sans`) — no overrides
- [ ] No hardcoded hex/px values in SCSS — only Origin tokens

### Context

- [ ] Every number has a comparison (vs. prior period, vs. target)
- [ ] Time range clearly displayed on every view
- [ ] "Last updated" timestamp shown
- [ ] Units on all axis labels and in tooltips
