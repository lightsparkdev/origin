import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './index';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Card',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Structured: StoryObj = {
  render: () => (
    <Card.Root variant="structured" style={{ width: 360 }}>
      <Card.Header>
        <Card.TitleGroup>
          <Card.Title>Card title</Card.Title>
          <Card.Subtitle>Subtitle goes here.</Card.Subtitle>
        </Card.TitleGroup>
      </Card.Header>
      <Card.Body>
        <p>Slot components in to the body here to extend the functionality of the card.</p>
      </Card.Body>
      <Card.Footer>
        <Button>Button</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const StructuredWithBackButton: StoryObj = {
  render: () => (
    <Card.Root variant="structured" style={{ width: 360 }}>
      <Card.Header>
        <Card.BackButton onClick={() => console.log('Back clicked')} />
        <Card.TitleGroup>
          <Card.Title>Card title</Card.Title>
          <Card.Subtitle>Subtitle goes here.</Card.Subtitle>
        </Card.TitleGroup>
      </Card.Header>
      <Card.Body>
        <p>Slot components in to the body here to extend the functionality of the card.</p>
      </Card.Body>
      <Card.Footer>
        <Button>Button</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const Simple: StoryObj = {
  render: () => (
    <Card.Root variant="simple" style={{ width: 360 }}>
      <Card.TitleGroup>
        <Card.Title>Card title</Card.Title>
        <Card.Subtitle>Subtitle goes here.</Card.Subtitle>
      </Card.TitleGroup>
      <Card.Body>
        <p>Slot components in to the body here to extend the functionality of the card.</p>
      </Card.Body>
      <Button>Button</Button>
    </Card.Root>
  ),
};

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <Card.Root variant="structured" style={{ width: 360 }}>
        <Card.Header>
          <Card.BackButton />
          <Card.TitleGroup>
            <Card.Title>Structured</Card.Title>
            <Card.Subtitle>With back button</Card.Subtitle>
          </Card.TitleGroup>
        </Card.Header>
        <Card.Body>
          <p>Body content with sectioned layout and individual padding per section.</p>
        </Card.Body>
        <Card.Footer>
          <Button>Button</Button>
        </Card.Footer>
      </Card.Root>

      <Card.Root variant="simple" style={{ width: 360 }}>
        <Card.TitleGroup>
          <Card.Title>Simple</Card.Title>
          <Card.Subtitle>Flat layout</Card.Subtitle>
        </Card.TitleGroup>
        <Card.Body>
          <p>Body content with uniform padding and gap-based spacing.</p>
        </Card.Body>
        <Button>Button</Button>
      </Card.Root>
    </div>
  ),
};
