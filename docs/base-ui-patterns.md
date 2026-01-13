# Base UI Patterns Reference

Reference documentation for building components that match Base UI's internal patterns.

## File Structure (Compound Components)

```
component/
├── root/
│   ├── ComponentRoot.tsx
│   ├── ComponentRoot.test.tsx
│   └── ComponentRootContext.ts
├── item/
│   └── ComponentItem.tsx
├── index.ts           # Namespace export
└── index.parts.ts     # Aliased exports
```

## Component Signature

```tsx
'use client';

const Component = React.forwardRef<HTMLElement, Component.Props>(
  function Component(componentProps, forwardedRef) {
    const { render, className, ...elementProps } = componentProps;
    
    const state: Component.State = { /* ... */ };
    
    // ... implementation
  }
);
```

## Namespace Types

```tsx
export interface ComponentProps extends BaseProps {
  // props
}

export interface ComponentState {
  // state for className callback and data attributes
}

export namespace Component {
  export type Props = ComponentProps;
  export type State = ComponentState;
}
```

## Context Pattern

```tsx
export const ComponentContext = React.createContext<ComponentContext | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ComponentContext.displayName = 'ComponentContext';
}

export function useComponentContext() {
  const context = React.useContext(ComponentContext);
  if (context === undefined) {
    throw new Error(
      'Base UI: ComponentContext is missing. Component parts must be placed within <Component.Root>.'
    );
  }
  return context;
}
```

## Data Attributes

```tsx
// ComponentDataAttributes.ts
export enum ComponentDataAttributes {
  disabled = 'data-disabled',
  checked = 'data-checked',
  orientation = 'data-orientation',
}
```

## Index Exports

**index.ts:**
```tsx
export * as ComponentName from './index.parts';

export type * from './root/ComponentNameRoot';
export type * from './item/ComponentNameItem';
```

**index.parts.ts:**
```tsx
export { ComponentNameRoot as Root } from './root/ComponentNameRoot';
export { ComponentNameItem as Item } from './item/ComponentNameItem';
```

## Useful Utilities

From `@base-ui-components/utils`:
- `useControlled` - Controlled/uncontrolled state
- `useStableCallback` - Stable callback identity
- `useMergedRefs` - Merge multiple refs
- `useId` - Unique ID generation
- `visuallyHidden` - CSS for hidden but accessible elements

From `@base-ui-components/react`:
- `mergeProps` - Smart prop merging
- `useRender` - Render prop pattern

## Cancelable Events

```tsx
// In component
const details = createChangeEventDetails('click', event);
onCheckedChange?.(nextValue, details);

if (details.isCanceled) return; // Consumer called cancel()

setValue(nextValue);
```

```tsx
// Consumer usage
<Switch
  onCheckedChange={(checked, details) => {
    if (!checked && !confirmUncheck()) {
      details.cancel();
    }
  }}
/>
```

## Links

- [Base UI GitHub](https://github.com/mui/base-ui)
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [Radix UI](https://radix-ui.com)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
