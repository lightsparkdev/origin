# Base UI Reference

Detailed API, patterns, and handbook knowledge for `@base-ui/react` v1.1.0.

## Styling (Handbook)

Base UI is unstyled and bundles no CSS. Origin uses SCSS Modules.

### Style Hooks

Every component accepts `className` (string or function) and `style` (object or function):

```tsx
// Static class
<Switch.Root className={styles.switch} />

// Dynamic class based on state
<Switch.Root className={(state) => state.checked ? styles.checked : styles.unchecked} />

// Dynamic style based on state
<Switch.Root style={(state) => ({ color: state.checked ? 'green' : 'gray' })} />
```

### Data Attributes for State Styling

Style states via data attributes in CSS, not JS:

```css
.SwitchThumb[data-checked] { background-color: green; }
.Input[data-invalid] { border-color: var(--border-critical); }
.Input[data-focused] { box-shadow: var(--input-focus); }
```

### CSS Variables

Popup components expose dynamic CSS variables:

```css
.Popup { max-height: var(--available-height); }
.Positioner { width: var(--anchor-width); }
```

Key CSS variables by component:
- **Popover/Tooltip/Menu Popup**: `--available-height`, `--available-width`, `--anchor-width`, `--anchor-height`, `--transform-origin`
- **Popover/Tooltip/Menu Positioner**: `--positioner-width`, `--positioner-height`
- **Select Popup**: `--anchor-width` (for matching trigger width)

### CSS Modules Pattern (Origin's approach)

```tsx
import { Menu } from '@base-ui/react/menu';
import styles from './menu.module.scss';

<Menu.Trigger className={styles.trigger}>Song</Menu.Trigger>
<Menu.Popup className={styles.popup}>
  <Menu.Item className={styles.item}>Add to Library</Menu.Item>
</Menu.Popup>
```

## Composition (Handbook)

### render Prop — Swapping Elements

Replace the default DOM element rendered by any part:

```tsx
// Render a link instead of a button
<Menu.Item render={<a href="/library" />}>Add to Library</Menu.Item>

// Render a textarea instead of an input
<BaseInput render={<textarea />} />
```

The custom element MUST forward `ref` and spread all received props.

### render Prop — Custom Components

Compose Base UI with your own components:

```tsx
<Menu.Trigger render={<MyCustomButton />}>Open menu</Menu.Trigger>
```

`MyCustomButton` must accept and forward `ref` + spread props onto its DOM node.

### Nested Composition (Tooltip + Menu example)

render props nest arbitrarily deep:

```tsx
<Tooltip.Trigger
  render={
    <Menu.Trigger render={<MyCustomButton />}>
      Open menu
    </Menu.Trigger>
  }
/>
```

### Render Function (Performance)

For performance-critical code, pass a function instead of an element:

```tsx
<Switch.Thumb
  render={(props, state) => (
    <span {...props}>
      {state.checked ? <CheckIcon /> : <CrossIcon />}
    </span>
  )}
/>
```

## Forms (Handbook)

### Field Integration

`Field.Root` automatically wires up `aria-labelledby`, `aria-describedby`, and `aria-errormessage`. No manual ARIA needed:

```tsx
<Field.Root name="username">
  <Field.Label>Username</Field.Label>
  <Field.Description>Must be 3+ characters</Field.Description>
  <Input required minLength={3} />
  <Field.Error>You must create a username</Field.Error>
</Field.Root>
```

### Implicit Labeling (Switch, Checkbox)

Enclose the control with `Field.Label`:

```tsx
<Field.Root>
  <Field.Label>
    <Switch.Root><Switch.Thumb /></Switch.Root>
    Developer mode
  </Field.Label>
</Field.Root>
```

### Fieldset for Groups (Radio, Checkbox Group, Range Slider)

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Storage type</Fieldset.Legend>
  <RadioGroup>
    <Radio.Root value="ssd">SSD</Radio.Root>
    <Radio.Root value="hdd">HDD</Radio.Root>
  </RadioGroup>
</Fieldset.Root>
```

### Validation Modes

| Mode | When it validates | After first invalid |
|------|------------------|-------------------|
| `onSubmit` (default) | On form submit | Revalidates on value change |
| `onBlur` | On focus loss | Revalidates on value change |
| `onChange` | On every value change | Continuous |

Custom async validation:

```tsx
<Field.Root
  validate={async (value) => {
    const available = await checkUsername(value);
    return available ? null : `${value} is unavailable.`;
  }}
  validationDebounceTime={500}
>
```

### Server-Side Validation

Pass errors to `Form.Root`:

```tsx
<Form.Root errors={{ username: 'Already taken' }}>
```

Errors clear automatically when the field value changes.

### onFormSubmit (v1.0.0+)

Receives form values as a JS object (no manual FormData parsing):

```tsx
<Form.Root onFormSubmit={async (formValues) => {
  await fetch('/api', { method: 'POST', body: JSON.stringify(formValues) });
}} />
```

### Field.actionsRef (v1.1.0+)

Programmatic validation control:

```tsx
const actionsRef = React.useRef(null);
<Field.Root actionsRef={actionsRef}>
  ...
</Field.Root>
// Later: actionsRef.current?.validate()
```

## Animation (Handbook)

### CSS Transitions (Recommended)

Use `data-starting-style` and `data-ending-style`. Transitions can be smoothly cancelled midway (e.g., closing before open animation finishes):

```css
.Popup {
  transform-origin: var(--transform-origin);
  transition: transform 150ms, opacity 150ms;

  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    transform: scale(0.9);
  }
}
```

### CSS Animations

Use `data-open` and `data-closed` with @keyframes:

```css
.Popup[data-open] { animation: scaleIn 250ms ease-out; }
.Popup[data-closed] { animation: scaleOut 250ms ease-in; }
```

### Motion Library (JS animations)

For components unmounted when closed (default):
1. Control `open` state so AnimatePresence can see it
2. Use `keepMounted` on the Portal
3. Compose Popup with `motion.div` via render prop

For components kept mounted:
- Animate based on the `open` state directly, avoid AnimatePresence

Base UI detects animation completion via `element.getAnimations()`. If your animation doesn't include opacity, animate it to `0.9999` so Base UI can detect it.

## Full Component API Catalog

### Input
- **Import**: `@base-ui/react/input`
- **Renders**: `<input>` (swappable via `render`)
- **Props**: `defaultValue`, `onValueChange(value, eventDetails)`, `className`, `style`, `render`
- **Data attrs**: `data-disabled`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`
- **Field integration**: Automatic
- **Accessibility**: Must have a label (via `<label>` or `Field.Label`)
- **Origin usage**: Input, Textarea (`render={<textarea />}`), InputGroup.Input, TextareaGroup.Textarea, PhoneInput

### Button
- **Import**: `@base-ui/react/button`
- **Renders**: `<button>` (or any focusable via `render`)
- **Props**: `disabled`, `className`, `style`, `render`
- **Data attrs**: `data-disabled`
- **Origin usage**: Button, InputGroup.Button

### Accordion
- **Import**: `@base-ui/react/accordion`
- **Parts**: `Root`, `Item`, `Trigger`, `Panel`
- **Key props (Root)**: `defaultValue`, `value`, `onValueChange`, `multiple` (default: false)
- **Key props (Item)**: `value` (required for controlled/initial open)
- **Data attrs**: `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`

### Alert Dialog
- **Import**: `@base-ui/react/alert-dialog`
- **Parts**: `Root`, `Trigger`, `Portal`, `Backdrop`, `Content`, `Title`, `Description`, `Close`, `Viewport`
- **Key props**: `open`, `defaultOpen`, `onOpenChange`, `disablePointerDismissal`
- **Requires**: At least one `Trigger`

### Autocomplete
- **Import**: `@base-ui/react/autocomplete`
- **Parts**: `Root`, `Input`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `NoItems`, `Clear`, `Arrow`
- **Key props**: `value`, `onValueChange`, `items`, `filterItems`, `submitOnItemClick`, `loopFocus` (v1.1.0+), `autoHighlight`, `keepHighlight`, `highlightItemOnHover`
- **Data attrs on Popup**: `data-popup-side`, `data-list-empty`

### Avatar
- **Import**: `@base-ui/react/avatar`
- **Parts**: `Root`, `Image`, `Fallback`

### Checkbox / Checkbox Group
- **Import**: `@base-ui/react/checkbox`, `@base-ui/react/checkbox-group`
- **Parts (Checkbox)**: `Root`, `Indicator`
- **Key props**: `checked`, `defaultChecked`, `onCheckedChange`, `indeterminate`, `uncheckedValue`
- **Root renders**: `<button>` (changed from `<span>` in beta.5)

### Collapsible
- **Import**: `@base-ui/react/collapsible`
- **Parts**: `Root`, `Trigger`, `Panel`
- **Key props**: `open`, `defaultOpen`, `onOpenChange`

### Combobox
- **Import**: `@base-ui/react/combobox`
- **Parts**: `Root`, `Input`, `Value`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `NoItems`, `Clear`, `Arrow`
- **Key props**: `value`, `onValueChange`, `items`, `multiple`, `autoHighlight`, `keepHighlight`, `highlightItemOnHover`, `loopFocus` (v1.1.0+)
- **Value part**: `placeholder` prop (v1.1.0+)

### Context Menu
- **Import**: `@base-ui/react/context-menu`
- **Behavior**: Same parts as Menu but Trigger responds to right-click/long-press

### Dialog
- **Import**: `@base-ui/react/dialog`
- **Parts**: `Root`, `Trigger`, `Portal`, `Backdrop`, `Content`, `Title`, `Description`, `Close`, `Viewport`
- **Key props**: `open`, `defaultOpen`, `onOpenChange`, `modal`, `disablePointerDismissal`, `initialFocus`
- **Viewport part**: Added in beta.5 for scrollable dialogs

### Field / Fieldset
- **Import**: `@base-ui/react/field`, `@base-ui/react/fieldset`
- **Field parts**: `Root`, `Label`, `Control`, `Description`, `Error`, `Validity`, `Item`
- **Key props**: `invalid`, `disabled`, `name`, `validationMode`, `validate`, `validationDebounceTime`, `dirty`, `touched`, `actionsRef` (v1.1.0+), `nativeLabel` (v1.1.0+)
- **Fieldset parts**: `Root`, `Legend`

### Form
- **Import**: `@base-ui/react/form`
- **Key props**: `errors`, `onSubmit`, `onFormSubmit`, `validationMode`, `actionsRef` (v1.1.0+)

### Menu / Menubar
- **Import**: `@base-ui/react/menu`, `@base-ui/react/menubar`
- **Menu parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Item`, `Group`, `GroupLabel`, `Separator`, `SubmenuTrigger`, `Arrow`, `CheckboxItem`, `RadioGroup`, `RadioItem`
- **Key props (Root)**: `open`, `onOpenChange`, `highlightItemOnHover`
- **Key props (Trigger)**: `openOnHover`, `delay`, `closeDelay` (moved from Root in beta.5)

### Meter
- **Import**: `@base-ui/react/meter`
- **Parts**: `Root`, `Track`, `Indicator`, `Label`
- **Key props**: `value`, `min`, `max`, `low`, `high`, `optimum`

### Navigation Menu
- **Import**: `@base-ui/react/navigation-menu`
- **Parts**: `Root`, `List`, `Item`, `Link`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Content`, `Viewport`, `Indicator`, `Arrow`

### Number Field
- **Import**: `@base-ui/react/number-field`
- **Parts**: `Root`, `Input`, `Group`, `Increment`, `Decrement`, `ScrubArea`, `ScrubAreaCursor`
- **Key props**: `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `locale`

### Popover
- **Import**: `@base-ui/react/popover`
- **Parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Title`, `Description`, `Close`, `Arrow`, `Backdrop`
- **Key props (Root)**: `open`, `onOpenChange`, `modal`, `disablePointerDismissal`
- **Key props (Trigger)**: `openOnHover`, `delay`, `closeDelay`

### Progress
- **Import**: `@base-ui/react/progress`
- **Parts**: `Root`, `Track`, `Indicator`, `Label`
- **Key props**: `value`, `min`, `max`

### Radio / Radio Group
- **Import**: `@base-ui/react/radio`, `@base-ui/react/radio-group`
- **Radio parts**: `Root`, `Indicator`
- **Root renders**: `<button>`

### Scroll Area
- **Import**: `@base-ui/react/scroll-area`
- **Parts**: `Root`, `Viewport`, `Scrollbar`, `Thumb`, `Corner`
- **CSS vars on Viewport** (not Root since beta.5)

### Select
- **Import**: `@base-ui/react/select`
- **Parts**: `Root`, `Trigger`, `Value`, `Icon`, `Portal`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `Group`, `GroupLabel`, `Separator`, `Arrow`, `ScrollUpArrow`, `ScrollDownArrow`
- **Key props**: `value`, `defaultValue`, `onValueChange`, `multiple`, `alignItemWithTrigger`
- **Trigger renders**: `<button>`
- **Value part**: `placeholder` prop (v1.1.0+)

### Separator
- **Import**: `@base-ui/react/separator`
- **Renders**: `<hr>` by default

### Slider
- **Import**: `@base-ui/react/slider`
- **Parts**: `Root`, `Track`, `Thumb`, `Output`, `Control`, `Indicator`
- **Key props**: `value`, `defaultValue`, `onValueChange`, `onValueCommitted`, `min`, `max`, `step`, `thumbCollisionBehavior` (`push`/`swap`/`none`)

### Switch
- **Import**: `@base-ui/react/switch`
- **Parts**: `Root`, `Thumb`
- **Key props**: `checked`, `defaultChecked`, `onCheckedChange`, `value` (v1.1.0+), `uncheckedValue`
- **Root renders**: `<button>`

### Tabs
- **Import**: `@base-ui/react/tabs`
- **Parts**: `Root`, `List`, `Tab`, `Panel`, `Indicator`
- **Key props**: `value`, `defaultValue`, `onValueChange`, `activateOnFocus` (default: false)
- **Tab/Panel**: `value` prop is required
- **Data attrs**: `data-active` on Tab (renamed from `data-selected` in beta.5)

### Toast
- **Import**: `@base-ui/react/toast`
- **Parts**: `Provider`, `Viewport`, `Root`, `Title`, `Description`, `Action`, `Close`, `Content`
- **Key props (Provider)**: `timeout`, `swipeDirection`
- **Toast object**: `title` and `description` accept `React.ReactNode`
- **Hook**: `Toast.useToastManager()` returns `{ toasts, add, update, close, promise }`

### Toggle / Toggle Group
- **Import**: `@base-ui/react/toggle`, `@base-ui/react/toggle-group`
- **Toggle Group key props**: `value`, `defaultValue`, `onValueChange`, `multiple`

### Toolbar
- **Import**: `@base-ui/react/toolbar`
- **Parts**: `Root`, `Button`, `Link`, `Group`, `Separator`, `Input`

### Tooltip
- **Import**: `@base-ui/react/tooltip`
- **Parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Arrow`, `Provider`
- **Key props (Trigger)**: `delay`, `closeDelay`, `disableHoverablePopup`

## Breaking Changes (Beta -> Stable)

| Version | Component | Change |
|---------|-----------|--------|
| beta.5 | General | `trackAnchor` -> `disableAnchorTracking` |
| beta.5 | General | `loop` -> `loopFocus` |
| beta.5 | Accordion | `multiple` defaults to `false` |
| beta.5 | Checkbox/Switch/Radio | Root renders `<button>` not `<span>` |
| beta.5 | Dialog | `dismissible` -> `disablePointerDismissal` |
| beta.5 | Menu/Popover/Tooltip | `delay`/`closeDelay` moved from Root to Trigger |
| beta.5 | Select | Trigger renders `<button>` not `<div>` |
| beta.5 | Tabs | `data-selected` -> `data-active`, `activateOnFocus` defaults false |
| beta.5 | Tabs | `value` required on Tab and Panel |
| beta.5 | Field | Default validation mode is `onSubmit` not `onBlur` |
| beta.5 | Form | `onClearErrors` removed |
| beta.5 | Scroll Area | CSS vars on Viewport, not Root |
| rc.0 | Checkbox/Switch | `uncheckedValue` prop added (no "off" submitted by default) |
| 1.0.0 | Package | Renamed `@base-ui-components/react` -> `@base-ui/react` |
