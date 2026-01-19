'use client';

import * as React from 'react';
import { Select as BaseSelect, SelectRootProps } from '@base-ui/react/select';
import { CentralIcon } from '@/components/Icon';
import clsx from 'clsx';
import styles from './Select.module.scss';

// Root - generic component, pass through props
export interface RootProps<Value = string, Multiple extends boolean | undefined = false>
  extends SelectRootProps<Value, Multiple> {}

export function Root<Value = string, Multiple extends boolean | undefined = false>(
  props: RootProps<Value, Multiple>
) {
  return <BaseSelect.Root {...props} />;
}

// Trigger
export interface TriggerProps extends BaseSelect.Trigger.Props {}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger({ className, ...props }, ref) {
    return (
      <BaseSelect.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        {...props}
      />
    );
  }
);

// Value
export interface ValueProps extends Omit<BaseSelect.Value.Props, 'children'> {
  placeholder?: string;
  children?: BaseSelect.Value.Props['children'];
}

export const Value = React.forwardRef<HTMLSpanElement, ValueProps>(
  function Value({ className, placeholder, children, ...props }, ref) {
    return (
      <BaseSelect.Value
        ref={ref}
        className={clsx(styles.value, className)}
        {...props}
      >
        {children ?? ((value) => {
          if (value != null) {
            return value;
          }
          return placeholder ? (
            <span data-placeholder="">{placeholder}</span>
          ) : null;
        })}
      </BaseSelect.Value>
    );
  }
);

// Icon - renders chevron using CentralIcon
export interface IconProps extends Omit<BaseSelect.Icon.Props, 'children'> {
  children?: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  function Icon({ className, children, ...props }, ref) {
    return (
      <BaseSelect.Icon
        ref={ref}
        className={clsx(styles.icon, className)}
        {...props}
      >
        {children ?? <CentralIcon name="IconChevronDownSmall" size={20} />}
      </BaseSelect.Icon>
    );
  }
);

// Portal
export interface PortalProps extends BaseSelect.Portal.Props {}

export function Portal(props: PortalProps) {
  return <BaseSelect.Portal {...props} />;
}

// Positioner - defaults to dropdown style (below trigger) like Combobox
export interface PositionerProps extends BaseSelect.Positioner.Props {}

export const Positioner = React.forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner({ 
    className, 
    sideOffset = 4,
    alignItemWithTrigger = false,
    ...props 
  }, ref) {
    return (
      <BaseSelect.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...props}
      />
    );
  }
);

// Popup
export interface PopupProps extends BaseSelect.Popup.Props {}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function Popup({ className, ...props }, ref) {
    return (
      <BaseSelect.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        {...props}
      />
    );
  }
);

// List - container for items with gap and padding
export interface ListProps extends BaseSelect.List.Props {}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  function List({ className, ...props }, ref) {
    return (
      <BaseSelect.List
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      />
    );
  }
);

// Item - supports optional trailing icon slot
export interface ItemProps extends BaseSelect.Item.Props {
  /** Optional trailing icon (renders after ItemText) */
  trailingIcon?: React.ReactNode;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  function Item({ className, trailingIcon, children, ...props }, ref) {
    return (
      <BaseSelect.Item
        ref={ref}
        className={clsx(styles.item, className)}
        {...props}
      >
        {children}
        {trailingIcon && (
          <span className={styles.itemTrailing}>{trailingIcon}</span>
        )}
      </BaseSelect.Item>
    );
  }
);

// ItemIndicator - renders selection dot
export interface ItemIndicatorProps extends Omit<BaseSelect.ItemIndicator.Props, 'children'> {
  children?: React.ReactNode;
}

export const ItemIndicator = React.forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  function ItemIndicator({ className, children, keepMounted = true, style, ...props }, ref) {
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        className={clsx(styles.itemIndicator, className)}
        keepMounted={keepMounted}
        style={(state) => ({
          visibility: state.selected ? 'visible' : 'hidden',
          ...(typeof style === 'function' ? style(state) : style),
        })}
        {...props}
      >
        {children ?? <span className={styles.itemIndicatorDot} />}
      </BaseSelect.ItemIndicator>
    );
  }
);

// ItemText
export interface ItemTextProps extends BaseSelect.ItemText.Props {}

export const ItemText = React.forwardRef<HTMLDivElement, ItemTextProps>(
  function ItemText({ className, ...props }, ref) {
    return (
      <BaseSelect.ItemText
        ref={ref}
        className={clsx(styles.itemText, className)}
        {...props}
      />
    );
  }
);

// Separator
export interface SeparatorProps extends BaseSelect.Separator.Props {}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator({ className, ...props }, ref) {
    return (
      <BaseSelect.Separator
        ref={ref}
        className={clsx(styles.separator, className)}
        {...props}
      />
    );
  }
);

// Group
export interface GroupProps extends BaseSelect.Group.Props {}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  function Group({ className, ...props }, ref) {
    return (
      <BaseSelect.Group
        ref={ref}
        className={clsx(styles.group, className)}
        {...props}
      />
    );
  }
);

// GroupLabel
export interface GroupLabelProps extends BaseSelect.GroupLabel.Props {}

export const GroupLabel = React.forwardRef<HTMLDivElement, GroupLabelProps>(
  function GroupLabel({ className, ...props }, ref) {
    return (
      <BaseSelect.GroupLabel
        ref={ref}
        className={clsx(styles.groupLabel, className)}
        {...props}
      />
    );
  }
);
