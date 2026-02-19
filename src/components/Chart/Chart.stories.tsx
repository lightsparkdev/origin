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
/*  14. LiveValueDemo                                                          */
/* -------------------------------------------------------------------------- */

function LiveValueWrapper() {
  const [value, setValue] = React.useState(12847);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 5) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <Chart.LiveValue
      value={value}
      formatValue={(v) => `$${Math.round(v).toLocaleString()}`}
      style={{ fontSize: 32, fontWeight: 500 }}
    />
  );
}

export const LiveValueDemo: Story = {
  render: () => <LiveValueWrapper />,
};

/* -------------------------------------------------------------------------- */
/*  15. LiveDotStates                                                          */
/* -------------------------------------------------------------------------- */

export const LiveDotStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      {(['active', 'processing', 'idle', 'error'] as const).map((status) => (
        <div key={status} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{status}</p>
          <Chart.LiveDot status={status} />
        </div>
      ))}
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
      <Chart.Uptime data={uptimeData} />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  20. ActivityGrid                                                           */
/* -------------------------------------------------------------------------- */

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = Array.from({ length: 20 }, (_, i) => `W${i + 1}`);

const activityData = weeks.flatMap((week, ci) =>
  days.map((day) => ({
    row: day,
    col: week,
    value: ((ci * 7 + days.indexOf(day)) * 37) % 10,
  })),
);

export const ActivityGrid: Story = {
  render: () => (
    <Chart.ActivityGrid
      rows={days}
      columns={weeks}
      showRowLabels
      showColumnLabels
      data={activityData}
    />
  ),
};
