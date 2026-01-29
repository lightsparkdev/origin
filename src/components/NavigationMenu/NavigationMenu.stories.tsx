import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { NavigationMenu } from './parts';
import { CentralIcon } from '@/components/Icon';
import { Button } from '@/components/Button';

const meta: Meta = {
  title: 'Components/NavigationMenu',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Basic navigation with links
export const LinksOnly: StoryObj = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">About</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

// With dropdown menus
export const WithDropdown: StoryObj = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Products
            <NavigationMenu.Icon>
              <CentralIcon name="IconChevronDownSmall" size={16} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner>
              <NavigationMenu.Popup>
                <NavigationMenu.PopupItem>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Dashboard
                </NavigationMenu.PopupItem>
                <NavigationMenu.PopupItem>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Analytics
                </NavigationMenu.PopupItem>
                <NavigationMenu.PopupItem>
                  <CentralIcon name="IconGlobe2" size={16} />
                  Reports
                </NavigationMenu.PopupItem>
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Resources
            <NavigationMenu.Icon>
              <CentralIcon name="IconChevronDownSmall" size={16} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner>
              <NavigationMenu.Popup>
                <NavigationMenu.PopupItem>Documentation</NavigationMenu.PopupItem>
                <NavigationMenu.PopupItem>API Reference</NavigationMenu.PopupItem>
                <NavigationMenu.PopupItem>Blog</NavigationMenu.PopupItem>
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

// With group labels
export const WithGroupLabels: StoryObj = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Products
            <NavigationMenu.Icon>
              <CentralIcon name="IconChevronDownSmall" size={16} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner>
              <NavigationMenu.Popup>
                <NavigationMenu.Group>
                  <NavigationMenu.GroupLabel>Analytics</NavigationMenu.GroupLabel>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconGlobe2" size={16} />
                    Dashboard
                  </NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconGlobe2" size={16} />
                    Reports
                  </NavigationMenu.PopupItem>
                </NavigationMenu.Group>
                <NavigationMenu.Separator />
                <NavigationMenu.Group>
                  <NavigationMenu.GroupLabel>Settings</NavigationMenu.GroupLabel>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconSettingsGear1" size={16} />
                    Preferences
                  </NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>
                    <CentralIcon name="IconSettingsGear1" size={16} />
                    Account
                  </NavigationMenu.PopupItem>
                </NavigationMenu.Group>
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

// Active link state
export const ActiveLink: StoryObj = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" active>
            About
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

// With standalone action buttons (documented pattern)
export const WithActionButtons: StoryObj = {
  render: () => (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              Products
              <NavigationMenu.Icon>
                <CentralIcon name="IconChevronDownSmall" size={16} />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Portal>
              <NavigationMenu.Positioner>
                <NavigationMenu.Popup>
                  <NavigationMenu.PopupItem>Dashboard</NavigationMenu.PopupItem>
                  <NavigationMenu.PopupItem>Analytics</NavigationMenu.PopupItem>
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      {/* Standalone action buttons outside NavigationMenu */}
      <Button variant="ghost" size="sm">
        <CentralIcon name="IconSettingsGear1" size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        Sign Out
      </Button>
    </nav>
  ),
};
