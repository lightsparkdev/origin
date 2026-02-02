import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Sidebar } from './';
import { CentralIcon } from '@/components/Icon';
import { Avatar } from '@/components/Avatar';
import { Separator } from '@/components/Separator';
import { Logo } from '@/components/Logo';

const meta: Meta = {
  title: 'Components/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar.Root style={{ width: 224 }}>
        <Sidebar.Header>
          <Logo aria-label="Origin" />
        </Sidebar.Header>
        <Separator variant="hairline" />
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupHeader>Navigation</Sidebar.GroupHeader>
            <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconArrowInbox" size={20} />}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item
              icon={<CentralIcon name="IconCalendarDays" size={20} />}
              shortcut={['⌘', 'K']}
            >
              Calendar
            </Sidebar.Item>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupHeader>Settings</Sidebar.GroupHeader>
            <Sidebar.Item icon={<CentralIcon name="IconPeopleCircle" size={20} />}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconSettingsGear1" size={20} />}>
              Preferences
            </Sidebar.Item>
            <Sidebar.Item icon={<CentralIcon name="IconLock" size={20} />} disabled>
              Security
            </Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>
        <Separator variant="hairline" />
        <Sidebar.Footer>
          <Avatar name="Jay Mantri" size={24} />
          <span style={{ flex: 1 }}>Jay Mantri</span>
        </Sidebar.Footer>
      </Sidebar.Root>
      <main style={{ flex: 1, padding: 24, background: '#fafafa' }}>
        <h1>Main Content</h1>
      </main>
    </div>
  ),
};

export const WithTreeItems: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar.Root style={{ width: 224 }}>
        <Sidebar.Header>
          <Logo aria-label="Origin" />
        </Sidebar.Header>
        <Separator variant="hairline" />
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />} active>
              Home
            </Sidebar.Item>
            <Sidebar.Tree
              icon={<CentralIcon name="IconTarget" size={20} />}
              label="Projects"
              defaultOpen
            >
              <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                Project Alpha
              </Sidebar.Item>
              <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                Project Beta
              </Sidebar.Item>
              <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                Project Gamma
              </Sidebar.Item>
            </Sidebar.Tree>
            <Sidebar.Tree icon={<CentralIcon name="IconClipboard2" size={20} />} label="Archive">
              <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                Old Projects
              </Sidebar.Item>
            </Sidebar.Tree>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
    </div>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar.Root style={{ width: 224 }}>
        <Sidebar.Header>
          <Logo aria-label="Origin" />
        </Sidebar.Header>
        <Separator variant="hairline" />
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Submenu
              icon={<CentralIcon name="IconSettingsGear1" size={20} />}
              label="Settings"
              defaultOpen
            >
              <Sidebar.Item icon={<CentralIcon name="IconPeopleCircle" size={20} />}>
                Profile
              </Sidebar.Item>
              <Sidebar.Item icon={<CentralIcon name="IconLock" size={20} />}>
                Security
              </Sidebar.Item>
              <Sidebar.Item icon={<CentralIcon name="IconBell" size={20} />}>
                Notifications
              </Sidebar.Item>
            </Sidebar.Submenu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
    </div>
  ),
};

export const WithDrilldown: Story = {
  render: function DrilldownStory() {
    const [view, setView] = React.useState<'main' | 'settings'>('main');

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar.Root style={{ width: 224 }}>
          <Sidebar.Header>
            <Logo aria-label="Origin" />
          </Sidebar.Header>
          <Separator variant="hairline" />
          <Sidebar.Content>
            {view === 'main' ? (
              <Sidebar.Group>
                <Sidebar.Item icon={<CentralIcon name="IconHome" size={20} />} active>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item icon={<CentralIcon name="IconArrowInbox" size={20} />}>
                  Inbox
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
                <Sidebar.Item icon={<CentralIcon name="IconPeopleCircle" size={20} />} active>
                  Profile
                </Sidebar.Item>
                <Sidebar.Item icon={<CentralIcon name="IconLock" size={20} />}>
                  Security
                </Sidebar.Item>
                <Sidebar.Item icon={<CentralIcon name="IconBell" size={20} />}>
                  Notifications
                </Sidebar.Item>
              </Sidebar.Group>
            )}
          </Sidebar.Content>
        </Sidebar.Root>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [openTree, setOpenTree] = React.useState(false);

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar.Root style={{ width: 224 }}>
          <Sidebar.Header>
            <button onClick={() => setOpenTree(!openTree)}>
              Toggle Tree ({openTree ? 'Open' : 'Closed'})
            </button>
          </Sidebar.Header>
          <Separator variant="hairline" />
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.Tree
                icon={<CentralIcon name="IconTarget" size={20} />}
                label="Controlled Tree"
                open={openTree}
                onOpenChange={setOpenTree}
              >
                <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                  Nested Item 1
                </Sidebar.Item>
                <Sidebar.Item icon={<CentralIcon name="IconFileBend" size={20} />}>
                  Nested Item 2
                </Sidebar.Item>
              </Sidebar.Tree>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.Root>
      </div>
    );
  },
};
