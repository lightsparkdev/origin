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
  loadingIndicator?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

const defaultLoadingIndicator = <Loader size="sm" />;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'filled',
      size = 'md',
      loading = false,
      loadingIndicator = defaultLoadingIndicator,
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
          <span className={styles.loader}>{loadingIndicator}</span>
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
