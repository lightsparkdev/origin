import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import {
  DefaultSegmentedNav,
  PlainAnchorSegmentedNav,
  LinkPropForwardingSegmentedNav,
  ClickableSegmentedNav,
} from './SegmentedNav.test-stories';

const axeConfig = {
  rules: {
    'landmark-one-main': { enabled: false },
    'page-has-heading-one': { enabled: false },
    region: { enabled: false },
  },
};

test.describe('SegmentedNav', () => {
  test('renders a navigation landmark with an accessible label', async ({ mount, page }) => {
    await mount(<DefaultSegmentedNav />);

    await expect(page.getByRole('navigation', { name: 'Payout sections' })).toBeVisible();
  });

  test('renders links and preserves href from the rendered anchor', async ({ mount, page }) => {
    await mount(<PlainAnchorSegmentedNav />);

    await expect(page.getByRole('link', { name: 'Balances' })).toHaveAttribute('href', '/balances');
    await expect(page.getByRole('link', { name: 'Activity' })).toHaveAttribute('href', '/balances/activity');
  });

  test('marks the active link with aria-current on the real link', async ({ mount, page }) => {
    await mount(<DefaultSegmentedNav />);

    await expect(page.getByRole('link', { name: 'Activity' })).toHaveAttribute('aria-current', 'page');
  });

  test('does not add redundant active attributes beyond aria-current', async ({ mount, page }) => {
    await mount(<DefaultSegmentedNav />);

    await expect(page.getByRole('link', { name: 'Activity' })).not.toHaveAttribute('data-active');
  });

  test('merges child props onto the rendered link', async ({ mount, page }) => {
    await mount(<LinkPropForwardingSegmentedNav />);

    const link = page.getByTestId('forwarded-link');
    await expect(link).toHaveAttribute('href', '/forwarded');
    await expect(link).toHaveAttribute('data-custom', 'value');
    await expect(link).toHaveClass(/custom-link/);
    await expect(link).toHaveCSS('color', 'rgb(255, 0, 0)');
  });

  test('keeps native keyboard focus behavior for links', async ({ mount, page }) => {
    await mount(<DefaultSegmentedNav />);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Overview' })).toBeFocused();
  });

  test('preserves custom click handling on the rendered link', async ({ mount, page }) => {
    await mount(<ClickableSegmentedNav />);

    await page.getByRole('link', { name: 'Interactive' }).click();
    await expect(page.getByText('Clicked')).toBeVisible();
  });

  test('has no accessibility violations', async ({ mount, page }) => {
    await mount(<DefaultSegmentedNav />);

    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });
});
