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

## Drawer Composition

Use `Drawer` in two distinct ways:

- stacked nested drawers
- indented shell layouts

These are separate patterns.

### Stacked nested drawers

Use this when one drawer opens another drawer and the parent should remain visible behind the child.

- Bottom drawers use the built-in nested stacking path
- Side panels and top sheets opt into stacked motion with `nestedMotion="stack"` on the parent `Drawer.Popup`
- This does not require `Drawer.Indent` or `Drawer.IndentBackground`

```tsx
<Drawer.Provider>
  <Drawer.Root swipeDirection="right">
    <Drawer.Trigger>Open parent drawer</Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Viewport>
        <Drawer.Popup nestedMotion="stack">
          <Drawer.Content>
            <Drawer.Root swipeDirection="right">
              <Drawer.Trigger>Open child drawer</Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Viewport>
                  <Drawer.Popup>
                    <Drawer.Content>{/* child drawer content */}</Drawer.Content>
                  </Drawer.Popup>
                </Drawer.Viewport>
              </Drawer.Portal>
            </Drawer.Root>
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
</Drawer.Provider>
```

Use this for:

- nested settings flows
- multi-step side panels
- child drawers that should stack above a parent drawer

### Indented shell layouts

Use this when the page or app shell behind the drawer should scale down and round its corners.

- This is an optional layout treatment
- Add it only when you explicitly want the shell-shrink effect
- Avoid it for floating side panels or layouts where the surrounding app chrome should stay stable

```tsx
<Drawer.Provider>
  <Drawer.IndentBackground />
  <Drawer.Indent className={styles.indent}>
    {children}
  </Drawer.Indent>
</Drawer.Provider>
```

Recommendation:
Default to stacked drawers without indent. Add `Drawer.IndentBackground` and `Drawer.Indent` only when the layout specifically wants the shell-shrink treatment.

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

## Table Column Sizing

`Table.Root` uses `table-layout: fixed` so column widths are predictable and text truncates cleanly. The sizing model is simple:

- **Hug columns** — Set an explicit width via `style`. The column stays at that size. Use for checkboxes, status badges, action menus, and other fixed-width content.
- **Fill columns** — Don't set a width. The browser divides remaining space equally among columns without explicit widths.

```tsx
<Table.HeaderCell variant="checkbox" style={{ width: 40 }}>
  {/* checkbox — hug */}
</Table.HeaderCell>

<Table.HeaderCell>
  Name {/* fill — no width */}
</Table.HeaderCell>

<Table.HeaderCell>
  Email {/* fill — no width */}
</Table.HeaderCell>

<Table.HeaderCell style={{ width: 64 }} align="right">
  <span className="visuallyHidden">Actions</span> {/* hug */}
</Table.HeaderCell>
```

### With TanStack React Table

TanStack defaults every column to `size: 150`, so `header.getSize()` always returns a number. If you pass that to every header cell, `table-layout: fixed` distributes surplus space proportionally and inflates hug columns.

Only set width on columns that need it:

```tsx
// In your column definitions, tag hug columns via meta:
columnHelper.display({
  id: 'select',
  meta: { sizing: 'hug' },
  size: 40,
})

columnHelper.accessor('name', {
  header: 'Name',
  // no size, no meta — this column fills
})

// In the render loop:
<Table.HeaderCell
  style={{
    width: (header.column.columnDef.meta as { sizing?: string })?.sizing === 'hug'
      ? header.getSize()
      : undefined,
  }}
>
```

See the **ColumnSizing** story in Storybook for a working example.

## Sync

Tokens are imported directly from the package — no manual copying needed. When Origin publishes a new version:

```bash
npm install @lightsparkdev/origin@latest
```
