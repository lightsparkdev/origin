import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Command } from './index';
import { CentralIcon } from '../Icon';
import { Shortcut } from '../Shortcut';

const meta: Meta = {
  title: 'Components/Command',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default command palette with a trigger button.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Command.Root open={open} onOpenChange={setOpen}>
        <Command.Trigger>Type a command or search...</Command.Trigger>
        <Command.Portal>
          <Command.Backdrop />
          <Command.Popup>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
              <Command.Item onSelect={() => setOpen(false)}>
                <CentralIcon name="IconCalendar" size={16} />
                Calendar
              </Command.Item>
              <Command.Item onSelect={() => setOpen(false)}>
                <CentralIcon name="IconSearch" size={16} />
                Search Emoji
              </Command.Item>
              <Command.Item onSelect={() => setOpen(false)}>
                <CentralIcon name="IconCalculator" size={16} />
                Calculator
              </Command.Item>
            </Command.List>
            <Command.Empty>No results found.</Command.Empty>
          </Command.Popup>
        </Command.Portal>
      </Command.Root>
    );
  },
};

/**
 * Command palette with grouped items.
 */
export const WithGroups: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Command.Root open={open} onOpenChange={setOpen}>
        <Command.Trigger>Open Command Palette</Command.Trigger>
        <Command.Portal>
          <Command.Backdrop />
          <Command.Popup>
            <Command.Input placeholder="What do you need?" />
            <Command.List>
              <Command.Group heading="Suggestions">
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconCalendar" size={16} />
                  Calendar
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconSearch" size={16} />
                  Search Emoji
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconCalculator" size={16} />
                  Calculator
                </Command.Item>
              </Command.Group>
              <Command.Separator />
              <Command.Group heading="Settings">
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconUser" size={16} />
                  Profile
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconCreditCard" size={16} />
                  Billing
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconSettings" size={16} />
                  Settings
                </Command.Item>
              </Command.Group>
            </Command.List>
            <Command.Empty>No results found.</Command.Empty>
          </Command.Popup>
        </Command.Portal>
      </Command.Root>
    );
  },
};

/**
 * Command with shortcuts displayed.
 */
export const WithShortcuts: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Command.Root open={open} onOpenChange={setOpen}>
        <Command.Trigger>
          Open Command Palette
          <Shortcut keys={['⌘', 'K']} style={{ marginLeft: 'auto' }} />
        </Command.Trigger>
        <Command.Portal>
          <Command.Backdrop />
          <Command.Popup>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
              <Command.Group heading="Actions">
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconCopy" size={16} />
                  <span style={{ flex: 1 }}>Copy</span>
                  <Shortcut keys={['⌘', 'C']} />
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconClipboard" size={16} />
                  <span style={{ flex: 1 }}>Paste</span>
                  <Shortcut keys={['⌘', 'V']} />
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconScissors" size={16} />
                  <span style={{ flex: 1 }}>Cut</span>
                  <Shortcut keys={['⌘', 'X']} />
                </Command.Item>
              </Command.Group>
            </Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Footer>
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </Command.Footer>
          </Command.Popup>
        </Command.Portal>
      </Command.Root>
    );
  },
};

/**
 * Command with disabled items.
 */
export const WithDisabledItems: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Command.Root open={open} onOpenChange={setOpen}>
        <Command.Trigger>Open Command</Command.Trigger>
        <Command.Portal>
          <Command.Backdrop />
          <Command.Popup>
            <Command.Input placeholder="Search..." />
            <Command.List>
              <Command.Item onSelect={() => setOpen(false)}>Enabled Item 1</Command.Item>
              <Command.Item disabled>Disabled Item</Command.Item>
              <Command.Item onSelect={() => setOpen(false)}>Enabled Item 2</Command.Item>
            </Command.List>
            <Command.Empty>No results.</Command.Empty>
          </Command.Popup>
        </Command.Portal>
      </Command.Root>
    );
  },
};

/**
 * Controlled command palette with open state.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const handleSelect = (item: string) => {
      setSelectedItem(item);
      setOpen(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Command.Root open={open} onOpenChange={setOpen}>
          <Command.Trigger>
            {selectedItem ? `Selected: ${selectedItem}` : 'Select an item'}
          </Command.Trigger>
          <Command.Portal>
            <Command.Backdrop />
            <Command.Popup>
              <Command.Input placeholder="Search..." />
              <Command.List>
                <Command.Item onSelect={() => handleSelect('Calendar')}>
                  <CentralIcon name="IconCalendar" size={16} />
                  Calendar
                </Command.Item>
                <Command.Item onSelect={() => handleSelect('Search Emoji')}>
                  <CentralIcon name="IconSearch" size={16} />
                  Search Emoji
                </Command.Item>
                <Command.Item onSelect={() => handleSelect('Calculator')}>
                  <CentralIcon name="IconCalculator" size={16} />
                  Calculator
                </Command.Item>
              </Command.List>
              <Command.Empty>No results.</Command.Empty>
            </Command.Popup>
          </Command.Portal>
        </Command.Root>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Try selecting an item - the selection persists.
        </p>
      </div>
    );
  },
};

/**
 * Matching the Figma design exactly.
 */
export const FigmaDesign: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <Command.Root open={open} onOpenChange={setOpen}>
        <Command.Trigger>Run a command or search</Command.Trigger>
        <Command.Portal>
          <Command.Backdrop />
          <Command.Popup>
            <Command.Input placeholder="Run a command or search" />
            <Command.List>
              <Command.Group heading="Title">
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Command
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Command
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Command
                </Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Command
                </Command.Item>
              </Command.Group>
            </Command.List>
            <Command.Empty>No results.</Command.Empty>
          </Command.Popup>
        </Command.Portal>
      </Command.Root>
    );
  },
};

/**
 * Command with keyword search support.
 */
export const WithKeywords: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Command.Root open={open} onOpenChange={setOpen}>
          <Command.Trigger>Open Command</Command.Trigger>
          <Command.Portal>
            <Command.Backdrop />
            <Command.Popup>
              <Command.Input placeholder="Try searching 'duplicate' or 'clone'" />
              <Command.List>
                <Command.Item keywords={['duplicate', 'clone']} onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconCopy" size={16} />
                  Copy
                </Command.Item>
                <Command.Item keywords={['insert']} onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconClipboard" size={16} />
                  Paste
                </Command.Item>
                <Command.Item keywords={['remove', 'delete']} onSelect={() => setOpen(false)}>
                  <CentralIcon name="IconScissors" size={16} />
                  Cut
                </Command.Item>
              </Command.List>
              <Command.Empty>No results.</Command.Empty>
            </Command.Popup>
          </Command.Portal>
        </Command.Root>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Items have keywords - try searching &quot;duplicate&quot; to find Copy
        </p>
      </div>
    );
  },
};

/**
 * Full-featured Raycast-style command palette.
 */
export const RaycastStyle: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    // Listen for Cmd+K
    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setOpen((o) => !o);
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Command.Root open={open} onOpenChange={setOpen}>
          <Command.Trigger>
            Open Command Palette
            <Shortcut keys={['⌘', 'K']} style={{ marginLeft: 'auto' }} />
          </Command.Trigger>
          <Command.Portal>
            <Command.Backdrop />
            <Command.Popup>
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Group heading="Suggestions">
                  <Command.Item onSelect={() => setOpen(false)}>
                    <CentralIcon name="IconGlobe2" size={16} />
                    <span style={{ flex: 1 }}>Linear</span>
                    <Shortcut keys={['⌘', 'L']} />
                  </Command.Item>
                  <Command.Item onSelect={() => setOpen(false)}>
                    <CentralIcon name="IconGlobe2" size={16} />
                    <span style={{ flex: 1 }}>Figma</span>
                    <Shortcut keys={['⌘', 'F']} />
                  </Command.Item>
                  <Command.Item onSelect={() => setOpen(false)}>
                    <CentralIcon name="IconGlobe2" size={16} />
                    <span style={{ flex: 1 }}>Slack</span>
                    <Shortcut keys={['⌘', 'S']} />
                  </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Commands">
                  <Command.Item keywords={['clipboard']} onSelect={() => setOpen(false)}>
                    <CentralIcon name="IconCopy" size={16} />
                    <span style={{ flex: 1 }}>Clipboard History</span>
                    <Shortcut keys={['⌘', '⇧', 'C']} />
                  </Command.Item>
                  <Command.Item keywords={['preferences']} onSelect={() => setOpen(false)}>
                    <CentralIcon name="IconSettings" size={16} />
                    <span style={{ flex: 1 }}>System Preferences</span>
                    <Shortcut keys={['⌘', ',']} />
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Footer>
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </Command.Footer>
            </Command.Popup>
          </Command.Portal>
        </Command.Root>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Press ⌘K to open the command palette
        </p>
      </div>
    );
  },
};
