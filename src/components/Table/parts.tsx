'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';
import { CentralIcon } from '../Icon';

// ============================================================================
// Root
// ============================================================================

export interface RootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Whether any rows are selected (shows all checkboxes when true) */
  hasSelection?: boolean;
}

export const Root = React.forwardRef<HTMLTableElement, RootProps>(
  function Root({ className, hasSelection, ...props }, ref) {
    return (
      <table
        ref={ref}
        className={clsx(styles.root, className)}
        data-has-selection={hasSelection || undefined}
        {...props}
      />
    );
  }
);

// ============================================================================
// Header
// ============================================================================

export interface HeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Header = React.forwardRef<HTMLTableSectionElement, HeaderProps>(
  function Header({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
      />
    );
  }
);

// ============================================================================
// HeaderRow
// ============================================================================

export interface HeaderRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const HeaderRow = React.forwardRef<HTMLTableRowElement, HeaderRowProps>(
  function HeaderRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={clsx(styles.headerRow, className)}
        {...props}
      />
    );
  }
);

// ============================================================================
// HeaderCell
// ============================================================================

export interface HeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Cell variant */
  variant?: 'default' | 'checkbox';
  /** Text alignment */
  align?: 'left' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | false;
  /** Sort click handler */
  onSort?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** Whether column is resizable */
  resizable?: boolean;
}

export const HeaderCell = React.forwardRef<HTMLTableCellElement, HeaderCellProps>(
  function HeaderCell(
    {
      className,
      variant = 'default',
      align = 'left',
      sortable = false,
      sortDirection,
      onSort,
      resizable = false,
      children,
      ...props
    },
    ref
  ) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (sortable && onSort && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onSort(event);
      }
    };

    return (
      <th
        ref={ref}
        className={clsx(
          styles.headerCell,
          styles[`headerCell--${variant}`],
          styles[`headerCell--${align}`],
          sortable && styles['headerCell--sortable'],
          resizable && styles['headerCell--resizable'],
          className
        )}
        data-align={align}
        data-sortable={sortable || undefined}
        data-sorted={sortDirection || undefined}
        tabIndex={sortable ? 0 : undefined}
        onClick={sortable ? onSort : undefined}
        onKeyDown={sortable ? handleKeyDown : undefined}
        role={sortable ? 'button' : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
            ? 'descending'
            : undefined
        }
        {...props}
      >
        <span className={styles.headerCellContent}>
          {sortable && align === 'right' && (
            <span className={styles.sortIcon} aria-hidden="true">
              {sortDirection === 'asc' ? (
                <CentralIcon name="IconChevronTopSmall" size={12} />
              ) : sortDirection === 'desc' ? (
                <CentralIcon name="IconChevronDownSmall" size={12} />
              ) : (
                <CentralIcon name="IconChevronGrabberVertical" size={12} />
              )}
            </span>
          )}
          {children}
          {sortable && align !== 'right' && (
            <span className={styles.sortIcon} aria-hidden="true">
              {sortDirection === 'asc' ? (
                <CentralIcon name="IconChevronTopSmall" size={12} />
              ) : sortDirection === 'desc' ? (
                <CentralIcon name="IconChevronDownSmall" size={12} />
              ) : (
                <CentralIcon name="IconChevronGrabberVertical" size={12} />
              )}
            </span>
          )}
        </span>
      </th>
    );
  }
);

// ============================================================================
// Body
// ============================================================================

export interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Body = React.forwardRef<HTMLTableSectionElement, BodyProps>(
  function Body({ className, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
      />
    );
  }
);

// ============================================================================
// Row
// ============================================================================

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Whether row is selected */
  selected?: boolean;
  /** Whether row is the last row (no bottom border) */
  last?: boolean;
}

export const Row = React.forwardRef<HTMLTableRowElement, RowProps>(
  function Row({ className, selected = false, last = false, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={clsx(
          styles.row,
          selected && styles.rowSelected,
          last && styles['row--last'],
          className
        )}
        data-selected={selected || undefined}
        {...props}
      />
    );
  }
);

// ============================================================================
// Cell
// ============================================================================

export interface CellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Cell variant */
  variant?: 'default' | 'checkbox' | 'action';
  /** Text alignment */
  align?: 'left' | 'right';
  /** Whether cell is in loading state */
  loading?: boolean;
}

export const Cell = React.forwardRef<HTMLTableCellElement, CellProps>(
  function Cell(
    {
      className,
      variant = 'default',
      align = 'left',
      loading = false,
      children,
      ...props
    },
    ref
  ) {
    return (
      <td
        ref={ref}
        className={clsx(
          styles.cell,
          styles[`cell--${variant}`],
          styles[`cell--${align}`],
          loading && styles['cell--loading'],
          className
        )}
        data-align={align}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className={styles.skeleton} />
        ) : (
          children
        )}
      </td>
    );
  }
);

// ============================================================================
// CellContent - helper for label + description pattern
// ============================================================================

export interface CellContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary label text */
  label: React.ReactNode;
  /** Secondary description text */
  description?: React.ReactNode;
  /** Optional indicator dot */
  indicator?: boolean;
  /** Optional badge content */
  badge?: React.ReactNode;
}

export const CellContent = React.forwardRef<HTMLDivElement, CellContentProps>(
  function CellContent(
    { className, label, description, indicator = false, badge, ...props },
    ref
  ) {
    return (
      <div ref={ref} className={clsx(styles.cellContent, className)} {...props}>
        <span className={styles.cellLabel}>
          {label}
          {indicator && <span className={styles.cellIndicator} />}
          {badge}
        </span>
        {description && (
          <span className={styles.cellDescription}>{description}</span>
        )}
      </div>
    );
  }
);

// ============================================================================
// ResizeHandle
// ============================================================================

export interface ResizeHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether currently resizing */
  isResizing?: boolean;
}

export const ResizeHandle = React.forwardRef<HTMLDivElement, ResizeHandleProps>(
  function ResizeHandle({ className, isResizing = false, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.resizeHandle,
          isResizing && styles['resizeHandle--active'],
          className
        )}
        data-resizing={isResizing || undefined}
        {...props}
      />
    );
  }
);

// ============================================================================
// CheckboxWrapper (show on hover or when selected)
// ============================================================================

export interface CheckboxWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CheckboxWrapper = React.forwardRef<HTMLSpanElement, CheckboxWrapperProps>(
  function CheckboxWrapper({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={clsx(styles.checkboxWrapper, className)}
        {...props}
      />
    );
  }
);

// ============================================================================
// Namespace Export
// ============================================================================

export const Table = {
  Root,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  CellContent,
  ResizeHandle,
  CheckboxWrapper,
};
