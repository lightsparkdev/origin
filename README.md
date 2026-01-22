# Origin Design System v2

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

## Using as a Local Package

Origin can be consumed as a local package in other projects (e.g., Grid) without publishing to npm.

### In the consuming project

1. **Add to `package.json`:**
   ```json
   {
     "dependencies": {
       "@grid/origin": "file:../origin-v2",
       "sass": "^1.80.0"
     }
   }
   ```

2. **Add to `next.config.js`** (for Next.js apps):
   ```js
   const nextConfig = {
     transpilePackages: ['@grid/origin'],
   };
   ```

3. **Install and use:**
   ```bash
   npm install
   ```

   ```tsx
   import { Button, Input, Form, Field } from '@grid/origin';

   export default function LoginPage() {
     return (
       <Form>
         <Field label="Email">
           <Input type="email" placeholder="you@example.com" />
         </Field>
         <Button variant="filled">Continue</Button>
       </Form>
     );
   }
   ```

### What's exported

- **Compound components**: `Accordion`, `AlertDialog`, `Combobox`, `Menu`, `Select`, `Tabs`, `Toast`, `Tooltip`, etc.
- **Simple components**: `Button`, `Input`, `Badge`, `Alert`, `Chip`, `Loader`, `Switch`, etc.
- **Icons**: `CentralIcon`

See `src/index.ts` for the full export list.

## Documentation

- `.cursor/rules` — Auto-injected context for AI assistants
- `CONTEXT.md` — Full project context and history
