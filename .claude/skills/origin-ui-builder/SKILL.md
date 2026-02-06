---
name: "origin-ui-builder"
description: "This skill should be used when the user wants to build UIs with Origin design system components, create forms with Field and Input, add buttons or interactive controls, use Origin components, style with design tokens, create layouts, implement form validation, build navigation menus, create data tables, use compound components like Select or Accordion, apply typography mixins, style with CSS Modules, or work with Base UI wrappers. Triggers include: \"add a button\", \"create a form\", \"build a table\", \"use Origin\", \"design system component\", \"spacing tokens\", \"style with tokens\", \"Field component\", \"Select component\", \"form validation\", \"navigation layout\", \"compound component\", \"CSS Modules\", \"typography mixin\"."
---

# Origin UI Builder

## Overview

Origin is a design system built on Base UI with a Figma-first approach. It provides consistent, accessible components with design tokens that map directly from Figma to code.

**Key Principles:**
- Components wrap Base UI for behavior and accessibility
- Figma provides tokenized CSS that maps directly to code
- No hardcoded values - use design tokens for all styling
- Components use namespace exports for compound patterns

## Quick Start

### Basic Import Pattern

```tsx
import { Button, Field, Input, Select } from '@grid/origin';
```

### Simple Component Usage

```tsx
// Button with variants
<Button variant="filled">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>
<Button variant="critical">Destructive Action</Button>

// Button with icons
<Button leadingIcon={<CentralIcon name="plus" />}>Add Item</Button>
<Button loading>Processing...</Button>
```

### Compound Component Pattern

Origin uses namespace exports for multi-part components:

```tsx
// Select with compound pattern
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Choose option" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.List>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## Component Categories

### Simple Components
Direct wrappers with prop-based customization:
- **Button** - Primary actions with variants, icons, loading states
- **Input** - Text input fields
- **Badge** - Status indicators with color variants
- **Alert** - Info/critical messages
- **Avatar** - User/entity images with fallbacks
- **Loader** - Loading spinners
- **Chip** - Dismissible tags
- **Switch** - Toggle controls

### Compound Components
Multi-part components with namespace exports:
- **Field** - Form field container (Root, Label, Description, Error)
- **Select** - Dropdown selection
- **Menu** - Action menus
- **Tabs** - Tab navigation
- **Accordion** - Collapsible sections
- **Checkbox** - Checkbox groups
- **Radio** - Radio button groups
- **Table** - Data tables
- **NavigationMenu** - Site navigation
- **Tooltip** - Contextual hints
- **AlertDialog** - Confirmation dialogs

## Form Patterns

### Field + Input Pattern

Always wrap inputs with Field for proper labeling and error handling:

```tsx
<Field.Root>
  <Field.Label>Email Address</Field.Label>
  <Input type="email" placeholder="you@example.com" />
  <Field.Description>We'll never share your email.</Field.Description>
  <Field.Error>Please enter a valid email address.</Field.Error>
</Field.Root>
```

### Validation States

Use `data-invalid` attribute for error states:

```tsx
<Field.Root data-invalid={hasError}>
  <Field.Label>Username</Field.Label>
  <Input data-invalid={hasError} />
  <Field.Error>Username is required.</Field.Error>
</Field.Root>
```

### Radio and Checkbox Groups

```tsx
// Radio group
<Radio.Group value={value} onValueChange={setValue}>
  <Radio.Item value="option1" label="Option 1" />
  <Radio.Item value="option2" label="Option 2" />
</Radio.Group>

// Checkbox group
<Checkbox.Group value={values} onValueChange={setValues}>
  <Checkbox.Item value="item1" label="Item 1" />
  <Checkbox.Item value="item2" label="Item 2" />
</Checkbox.Group>
```

## Styling Guidelines

### Token Usage

Always use design tokens - never hardcode values:

```scss
// CORRECT
.container {
  padding: var(--spacing-md);
  color: var(--text-primary);
  background: var(--surface-primary);
  border-radius: var(--corner-radius-md);
}

// INCORRECT
.container {
  padding: 16px;
  color: #1A1A1A;
  background: #F8F8F7;
  border-radius: 8px;
}
```

### Typography Mixins

Use typography mixins for consistent text styles:

```scss
@use '@grid/origin/tokens' as *;

.heading {
  @include headline;
}

.bodyText {
  @include body;
}

.buttonText {
  @include btn;
}

.labelText {
  @include label;
}
```

### State Styling

Use Base UI's data attributes for states:

```scss
.input {
  border-color: var(--border-primary);

  &:hover {
    border-color: var(--border-hover);
  }

  &:focus-visible {
    box-shadow: var(--input-focus);
  }

  &[data-disabled] {
    background: var(--surface-disabled);
    cursor: not-allowed;
  }

  &[data-invalid] {
    border-color: var(--border-critical);

    &:focus-visible {
      box-shadow: var(--input-focus-critical);
    }
  }
}
```

## Layout Patterns

### Spacing with Tokens

```tsx
<div style={{
  display: 'flex',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-lg)'
}}>
  <Component />
  <Component />
</div>
```

### Common Layout Classes

```scss
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}
```

## Component Sizes

Most components support size variants:

| Component | Sizes |
|-----------|-------|
| Button | `default`, `compact` |
| Avatar | `16`, `20`, `24`, `32`, `40`, `48` |
| Switch | `sm`, `md` |
| Chip | `sm`, `md` |
| Loader | `sm`, `md`, `lg` |

## Icons

Use CentralIcon for all icons:

```tsx
import { CentralIcon } from '@grid/origin';

<CentralIcon name="check" size={16} />
<CentralIcon name="chevron-down" />
<CentralIcon name="search" color="var(--icon-secondary)" />
```

Icon names have TypeScript autocomplete via the `CentralIconName` type.

## Accessibility

Origin components inherit Base UI's accessibility features:
- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

Always include:
- Labels for form inputs (via Field.Label)
- Descriptive text for loaders (via `label` prop)
- Clear focus indicators (built-in)

## References

For detailed documentation, see:
- `references/components.md` - Complete component API reference
- `references/tokens.md` - Design token system
- `references/patterns.md` - Common UI patterns
- `references/styling.md` - SCSS patterns and mixins
- `examples/` - Working code examples

## Verification

After building a UI, verify it renders correctly:
1. Run Storybook (`npm run storybook`) or dev server (`npm run dev`)
2. Check visual rendering matches expected design
3. Test responsive behavior at different viewport sizes
4. Verify interactive states (hover, focus, disabled)
5. Ensure accessibility with keyboard navigation
