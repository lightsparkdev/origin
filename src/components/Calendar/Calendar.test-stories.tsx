import { useState } from 'react';
import * as Calendar from './index';
import type { DateRange, DayCellState } from './index';
import { Switch } from '../Switch';
import { Button } from '../Button';

export function TestDefault() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestWithValue() {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 15));
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestRange() {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <Calendar.Root
      mode="range"
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="range-start">
        {value ? value.start.toISOString().split('T')[0] : 'none'}
      </div>
      <div data-testid="range-end">
        {value ? value.end.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestRangeWithValue() {
  const [value, setValue] = useState<DateRange | null>({
    start: new Date(2026, 1, 11),
    end: new Date(2026, 1, 15),
  });
  return (
    <Calendar.Root
      mode="range"
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export function TestDisabled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestMinMax() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      min={new Date(2026, 1, 5)}
      max={new Date(2026, 1, 25)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestFullFeatured() {
  const [mode, setMode] = useState<'single' | 'range'>('range');
  const [includeTime, setIncludeTime] = useState(false);
  const [value, setValue] = useState<Date | DateRange | null>(null);
  const [applied, setApplied] = useState(false);

  const rangeValue = value && !(value instanceof Date) ? value : null;

  return (
    <Calendar.Root
      mode={mode}
      includeTime={includeTime}
      value={value}
      onValueChange={setValue}
      defaultMonth={new Date(2026, 1, 1)}
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
            data-testid="end-date-toggle"
          />
        </Calendar.ControlItem>
        <Calendar.ControlItem label="Include time">
          <Switch
            size="sm"
            checked={includeTime}
            onCheckedChange={setIncludeTime}
            data-testid="include-time-toggle"
          />
        </Calendar.ControlItem>
      </Calendar.Controls>
      <Calendar.Footer>
        <Button
          variant="outline"
          size="compact"
          onClick={() => setApplied(true)}
          data-testid="apply-btn"
          style={{ width: '100%' }}
        >
          Apply
        </Button>
      </Calendar.Footer>
      <div data-testid="applied">{applied ? 'yes' : 'no'}</div>
      <div data-testid="range-start">
        {rangeValue ? rangeValue.start.toISOString().split('T')[0] : 'none'}
      </div>
      <div data-testid="range-end">
        {rangeValue ? rangeValue.end.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestWithTime() {
  const [value, setValue] = useState<Date | null>(
    new Date(2026, 1, 11, 14, 30),
  );
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      includeTime
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected-iso">
        {value ? value.toISOString() : 'none'}
      </div>
      <div data-testid="selected-hours">{value ? value.getHours() : ''}</div>
      <div data-testid="selected-minutes">
        {value ? value.getMinutes() : ''}
      </div>
    </Calendar.Root>
  );
}

export function TestModeSwitch() {
  const [mode, setMode] = useState<'single' | 'range'>('range');
  const [value, setValue] = useState<Date | DateRange | null>(null);
  return (
    <Calendar.Root
      mode={mode}
      value={value}
      onValueChange={setValue}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <button
        data-testid="toggle-mode"
        onClick={() => {
          setMode((m) => (m === 'range' ? 'single' : 'range'));
          setValue(null);
        }}
      >
        Toggle
      </button>
      <div data-testid="mode">{mode}</div>
      <div data-testid="selected">
        {value instanceof Date
          ? value.toISOString().split('T')[0]
          : value && !(value instanceof Date)
            ? `${value.start.toISOString().split('T')[0]}|${value.end.toISOString().split('T')[0]}`
            : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestReverseRange() {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <Calendar.Root
      mode="range"
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="range-start">
        {value ? value.start.toISOString().split('T')[0] : 'none'}
      </div>
      <div data-testid="range-end">
        {value ? value.end.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestSameDayRange() {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <Calendar.Root
      mode="range"
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="range-start">
        {value ? value.start.toISOString().split('T')[0] : 'none'}
      </div>
      <div data-testid="range-end">
        {value ? value.end.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestDateInput() {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 11));
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestRangeWithTime() {
  const [value, setValue] = useState<DateRange | null>({
    start: new Date(2026, 1, 11, 9, 0),
    end: new Date(2026, 1, 15, 17, 30),
  });
  return (
    <Calendar.Root
      mode="range"
      includeTime
      value={value}
      onValueChange={(v) => setValue(v as DateRange)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="start-hours">{value ? value.start.getHours() : ''}</div>
      <div data-testid="start-minutes">{value ? value.start.getMinutes() : ''}</div>
      <div data-testid="end-hours">{value ? value.end.getHours() : ''}</div>
      <div data-testid="end-minutes">{value ? value.end.getMinutes() : ''}</div>
      <div data-testid="range-start">
        {value ? value.start.toISOString().split('T')[0] : 'none'}
      </div>
      <div data-testid="range-end">
        {value ? value.end.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestYearBoundary() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 11, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestLeapYear() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2028, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestMondayStart() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      weekStartsOn={1}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export function TestMinEqualsMax() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      min={new Date(2026, 1, 15)}
      max={new Date(2026, 1, 15)}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestLocaleDE() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      locale="de-DE"
      labels={{ date: 'Datum', startDate: 'Startdatum', endDate: 'Enddatum' }}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestLocaleJA() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      locale="ja-JP"
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export function TestControlledMonth() {
  const [value, setValue] = useState<Date | null>(null);
  const [month, setMonth] = useState(new Date(2026, 1, 1));
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      month={month}
      onMonthChange={setMonth}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <button
        data-testid="jump-to-june"
        onClick={() => setMonth(new Date(2026, 5, 1))}
      >
        Jump to June
      </button>
      <div data-testid="view-month">{month.getMonth()}</div>
      <div data-testid="view-year">{month.getFullYear()}</div>
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestOnMonthChange() {
  const [value, setValue] = useState<Date | null>(null);
  const [monthLog, setMonthLog] = useState<string[]>([]);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      onMonthChange={(m) => {
        setMonthLog((prev) => [...prev, `${m.getFullYear()}-${m.getMonth()}`]);
      }}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="month-log">{monthLog.join(',')}</div>
    </Calendar.Root>
  );
}

export function TestCustomLabels() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      labels={{
        previousMonth: 'Vorheriger Monat',
        nextMonth: 'Nächster Monat',
      }}
    >
      <Calendar.Navigation />
      <Calendar.Grid />
    </Calendar.Root>
  );
}

export function TestRenderDay() {
  const [value, setValue] = useState<Date | null>(null);
  const specialDates = [5, 14, 20];
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
    >
      <Calendar.Navigation />
      <Calendar.Grid
        renderDay={(date: Date, state: DayCellState) => (
          <span>
            {date.getDate()}
            {!state.isOutsideMonth && specialDates.includes(date.getDate()) && (
              <span data-testid={`dot-${date.getDate()}`} aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
      />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestDateInputMinMax() {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 11));
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      min={new Date(2026, 1, 5)}
      max={new Date(2026, 1, 25)}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected">
        {value ? value.toISOString().split('T')[0] : 'none'}
      </div>
    </Calendar.Root>
  );
}

export function TestLocaleWithTime() {
  const [value, setValue] = useState<Date | null>(
    new Date(2026, 1, 11, 14, 30),
  );
  return (
    <Calendar.Root
      value={value}
      onValueChange={(v) => setValue(v as Date)}
      defaultMonth={new Date(2026, 1, 1)}
      locale="de-DE"
      includeTime
      labels={{ date: 'Datum', time: 'Uhrzeit' }}
    >
      <Calendar.Header />
      <Calendar.Navigation />
      <Calendar.Grid />
      <div data-testid="selected-hours">{value ? value.getHours() : ''}</div>
      <div data-testid="selected-minutes">
        {value ? value.getMinutes() : ''}
      </div>
    </Calendar.Root>
  );
}
