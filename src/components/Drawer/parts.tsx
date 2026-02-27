'use client';

import * as React from 'react';
// DrawerPreview is renamed to Drawer when it exits Base UI preview.
import { DrawerPreview as BaseDrawer } from '@base-ui/react/drawer';
import clsx from 'clsx';
import { useTrackedOpenChange } from '../Analytics/useTrackedOpenChange';
import styles from './Drawer.module.scss';

// Provider
export interface ProviderProps extends BaseDrawer.Provider.Props {}

export function Provider(props: ProviderProps) {
  return <BaseDrawer.Provider {...props} />;
}

// Root
export interface RootProps extends BaseDrawer.Root.Props {
  analyticsName?: string;
}

export function Root({ analyticsName, onOpenChange, ...props }: RootProps) {
  const trackedOpenChange = useTrackedOpenChange(analyticsName, 'Drawer', onOpenChange);
  return <BaseDrawer.Root onOpenChange={trackedOpenChange} {...props} />;
}

// Trigger
export interface TriggerProps extends BaseDrawer.Trigger.Props {}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger(props, ref) {
    return <BaseDrawer.Trigger ref={ref} {...props} />;
  },
);

// Portal
export interface PortalProps extends BaseDrawer.Portal.Props {}

export function Portal(props: PortalProps) {
  return <BaseDrawer.Portal {...props} />;
}

// Backdrop
export interface BackdropProps extends BaseDrawer.Backdrop.Props {}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  function Backdrop({ className, ...props }, ref) {
    return (
      <BaseDrawer.Backdrop
        ref={ref}
        className={clsx(styles.backdrop, className)}
        {...props}
      />
    );
  },
);

// Viewport
export interface ViewportProps extends BaseDrawer.Viewport.Props {}

export const Viewport = React.forwardRef<HTMLDivElement, ViewportProps>(
  function Viewport({ className, ...props }, ref) {
    return (
      <BaseDrawer.Viewport
        ref={ref}
        className={clsx(styles.viewport, className)}
        {...props}
      />
    );
  },
);

// Popup
export interface PopupProps extends BaseDrawer.Popup.Props {}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function Popup({ className, ...props }, ref) {
    return (
      <BaseDrawer.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        {...props}
      />
    );
  },
);

// Content
export interface ContentProps extends BaseDrawer.Content.Props {}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  function Content({ className, ...props }, ref) {
    return (
      <BaseDrawer.Content
        ref={ref}
        className={clsx(styles.content, className)}
        {...props}
      />
    );
  },
);

// Title
export interface TitleProps extends BaseDrawer.Title.Props {}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  function Title({ className, ...props }, ref) {
    return (
      <BaseDrawer.Title
        ref={ref}
        className={clsx(styles.title, className)}
        {...props}
      />
    );
  },
);

// Description
export interface DescriptionProps extends BaseDrawer.Description.Props {}

export const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  function Description({ className, ...props }, ref) {
    return (
      <BaseDrawer.Description
        ref={ref}
        className={clsx(styles.description, className)}
        {...props}
      />
    );
  },
);

// Close
export interface CloseProps extends BaseDrawer.Close.Props {}

export const Close = React.forwardRef<HTMLButtonElement, CloseProps>(
  function Close(props, ref) {
    return <BaseDrawer.Close ref={ref} {...props} />;
  },
);

// Indent
export interface IndentProps extends BaseDrawer.Indent.Props {}

export const Indent = React.forwardRef<HTMLDivElement, IndentProps>(
  function Indent({ className, ...props }, ref) {
    return (
      <BaseDrawer.Indent
        ref={ref}
        className={clsx(styles.indent, className)}
        {...props}
      />
    );
  },
);

// IndentBackground
export interface IndentBackgroundProps extends BaseDrawer.IndentBackground.Props {}

export const IndentBackground = React.forwardRef<HTMLDivElement, IndentBackgroundProps>(
  function IndentBackground({ className, ...props }, ref) {
    return (
      <BaseDrawer.IndentBackground
        ref={ref}
        className={clsx(styles.indentBackground, className)}
        {...props}
      />
    );
  },
);

// Display names
if (process.env.NODE_ENV !== 'production') {
  Provider.displayName = 'Drawer.Provider';
  Root.displayName = 'Drawer.Root';
  Trigger.displayName = 'Drawer.Trigger';
  Portal.displayName = 'Drawer.Portal';
  Backdrop.displayName = 'Drawer.Backdrop';
  Viewport.displayName = 'Drawer.Viewport';
  Popup.displayName = 'Drawer.Popup';
  Content.displayName = 'Drawer.Content';
  Title.displayName = 'Drawer.Title';
  Description.displayName = 'Drawer.Description';
  Close.displayName = 'Drawer.Close';
  Indent.displayName = 'Drawer.Indent';
  IndentBackground.displayName = 'Drawer.IndentBackground';
}
