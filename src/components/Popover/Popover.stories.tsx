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

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>
        Open Popover
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is a basic popover with a title and description.
            </Popover.Description>
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
            <Popover.Title>Arrow Popover</Popover.Title>
            <Popover.Description>
              This popover includes an arrow pointing to the trigger.
            </Popover.Description>
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
            <Popover.Title>Dismissable Popover</Popover.Title>
            <Popover.Description>
              Click the close button or outside to dismiss.
            </Popover.Description>
            <Popover.Close render={<Button variant="outline" />}>
              Close
            </Popover.Close>
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
            <Popover.Title>Open by Default</Popover.Title>
            <Popover.Description>
              This popover renders in its open state.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};
