# Origin Styling Reference

SCSS patterns, mixins, and styling conventions for Origin components.

## CSS Modules Setup

All Origin components use CSS Modules with SCSS:

```tsx
// Component.tsx
import styles from './Component.module.scss';

function Component({ className }) {
  return (
    <div className={clsx(styles.root, className)}>
      {/* content */}
    </div>
  );
}
```

```scss
// Component.module.scss
@use '@grid/origin/tokens' as *;

.root {
  // styles
}
```

## Token Usage

### Always Use Tokens

Never hardcode values - always use design tokens:

```scss
// CORRECT
.container {
  padding: var(--spacing-md);
  color: var(--text-primary);
  background: var(--surface-primary);
  border: 1px solid var(--border-secondary);
  border-radius: var(--corner-radius-md);
  box-shadow: var(--shadow-sm);
}

// INCORRECT - hardcoded values
.container {
  padding: 16px;
  color: #1A1A1A;
  background: #F8F8F7;
  border: 1px solid #C1C0B8;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
}
```

### Common Token Patterns

```scss
// Spacing
.element {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}

// Colors
.text {
  color: var(--text-primary);

  &.secondary {
    color: var(--text-secondary);
  }

  &.muted {
    color: var(--text-muted);
  }
}

// Surfaces
.card {
  background: var(--surface-elevated);

  &:hover {
    background: var(--surface-hover);
  }
}

// Borders
.bordered {
  border: 1px solid var(--border-secondary);

  &:focus-visible {
    border-color: var(--border-primary);
  }
}
```

## Typography Mixins

### Available Mixins

```scss
@use '@grid/origin/tokens' as *;

// Body text
.bodyText {
  @include body;      // 14px, regular weight, 20px line-height
}

.bodyLarge {
  @include body-lg;   // 16px, regular, 24px
}

.bodySmall {
  @include body-sm;   // 12px, regular, 18px
}

.bodyXSmall {
  @include body-xs;   // 12px, regular, 12px line-height
}

// Headings
.headline {
  @include headline;     // 24px, medium weight, 32px, tight tracking
}

.headlineSmall {
  @include headline-sm;  // 18px, medium, 24px
}

// Labels
.label {
  @include label;     // 14px, book weight (450), 20px
}

.labelLarge {
  @include label-lg;  // 16px, book, 24px
}

.labelSmall {
  @include label-sm;  // 12px, book, 18px
}

.labelXLarge {
  @include label-xl;  // 24px, book, 32px
}

.labelXSmall {
  @include label-xs;  // 10px, book, 16px
}

// Buttons
.buttonText {
  @include btn;     // 14px, book, 20px
}

.buttonLarge {
  @include btn-lg;  // 16px, book, 24px
}

.buttonSmall {
  @include btn-sm;  // 12px, book, 12px
}

// Code
.codeText {
  @include code;  // 13px mono font, regular, 18px
}
```

### Custom Typography

When mixins don't fit, use tokens directly:

```scss
.customText {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--font-leading-lg);
  letter-spacing: var(--font-tracking-tight);
}
```

## State Styling

### Base UI Data Attributes

Style states using Base UI's data attributes:

```scss
.input {
  border: 1px solid var(--border-secondary);
  background: var(--surface-base);

  // Hover
  &:hover:not([data-disabled]) {
    border-color: var(--border-hover);
  }

  // Focus
  &:focus-visible {
    border-color: var(--border-primary);
    box-shadow: var(--input-focus);
  }

  // Disabled
  &[data-disabled] {
    background: var(--surface-disabled);
    color: var(--text-disabled);
    cursor: not-allowed;
  }

  // Invalid/Error
  &[data-invalid] {
    border-color: var(--border-critical);

    &:focus-visible {
      box-shadow: var(--input-focus-critical);
    }
  }
}
```

### Common Data Attributes

| Attribute | Description |
|-----------|-------------|
| `[data-disabled]` | Disabled state |
| `[data-invalid]` | Invalid/error state |
| `[data-focused]` | Focused state |
| `[data-selected]` | Selected state |
| `[data-highlighted]` | Highlighted (keyboard focus) |
| `[data-pressed]` | Active/pressed state |
| `[data-open]` | Open state (dropdowns, menus) |
| `[data-checked]` | Checked state (checkbox, radio) |
| `[data-indeterminate]` | Indeterminate checkbox |

### Interactive States Pattern

```scss
.button {
  background: var(--surface-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-secondary);
  transition: all 150ms ease;

  &:hover:not([data-disabled]) {
    background: var(--surface-hover);
  }

  &:active:not([data-disabled]),
  &[data-pressed] {
    background: var(--surface-pressed);
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Utility Mixins

### Button Reset

Reset native button styles:

```scss
@mixin button-reset {
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.iconButton {
  @include button-reset;
  // custom styles
}
```

### Visually Hidden

Hide visually but keep accessible to screen readers:

```scss
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.srOnly {
  @include visually-hidden;
}
```

### Smooth Corners (Squircle)

iOS-style smooth corners:

```scss
@mixin smooth-corners($radius) {
  border-radius: $radius;

  @supports (mask-image: paint(squircle)) {
    mask-image: paint(squircle);
    --squircle-radius: $radius;
    --squircle-smooth: 1;
  }
}

.avatar {
  @include smooth-corners(var(--corner-radius-lg));
}
```

### Focus Ring

Standard focus indicator:

```scss
@mixin focus-ring {
  &:focus-visible {
    outline: 2px solid var(--border-primary);
    outline-offset: 2px;
  }
}

// Or use the input focus pattern
@mixin input-focus {
  &:focus-visible {
    box-shadow: var(--input-focus);
    border-color: var(--border-primary);
  }
}
```

## Animation Patterns

### Reduced Motion

Always include reduced motion support:

```scss
.animated {
  transition: transform 200ms ease, opacity 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fadeIn {
  animation: fadeIn 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}
```

### Common Transitions

```scss
// Fast (hover states)
transition: all 100ms ease;

// Normal (most interactions)
transition: all 150ms ease;

// Slow (page transitions)
transition: all 200ms ease;

// Specific properties
transition: background-color 150ms ease, border-color 150ms ease;
```

### Common Animations

```scss
// Fade in
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Scale in (for dropdowns, modals)
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Slide down (for dropdowns)
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Layout Utilities

### Flexbox Patterns

```scss
// Center content
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Stack (vertical)
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

// Row (horizontal)
.row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

// Space between
.spaceBetween {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Grid Patterns

```scss
// Auto-fit grid
.autoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

// Fixed columns
.grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

// Two column form
.formGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md) var(--spacing-lg);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
```

## Responsive Design

### Breakpoint Usage

```scss
// Mobile first approach
.element {
  padding: var(--spacing-sm);

  // Tablet
  @media (min-width: 768px) {
    padding: var(--spacing-md);
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: var(--spacing-lg);
  }

  // Large desktop
  @media (min-width: 1280px) {
    padding: var(--spacing-xl);
  }
}
```

### Hide/Show Utilities

```scss
.hideOnMobile {
  @media (max-width: 767px) {
    display: none;
  }
}

.hideOnDesktop {
  @media (min-width: 768px) {
    display: none;
  }
}

.mobileOnly {
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
}

.desktopOnly {
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}
```

## Dark Mode

### Manual Dark Mode

```scss
.element {
  background: var(--surface-primary);
  color: var(--text-primary);

  // Dark mode via class or attribute
  :global([data-theme="dark"]) &,
  :global(.dark) & {
    // Tokens auto-adapt, but can override if needed
  }
}
```

### System Preference

```scss
@media (prefers-color-scheme: dark) {
  // Dark mode styles if not using token system
}
```

Note: Origin's semantic tokens automatically adapt to dark mode, so manual overrides are rarely needed.

## Component-Specific Patterns

### Input Styling

```scss
.input {
  @include body;
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--surface-base);
  border: 1px solid var(--border-secondary);
  border-radius: var(--corner-radius-sm);
  color: var(--text-primary);
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:hover:not([data-disabled]) {
    border-color: var(--border-hover);
  }

  &:focus-visible {
    border-color: var(--border-primary);
    box-shadow: var(--input-focus);
    outline: none;
  }

  &[data-invalid] {
    border-color: var(--border-critical);

    &:focus-visible {
      box-shadow: var(--input-focus-critical);
    }
  }

  &[data-disabled] {
    background: var(--surface-disabled);
    color: var(--text-disabled);
    cursor: not-allowed;
  }
}
```

### Card Styling

```scss
.card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-tertiary);
  border-radius: var(--corner-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;

  &.interactive {
    cursor: pointer;
    transition: box-shadow 150ms ease, border-color 150ms ease;

    &:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--border-secondary);
    }

    &:active {
      box-shadow: var(--shadow-sm);
    }
  }
}
```

### List Item Styling

```scss
.listItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--corner-radius-sm);
  cursor: pointer;
  transition: background-color 100ms ease;

  &:hover {
    background: var(--surface-hover);
  }

  &[data-highlighted] {
    background: var(--surface-hover);
  }

  &[data-selected] {
    background: var(--surface-active);
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```
