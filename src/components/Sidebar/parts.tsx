// Figma: https://www.figma.com/design/3JvbUyTqbbPL8cCpwSX0j4/Origin-design-system?node-id=6144-3042

'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { CentralIcon } from '../Icon';

// Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/**
 * Hook to access sidebar state and controls.
 * Must be used within a Sidebar.Provider.
 */
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within Sidebar.Provider');
  }
  return context;
}

// Provider
export interface ProviderProps {
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Default collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Children */
  children: React.ReactNode;
}

export function Provider({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  children,
}: ProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(value);
      }
      onCollapsedChange?.(value);
    },
    [isControlled, onCollapsedChange]
  );

  const toggle = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  const value = React.useMemo(
    () => ({ collapsed, setCollapsed, toggle }),
    [collapsed, setCollapsed, toggle]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

// Root
export interface RootProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Whether the sidebar is collapsed (icon-only mode).
   * If used without Provider, this controls the collapsed state directly.
   * If used with Provider, this prop is ignored and Provider state is used.
   */
  collapsed?: boolean;
  /** Callback when collapsed state should change (only used without Provider) */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width of the sidebar when expanded. Default: 224px */
  width?: number | string;
  /** Width of the sidebar when collapsed. Default: 52px */
  collapsedWidth?: number | string;
  /** Size of items when collapsed (square). Default: 36px */
  itemSize?: number | string;
}

export const Root = React.forwardRef<HTMLElement, RootProps>(function Root(
  {
    collapsed: collapsedProp = false,
    onCollapsedChange,
    width,
    collapsedWidth,
    itemSize,
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const context = React.useContext(SidebarContext);

  // If no Provider, create internal state
  const [internalCollapsed, setInternalCollapsed] = React.useState(collapsedProp);

  // Sync with prop changes when uncontrolled
  React.useEffect(() => {
    if (!context) {
      setInternalCollapsed(collapsedProp);
    }
  }, [collapsedProp, context]);

  const collapsed = context ? context.collapsed : internalCollapsed;

  const handleCollapsedChange = React.useCallback(
    (value: boolean) => {
      if (!context) {
        setInternalCollapsed(value);
        onCollapsedChange?.(value);
      }
    },
    [context, onCollapsedChange]
  );

  // Build custom properties for sizing
  const customStyles = {
    ...style,
    ...(width !== undefined && { '--sidebar-width': typeof width === 'number' ? `${width}px` : width }),
    ...(collapsedWidth !== undefined && { '--sidebar-width-collapsed': typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth }),
    ...(itemSize !== undefined && { '--sidebar-item-size': typeof itemSize === 'number' ? `${itemSize}px` : itemSize }),
  } as React.CSSProperties;

  // Wrap in provider if not already in one
  const content = (
    <nav
      ref={ref}
      className={clsx(styles.root, className)}
      style={customStyles}
      data-collapsed={collapsed}
      aria-label="Sidebar navigation"
      {...props}
    >
      {children}
    </nav>
  );

  // Memoize implicit provider value for standalone usage
  const implicitValue = React.useMemo(
    () => ({
      collapsed,
      setCollapsed: handleCollapsedChange,
      toggle: () => handleCollapsedChange(!collapsed),
    }),
    [collapsed, handleCollapsedChange]
  );

  if (context) {
    return content;
  }

  // Create implicit provider for standalone usage
  return (
    <SidebarContext.Provider value={implicitValue}>
      {content}
    </SidebarContext.Provider>
  );
});

// Trigger
export interface TriggerProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  /** Icon to show when sidebar is expanded */
  expandedIcon?: React.ReactNode;
  /** Icon to show when sidebar is collapsed */
  collapsedIcon?: React.ReactNode;
  /** Label for accessibility */
  label?: string;
  /** Custom children (overrides icons) */
  children?: React.ReactNode;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(function Trigger(
  { expandedIcon, collapsedIcon, label, className, children, ...props },
  ref
) {
  const { collapsed, toggle } = useSidebar();

  const defaultExpandedIcon = <CentralIcon name="IconChevronLeft" size={20} />;
  const defaultCollapsedIcon = <CentralIcon name="IconChevronRight" size={20} />;

  const icon = collapsed
    ? (collapsedIcon ?? defaultCollapsedIcon)
    : (expandedIcon ?? defaultExpandedIcon);

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(styles.trigger, className)}
      onClick={toggle}
      aria-label={label ?? (collapsed ? 'Expand sidebar' : 'Collapse sidebar')}
      aria-expanded={!collapsed}
      {...props}
    >
      {children ?? icon}
    </button>
  );
});

// Header
export interface HeaderProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx(styles.header, className)} {...props}>
      {children}
    </div>
  );
});

// Content
export interface ContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx(styles.content, className)} {...props}>
      {children}
    </div>
  );
});

// Footer
export interface FooterProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  );
});

// Group
export interface GroupProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(function Group(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx(styles.group, className)} role="group" {...props}>
      {children}
    </div>
  );
});

// Group Header
export interface GroupHeaderProps extends React.ComponentPropsWithoutRef<'div'> {}

export const GroupHeader = React.forwardRef<HTMLDivElement, GroupHeaderProps>(function GroupHeader(
  { className, children, ...props },
  ref
) {
  const { collapsed } = useSidebar();

  if (collapsed) {
    return null;
  }

  return (
    <div ref={ref} className={clsx(styles.groupHeader, className)} role="heading" aria-level={2} {...props}>
      {children}
    </div>
  );
});

// Items container
export interface ItemsProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Items = React.forwardRef<HTMLDivElement, ItemsProps>(function Items(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx(styles.items, className)} role="menu" {...props}>
      {children}
    </div>
  );
});

// Item
export interface ItemProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether the item is currently active/selected */
  active?: boolean;
  /** Trailing content (shortcut, badge, etc.) */
  trailing?: React.ReactNode;
  /** Custom element to render as (for links, etc.) */
  render?: React.ReactElement;
}

export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(function Item(
  { icon, active = false, disabled = false, trailing, render, className, children, ...props },
  ref
) {
  const { collapsed } = useSidebar();

  const itemProps = {
    ref,
    className: clsx(styles.item, className),
    'data-active': active || undefined,
    'data-disabled': disabled || undefined,
    disabled: render ? undefined : disabled,
    role: 'menuitem' as const,
    'aria-current': active ? ('page' as const) : undefined,
    ...props,
  };

  const content = (
    <>
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      {!collapsed && <span className={styles.itemLabel}>{children}</span>}
      {!collapsed && trailing && <span className={styles.itemTrailing}>{trailing}</span>}
    </>
  );

  if (render) {
    return React.cloneElement(render, itemProps, content);
  }

  return (
    <button type="button" {...itemProps}>
      {content}
    </button>
  );
});

// Expandable Item (with submenu)
export interface ExpandableItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Label text */
  label: string;
  /** Whether the item is currently active/selected */
  active?: boolean;
  /** Whether the submenu is open */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Submenu variant: 'border' shows left border indicator, 'indent' uses simple indentation */
  submenuVariant?: 'border' | 'indent';
}

export const ExpandableItem = React.forwardRef<HTMLDivElement, ExpandableItemProps>(
  function ExpandableItem(
    {
      icon,
      label,
      active = false,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      submenuVariant = 'border',
      className,
      children,
      ...props
    },
    ref
  ) {
    const { collapsed } = useSidebar();
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Generate unique ID for accessibility (SSR-safe)
    const submenuId = React.useId();

    const handleToggle = () => {
      if (disabled || collapsed) return;
      const newOpen = !isOpen;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    // Don't render submenu in collapsed mode
    const showSubmenu = !collapsed && isOpen;

    return (
      <div ref={ref} className={clsx(styles.expandableItem, className)} {...props}>
        <button
          type="button"
          className={styles.item}
          data-active={active || undefined}
          data-disabled={disabled || undefined}
          disabled={disabled}
          onClick={handleToggle}
          role="menuitem"
          aria-expanded={collapsed ? undefined : isOpen}
          aria-controls={collapsed ? undefined : submenuId}
          aria-haspopup={collapsed ? undefined : 'menu'}
        >
          {icon && <span className={styles.itemIcon}>{icon}</span>}
          {!collapsed && <span className={styles.itemLabel}>{label}</span>}
          {!collapsed && (
            <span className={styles.chevron} data-open={isOpen}>
              <CentralIcon name="IconChevronDownSmall" size={20} />
            </span>
          )}
        </button>
        {showSubmenu && (
          <div id={submenuId} className={styles.submenu} data-variant={submenuVariant} role="menu">
            {children}
          </div>
        )}
      </div>
    );
  }
);

// Submenu Item
export interface SubmenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether the item is currently active/selected */
  active?: boolean;
  /** Custom element to render as (for links, etc.) */
  render?: React.ReactElement;
}

export const SubmenuItem = React.forwardRef<HTMLButtonElement, SubmenuItemProps>(
  function SubmenuItem({ icon, active = false, disabled = false, render, className, children, ...props }, ref) {
    const itemProps = {
      ref,
      className: clsx(styles.submenuItem, className),
      'data-active': active || undefined,
      'data-disabled': disabled || undefined,
      disabled: render ? undefined : disabled,
      role: 'menuitem' as const,
      'aria-current': active ? ('page' as const) : undefined,
      ...props,
    };

    const content = (
      <>
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
      </>
    );

    if (render) {
      return React.cloneElement(render, itemProps, content);
    }

    return (
      <button type="button" {...itemProps}>
        {content}
      </button>
    );
  }
);

// Drilldown Item (navigates to another view)
export interface DrilldownItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether the item is currently active/selected */
  active?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Callback when the drilldown button is clicked */
  onDrilldown?: () => void;
  /** Callback when the main item area is clicked */
  onClick?: () => void;
  /** Accessible label for the drilldown button */
  drilldownLabel?: string;
}

export const DrilldownItem = React.forwardRef<HTMLDivElement, DrilldownItemProps>(
  function DrilldownItem(
    { icon, active = false, disabled = false, onDrilldown, onClick, drilldownLabel, className, children, ...props },
    ref
  ) {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={clsx(styles.drilldownItem, className)}
        data-active={active || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        <button
          type="button"
          className={styles.drilldownMain}
          disabled={disabled}
          onClick={onClick}
          role="menuitem"
          aria-current={active ? 'page' : undefined}
        >
          {icon && <span className={styles.itemIcon}>{icon}</span>}
          {!collapsed && <span className={styles.itemLabel}>{children}</span>}
        </button>
        {!collapsed && (
          <button
            type="button"
            className={styles.drilldownButton}
            disabled={disabled}
            onClick={onDrilldown}
            aria-label={drilldownLabel ?? 'Navigate'}
          >
            <CentralIcon name="IconChevronRightSmall" size={16} />
          </button>
        )}
      </div>
    );
  }
);

// Tree Item (expandable with horizontal chevron)
export interface TreeItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Label text */
  label: string;
  /** Whether the item is currently active/selected */
  active?: boolean;
  /** Whether the tree is open/expanded */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  function TreeItem(
    {
      icon,
      label,
      active = false,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const { collapsed } = useSidebar();
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Generate unique ID for accessibility (SSR-safe)
    const treeId = React.useId();

    const handleToggle = () => {
      if (disabled || collapsed) return;
      const newOpen = !isOpen;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    // Don't render children in collapsed mode
    const showChildren = !collapsed && isOpen;

    return (
      <div ref={ref} className={clsx(styles.treeItem, className)} {...props}>
        <button
          type="button"
          className={styles.treeItemButton}
          data-active={active || undefined}
          data-disabled={disabled || undefined}
          disabled={disabled}
          onClick={handleToggle}
          role="menuitem"
          aria-expanded={collapsed ? undefined : isOpen}
          aria-controls={collapsed ? undefined : treeId}
        >
          {!collapsed && (
            <span className={styles.treeChevron} data-open={isOpen}>
              <CentralIcon name="IconChevronRightSmall" size={20} />
            </span>
          )}
          {icon && <span className={styles.itemIcon}>{icon}</span>}
          {!collapsed && <span className={styles.itemLabel}>{label}</span>}
        </button>
        {showChildren && (
          <div id={treeId} className={styles.treeChildren} role="group">
            {children}
          </div>
        )}
      </div>
    );
  }
);

// Separator
export interface SeparatorProps extends React.ComponentPropsWithoutRef<'hr'> {}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(function Separator(
  { className, ...props },
  ref
) {
  return <hr ref={ref} className={clsx(styles.separator, className)} role="separator" {...props} />;
});

// Display names
if (process.env.NODE_ENV !== 'production') {
  Provider.displayName = 'Sidebar.Provider';
  Root.displayName = 'Sidebar.Root';
  Trigger.displayName = 'Sidebar.Trigger';
  Header.displayName = 'Sidebar.Header';
  Content.displayName = 'Sidebar.Content';
  Footer.displayName = 'Sidebar.Footer';
  Group.displayName = 'Sidebar.Group';
  GroupHeader.displayName = 'Sidebar.GroupHeader';
  Items.displayName = 'Sidebar.Items';
  Item.displayName = 'Sidebar.Item';
  ExpandableItem.displayName = 'Sidebar.ExpandableItem';
  SubmenuItem.displayName = 'Sidebar.SubmenuItem';
  DrilldownItem.displayName = 'Sidebar.DrilldownItem';
  TreeItem.displayName = 'Sidebar.TreeItem';
  Separator.displayName = 'Sidebar.Separator';
}
