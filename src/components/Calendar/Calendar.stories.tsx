import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Calendar from './index';
import type { DateRange, DayCellState } from './index';
import { Switch } from '../Switch';
import { Button } from '../Button';

function SingleCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root value={value} onValueChange={(v) => setValue(v as Date)}>
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <Calendar.Footer>
        <Button variant="outline" size="compact" style={{ width: '100%' }}>
          Apply
        </Button>
      </Calendar.Footer>
    </Calendar.Root>
  );
}

function RangeCalendar() {
  const [mode, setMode] = useState<'single' | 'range'>('range');
  const [includeTime, setIncludeTime] = useState(false);
  const [value, setValue] = useState<Date | DateRange | null>(null);

  return (
    <Calendar.Root
      mode={mode}
      includeTime={includeTime}
      value={value}
      onValueChange={setValue}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <Calendar.Controls>
        <Calendar.ControlItem label="End date">
          <Switch
            size="sm"
            checked={mode === 'range'}
            onCheckedChange={(v) => {
              setMode(v ? 'range' : 'single');
              setValue(null);
            }}
          />
        </Calendar.ControlItem>
        <Calendar.ControlItem label="Include time">
          <Switch
            size="sm"
            checked={includeTime}
            onCheckedChange={setIncludeTime}
          />
        </Calendar.ControlItem>
      </Calendar.Controls>
      <Calendar.Footer>
        <Button variant="outline" size="compact" style={{ width: '100%' }}>
          Apply
        </Button>
      </Calendar.Footer>
    </Calendar.Root>
  );
}

function WithTimeCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      includeTime
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

function RangeWithTimeCalendar() {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <Calendar.Root
      mode="range"
      includeTime
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

function ConstrainedCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  const today = new Date();
  const max = new Date(today);
  max.setMonth(max.getMonth() + 3);

  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      min={today}
      max={max}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

function WeekdaysOnlyCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

function MondayStartCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      weekStartsOn={1}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

const meta: Meta = {
  title: 'Components/Calendar',
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj;

export const Single: Story = {
  render: () => <SingleCalendar />,
};

export const Range: Story = {
  render: () => <RangeCalendar />,
};

export const WithTime: Story = {
  render: () => <WithTimeCalendar />,
};

export const RangeWithTime: Story = {
  render: () => <RangeWithTimeCalendar />,
};

export const Constrained: Story = {
  render: () => <ConstrainedCalendar />,
};

export const WeekdaysOnly: Story = {
  render: () => <WeekdaysOnlyCalendar />,
};

export const MondayStart: Story = {
  render: () => <MondayStartCalendar />,
};

function GermanCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      locale="de-DE"
      weekStartsOn={1}
      labels={{
        previousMonth: 'Vorheriger Monat',
        nextMonth: 'Nächster Monat',
        date: 'Datum',
      }}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export const LocaleGerman: Story = {
  render: () => <GermanCalendar />,
};

function JapaneseCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      locale="ja-JP"
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export const LocaleJapanese: Story = {
  render: () => <JapaneseCalendar />,
};

function EventDotsCalendar() {
  const [value, setValue] = useState<Date | null>(null);
  const eventDays = new Set([3, 7, 14, 21, 28]);

  return (
    <Calendar.Root value={value} onValueChange={(v) => setValue(v as Date)}>
      <Calendar.Navigation />
      <Calendar.Grid
        renderDay={(date: Date, state: DayCellState) => (
          <span style={{ position: 'relative' }}>
            {date.getDate()}
            {!state.isOutsideMonth && eventDays.has(date.getDate()) && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                }}
              />
            )}
          </span>
        )}
      />
    </Calendar.Root>
  );
}

export const EventDots: Story = {
  render: () => <EventDotsCalendar />,
};
