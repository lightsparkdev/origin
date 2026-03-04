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
                You have no new notifications. Check back later for updates on your account activity.
              </Drawer.Description>
              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <Drawer.Close render={<Button variant="outline" />}>
                  Dismiss
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

    const details = [
      ['Request ID', 'ck8qs-177'],
      ['Method', 'GET'],
      ['Path', '/customers'],
      ['Host', 'api.example.com'],
      ['Status', '200 OK'],
      ['Duration', '314ms'],
      ['Cache', 'HIT'],
    ];

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
                    {details.map(([label, value]) => (
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

export const LeftPanel: StoryObj = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    const navItems = [
      { icon: 'IconHome' as const, label: 'Dashboard' },
      { icon: 'IconPerson' as const, label: 'Customers' },
      { icon: 'IconReceipt' as const, label: 'Transactions' },
      { icon: 'IconGear' as const, label: 'Settings' },
    ];

    return (
      <div>
        <Button variant="outline" iconOnly aria-label="Open menu" onClick={() => setOpen(true)}>
          <CentralIcon name="IconMenu" size={20} />
        </Button>
        <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="left">
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
              <Drawer.Popup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md) var(--spacing-xl)', borderBottom: 'var(--stroke-xs) solid var(--border-primary)' }}>
                  <span className="headline-sm" style={{ color: 'var(--text-primary)' }}>Menu</span>
                  <Drawer.Close render={<Button variant="ghost" size="compact" iconOnly aria-label="Close" />}>
                    <CentralIcon name="IconCrossSmall" size={16} />
                  </Drawer.Close>
                </div>
                <Drawer.Content>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xs)' }}>
                    {navItems.map(({ icon, label }) => (
                      <button
                        key={label}
                        onClick={() => setOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-sm)',
                          padding: 'var(--spacing-sm) var(--spacing-xs)',
                          background: 'none',
                          border: 'none',
                          borderRadius: 'var(--corner-radius-sm)',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          fontSize: 14,
                        }}
                      >
                        <CentralIcon name={icon} size={20} />
                        {label}
                      </button>
                    ))}
                  </nav>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    );
  },
};

export const SnapPoints: StoryObj = {
  render: function Render() {
    const [snap, setSnap] = React.useState<number | string | null>(0.4);

    return (
      <Drawer.Root snapPoints={[0.4, 0.7, 1]} snapPoint={snap} onSnapPointChange={setSnap}>
        <Drawer.Trigger render={<Button variant="outline" />}>
          Open with snap points
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Title>Activity</Drawer.Title>
              <Drawer.Content>
                <p className="body-sm" style={{ margin: '0 0 var(--spacing-md)', color: 'var(--text-secondary)' }}>
                  Drag to resize between 40%, 70%, and full height.
                </p>
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-lg)' }}>
                  <Button variant="outline" size="compact" onClick={() => setSnap(0.4)}>40%</Button>
                  <Button variant="outline" size="compact" onClick={() => setSnap(0.7)}>70%</Button>
                  <Button variant="outline" size="compact" onClick={() => setSnap(1)}>Full</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--corner-radius-sm)', backgroundColor: 'var(--surface-secondary)' }}>
                      <span className="body-sm" style={{ color: 'var(--text-primary)' }}>
                        Activity item {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );
  },
};

export const NonModal: StoryObj = {
  render: function Render() {
    const [count, setCount] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p className="body" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          The drawer opens without blocking interaction with the page behind it.
          Counter: <strong style={{ color: 'var(--text-primary)' }}>{count}</strong>
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
          <Drawer.Root modal={false}>
            <Drawer.Trigger render={<Button variant="outline" />}>
              Open non-modal drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Title>Non-modal drawer</Drawer.Title>
                  <Drawer.Content>
                    <Drawer.Description>
                      You can still interact with the content behind this drawer. Try clicking the increment button.
                    </Drawer.Description>
                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                      <Drawer.Close render={<Button variant="outline" />}>
                        Close
                      </Drawer.Close>
                    </div>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
          <Button variant="filled" onClick={() => setCount((c) => c + 1)}>
            Increment
          </Button>
        </div>
      </div>
    );
  },
};

export const NestedDrawers: StoryObj = {
  render: () => (
    <Drawer.Provider>
      <Drawer.IndentBackground />
      <Drawer.Indent>
        <div style={{ padding: 'var(--spacing-xl)', minHeight: 200 }}>
          <Drawer.Root>
            <Drawer.Trigger render={<Button variant="outline" />}>
              Open parent drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Title>Parent drawer</Drawer.Title>
                  <Drawer.Content>
                    <Drawer.Description>
                      Opening the child drawer will indent this one. The page behind scales down to reinforce depth.
                    </Drawer.Description>
                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                      <Drawer.Root>
                        <Drawer.Trigger render={<Button variant="outline" />}>
                          Open child drawer
                        </Drawer.Trigger>
                        <Drawer.Portal>
                          <Drawer.Backdrop />
                          <Drawer.Viewport>
                            <Drawer.Popup>
                              <Drawer.Title>Child drawer</Drawer.Title>
                              <Drawer.Content>
                                <Drawer.Description>
                                  This is a nested drawer. Swipe down or press Escape to go back to the parent.
                                </Drawer.Description>
                                <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                  <Drawer.Close render={<Button variant="outline" />}>
                                    Back to parent
                                  </Drawer.Close>
                                </div>
                              </Drawer.Content>
                            </Drawer.Popup>
                          </Drawer.Viewport>
                        </Drawer.Portal>
                      </Drawer.Root>
                    </div>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </Drawer.Indent>
    </Drawer.Provider>
  ),
};

export const CustomWidth: StoryObj = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open wide panel
        </Button>
        <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport style={{ alignItems: 'stretch', justifyContent: 'flex-end' }}>
              <Drawer.Popup style={{ '--drawer-width': '600px' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md) var(--spacing-xl)', borderBottom: 'var(--stroke-xs) solid var(--border-primary)' }}>
                  <span className="headline-sm" style={{ color: 'var(--text-primary)' }}>
                    Event log
                  </span>
                  <Drawer.Close render={<Button variant="ghost" size="compact" iconOnly aria-label="Close" />}>
                    <CentralIcon name="IconCrossSmall" size={16} />
                  </Drawer.Close>
                </div>
                <Drawer.Content>
                  <p className="body-sm" style={{ margin: '0 0 var(--spacing-md)', color: 'var(--text-secondary)' }}>
                    This panel uses <code style={{ fontSize: 12 }}>--drawer-width: 600px</code> instead of the default 420px.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                    {[
                      { time: '14:32:01', event: 'payment.created', id: 'evt_01' },
                      { time: '14:32:04', event: 'payment.processing', id: 'evt_02' },
                      { time: '14:32:09', event: 'payment.completed', id: 'evt_03' },
                      { time: '14:33:15', event: 'webhook.sent', id: 'evt_04' },
                      { time: '14:33:16', event: 'webhook.delivered', id: 'evt_05' },
                    ].map((row) => (
                      <div key={row.id} style={{ display: 'flex', gap: 'var(--spacing-md)', padding: 'var(--spacing-xs) 0', borderBottom: 'var(--stroke-xs) solid var(--border-secondary)' }}>
                        <span className="body-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono, monospace)', minWidth: 72 }}>{row.time}</span>
                        <span className="body-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono, monospace)', flex: 1 }}>{row.event}</span>
                        <span className="body-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono, monospace)' }}>{row.id}</span>
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

export const Controlled: StoryObj = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const actionsRef = React.useRef<{ unmount: () => void; close: () => void }>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p className="body" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          State: <strong style={{ color: 'var(--text-primary)' }}>{open ? 'Open' : 'Closed'}</strong>
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Open drawer
          </Button>
          <Button variant="outline" onClick={() => actionsRef.current?.close()}>
            Close imperatively
          </Button>
        </div>
        <Drawer.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef}>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Title>Controlled drawer</Drawer.Title>
                <Drawer.Content>
                  <Drawer.Description>
                    This drawer is controlled via React state and exposes an imperative close action. Try the "Close imperatively" button outside.
                  </Drawer.Description>
                  <div style={{ marginTop: 'var(--spacing-lg)' }}>
                    <Drawer.Close render={<Button variant="outline" />}>
                      Close from inside
                    </Drawer.Close>
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

export const DefaultOpen: StoryObj = {
  render: () => (
    <Drawer.Root defaultOpen>
      <Drawer.Trigger render={<Button variant="outline" />}>
        Reopen drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Title>Welcome</Drawer.Title>
            <Drawer.Content>
              <Drawer.Description>
                This drawer was open when the page loaded. Close it and use the button to reopen.
              </Drawer.Description>
              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <Drawer.Close render={<Button variant="outline" />}>
                  Got it
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  ),
};

export const InitialFocus: StoryObj = {
  render: function Render() {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <Drawer.Root>
        <Drawer.Trigger render={<Button variant="outline" />}>
          Add a note
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup initialFocus={inputRef}>
              <Drawer.Title>New note</Drawer.Title>
              <Drawer.Content>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  <label className="label" htmlFor="note-input" style={{ color: 'var(--text-secondary)' }}>
                    Note
                  </label>
                  <input
                    ref={inputRef}
                    id="note-input"
                    type="text"
                    placeholder="Start typing..."
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      border: 'var(--stroke-xs) solid var(--border-primary)',
                      borderRadius: 'var(--corner-radius-sm)',
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--surface-primary)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-lg)' }}>
                  <Drawer.Close render={<Button variant="outline" />}>
                    Cancel
                  </Drawer.Close>
                  <Button variant="filled">Save</Button>
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );
  },
};

export const OpenChangeComplete: StoryObj = {
  render: function Render() {
    const [log, setLog] = React.useState<string[]>([]);

    const addEntry = (open: boolean) => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLog((prev) => [`${time} — ${open ? 'Open' : 'Close'} animation finished`, ...prev].slice(0, 8));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <Drawer.Root onOpenChangeComplete={addEntry}>
          <Drawer.Trigger render={<Button variant="outline" />}>
            Open drawer
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Title>Transition callback</Drawer.Title>
                <Drawer.Content>
                  <Drawer.Description>
                    Close this drawer to see the callback fire after the animation completes.
                  </Drawer.Description>
                  <div style={{ marginTop: 'var(--spacing-lg)' }}>
                    <Drawer.Close render={<Button variant="outline" />}>
                      Close
                    </Drawer.Close>
                  </div>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
        {log.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xs)' }}>
            <span className="label" style={{ color: 'var(--text-secondary)' }}>Callback log</span>
            {log.map((entry, i) => (
              <span key={i} className="body-sm" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono, monospace)' }}>
                {entry}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  },
};
