'use client';

import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { CentralIcon } from '@/components/Icon';
import clsx from 'clsx';
import styles from './Combobox.module.scss';

export interface RootProps<Value, Multiple extends boolean | undefined = false>
  extends BaseCombobox.Root.Props<Value, Multiple> {
  autoHighlight?: boolean;
}

/**
 * Combobox.Root - Container for the combobox.
 *
 * Uses Base UI's built-in collator filter by default. Pass `filter={null}`
 * to disable filtering, or provide a custom filter function.
 */
export function Root<Value, Multiple extends boolean | undefined = false>({
  autoHighlight = true,
  ...props
}: RootProps<Value, Multiple>) {
  return <BaseCombobox.Root autoHighlight={autoHighlight} {...props} />;
}

export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Combobox.InputWrapper - Container for Input + ActionButtons.
 *
 * Uses position: relative to contain the absolutely positioned ActionButtons.
 *
 * ```tsx
 * <Combobox.InputWrapper>
 *   <Combobox.Input placeholder="Search..." />
 *   <Combobox.ActionButtons>
 *     <Combobox.Clear />
 *     <Combobox.Trigger />
 *   </Combobox.ActionButtons>
 * </Combobox.InputWrapper>
 * ```
 */
export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  function InputWrapper({ className, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.inputWrapper, className)} {...props} />
    );
  }
);

export interface InputProps extends BaseCombobox.Input.Props {}

/**
 * Combobox.Input - The text input element.
 *
 * Should be placed directly inside InputWrapper, NOT inside Trigger.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <BaseCombobox.Input
        ref={ref}
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  }
);

export interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Combobox.ActionButtons - Container for Clear and Trigger buttons.
 *
 * Absolutely positioned within InputWrapper.
 */
export const ActionButtons = React.forwardRef<HTMLDivElement, ActionButtonsProps>(
  function ActionButtons({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(styles.actionButtons, className)}
        {...props}
      />
    );
  }
);

export interface TriggerProps extends BaseCombobox.Trigger.Props {}

/**
 * Combobox.Trigger - Button to open/close the popup.
 *
 * Renders as a small icon button with the chevron icon.
 */
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger({ className, children, ...props }, ref) {
    return (
      <BaseCombobox.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        {...props}
      >
        {children ?? <CentralIcon name="IconChevronDownSmall" size={20} />}
      </BaseCombobox.Trigger>
    );
  }
);

export interface ClearProps extends BaseCombobox.Clear.Props {}

/**
 * Combobox.Clear - Button to clear the selection.
 *
 * Renders as a small icon button with the X icon.
 */
export const Clear = React.forwardRef<HTMLButtonElement, ClearProps>(
  function Clear({ className, children, ...props }, ref) {
    return (
      <BaseCombobox.Clear
        ref={ref}
        className={clsx(styles.clear, className)}
        {...props}
      >
        {children ?? <CentralIcon name="IconCircleX" size={17} />}
      </BaseCombobox.Clear>
    );
  }
);

export interface PortalProps extends BaseCombobox.Portal.Props {}

export const Portal = BaseCombobox.Portal;

export interface PositionerProps extends BaseCombobox.Positioner.Props {}

/**
 * Combobox.Positioner - Handles popup positioning.
 *
 * Base UI handles all positioning via CSS variables.
 */
export const Positioner = React.forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner({ className, sideOffset = 4, ...props }, ref) {
    return (
      <BaseCombobox.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        sideOffset={sideOffset}
        {...props}
      />
    );
  }
);

export interface PopupProps extends BaseCombobox.Popup.Props {}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function Popup({ className, ...props }, ref) {
    return (
      <BaseCombobox.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        {...props}
      />
    );
  }
);

export interface ListProps extends BaseCombobox.List.Props {}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  function List({ className, ...props }, ref) {
    return (
      <BaseCombobox.List
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      />
    );
  }
);

export interface ItemProps extends BaseCombobox.Item.Props {}

/**
 * Combobox.Item - A selectable item in the list.
 *
 * Use with ItemIndicator and ItemText for proper layout:
 * ```tsx
 * <Combobox.Item value="apple">
 *   <Combobox.ItemIndicator />
 *   <Combobox.ItemText>Apple</Combobox.ItemText>
 * </Combobox.Item>
 * ```
 */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  function Item({ className, ...props }, ref) {
    return (
      <BaseCombobox.Item
        ref={ref}
        className={clsx(styles.item, className)}
        {...props}
      />
    );
  }
);

export interface ItemTextProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ItemText = React.forwardRef<HTMLDivElement, ItemTextProps>(
  function ItemText({ className, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.itemText, className)} {...props} />
    );
  }
);

export interface ItemIndicatorProps extends BaseCombobox.ItemIndicator.Props {}

export const ItemIndicator = React.forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  function ItemIndicator({ className, children, ...props }, ref) {
    return (
      <BaseCombobox.ItemIndicator
        ref={ref}
        className={clsx(styles.itemIndicator, className)}
        {...props}
      >
        {children ?? <CheckIcon />}
      </BaseCombobox.ItemIndicator>
    );
  }
);

// Default check icon for ItemIndicator
function CheckIcon() {
  return (
    <svg
      className={styles.itemIndicatorIcon}
      fill="currentcolor"
      width="12"
      height="12"
      viewBox="0 0 10 10"
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

export interface GroupProps extends BaseCombobox.Group.Props {}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  function Group({ className, ...props }, ref) {
    return (
      <BaseCombobox.Group
        ref={ref}
        className={clsx(styles.group, className)}
        {...props}
      />
    );
  }
);

export interface GroupLabelProps extends BaseCombobox.GroupLabel.Props {}

export const GroupLabel = React.forwardRef<HTMLDivElement, GroupLabelProps>(
  function GroupLabel({ className, ...props }, ref) {
    return (
      <BaseCombobox.GroupLabel
        ref={ref}
        className={clsx(styles.groupLabel, className)}
        {...props}
      />
    );
  }
);

export interface EmptyProps extends BaseCombobox.Empty.Props {}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  function Empty({ className, children, ...props }, ref) {
    return (
      <BaseCombobox.Empty
        ref={ref}
        className={clsx(styles.empty, className)}
        {...props}
      >
        {children ?? 'No results found.'}
      </BaseCombobox.Empty>
    );
  }
);

export interface ValueProps extends BaseCombobox.Value.Props {
  className?: string;
}

export function Value({ className, ...props }: ValueProps) {
  return (
    <span className={clsx(styles.value, className)}>
      <BaseCombobox.Value {...props} />
    </span>
  );
}

/**
 * Combobox.useFilter - Hook that provides filter functions for combobox items.
 *
 * Returns an object with `contains`, `startsWith`, and `endsWith` methods
 * that can be passed to the `filter` prop of Combobox.Root.
 *
 * @example
 * ```tsx
 * function MyCombobox() {
 *   const filter = Combobox.useFilter();
 *
 *   return (
 *     <Combobox.Root items={items} filter={filter.contains}>
 *       ...
 *     </Combobox.Root>
 *   );
 * }
 * ```
 */
export const useFilter = BaseCombobox.useFilter;

// Legacy exports for backwards compatibility
/** @deprecated Use InputWrapper instead */
export const Control = InputWrapper;
/** @deprecated Use BaseCombobox.Icon directly or just use Trigger with default icon */
export const Icon = BaseCombobox.Icon;
