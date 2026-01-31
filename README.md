# Origin Design System

A design system built on **Base UI** with direct **Figma-to-code** styling.

## Philosophy

- **Base UI** handles behavior, accessibility, and keyboard navigation
- **Figma Dev Mode** provides tokenized CSS (copy directly)
- **Minimal transformation** = minimal drift

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

## Structure

```
src/
├── components/          # React components
│   └── Icon/           # CentralIcon system
├── tokens/             # Generated SCSS variables
└── app/                # Next.js app

tools/
└── base-ui-lint/       # Figma structure validation plugin

tokens/
└── figma/              # Raw Figma token exports
    ├── origin/         # Origin tokens
    └── baseline/       # Baseline tokens
```

## Component Workflow

1. **Design** in Figma with Base UI-compatible frame structure
2. **Validate** with the Base UI Lint Plugin
3. **Copy CSS** from Figma Dev Mode
4. **Implement** with Base UI + SCSS modules

## Figma Lint Plugin

```bash
cd tools/base-ui-lint
npm run build
```

Import in Figma → Plugins → Development → `manifest.json`

Validates component structure against Base UI's expected anatomy.

## Typography

### Font Metric Overrides (Critical)

Suisse Intl has unusually large internal ascender/descender metrics, which causes issues with:
- Tall text cursors in inputs
- Inconsistent vertical rhythm
- Elements appearing taller than designed

We fix this with `@font-face` metric overrides in `_fonts.scss`:

```scss
@font-face {
  font-family: 'Suisse Intl';
  src: url('/fonts/SuisseIntl-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  ascent-override: 85%;    /* Compress ascender space */
  descent-override: 15%;   /* Compress descender space */
  line-gap-override: 0%;   /* Remove extra line gap */
}
```

**Consumers must import the fonts file** to get proper rendering:

```scss
// In your globals.scss
@use 'pkg:@jaymantri/origin/tokens/fonts';
```

Without this import, you'll see tall cursors and misaligned text.

### Unitless Line Heights

All line-height tokens use unitless ratios that scale with font size:

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-leading-none` | 1 | Buttons, inputs, single-line elements |
| `--font-leading-snug` | 1.33 | Headlines, code blocks |
| `--font-leading-normal` | 1.43 | Body text (default) |
| `--font-leading-relaxed` | 1.5 | Large body text, labels |
| `--font-leading-loose` | 1.6 | Extra spacing for readability |

## Icons

```tsx
import { CentralIcon } from '@/components/Icon';

<CentralIcon name="IconHome" size={24} />
```

All ~100 icons from the Figma design system are available.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run storybook` | Start Storybook |
| `npm run tokens:build` | Build tokens from Figma exports |
| `npm run lint` | Run ESLint |

## Using as a Package

### Installation

Add `.npmrc` to your project root:

```
@jaymantri:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Install:

```bash
npm install @jaymantri/origin
```

Or for local development:

```json
{ "dependencies": { "@jaymantri/origin": "file:../origin" } }
```

### Next.js Configuration

```ts
// next.config.ts
import type { NextConfig } from "next";
import * as sass from "sass";

const nextConfig: NextConfig = {
  transpilePackages: ['@jaymantri/origin'],
  sassOptions: {
    importers: [new sass.NodePackageImporter()],
  },
};

export default nextConfig;
```

### Usage

```tsx
import { Button, Input, Field } from '@jaymantri/origin';
```

### Token Imports (SCSS)

Use `pkg:` prefix to import tokens from the package:

```scss
// globals.scss
@use 'pkg:@jaymantri/origin/tokens/variables';
@use 'pkg:@jaymantri/origin/tokens/fonts';
@use 'pkg:@jaymantri/origin/tokens/typography';
@use 'pkg:@jaymantri/origin/tokens/effects';
@use 'pkg:@jaymantri/origin/tokens/reset';

// In component SCSS
@use 'pkg:@jaymantri/origin/tokens/text-styles' as *;
```

For full setup details, see [Using Origin in Your App](docs/using-origin-in-your-app.md).

## Documentation

- `docs/using-origin-in-your-app.md` — Token/font setup for consuming apps
- `CONTEXT.md` — Full project context and history
- `.cursor/rules/` — Auto-injected context for AI assistants
