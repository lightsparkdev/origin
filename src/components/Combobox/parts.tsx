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

export function Root<Value, Multiple extends boolean | undefined = false>({
  autoHighlight = true,
  ...props
}: RootProps<Value, Multiple>) {
  return <BaseCombobox.Root autoHighlight={autoHighlight} {...props} />;
}

export interface TriggerProps extends BaseCombobox.Trigger.Props {}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger({ className, ...props }, ref) {
    return (
      <BaseCombobox.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        {...props}
      />
    );
  }
);

export interface InputProps extends BaseCombobox.Input.Props {}

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

export interface IconProps extends BaseCombobox.Icon.Props {}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  function Icon({ className, ...props }, ref) {
    return (
      <BaseCombobox.Icon
        ref={ref}
        className={clsx(styles.icon, className)}
        {...props}
      >
        <CentralIcon name="IconChevronDownSmall" size={20} />
      </BaseCombobox.Icon>
    );
  }
);

export interface ClearProps extends BaseCombobox.Clear.Props {}

export const Clear = React.forwardRef<HTMLButtonElement, ClearProps>(
  function Clear({ className, ...props }, ref) {
    return (
      <BaseCombobox.Clear
        ref={ref}
        className={clsx(styles.clear, className)}
        {...props}
      >
        <CentralIcon name="IconCircleX" size={17} />
      </BaseCombobox.Clear>
    );
  }
);

export interface PortalProps extends BaseCombobox.Portal.Props {}

export const Portal = BaseCombobox.Portal;

export interface PositionerProps extends BaseCombobox.Positioner.Props {}

export const Positioner = React.forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner({ className, sideOffset = 6, ...props }, ref) {
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

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  function Item({ className, children, ...props }, ref) {
    return (
      <BaseCombobox.Item
        ref={ref}
        className={clsx(styles.item, className)}
        {...props}
      >
        <span className={styles.itemLabel}>{children}</span>
        <BaseCombobox.ItemIndicator className={styles.itemIndicator}>
          <span className={styles.indicator} />
        </BaseCombobox.ItemIndicator>
      </BaseCombobox.Item>
    );
  }
);

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
