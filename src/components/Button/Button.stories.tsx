import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'ghost', 'critical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    children: 'Delete',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button
        iconLeft={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        }
      >
        Back
      </Button>
      <Button
        iconRight={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        }
      >
        Next
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button iconOnly size="sm" aria-label="Add">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
      <Button iconOnly size="md" aria-label="Add">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
      <Button iconOnly size="lg" aria-label="Add">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="filled">Filled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="critical">Critical</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="filled" disabled>Filled</Button>
        <Button variant="outline" disabled>Outline</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="critical" disabled>Critical</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="filled" loading>Filled</Button>
        <Button variant="outline" loading>Outline</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="critical" loading>Critical</Button>
      </div>
    </div>
  ),
};

