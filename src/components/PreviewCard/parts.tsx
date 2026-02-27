'use client';

import * as React from 'react';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import clsx from 'clsx';
import { useTrackedOpenChange } from '../Analytics/useTrackedOpenChange';
import styles from './PreviewCard.module.scss';

export interface RootProps extends BasePreviewCard.Root.Props {
  analyticsName?: string;
}

export function Root({ analyticsName, onOpenChange, ...props }: RootProps) {
  const trackedOpenChange = useTrackedOpenChange(analyticsName, 'PreviewCard', onOpenChange);
  return <BasePreviewCard.Root onOpenChange={trackedOpenChange} {...props} />;
}

export interface TriggerProps extends BasePreviewCard.Trigger.Props {}

export const Trigger = React.forwardRef<HTMLAnchorElement, TriggerProps>(
  function Trigger(props, ref) {
    return <BasePreviewCard.Trigger ref={ref} {...props} />;
  },
);

export interface PortalProps extends BasePreviewCard.Portal.Props {}

export function Portal(props: PortalProps) {
  return <BasePreviewCard.Portal {...props} />;
}

export interface PositionerProps extends BasePreviewCard.Positioner.Props {}

export const Positioner = React.forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner({ className, sideOffset = 8, ...props }, ref) {
    return (
      <BasePreviewCard.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        sideOffset={sideOffset}
        {...props}
      />
    );
  },
);

export interface PopupProps extends BasePreviewCard.Popup.Props {}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function Popup({ className, ...props }, ref) {
    return (
      <BasePreviewCard.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        {...props}
      />
    );
  },
);

export interface ArrowProps extends BasePreviewCard.Arrow.Props {}

export const Arrow = React.forwardRef<HTMLDivElement, ArrowProps>(
  function Arrow({ className, ...props }, ref) {
    return (
      <BasePreviewCard.Arrow
        ref={ref}
        className={clsx(styles.arrow, className)}
        {...props}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Root.displayName = 'PreviewCard.Root';
  Trigger.displayName = 'PreviewCard.Trigger';
  Portal.displayName = 'PreviewCard.Portal';
  Positioner.displayName = 'PreviewCard.Positioner';
  Popup.displayName = 'PreviewCard.Popup';
  Arrow.displayName = 'PreviewCard.Arrow';
}
