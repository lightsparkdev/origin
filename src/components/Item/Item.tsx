'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Item.module.scss';

export interface ItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Main text content */
  title: string;
  /** Secondary text below title */
  description?: string;
  /** Slot for leading content (icon, avatar) */
  leading?: React.ReactNode;
  /** Slot for trailing content (buttons, switch, chevron, checkmark) */
  trailing?: React.ReactNode;
  /** Whether the item has hover/focus states (default: true) */
  clickable?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom element to render as */
  render?: React.ReactElement;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  function Item(props, forwardedRef) {
    const {
      title,
      description,
      leading,
      trailing,
      clickable = true,
      selected,
      disabled,
      onClick,
      render,
      className,
      ...elementProps
    } = props;

    const isInteractive = clickable && !disabled;

    const handleClick = (event: React.MouseEvent) => {
      if (disabled) return;
      onClick?.(event as React.MouseEvent<HTMLDivElement>);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    const itemProps = {
      ref: forwardedRef,
      className: clsx(styles.root, clickable && styles.clickable, className),
      'data-clickable': clickable ? undefined : 'false',
      'data-selected': selected || undefined,
      'data-disabled': disabled || undefined,
      onClick: isInteractive && onClick ? handleClick : undefined,
      onKeyDown: isInteractive && onClick ? handleKeyDown : undefined,
      tabIndex: isInteractive && onClick ? 0 : undefined,
      role: isInteractive && onClick ? 'button' : undefined,
      ...elementProps,
    };

    const content = (
      <>
        {leading && <div className={styles.leading}>{leading}</div>}
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </>
    );

    if (render) {
      return React.cloneElement(render, itemProps, content);
    }

    return <div {...itemProps}>{content}</div>;
  }
);

if (process.env.NODE_ENV !== 'production') {
  Item.displayName = 'Item';
}
