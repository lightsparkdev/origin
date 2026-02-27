'use client';

import * as React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { CentralIcon } from '../Icon';
import { useTrackedCallback } from '../Analytics/useTrackedCallback';
import clsx from 'clsx';
import styles from './Collapsible.module.scss';

export interface RootProps extends BaseCollapsible.Root.Props {
  analyticsName?: string;
}

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  function Root({ className, analyticsName, onOpenChange, ...props }, ref) {
    const trackedChange = useTrackedCallback(
      analyticsName,
      'Collapsible',
      'change',
      onOpenChange,
      (open: unknown) => ({ open }),
    );

    return (
      <BaseCollapsible.Root
        ref={ref}
        className={clsx(styles.root, className)}
        onOpenChange={trackedChange}
        {...props}
      />
    );
  }
);

export interface TriggerProps extends BaseCollapsible.Trigger.Props {
  hideIcon?: boolean;
  icon?: React.ReactNode;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger({ className, children, hideIcon, icon, ...props }, ref) {
    return (
      <BaseCollapsible.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        {...props}
      >
        <span className={styles.label}>{children}</span>
        {!hideIcon && (
          <span className={styles.icon}>
            {icon ?? <CentralIcon name="IconChevronDownSmall" size={24} />}
          </span>
        )}
      </BaseCollapsible.Trigger>
    );
  }
);

export interface PanelProps extends BaseCollapsible.Panel.Props {}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  function Panel({ className, children, ...props }, ref) {
    return (
      <BaseCollapsible.Panel
        ref={ref}
        className={clsx(styles.panel, className)}
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </BaseCollapsible.Panel>
    );
  }
);
