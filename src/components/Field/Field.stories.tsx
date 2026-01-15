import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Field } from './';
import { Input } from '@/components/Input';

const meta: Meta<typeof Field.Root> = {
  title: 'Components/Field',
  component: Field.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Field.Root>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '256px' }}>
      <Field.Root {...args}>
        <Field.Label>Email</Field.Label>
        <Input placeholder="Enter your email" />
        <Field.Description>We'll never share your email.</Field.Description>
      </Field.Root>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div style={{ width: '256px' }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input placeholder="Enter your email" size="lg" />
        <Field.Description>We'll never share your email.</Field.Description>
      </Field.Root>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: '256px' }}>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input placeholder="Enter your email" />
        <Field.Error>Please enter a valid email address.</Field.Error>
      </Field.Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '256px' }}>
      <Field.Root disabled>
        <Field.Label>Email</Field.Label>
        <Input placeholder="Enter your email" />
        <Field.Description>This field is disabled.</Field.Description>
      </Field.Root>
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ width: '256px' }}>
      <Field.Root>
        <Input placeholder="Search..." />
        <Field.Description>Enter a search term.</Field.Description>
      </Field.Root>
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div style={{ width: '256px' }}>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Input type="password" placeholder="Enter password" />
      </Field.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledField() {
    const [value, setValue] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setInvalid(newValue.length > 0 && !newValue.includes('@'));
    };

    return (
      <div style={{ width: '256px' }}>
        <Field.Root invalid={invalid}>
          <Field.Label>Email</Field.Label>
          <Input
            value={value}
            onValueChange={handleValueChange}
            placeholder="Enter email"
          />
          {!invalid && <Field.Description>Enter a valid email.</Field.Description>}
          {invalid && <Field.Error>Email must contain @</Field.Error>}
        </Field.Root>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '256px' }}>
        <Field.Root>
          <Field.Label>Default (LG)</Field.Label>
          <Input size="lg" placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root>
          <Field.Label>Filled (LG)</Field.Label>
          <Input size="lg" defaultValue="Content" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Disabled (LG)</Field.Label>
          <Input size="lg" placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Invalid (LG)</Field.Label>
          <Input size="lg" placeholder="Placeholder" />
          <Field.Error>Error text goes here.</Field.Error>
        </Field.Root>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '256px' }}>
        <Field.Root>
          <Field.Label>Default (MD)</Field.Label>
          <Input size="md" placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root>
          <Field.Label>Filled (MD)</Field.Label>
          <Input size="md" defaultValue="Content" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Disabled (MD)</Field.Label>
          <Input size="md" placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Invalid (MD)</Field.Label>
          <Input size="md" placeholder="Placeholder" />
          <Field.Error>Error text goes here.</Field.Error>
        </Field.Root>
      </div>
    </div>
  ),
};
