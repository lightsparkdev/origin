import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta = {
  title: 'Components/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentStyle = { padding: 'var(--spacing-md)', maxWidth: 280 };

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>
        Open Popover
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <div style={contentStyle}>
              <Popover.Title style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Popover Title</Popover.Title>
              <Popover.Description style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                This is a basic popover with a title and description.
              </Popover.Description>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>
        With Arrow
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Arrow />
            <div style={contentStyle}>
              <Popover.Title style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Arrow Popover</Popover.Title>
              <Popover.Description style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                This popover includes an arrow pointing to the trigger.
              </Popover.Description>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>
        Dismissable
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <div style={contentStyle}>
              <Popover.Title style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Dismissable Popover</Popover.Title>
              <Popover.Description style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                Click the close button or outside to dismiss.
              </Popover.Description>
              <div style={{ marginTop: 12 }}>
                <Popover.Close render={<Button variant="outline" size="compact" />}>
                  Close
                </Popover.Close>
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const OpenByDefault: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger render={<Button variant="outline" />}>
        Already Open
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <div style={contentStyle}>
              <Popover.Title style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>Open by Default</Popover.Title>
              <Popover.Description style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                This popover renders in its open state.
              </Popover.Description>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};
