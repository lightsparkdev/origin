# Using Origin in Your App

## Setup

1. **Copy tokens** from `origin/src/tokens/` to `your-app/src/tokens/`
2. **Copy fonts** from `origin/public/fonts/` to `your-app/public/fonts/`
3. **Configure `globals.scss`:**

```scss
@use '../tokens/variables';
@use '../tokens/fonts';
@use '../tokens/typography';
@use '../tokens/effects';
@use '../tokens/reset';

body {
  margin: 0;
  font-family: var(--font-family-sans);
  color: var(--text-primary);
  background-color: var(--surface-primary);
  -webkit-font-smoothing: antialiased;
}
```

The `_reset.scss` file includes:
- Box-sizing reset
- Form element defaults (removes browser backgrounds)
- Typography resets (h1-h6, p margins)
- Font feature settings
- Icon system CSS (preserves stroke width at any icon size)

## CSS Modules Constraint

Files with `:root` selectors (`_variables.scss`, `_fonts.scss`, `_reset.scss`, etc.) can only be imported in `globals.scss`.

In `.module.scss` files, use tokens directly — they're globally available:

```scss
// component.module.scss
@use '../../tokens/text-styles' as *;  // mixins OK

.title {
  @include headline-sm;
  color: var(--text-primary);  // tokens available globally
}

// @use '../../tokens/variables';  // ERROR: :root not allowed
```

## Sync

When Origin tokens change, re-copy `src/tokens/` to your app.
