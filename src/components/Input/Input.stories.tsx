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
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Content',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'Content',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 'Read only content',
    readOnly: true,
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
          Default
        </span>
        <Input placeholder="Placeholder" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          Filled
        </span>
        <Input defaultValue="Content" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          Disabled
        </span>
        <Input placeholder="Placeholder" disabled />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>
          Read Only
        </span>
        <Input defaultValue="Read only content" readOnly />
      </div>
    </div>
  ),
};
