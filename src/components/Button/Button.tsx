/**
 * Button Component
 * 
 * Interactive button using Base UI for behavior and accessibility.
 * Styled with tokens from Figma Dev Mode.
 */

'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import { Loader } from '@/components/Loader';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'filled' | 'outline' | 'ghost' | 'critical';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading state */
  loading?: boolean;
  /** Icon to show before the label */
  iconLeft?: React.ReactNode;
  /** Icon to show after the label */
  iconRight?: React.ReactNode;
  /** Render as icon-only button (no label) */
  iconOnly?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

export function Button({
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
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      disabled={isDisabled}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        loading && styles.loading,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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

export default Button;


