'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import clsx from 'clsx';
import { Loader } from '@/components/Loader';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'filled',
      size = 'md',
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      iconOnly = false,
      children,
      className,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <BaseButton
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          iconOnly && styles.iconOnly,
          loading && styles.loading,
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader size="sm" className={styles.loader} />
        ) : (
          <>
            {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
            {!iconOnly && children && <span className={styles.label}>{children}</span>}
            {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
          </>
        )}
      </BaseButton>
    );
  }
);

export default Button;
