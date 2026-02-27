import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './index';
import { Button } from '../Button';
import { CentralIcon } from '../Icon';

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
};

export default meta;

export const BottomSheet: StoryObj = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" />}>
        Open bottom sheet
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Title>Notifications</Drawer.Title>
            <Drawer.Content>
              <Drawer.Description>
                You are all caught up. Good job!
              </Drawer.Description>
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <Drawer.Close render={<Button variant="outline" />}>
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  ),
};

export const SidePanel: StoryObj = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          View request details
        </Button>
        <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport style={{ alignItems: 'stretch', justifyContent: 'flex-end' }}>
              <Drawer.Popup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md) var(--spacing-xl)', borderBottom: 'var(--stroke-xs) solid var(--border-primary)' }}>
                  <span className="label" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
                    GET /customers
                  </span>
                  <Drawer.Close render={<Button variant="ghost" size="compact" iconOnly aria-label="Close" />}>
                    <CentralIcon name="IconCrossSmall" size={16} />
                  </Drawer.Close>
                </div>
                <Drawer.Content>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                    {[
                      ['Request ID', 'ck8qs-177'],
                      ['Path', '/customers'],
                      ['Host', 'grid-k507nwxq0.vercel.app'],
                      ['Duration', '314ms'],
                      ['Cache', 'HIT'],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2xs) 0' }}>
                        <span className="body-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                        <span className="body-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    );
  },
};
