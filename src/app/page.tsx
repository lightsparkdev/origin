'use client';

import * as React from 'react';
import { matchSorter } from 'match-sorter';
import { Accordion } from '@/components/Accordion';
import { ActionBar, ActionBarLabel, ActionBarActions } from '@/components/ActionBar';
import { Autocomplete } from '@/components/Autocomplete';
import { Alert } from '@/components/Alert';
import { AlertDialog } from '@/components/AlertDialog';
import { Badge } from '@/components/Badge';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Checkbox } from '@/components/Checkbox';
import { Chip, ChipFilter } from '@/components/Chip';
import { Combobox } from '@/components/Combobox';
import { Field } from '@/components/Field';
import { Fieldset } from '@/components/Fieldset';
import { Form } from '@/components/Form';
import { CentralIcon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Item } from '@/components/Item';
import { Loader } from '@/components/Loader';
import { Command } from '@/components/Command';
import { Menu } from '@/components/Menu';
import { Menubar } from '@/components/Menubar';
import { NavigationMenu } from '@/components/NavigationMenu';
import { ContextMenu } from '@/components/ContextMenu';
import { Meter } from '@/components/Meter';
import { Pagination } from '@/components/Pagination';
import { PhoneInput } from '@/components/PhoneInput';
import { Progress } from '@/components/Progress';
import { Radio } from '@/components/Radio';
import { Select } from '@/components/Select';
import { Separator } from '@/components/Separator';
import { Shortcut } from '@/components/Shortcut';
import { Switch } from '@/components/Switch';
import { Tabs } from '@/components/Tabs';
import { Table } from '@/components/Table';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  RowSelectionState,
} from '@tanstack/react-table';
import { Toast, ToastVariant } from '@/components/Toast';
import { Tooltip } from '@/components/Tooltip';
import { Logo } from '@/components/Logo';

// Data for combobox examples
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
const groupedFruits = {
  common: ['Apple', 'Banana', 'Orange'],
  exotic: ['Dragon Fruit', 'Mangosteen', 'Rambutan'],
};

// Toast demo components
function ToastDemo() {
  const toastManager = Toast.useToastManager();

  const showToast = (variant: ToastVariant, title: string, description?: string, actionLabel?: string) => {
    toastManager.add({
      title,
      description,
      data: { variant, actionLabel },
    });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => showToast('default', 'Default toast', 'This is a default toast message.')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => showToast('info', 'Info toast', 'This is an informational message.')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => showToast('success', 'Success!', 'Your action was completed successfully.')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => showToast('warning', 'Warning', 'Please review before continuing.')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => showToast('invalid', 'Error', 'Something went wrong.')}>
        Invalid
      </Button>
      <Button variant="outline" onClick={() => showToast('default', 'Item deleted', 'The item has been moved to trash.', 'Undo')}>
        With Action
      </Button>
    </div>
  );
}

function ToastRenderer() {
  const toastManager = Toast.useToastManager();

  return (
    <>
      {toastManager.toasts.map((toast) => {
        const variant = (toast.data?.variant as ToastVariant) || 'default';
        const actionLabel = toast.data?.actionLabel as string | undefined;
        return (
          <Toast.Root key={toast.id} toast={toast} variant={variant}>
            {variant !== 'default' && <Toast.Icon variant={variant} />}
            <Toast.Content>
              <Toast.Title>{toast.title}</Toast.Title>
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Toast.Content>
            {actionLabel && <Toast.Action>{actionLabel}</Toast.Action>}
            <Toast.Close aria-label="Close toast" />
          </Toast.Root>
        );
      })}
    </>
  );
}

// Data for autocomplete examples
const autocompleteFruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

interface AutocompleteFruit {
  value: string;
  label: string;
}

interface FuzzyItem {
  label: string;
}

const fuzzyItems: FuzzyItem[] = [
  { label: 'React' },
  { label: 'JavaScript' },
  { label: 'TypeScript' },
  { label: 'Node.js' },
  { label: 'CSS Grid' },
  { label: 'Flexbox' },
  { label: 'Redux' },
  { label: 'GraphQL' },
];

function fuzzyFilter(item: FuzzyItem, query: string): boolean {
  if (!query) return true;
  const results = matchSorter([item], query, {
    keys: ['label'],
  });
  return results.length > 0;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) {
    return text;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  const lowerQuery = query.toLowerCase();

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === lowerQuery ? (
          <span key={i} style={{ color: 'var(--text-primary)' }}>{part}</span>
        ) : (
          <span key={i} style={{ color: 'var(--text-secondary)' }}>{part}</span>
        )
      )}
    </span>
  );
}

function FuzzyMatchingDemo() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
        Fuzzy Matching (try &quot;rct&quot;)
      </span>
      <Autocomplete.Root
        items={fuzzyItems}
        filter={fuzzyFilter}
        itemToStringValue={(item: FuzzyItem) => item.label}
        value={value}
        onValueChange={setValue}
      >
        <Autocomplete.Input placeholder="Search..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(item: FuzzyItem) => (
                  <Autocomplete.Item key={item.label} value={item}>
                    {highlightMatch(item.label, value)}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
}

function CommandDemo() {
  const [basicOpen, setBasicOpen] = React.useState(false);
  const [fullOpen, setFullOpen] = React.useState(false);

  // Basic items (flat)
  const basicItems: import('@/components/Command').CommandItem[] = [
    { id: '1', label: 'Calendar', icon: <CentralIcon name="IconCalendarDays" size={16} /> },
    { id: '2', label: 'Search Emoji', icon: <CentralIcon name="IconMagnifyingGlass2" size={16} /> },
    { id: '3', label: 'Calculator', icon: <CentralIcon name="IconSquareBehindSquare1" size={16} /> },
    { id: '4', label: 'Settings', icon: <CentralIcon name="IconSettingsGear1" size={16} /> },
  ];

  // Full items (grouped) - 20+ items to test scrolling
  const fullItems: import('@/components/Command').CommandGroup[] = [
    {
      label: 'Suggestions',
      items: [
        { id: '1', label: 'Linear', icon: <CentralIcon name="IconGlobe2" size={16} />, shortcut: <Shortcut keys={['⌘', 'L']} /> },
        { id: '2', label: 'Figma', icon: <CentralIcon name="IconGlobe2" size={16} />, shortcut: <Shortcut keys={['⌘', 'F']} /> },
        { id: '3', label: 'Slack', icon: <CentralIcon name="IconGlobe2" size={16} />, shortcut: <Shortcut keys={['⌘', 'S']} /> },
        { id: '4', label: 'Notion', icon: <CentralIcon name="IconGlobe2" size={16} />, shortcut: <Shortcut keys={['⌘', 'N']} /> },
        { id: '5', label: 'GitHub', icon: <CentralIcon name="IconGlobe2" size={16} />, shortcut: <Shortcut keys={['⌘', 'G']} /> },
      ],
    },
    {
      label: 'Commands',
      items: [
        { id: '6', label: 'Clipboard History', icon: <CentralIcon name="IconClipboard2" size={16} />, shortcut: <Shortcut keys={['⌘', '⇧', 'C']} />, keywords: ['clipboard', 'paste'] },
        { id: '7', label: 'System Preferences', icon: <CentralIcon name="IconSettingsGear1" size={16} />, shortcut: <Shortcut keys={['⌘', ',']} />, keywords: ['settings'] },
        { id: '8', label: 'Screenshot', icon: <CentralIcon name="IconSquareBehindSquare1" size={16} />, shortcut: <Shortcut keys={['⌘', '⇧', '4']} />, keywords: ['capture', 'screen'] },
        { id: '9', label: 'Lock Screen', icon: <CentralIcon name="IconSettingsGear1" size={16} />, shortcut: <Shortcut keys={['⌘', '⌃', 'Q']} /> },
        { id: '10', label: 'Force Quit', icon: <CentralIcon name="IconSettingsGear1" size={16} />, shortcut: <Shortcut keys={['⌘', '⌥', 'Esc']} /> },
      ],
    },
    {
      label: 'Navigation',
      items: [
        { id: '11', label: 'Go to Dashboard', icon: <CentralIcon name="IconGlobe2" size={16} /> },
        { id: '12', label: 'Go to Settings', icon: <CentralIcon name="IconSettingsGear1" size={16} /> },
        { id: '13', label: 'Go to Profile', icon: <CentralIcon name="IconGlobe2" size={16} /> },
        { id: '14', label: 'Go to Notifications', icon: <CentralIcon name="IconGlobe2" size={16} /> },
        { id: '15', label: 'Go to Help', icon: <CentralIcon name="IconGlobe2" size={16} /> },
      ],
    },
    {
      label: 'Actions',
      items: [
        { id: '16', label: 'New Document', icon: <CentralIcon name="IconFileBend" size={16} />, shortcut: <Shortcut keys={['⌘', 'N']} /> },
        { id: '17', label: 'New Folder', icon: <CentralIcon name="IconFileBend" size={16} />, shortcut: <Shortcut keys={['⌘', '⇧', 'N']} /> },
        { id: '18', label: 'Duplicate', icon: <CentralIcon name="IconSquareBehindSquare1" size={16} />, shortcut: <Shortcut keys={['⌘', 'D']} /> },
        { id: '19', label: 'Delete', icon: <CentralIcon name="IconSettingsGear1" size={16} />, shortcut: <Shortcut keys={['⌘', '⌫']} /> },
        { id: '20', label: 'Archive', icon: <CentralIcon name="IconFileBend" size={16} />, shortcut: <Shortcut keys={['⌘', 'E']} /> },
      ],
    },
  ];

  // Keyboard shortcut to open (Cmd+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setFullOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
      {/* Basic Command */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <Button variant="secondary" onClick={() => setBasicOpen(true)}>
          Type a command or search...
        </Button>
        <Command.Root
          items={basicItems}
          open={basicOpen}
          onOpenChange={setBasicOpen}
        />
      </div>

      {/* Full Command with shortcuts and footer */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Groups, Shortcuts &amp; Footer (⌘K to open)
        </span>
        <Button variant="secondary" onClick={() => setFullOpen(true)}>
          Open Command Palette
          <Shortcut keys={['⌘', 'K']} style={{ marginLeft: 'auto' }} />
        </Button>
        <Command.Root
          items={fullItems}
          open={fullOpen}
          onOpenChange={setFullOpen}
          placeholder="Search for apps and commands..."
        >
          <Command.Footer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shortcut keys={['↑', '↓']} />
              <span>Navigate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Select</span>
                <Shortcut keys={['↵']} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Close</span>
                <Shortcut keys={['Esc']} />
              </div>
            </div>
          </Command.Footer>
        </Command.Root>
      </div>
    </div>
  );
}

function AutocompleteExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
      {/* Basic */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <Autocomplete.Root items={autocompleteFruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      {item.label}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>

      {/* With Leading Icons */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Leading Icons
        </span>
        <Autocomplete.Root items={autocompleteFruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item
                      key={item.value}
                      value={item}
                      leadingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
                      {item.label}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>

      {/* Disabled */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <Autocomplete.Root items={autocompleteFruits} disabled>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      {item.label}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>

      {/* Fuzzy Matching */}
      <FuzzyMatchingDemo />
    </div>
  );
}

function MenuExamples() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [showRulers, setShowRulers] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('name');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
      {/* Basic */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>New File</Menu.Item>
                <Menu.Item>Open File</Menu.Item>
                <Menu.Item>Save</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Export</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* With Icons */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Icons
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>Edit</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>
                  <CentralIcon name="IconPencil" size={16} />
                  Edit
                </Menu.Item>
                <Menu.Item>
                  <CentralIcon name="IconClipboard2" size={16} />
                  Copy
                </Menu.Item>
                <Menu.Item>
                  <CentralIcon name="IconTrashCanSimple" size={16} />
                  Delete
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* Checkbox Items */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Checkbox Items
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>View Options</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                  <Menu.CheckboxItemIndicator>
                    <CentralIcon name="IconCheckmark2Small" size={16} />
                  </Menu.CheckboxItemIndicator>
                  Show Grid
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
                  <Menu.CheckboxItemIndicator>
                    <CentralIcon name="IconCheckmark2Small" size={16} />
                  </Menu.CheckboxItemIndicator>
                  Show Rulers
                </Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* Radio Items */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Radio Items
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>Sort By</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup value={sortBy} onValueChange={setSortBy}>
                  <Menu.RadioItem value="name">
                    <Menu.RadioItemIndicator>
                      <CentralIcon name="IconCheckmark2Small" size={16} />
                    </Menu.RadioItemIndicator>
                    Name
                  </Menu.RadioItem>
                  <Menu.RadioItem value="date">
                    <Menu.RadioItemIndicator>
                      <CentralIcon name="IconCheckmark2Small" size={16} />
                    </Menu.RadioItemIndicator>
                    Date
                  </Menu.RadioItem>
                  <Menu.RadioItem value="size">
                    <Menu.RadioItemIndicator>
                      <CentralIcon name="IconCheckmark2Small" size={16} />
                    </Menu.RadioItemIndicator>
                    Size
                  </Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* With Groups */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Groups
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>Preferences</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Group>
                  <Menu.GroupLabel>Account</Menu.GroupLabel>
                  <Menu.Item>Profile</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                </Menu.Group>
                <Menu.Separator />
                <Menu.Group>
                  <Menu.GroupLabel>Help</Menu.GroupLabel>
                  <Menu.Item>Documentation</Menu.Item>
                  <Menu.Item>Support</Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* With Submenu */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Submenu
        </span>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="outline" />}>File</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>New</Menu.Item>
                <Menu.Item>Open</Menu.Item>
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger>
                    <span style={{ flex: 1 }}>Share</span>
                    <CentralIcon name="IconChevronRightSmall" size={16} />
                  </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner side="right" sideOffset={-4}>
                      <Menu.Popup>
                        <Menu.Item>Email</Menu.Item>
                        <Menu.Item>Messages</Menu.Item>
                        <Menu.Item>AirDrop</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
                <Menu.Separator />
                <Menu.Item>Close</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </div>
  );
}

function MenubarDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <Menubar.Root>
          <Menu.Root>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>New</Menu.Item>
                  <Menu.Item>Open</Menu.Item>
                  <Menu.Item>Save</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Export</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Menu.Root>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>Undo</Menu.Item>
                  <Menu.Item>Redo</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Cut</Menu.Item>
                  <Menu.Item>Copy</Menu.Item>
                  <Menu.Item>Paste</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Menu.Root>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>Zoom In</Menu.Item>
                  <Menu.Item>Zoom Out</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Full Screen</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Menu.Root>
            <Menubar.Trigger>Help</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>Documentation</Menu.Item>
                  <Menu.Item>About</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </Menubar.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <Menubar.Root disabled>
          <Menu.Root>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>New</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <Menu.Root>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={2}>
                <Menu.Popup>
                  <Menu.Item>Cut</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </Menubar.Root>
      </div>
    </div>
  );
}

function ContextMenuExamples() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [sortBy, setSortBy] = React.useState('name');

  const TriggerArea = ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        padding: '40px 60px',
        border: '1px dashed var(--border-secondary)',
        borderRadius: 'var(--corner-radius-sm)',
        backgroundColor: 'var(--surface-secondary)',
        color: 'var(--text-secondary)',
        fontSize: '14px',
        textAlign: 'center',
      }}
    >
      {children || 'Right-click here'}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '128px' }}>
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <TriggerArea />
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>Cut</ContextMenu.Item>
                <ContextMenu.Item>Copy</ContextMenu.Item>
                <ContextMenu.Item>Paste</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>Delete</ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Checkbox Items
        </span>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <TriggerArea>Right-click for view options</TriggerArea>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                  <ContextMenu.CheckboxItemIndicator />
                  Show Grid
                </ContextMenu.CheckboxItem>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Radio Items
        </span>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <TriggerArea>Right-click to sort</TriggerArea>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Group>
                  <ContextMenu.GroupLabel>Sort by</ContextMenu.GroupLabel>
                  <ContextMenu.RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <ContextMenu.RadioItem value="name">
                      <ContextMenu.RadioItemIndicator />
                      Name
                    </ContextMenu.RadioItem>
                    <ContextMenu.RadioItem value="date">
                      <ContextMenu.RadioItemIndicator />
                      Date
                    </ContextMenu.RadioItem>
                    <ContextMenu.RadioItem value="size">
                      <ContextMenu.RadioItemIndicator />
                      Size
                    </ContextMenu.RadioItem>
                  </ContextMenu.RadioGroup>
                </ContextMenu.Group>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Submenu
        </span>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <TriggerArea />
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>New</ContextMenu.Item>
                <ContextMenu.Item>Open</ContextMenu.Item>
                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger>
                    <span style={{ flex: 1 }}>Share</span>
                    <CentralIcon name="IconChevronRightSmall" size={16} />
                  </ContextMenu.SubmenuTrigger>
                  <ContextMenu.Portal>
                    <ContextMenu.Positioner side="right" sideOffset={-4} alignOffset={-4}>
                      <ContextMenu.Popup>
                        <ContextMenu.Item>Email</ContextMenu.Item>
                        <ContextMenu.Item>Messages</ContextMenu.Item>
                        <ContextMenu.Item>Copy Link</ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>
                <ContextMenu.Separator />
                <ContextMenu.Item>Delete</ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </div>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  const [manyPage, setManyPage] = React.useState(50);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Few Pages
        </span>
        <Pagination.Root page={page} totalPages={5} onPageChange={setPage}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Many Pages (with ellipsis)
        </span>
        <Pagination.Root page={manyPage} totalPages={100} onPageChange={setManyPage}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Single Page (both disabled)
        </span>
        <Pagination.Root page={1} totalPages={1}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>
    </div>
  );
}

// Phone Input demo data
const phoneCountries = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'IN', name: 'India', dialCode: '+91' },
];

type PhoneCountry = typeof phoneCountries[number];

// Circle-flags CDN URL helper
function getFlagUrl(code: string) {
  return `https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`;
}

function PhoneInputDemo() {
  const [country, setCountry] = React.useState<PhoneCountry>(phoneCountries[0]);
  const [phone, setPhone] = React.useState('');
  const [invalidCountry, setInvalidCountry] = React.useState<PhoneCountry>(phoneCountries[0]);
  const [invalidPhone, setInvalidPhone] = React.useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Default
        </span>
        <PhoneInput.Root>
          <PhoneInput.CountrySelect value={country} onValueChange={(v) => v && setCountry(v)}>
            <PhoneInput.CountryTrigger aria-label="Select country">
              <PhoneInput.CountryValue>
                {(c: PhoneCountry) => (
                  <>
                    <PhoneInput.CountryValueFlag>
                      <img src={getFlagUrl(c.code)} alt="" />
                    </PhoneInput.CountryValueFlag>
                    <span>{c.dialCode}</span>
                  </>
                )}
              </PhoneInput.CountryValue>
              <PhoneInput.CountryIcon />
            </PhoneInput.CountryTrigger>
            <PhoneInput.CountryPortal>
              <PhoneInput.CountryPositioner>
                <PhoneInput.CountryPopup>
                  <PhoneInput.CountryList>
                    {phoneCountries.map((c) => (
                      <PhoneInput.CountryItem key={c.code} value={c}>
                        <PhoneInput.CountryItemFlag>
                          <img src={getFlagUrl(c.code)} alt="" />
                        </PhoneInput.CountryItemFlag>
                        <PhoneInput.CountryItemText>
                          {c.name} ({c.dialCode})
                        </PhoneInput.CountryItemText>
                        <PhoneInput.CountryItemIndicator />
                      </PhoneInput.CountryItem>
                    ))}
                  </PhoneInput.CountryList>
                </PhoneInput.CountryPopup>
              </PhoneInput.CountryPositioner>
            </PhoneInput.CountryPortal>
          </PhoneInput.CountrySelect>
          <PhoneInput.Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
          />
        </PhoneInput.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Invalid
        </span>
        <PhoneInput.Root invalid>
          <PhoneInput.CountrySelect value={invalidCountry} onValueChange={(v) => v && setInvalidCountry(v)}>
            <PhoneInput.CountryTrigger aria-label="Select country">
              <PhoneInput.CountryValue>
                {(c: PhoneCountry) => (
                  <>
                    <PhoneInput.CountryValueFlag>
                      <img src={getFlagUrl(c.code)} alt="" />
                    </PhoneInput.CountryValueFlag>
                    <span>{c.dialCode}</span>
                  </>
                )}
              </PhoneInput.CountryValue>
              <PhoneInput.CountryIcon />
            </PhoneInput.CountryTrigger>
            <PhoneInput.CountryPortal>
              <PhoneInput.CountryPositioner>
                <PhoneInput.CountryPopup>
                  <PhoneInput.CountryList>
                    {phoneCountries.map((c) => (
                      <PhoneInput.CountryItem key={c.code} value={c}>
                        <PhoneInput.CountryItemFlag>
                          <img src={getFlagUrl(c.code)} alt="" />
                        </PhoneInput.CountryItemFlag>
                        <PhoneInput.CountryItemText>
                          {c.name} ({c.dialCode})
                        </PhoneInput.CountryItemText>
                        <PhoneInput.CountryItemIndicator />
                      </PhoneInput.CountryItem>
                    ))}
                  </PhoneInput.CountryList>
                </PhoneInput.CountryPopup>
              </PhoneInput.CountryPositioner>
            </PhoneInput.CountryPortal>
          </PhoneInput.CountrySelect>
          <PhoneInput.Input
            value={invalidPhone}
            onChange={(e) => setInvalidPhone(e.target.value)}
            placeholder="Enter phone"
          />
        </PhoneInput.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <PhoneInput.Root disabled>
          <PhoneInput.CountrySelect value={phoneCountries[0]}>
            <PhoneInput.CountryTrigger aria-label="Select country">
              <PhoneInput.CountryValue>
                {(c: PhoneCountry) => (
                  <>
                    <PhoneInput.CountryValueFlag>
                      <img src={getFlagUrl(c.code)} alt="" />
                    </PhoneInput.CountryValueFlag>
                    <span>{c.dialCode}</span>
                  </>
                )}
              </PhoneInput.CountryValue>
              <PhoneInput.CountryIcon />
            </PhoneInput.CountryTrigger>
            <PhoneInput.CountryPortal>
              <PhoneInput.CountryPositioner>
                <PhoneInput.CountryPopup>
                  <PhoneInput.CountryList>
                    {phoneCountries.map((c) => (
                      <PhoneInput.CountryItem key={c.code} value={c}>
                        <PhoneInput.CountryItemFlag>
                          <img src={getFlagUrl(c.code)} alt="" />
                        </PhoneInput.CountryItemFlag>
                        <PhoneInput.CountryItemText>
                          {c.name} ({c.dialCode})
                        </PhoneInput.CountryItemText>
                        <PhoneInput.CountryItemIndicator />
                      </PhoneInput.CountryItem>
                    ))}
                  </PhoneInput.CountryList>
                </PhoneInput.CountryPopup>
              </PhoneInput.CountryPositioner>
            </PhoneInput.CountryPortal>
          </PhoneInput.CountrySelect>
          <PhoneInput.Input placeholder="Enter phone" />
        </PhoneInput.Root>
      </div>
    </div>
  );
}

function ComboboxExamples() {
  // Use the useFilter hook for filtering support
  const filter = Combobox.useFilter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
      {/* Single Select with filtering */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Single Select
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* With Clear Button (shows next to chevron when value exists) */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Clear Button
        </span>
        <Combobox.Root items={fruits} defaultValue="Apple" filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Clear aria-label="Clear selection" />
              <Combobox.Trigger aria-label="Open popup" />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* With Trailing Icons */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Trailing Icons
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item 
                      key={item} 
                      value={item}
                      trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* With Leading Icons (indicator on right) */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Leading Icons
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item 
                      key={item} 
                      value={item}
                      leadingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* Multi Select - no chevron per Figma spec and Base UI pattern */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Multi Select
        </span>
        <Combobox.Root items={fruits} multiple filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Chips>
              <Combobox.Value>
                {(values: string[]) => (
                  <>
                    {values?.map((value) => (
                      <Combobox.Chip key={value} aria-label={value}>
                        {value}
                        <Combobox.ChipRemove />
                      </Combobox.Chip>
                    ))}
                    {/* Input is INSIDE Value - clicking anywhere opens popup */}
                    <Combobox.Input placeholder={values?.length > 0 ? '' : 'Select fruits...'} />
                  </>
                )}
              </Combobox.Value>
            </Combobox.Chips>
            {/* No ActionButtons/Trigger for multi-select - per Figma spec */}
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemCheckbox />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* Disabled */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <Combobox.Root items={fruits} disabled filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Disabled combobox..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>
    </div>
  );
}

// Table example data
interface TablePerson {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const tableData: TablePerson[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Engineer', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', status: 'active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Manager', status: 'inactive' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Engineer', status: 'active' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Designer', status: 'active' },
];

const tableColumnHelper = createColumnHelper<TablePerson>();

function TableExamples() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const columns = [
    tableColumnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Table.CheckboxWrapper>
          <label style={{ display: 'flex', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all"
              style={{ 
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            />
            <Checkbox.Indicator
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
            />
          </label>
        </Table.CheckboxWrapper>
      ),
      cell: ({ row }) => (
        <Table.CheckboxWrapper>
          <label style={{ display: 'flex', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select row"
              style={{ 
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            />
            <Checkbox.Indicator checked={row.getIsSelected()} />
          </label>
        </Table.CheckboxWrapper>
      ),
      meta: { variant: 'checkbox' as const },
    }),
    tableColumnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <Table.CellContent
          label={info.getValue()}
          description={info.row.original.email}
        />
      ),
      enableSorting: true,
    }),
    tableColumnHelper.accessor('role', {
      header: 'Role',
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    tableColumnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <Badge variant={info.getValue() === 'active' ? 'green' : 'gray'}>
          {info.getValue()}
        </Badge>
      ),
      enableSorting: false,
      meta: { align: 'right' as const },
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
    enableRowSelection: true,
  });

  const hasSelection = Object.keys(rowSelection).length > 0;

  return (
    <div style={{ marginBottom: '128px' }}>
      <Table.Root hasSelection={hasSelection}>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell
                  key={header.id}
                  variant={(header.column.columnDef.meta as { variant?: 'checkbox' })?.variant}
                  sortable={header.column.getCanSort()}
                  sortDirection={header.column.getIsSorted() || undefined}
                  onSort={header.column.getToggleSortingHandler()}
                  align={(header.column.columnDef.meta as { align?: 'left' | 'right' })?.align}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.HeaderCell>
              ))}
            </Table.HeaderRow>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row, index) => (
            <Table.Row
              key={row.id}
              selected={row.getIsSelected()}
              last={index === table.getRowModel().rows.length - 1}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  variant={(cell.column.columnDef.meta as { variant?: 'checkbox' })?.variant}
                  align={(cell.column.columnDef.meta as { align?: 'left' | 'right' })?.align}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <Logo height={24} aria-label="Lightspark" style={{ marginBottom: '2rem' }} />
      <h1>Origin</h1>
      <p style={{ marginBottom: '2rem' }}>Design system rebuild — Base UI + Figma-first approach.</p>
      
      <h2 style={{ marginBottom: '1rem' }}>Accordion Component</h2>
      
      <Accordion.Root defaultValue={['item-1']} style={{ marginBottom: '128px' }}>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>What is Origin?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Origin is a design system that combines Base UI for accessibility 
            and behavior with Figma Dev Mode CSS for pixel-perfect styling.
          </Accordion.Panel>
        </Accordion.Item>
        
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>How does it work?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Components are designed in Figma using tokenized properties. 
            The Figma lint plugin validates structure against Base UI anatomy.
            CSS is extracted from Dev Mode and transformed to use semantic tokens.
          </Accordion.Panel>
        </Accordion.Item>
        
        <Accordion.Item value="item-3">
          <Accordion.Header>
            <Accordion.Trigger>Why this approach?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            This approach ensures perfect design-to-code fidelity while 
            maintaining full accessibility through Base UI primitives.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
      
      <h2 style={{ marginBottom: '1rem' }}>Action Bar Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <ActionBar>
          <ActionBarLabel>4 transactions selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="default">
              Clear
            </Button>
            <Button variant="filled" size="default" leadingIcon={<CentralIcon name="IconArrowOutOfBox" size={16} />}>
              Export
            </Button>
          </ActionBarActions>
        </ActionBar>
        
        <ActionBar>
          <ActionBarLabel>3 users selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="default">
              Cancel
            </Button>
            <Button variant="critical" size="default">
              Delete users
            </Button>
          </ActionBarActions>
        </ActionBar>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Alert Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <Alert variant="default" title="Title" description="Description here." />
        <Alert variant="critical" title="Title" description="Description here." />
        <Alert variant="default" title="Title only alert" />
        <Alert variant="default" title="No icon alert" description="This alert has no icon." icon={false} />
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Alert Dialog Component</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '128px' }}>
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button variant="outline" />}>
            Open Alert Dialog
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Delete Item?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. The item will be permanently removed from your account.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="outline" />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close render={<Button variant="filled" />}>
                  Delete
                </AlertDialog.Close>
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
        
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button variant="critical" />}>
            Destructive Action
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This will permanently delete your account and all associated data.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="outline" />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close render={<Button variant="critical" />}>
                  Delete Account
                </AlertDialog.Close>
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Autocomplete Component</h2>
      
      <AutocompleteExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Badge Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '14px' }}>Subtle:</span>
          <Badge variant="gray">Label</Badge>
          <Badge variant="purple">Label</Badge>
          <Badge variant="blue">Label</Badge>
          <Badge variant="sky">Label</Badge>
          <Badge variant="pink">Label</Badge>
          <Badge variant="green">Label</Badge>
          <Badge variant="yellow">Label</Badge>
          <Badge variant="red">Label</Badge>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '14px' }}>Vibrant:</span>
          <Badge variant="gray" vibrant>Label</Badge>
          <Badge variant="purple" vibrant>Label</Badge>
          <Badge variant="blue" vibrant>Label</Badge>
          <Badge variant="sky" vibrant>Label</Badge>
          <Badge variant="pink" vibrant>Label</Badge>
          <Badge variant="green" vibrant>Label</Badge>
          <Badge variant="yellow" vibrant>Label</Badge>
          <Badge variant="red" vibrant>Label</Badge>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Breadcrumb Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Default</span>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Shoes</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>With Collapsed Items</span>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products/shoes/running">Running</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Trail Runners</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Custom Separator</span>
          <Breadcrumb.Root>
            <Breadcrumb.List separator="/">
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Shoes</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Button Component</h2>
      
      {/* Variants */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="filled">Filled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="critical">Critical</Button>
        <Button variant="link">Link</Button>
      </div>
      
      {/* Sizes */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button size="compact">Compact</Button>
        <Button size="default">Default</Button>
      </div>
      
      {/* With Icons */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button leadingIcon={<CentralIcon name="IconArrowLeft" size={16} />}>Back</Button>
        <Button trailingIcon={<CentralIcon name="IconArrowRight" size={16} />}>Next</Button>
        <Button 
          leadingIcon={<CentralIcon name="IconArrowLeft" size={16} />}
          trailingIcon={<CentralIcon name="IconArrowRight" size={16} />}
        >
          Both
        </Button>
      </div>
      
      {/* Icon Only */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button size="compact" iconOnly leadingIcon={<CentralIcon name="IconPlusSmall" size={16} />} aria-label="Add" />
        <Button size="default" iconOnly leadingIcon={<CentralIcon name="IconPlusSmall" size={16} />} aria-label="Add" />
      </div>
      
      {/* States */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      
      {/* Link Variant */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '128px' }}>
        <span style={{ fontSize: '14px', color: '#7c7c7c' }}>Link:</span>
        <Button variant="link">Learn more</Button>
        <Button variant="link" size="compact">Compact link</Button>
        <Button variant="link" disabled>Disabled link</Button>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Card Component</h2>
      
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '128px' }}>
        <Card.Root variant="structured" style={{ width: 360 }}>
          <Card.Header>
            <Card.TitleGroup>
              <Card.Title>Structured</Card.Title>
              <Card.Subtitle>With card surface</Card.Subtitle>
            </Card.TitleGroup>
          </Card.Header>
          <Card.Body>
            <p>Body content with sectioned layout.</p>
          </Card.Body>
          <Card.Footer>
            <Button>Button</Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root variant="simple" style={{ width: 360 }}>
          <Card.TitleGroup>
            <Card.Title>Simple</Card.Title>
            <Card.Subtitle>No card surface</Card.Subtitle>
          </Card.TitleGroup>
          <Card.Body>
            <p>Body content with uniform padding.</p>
          </Card.Body>
          <Button>Button</Button>
        </Card.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Checkbox Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '128px' }}>
        {/* Default variant */}
        <Checkbox.Field>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group defaultValue={['opt1']}>
            <Checkbox.Item value="opt1" label="Label" description="Description goes here." />
            <Checkbox.Item value="opt2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Description>Help text goes here.</Checkbox.Description>
        </Checkbox.Field>

        {/* Card variant */}
        <Checkbox.Field style={{ width: 280 }}>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group defaultValue={['card1']} variant="card">
            <Checkbox.Item value="card1" label="Label" description="Description goes here." />
            <Checkbox.Item value="card2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Description>Help text goes here.</Checkbox.Description>
        </Checkbox.Field>

        {/* Critical state */}
        <Checkbox.Field invalid style={{ width: 280 }}>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group variant="card">
            <Checkbox.Item value="err1" label="Label" description="Description goes here." />
            <Checkbox.Item value="err2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Error match>Error text goes here.</Checkbox.Error>
        </Checkbox.Field>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Chip Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Default MD</span>
          <Chip onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Default SM</span>
          <Chip size="sm" onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Filter MD</span>
          <ChipFilter property="Status" operator="is" value="Active" onDismiss={() => console.log('dismissed')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Filter SM</span>
          <ChipFilter size="sm" property="Status" operator="is" value="Active" onDismiss={() => console.log('dismissed')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled</span>
          <Chip disabled onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>No dismiss</span>
          <Chip>label</Chip>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Combobox Component</h2>
      
      <ComboboxExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Command Component</h2>
      
      <CommandDemo />
      
      <h2 style={{ marginBottom: '1rem' }}>Context Menu Component</h2>
      
      <ContextMenuExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Field Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px', width: '256px' }}>
        <Field.Root>
          <Field.Label>Default</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root>
          <Field.Label>Filled</Field.Label>
          <Input defaultValue="Content" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Disabled</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Invalid</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Error>Error text goes here.</Field.Error>
        </Field.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Fieldset Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', width: '256px' }}>
        <Fieldset.Root>
          <Fieldset.Legend>Personal Information</Fieldset.Legend>
          <Field.Root name="firstName">
            <Field.Label>First Name</Field.Label>
            <Input placeholder="Enter first name" />
            <Field.Description>Your legal first name.</Field.Description>
          </Field.Root>
          <Field.Root name="lastName">
            <Field.Label>Last Name</Field.Label>
            <Input placeholder="Enter last name" />
            <Field.Description>Your legal last name.</Field.Description>
          </Field.Root>
        </Fieldset.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Form Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', width: '256px' }}>
        <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="Enter your email" />
            <Field.Description>We'll never share your email.</Field.Description>
          </Field.Root>
          <Field.Root name="password">
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="Enter your password" />
          </Field.Root>
          <Button type="submit">Sign In</Button>
        </Form>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Input Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px', maxWidth: '256px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Default</span>
          <Input placeholder="Placeholder" />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Filled</span>
          <Input defaultValue="Content" />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Disabled</span>
          <Input placeholder="Placeholder" disabled />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Read Only</span>
          <Input defaultValue="Read only content" readOnly />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Item Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '128px', maxWidth: '400px' }}>
        <Item
          title="Account settings"
          description="Manage your account"
          leading={<CentralIcon name="IconSettingsGear1" size={24} />}
          trailing={<CentralIcon name="IconChevronRightSmall" size={20} />}
          onClick={() => console.log('clicked')}
        />
        <Item
          title="Notifications"
          description="Configure alerts"
          leading={<CentralIcon name="IconBell" size={24} />}
          trailing={<Switch size="sm" />}
          clickable={false}
        />
        <Item
          title="Selected option"
          selected
          trailing={<CentralIcon name="IconCheckmark2Small" size={24} />}
          onClick={() => console.log('clicked')}
        />
        <Item
          title="Disabled item"
          description="This item is disabled"
          disabled
        />
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Loader Component</h2>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '128px' }}>
        <Loader />
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Logo Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Lightspark Logo Regular</span>
          <Logo variant="logo" weight="regular" aria-label="Lightspark" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Lightspark Logo Light</span>
          <Logo variant="logo" weight="light" aria-label="Lightspark" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Lightspark Logomark Regular</span>
          <Logo variant="logomark" weight="regular" aria-label="Lightspark" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Lightspark Logomark Light</span>
          <Logo variant="logomark" weight="light" aria-label="Lightspark" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Lightspark Wordmark</span>
          <Logo variant="wordmark" aria-label="Lightspark" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Grid Logo</span>
          <Logo brand="grid" variant="logo" aria-label="Grid" />
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Grid Logomark</span>
          <Logo brand="grid" variant="logomark" aria-label="Grid" />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Menu Component</h2>
      
      <MenuExamples />

      <h2 style={{ marginBottom: '1rem' }}>Menubar Component</h2>

      <MenubarDemo />

      <h2 style={{ marginBottom: '1rem' }}>Meter Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '240px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Storage (50%)
          </span>
          <Meter.Root value={50}>
            <Meter.Label>Storage used</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Low (25%)
          </span>
          <Meter.Root value={25}>
            <Meter.Label>Battery level</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            High (90%)
          </span>
          <Meter.Root value={90}>
            <Meter.Label>Disk space</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Track Only
          </span>
          <Meter.Root value={65}>
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Navigation Menu Component</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Dropdown
          </span>
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  Products
                  <NavigationMenu.Icon>
                    <CentralIcon name="IconChevronDownSmall" size={16} />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconGlobe2" size={16} />
                    Dashboard
                  </NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconGlobe2" size={16} />
                    Analytics
                  </NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconGlobe2" size={16} />
                    Reports
                  </NavigationMenu.PopupItem>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  Resources
                  <NavigationMenu.Icon>
                    <CentralIcon name="IconChevronDownSmall" size={16} />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.PopupItem>Documentation</NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>API Reference</NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>Blog</NavigationMenu.PopupItem>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.Portal>
              <NavigationMenu.Positioner>
                <NavigationMenu.Popup>
                  <NavigationMenu.Viewport />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Links Only
          </span>
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#" active>About</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Group Labels
          </span>
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>
                  Products
                  <NavigationMenu.Icon>
                    <CentralIcon name="IconChevronDownSmall" size={16} />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Group>
                    <NavigationMenu.GroupLabel>Analytics</NavigationMenu.GroupLabel>
                    <NavigationMenu.PopupItem>
                      <CentralIcon name="IconGlobe2" size={16} />
                      Dashboard
                    </NavigationMenu.PopupItem>
                    <NavigationMenu.PopupItem>
                      <CentralIcon name="IconGlobe2" size={16} />
                      Reports
                    </NavigationMenu.PopupItem>
                  </NavigationMenu.Group>
                  <NavigationMenu.Separator />
                  <NavigationMenu.Group>
                    <NavigationMenu.GroupLabel>Settings</NavigationMenu.GroupLabel>
                    <NavigationMenu.PopupItem>
                      <CentralIcon name="IconSettingsGear1" size={16} />
                      Preferences
                    </NavigationMenu.PopupItem>
                    <NavigationMenu.PopupItem>
                      <CentralIcon name="IconSettingsGear1" size={16} />
                      Account
                    </NavigationMenu.PopupItem>
                  </NavigationMenu.Group>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.Portal>
              <NavigationMenu.Positioner>
                <NavigationMenu.Popup>
                  <NavigationMenu.Viewport />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Actions
          </span>
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#" active>Dashboard</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Settings</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.ActionIcon aria-label="Notifications">
                  <CentralIcon name="IconBell" size={20} />
                </NavigationMenu.ActionIcon>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.ActionIcon aria-label="Settings">
                  <CentralIcon name="IconSettingsGear1" size={20} />
                </NavigationMenu.ActionIcon>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Action onClick={() => alert('Signed out!')}>
                  Sign Out
                </NavigationMenu.Action>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Pagination Component</h2>
      
      <PaginationDemo />
      
      <div style={{ marginBottom: '128px' }} />
      
      <h2 style={{ marginBottom: '1rem' }}>Phone Input Component</h2>
      
      <PhoneInputDemo />
      
      <div style={{ marginBottom: '128px' }} />
      
      <h2 style={{ marginBottom: '1rem' }}>Progress Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '240px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default (50%)
          </span>
          <Progress.Root value={50}>
            <Progress.Label>Export data</Progress.Label>
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Complete (100%)
          </span>
          <Progress.Root value={100}>
            <Progress.Label>Upload complete</Progress.Label>
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Indeterminate
          </span>
          <Progress.Root value={null}>
            <Progress.Label>Loading...</Progress.Label>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Track Only
          </span>
          <Progress.Root value={75}>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Radio Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '128px' }}>
        {/* Default variant */}
        <Radio.Field>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group defaultValue="opt1">
            <Radio.Item value="opt1" label="Label" description="Description goes here." />
            <Radio.Item value="opt2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Description>Help text goes here.</Radio.Description>
        </Radio.Field>

        {/* Card variant */}
        <Radio.Field style={{ width: 280 }}>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group defaultValue="card1" variant="card">
            <Radio.Item value="card1" label="Label" description="Description goes here." />
            <Radio.Item value="card2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Description>Help text goes here.</Radio.Description>
        </Radio.Field>

        {/* Critical state */}
        <Radio.Field invalid style={{ width: 280 }}>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group variant="card">
            <Radio.Item value="err1" label="Label" description="Description goes here." />
            <Radio.Item value="err2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Error match>Error text goes here.</Radio.Error>
        </Radio.Field>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Select Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default
          </span>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Select a fruit" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="apple">
                      <Select.ItemIndicator />
                      <Select.ItemText>Apple</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="banana">
                      <Select.ItemIndicator />
                      <Select.ItemText>Banana</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="orange">
                      <Select.ItemIndicator />
                      <Select.ItemText>Orange</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Groups
          </span>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Select food" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="apple">
                      <Select.ItemIndicator />
                      <Select.ItemText>Apple</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="banana">
                      <Select.ItemIndicator />
                      <Select.ItemText>Banana</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                  <Select.Separator />
                  <Select.Group>
                    <Select.GroupLabel>Vegetables</Select.GroupLabel>
                    <Select.List>
                      <Select.Item value="carrot">
                        <Select.ItemIndicator />
                        <Select.ItemText>Carrot</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="broccoli">
                        <Select.ItemIndicator />
                        <Select.ItemText>Broccoli</Select.ItemText>
                      </Select.Item>
                    </Select.List>
                  </Select.Group>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Trailing Icons
          </span>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Select a country" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="us" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                      <Select.ItemIndicator />
                      <Select.ItemText>United States</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="uk" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                      <Select.ItemIndicator />
                      <Select.ItemText>United Kingdom</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="de" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                      <Select.ItemIndicator />
                      <Select.ItemText>Germany</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Disabled
          </span>
          <Select.Root disabled>
            <Select.Trigger>
              <Select.Value placeholder="Select a fruit" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="apple">
                      <Select.ItemIndicator />
                      <Select.ItemText>Apple</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Multi Select
          </span>
          <Select.Root multiple defaultValue={['apple', 'banana']}>
            <Select.Trigger>
              <Select.Value>
                {(selected: string[]) => {
                  if (selected.length === 0) {
                    return <span data-placeholder="">Select fruits</span>;
                  }
                  const labels: Record<string, string> = { apple: 'Apple', banana: 'Banana', orange: 'Orange' };
                  const first = labels[selected[0]];
                  return selected.length === 1 ? first : `${first} +${selected.length - 1}`;
                }}
              </Select.Value>
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="apple">
                      <Select.ItemIndicator />
                      <Select.ItemText>Apple</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="banana">
                      <Select.ItemIndicator />
                      <Select.ItemText>Banana</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="orange">
                      <Select.ItemIndicator />
                      <Select.ItemText>Orange</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Ghost Variant (for navbars/toolbars)
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Environment:</span>
            <Select.Root defaultValue="production">
              <Select.Trigger variant="ghost">
                <Select.Value>
                  {(value: string) => {
                    const labels: Record<string, string> = { production: 'Production', sandbox: 'Sandbox', staging: 'Staging' };
                    return labels[value] || value;
                  }}
                </Select.Value>
                <Select.GhostIcon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.List>
                      <Select.Item value="production">
                        <Select.ItemText>Production</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                      <Select.Item value="sandbox">
                        <Select.ItemText>Sandbox</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                      <Select.Item value="staging">
                        <Select.ItemText>Staging</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Ghost Disabled
          </span>
          <Select.Root disabled defaultValue="production">
            <Select.Trigger variant="ghost">
              <Select.Value>
                {(value: string) => {
                  const labels: Record<string, string> = { production: 'Production', sandbox: 'Sandbox', staging: 'Staging' };
                  return labels[value] || value;
                }}
              </Select.Value>
              <Select.GhostIcon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="production">
                      <Select.ItemText>Production</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Separator Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '300px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default (1px)
          </span>
          <Separator />
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Hairline (0.5px)
          </span>
          <Separator variant="hairline" />
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Vertical in Navigation
          </span>
          <nav style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '32px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a>
            <Separator orientation="vertical" />
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Log in</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Sign up</a>
          </nav>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Vertical Hairline
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '32px' }}>
            <span>Left</span>
            <Separator orientation="vertical" variant="hairline" />
            <span>Right</span>
          </div>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Shortcut Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Single Key</span>
          <Shortcut keys={['⌘']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Two Keys</span>
          <Shortcut keys={['⌘', 'K']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Three Keys</span>
          <Shortcut keys={['⌘', '⇧', 'P']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Common</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'C']} /> Copy
            </span>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'V']} /> Paste
            </span>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'Z']} /> Undo
            </span>
          </div>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Switch Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>SM Off</span>
          <Switch size="sm" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>SM On</span>
          <Switch size="sm" defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>MD Off</span>
          <Switch size="md" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>MD On</span>
          <Switch size="md" defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled Off</span>
          <Switch size="md" disabled />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled On</span>
          <Switch size="md" disabled defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Read Only</span>
          <Switch size="md" readOnly defaultChecked />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Table Component</h2>
      
      <TableExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Tabs Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default Variant
          </span>
          <Tabs.Root defaultValue="account" style={{ maxWidth: '400px' }}>
            <Tabs.List>
              <Tabs.Indicator />
              <Tabs.Tab value="account">Account</Tabs.Tab>
              <Tabs.Tab value="password">Password</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="account">
              Manage your account settings and preferences.
            </Tabs.Panel>
            <Tabs.Panel value="password">
              Change your password and security options.
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              Configure application settings.
            </Tabs.Panel>
          </Tabs.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Minimal Variant
          </span>
          <Tabs.Root defaultValue="overview" style={{ maxWidth: '400px' }}>
            <Tabs.List variant="minimal">
              <Tabs.Indicator />
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="details">Details</Tabs.Tab>
              <Tabs.Tab value="history">History</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              Overview content without container background.
            </Tabs.Panel>
            <Tabs.Panel value="details">
              Details content.
            </Tabs.Panel>
            <Tabs.Panel value="history">
              History content.
            </Tabs.Panel>
          </Tabs.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Disabled Tab
          </span>
          <Tabs.Root defaultValue="active" style={{ maxWidth: '400px' }}>
            <Tabs.List>
              <Tabs.Indicator />
              <Tabs.Tab value="active">Active</Tabs.Tab>
              <Tabs.Tab value="disabled" disabled>Disabled</Tabs.Tab>
              <Tabs.Tab value="another">Another</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="active">
              This tab is active.
            </Tabs.Panel>
            <Tabs.Panel value="disabled">
              This panel cannot be accessed.
            </Tabs.Panel>
            <Tabs.Panel value="another">
              Another tab content.
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Toast Component</h2>
      
      <Toast.Provider>
        <ToastDemo />
        <Toast.Portal>
          <Toast.Viewport>
            <ToastRenderer />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
      
      <div style={{ marginBottom: '128px' }} />
      
      <h2 style={{ marginBottom: '1rem' }}>Tooltip Component</h2>
      
      <Tooltip.Provider>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '128px', alignItems: 'center' }}>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant="outline">Hover me</Button>} />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  This is a tooltip
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant="outline">Long text</Button>} />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  This is a longer tooltip that demonstrates text wrapping within the max-width constraint.
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <button
                  aria-label="Info"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <CentralIcon name="IconCircleInfo" size={20} />
                </button>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  Icon trigger tooltip
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </Tooltip.Provider>
    </main>
  );
}
