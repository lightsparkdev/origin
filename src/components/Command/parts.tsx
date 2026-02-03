'use client';

import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Autocomplete } from '@base-ui/react/autocomplete';
import clsx from 'clsx';
import styles from './Command.module.scss';

// ============================================================================
// Types
// ============================================================================

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label (used for filtering) */
  label: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Keyboard shortcut */
  shortcut?: React.ReactNode;
  /** Additional keywords for filtering */
  keywords?: string[];
  /** Callback when selected */
  onSelect?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface CommandGroup {
  /** Group label */
  label: string;
  /** Items in the group */
  items: CommandItem[];
}

// ============================================================================
// Context
// ============================================================================

interface CommandContextValue {
  onSelect: (item: CommandItem) => void;
  renderItem?: (item: CommandItem) => React.ReactNode;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within Command.Root');
  }
  return context;
}

// ============================================================================
// Custom filter that includes keywords
// ============================================================================

function filterWithKeywords(
  item: CommandItem | CommandGroup,
  inputValue: string
): boolean {
  if (!inputValue) return true;
  
  const query = inputValue.toLowerCase();
  
  // Handle group
  if ('items' in item) {
    // A group matches if any of its items match
    return item.items.some((child) => filterWithKeywords(child, inputValue));
  }
  
  // Handle item
  const label = item.label.toLowerCase();
  
  // Exact match
  if (label === query) return true;
  
  // Starts with
  if (label.startsWith(query)) return true;
  
  // Contains
  if (label.includes(query)) return true;
  
  // Check keywords
  if (item.keywords) {
    for (const keyword of item.keywords) {
      if (keyword.toLowerCase().includes(query)) return true;
    }
  }
  
  // Fuzzy match - all query chars appear in order
  let textIndex = 0;
  for (const char of query) {
    const foundIndex = label.indexOf(char, textIndex);
    if (foundIndex === -1) return false;
    textIndex = foundIndex + 1;
  }
  
  return true;
}

// ============================================================================
// Root
// ============================================================================

export interface RootProps {
  children?: React.ReactNode;
  /** Items to display (can be flat or grouped) */
  items: CommandItem[] | CommandGroup[];
  /** Whether the command palette is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the command palette is initially open (uncontrolled) */
  defaultOpen?: boolean;
  /** Placeholder for the input */
  placeholder?: string;
  /** Custom filter function */
  filter?: (item: CommandItem | CommandGroup, inputValue: string) => boolean;
  /** Loop keyboard navigation */
  loop?: boolean;
  /** Custom render function for items */
  renderItem?: (item: CommandItem) => React.ReactNode;
}

/**
 * Command.Root - Container for the command palette.
 *
 * Uses Base UI Autocomplete for keyboard navigation and filtering,
 * wrapped in a Dialog for modal behavior.
 *
 * @example
 * ```tsx
 * // Simple usage with data
 * const items = [
 *   { id: '1', label: 'Copy', icon: <CopyIcon />, onSelect: () => copy() },
 *   { id: '2', label: 'Paste', icon: <PasteIcon />, onSelect: () => paste() },
 * ];
 *
 * <Command.Root items={items} open={open} onOpenChange={setOpen}>
 *   <Command.Footer>...</Command.Footer>
 * </Command.Root>
 * 
 * // Custom item rendering
 * <Command.Root 
 *   items={items} 
 *   open={open} 
 *   onOpenChange={setOpen}
 *   renderItem={(item) => (
 *     <div className="my-custom-item">
 *       {item.icon}
 *       <span>{item.label}</span>
 *       <MyBadge>{item.category}</MyBadge>
 *     </div>
 *   )}
 * />
 * ```
 */
export function Root(props: RootProps) {
  const {
    children,
    items,
    open,
    onOpenChange,
    defaultOpen,
    placeholder = 'Type a command or search...',
    filter = filterWithKeywords,
    loop = true,
    renderItem,
  } = props;

  // Handle selection
  const handleSelect = React.useCallback(
    (item: CommandItem) => {
      item.onSelect?.();
      onOpenChange?.(false);
    },
    [onOpenChange]
  );

  const contextValue = React.useMemo(
    () => ({ onSelect: handleSelect, renderItem }),
    [handleSelect, renderItem]
  );

  // Convert item to string for Autocomplete
  const itemToString = React.useCallback(
    (item: CommandItem | CommandGroup | null) => {
      if (!item) return '';
      if ('items' in item) return item.label; // Group
      return item.label; // Item
    },
    []
  );

  // Check if items are grouped
  const isGrouped = items.length > 0 && 'items' in items[0];

  return (
    <CommandContext.Provider value={contextValue}>
      <Dialog.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup className={styles.popup}>
            <Autocomplete.Root
              items={items}
              inline
              open
              autoHighlight="always"
              keepHighlight
              loopFocus={loop}
              filter={filter}
              itemToStringValue={itemToString}
            >
              <div className={styles.inputWrapper}>
                <Autocomplete.Input
                  className={styles.input}
                  placeholder={placeholder}
                  autoFocus
                />
              </div>

              <div className={styles.list}>
                <Autocomplete.Empty className={styles.empty}>
                  No results.
                </Autocomplete.Empty>

                {isGrouped ? (
                  <Autocomplete.List>
                    {(group: CommandGroup) => (
                      <Autocomplete.Group key={group.label} items={group.items}>
                        <Autocomplete.GroupLabel className={styles.groupHeading}>
                          {group.label}
                        </Autocomplete.GroupLabel>
                        <Autocomplete.Collection>
                          {(item: CommandItem) => (
                            <ItemRenderer key={item.id} item={item} />
                          )}
                        </Autocomplete.Collection>
                      </Autocomplete.Group>
                    )}
                  </Autocomplete.List>
                ) : (
                  <Autocomplete.List>
                    {(item: CommandItem) => (
                      <ItemRenderer key={item.id} item={item} />
                    )}
                  </Autocomplete.List>
                )}
              </div>

              {children}
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandContext.Provider>
  );
}

// ============================================================================
// Item Renderer (internal)
// ============================================================================

interface ItemRendererProps {
  item: CommandItem;
}

function ItemRenderer({ item }: ItemRendererProps) {
  const { onSelect, renderItem } = useCommandContext();

  return (
    <Autocomplete.Item
      value={item}
      disabled={item.disabled}
      className={styles.item}
      onClick={() => onSelect(item)}
    >
      {renderItem ? (
        renderItem(item)
      ) : (
        <>
          <span className={styles.itemLeading}>
            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
            <span className={styles.itemLabel}>{item.label}</span>
          </span>
          {item.shortcut}
        </>
      )}
    </Autocomplete.Item>
  );
}

// ============================================================================
// Input (for external access if needed)
// ============================================================================

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

/**
 * Command.Input - Exposed input for custom positioning.
 * Note: Root already includes an input, this is for advanced use cases.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <div className={styles.inputWrapper}>
        <Autocomplete.Input
          ref={ref}
          className={clsx(styles.input, className)}
          {...props}
        />
      </div>
    );
  }
);

// ============================================================================
// Footer
// ============================================================================

export interface FooterProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * Command.Footer - Footer section for navigation hints.
 */
export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  function Footer({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
      />
    );
  }
);

// ============================================================================
// Display names
// ============================================================================

if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Command.Input';
  Footer.displayName = 'Command.Footer';
}
