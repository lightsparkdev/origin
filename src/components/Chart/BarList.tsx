'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss';

export interface BarListItem {
  /** Row label (e.g., "/pricing", "US"). */
  name: string;
  /** Numeric value that determines bar width proportionally. */
  value: number;
  /** Optional secondary value displayed after the bar (e.g., "0.34s"). */
  displayValue?: string;
  /** Optional bar color override. */
  color?: string;
  /** Optional href — makes the name a link. */
  href?: string;
}

export interface BarListProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Array of items to render as ranked bars. */
  data: BarListItem[];
  /** Bar fill color. Applies to all bars unless overridden per item. */
  color?: string;
  /** Format the numeric value for display. Used when `displayValue` is not set. */
  formatValue?: (value: number) => string;
  /** Called when a row is clicked. */
  onClickItem?: (item: BarListItem, index: number) => void;
  /** Show loading skeleton. */
  loading?: boolean;
  /** Content when data is empty. */
  empty?: React.ReactNode;
}

export const BarList = React.forwardRef<HTMLDivElement, BarListProps>(
  function BarList(
    {
      data,
      color = 'var(--surface-secondary)',
      formatValue,
      onClickItem,
      loading,
      empty,
      className,
      ...props
    },
    ref,
  ) {
    if (loading) {
      return (
        <div ref={ref} className={clsx(styles.barList, className)} {...props}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.barListRow}>
              <div className={styles.barListSkeleton} style={{ width: `${90 - i * 20}%` }} />
            </div>
          ))}
        </div>
      );
    }

    if (data.length === 0 && empty !== undefined) {
      return (
        <div ref={ref} className={clsx(styles.barList, className)} {...props}>
          <div className={styles.barListEmpty}>
            {typeof empty === 'boolean' ? 'No data' : empty}
          </div>
        </div>
      );
    }

    const maxValue = Math.max(...data.map((d) => d.value), 1);

    return (
      <div
        ref={ref}
        className={clsx(styles.barList, className)}
        role="list"
        {...props}
      >
        {data.map((item, i) => {
          const pct = (item.value / maxValue) * 100;
          const barColor = item.color ?? color;
          const clickable = Boolean(onClickItem || item.href);
          const fmtVal = item.displayValue ?? (formatValue ? formatValue(item.value) : String(item.value));

          const row = (
            <div
              key={i}
              className={clsx(styles.barListRow, clickable && styles.barListRowClickable)}
              role={clickable ? 'button' : 'listitem'}
              tabIndex={clickable ? 0 : undefined}
              onClick={onClickItem ? () => onClickItem(item, i) : undefined}
              onKeyDown={onClickItem ? (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClickItem(item, i); }
              } : undefined}
            >
              <div className={styles.barListBar} style={{ width: `${pct}%`, backgroundColor: barColor }} />
              <div className={styles.barListContent}>
                <span className={styles.barListName}>
                  {item.href ? (
                    <a href={item.href} className={styles.barListLink}>{item.name}</a>
                  ) : (
                    item.name
                  )}
                </span>
                <span className={styles.barListValue}>{fmtVal}</span>
              </div>
            </div>
          );

          return row;
        })}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  BarList.displayName = 'Chart.BarList';
}
