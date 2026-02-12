'use client';

import * as React from 'react';

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * The element type to render.
   * @default 'span'
   */
  as?: React.ElementType;
}

/**
 * Hides content visually while keeping it accessible to screen readers.
 *
 * Use for accessible labels, legends, skip links, and live-region text
 * that shouldn't be visible on screen.
 *
 * ```tsx
 * <Fieldset.Legend>
 *   <VisuallyHidden>Account limits</VisuallyHidden>
 * </Fieldset.Legend>
 * ```
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden(props, forwardedRef) {
    const { as: Component = 'span', style, ...rest } = props;

    return (
      <Component
        ref={forwardedRef}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
          ...style,
        }}
        {...rest}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
