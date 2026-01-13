# Testing Guide

## Overview

Origin v2 uses a two-layer testing system:

| Layer | Tool | Speed | Use For |
|-------|------|-------|---------|
| Integration | Playwright CT | ~200ms/test | DOM, accessibility, keyboard, interactions |
| Unit | Vitest | ~5ms/test | Complex logic only |

## Commands

```bash
npm run test           # Playwright CT (primary)
npm run test:unit      # Vitest unit tests
npm run test:all       # Both
npm run test:ui        # Playwright interactive UI
npm run test:unit:watch # Vitest watch mode
```

## When to Use Each

### Playwright CT (Default)

Use for **all components**. Tests run in a real browser.

```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { MyComponent } from './';

test('renders correctly', async ({ mount, page }) => {
  await mount(<MyComponent />);
  const element = page.getByRole('button');
  await expect(element).toBeVisible();
});
```

**Good for:**
- Verifying DOM structure
- Accessibility tree
- Keyboard navigation
- Focus management
- Computed styles
- User interactions

### Vitest Unit Tests (When Needed)

Use **only** when there's complex logic to test in isolation:

- State machines
- Date/time calculations
- Filtering/sorting algorithms
- Utility functions
- Complex hooks

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './';

describe('MyComponent', () => {
  it('calculates next month correctly', () => {
    // Test pure logic
  });
});
```

**File naming:** `*.unit.test.tsx` (excluded from Playwright)

## Test File Structure

```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.module.scss
├── MyComponent.test.tsx         # Playwright CT (required)
├── MyComponent.unit.test.tsx    # Vitest (only if needed)
├── MyComponent.test-stories.tsx # Test fixtures
├── MyComponent.stories.tsx
└── index.ts
```

## Conformance Tests

For custom components (Path C), test Base UI contracts:

```tsx
test.describe('MyComponent conformance', () => {
  test('forwards data-* attributes', async ({ mount, page }) => {
    await mount(<MyComponent data-testid="root" data-custom="value" />);
    const element = page.locator('[data-testid="root"]');
    await expect(element).toHaveAttribute('data-custom', 'value');
  });

  test('forwards className', async ({ mount, page }) => {
    await mount(<MyComponent data-testid="root" className="custom" />);
    const element = page.locator('[data-testid="root"]');
    await expect(element).toHaveClass(/custom/);
  });

  test('forwards style', async ({ mount, page }) => {
    await mount(<MyComponent data-testid="root" style={{ color: 'green' }} />);
    const element = page.locator('[data-testid="root"]');
    await expect(element).toHaveCSS('color', 'rgb(0, 128, 0)');
  });
});
```

## Decision Tree

```
Building a component?
│
├── Is it a Base UI wrapper? (Path A/B)
│   └── Playwright CT only
│
└── Is it custom? (Path C)
    ├── Does it have complex logic?
    │   ├── Yes → Playwright CT + Vitest unit tests
    │   └── No → Playwright CT only
    └── Add conformance tests
```

## Tips

1. **Prefer `page` over `component`** for locating elements in Playwright CT
2. **Use `getByRole`** for accessibility-first testing
3. **Test behavior, not implementation** - test what users see/do
4. **Skip unit tests** unless you have complex logic to isolate
