# DatePicker Comparison: Origin vs react-datepicker

## Architecture

| | **Origin** | **react-datepicker** |
|---|---|---|
| Pattern | Compound components (Root, Header, Grid, Controls, Footer) | Single monolithic component with 100+ props |
| Dependencies | Zero — custom date math using `Intl` | date-fns for locale and formatting |
| Styling | CSS Modules + design tokens | Own stylesheet, className overrides |
| Bundle | Tree-shakes with the design system | ~40KB standalone |

## Feature Comparison

### Core Selection

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Single date | Yes | Yes |
| Range selection | Yes (two-click with hover preview) | Yes (`startDate`/`endDate`) |
| Multiple dates | No | Yes |
| Time picker | Yes (`includeTime`) — text inputs, auto 12/24h | Yes — scrollable time list or text |
| Time-only mode | No | Yes (`showTimeSelectOnly`) |
| Seconds | No — hours and minutes only | Yes |

### Constraints

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Min / max dates | Yes (`min`/`max`) | Yes (`minDate`/`maxDate`) |
| Disabled dates | Yes (`disabled` function) | Yes (`excludeDates`, `filterDate`) |
| Exclude time slots | No | Yes (`excludeTimes`) |

### Internationalization

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Locale | Yes (BCP 47 string via `Intl`) | Yes (via date-fns locale objects) |
| Week start day | Yes (`weekStartsOn`) | Yes (`calendarStartDay`) |
| Timezone | No — local time only | Yes (via date-fns-tz) |
| Custom labels | Yes (`labels` prop for a11y/i18n) | Partial (ARIA props) |

### Navigation

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Month arrows | Yes | Yes |
| Year dropdown | No — Shift+PageUp/Down only | Yes (`showYearDropdown`) |
| Month dropdown | No | Yes (`showMonthDropdown`) |
| Multiple months | No — single calendar | Yes (`monthsShown`) |

### Keyboard and Accessibility

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Arrow key navigation | Yes | Yes |
| Page Up/Down (month) | Yes | Yes |
| Shift+Page (year) | Yes | No |
| Home/End (week) | Yes | No |
| Enter/Space select | Yes | Yes |
| ARIA grid role | Yes (`role="grid"`, `aria-selected`, `aria-disabled`) | Yes (ARIA attributes) |

### Customization

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Custom day rendering | Yes (`renderDay`) | Yes (`renderDayContents`) |
| Controlled month | Yes (`month`/`onMonthChange`) | Yes (`openToDate`) |
| Custom input | No | Yes (`customInput`) |
| Presets | No | No (manual via custom input) |
| Footer slot | Yes (Footer compound part) | No |
| Controls slot | Yes (Controls compound part) | No |

### UI Modes

| Feature | **Origin** | **react-datepicker** |
|---|---|---|
| Inline | Always inline (no popover) | Yes (`inline`) |
| Portal | No | Yes (`withPortal`) |
| Clear button | No | Yes (`isClearable`) |
| Today button | No | Yes (`todayButton`) |
| Fixed height | Yes (270px) | Optional (`fixedHeight`) |

## Summary

Origin's DatePicker covers the core well — single date, range, time, locale, keyboard navigation, and accessibility — with a clean compound component API and zero external dependencies. The compound pattern (Root, Header, Grid, Controls, Footer) gives consumers more layout flexibility than react-datepicker's monolithic prop surface.

The gaps are mostly power-user features: year/month dropdowns, multi-month view, portal rendering, timezone support, and time-only mode. Whether those matter depends on product needs.
