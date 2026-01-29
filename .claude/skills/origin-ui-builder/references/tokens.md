# Origin Design Tokens Reference

Complete reference for all design tokens in the Origin design system.

## Spacing Scale

Spacing tokens follow a consistent scale for margins, padding, and gaps.

| Token | Value | Common Use |
|-------|-------|------------|
| `--spacing-4xs` | 2px | Minimal spacing |
| `--spacing-3xs` | 4px | Tight spacing |
| `--spacing-2xs` | 6px | Compact spacing |
| `--spacing-xs` | 8px | Small spacing |
| `--spacing-sm` | 12px | Default compact |
| `--spacing-md` | 16px | Default spacing |
| `--spacing-lg` | 20px | Comfortable spacing |
| `--spacing-xl` | 24px | Section spacing |
| `--spacing-2xl` | 32px | Large sections |
| `--spacing-3xl` | 40px | Page sections |
| `--spacing-4xl` | 48px | Major sections |
| `--spacing-5xl` | 56px | Large gaps |
| `--spacing-6xl` | 64px | Extra large |
| `--spacing-7xl` | 72px | Header spacing |
| `--spacing-8xl` | 80px | Hero sections |

Extended scale continues: `--spacing-9xl` (96px) through `--spacing-21xl` (320px)

Negative values available: `--spacing-neg-4xs` through `--spacing-neg-21xl`

### Usage

```scss
.container {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.compact {
  padding: var(--spacing-xs) var(--spacing-sm);
}
```

## Color System

### Base Colors

| Token | Value | Use |
|-------|-------|-----|
| `--color-base-white` | #FFFFFF | Pure white |
| `--color-base-black` | #000000 | Pure black |

### Gray Scale

| Token | Value |
|-------|-------|
| `--color-gray-025` | Lightest gray |
| `--color-gray-050` | Very light |
| `--color-gray-100` | Light gray |
| `--color-gray-200` | Light-medium |
| `--color-gray-300` | Medium-light |
| `--color-gray-400` | Medium |
| `--color-gray-500` | Mid gray |
| `--color-gray-600` | Medium-dark |
| `--color-gray-700` | Dark |
| `--color-gray-800` | Very dark |
| `--color-gray-900` | Near black |
| `--color-gray-950` | Darkest gray |

### Semantic Colors

Each color family has shades from 050 to 950:

**Purple:** `--color-purple-050` through `--color-purple-950`
**Blue:** `--color-blue-050` through `--color-blue-950`
**Sky:** `--color-sky-050` through `--color-sky-950`
**Pink:** `--color-pink-050` through `--color-pink-950`
**Green:** `--color-green-050` through `--color-green-950`
**Yellow:** `--color-yellow-050` through `--color-yellow-950`
**Red:** `--color-red-050` through `--color-red-950`

### Alpha Colors

Transparent variants for overlays:

```scss
// White with opacity
--color-alpha-white-02  // 2% opacity
--color-alpha-white-04
--color-alpha-white-10
--color-alpha-white-20
--color-alpha-white-50

// Black with opacity
--color-alpha-black-02
--color-alpha-black-04
--color-alpha-black-10
--color-alpha-black-20
--color-alpha-black-50
```

## Semantic Tokens

### Text Colors

| Token | Use |
|-------|-----|
| `--text-primary` | Primary text (#1A1A1A) |
| `--text-secondary` | Secondary text (#7C7C7C) |
| `--text-tertiary` | Tertiary/hint text |
| `--text-muted` | Muted/placeholder |
| `--text-disabled` | Disabled state |
| `--text-surface` | Text on colored surfaces |
| `--text-critical` | Error text |
| `--text-purple` | Purple accent text |
| `--text-blue` | Blue accent text |
| `--text-green` | Success text |
| `--text-yellow` | Warning text |

### Icon Colors

| Token | Use |
|-------|-----|
| `--icon-primary` | Primary icons |
| `--icon-secondary` | Secondary icons |
| `--icon-tertiary` | Tertiary icons |
| `--icon-surface` | Icons on colored surfaces |
| `--icon-info` | Info icons |
| `--icon-success` | Success icons |
| `--icon-warning` | Warning icons |
| `--icon-critical` | Error icons |
| `--icon-inverted` | Icons on dark backgrounds |

### Border Colors

| Token | Use |
|-------|-----|
| `--border-primary` | Primary borders (#1A1A1A) |
| `--border-secondary` | Secondary borders (#C1C0B8) |
| `--border-tertiary` | Subtle borders (10% black) |
| `--border-hover` | Hover state borders |
| `--border-inverted` | Borders on dark backgrounds |
| `--border-critical` | Error state borders |

### Surface Colors

| Token | Use |
|-------|-----|
| `--surface-base` | Page background (#FFFFFF) |
| `--surface-primary` | Primary surface (#F8F8F7) |
| `--surface-secondary` | Secondary surface |
| `--surface-tertiary` | Tertiary surface |
| `--surface-elevated` | Elevated elements (cards) |
| `--surface-sunken` | Recessed areas |
| `--surface-hover` | Hover state (4% black) |
| `--surface-pressed` | Pressed state |
| `--surface-active` | Active/selected state |
| `--surface-inverted` | Dark surface (#1A1A1A) |
| `--surface-disabled` | Disabled state |
| `--surface-scrim` | Modal overlays |

Color-specific surfaces:
- `--surface-purple`, `--surface-purple-strong`
- `--surface-blue`, `--surface-blue-strong`
- `--surface-green`, `--surface-green-strong`
- `--surface-red`, `--surface-red-strong`
- `--surface-yellow`, `--surface-yellow-strong`

### Focus States

| Token | Use |
|-------|-----|
| `--input-focus` | Input focus ring |
| `--input-focus-critical` | Error state focus ring |

```scss
&:focus-visible {
  box-shadow: var(--input-focus);
}

&[data-invalid]:focus-visible {
  box-shadow: var(--input-focus-critical);
}
```

## Typography

### Font Families

| Token | Value |
|-------|-------|
| `--font-family-sans` | "Suisse Intl" |
| `--font-family-mono` | "Suisse Int'l Mono" |

### Font Sizes

| Token | Value |
|-------|-------|
| `--font-size-2xs` | 10px |
| `--font-size-xs` | 12px |
| `--font-size-sm` | 13px |
| `--font-size-base` | 14px |
| `--font-size-lg` | 16px |
| `--font-size-xl` | 18px |
| `--font-size-2xl` | 24px |

### Font Weights

| Token | Value |
|-------|-------|
| `--font-weight-hairline` | 100 |
| `--font-weight-thin` | 250 |
| `--font-weight-light` | 300 |
| `--font-weight-regular` | 400 |
| `--font-weight-book` | 450 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-black` | 900 |

### Line Heights

| Token | Value |
|-------|-------|
| `--font-leading-2xs` | 12px |
| `--font-leading-xs` | 16px |
| `--font-leading-sm` | 18px |
| `--font-leading-base` | 20px |
| `--font-leading-lg` | 24px |
| `--font-leading-xl` | 32px |

### Letter Spacing

| Token | Value |
|-------|-------|
| `--font-tracking-tighter` | -0.7px |
| `--font-tracking-tight` | -0.2px |
| `--font-tracking-normal` | 0 |
| `--font-tracking-wide` | 0.2px |
| `--font-tracking-wider` | 0.7px |

### Typography Mixins

Use these SCSS mixins for consistent typography:

```scss
@use '@grid/origin/tokens' as *;

// Body text
@include body;      // 14px, regular, 20px line-height
@include body-lg;   // 16px, regular, 24px
@include body-sm;   // 12px, regular, 18px
@include body-xs;   // 12px, regular, 12px

// Headings
@include headline;     // 24px, medium, 32px, tight tracking
@include headline-sm;  // 18px, medium, 24px

// Labels
@include label;     // 14px, book (450), 20px
@include label-lg;  // 16px, book, 24px
@include label-sm;  // 12px, book, 18px
@include label-xl;  // 24px, book, 32px
@include label-xs;  // 10px, book, 16px

// Buttons
@include btn;     // 14px, book, 20px
@include btn-lg;  // 16px, book, 24px
@include btn-sm;  // 12px, book, 12px

// Code
@include code;  // 13px mono, regular, 18px
```

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--corner-radius-2xs` | 2px | Minimal rounding |
| `--corner-radius-xs` | 4px | Small elements |
| `--corner-radius-sm` | 6px | Compact elements |
| `--corner-radius-md` | 8px | Default rounding |
| `--corner-radius-lg` | 12px | Cards |
| `--corner-radius-xl` | 16px | Large cards |
| `--corner-radius-2xl` | 24px | Modals |
| `--corner-radius-3xl` | 32px | Large modals |
| `--corner-radius-4xl` | 40px | Extra large |
| `--corner-radius-round` | 999px | Pills/circles |
| `--corner-radius-square` | 0px | No rounding |

## Shadows

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-sm` | `0px 1px 2px rgba(0,0,0,0.08)` | Subtle elevation |
| `--shadow-md` | Multi-layer shadow | Cards |
| `--shadow-lg` | Multi-layer shadow | Modals, popovers |

```scss
.card {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-lg);
}
```

## Strokes (Border Widths)

| Token | Value |
|-------|-------|
| `--stroke-none` | 0px |
| `--stroke-1xs` | 0.33px |
| `--stroke-xs` | 0.5px |
| `--stroke-sm` | 1px |
| `--stroke-md` | 1.5px |
| `--stroke-lg` | 2px |
| `--stroke-xl` | 4px |

## Breakpoints

| Token | Value |
|-------|-------|
| `--screens-sm` | 640px |
| `--screens-md` | 768px |
| `--screens-lg` | 1024px |
| `--screens-xl` | 1280px |
| `--screens-2xl` | 1536px |

```scss
@media (min-width: 768px) {
  // Tablet and up
}

@media (min-width: 1024px) {
  // Desktop
}
```

## Max Widths

| Token | Value |
|-------|-------|
| `--max-width-xs` | 320px |
| `--max-width-sm` | 384px |
| `--max-width-md` | 448px |
| `--max-width-lg` | 512px |
| `--max-width-xl` | 576px |
| `--max-width-2xl` | 672px |
| `--max-width-3xl` | 768px |
| `--max-width-4xl` | 896px |
| `--max-width-5xl` | 1024px |
| `--max-width-6xl` | 1152px |
| `--max-width-7xl` | 1280px |

## Dark Mode

Semantic tokens automatically adapt in dark mode via:
- `[data-theme="dark"]` attribute
- `.dark` class
- `@media (prefers-color-scheme: dark)`

All semantic tokens (text, surfaces, borders, icons) flip appropriately.
