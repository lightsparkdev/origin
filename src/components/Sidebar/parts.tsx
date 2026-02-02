'use client';

import * as React from 'react';
import { Collapsible } from '@base-ui/react/collapsible';
import clsx from 'clsx';
import { CentralIcon } from '../Icon';
import { Shortcut } from '../Shortcut';
import styles from './Sidebar.module.scss';

// Root
export interface RootProps extends React.HTMLAttributes<HTMLElement> {}

export const Root = React.forwardRef<HTMLElement, RootProps>(
  function Root({ className, children, ...props }, ref) {
    return (
      <nav
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

// Header
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  function Header({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.header, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Content
export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  function Content({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.content, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Footer
export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  function Footer({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.footer, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Group
export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  function Group({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.group, className)} {...props}>
        {children}
      </div>
    );
  }
);

// GroupHeader
export interface GroupHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GroupHeader = React.forwardRef<HTMLDivElement, GroupHeaderProps>(
  function GroupHeader({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx(styles.groupHeader, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Item (Default variant)
export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Icon slot */
  icon?: React.ReactNode;
  /** Shortcut keys (e.g., ['⌘', 'H']) */
  shortcut?: string[];
  /** Active/selected state */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Item label */
  children: React.ReactNode;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  function Item({ icon, shortcut, active, disabled, className, children, onClick, ...props }, ref) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.item, className)}
        data-active={active || undefined}
        data-disabled={disabled || undefined}
        onClick={onClick ? handleClick : undefined}
        onKeyDown={onClick ? handleKeyDown : undefined}
        tabIndex={disabled ? -1 : 0}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
        {shortcut && <Shortcut keys={shortcut} className={styles.itemShortcut} />}
      </div>
    );
  }
);

// Tree (horizontal chevron, inline expand)
export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Icon slot */
  icon?: React.ReactNode;
  /** Trigger label */
  label: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Panel content variant: indent (default) or border (with vertical line) */
  variant?: 'indent' | 'border';
  /** Nested items */
  children?: React.ReactNode;
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  function Tree(
    { icon, label, open, defaultOpen = false, onOpenChange, disabled, variant = 'indent', className, children, ...props },
    ref
  ) {
    return (
      <Collapsible.Root
        ref={ref}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
        className={clsx(styles.tree, className)}
        {...props}
      >
        <Collapsible.Trigger className={styles.treeTrigger} data-disabled={disabled || undefined}>
          <span className={styles.treeChevron}>
            <CentralIcon name="IconChevronRightSmall" size={20} />
          </span>
          {icon && <span className={styles.itemIcon}>{icon}</span>}
          <span className={styles.itemLabel}>{label}</span>
        </Collapsible.Trigger>
        <Collapsible.Panel className={styles.treePanel} data-sidebar-panel>
          <div className={clsx(styles.treePanelContent, variant === 'border' && styles.treePanelBorder)}>{children}</div>
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  }
);

// Submenu (vertical chevron, inline expand)
export interface SubmenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Icon slot */
  icon?: React.ReactNode;
  /** Trigger label */
  label: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Panel content variant: indent (default) or border (with vertical line) */
  variant?: 'indent' | 'border';
  /** Nested items */
  children?: React.ReactNode;
}

export const Submenu = React.forwardRef<HTMLDivElement, SubmenuProps>(
  function Submenu(
    { icon, label, open, defaultOpen = false, onOpenChange, disabled, variant = 'indent', className, children, ...props },
    ref
  ) {
    return (
      <Collapsible.Root
        ref={ref}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
        className={clsx(styles.submenu, className)}
        {...props}
      >
        <Collapsible.Trigger className={styles.submenuTrigger} data-disabled={disabled || undefined}>
          {icon && <span className={styles.itemIcon}>{icon}</span>}
          <span className={styles.itemLabel}>{label}</span>
          <span className={styles.submenuChevron}>
            <CentralIcon name="IconChevronDownSmall" size={20} />
          </span>
        </Collapsible.Trigger>
        <Collapsible.Panel className={styles.submenuPanel} data-sidebar-panel>
          <div className={clsx(styles.submenuPanelContent, variant === 'border' && styles.submenuPanelBorder)}>{children}</div>
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  }
);

// Drilldown (action button, triggers view change)
export interface DrilldownProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon slot */
  icon?: React.ReactNode;
  /** Trigger label */
  label: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export const Drilldown = React.forwardRef<HTMLButtonElement, DrilldownProps>(
  function Drilldown({ icon, label, disabled, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.drilldown, className)}
        disabled={disabled}
        {...props}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{label}</span>
        <span className={styles.drilldownButton}>
          <CentralIcon name="IconChevronRightSmall" size={20} />
        </span>
      </button>
    );
  }
);

// BackButton (for drilldown navigation)
export interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  function BackButton({ className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.backButton, className)}
        {...props}
      >
        <CentralIcon name="IconChevronLeftSmall" size={20} />
        {children && <span className={styles.backButtonLabel}>{children}</span>}
      </button>
    );
  }
);

// Display names for dev tools
if (process.env.NODE_ENV !== 'production') {
  Root.displayName = 'Sidebar';
  Header.displayName = 'Sidebar.Header';
  Content.displayName = 'Sidebar.Content';
  Footer.displayName = 'Sidebar.Footer';
  Group.displayName = 'Sidebar.Group';
  GroupHeader.displayName = 'Sidebar.GroupHeader';
  Item.displayName = 'Sidebar.Item';
  Tree.displayName = 'Sidebar.Tree';
  Submenu.displayName = 'Sidebar.Submenu';
  Drilldown.displayName = 'Sidebar.Drilldown';
  BackButton.displayName = 'Sidebar.BackButton';
}
