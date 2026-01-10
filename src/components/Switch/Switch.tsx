'use client';

import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import clsx from 'clsx';
import styles from './Switch.module.scss';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: 'sm' | 'md';
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(
  function Switch(
    {
      checked,
      defaultChecked = false,
      disabled = false,
      readOnly = false,
      required = false,
      size = 'md',
      name,
      onCheckedChange,
      className,
      inputRef,
      ...props
    },
    ref
  ) {
    return (
      <BaseSwitch.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        name={name}
        onCheckedChange={onCheckedChange}
        inputRef={inputRef}
        className={clsx(styles.root, styles[size], className)}
        {...props}
      >
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
    );
  }
);

export default Switch;
