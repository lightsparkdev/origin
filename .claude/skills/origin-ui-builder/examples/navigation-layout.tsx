import React, { useState } from 'react';
import {
  NavigationMenu,
  Tabs,
  Button,
  Logo,
  Avatar,
  Menu,
  Breadcrumb,
  CentralIcon,
} from '@grid/origin';
import styles from './navigation-layout.module.scss';

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Products',
    children: [
      {
        label: 'Analytics',
        href: '/products/analytics',
        description: 'Track and analyze your data',
      },
      {
        label: 'Automation',
        href: '/products/automation',
        description: 'Automate your workflows',
      },
      {
        label: 'Integrations',
        href: '/products/integrations',
        description: 'Connect with your tools',
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'For Startups',
        href: '/solutions/startups',
        description: 'Scale your business faster',
      },
      {
        label: 'For Enterprise',
        href: '/solutions/enterprise',
        description: 'Enterprise-grade solutions',
      },
      {
        label: 'For Teams',
        href: '/solutions/teams',
        description: 'Collaborate effectively',
      },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Documentation',
        href: '/docs',
        description: 'Guides and API reference',
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Latest news and updates',
      },
      {
        label: 'Community',
        href: '/community',
        description: 'Join our community',
      },
    ],
  },
];

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' },
];

const BREADCRUMB_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard/analytics' },
];

export function NavigationLayout() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Logo height={24} />

            <NavigationMenu.Root>
              <NavigationMenu.List>
                {NAV_ITEMS.map((item) => (
                  <NavigationMenu.Item key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenu.Trigger>
                          {item.label}
                          <NavigationMenu.Icon />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Portal>
                          <NavigationMenu.Positioner>
                            <NavigationMenu.Popup>
                              {item.children.map((child) => (
                                <NavigationMenu.PopupItem
                                  key={child.href}
                                  href={child.href}
                                >
                                  <span className={styles.popupItemLabel}>
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className={styles.popupItemDescription}>
                                      {child.description}
                                    </span>
                                  )}
                                </NavigationMenu.PopupItem>
                              ))}
                            </NavigationMenu.Popup>
                          </NavigationMenu.Positioner>
                        </NavigationMenu.Portal>
                      </>
                    ) : (
                      <NavigationMenu.Link href={item.href}>
                        {item.label}
                      </NavigationMenu.Link>
                    )}
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          <div className={styles.headerRight}>
            <Button variant="ghost" iconOnly>
              <CentralIcon name="search" />
            </Button>

            <Button variant="ghost" iconOnly>
              <CentralIcon name="bell" />
            </Button>

            <Menu.Root>
              <Menu.Trigger>
                <button className={styles.avatarButton}>
                  <Avatar.Root size="32">
                    <Avatar.Image src="/avatar.jpg" alt="User" />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar.Root>
                </button>
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner>
                  <Menu.Popup>
                    <Menu.Group>
                      <Menu.GroupLabel>My Account</Menu.GroupLabel>
                      <Menu.Item onSelect={() => {}}>
                        <CentralIcon name="user" size={16} />
                        Profile
                      </Menu.Item>
                      <Menu.Item onSelect={() => {}}>
                        <CentralIcon name="settings" size={16} />
                        Settings
                      </Menu.Item>
                    </Menu.Group>
                    <Menu.Separator />
                    <Menu.Item onSelect={() => {}}>
                      <CentralIcon name="log-out" size={16} />
                      Sign Out
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </div>
        </div>
      </header>

      <div className={styles.subHeader}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            {BREADCRUMB_ITEMS.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <Breadcrumb.Separator />}
                <Breadcrumb.Item
                  isCurrent={index === BREADCRUMB_ITEMS.length - 1}
                >
                  <Breadcrumb.Link href={item.href}>{item.label}</Breadcrumb.Link>
                </Breadcrumb.Item>
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>

      <div className={styles.tabsContainer}>
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Tab>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs.Root>
      </div>

      <main className={styles.main}>
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.Panel value="overview">
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Overview</h1>
                <p className={styles.pageDescription}>
                  Welcome to your dashboard overview.
                </p>
              </div>
              <div className={styles.pageActions}>
                <Button variant="outline">Export</Button>
                <Button leadingIcon={<CentralIcon name="plus" />}>
                  New Report
                </Button>
              </div>
            </div>
            <div className={styles.content}>
              <p>Overview content goes here...</p>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="analytics">
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Analytics</h1>
                <p className={styles.pageDescription}>
                  View detailed analytics and metrics.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <p>Analytics content goes here...</p>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="reports">
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Reports</h1>
                <p className={styles.pageDescription}>
                  Generate and view reports.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <p>Reports content goes here...</p>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings">
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Settings</h1>
                <p className={styles.pageDescription}>
                  Configure your dashboard settings.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <p>Settings content goes here...</p>
            </div>
          </Tabs.Panel>
        </Tabs.Root>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            &copy; 2024 Your Company. All rights reserved.
          </p>
          <div className={styles.footerLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NavigationLayout;
