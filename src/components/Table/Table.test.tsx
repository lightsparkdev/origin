import { test, expect } from '@playwright/experimental-ct-react';
import {
  BasicTable,
  SortableTable,
  AlignedTable,
  LoadingTable,
  DescriptionTable,
} from './Table.test-stories';

test.describe('Table', () => {
  test.describe('Basic', () => {
    test('renders table with data', async ({ mount }) => {
      const component = await mount(<BasicTable />);

      // Check data is visible
      await expect(component.locator('text=Alice Johnson')).toBeVisible();
      await expect(component.locator('text=bob@example.com')).toBeVisible();
    });
  });

  test.describe('Sorting', () => {
    test('clicking sortable header toggles sort', async ({ mount }) => {
      const component = await mount(<SortableTable />);

      const nameHeader = component.locator('th').filter({ hasText: 'Name' });

      // Initial state - no sort
      await expect(nameHeader).not.toHaveAttribute('data-sorted');

      // Click to sort ascending
      await nameHeader.click();
      await expect(nameHeader).toHaveAttribute('data-sorted', 'asc');

      // Click to sort descending
      await nameHeader.click();
      await expect(nameHeader).toHaveAttribute('data-sorted', 'desc');

      // Click to clear sort
      await nameHeader.click();
      await expect(nameHeader).not.toHaveAttribute('data-sorted');
    });

    test('non-sortable column has no sort indicator', async ({ mount }) => {
      const component = await mount(<SortableTable />);

      const roleHeader = component.locator('th').filter({ hasText: 'Role' });

      // Should not have sortable attribute
      await expect(roleHeader).not.toHaveAttribute('data-sortable');
    });
  });

  test.describe('Alignment', () => {
    test('right-aligned cells have correct data attribute', async ({ mount }) => {
      const component = await mount(<AlignedTable />);

      // Status column should be right-aligned
      const statusHeader = component.locator('th').filter({ hasText: 'Status' });
      await expect(statusHeader).toHaveAttribute('data-align', 'right');
    });
  });

  test.describe('Loading', () => {
    test('loading cells have loading attribute', async ({ mount }) => {
      const component = await mount(<LoadingTable />);

      // Find cells with loading state
      const loadingCells = component.locator('[data-loading="true"]');
      await expect(loadingCells.first()).toBeVisible();
    });
  });

  test.describe('Cell Content', () => {
    test('renders label and description', async ({ mount }) => {
      const component = await mount(<DescriptionTable />);

      // Check name and email are visible
      await expect(component.locator('text=Alice Johnson')).toBeVisible();
      await expect(component.locator('text=alice@example.com')).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('sortable headers respond to keyboard', async ({ mount, page }) => {
      const component = await mount(<SortableTable />);

      const nameHeader = component.locator('th').filter({ hasText: 'Name' });

      // Focus and press Enter to sort
      await nameHeader.focus();
      await page.keyboard.press('Enter');
      await expect(nameHeader).toHaveAttribute('data-sorted', 'asc');

      // Press Space to toggle to descending
      await page.keyboard.press('Space');
      await expect(nameHeader).toHaveAttribute('data-sorted', 'desc');
    });
  });
});
