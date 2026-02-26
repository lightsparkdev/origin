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

213 vendored icons from Central Icons. Edit `scripts/extract-icons.mjs` to add icons, then run `npm run icons:extract`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run storybook` | Start Storybook |
| `npm run tokens:build` | Build tokens from Figma exports |
| `npm run icons:extract` | Vendor icons and regenerate registry |
| `npm run test` | Playwright component tests |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:all` | Run both test suites |
| `npm run lint` | Run ESLint |

## Using as a Package

### Installation

#### 1. Generate a GitHub token

Each developer needs a **GitHub Personal Access Token (classic)** with the `read:packages` scope:

1. Go to [GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Generate a new token with the **`read:packages`** scope
3. Add it to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export NPM_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

You must be a member of the `lightsparkdev` GitHub org for the token to have access.

#### 2. Configure `.npmrc`

Add `.npmrc` to your project root:

```
@lightsparkdev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

#### 3. Install

```bash
npm install @lightsparkdev/origin
```

Or for local development:

```json
{ "dependencies": { "@lightsparkdev/origin": "file:../origin" } }
```

### Next.js Configuration

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

### Copy Fonts

```bash
cp -r node_modules/@lightsparkdev/origin/public/fonts/ public/fonts/
```

### Usage

```tsx
import { Button, Input, Field } from '@lightsparkdev/origin';
```

### Token Imports (SCSS)

Use `pkg:` prefix to import tokens from the package:

```scss
// globals.scss
@use 'pkg:@lightsparkdev/origin/tokens/variables';
@use 'pkg:@lightsparkdev/origin/tokens/fonts';
@use 'pkg:@lightsparkdev/origin/tokens/typography';
@use 'pkg:@lightsparkdev/origin/tokens/effects';
@use 'pkg:@lightsparkdev/origin/tokens/reset';

// In component SCSS
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
