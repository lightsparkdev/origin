import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Chart from './';

const meta = {
  title: 'Components/Chart',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  1. Line                                                                   */
/* -------------------------------------------------------------------------- */

export const Line: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Line
        data={[
          { date: 'Mon', incoming: 120, outgoing: 80 },
          { date: 'Tue', incoming: 150, outgoing: 95 },
          { date: 'Wed', incoming: 140, outgoing: 110 },
          { date: 'Thu', incoming: 180, outgoing: 100 },
          { date: 'Fri', incoming: 160, outgoing: 130 },
        ]}
        series={[
          { key: 'incoming', label: 'Incoming' },
          { key: 'outgoing', label: 'Outgoing' },
        ]}
        xKey="date"
        height={200}
        grid
        tooltip
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  2. LineAreaFill                                                            */
/* -------------------------------------------------------------------------- */

export const LineAreaFill: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Line
        data={[
          { date: 'Mon', value: 120 },
          { date: 'Tue', value: 150 },
          { date: 'Wed', value: 140 },
          { date: 'Thu', value: 180 },
          { date: 'Fri', value: 160 },
          { date: 'Sat', value: 200 },
          { date: 'Sun', value: 190 },
        ]}
        dataKey="value"
        xKey="date"
        height={200}
        grid
        fill
        tooltip="compact"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  3. LineDashed                                                              */
/* -------------------------------------------------------------------------- */

export const LineDashed: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Line
        data={[
          { date: 'Jan', actual: 100, projected: 110, target: 130 },
          { date: 'Feb', actual: 120, projected: 125, target: 130 },
          { date: 'Mar', actual: 115, projected: 140, target: 130 },
          { date: 'Apr', actual: 140, projected: 155, target: 130 },
          { date: 'May', actual: 160, projected: 170, target: 130 },
        ]}
        series={[
          { key: 'actual', label: 'Actual' },
          { key: 'projected', label: 'Projected', style: 'dashed' },
          { key: 'target', label: 'Target', style: 'dotted', color: 'var(--text-tertiary)' },
        ]}
        xKey="date"
        height={200}
        grid
        tooltip
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  4. LineReferenceLines                                                      */
/* -------------------------------------------------------------------------- */

export const LineReferenceLines: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Line
        data={[
          { date: 'Mon', value: 85 },
          { date: 'Tue', value: 92 },
          { date: 'Wed', value: 78 },
          { date: 'Thu', value: 95 },
          { date: 'Fri', value: 88 },
        ]}
        dataKey="value"
        xKey="date"
        height={200}
        grid
        tooltip
        referenceLines={[
          { value: 90, label: 'Target' },
          { value: 75, label: 'Minimum' },
        ]}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  5. SparklineLine                                                           */
/* -------------------------------------------------------------------------- */

export const SparklineLine: Story = {
  render: () => (
    <div style={{ width: 160 }}>
      <Chart.Sparkline
        data={[{ v: 10 }, { v: 15 }, { v: 12 }, { v: 18 }, { v: 14 }, { v: 22 }, { v: 19 }, { v: 25 }]}
        dataKey="v"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  6. SparklineBar                                                            */
/* -------------------------------------------------------------------------- */

export const SparklineBar: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Chart.Sparkline
        variant="bar"
        data={[
          { v: 12 }, { v: 18 }, { v: 15 }, { v: 22 }, { v: 20 }, { v: 14 }, { v: 25 }, { v: 19 },
          { v: 16 }, { v: 21 }, { v: 13 }, { v: 24 }, { v: 17 }, { v: 23 }, { v: 11 }, { v: 20 },
          { v: 18 }, { v: 26 }, { v: 15 }, { v: 22 }, { v: 19 }, { v: 14 }, { v: 21 }, { v: 16 },
        ]}
        dataKey="v"
        color="var(--color-blue-400)"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  7. StackedArea                                                             */
/* -------------------------------------------------------------------------- */

export const StackedArea: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.StackedArea
        data={[
          { month: 'Jan', payments: 400, transfers: 200, fees: 50 },
          { month: 'Feb', payments: 450, transfers: 250, fees: 60 },
          { month: 'Mar', payments: 420, transfers: 280, fees: 55 },
          { month: 'Apr', payments: 500, transfers: 300, fees: 70 },
          { month: 'May', payments: 480, transfers: 320, fees: 65 },
          { month: 'Jun', payments: 550, transfers: 350, fees: 80 },
        ]}
        series={[
          { key: 'payments', label: 'Payments', color: 'var(--color-blue-700)' },
          { key: 'transfers', label: 'Transfers', color: 'var(--color-blue-400)' },
          { key: 'fees', label: 'Fees', color: 'var(--color-blue-200)' },
        ]}
        xKey="month"
        height={250}
        grid
        tooltip
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  8. BarGrouped                                                              */
/* -------------------------------------------------------------------------- */

export const BarGrouped: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Bar
        data={[
          { month: 'Jan', incoming: 400, outgoing: 240 },
          { month: 'Feb', incoming: 500, outgoing: 300 },
          { month: 'Mar', incoming: 450, outgoing: 280 },
          { month: 'Apr', incoming: 600, outgoing: 350 },
          { month: 'May', incoming: 550, outgoing: 320 },
        ]}
        series={[
          { key: 'incoming', label: 'Incoming' },
          { key: 'outgoing', label: 'Outgoing' },
        ]}
        xKey="month"
        height={220}
        grid
        tooltip
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  9. BarStacked                                                              */
/* -------------------------------------------------------------------------- */

export const BarStacked: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Bar
        data={[
          { q: 'Q1', payments: 400, transfers: 200, fees: 50 },
          { q: 'Q2', payments: 500, transfers: 250, fees: 60 },
          { q: 'Q3', payments: 450, transfers: 280, fees: 55 },
          { q: 'Q4', payments: 600, transfers: 300, fees: 70 },
        ]}
        series={[
          { key: 'payments', label: 'Payments', color: 'var(--color-blue-700)' },
          { key: 'transfers', label: 'Transfers', color: 'var(--color-blue-400)' },
          { key: 'fees', label: 'Fees', color: 'var(--color-blue-200)' },
        ]}
        xKey="q"
        height={220}
        grid
        tooltip
        stacked
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  10. BarHorizontal                                                          */
/* -------------------------------------------------------------------------- */

export const BarHorizontal: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Bar
        data={[
          { country: 'US', volume: 4200 },
          { country: 'UK', volume: 2800 },
          { country: 'EU', volume: 3100 },
          { country: 'JP', volume: 1500 },
          { country: 'BR', volume: 900 },
        ]}
        dataKey="volume"
        xKey="country"
        height={220}
        grid
        tooltip
        orientation="horizontal"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  11. Composed                                                               */
/* -------------------------------------------------------------------------- */

export const Composed: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Composed
        data={[
          { month: 'Jan', revenue: 4200, rate: 3.2 },
          { month: 'Feb', revenue: 5100, rate: 3.8 },
          { month: 'Mar', revenue: 4800, rate: 3.5 },
          { month: 'Apr', revenue: 6200, rate: 4.1 },
          { month: 'May', revenue: 5800, rate: 3.9 },
          { month: 'Jun', revenue: 7100, rate: 4.5 },
        ]}
        series={[
          { key: 'revenue', label: 'Revenue', type: 'bar', color: 'var(--color-blue-300)' },
          { key: 'rate', label: 'Conversion %', type: 'line', axis: 'right', color: 'var(--text-primary)' },
        ]}
        xKey="month"
        height={250}
        grid
        tooltip
        formatYLabelRight={(v) => `${v}%`}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  12. Donut                                                                  */
/* -------------------------------------------------------------------------- */

export const Donut: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Pie
        data={[
          { name: 'Payments', value: 4200, color: 'var(--color-blue-700)' },
          { name: 'Transfers', value: 2800, color: 'var(--color-blue-500)' },
          { name: 'Fees', value: 650, color: 'var(--color-blue-300)' },
          { name: 'Refunds', value: 320, color: 'var(--color-blue-100)' },
        ]}
        height={200}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  13. Live                                                                   */
/* -------------------------------------------------------------------------- */

function LiveChartWrapper() {
  const [data, setData] = React.useState<{ time: number; value: number }[]>([]);
  const [value, setValue] = React.useState(100);
  const valueRef = React.useRef(100);

  React.useEffect(() => {
    const now = Date.now() / 1000;
    const seed: { time: number; value: number }[] = [];
    let v = 100;
    for (let i = 30; i >= 0; i--) {
      v += (Math.random() - 0.5) * 4;
      seed.push({ time: now - i, value: v });
    }
    valueRef.current = v;
    setData(seed);
    setValue(v);

    const interval = setInterval(() => {
      const t = Date.now() / 1000;
      valueRef.current += (Math.random() - 0.5) * 3;
      const next = valueRef.current;
      setValue(next);
      setData((prev) => {
        const cutoff = t - 60;
        const filtered = prev.filter((p) => p.time > cutoff);
        return [...filtered, { time: t, value: next }];
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Chart.Live
      data={data}
      value={value}
      color="var(--color-blue-500)"
      window={30}
      height={200}
      grid
      fill
      scrub
      formatValue={(v) => v.toFixed(1)}
    />
  );
}

export const Live: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <LiveChartWrapper />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  16. Gauge                                                                  */
/* -------------------------------------------------------------------------- */

export const Gauge: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Chart.Gauge
        value={0.32}
        min={0}
        max={1}
        thresholds={[
          { upTo: 0.5, color: 'var(--color-green-500)', label: 'Great' },
          { upTo: 0.8, color: 'var(--color-yellow-500)', label: 'Needs work' },
          { upTo: 1, color: 'var(--color-red-500)', label: 'Poor' },
        ]}
        markerLabel="P75"
        formatValue={(v) => `${v.toFixed(2)}s`}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  17. GaugeMinimal                                                           */
/* -------------------------------------------------------------------------- */

export const GaugeMinimal: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Chart.Gauge
        value={0.32}
        min={0}
        max={1}
        variant="minimal"
        thresholds={[
          { upTo: 0.5, color: 'var(--color-green-500)', label: 'Great' },
          { upTo: 0.8, color: 'var(--color-yellow-500)', label: 'Needs work' },
          { upTo: 1, color: 'var(--color-red-500)', label: 'Poor' },
        ]}
        formatValue={(v) => `${v.toFixed(2)}s`}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  18. BarList                                                                */
/* -------------------------------------------------------------------------- */

export const BarList: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Chart.BarList
        data={[
          { name: '/', value: 2340, displayValue: '0.28s' },
          { name: '/pricing', value: 326, displayValue: '0.34s' },
          { name: '/blog', value: 148, displayValue: '0.31s' },
          { name: '/docs', value: 89, displayValue: '0.42s' },
          { name: '/about', value: 45, displayValue: '0.25s' },
        ]}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  19. Uptime                                                                 */
/* -------------------------------------------------------------------------- */

const uptimeData = Array.from({ length: 90 }, (_, i) => ({
  status: (i % 17 === 0 ? 'down' : i % 11 === 0 ? 'degraded' : 'up') as 'up' | 'down' | 'degraded',
  label: `Day ${i + 1}`,
}));

export const Uptime: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Uptime data={uptimeData} label="90 days — 97.8% uptime" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  21. Scatter                                                                */
/* -------------------------------------------------------------------------- */

export const Scatter: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Scatter
        data={[
          {
            key: 'product-a',
            label: 'Product A',
            color: 'var(--color-blue-600)',
            data: [
              { x: 10, y: 30, label: 'Jan' },
              { x: 25, y: 55, label: 'Feb' },
              { x: 40, y: 70, label: 'Mar' },
              { x: 55, y: 45, label: 'Apr' },
              { x: 70, y: 85, label: 'May' },
              { x: 85, y: 60, label: 'Jun' },
            ],
          },
          {
            key: 'product-b',
            label: 'Product B',
            color: 'var(--color-purple-500)',
            data: [
              { x: 15, y: 60 },
              { x: 30, y: 40 },
              { x: 50, y: 80 },
              { x: 65, y: 35 },
              { x: 80, y: 90 },
            ],
          },
        ]}
        height={300}
        grid
        tooltip
        legend
        formatXLabel={(v) => `${v}%`}
        formatYLabel={(v) => `$${v}`}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  22. Split (Distribution)                                                   */
/* -------------------------------------------------------------------------- */

export const Split: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Split
        data={[
          { label: 'Payments', value: 4200, color: 'var(--color-blue-700)' },
          { label: 'Transfers', value: 2800, color: 'var(--color-blue-400)' },
          { label: 'Fees', value: 650, color: 'var(--color-blue-200)' },
          { label: 'Refunds', value: 320, color: 'var(--color-blue-100)' },
        ]}
        formatValue={(v) => `$${v.toLocaleString()}`}
        showValues
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  23. BarListRanked                                                          */
/* -------------------------------------------------------------------------- */

export const BarListRanked: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Chart.BarList
        data={[
          { name: 'United States', value: 4200, secondaryValue: 32, change: 'up' },
          { name: 'United Kingdom', value: 2800, secondaryValue: 21, change: 'down' },
          { name: 'Germany', value: 1500, secondaryValue: 11, change: 'neutral' },
          { name: 'Japan', value: 900, secondaryValue: 7 },
          { name: 'Brazil', value: 650, secondaryValue: 5, change: 'up' },
        ]}
        formatValue={(v) => `$${v.toLocaleString()}`}
        formatSecondaryValue={(v) => `${v}%`}
        showRank
      />
    </div>
  ),
};


/* -------------------------------------------------------------------------- */
/*  27. Waterfall                                                              */
/* -------------------------------------------------------------------------- */

export const Waterfall: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Waterfall
        data={[
          { label: 'Revenue', value: 420, type: 'total' },
          { label: 'Product', value: 280 },
          { label: 'Services', value: 140 },
          { label: 'Refunds', value: -85 },
          { label: 'Fees', value: -45 },
          { label: 'Tax', value: -62 },
          { label: 'Net', value: 648, type: 'total' },
        ]}
        height={300}
        grid
        tooltip
        showValues
        formatValue={(v) => `$${v}`}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  28. Sankey                                                                 */
/* -------------------------------------------------------------------------- */

export const Funnel: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Chart.Funnel
        data={[
          { label: 'Visitors', value: 10000, color: 'var(--color-blue-700)' },
          { label: 'Sign ups', value: 4200, color: 'var(--color-blue-500)' },
          { label: 'Activated', value: 2800, color: 'var(--color-blue-400)' },
          { label: 'Subscribed', value: 1200, color: 'var(--color-blue-300)' },
          { label: 'Retained', value: 900, color: 'var(--color-blue-200)' },
        ]}
        formatValue={(v) => v.toLocaleString()}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  26. Sankey                                                                 */
/* -------------------------------------------------------------------------- */

export const Sankey: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <Chart.Sankey
        data={{
          nodes: [
            { id: 'revenue', label: 'Revenue', color: 'var(--color-blue-700)' },
            { id: 'grants', label: 'Grants', color: 'var(--color-blue-400)' },
            { id: 'investments', label: 'Investments', color: 'var(--color-blue-200)' },
            { id: 'engineering', label: 'Engineering', color: 'var(--color-purple-600)' },
            { id: 'marketing', label: 'Marketing', color: 'var(--color-purple-400)' },
            { id: 'operations', label: 'Operations', color: 'var(--color-purple-200)' },
            { id: 'product', label: 'Product', color: 'var(--color-green-600)' },
            { id: 'growth', label: 'Growth', color: 'var(--color-green-400)' },
            { id: 'infra', label: 'Infrastructure', color: 'var(--color-green-200)' },
          ],
          links: [
            { source: 'revenue', target: 'engineering', value: 400 },
            { source: 'revenue', target: 'marketing', value: 200 },
            { source: 'revenue', target: 'operations', value: 150 },
            { source: 'grants', target: 'engineering', value: 80 },
            { source: 'grants', target: 'operations', value: 40 },
            { source: 'investments', target: 'marketing', value: 60 },
            { source: 'investments', target: 'engineering', value: 30 },
            { source: 'engineering', target: 'product', value: 350 },
            { source: 'engineering', target: 'infra', value: 160 },
            { source: 'marketing', target: 'growth', value: 220 },
            { source: 'marketing', target: 'product', value: 40 },
            { source: 'operations', target: 'infra', value: 120 },
            { source: 'operations', target: 'growth', value: 70 },
          ],
        }}
        stages={['Sources', 'Departments', 'Outcomes']}
        showValues
        height={380}
        formatValue={(v) => `$${v}k`}
      />
    </div>
  ),
};
