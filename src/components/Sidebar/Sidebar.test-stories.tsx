'use client';

import * as React from 'react';
import { Sidebar } from './';
import { CentralIcon } from '@/components/Icon';

// Basic sidebar with default items
export function BasicSidebar() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Header>
        <span>Logo</span>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<CentralIcon name="IconSettingsGear1" size={20} />}>
            Settings
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with active item
export function SidebarWithActiveItem() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<CentralIcon name="IconSettingsGear1" size={20} />}>
            Settings
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with disabled item
export function SidebarWithDisabledItem() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<CentralIcon name="IconSettingsGear1" size={20} />} disabled>
            Disabled
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with group header
export function SidebarWithGroupHeader() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupHeader>Navigation</Sidebar.GroupHeader>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<CentralIcon name="IconSettingsGear1" size={20} />}>
            Settings
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with Tree (collapsible) item
export function SidebarWithTreeItem() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
          <Sidebar.Tree icon={<CentralIcon name="IconTarget" size={20} />} label="Documents">
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              File 1
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              File 2
            </Sidebar.Item>
          </Sidebar.Tree>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with Tree default open
export function SidebarWithTreeDefaultOpen() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Tree
            icon={<CentralIcon name="IconTarget" size={20} />}
            label="Documents"
            defaultOpen
          >
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              File 1
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              File 2
            </Sidebar.Item>
          </Sidebar.Tree>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with Submenu (vertical chevron)
export function SidebarWithSubmenu() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
          <Sidebar.Submenu icon={<CentralIcon name="IconSettingsGear1" size={20} />} label="Settings">
            <Sidebar.Item icon={<CentralIcon name="IconPeopleCircle" size={20} />}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconLock" size={20} />}>
              Security
            </Sidebar.Item>
          </Sidebar.Submenu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with shortcut
export function SidebarWithShortcut() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item
            icon={<CentralIcon name="IconHome" size={20} />}
            shortcut={['⌘', 'H']}
          >
            Home
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Sidebar with footer
export function SidebarWithFooter() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
            Home
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <span data-testid="footer-name">John Doe</span>
      </Sidebar.Footer>
    </Sidebar.Root>
  );
}

// Controlled Tree
export function ControlledTree({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Tree
            icon={<CentralIcon name="IconTarget" size={20} />}
            label="Controlled"
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              onOpenChange?.(isOpen);
            }}
          >
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              Nested Item
            </Sidebar.Item>
          </Sidebar.Tree>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Drilldown item
export function SidebarWithDrilldown() {
  const [view, setView] = React.useState<'main' | 'settings'>('main');

  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        {view === 'main' ? (
          <Sidebar.Group>
            <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />}>
              Home
            </Sidebar.Item>
            <Sidebar.Drilldown
              icon={<CentralIcon name="IconSettingsGear1" size={20} />}
              label="Settings"
              onClick={() => setView('settings')}
            />
          </Sidebar.Group>
        ) : (
          <Sidebar.Group>
            <Sidebar.BackButton onClick={() => setView('main')}>
              Back
            </Sidebar.BackButton>
            <Sidebar.GroupHeader>Settings</Sidebar.GroupHeader>
            <Sidebar.Item icon={<CentralIcon name="IconPeopleCircle" size={20} />}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconLock" size={20} />}>
              Security
            </Sidebar.Item>
          </Sidebar.Group>
        )}
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Disabled Tree
export function SidebarWithDisabledTree() {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Tree
            icon={<CentralIcon name="IconTarget" size={20} />}
            label="Disabled Tree"
            disabled
          >
            <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
              Should not show
            </Sidebar.Item>
          </Sidebar.Tree>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

// Item with onClick
export function SidebarWithClickableItem({ onClick }: { onClick?: () => void }) {
  return (
    <Sidebar.Root style={{ height: 400 }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Item
            icon={<CentralIcon name="IconHome" size={20} />}
            onClick={onClick}
          >
            Clickable
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}
