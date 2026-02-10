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
| Scroll Area | `scroll-area` | Yes |
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
| `data-highlighted` | Item is keyboard-focused |
| `data-checked` | Checkbox/Switch/Radio is on |
| `data-unchecked` | Checkbox/Switch/Radio is off |
| `data-active` | Tab is active |

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

### Event Customization (v1.0+)

All change handlers receive `(value, eventDetails)`:

```tsx
onOpenChange={(open, eventDetails) => {
  // eventDetails.reason - why it changed
  // eventDetails.event - DOM event
  // eventDetails.cancel() - prevent state change
  // eventDetails.allowPropagation() - allow event bubbling
}}
```

## Utilities

| Utility | Import | Purpose |
|---------|--------|---------|
| `mergeProps` | `@base-ui/react/merge-props` | Merge multiple prop sets, handling events/className/style |
| `useRender` | `@base-ui/react/use-render` | Enable render prop in custom components |
| `CSP Provider` | `@base-ui/react/csp-provider` | Apply nonce to inline styles/scripts |
| `Direction Provider` | `@base-ui/react/direction-provider` | Enable RTL behavior |

## Recent Changes

### v1.1.0 (Jan 15, 2026)

- Add `loopFocus` prop to Autocomplete and Combobox
- Add `placeholder` prop to `Select.Value` and `Combobox.Value`
- Add `value` prop to Switch for form submission
- Add `actionsRef` prop to Field and Form for programmatic validation
- Add `nativeLabel` prop to `Field.Label`
- Add `mergeProps` utility (now public)
- Fix `onOpenChangeComplete(true)` timing
- Fix forwarded ref types
- Fix visually hidden input styles across form components
- Fix click-and-drags outside nested popups from closing parents

### v1.0.0 (Dec 11, 2025)

- **Breaking change:** Rename packages `@base-ui-components/react` -> `@base-ui/react`
- Add `null` as option for Select/Combobox value prop
- Fix submenu delay and focus issues

## Additional Resources

- Full component API details and breaking change history: [reference.md](reference.md)
- Base UI docs: https://base-ui.com/react/overview/quick-start
- GitHub: https://github.com/mui/base-ui
