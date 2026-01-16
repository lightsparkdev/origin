import { test, expect } from '@playwright/experimental-ct-react';
import {
  BasicPagination,
  FirstPage,
  LastPage,
  ManyPages,
  FewPages,
  SinglePage,
  ControlledPagination,
} from './Pagination.test-stories';

test.describe('Pagination', () => {
  test.describe('Structure', () => {
    test('renders navigation with Previous and Next buttons', async ({ mount, page }) => {
      await mount(<BasicPagination />);

      const nav = page.getByRole('navigation', { name: /pagination/i });
      await expect(nav).toBeVisible();

      const prevButton = page.getByRole('button', { name: /previous/i });
      const nextButton = page.getByRole('button', { name: /next/i });
      await expect(prevButton).toBeVisible();
      await expect(nextButton).toBeVisible();
    });

    test('renders page number buttons', async ({ mount, page }) => {
      await mount(<FewPages />);

      // Should show all 5 pages without ellipsis
      for (let i = 1; i <= 5; i++) {
        const pageButton = page.getByRole('button', { name: `Page ${i}` });
        await expect(pageButton).toBeVisible();
      }
    });

    test('marks current page as selected', async ({ mount, page }) => {
      await mount(<FewPages />);

      const currentPage = page.getByRole('button', { name: 'Page 2', exact: true });
      await expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  });

  test.describe('Navigation States', () => {
    test('Previous is disabled on first page', async ({ mount, page }) => {
      await mount(<FirstPage />);

      const prevButton = page.getByRole('button', { name: /previous/i });
      await expect(prevButton).toBeDisabled();
    });

    test('Next is disabled on last page', async ({ mount, page }) => {
      await mount(<LastPage />);

      const nextButton = page.getByRole('button', { name: /next/i });
      await expect(nextButton).toBeDisabled();
    });

    test('both buttons disabled for single page', async ({ mount, page }) => {
      await mount(<SinglePage />);

      const prevButton = page.getByRole('button', { name: /previous/i });
      const nextButton = page.getByRole('button', { name: /next/i });
      await expect(prevButton).toBeDisabled();
      await expect(nextButton).toBeDisabled();
    });

    test('both buttons enabled for middle pages', async ({ mount, page }) => {
      await mount(<ManyPages />);

      const prevButton = page.getByRole('button', { name: /previous/i });
      const nextButton = page.getByRole('button', { name: /next/i });
      await expect(prevButton).toBeEnabled();
      await expect(nextButton).toBeEnabled();
    });
  });

  test.describe('Ellipsis', () => {
    test('shows ellipsis for many pages', async ({ mount, page }) => {
      await mount(<ManyPages />);

      // Should have ellipsis elements
      const ellipses = page.locator('[aria-hidden="true"]');
      await expect(ellipses.first()).toBeVisible();
    });

    test('no ellipsis for few pages', async ({ mount, page }) => {
      await mount(<FewPages />);

      // Should not have ellipsis
      const ellipsis = page.locator('span:has-text("...")');
      await expect(ellipsis).toHaveCount(0);
    });
  });

  test.describe('Interaction', () => {
    test('clicking page number updates selection', async ({ mount, page }) => {
      await mount(<ControlledPagination />);

      // Initial state
      await expect(page.getByTestId('current-page')).toHaveText('Current page: 5');

      // Click page 6 (visible sibling of page 5)
      await page.getByRole('button', { name: 'Page 6', exact: true }).click();
      await expect(page.getByTestId('current-page')).toHaveText('Current page: 6');
    });

    test('clicking Previous goes to previous page', async ({ mount, page }) => {
      await mount(<ControlledPagination />);

      await expect(page.getByTestId('current-page')).toHaveText('Current page: 5');

      await page.getByRole('button', { name: /previous/i }).click();
      await expect(page.getByTestId('current-page')).toHaveText('Current page: 4');
    });

    test('clicking Next goes to next page', async ({ mount, page }) => {
      await mount(<ControlledPagination />);

      await expect(page.getByTestId('current-page')).toHaveText('Current page: 5');

      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByTestId('current-page')).toHaveText('Current page: 6');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('page buttons are focusable', async ({ mount, page }) => {
      await mount(<FewPages />);

      const pageButton = page.getByRole('button', { name: 'Page 1' });
      await pageButton.focus();
      await expect(pageButton).toBeFocused();
    });

    test('Enter activates page button', async ({ mount, page }) => {
      await mount(<ControlledPagination />);

      const page6Button = page.getByRole('button', { name: 'Page 6', exact: true });
      await page6Button.focus();
      await page.keyboard.press('Enter');

      await expect(page.getByTestId('current-page')).toHaveText('Current page: 6');
    });
  });

  test.describe('Styling', () => {
    test('page items have correct border radius', async ({ mount, page }) => {
      await mount(<FewPages />);

      const pageButton = page.getByRole('button', { name: 'Page 1' });
      const borderRadius = await pageButton.evaluate((el) =>
        getComputedStyle(el).borderRadius
      );

      expect(borderRadius).toBe('6px');
    });

    test('selected page has distinct styling', async ({ mount, page }) => {
      await mount(<FewPages />);

      const selectedPage = page.getByRole('button', { name: 'Page 2', exact: true });
      const hasSelectedAttr = await selectedPage.evaluate((el) =>
        el.hasAttribute('data-selected')
      );

      expect(hasSelectedAttr).toBe(true);
    });
  });
});
