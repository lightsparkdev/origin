'use client';

import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog';
import clsx from 'clsx';
import styles from './AlertDialog.module.scss';

/* ============================================================================
 * Root
 * ============================================================================ */

export interface RootProps extends BaseAlertDialog.Root.Props {}

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  function Root(props, ref) {
    return <BaseAlertDialog.Root ref={ref} {...props} />;
  }
);

/* ============================================================================
 * Trigger
 * ============================================================================ */

export interface TriggerProps extends BaseAlertDialog.Trigger.Props {}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger(props, ref) {
    return <BaseAlertDialog.Trigger ref={ref} {...props} />;
  }
);

/* ============================================================================
 * Portal
 * ============================================================================ */

export interface PortalProps extends BaseAlertDialog.Portal.Props {}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  function Portal(props, ref) {
    return <BaseAlertDialog.Portal ref={ref} {...props} />;
  }
);

/* ============================================================================
 * Backdrop
 * ============================================================================ */

export interface BackdropProps extends BaseAlertDialog.Backdrop.Props {}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  function Backdrop({ className, ...props }, ref) {
    return (
      <BaseAlertDialog.Backdrop
        ref={ref}
        className={clsx(styles.backdrop, className)}
        {...props}
      />
    );
  }
);

/* ============================================================================
 * Popup
 * ============================================================================ */

export interface PopupProps extends BaseAlertDialog.Popup.Props {}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  function Popup({ className, ...props }, ref) {
    return (
      <BaseAlertDialog.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        {...props}
      />
    );
  }
);

/* ============================================================================
 * Title
 * ============================================================================ */

export interface TitleProps extends BaseAlertDialog.Title.Props {}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  function Title({ className, ...props }, ref) {
    return (
      <BaseAlertDialog.Title
        ref={ref}
        className={clsx(styles.title, className)}
        {...props}
      />
    );
  }
);

/* ============================================================================
 * Description
 * ============================================================================ */

export interface DescriptionProps extends BaseAlertDialog.Description.Props {}

export const Description = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  function Description({ className, ...props }, ref) {
    return (
      <BaseAlertDialog.Description
        ref={ref}
        className={clsx(styles.description, className)}
        {...props}
      />
    );
  }
);

/* ============================================================================
 * Close
 * ============================================================================ */

export interface CloseProps extends BaseAlertDialog.Close.Props {}

export const Close = React.forwardRef<HTMLButtonElement, CloseProps>(
  function Close(props, ref) {
    return <BaseAlertDialog.Close ref={ref} {...props} />;
  }
);

/* ============================================================================
 * Actions (layout helper)
 * ============================================================================ */

export interface ActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Actions = React.forwardRef<HTMLDivElement, ActionsProps>(
  function Actions({ className, ...props }, ref) {
    return <div ref={ref} className={clsx(styles.actions, className)} {...props} />;
  }
);

