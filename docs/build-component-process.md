# Build Component Process

This document summarizes the `/build-component` command workflow.

## Overview

The `/build-component` command takes a Figma URL and produces a fully tested, production-ready component.

## Process Steps

### 1. Parse Figma URL

Extract `fileKey` and `nodeId` from the URL:

```
https://www.figma.com/design/{fileKey}/...?node-id={nodeId}
```

### 2. Fetch Figma CSS

**Primary**: `mcp_Figma_get_design_context(nodeId, fileKey)`

**Fallback**: `npm run figma:node "<figma-url>"` (if MCP times out)

Extracts:
- Dimensions (width, height)
- Colors (background, foreground)
- Spacing (padding, gap)
- Effects (shadows, borders)
- Typography (if applicable)

### 3. Visual Verification

Use `mcp_Figma_get_screenshot` to capture the design for reference.

### 4. Base UI Docs Check

Identify the matching Base UI component and its props:
- Behavioral props (affect functionality)
- Styling props (affect appearance)
- Accessibility features

### 5. Behavioral Options (User Decision Point)

**Ask before proceeding:**

> "Base UI offers these behavioral options for {Component}:
> - `propA`: Description
> - `propB`: Description
>
> Which do you want exposed?"

Options:
1. All of them (full flexibility)
2. Essential only (common use cases)
3. Minimal (simplest API)

### 6. Create Files

```
src/components/{Name}/
├── {Name}.tsx           # Component implementation
├── {Name}.module.scss   # Styles (Figma URL as first line)
├── {Name}.stories.tsx   # Storybook stories
├── {Name}.test-stories.tsx  # Test fixtures
├── {Name}.test.tsx      # Playwright tests
└── index.ts             # Exports
```

### 7. Apply Tokens

| Use Token | Use Raw Value |
|-----------|---------------|
| Colors | Fixed dimensions |
| Spacing | Opacity values |
| Shadows | Transition durations |
| Corner radius | — |
| Font properties | — |

**Rule**: Use tokens where they exist; raw values where they don't.

### 8. Reduced Motion

Add to all animated properties:

```scss
@media (prefers-reduced-motion: reduce) {
  transition: none;
}
```

### 9. Create Tests (from Base UI Prop Matrix)

| Category | Tests |
|----------|-------|
| Default behavior | Renders, basic interaction |
| Per boolean prop | Test both `true` and `false` states |
| Controlled mode | `value` + `onChange` works |
| Uncontrolled mode | `defaultValue` works |
| Keyboard | Space, Enter, Arrow keys (as applicable) |
| Accessibility | Focus management, ARIA attributes |

### 10. Create Stories

- One story per variant/state
- `AllVariants` story showing everything
- `Controlled` story demonstrating state management

### 11. Update Consumers

Add component demo to `page.tsx` (or other relevant pages).

### 12. Verification

```bash
npm run build  # Must pass
npm test       # All tests must pass
```

## Example: Switch Component

### Input
```
/build-component https://www.figma.com/design/3JvbUyTqbbPL8cCpwSX0j4/Origin-design-system?node-id=2281-2168
```

### Figma Extraction
| Property | SM | MD |
|----------|----|----|
| Track width | 28px | 44px |
| Track height | 16px | 24px |
| Thumb size | 12px | 20px |
| Off color | `--surface-tertiary` | `--surface-tertiary` |
| On color | `--color-green-600` | `--color-green-600` |
| Disabled | 50% opacity | 50% opacity |

### Props Exposed
- `size`: `'sm' | 'md'`
- `checked`, `defaultChecked`
- `disabled`, `readOnly`, `required`
- `name`, `onCheckedChange`

### Test Coverage (15 tests)
- Default behavior: 3
- Sizes: 3
- Disabled state: 3
- ReadOnly state: 2
- Controlled mode: 1
- Keyboard navigation: 3

### Result
- Build: ✅ Passed
- Tests: ✅ 15/15 passed
- Time: ~3 minutes

## Code Style

- SCSS starts with Figma URL: `// Figma: https://figma.com/design/...`
- No decorative comment dividers
- No verbose headers
- No emojis in code or console output
- Code is self-documenting
