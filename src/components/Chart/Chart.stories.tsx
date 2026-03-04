import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Chart from './';
import type { WaterfallSegment } from './';
import { AnalyticsProvider } from '../Analytics';
import type { InteractionInfo } from '../Analytics';
import { Button } from '../Button';

const meta = {
  title: 'Components/Chart',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
      interactive
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

export const LiveDotStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
      {(['active', 'degraded', 'down', 'unknown'] as const).map((status) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <Chart.LiveDot status={status} size={8} />
          <span className="body-sm" style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {status}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const LiveValueAnimated: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(1234);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <Chart.LiveValue
          value={value}
          formatValue={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          className="headline-lg"
          style={{ color: 'var(--text-primary)' }}
        />
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
          <Button variant="outline" size="compact" onClick={() => setValue((v) => v + Math.floor(Math.random() * 500))}>
            Increase
          </Button>
          <Button variant="outline" size="compact" onClick={() => setValue((v) => Math.max(0, v - Math.floor(Math.random() * 500)))}>
            Decrease
          </Button>
          <Button variant="outline" size="compact" onClick={() => setValue(0)}>
            Reset
          </Button>
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-tertiary)' }}>
          Target: {value.toLocaleString()} — the displayed value lerps smoothly toward the target.
        </p>
      </div>
    );
  },
};

export const BarWithAnalytics: Story = {
  render: function Render() {
    const [events, setEvents] = React.useState<string[]>([]);

    const handler = React.useMemo(
      () => ({
        onInteraction: (info: InteractionInfo) => {
          const entry = `${info.component} · ${info.interaction} · "${info.name}" ${info.metadata ? JSON.stringify(info.metadata) : ''}`;
          setEvents((prev) => [entry, ...prev].slice(0, 10));
        },
      }),
      [],
    );

    return (
      <AnalyticsProvider value={handler}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ width: 388 }}>
            <Chart.Bar
              analyticsName="revenue-chart"
              data={[
                { month: 'Jan', revenue: 400 },
                { month: 'Feb', revenue: 300 },
                { month: 'Mar', revenue: 520 },
                { month: 'Apr', revenue: 480 },
                { month: 'May', revenue: 610 },
              ]}
              series={[{ key: 'revenue', label: 'Revenue' }]}
              xKey="month"
              height={200}
              grid
              tooltip
              onClickDatum={() => {}}
            />
          </div>
          <div>
            <p className="body-sm" style={{ margin: '0 0 var(--spacing-xs)', color: 'var(--text-secondary)' }}>
              Click a bar to fire an analytics event
            </p>
            <pre
              className="body-sm"
              style={{
                margin: 0,
                padding: 'var(--spacing-sm)',
                background: 'var(--surface-secondary)',
                borderRadius: 'var(--radius-md)',
                maxHeight: 160,
                overflow: 'auto',
                color: 'var(--text-secondary)',
              }}
            >
              {events.length === 0 ? '(no events yet)' : events.join('\n')}
            </pre>
          </div>
        </div>
      </AnalyticsProvider>
    );
  },
};

export const StackedAreaNonInteractive: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.StackedArea
        data={[
          { date: 'Mon', a: 40, b: 30, c: 20 },
          { date: 'Tue', a: 50, b: 35, c: 25 },
          { date: 'Wed', a: 45, b: 40, c: 30 },
          { date: 'Thu', a: 60, b: 38, c: 22 },
          { date: 'Fri', a: 55, b: 42, c: 28 },
        ]}
        series={[
          { key: 'a', label: 'Primary', color: 'var(--color-blue-700)' },
          { key: 'b', label: 'Secondary', color: 'var(--color-blue-400)' },
          { key: 'c', label: 'Tertiary', color: 'var(--color-blue-200)' },
        ]}
        xKey="date"
        height={200}
        interactive={false}
        grid
      />
    </div>
  ),
};

export const BarNonInteractive: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Bar
        data={[
          { month: 'Jan', value: 400 },
          { month: 'Feb', value: 300 },
          { month: 'Mar', value: 520 },
          { month: 'Apr', value: 480 },
        ]}
        series={[{ key: 'value', label: 'Revenue' }]}
        xKey="month"
        height={200}
        interactive={false}
        grid
      />
    </div>
  ),
};

export const ComposedNonInteractive: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Composed
        data={[
          { month: 'Jan', revenue: 400, rate: 2.1 },
          { month: 'Feb', revenue: 300, rate: 1.8 },
          { month: 'Mar', revenue: 520, rate: 2.5 },
          { month: 'Apr', revenue: 480, rate: 2.3 },
        ]}
        series={[
          { key: 'revenue', type: 'bar', label: 'Revenue', color: 'var(--color-blue-300)' },
          { key: 'rate', type: 'line', label: 'Rate', axis: 'right', color: 'var(--text-primary)' },
        ]}
        xKey="month"
        height={200}
        interactive={false}
        grid
      />
    </div>
  ),
};

export const ScatterNonInteractive: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Scatter
        data={[
          {
            key: 'data',
            label: 'Observations',
            data: [
              { x: 10, y: 30 }, { x: 20, y: 50 }, { x: 30, y: 45 },
              { x: 40, y: 70 }, { x: 50, y: 60 }, { x: 60, y: 80 },
            ],
          },
        ]}
        height={200}
        interactive={false}
        grid
      />
    </div>
  ),
};

export const StackedAreaNoAnimation: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.StackedArea
        data={[
          { date: 'Mon', a: 40, b: 30, c: 20 },
          { date: 'Tue', a: 50, b: 35, c: 25 },
          { date: 'Wed', a: 45, b: 40, c: 30 },
          { date: 'Thu', a: 60, b: 38, c: 22 },
          { date: 'Fri', a: 55, b: 42, c: 28 },
        ]}
        series={[
          { key: 'a', label: 'Primary', color: 'var(--color-blue-700)' },
          { key: 'b', label: 'Secondary', color: 'var(--color-blue-400)' },
          { key: 'c', label: 'Tertiary', color: 'var(--color-blue-200)' },
        ]}
        xKey="date"
        height={200}
        animate={false}
        grid
      />
    </div>
  ),
};

export const PieNoAnimation: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Pie
        data={[
          { name: 'Engineering', value: 45, color: 'var(--color-blue-700)' },
          { name: 'Marketing', value: 25, color: 'var(--color-blue-400)' },
          { name: 'Operations', value: 20, color: 'var(--color-blue-200)' },
          { name: 'Support', value: 10, color: 'var(--color-blue-100)' },
        ]}
        height={200}
        animate={false}
        legend
      />
    </div>
  ),
};

export const FunnelActiveChange: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<number | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ width: 388 }}>
          <Chart.Funnel
            data={[
              { label: 'Visitors', value: 5000 },
              { label: 'Signups', value: 2500 },
              { label: 'Trials', value: 1200 },
              { label: 'Paid', value: 600 },
            ]}
            height={160}
            onActiveChange={setActive}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Active index: {active ?? 'none'}
        </p>
      </div>
    );
  },
};

export const WaterfallActiveChange: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<number | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ width: 388 }}>
          <Chart.Waterfall
            data={[
              { label: 'Revenue', value: 1000, type: 'increase' },
              { label: 'COGS', value: -400, type: 'decrease' },
              { label: 'Gross', value: 600, type: 'total' },
              { label: 'OpEx', value: -200, type: 'decrease' },
              { label: 'Net', value: 400, type: 'total' },
            ]}
            height={200}
            grid
            onActiveChange={setActive}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Active index: {active ?? 'none'}
        </p>
      </div>
    );
  },
};

export const SplitActiveChange: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<number | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ width: 388 }}>
          <Chart.Split
            data={[
              { label: 'Completed', value: 65, color: 'var(--color-blue-700)' },
              { label: 'In progress', value: 25, color: 'var(--color-blue-400)' },
              { label: 'Blocked', value: 10, color: 'var(--color-blue-200)' },
            ]}
            height={32}
            onActiveChange={setActive}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Active index: {active ?? 'none'}
        </p>
      </div>
    );
  },
};

export const ScatterActiveChange: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<{ seriesIndex: number; pointIndex: number } | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
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
            onActiveChange={setActive}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Active: {active ? `series ${active.seriesIndex}, point ${active.pointIndex}` : 'none'}
        </p>
      </div>
    );
  },
};

export const ComposedFixedDomain: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Composed
        data={[
          { month: 'Jan', revenue: 400, rate: 2.1 },
          { month: 'Feb', revenue: 300, rate: 1.8 },
          { month: 'Mar', revenue: 520, rate: 2.5 },
          { month: 'Apr', revenue: 480, rate: 2.3 },
          { month: 'May', revenue: 610, rate: 2.8 },
        ]}
        series={[
          { key: 'revenue', type: 'bar', label: 'Revenue ($)', color: 'var(--color-blue-300)' },
          { key: 'rate', type: 'line', label: 'Rate (%)', axis: 'right', color: 'var(--text-primary)' },
        ]}
        xKey="month"
        height={240}
        grid
        tooltip
        yDomain={[0, 1000]}
        yDomainRight={[0, 5]}
      />
    </div>
  ),
};

export const WaterfallCustomTooltip: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Waterfall
        data={[
          { label: 'Revenue', value: 1000, type: 'increase' },
          { label: 'COGS', value: -400, type: 'decrease' },
          { label: 'Gross profit', value: 600, type: 'total' },
          { label: 'Expenses', value: -200, type: 'decrease' },
          { label: 'Net income', value: 400, type: 'total' },
        ]}
        height={200}
        grid
        tooltip={(d) => {
          const datum = d as WaterfallSegment;
          return (
            <div>
              <strong>{datum.label}</strong>
              <br />
              {`$${Math.abs(datum.value).toLocaleString()}`}
            </div>
          );
        }}
      />
    </div>
  ),
};

export const SankeyNoTooltip: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Sankey
        data={{
          nodes: [
            { id: 'a', label: 'Source A', color: 'var(--color-blue-700)' },
            { id: 'b', label: 'Source B', color: 'var(--color-blue-400)' },
            { id: 'c', label: 'Target', color: 'var(--color-green-600)' },
          ],
          links: [
            { source: 'a', target: 'c', value: 100 },
            { source: 'b', target: 'c', value: 50 },
          ],
        }}
        height={200}
        tooltip={false}
      />
    </div>
  ),
};

export const FunnelNoTooltip: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Funnel
        data={[
          { label: 'Visitors', value: 5000 },
          { label: 'Signups', value: 2500 },
          { label: 'Trials', value: 1200 },
          { label: 'Paid', value: 600 },
        ]}
        height={160}
        tooltip={false}
      />
    </div>
  ),
};

export const UptimeLoading: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Uptime data={[]} height={32} loading />
    </div>
  ),
};

export const UptimeEmpty: Story = {
  render: () => (
    <div style={{ width: 388 }}>
      <Chart.Uptime data={[]} height={32} empty="No uptime data available" />
    </div>
  ),
};

export const GaugeLoading: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Chart.Gauge value={0} min={0} max={100} thresholds={[]} loading />
    </div>
  ),
};

export const LiveLoading: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Live data={[]} value={0} height={200} loading />
    </div>
  ),
};

export const LiveEmpty: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Chart.Live data={[]} value={0} height={200} empty="Waiting for live data" />
    </div>
  ),
};

export const PieKeyboardNav: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<number | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ width: 388 }}>
          <Chart.Pie
            data={[
              { name: 'Engineering', value: 45, color: 'var(--color-blue-700)' },
              { name: 'Marketing', value: 25, color: 'var(--color-blue-400)' },
              { name: 'Operations', value: 20, color: 'var(--color-blue-200)' },
              { name: 'Support', value: 10, color: 'var(--color-blue-100)' },
            ]}
            height={200}
            legend
            onActiveChange={setActive}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Focus the chart and use arrow keys to cycle segments. Active: {active ?? 'none'}
        </p>
      </div>
    );
  },
};

export const UptimeKeyboardNav: Story = {
  render: function Render() {
    const [active, setActive] = React.useState<number | null>(null);
    const data = Array.from({ length: 30 }, (_, i) => ({
      status: i === 12 || i === 13 ? ('down' as const) : ('up' as const),
      label: new Date(Date.now() - (30 - i) * 60_000).toLocaleTimeString(),
    }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ width: 388 }}>
          <Chart.Uptime
            data={data}
            height={32}
            onActiveChange={(_point, index) => setActive(index)}
          />
        </div>
        <p className="body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Focus the bars and use arrow keys to navigate. Active: {active ?? 'none'}
        </p>
      </div>
    );
  },
};
