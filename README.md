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

```bash
npm install @lightsparkdev/origin sass
```

Or for local development:

```json
{ "dependencies": { "@lightsparkdev/origin": "file:../origin" } }
```

### Next.js Configuration

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@lightsparkdev/origin'],
};

export default nextConfig;
```

### Import Styles

```ts
import "@lightsparkdev/origin/styles.css";
```

### Copy Fonts

```bash
cp -r node_modules/@lightsparkdev/origin/public/fonts/ public/fonts/
```

### Usage

```tsx
import { Button, Input, Field } from '@lightsparkdev/origin';
```

### Advanced: SCSS Token Imports (Optional)

If you need Origin mixins in your app SCSS files, configure Sass package imports:

```ts
// next.config.ts
import type { NextConfig } from "next";
import * as sass from "sass";

const nextConfig: NextConfig = {
  transpilePackages: ['@lightsparkdev/origin'],
  sassOptions: {
    importers: [new sass.NodePackageImporter()],
  },
};

export default nextConfig;
```

Then use `pkg:` imports:

```scss
@use 'pkg:@lightsparkdev/origin/tokens/text-styles' as *;
```

For full setup details, see [Using Origin in Your App](docs/using-origin-in-your-app.md).

## Typography

Suisse Intl requires font metric overrides to prevent an oversized text caret in inputs:

```scss
@font-face {
  font-family: 'Suisse Intl';
  ascent-override: 81%;
  descent-override: 19%;
  line-gap-override: 0%;
}
```

These values are applied to all weights (Regular, Book, Medium) in `_fonts.scss`. Consuming apps **must** import Origin's fonts to get correct input rendering.

## Documentation

- `docs/using-origin-in-your-app.md` — Token/font setup for consuming apps
- `CONTEXT.md` — Full project context and history
- `.cursor/rules/` — Auto-injected context for AI assistants
