import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'lg',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Content',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: true,
    size: 'md',
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'Content',
    disabled: true,
    size: 'md',
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 'Read only content',
    readOnly: true,
    size: 'md',
  },
};

export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '256px' }}>
        <Input
          value={value}
          onValueChange={(v) => setValue(v)}
          placeholder="Type here..."
        />
        <span style={{ fontSize: '12px', color: '#7c7c7c' }}>
          Value: {value || '(empty)'}
        </span>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '256px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          MD Default
        </span>
        <Input size="md" placeholder="Placeholder" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          LG Default
        </span>
        <Input size="lg" placeholder="Placeholder" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          MD Filled
        </span>
        <Input size="md" defaultValue="Content" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          MD Disabled
        </span>
        <Input size="md" placeholder="Placeholder" disabled />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          MD Read Only
        </span>
        <Input size="md" defaultValue="Read only content" readOnly />
      </div>
    </div>
  ),
};
