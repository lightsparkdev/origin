'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './Chart.module.scss';

export interface ActivityCell {
  /** Value determining the cell's color intensity. */
  value: number;
  /** Row label (e.g., day name, hour). */
  row: string;
  /** Column label (e.g., week number, date). */
  col: string;
  /** Optional tooltip label. */
  label?: string;
}

export interface ActivityGridProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Grid cells with value, row, and column identifiers. */
  data: ActivityCell[];
  /** Row labels in display order (e.g., ['Mon', 'Tue', ...] or ['00', '01', ...]). */
  rows: string[];
  /** Column labels in display order (e.g., week numbers, dates). */
  columns: string[];
  /** Cell size in px. */
  cellSize?: number;
  /** Gap between cells in px. */
  cellGap?: number;
  /** Color for the highest value. Shades are derived via opacity. */
  color?: string;
  /** Show row labels on the left. */
  showRowLabels?: boolean;
  /** Show column labels on top. */
  showColumnLabels?: boolean;
  /** Accessible label. */
  ariaLabel?: string;
  /** Called when a cell is hovered. */
  onHover?: (cell: ActivityCell | null) => void;
  /** Called when a cell is clicked. */
  onClickCell?: (cell: ActivityCell) => void;
}

export const ActivityGrid = React.forwardRef<HTMLDivElement, ActivityGridProps>(
  function ActivityGrid(
    {
      data,
      rows,
      columns,
      cellSize = 12,
      cellGap = 2,
      color = 'var(--color-blue-500)',
      showRowLabels = false,
      showColumnLabels = false,
      ariaLabel,
      onHover,
      onClickCell,
      className,
      ...props
    },
    ref,
  ) {
    const [activeKey, setActiveKey] = React.useState<string | null>(null);

    const cellMap = React.useMemo(() => {
      const map = new Map<string, ActivityCell>();
      for (const cell of data) {
        map.set(`${cell.row}:${cell.col}`, cell);
      }
      return map;
    }, [data]);

    const maxValue = React.useMemo(
      () => Math.max(...data.map((d) => d.value), 1),
      [data],
    );

    const handleEnter = React.useCallback(
      (cell: ActivityCell) => {
        setActiveKey(`${cell.row}:${cell.col}`);
        onHover?.(cell);
      },
      [onHover],
    );

    const handleLeave = React.useCallback(() => {
      setActiveKey(null);
      onHover?.(null);
    }, [onHover]);

    const colLabelStep = Math.max(1, Math.ceil(columns.length / 12));

    return (
      <div
        ref={ref}
        className={clsx(styles.activityGrid, className)}
        role="img"
        aria-label={ariaLabel ?? `Activity grid with ${data.length} cells`}
        {...props}
      >
        {showColumnLabels && (
          <div
            className={styles.activityColLabels}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns.length}, ${cellSize}px)`,
              gap: cellGap,
              marginLeft: showRowLabels ? 28 : 0,
            }}
          >
            {columns.map((col, ci) => (
              <span key={col} className={styles.activityColLabel}>
                {ci % colLabelStep === 0 ? col : ''}
              </span>
            ))}
          </div>
        )}
        <div className={styles.activityBody}>
          {showRowLabels && (
            <div
              className={styles.activityRowLabels}
              style={{ gap: cellGap }}
            >
              {rows.map((row) => (
                <span
                  key={row}
                  className={styles.activityRowLabel}
                  style={{ height: cellSize }}
                >
                  {row}
                </span>
              ))}
            </div>
          )}
          <div
            className={styles.activityCells}
            style={{
              gridTemplateColumns: `repeat(${columns.length}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${rows.length}, ${cellSize}px)`,
              gap: cellGap,
            }}
          >
            {rows.map((row, ri) =>
              columns.map((col, ci) => {
                const cell = cellMap.get(`${row}:${col}`);
                const value = cell?.value ?? 0;
                const intensity = value / maxValue;
                const key = `${row}:${col}`;
                const isActive = activeKey === null || activeKey === key;

                return (
                  <div
                    key={key}
                    className={clsx(
                      styles.activityCell,
                      onClickCell && cell && styles.activityCellClickable,
                    )}
                    style={{
                      gridRow: ri + 1,
                      gridColumn: ci + 1,
                      backgroundColor: value > 0 ? color : 'var(--surface-secondary)',
                      opacity: value > 0
                        ? (isActive ? 0.2 + intensity * 0.8 : 0.15)
                        : (isActive ? 1 : 0.5),
                    }}
                    title={cell?.label ?? `${row} ${col}: ${value}`}
                    onMouseEnter={cell ? () => handleEnter(cell) : undefined}
                    onMouseLeave={handleLeave}
                    onClick={cell && onClickCell ? () => onClickCell(cell) : undefined}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  ActivityGrid.displayName = 'Chart.ActivityGrid';
}
