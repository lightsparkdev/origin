# ODS Consumer Setup Guide

How to integrate Origin Design System tokens and styles into a consuming application.

## Token Files Overview

ODS provides two categories of token files:

### Files that Output CSS

Import these in your app's `globals.scss`:

| File | Contents |
|------|----------|
| `_variables.scss` | CSS custom properties (`:root`) for colors, spacing, sizing |
| `_fonts.scss` | `@font-face` declarations for Suisse Intl |
| `_typography.scss` | Typography reset and base text styles |
| `_effects.scss` | CSS custom properties for shadows and focus rings |

### Utility Files (Mixins Only)

Import these per-component as needed:

| File | Contents |
|------|----------|
| `_text-styles.scss` | Typography mixins (`@mixin body`, `@mixin headline`, etc.) |
| `_mixins.scss` | Utility mixins (`button-reset`, `input-focus`, `visually-hidden`, etc.) |

## Required Setup

### 1. Copy Token Files

Copy all files from `origin-v2/src/tokens/` to your app's `src/tokens/` directory.

### 2. Configure globals.scss

```scss
// Import token files that output CSS
@use '../tokens/variables';
@use '../tokens/fonts';
@use '../tokens/typography';
@use '../tokens/effects';

// Required base styles
*,
*::before,
*::after {
  box-sizing: border-box;
  font-feature-settings: inherit;
}

:root {
  font-feature-settings: "salt" 1, "kern" 1;
}

body {
  margin: 0;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--font-leading-base);
  color: var(--text-primary);
  background-color: var(--surface-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 3. Copy Font Files

Copy font files from `origin-v2/public/fonts/` to your app's `public/fonts/` directory.

## CSS Modules Constraint

**Never import token files containing `:root` selectors in `.module.scss` files.**

CSS Modules require "pure" selectors (local classes/ids). Files like `_variables.scss` contain `:root` which causes the error:

```
Selector ":root" is not pure (pure selectors must contain at least one local class or id)
```

**Correct approach:**
- Import `:root`-containing files only in `globals.scss`
- In `.module.scss` files, use `var(--token-name)` directly - CSS variables are globally available
- Import mixin files (`_text-styles.scss`, `_mixins.scss`) as needed since they contain no selectors

```scss
// component.module.scss

// DO: Import mixin files
@use '../../tokens/text-styles' as *;

// DO: Use CSS variables directly
.title {
  @include headline-sm;
  color: var(--text-primary);
  padding: var(--spacing-md);
}

// DON'T: Import files with :root
// @use '../../tokens/variables';  // This will error!
```

## Font Feature Settings

Suisse Intl supports OpenType features that must be explicitly enabled:

| Feature | Code | Purpose |
|---------|------|---------|
| `salt` | Stylistic alternates | Distinctive letterforms (a, g, etc.) |
| `kern` | Kerning | Optical letter spacing |
| `tnum` | Tabular figures | Fixed-width numbers for alignment |
| `lnum` | Lining figures | Uniform height numbers |

**Global defaults** (`salt`, `kern`) are set in `:root` and inherited via `font-feature-settings: inherit`.

**Per-component additions**: If a component needs additional features (e.g., tabular figures for data), you must list ALL desired features since the property doesn't merge:

```scss
.data-column {
  // Must include salt + kern from global, plus new features
  font-feature-settings: "salt" 1, "kern" 1, "tnum" 1, "lnum" 1;
}
```

## Keeping Tokens in Sync

When ODS tokens are updated:

1. Re-copy changed files from `origin-v2/src/tokens/` to your app
2. Auto-generated files (`_text-styles.scss`, `_effects.scss`) are rebuilt via `npm run figma:styles` in ODS
3. `_variables.scss` is rebuilt via `npm run tokens:build` in ODS
