'use client';

import * as React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/Button';
import { CentralIcon } from '@/components/Icon';
import styles from './Pagination.module.scss';

// ============================================================================
// Context
// ============================================================================

interface PaginationContextValue {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const PaginationContext = React.createContext<PaginationContextValue | undefined>(
  undefined
);

function usePaginationContext() {
  const context = React.useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('Pagination parts must be placed within <Pagination.Root>.');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface PaginationRootProps extends React.ComponentPropsWithoutRef<'nav'> {
  /** Current page number (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  children?: React.ReactNode;
}

const PaginationRoot = React.forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot(props, forwardedRef) {
    const { page, totalPages, onPageChange, className, children, ...elementProps } =
      props;

    const contextValue = React.useMemo(
      () => ({ page, totalPages, onPageChange }),
      [page, totalPages, onPageChange]
    );

    return (
      <PaginationContext.Provider value={contextValue}>
        <nav
          ref={forwardedRef}
          aria-label="Pagination"
          className={clsx(styles.root, className)}
          {...elementProps}
        >
          {children}
        </nav>
      </PaginationContext.Provider>
    );
  }
);

// ============================================================================
// Previous Button
// ============================================================================

export interface PaginationPreviousProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  /** Custom label (default: "Previous") */
  label?: string;
}

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  function PaginationPrevious(props, forwardedRef) {
    const { label = 'Previous', className, onClick, ...elementProps } = props;
    const { page, onPageChange } = usePaginationContext();

    const isDisabled = page <= 1;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && onPageChange) {
        onPageChange(page - 1);
      }
    };

    return (
      <Button
        ref={forwardedRef}
        variant="ghost"
        size="compact"
        disabled={isDisabled}
        onClick={handleClick}
        className={clsx(styles.navButton, className)}
        leadingIcon={<CentralIcon name="IconChevronLeftSmall" size={12} />}
        {...elementProps}
      >
        {label}
      </Button>
    );
  }
);

// ============================================================================
// Next Button
// ============================================================================

export interface PaginationNextProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  /** Custom label (default: "Next") */
  label?: string;
}

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  function PaginationNext(props, forwardedRef) {
    const { label = 'Next', className, onClick, ...elementProps } = props;
    const { page, totalPages, onPageChange } = usePaginationContext();

    const isDisabled = page >= totalPages;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && onPageChange) {
        onPageChange(page + 1);
      }
    };

    return (
      <Button
        ref={forwardedRef}
        variant="ghost"
        size="compact"
        disabled={isDisabled}
        onClick={handleClick}
        className={clsx(styles.navButton, className)}
        trailingIcon={<CentralIcon name="IconChevronRightSmall" size={12} />}
        {...elementProps}
      >
        {label}
      </Button>
    );
  }
);

// ============================================================================
// Item (Page Number Button)
// ============================================================================

export interface PaginationItemProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  /** Page number this item represents */
  pageNumber: number;
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  function PaginationItem(props, forwardedRef) {
    const { pageNumber, className, onClick, ...elementProps } = props;
    const { page, onPageChange } = usePaginationContext();

    const isSelected = page === pageNumber;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && onPageChange && !isSelected) {
        onPageChange(pageNumber);
      }
    };

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={`Page ${pageNumber}`}
        aria-current={isSelected ? 'page' : undefined}
        data-selected={isSelected || undefined}
        onClick={handleClick}
        className={clsx(styles.item, className)}
        {...elementProps}
      >
        {pageNumber}
      </button>
    );
  }
);

// ============================================================================
// Ellipsis
// ============================================================================

export interface PaginationEllipsisProps
  extends React.ComponentPropsWithoutRef<'span'> {}

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  function PaginationEllipsis(props, forwardedRef) {
    const { className, ...elementProps } = props;

    return (
      <span
        ref={forwardedRef}
        aria-hidden="true"
        className={clsx(styles.ellipsis, className)}
        {...elementProps}
      >
        <CentralIcon name="IconDotGrid1x3Horizontal" size={16} />
      </span>
    );
  }
);

// ============================================================================
// Items (Auto-generated page numbers with ellipsis)
// ============================================================================

export interface PaginationItemsProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Number of siblings to show around current page */
  siblingCount?: number;
}

const PaginationItems = React.forwardRef<HTMLDivElement, PaginationItemsProps>(
  function PaginationItems(props, forwardedRef) {
    const { siblingCount = 1, className, ...elementProps } = props;
    const { page, totalPages } = usePaginationContext();

    const range = React.useMemo(() => {
      return generatePaginationRange(page, totalPages, siblingCount);
    }, [page, totalPages, siblingCount]);

    return (
      <div
        ref={forwardedRef}
        className={clsx(styles.items, className)}
        {...elementProps}
      >
        {range.map((item, index) => {
          if (item === 'ellipsis') {
            return <PaginationEllipsis key={`ellipsis-${index}`} />;
          }
          return <PaginationItem key={item} pageNumber={item} />;
        })}
      </div>
    );
  }
);

// ============================================================================
// Utility: Generate pagination range
// ============================================================================

type PaginationRangeItem = number | 'ellipsis';

function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): PaginationRangeItem[] {
  // Total items = first + last + current + siblings + 2 ellipses
  const totalPageNumbers = siblingCount * 2 + 5;

  // Case 1: Total pages fit without ellipsis
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  // Case 2: No left ellipsis, show right ellipsis
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  // Case 3: Show left ellipsis, no right ellipsis
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'ellipsis', ...rightRange];
  }

  // Case 4: Show both ellipses
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

// ============================================================================
// Exports
// ============================================================================

export const Pagination = {
  Root: PaginationRoot,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Item: PaginationItem,
  Items: PaginationItems,
  Ellipsis: PaginationEllipsis,
};

export default Pagination;
