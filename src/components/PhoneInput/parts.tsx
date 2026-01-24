'use client';

import * as React from 'react';
import { Select as BaseSelect, SelectRootProps } from '@base-ui/react/select';
import { Input as BaseInput } from '@base-ui/react/input';
import { CentralIcon } from '@/components/Icon';
import clsx from 'clsx';
import styles from './PhoneInput.module.scss';

// Context to share disabled/invalid state across parts
interface PhoneInputContextValue {
  disabled?: boolean;
  invalid?: boolean;
}

const PhoneInputContext = React.createContext<PhoneInputContextValue | undefined>(undefined);
PhoneInputContext.displayName = 'PhoneInputContext';

function usePhoneInputContext() {
  const context = React.useContext(PhoneInputContext);
  if (context === undefined) {
    throw new Error('PhoneInput parts must be used within <PhoneInput.Root>.');
  }
  return context;
}

// Anchor context for positioning - follows Combobox pattern
const AnchorContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);
AnchorContext.displayName = 'PhoneInputAnchorContext';

// Root - container for the entire phone input
export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  invalid?: boolean;
}

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  function Root({ className, disabled = false, invalid = false, children, ...props }, forwardedRef) {
    const anchorRef = React.useRef<HTMLDivElement | null>(null);

    // Combine forwarded ref with anchor ref (following Combobox pattern)
    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        anchorRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const contextValue = React.useMemo(
      () => ({ disabled, invalid }),
      [disabled, invalid]
    );

    return (
      <AnchorContext.Provider value={anchorRef}>
        <PhoneInputContext.Provider value={contextValue}>
          <div
            ref={combinedRef}
            className={clsx(styles.root, className)}
            data-phone-input-root=""
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            {...props}
          >
            {children}
          </div>
        </PhoneInputContext.Provider>
      </AnchorContext.Provider>
    );
  }
);

// CountrySelect - wraps Base UI Select
export interface CountrySelectProps<Value> extends Omit<SelectRootProps<Value, false>, 'multiple'> {}

export function CountrySelect<Value>({
  children,
  disabled: selectDisabled,
  ...props
}: CountrySelectProps<Value>) {
  const { disabled: rootDisabled } = usePhoneInputContext();
  const isDisabled = selectDisabled ?? rootDisabled;

  return (
    <BaseSelect.Root disabled={isDisabled} {...props}>
      {children}
    </BaseSelect.Root>
  );
}

// CountryTrigger
export interface CountryTriggerProps extends BaseSelect.Trigger.Props {}

export const CountryTrigger = React.forwardRef<HTMLButtonElement, CountryTriggerProps>(
  function CountryTrigger({ className, ...props }, ref) {
    return (
      <BaseSelect.Trigger
        ref={ref}
        className={clsx(styles.trigger, className)}
        data-phone-input-trigger=""
        {...props}
      />
    );
  }
);

// CountryValue - renders the selected country
export interface CountryValueProps<Value> extends Omit<BaseSelect.Value.Props, 'children'> {
  children: (value: Value) => React.ReactNode;
}

export function CountryValue<Value>({
  className,
  children,
  ...props
}: CountryValueProps<Value>) {
  return (
    <BaseSelect.Value className={clsx(styles.value, className)} {...props}>
      {(value) => {
        if (value == null) return null;
        return children(value as Value);
      }}
    </BaseSelect.Value>
  );
}

// CountryValueFlag - wrapper for flag in trigger (18px)
export interface CountryValueFlagProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CountryValueFlag = React.forwardRef<HTMLSpanElement, CountryValueFlagProps>(
  function CountryValueFlag({ className, ...props }, ref) {
    return (
      <span ref={ref} className={clsx(styles.valueFlag, className)} {...props} />
    );
  }
);

// CountryIcon
export interface CountryIconProps extends Omit<BaseSelect.Icon.Props, 'children'> {
  children?: React.ReactNode;
}

export const CountryIcon = React.forwardRef<HTMLSpanElement, CountryIconProps>(
  function CountryIcon({ className, children, ...props }, ref) {
    return (
      <BaseSelect.Icon
        ref={ref}
        className={clsx(styles.icon, className)}
        {...props}
      >
        {children ?? <CentralIcon name="IconChevronDownSmall" size={20} />}
      </BaseSelect.Icon>
    );
  }
);

// CountryPortal
export interface CountryPortalProps extends BaseSelect.Portal.Props {}

export function CountryPortal(props: CountryPortalProps) {
  return <BaseSelect.Portal {...props} />;
}

// CountryPositioner - positions popup below root (following Combobox anchor pattern)
export interface CountryPositionerProps extends BaseSelect.Positioner.Props {}

export const CountryPositioner = React.forwardRef<HTMLDivElement, CountryPositionerProps>(
  function CountryPositioner({ className, sideOffset = 6, side = 'bottom', align = 'start', anchor, ...props }, ref) {
    const anchorRef = React.useContext(AnchorContext);

    return (
      <BaseSelect.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        sideOffset={sideOffset}
        side={side}
        align={align}
        // CRITICAL: Must be false for side/align props to work with custom anchor
        alignItemWithTrigger={false}
        // Use Root as anchor for proper width (following Combobox pattern)
        anchor={anchor ?? anchorRef}
        {...props}
      />
    );
  }
);

// CountryPopup
export interface CountryPopupProps extends BaseSelect.Popup.Props {}

export const CountryPopup = React.forwardRef<HTMLDivElement, CountryPopupProps>(
  function CountryPopup({ className, ...props }, ref) {
    return (
      <BaseSelect.Popup
        ref={ref}
        className={clsx(styles.popup, className)}
        data-phone-input-popup=""
        {...props}
      />
    );
  }
);

// CountryList
export interface CountryListProps extends BaseSelect.List.Props {}

export const CountryList = React.forwardRef<HTMLDivElement, CountryListProps>(
  function CountryList({ className, ...props }, ref) {
    return (
      <BaseSelect.List
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      />
    );
  }
);

// CountryItem
export interface CountryItemProps extends BaseSelect.Item.Props {}

export const CountryItem = React.forwardRef<HTMLDivElement, CountryItemProps>(
  function CountryItem({ className, ...props }, ref) {
    return (
      <BaseSelect.Item
        ref={ref}
        className={clsx(styles.item, className)}
        {...props}
      />
    );
  }
);

// CountryItemFlag - wrapper for flag in item (24px)
export interface CountryItemFlagProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CountryItemFlag = React.forwardRef<HTMLSpanElement, CountryItemFlagProps>(
  function CountryItemFlag({ className, ...props }, ref) {
    return (
      <span ref={ref} className={clsx(styles.itemFlag, className)} {...props} />
    );
  }
);

// CountryItemText - country name with dial code, e.g. "United States (+1)"
export interface CountryItemTextProps extends BaseSelect.ItemText.Props {}

export const CountryItemText = React.forwardRef<HTMLDivElement, CountryItemTextProps>(
  function CountryItemText({ className, ...props }, ref) {
    return (
      <BaseSelect.ItemText
        ref={ref}
        className={clsx(styles.itemText, className)}
        {...props}
      />
    );
  }
);

// CountryItemIndicator
export interface CountryItemIndicatorProps extends Omit<BaseSelect.ItemIndicator.Props, 'children'> {
  children?: React.ReactNode;
}

export const CountryItemIndicator = React.forwardRef<HTMLSpanElement, CountryItemIndicatorProps>(
  function CountryItemIndicator({ className, children, keepMounted = true, style, ...props }, ref) {
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        className={clsx(styles.itemIndicator, className)}
        keepMounted={keepMounted}
        style={(state) => ({
          visibility: state.selected ? 'visible' : 'hidden',
          ...(typeof style === 'function' ? style(state) : style),
        })}
        {...props}
      >
        {children ?? <span className={styles.itemIndicatorDot} />}
      </BaseSelect.ItemIndicator>
    );
  }
);

// Input - the phone number input (uses BaseInput for Field integration)
export interface InputProps extends Omit<BaseInput.Props, 'type'> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, disabled: inputDisabled, ...props }, ref) {
    const { disabled: rootDisabled, invalid } = usePhoneInputContext();
    const isDisabled = inputDisabled ?? rootDisabled;

    return (
      <BaseInput
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={clsx(styles.input, className)}
        disabled={isDisabled}
        aria-invalid={invalid || undefined}
        data-phone-input-input=""
        {...props}
      />
    );
  }
);
