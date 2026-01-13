'use client';

import * as React from 'react';
import clsx from 'clsx';
import { CentralIcon } from '@/components/Icon';
import styles from './Breadcrumb.module.scss';

// ============================================================================
// Context
// ============================================================================

interface BreadcrumbContextValue {
  separator: React.ReactNode;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbContext.displayName = 'BreadcrumbContext';
}

function useBreadcrumbContext() {
  const context = React.useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error(
      'Breadcrumb parts must be placed within <Breadcrumb.Root>.'
    );
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface BreadcrumbRootProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * The children of the breadcrumb.
   */
  children?: React.ReactNode;
}

/**
 * The root navigation element for breadcrumbs.
 * Renders a `<nav>` element with aria-label="Breadcrumb".
 */
export const BreadcrumbRoot = React.forwardRef<HTMLElement, BreadcrumbRootProps>(
  function BreadcrumbRoot(props, forwardedRef) {
    const { className, children, ...elementProps } = props;

    return (
      <nav
        ref={forwardedRef}
        aria-label="Breadcrumb"
        className={clsx(styles.root, className)}
        {...elementProps}
      >
        {children}
      </nav>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbRoot.displayName = 'BreadcrumbRoot';
}

// ============================================================================
// List
// ============================================================================

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<'ol'> {
  /**
   * Custom separator between items. Defaults to chevron icon.
   * Can be a string like "/" or a React node.
   */
  separator?: React.ReactNode;
}

/**
 * The ordered list container for breadcrumb items.
 * Renders an `<ol>` element.
 */
export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList(props, forwardedRef) {
    const { className, children, separator, ...elementProps } = props;

    const contextValue: BreadcrumbContextValue = React.useMemo(
      () => ({ separator }),
      [separator]
    );

    return (
      <BreadcrumbContext.Provider value={contextValue}>
        <ol
          ref={forwardedRef}
          className={clsx(styles.list, className)}
          {...elementProps}
        >
          {children}
        </ol>
      </BreadcrumbContext.Provider>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbList.displayName = 'BreadcrumbList';
}

// ============================================================================
// Item
// ============================================================================

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {
  /**
   * The children of the breadcrumb item.
   */
  children?: React.ReactNode;
}

/**
 * A single breadcrumb item in the list.
 * Renders an `<li>` element.
 */
export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem(props, forwardedRef) {
    const { className, children, ...elementProps } = props;
    const { separator } = useBreadcrumbContext();

    return (
      <li
        ref={forwardedRef}
        className={clsx(styles.item, className)}
        {...elementProps}
      >
        {children}
        <span className={styles.separator} aria-hidden="true">
          {separator ?? <CentralIcon name="IconChevronRightSmall" size={20} />}
        </span>
      </li>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbItem.displayName = 'BreadcrumbItem';
}

// ============================================================================
// Link
// ============================================================================

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * The href for the link.
   */
  href: string;
}

/**
 * A link within a breadcrumb item for navigation.
 * Renders an `<a>` element.
 */
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink(props, forwardedRef) {
    const { className, children, ...elementProps } = props;

    return (
      <a
        ref={forwardedRef}
        className={clsx(styles.link, className)}
        {...elementProps}
      >
        {children}
      </a>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbLink.displayName = 'BreadcrumbLink';
}

// ============================================================================
// Page (Current)
// ============================================================================

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * The children of the current page indicator.
   */
  children?: React.ReactNode;
}

/**
 * The current page indicator. Not a link since you're already on this page.
 * Renders a `<span>` element with aria-current="page".
 */
export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage(props, forwardedRef) {
    const { className, children, ...elementProps } = props;

    return (
      <span
        ref={forwardedRef}
        role="link"
        aria-current="page"
        aria-disabled="true"
        data-current
        className={clsx(styles.page, className)}
        {...elementProps}
      >
        {children}
      </span>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbPage.displayName = 'BreadcrumbPage';
}

// ============================================================================
// Ellipsis
// ============================================================================

export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * Callback when ellipsis is clicked to expand collapsed items.
   */
  onExpand?: () => void;
}

/**
 * An ellipsis button for collapsed breadcrumb items.
 * Renders a `<button>` element.
 */
export const BreadcrumbEllipsis = React.forwardRef<HTMLButtonElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis(props, forwardedRef) {
    const { className, onExpand, onClick, ...elementProps } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onExpand?.();
    };

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label="Show more breadcrumbs"
        className={clsx(styles.ellipsis, className)}
        onClick={handleClick}
        {...elementProps}
      >
        <CentralIcon name="IconDotGrid1x3Horizontal" size={16} />
      </button>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
}

// ============================================================================
// Separator (explicit, if needed)
// ============================================================================

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * The separator content.
   */
  children?: React.ReactNode;
}

/**
 * An explicit separator element. Usually not needed as separators are CSS-based.
 * Renders a `<span>` element with aria-hidden="true".
 */
export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator(props, forwardedRef) {
    const { className, children, ...elementProps } = props;

    return (
      <span
        ref={forwardedRef}
        role="presentation"
        aria-hidden="true"
        className={clsx(styles.separator, className)}
        {...elementProps}
      >
        {children ?? <CentralIcon name="IconChevronRightSmall" size={20} />}
      </span>
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}
