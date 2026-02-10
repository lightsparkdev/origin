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
- **Select Popup**: `--anchor-width` (for matching trigger width)
- **Accordion/Collapsible Panel**: `--accordion-panel-height`, `--collapsible-panel-height`
- **Tabs Indicator**: `--active-tab-width`, `--active-tab-left`
- **Dialog Popup**: `--nested-dialogs` (count of nested dialogs)

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

### render Prop - Swapping Elements

Replace the default DOM element rendered by any part:

```tsx
// Render a link instead of a button
<Menu.Item render={<a href="/library" />}>Add to Library</Menu.Item>

// Render a textarea instead of an input
<BaseInput render={<textarea />} />
```

The custom element MUST forward `ref` and spread all received props.

### render Prop - Custom Components

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

## Customization (Handbook)

### Event Details Object

All Base UI change handlers receive `(value, eventDetails)`:

```tsx
interface BaseUIChangeEventDetails {
  reason: string;           // Why the change occurred
  event: Event;             // Native DOM event
  cancel: () => void;       // Prevent state change
  allowPropagation: () => void;  // Allow event bubbling
  isCanceled: boolean;
  isPropagationAllowed: boolean;
}
```

### Canceling a Base UI Event

```tsx
<Tooltip.Root
  onOpenChange={(open, eventDetails) => {
    if (eventDetails.reason === 'trigger-press') {
      eventDetails.cancel(); // Prevent closing
    }
  }}
>
```

### Allowing Propagation

By default, pressing Esc stops propagation so parent popups don't close:

```tsx
<Tooltip.Root
  onOpenChange={(open, eventDetails) => {
    if (eventDetails.reason === 'escape-key') {
      eventDetails.allowPropagation(); // Let parent close too
    }
  }}
>
```

### Preventing Base UI Handler

Escape hatch for React events:

```tsx
<NumberField.Input
  onPaste={(event) => {
    event.preventBaseUIHandler();
  }}
/>
```

## TypeScript (Handbook)

### Namespace Pattern

Every component has two core interfaces:

```tsx
import { Tooltip } from '@base-ui/react/tooltip';

// Props type for wrapping
function MyTooltip(props: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />;
}

// State type for render functions
<Popover.Positioner
  render={(props, state: Popover.Positioner.State) => (
    <div {...props}>Side: {state.side}, Align: {state.align}</div>
  )}
/>
```

### Event Types

```tsx
// Change event details type
function onValueChange(value: string, eventDetails: Combobox.Root.ChangeEventDetails) {}

// Actions ref type
const actionsRef = React.useRef<Menu.Root.Actions>(null);
```

## Forms (Handbook)

### Field Integration

`Field.Root` automatically wires up `aria-labelledby`, `aria-describedby`, and `aria-errormessage`:

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

### nativeLabel Prop (v1.1.0+)

For non-native controls like Select, use `nativeLabel={false}` on Field.Label:

```tsx
<Field.Root>
  <Field.Label nativeLabel={false} render={<div />}>
    Choose option
  </Field.Label>
  <Select.Root>...</Select.Root>
</Field.Root>
```

### Fieldset for Groups

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
| `onSubmit` (default) | On form submit | Revalidates on change |
| `onBlur` | On focus loss | Revalidates on change |
| `onChange` | On every value change | Continuous |

### Custom Async Validation

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

```tsx
<Form.Root errors={{ username: 'Already taken' }}>
```

Errors clear automatically when the field value changes.

### actionsRef (v1.1.0+)

Programmatic validation/submission control:

```tsx
const fieldActionsRef = React.useRef<Field.Root.Actions>(null);
const formActionsRef = React.useRef<Form.Root.Actions>(null);

<Field.Root actionsRef={fieldActionsRef}>
  ...
</Field.Root>

// Later: fieldActionsRef.current?.validate()
// formActionsRef.current?.submit()
```

### onFormSubmit

Receives form values as a JS object (no manual FormData parsing):

```tsx
<Form.Root onFormSubmit={async (formValues) => {
  await fetch('/api', { method: 'POST', body: JSON.stringify(formValues) });
}} />
```

## Animation (Handbook)

### CSS Transitions (Recommended)

Use `data-starting-style` and `data-ending-style`. Transitions can be smoothly cancelled midway:

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

```tsx
<Popover.Root open={open} onOpenChange={setOpen}>
  <Popover.Trigger>Trigger</Popover.Trigger>
  <AnimatePresence>
    {open && (
      <Popover.Portal keepMounted>
        <Popover.Positioner>
          <Popover.Popup
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
            }
          >
            Content
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    )}
  </AnimatePresence>
</Popover.Root>
```

For components kept mounted:
- Animate based on the `open` state directly, avoid AnimatePresence

Base UI detects animation completion via `element.getAnimations()`. If your animation doesn't include opacity, animate it to `0.9999` so Base UI can detect it.

### Manual Unmounting with actionsRef

```tsx
const actionsRef = React.useRef(null);

<Popover.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef}>
  ...
  <Popover.Popup
    render={
      <motion.div
        onAnimationComplete={() => {
          if (!open) {
            actionsRef.current.unmount();
          }
        }}
      />
    }
  />
</Popover.Root>
```

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
- **Props**: `disabled`, `focusableWhenDisabled`, `nativeButton`, `className`, `style`, `render`
- **Data attrs**: `data-disabled`
- **Origin usage**: Button, InputGroup.Button

### Accordion
- **Import**: `@base-ui/react/accordion`
- **Parts**: `Root`, `Item`, `Header`, `Trigger`, `Panel`
- **Key props (Root)**: `defaultValue`, `value`, `onValueChange`, `multiple` (default: false)
- **Key props (Item)**: `value` (required for controlled/initial open)
- **Key props (Panel)**: `keepMounted`, `hiddenUntilFound`
- **Data attrs**: `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-panel-open` (on Trigger)
- **CSS vars**: `--accordion-panel-height`, `--accordion-panel-width`

### Alert Dialog
- **Import**: `@base-ui/react/alert-dialog`
- **Parts**: `Root`, `Trigger`, `Portal`, `Backdrop`, `Viewport`, `Popup`, `Title`, `Description`, `Close`
- **Key props (Root)**: `open`, `defaultOpen`, `onOpenChange`, `actionsRef`
- **Key props (Popup)**: `initialFocus`, `finalFocus`
- **Requires**: At least one focusable element (Close button or focusable content)
- **Difference from Dialog**: Cannot be dismissed by clicking backdrop or pressing Esc

### Autocomplete
- **Import**: `@base-ui/react/autocomplete`
- **Parts**: `Root`, `Input`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `NoItems`/`Empty`, `Clear`, `Arrow`, `Group`, `GroupLabel`, `Separator`
- **Key props (Root)**: `items`, `value`, `onValueChange`, `filterItems`, `autoHighlight`, `keepHighlight`, `highlightItemOnHover`, `loopFocus` (v1.1.0+)
- **Data attrs on Item**: `data-selected`, `data-highlighted`, `data-disabled`
- **Hook**: `useFilter()` for external filtering

### Avatar
- **Import**: `@base-ui/react/avatar`
- **Parts**: `Root`, `Image`, `Fallback`
- **Key props (Image)**: `onLoadingStatusChange`
- **Key props (Fallback)**: `delay` (ms before showing)

### Checkbox / Checkbox Group
- **Import**: `@base-ui/react/checkbox`, `@base-ui/react/checkbox-group`
- **Parts (Checkbox)**: `Root`, `Indicator`
- **Key props (Checkbox.Root)**: `checked`, `defaultChecked`, `onCheckedChange`, `indeterminate`, `value`, `uncheckedValue`, `parent`
- **Key props (CheckboxGroup)**: `value`, `defaultValue`, `onValueChange`, `allValues`
- **Data attrs**: `data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled`
- **Root renders**: `<button>` (changed from `<span>` in beta.5)

### Collapsible
- **Import**: `@base-ui/react/collapsible`
- **Parts**: `Root`, `Trigger`, `Panel`
- **Key props (Root)**: `open`, `defaultOpen`, `onOpenChange`
- **Key props (Panel)**: `keepMounted`, `hiddenUntilFound`
- **CSS vars**: `--collapsible-panel-height`, `--collapsible-panel-width`

### Combobox
- **Import**: `@base-ui/react/combobox`
- **Parts**: `Root`, `Input`, `Value`, `Trigger`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `NoItems`, `Clear`, `Arrow`, `Chips`, `Group`, `GroupLabel`
- **Key props (Root)**: `items`, `value`, `onValueChange`, `multiple`, `autoHighlight`, `keepHighlight`, `highlightItemOnHover`, `loopFocus` (v1.1.0+)
- **Key props (Value)**: `placeholder` (v1.1.0+)
- **Data attrs on Trigger**: `data-popup-side`, `data-list-empty` (v1.1.0+)

### Context Menu
- **Import**: `@base-ui/react/context-menu`
- **Behavior**: Same parts as Menu but Trigger responds to right-click/long-press

### Dialog
- **Import**: `@base-ui/react/dialog`
- **Parts**: `Root`, `Trigger`, `Portal`, `Backdrop`, `Viewport`, `Popup`, `Title`, `Description`, `Close`
- **Key props (Root)**: `open`, `defaultOpen`, `onOpenChange`, `modal`, `actionsRef`
- **Key props (Popup)**: `initialFocus`, `finalFocus`
- **Data attrs**: `data-open`, `data-closed`, `data-nested`, `data-nested-dialog-open`
- **CSS vars**: `--nested-dialogs`

### Field / Fieldset
- **Import**: `@base-ui/react/field`, `@base-ui/react/fieldset`
- **Field parts**: `Root`, `Label`, `Control`, `Description`, `Error`, `Validity`, `Item`
- **Key props (Field.Root)**: `name`, `invalid`, `disabled`, `validationMode`, `validate`, `validationDebounceTime`, `dirty`, `touched`, `actionsRef` (v1.1.0+)
- **Key props (Field.Label)**: `nativeLabel` (v1.1.0+) - set false for non-native controls
- **Key props (Field.Error)**: `match` - ValidityState key or boolean
- **Fieldset parts**: `Root`, `Legend`
- **Data attrs**: `data-disabled`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`

### Form
- **Import**: `@base-ui/react/form`
- **Key props**: `errors`, `onSubmit`, `onFormSubmit`, `validationMode`, `actionsRef` (v1.1.0+)

### Menu / Menubar
- **Import**: `@base-ui/react/menu`, `@base-ui/react/menubar`
- **Menu parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Item`, `Group`, `GroupLabel`, `Separator`, `SubmenuTrigger`, `Arrow`, `CheckboxItem`, `CheckboxItemIndicator`, `RadioGroup`, `RadioItem`, `RadioItemIndicator`
- **Key props (Root)**: `open`, `onOpenChange`, `actionsRef`
- **Key props (Trigger)**: `openOnHover`, `delay`, `closeDelay`
- **Key props (Positioner)**: `sideOffset`, `alignOffset`, `side`, `align`
- **Key props (Item)**: `label`, `closeOnClick` (default: true), `onClick`
- **Data attrs on Item**: `data-highlighted`, `data-disabled`

### Meter
- **Import**: `@base-ui/react/meter`
- **Parts**: `Root`, `Track`, `Indicator`, `Label`
- **Key props (Root)**: `value`, `min`, `max`, `low`, `high`, `optimum`

### Navigation Menu
- **Import**: `@base-ui/react/navigation-menu`
- **Parts**: `Root`, `List`, `Item`, `Link`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Content`, `Viewport`, `Indicator`, `Arrow`

### Number Field
- **Import**: `@base-ui/react/number-field`
- **Parts**: `Root`, `Input`, `Group`, `Increment`, `Decrement`, `ScrubArea`, `ScrubAreaCursor`
- **Key props (Root)**: `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `locale`, `format`
- **Origin status**: Not yet wrapped

### Popover
- **Import**: `@base-ui/react/popover`
- **Parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Title`, `Description`, `Close`, `Arrow`, `Backdrop`
- **Key props (Root)**: `open`, `onOpenChange`, `modal`, `actionsRef`
- **Key props (Trigger)**: `openOnHover`, `delay`, `closeDelay`
- **Key props (Positioner)**: `sideOffset`, `alignOffset`, `side`, `align`
- **Origin status**: Not yet wrapped

### Progress
- **Import**: `@base-ui/react/progress`
- **Parts**: `Root`, `Track`, `Indicator`, `Label`, `Value`
- **Key props (Root)**: `value`, `min`, `max`, `format`

### Radio / Radio Group
- **Import**: `@base-ui/react/radio`, `@base-ui/react/radio-group`
- **Radio parts**: `Root`, `Indicator`
- **Key props (RadioGroup)**: `value`, `defaultValue`, `onValueChange`, `disabled`
- **Key props (Radio.Root)**: `value` (required)
- **Data attrs**: `data-checked`, `data-unchecked`, `data-disabled`
- **Root renders**: `<button>`

### Scroll Area
- **Import**: `@base-ui/react/scroll-area`
- **Parts**: `Root`, `Viewport`, `Scrollbar`, `Thumb`, `Corner`
- **Key props (Scrollbar)**: `orientation`
- **Data attrs**: `data-scrolling`, `data-hovering`
- **CSS vars on Viewport** (not Root since beta.5)

### Select
- **Import**: `@base-ui/react/select`
- **Parts**: `Root`, `Trigger`, `Value`, `Icon`, `Portal`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`, `ItemIndicator`, `Group`, `GroupLabel`, `Separator`, `Arrow`, `ScrollUpArrow`, `ScrollDownArrow`
- **Key props (Root)**: `items`, `value`, `defaultValue`, `onValueChange`, `multiple`, `alignItemWithTrigger`
- **Key props (Value)**: `placeholder` (v1.1.0+)
- **Trigger renders**: `<button>`
- **Data attrs on Item**: `data-highlighted`, `data-selected`, `data-disabled`
- **CSS vars**: `--anchor-width`

### Separator
- **Import**: `@base-ui/react/separator`
- **Key props**: `orientation` (`'horizontal'` | `'vertical'`)
- **Renders**: `<hr>` by default

### Slider
- **Import**: `@base-ui/react/slider`
- **Parts**: `Root`, `Track`, `Thumb`, `Output`, `Control`, `Indicator`, `Value`
- **Key props (Root)**: `value`, `defaultValue`, `onValueChange`, `onValueCommitted`, `min`, `max`, `step`, `thumbCollisionBehavior` (`push`/`swap`/`none`), `format`
- **Key props (Thumb)**: `index` (for range sliders)
- **Origin status**: Not yet wrapped

### Switch
- **Import**: `@base-ui/react/switch`
- **Parts**: `Root`, `Thumb`
- **Key props (Root)**: `checked`, `defaultChecked`, `onCheckedChange`, `value` (v1.1.0+), `uncheckedValue`, `name`
- **Data attrs**: `data-checked`, `data-unchecked`, `data-disabled`
- **Root renders**: `<button>`

### Tabs
- **Import**: `@base-ui/react/tabs`
- **Parts**: `Root`, `List`, `Tab`, `Panel`, `Indicator`
- **Key props (Root)**: `value`, `defaultValue`, `onValueChange`, `activateOnFocus` (default: false)
- **Key props (Tab/Panel)**: `value` (required)
- **Data attrs**: `data-active` on Tab (renamed from `data-selected` in beta.5)
- **CSS vars on Indicator**: `--active-tab-width`, `--active-tab-left`

### Toast
- **Import**: `@base-ui/react/toast`
- **Parts**: `Provider`, `Viewport`, `Root`, `Title`, `Description`, `Action`, `Close`, `Content`
- **Key props (Provider)**: `timeout`, `swipeDirection`
- **Toast object**: `id`, `title`, `description`, `type`, `priority`, `data`
- **Hook**: `Toast.useToastManager()` returns `{ toasts, add, update, close, promise }`
- **CSS vars on Root**: `--toast-index`, `--toast-offset-y`, `--toast-swipe-movement-x/y`, `--toast-height`, `--toast-frontmost-height`

### Toggle / Toggle Group
- **Import**: `@base-ui/react/toggle`, `@base-ui/react/toggle-group`
- **Toggle key props**: `pressed`, `defaultPressed`, `onPressedChange`
- **Toggle Group key props**: `value`, `defaultValue`, `onValueChange`, `multiple`
- **Data attrs**: `data-pressed` (on Toggle)
- **Origin status**: Not yet wrapped

### Toolbar
- **Import**: `@base-ui/react/toolbar`
- **Parts**: `Root`, `Button`, `Link`, `Group`, `Separator`, `Input`
- **Origin status**: Not yet wrapped

### Tooltip
- **Import**: `@base-ui/react/tooltip`
- **Parts**: `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Arrow`, `Provider`
- **Key props (Root)**: `open`, `onOpenChange`, `actionsRef`
- **Key props (Trigger)**: `delay`, `closeDelay`
- **Key props (Positioner)**: `sideOffset`, `side`, `trackCursorAxis`
- **Provider**: Share delay across multiple tooltips
- **Data attrs**: `data-instant` (for shared tooltips with no delay)

## Utilities

### mergeProps (v1.1.0+ public)

Merge multiple prop sets, intelligently handling event handlers, className, and style:

```tsx
import { mergeProps } from '@base-ui/react/merge-props';

const merged = mergeProps(
  { onClick: handleClick1, className: 'a' },
  { onClick: handleClick2, className: 'b' }
);
// merged.onClick calls both handlers
// merged.className is 'a b'
```

### useRender

Enable render prop pattern in custom components:

```tsx
import { useRender } from '@base-ui/react/use-render';

function CustomComponent({ render, ...props }) {
  const { renderElement } = useRender({ render, props, state: {} });
  return renderElement();
}
```

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
| alpha.5 | Dialog/AlertDialog/Menu/Popover/Tooltip/Select | Portal part now required |
| rc.0 | Checkbox/Switch | `uncheckedValue` prop added (no "off" submitted by default) |
| 1.0.0 | Package | Renamed `@base-ui-components/react` -> `@base-ui/react` |

## Common Gotchas

### Select with Field.Label
Select is not a native form control, so `Field.Label` must use `nativeLabel={false}`:

```tsx
<Field.Label nativeLabel={false} render={<div />}>
  Choose option
</Field.Label>
```

### Input with render={<textarea />} Type Casts
See SKILL.md for the ref and props casting pattern required.

### Portal + Animation
Always use `keepMounted` on Portal when using AnimatePresence for exit animations.

### Dialog in Menu
Control dialog state externally, open via `Menu.Item onClick`:

```tsx
<Menu.Item onClick={() => setDialogOpen(true)}>Open Dialog</Menu.Item>
<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>...
```

### Focus Management
- `initialFocus`: Where focus goes on open (false to disable)
- `finalFocus`: Where focus goes on close (false to disable)
- Both accept RefObject or function returning element/boolean
