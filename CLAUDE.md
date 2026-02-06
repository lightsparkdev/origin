# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Origin** is a design system built on Base UI with a Figma-first approach. It serves as the foundational package (`@grid/origin`) for consuming products. Base UI handles component behavior and accessibility; Figma provides tokenized CSS that maps directly to code.

## Commands

```bash
npm install --legacy-peer-deps   # Install dependencies
npm run dev                       # Next.js dev server (localhost:3000)
npm run storybook                 # Storybook (localhost:6006)
npm run build                     # Production build (catches type errors)
npm run lint                      # ESLint
npm run test                      # Playwright component tests
npm run test:unit                 # Vitest unit tests
npm run test:all                  # Both test suites
npm run tokens:build              # Transform Figma tokens to SCSS
npm run figma:styles              # Sync text styles + effects from Figma API
npm run check:baseui              # Check Base UI version sync
```

## Architecture

### Key Directories

| Path | Purpose |
|------|---------|
| `src/components/` | React components (Base UI wrappers) |
| `src/tokens/` | Design tokens (SCSS variables, mixins) |
| `src/lib/` | Utilities (base-ui-utils.ts, dev-warn.ts) |
| `tools/figma-styles/` | Figma REST API style fetchers |
| `tools/base-ui-lint/` | Figma plugin for Base UI validation |

### Token System

Tokens are generated from Figma Variables and should never be edited manually:

| File | Content | Source |
|------|---------|--------|
| `_variables.scss` | Colors, spacing, sizing | Figma Variables export |
| `_text-styles.scss` | Typography mixins | Figma Text Styles API |
| `_effects.scss` | Shadow variables | Figma Effect Styles API |

### Component Structure

Components follow a namespace export pattern for compound components:

```
src/components/{Name}/
├── {Name}.test-stories.tsx  # Test fixtures
├── {Name}.test.tsx          # Playwright component tests
├── {Name}.tsx or parts.tsx  # Implementation
├── {Name}.module.scss       # Styles (CSS Modules)
├── {Name}.stories.tsx       # Storybook
└── index.ts                 # Exports
```

## Component Implementation

### Decision Tree

1. **Does Base UI have it?** → Wrap it (read Base UI docs first)
2. **No Base UI equivalent?** → Build custom (check WAI-ARIA APG)

### Research Order

1. Check `https://base-ui.com/llms.txt` for component availability
2. Read docs at `https://base-ui.com/react/components/{name}`
3. Note all `data-*` attributes Base UI provides (don't duplicate them)
4. Apply project styling with tokens

### Required Patterns

- Use `forwardRef` with named function (not arrow)
- Use `clsx` for className merging
- Use `var(--token)` for all values (no hardcoded colors/spacing)
- Use `@include` mixins for typography
- Props spread last (consumer wins)

### Wrapper Simplicity

Before adding any custom prop or data attribute:
1. Check if Base UI already provides it (`data-disabled`, `data-invalid`, `data-focused`, etc.)
2. Start minimal: forward ref, merge className, spread props
3. Only add custom props when Base UI lacks the feature

### Context Provider Components

Some Base UI parts are context providers that don't render elements. Check type definitions:

```bash
cat node_modules/@base-ui/react/{component}/{part}/{Part}.d.ts
```

If it's a context provider (no `ForwardRefExoticComponent`), wrap in your own element to enable ref/className support.

## Styling

- CSS Modules with SCSS (`Component.module.scss`)
- Mirror Figma exactly: use tokens where Figma uses tokens, raw values where Figma uses raw values
- State styling via Base UI's `data-*` attributes
- Reduced motion: always include `@media (prefers-reduced-motion: reduce)`

## Testing

- Write tests first (TDD approach)
- Use `page.getByRole()` or `page.getByPlaceholder()` for queries
- Test for Base UI's data attributes, don't invent custom ones
- Run `npm run build` before committing (production build catches type errors dev mode misses)

## Conventions

- No hardcoded values (use tokens)
- No emojis in code or console output
- No decorative comment dividers
- No editing generated files (`_text-styles.scss`, `_effects.scss`)
- This is a design system: keep components generic and product-agnostic
