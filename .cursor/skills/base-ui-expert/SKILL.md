---
name: base-ui-expert
description: Base UI expert for building Origin components. Provides the full component catalog, API patterns, known quirks, and Origin usage map. Use when building or updating components, checking if a Base UI primitive exists, or deciding between Base UI wrapper vs custom component.
---

# Base UI Expert

Origin uses `@base-ui/react` v1.1.0 (Jan 15, 2026).

> Auto-refreshed: 2026-02-10 | Sources: base-ui.com/llms.txt, base-ui.com/react/overview/releases.md

## Quick Decision: Does Base UI Have It?

| Need | Base UI Primitive | Origin Uses It? |
|------|------------------|-----------------|
| Accordion | `accordion` | Yes |
| Alert Dialog | `alert-dialog` | Yes |
| Autocomplete | `autocomplete` | Yes |
| Avatar | `avatar` | Yes |
| Button | `button` | Yes |
| Checkbox | `checkbox` | Yes |
| Checkbox Group | `checkbox-group` | Yes |
| Collapsible | `collapsible` | Not yet |
| Combobox | `combobox` | Yes |
| Context Menu | `context-menu` | Yes |
| Dialog | `dialog` | Yes |
| Field | `field` | Yes |
| Fieldset | `fieldset` | Yes |
| Form | `form` | Yes |
| Input | `input` | Yes |
| Menu | `menu` | Yes |
| Menubar | `menubar` | Yes |
| Meter | `meter` | Yes |
| Navigation Menu | `navigation-menu` | Yes |
| Number Field | `number-field` | Not yet |
| Popover | `popover` | Not yet |
| Preview Card | `preview-card` | Not yet |
| Progress | `progress` | Yes |
| Radio | `radio` | Yes |
| Scroll Area | `scroll-area` | Not yet |
| Select | `select` | Yes |
| Separator | `separator` | Yes |
| Slider | `slider` | Not yet |
| Switch | `switch` | Yes |
| Tabs | `tabs` | Yes |
| Toast | `toast` | Yes |
| Toggle | `toggle` | Not yet |
| Toggle Group | `toggle-group` | Not yet |
| Toolbar | `toolbar` | Not yet |
| Tooltip | `tooltip` | Yes |

**Not in Base UI** (Origin builds custom): Badge, Breadcrumb, Card, Chip, ChipFilter, InputGroup, TextareaGroup, Item, Loader, Logo, Pagination, Shortcut, Sidebar, Table, ActionBar, ButtonGroup.

## Core Patterns

### Wrapping a Base UI Primitive

```tsx
import { ComponentName as BaseComponentName } from '@base-ui/react/component-name';
```

- Always alias: `import { X as BaseX }` to avoid naming collisions
- Use `forwardRef` with named function
- Spread props onto the Base UI component
- Use `clsx` for className merging
- Use `render` prop to swap the rendered element (e.g., `render={<textarea />}`)

### The `render` Prop

Base UI's most powerful feature. Replaces the rendered DOM element:

```tsx
<BaseInput render={<textarea />} />  // renders <textarea> instead of <input>
<Menu.Item render={<a href="/link" />} />  // renders <a> instead of <div>
```

The custom element must forward `ref` and spread all received props.

### Known Quirk: Input with render={<textarea />}

When using `BaseInput` with `render={<textarea />}`, the ref type is `HTMLInputElement` but the actual DOM element is `HTMLTextAreaElement`. Two casts are needed:

```tsx
// Cast 1: ref
ref={ref as unknown as React.Ref<HTMLInputElement>}

// Cast 2: props (textarea-specific attrs not in BaseInput's types)
{...(props as Omit<BaseInput.Props, 'className'>)}
```

This affects: Textarea, TextareaGroup.Textarea, InputGroup (if textarea variant).

### Data Attributes (State Styling)

Base UI exposes state via data attributes, not classes:

| Attribute | Meaning |
|-----------|---------|
| `data-disabled` | Component is disabled |
| `data-invalid` | Validation failed (Field integration) |
| `data-valid` | Validation passed |
| `data-dirty` | Value has changed |
| `data-touched` | Has been focused/blurred |
| `data-filled` | Has a value |
| `data-focused` | Currently focused |
| `data-open` | Popup/panel is open |
| `data-closed` | Popup/panel is closed |
| `data-starting-style` | Entry animation state |
| `data-ending-style` | Exit animation state |
| `data-popup-side` | Which side popup is on |

### Field Integration

`Input`, `Checkbox`, `Switch`, `Radio`, `Select`, `NumberField` all auto-integrate with `Field.Root`:

```tsx
<Field.Root>
  <Field.Label>Name</Field.Label>
  <Input />
  <Field.Error>Required</Field.Error>
</Field.Root>
```

No manual `aria-labelledby` or `htmlFor` needed.

### Animation Pattern

```css
[data-starting-style] { opacity: 0; transform: scale(0.95); }
[data-ending-style] { opacity: 0; transform: scale(0.95); }
.popup { transition: opacity 200ms, transform 200ms; }
```

### Compound Components

Most Base UI components use the compound pattern with dot notation:
`Dialog.Root`, `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Backdrop`, `Dialog.Content`, etc.

## Utilities

| Utility | Import | Purpose |
|---------|--------|---------|
| `CSP Provider` | `@base-ui/react/csp-provider` | A CSP provider component that applies a nonce to inline <style> and <script> tag |
| `Direction Provider` | `@base-ui/react/direction-provider` | A direction provider component that enables RTL behavior for Base UI components. |
| `mergeProps` | `@base-ui/react/mergeprops` | A utility to merge multiple sets of React props, handling event handlers, classN |
| `useRender` | `@base-ui/react/userender` | Hook for enabling a render prop in custom components. |

## Recent Changes

### v1.1.0 (Jan 15, 2026)

  - Fix `onOpenChangeComplete(true)` timing ([#3558](https://github.com/mui/base-ui/pull/3558))
  - Fix touch `openMethod` when tapping outside element bounds on Safari ([#3541](https://github.com/mui/base-ui/pull/3541))
  - Fix visually hidden input styles across form components ([#3606](https://github.com/mui/base-ui/pull/3606))
  - Fix click and drags outside a nested popup component from closing its parents ([#3571](https://github.com/mui/base-ui/pull/3571))
  - Fix forwarded ref types ([#3638](https://github.com/mui/base-ui/pull/3638))
  - Fix detached trigger remounting ([#3724](https://github.com/mui/base-ui/pull/3724))
  - Include `ref` in `BaseUIComponentProps` ([#2813](https://github.com/mui/base-ui/pull/2813))
  - Remove duplicated `disabled` prop ([#3650](https://github.com/mui/base-ui/pull/3650))

### v1.0.0 (Dec 11, 2025)

  - **Breaking change:** Rename packages to use the @base-ui org.<br />
  - Respect `itemToStringValue` for `onFormSubmit` ([#3441](https://github.com/mui/base-ui/pull/3441))
  - Add `null` as an option for the value prop ([#3488](https://github.com/mui/base-ui/pull/3488))
  - Fix submenu opens with 0 delay ([#3459](https://github.com/mui/base-ui/pull/3459))
  - Fix focus not returning to trigger on <kbd>Esc</kbd> while pointer rests on popup ([#3482](https://github.com/mui/base-ui/pull/3482))
  - Fix always `null` open method ([#3486](https://github.com/mui/base-ui/pull/3486))
  - Allow side axis fallback for submenus by default ([#3470](https://github.com/mui/base-ui/pull/3470))
  - Fix mount transitions on `Positioner` in Firefox ([#3424](https://github.com/mui/base-ui/pull/3424))

### v1.0.0-rc.2 (Dec 11, 2025)



## Additional Resources

- Full component API details and breaking change history: [reference.md](reference.md)
- Base UI docs: https://base-ui.com/react/overview/quick-start
- GitHub: https://github.com/mui/base-ui
