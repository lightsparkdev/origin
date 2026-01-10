'use client';

import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group';
import { Radio as BaseRadio } from '@base-ui-components/react/radio';
import { Field } from '@base-ui-components/react/field';
import clsx from 'clsx';
import styles from './Radio.module.scss';

// =============================================================================
// RadioGroup
// =============================================================================

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** The controlled value of the selected radio. */
  value?: unknown;
  /** The uncontrolled default value. */
  defaultValue?: unknown;
  /** Callback fired when the value changes. */
  onValueChange?: (value: unknown) => void;
  /** Whether the group is disabled. */
  disabled?: boolean;
  /** Whether the group is read-only. */
  readOnly?: boolean;
  /** Whether a selection is required. */
  required?: boolean;
  /** The name attribute for form submission. */
  name?: string;
  /** Visual variant of the radio items. */
  variant?: 'default' | 'card';
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      readOnly = false,
      required = false,
      name,
      variant = 'default',
      className,
      children,
      style,
      ...other
    } = props;

    return (
      <RadioGroupContext.Provider value={{ variant }}>
        <BaseRadioGroup
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          name={name}
          className={clsx(styles.group, className)}
          style={style}
          {...other}
        >
          {children}
        </BaseRadioGroup>
      </RadioGroupContext.Provider>
    );
  }
);

// Context for variant propagation
interface RadioGroupContextValue {
  variant: 'default' | 'card';
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  variant: 'default',
});

function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

// =============================================================================
// RadioItem
// =============================================================================

export interface RadioItemProps {
  /** The unique value of this radio option. */
  value: unknown;
  /** Whether this radio is disabled. */
  disabled?: boolean;
  /** The label text for the radio option. */
  label?: string;
  /** The description text for the radio option. */
  description?: string;
  /** Additional class name. */
  className?: string;
  /** Children to render instead of label/description. */
  children?: React.ReactNode;
}

export const RadioItem = React.forwardRef<HTMLSpanElement, RadioItemProps>(
  function RadioItem(props, ref) {
    const { value, disabled = false, label, description, className, children, ...other } = props;
    const { variant } = useRadioGroupContext();

    return (
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        className={clsx(
          styles.item,
          variant === 'card' && styles.card,
          className
        )}
        {...other}
      >
        <span className={styles.radio}>
          <BaseRadio.Indicator className={styles.indicator} />
        </span>
        {(label || description || children) && (
          <span className={styles.content}>
            {children || (
              <>
                {label && <span className={styles.label}>{label}</span>}
                {description && <span className={styles.description}>{description}</span>}
              </>
            )}
          </span>
        )}
      </BaseRadio.Root>
    );
  }
);

// =============================================================================
// Field Parts (re-exported for convenience)
// =============================================================================

/**
 * Wraps the RadioGroup to provide field-level state and accessibility.
 * Use Field.Label as the legend, and Field.Description/Field.Error for help/error text.
 */
export const RadioField = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Field.Root> & { className?: string }
>(function RadioField(props, ref) {
  const { className, ...other } = props;
  return <Field.Root ref={ref} className={clsx(styles.field, className)} {...other} />;
});

/**
 * The legend/title for the radio group.
 * Renders as a label but semantically titles the group.
 */
export const RadioLegend = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof Field.Label> & { className?: string }
>(function RadioLegend(props, ref) {
  const { className, ...other } = props;
  return <Field.Label ref={ref} className={clsx(styles.legend, className)} {...other} />;
});

/**
 * Help text displayed below the radio group (default state).
 * Renders a `<p>` element.
 */
export const RadioDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Field.Description> & { className?: string }
>(function RadioDescription(props, ref) {
  const { className, ...other } = props;
  return <Field.Description ref={ref} className={clsx(styles.helpText, className)} {...other} />;
});

/**
 * Error text displayed below the radio group (critical state).
 * Renders a `<div>` element.
 */
export const RadioError = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Field.Error> & { className?: string }
>(function RadioError(props, ref) {
  const { className, ...other } = props;
  return <Field.Error ref={ref} className={clsx(styles.errorText, className)} {...other} />;
});

// =============================================================================
// Compound Component Export
// =============================================================================

export const Radio = {
  /** The radiogroup container. */
  Group: RadioGroup,
  /** Individual radio option. */
  Item: RadioItem,
  /** Field wrapper for accessibility (wraps Group + Legend + Description/Error). */
  Field: RadioField,
  /** Group title/legend. */
  Legend: RadioLegend,
  /** Help text (default state). */
  Description: RadioDescription,
  /** Error text (critical state). */
  Error: RadioError,
};

export default Radio;
