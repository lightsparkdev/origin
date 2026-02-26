# Using Origin in Your App

## Installation

### 1. Install the Package

```bash
npm install @lightsparkdev/origin sass
```

For local development alongside Origin:

```json
{ "dependencies": { "@lightsparkdev/origin": "file:../origin" } }
```

### 2. Configure Next.js

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lightsparkdev/origin"],
};

export default nextConfig;
```

### 3. Copy Fonts

Copy the font files from the package into your app's public directory:

```bash
cp -r node_modules/@lightsparkdev/origin/public/fonts/ public/fonts/
```

The `@font-face` declarations in `_fonts.scss` expect fonts at `/fonts/`. These are Suisse Intl (Regular, Book, Medium) and Suisse Int'l Mono.

### 4. Import Origin styles

Import the prebuilt stylesheet once in your app root (for example `app/layout.tsx` or `src/main.tsx`):

```ts
import "@lightsparkdev/origin/styles.css";
```

The `_reset.scss` file includes:

- Box-sizing reset
- Form element defaults (removes browser backgrounds)
- Typography resets (h1-h6, p margins)
- Font feature settings
- Icon system CSS (preserves stroke width at any icon size)

### Webpack resolve.alias caveat

If you add a Webpack `resolve.alias` for `@lightsparkdev/origin` (for example, to point at a local source checkout), use an exact-match alias with the `$` suffix. A broad alias hijacks all subpath lookups and breaks imports like `@lightsparkdev/origin/styles.css`.

```js
// next.config.js — webpack override
config.resolve.alias['@lightsparkdev/origin$'] = '/path/to/origin/src/index.ts';
//                                           ^ exact match — subpath imports still resolve via exports map
```

Without the `$`, Webpack rewrites `@lightsparkdev/origin/styles.css` to `index.ts/styles.css`, which doesn't exist.

## Component Usage

```tsx
import { Button, Input, Field, CentralIcon } from '@lightsparkdev/origin';

<Button variant="filled">Click me</Button>
<Field>
  <Field.Label>Email</Field.Label>
  <Input placeholder="email@example.com" />
</Field>
<CentralIcon name="IconHome" size={24} />
```

## Token Usage

The default stylesheet includes Origin tokens, fonts, effects, typography classes, reset styles, and utility classes.

## Advanced: SCSS token imports (optional)

If your app needs Origin mixins in your own SCSS files, enable the Sass package importer:

```ts
// next.config.ts
import type { NextConfig } from "next";
import * as sass from "sass";

const nextConfig: NextConfig = {
  transpilePackages: ["@lightsparkdev/origin"],
  sassOptions: {
    importers: [new sass.NodePackageImporter()],
  },
};

export default nextConfig;
```

Then import mixins from Origin:

```scss
// component.module.scss
@use "pkg:@lightsparkdev/origin/tokens/text-styles" as *;

.title {
  @include headline-sm;
  color: var(--text-primary);
}
```

## App-Specific Tokens

If you need app-specific tokens or mixins, create them in a local `src/tokens/` folder:

```scss
// src/tokens/_forms.scss (app-specific)
@mixin form-controls {
  input:not([type="checkbox"]) {
    width: 100%;
  }
}

// component.module.scss
@use "../tokens/forms" as *; // local
@use "pkg:@lightsparkdev/origin/tokens/text-styles" as *; // from Origin
```

## Sync

Tokens are imported directly from the package — no manual copying needed. When Origin publishes a new version:

```bash
npm install @lightsparkdev/origin@latest
```
