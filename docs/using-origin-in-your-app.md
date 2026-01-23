# Using Origin in Your App

## Setup

1. **Copy tokens** from `origin-v2/src/tokens/` to `your-app/src/tokens/`
2. **Copy fonts** from `origin-v2/public/fonts/` to `your-app/public/fonts/`
3. **Configure `globals.scss`:**

```scss
@use '../tokens/variables';
@use '../tokens/fonts';
@use '../tokens/typography';
@use '../tokens/effects';

*, *::before, *::after {
  box-sizing: border-box;
  font-feature-settings: inherit;
}

:root {
  font-feature-settings: "salt" 1, "kern" 1;
}

body {
  margin: 0;
  font-family: var(--font-family-sans);
  color: var(--text-primary);
  background-color: var(--surface-primary);
  -webkit-font-smoothing: antialiased;
}
```

## CSS Modules Constraint

Files with `:root` selectors (`_variables.scss`, `_fonts.scss`, etc.) can only be imported in `globals.scss`.

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
