import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible } from './index';
import { CentralIcon } from '../Icon';

const meta: Meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
      <Collapsible.Panel>
        These settings are for experienced users. Adjust with caution.
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const DefaultOpen: StoryObj = {
  render: () => (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Panel>
        This panel starts open by default.
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <Collapsible.Root disabled>
      <Collapsible.Trigger>Cannot toggle</Collapsible.Trigger>
      <Collapsible.Panel>
        This content is locked.
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const HideIcon: StoryObj = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger hideIcon>Show more</Collapsible.Trigger>
      <Collapsible.Panel>
        The trigger has no chevron icon.
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const CustomIcon: StoryObj = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger icon={<CentralIcon name="IconPlus" size={16} />}>
        Expand section
      </Collapsible.Trigger>
      <Collapsible.Panel>
        A custom icon replaces the default chevron.
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const Controlled: StoryObj = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          State: {open ? 'open' : 'closed'}
        </div>
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger>Controlled collapsible</Collapsible.Trigger>
          <Collapsible.Panel>
            The open state is controlled externally.
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    );
  },
};
