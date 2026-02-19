import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, ToggleGroup } from './Toggle';
import { CentralIcon } from '../Icon/CentralIcon';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    'aria-label': 'Toggle',
  },
};

export const WithIcon: Story = {
  args: {
    children: <CentralIcon name="IconBell" size={18} />,
    'aria-label': 'Notifications',
  },
};

export const PressedByDefault: Story = {
  args: {
    children: 'Active',
    defaultPressed: true,
    'aria-label': 'Active toggle',
  },
};

export const Group: Story = {
  render: () => (
    <ToggleGroup>
      <Toggle aria-label="Bold">B</Toggle>
      <Toggle aria-label="Italic">I</Toggle>
      <Toggle aria-label="Underline">U</Toggle>
    </ToggleGroup>
  ),
};
