import { test, expect } from '@playwright/experimental-ct-react';
import {
  LinksOnly,
  WithDropdown,
  ActiveLink,
  DisabledStates,
  PopupItemVariants,
} from './NavigationMenu.test-stories';

test.describe('NavigationMenu', () => {
  test.describe('Links', () => {
    test('renders navigation links', async ({ mount }) => {
      const component = await mount(<LinksOnly />);

      await expect(component.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(component.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(component.getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('active link has data-active attribute', async ({ mount }) => {
      const component = await mount(<ActiveLink />);

      const activeLink = component.getByRole('link', { name: 'About' });
      await expect(activeLink).toHaveAttribute('data-active', '');
    });
  });

  test.describe('Trigger and Dropdown', () => {
    test('trigger opens dropdown on click', async ({ mount, page }) => {
      const component = await mount(<WithDropdown />);

      const trigger = component.getByRole('button', { name: 'Products' });
      await trigger.click();

      // Portal renders outside component, use page locator
      await expect(page.getByText('Dashboard')).toBeVisible();
      await expect(page.getByText('Analytics')).toBeVisible();
      await expect(page.getByText('Reports')).toBeVisible();
    });

    test('trigger has popup-open attribute when open', async ({ mount, page }) => {
      const component = await mount(<WithDropdown />);

      const trigger = component.getByRole('button', { name: 'Products' });
      await trigger.click();

      await expect(trigger).toHaveAttribute('data-popup-open', '');
    });

    test('disabled trigger cannot be opened', async ({ mount }) => {
      const component = await mount(<DisabledStates />);

      const disabledTrigger = component.getByRole('button', { name: 'Disabled Trigger' });
      await expect(disabledTrigger).toBeDisabled();
    });
  });

  test.describe('PopupItem', () => {
    test('renders popup items with various configurations', async ({ mount }) => {
      const component = await mount(<PopupItemVariants />);

      await expect(component.getByText('With Leading Icon')).toBeVisible();
      await expect(component.getByText('Label Only')).toBeVisible();
      await expect(component.getByText('With Both Icons')).toBeVisible();
    });

    test('disabled popup item has data-disabled attribute', async ({ mount }) => {
      const component = await mount(<PopupItemVariants />);

      // Find the disabled item container
      const disabledItem = component.locator('[data-disabled]').filter({ hasText: 'Disabled Item' });
      await expect(disabledItem).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('trigger can be focused with Tab', async ({ mount, page }) => {
      const component = await mount(<WithDropdown />);

      await page.keyboard.press('Tab');
      const trigger = component.getByRole('button', { name: 'Products' });
      await expect(trigger).toBeFocused();
    });

    test('Enter key opens dropdown', async ({ mount, page }) => {
      await mount(<WithDropdown />);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      // Portal renders outside component, use page locator
      await expect(page.getByText('Dashboard')).toBeVisible();
    });

    test('Escape key closes dropdown', async ({ mount, page }) => {
      const component = await mount(<WithDropdown />);

      const trigger = component.getByRole('button', { name: 'Products' });
      await trigger.click();
      await expect(page.getByText('Dashboard')).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(page.getByText('Dashboard')).not.toBeVisible();
    });
  });
});
