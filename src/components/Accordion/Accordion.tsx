/**
 * Accordion Component
 * 
 * A collapsible content panel using Base UI for behavior and accessibility.
 * Styled with tokens from Figma Dev Mode.
 */

'use client';

import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui-components/react/accordion';
import { CentralIcon } from '@/components/Icon';
import styles from './Accordion.module.scss';

/* ============================================================================
 * Accordion Root
 * ============================================================================ */

export interface AccordionProps {
  /** The accordion items */
  children: React.ReactNode;
  /** Default expanded item values (uncontrolled) */
  defaultValue?: string[];
  /** Expanded item values (controlled) */
  value?: string[];
  /** Callback when expanded items change */
  onValueChange?: (value: string[]) => void;
  /** Whether only one item can be open at a time */
  type?: 'single' | 'multiple';
  /** Additional CSS class */
  className?: string;
}

export function Accordion({
  children,
  defaultValue,
  value,
  onValueChange,
  type = 'multiple',
  className,
}: AccordionProps) {
  // Base UI uses `openMultiple` prop instead of `type`
  const openMultiple = type === 'multiple';

  return (
    <BaseAccordion.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      openMultiple={openMultiple}
      className={`${styles.root} ${className || ''}`}
    >
      {children}
    </BaseAccordion.Root>
  );
}

/* ============================================================================
 * Accordion Item
 * ============================================================================ */

export interface AccordionItemProps {
  /** Unique value for this item */
  value: string;
  /** The content to render */
  children: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export function AccordionItem({
  value,
  children,
  disabled,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      value={value}
      disabled={disabled}
      className={`${styles.item} ${className || ''}`}
    >
      {children}
    </BaseAccordion.Item>
  );
}

/* ============================================================================
 * Accordion Header
 * ============================================================================ */

export interface AccordionHeaderProps {
  /** The content to render (usually AccordionTrigger) */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function AccordionHeader({
  children,
  className,
}: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header className={`${styles.header} ${className || ''}`}>
      {children}
    </BaseAccordion.Header>
  );
}

/* ============================================================================
 * Accordion Trigger
 * ============================================================================ */

export interface AccordionTriggerProps {
  /** The trigger content (usually title text) */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger className={`${styles.trigger} ${className || ''}`}>
      <span className={styles.title}>{children}</span>
      <CentralIcon 
        name="IconChevronDownSmall" 
        size={24} 
        className={styles.icon}
      />
    </BaseAccordion.Trigger>
  );
}

/* ============================================================================
 * Accordion Panel
 * ============================================================================ */

export interface AccordionPanelProps {
  /** The panel content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export function AccordionPanel({
  children,
  className,
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel className={`${styles.panel} ${className || ''}`}>
      <div className={styles.content}>{children}</div>
    </BaseAccordion.Panel>
  );
}

/* ============================================================================
 * Compound Export
 * ============================================================================ */

export default Object.assign(Accordion, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
});

