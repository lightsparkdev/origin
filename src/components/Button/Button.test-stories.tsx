import { Button } from './Button';

export function FilledButton() {
  return <Button variant="filled">Click me</Button>;
}

export function OutlineButton() {
  return <Button variant="outline">Click me</Button>;
}

export function GhostButton() {
  return <Button variant="ghost">Click me</Button>;
}

export function CriticalButton() {
  return <Button variant="critical">Delete</Button>;
}

export function DisabledButton() {
  return <Button disabled>Disabled</Button>;
}

export function LoadingButton() {
  return <Button loading>Loading</Button>;
}

export function AllSizes() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function IconOnlyButton() {
  return (
    <Button iconOnly aria-label="Add item">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
      </svg>
    </Button>
  );
}

