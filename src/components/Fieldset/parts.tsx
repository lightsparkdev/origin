'use client';

import * as React from 'react';
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import clsx from 'clsx';
import styles from './Fieldset.module.scss';

export interface FieldsetRootProps extends BaseFieldset.Root.Props {}

export const FieldsetRoot = React.forwardRef<HTMLFieldSetElement, FieldsetRootProps>(
  function FieldsetRoot(props, ref) {
    const { className, ...other } = props;

    return (
      <BaseFieldset.Root
        ref={ref}
        className={clsx(styles.root, className)}
        {...other}
      />
    );
  }
);

export interface FieldsetLegendProps extends BaseFieldset.Legend.Props {}

export const FieldsetLegend = React.forwardRef<HTMLDivElement, FieldsetLegendProps>(
  function FieldsetLegend(props, ref) {
    const { className, ...other } = props;

    return (
      <BaseFieldset.Legend
        ref={ref}
        className={clsx(styles.legend, className)}
        {...other}
      />
    );
  }
);

if (process.env.NODE_ENV !== 'production') {
  FieldsetRoot.displayName = 'FieldsetRoot';
  FieldsetLegend.displayName = 'FieldsetLegend';
}

export const Fieldset = {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
};

export default Fieldset;
