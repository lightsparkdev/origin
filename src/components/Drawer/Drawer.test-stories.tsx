'use client';

import * as React from 'react';
import { Drawer } from './index';

export function TestDefault() {
  return (
    <Drawer.Root defaultOpen>
      <Drawer.Trigger data-testid="trigger">Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop data-testid="backdrop" />
        <Drawer.Viewport>
          <Drawer.Popup data-testid="popup">
            <Drawer.Content>
              <Drawer.Title data-testid="title">Drawer title</Drawer.Title>
              <Drawer.Description data-testid="description">
                Drawer description
              </Drawer.Description>
              <Drawer.Close data-testid="close">Close</Drawer.Close>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function TestClosed() {
  return (
    <Drawer.Root>
      <Drawer.Trigger data-testid="trigger">Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup data-testid="popup">
            <Drawer.Content>
              <Drawer.Title>Drawer title</Drawer.Title>
              <Drawer.Close data-testid="close">Close</Drawer.Close>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function TestNonModal() {
  return (
    <Drawer.Root defaultOpen modal={false}>
      <Drawer.Trigger data-testid="trigger">Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Viewport>
          <Drawer.Popup data-testid="popup">
            <Drawer.Content>
              <Drawer.Title>Non-modal drawer</Drawer.Title>
              <Drawer.Close data-testid="close">Close</Drawer.Close>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function TestControlled() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button data-testid="toggle" onClick={() => setOpen(!open)}>
        Toggle: {open ? 'Open' : 'Closed'}
      </button>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup data-testid="popup">
              <Drawer.Content>
                <Drawer.Title>Controlled drawer</Drawer.Title>
                <Drawer.Close data-testid="close">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

