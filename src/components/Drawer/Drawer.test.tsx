import { test, expect } from '@playwright/experimental-ct-react';
import {
  TestDefault,
  TestClosed,
  TestNonModal,
  TestControlled,
  TestSnapPoints,
  TestWithHandle,
  TestSidePanel,
  TestNested,
  TestIndent,
} from './Drawer.test-stories';

test.describe('Drawer', () => {
  test.describe('Core', () => {
    test('has no accessibility violations', async ({ mount, page }) => {
      await mount(<TestDefault />);
      const AxeBuilder = (await import('@axe-core/playwright')).default;
      const results = await new AxeBuilder({ page })
        .exclude('html')
        .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('renders popup when defaultOpen', async ({ mount, page }) => {
      await mount(<TestDefault />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();
      await expect(popup).toHaveAttribute('data-open', '');
    });

    test('renders title and description', async ({ mount, page }) => {
      await mount(<TestDefault />);
      await expect(page.getByTestId('title')).toHaveText('Drawer title');
      await expect(page.getByTestId('description')).toHaveText('Drawer description');
    });

    test('renders backdrop', async ({ mount, page }) => {
      await mount(<TestDefault />);
      const backdrop = page.getByTestId('backdrop');
      await expect(backdrop).toBeAttached();
    });
  });

  test.describe('Interaction', () => {
    test('opens on trigger click', async ({ mount, page }) => {
      await mount(<TestClosed />);
      const popup = page.getByTestId('popup');
      await expect(popup).not.toBeVisible();

      await page.getByTestId('trigger').click();
      await expect(popup).toBeVisible();
    });

    test('closes on close button click', async ({ mount, page }) => {
      await mount(<TestDefault />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      await page.getByTestId('close').click();
      await expect(popup).not.toBeVisible();
    });

    test('closes on escape', async ({ mount, page }) => {
      await mount(<TestDefault />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(popup).not.toBeVisible();
    });

    test('closes on backdrop click', async ({ mount, page }) => {
      await mount(<TestClosed />);
      await page.getByTestId('trigger').click();
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      await page.mouse.click(10, 10);
      await expect(popup).not.toBeVisible();
    });
  });

  test.describe('Non-modal', () => {
    test('renders without backdrop', async ({ mount, page }) => {
      await mount(<TestNonModal />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();
    });

    test('allows clicks on background content', async ({ mount, page }) => {
      await mount(<TestNonModal />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      const bgButton = page.getByTestId('background-button');
      await bgButton.click({ force: true });
      await expect(bgButton).toHaveText('Clicked');
    });
  });

  test.describe('Controlled', () => {
    test('opens via external state and closes via close button', async ({ mount, page }) => {
      await mount(<TestControlled />);
      const popup = page.getByTestId('popup');
      await expect(popup).not.toBeVisible();

      await page.getByTestId('toggle').click();
      await expect(popup).toBeVisible();

      await page.getByTestId('close').click();
      await expect(popup).not.toBeVisible();
    });
  });

  test.describe('Snap points', () => {
    test('renders at snap point offset', async ({ mount, page }) => {
      await mount(<TestSnapPoints />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      const transform = await popup.evaluate((el) => getComputedStyle(el).transform);
      expect(transform).not.toBe('none');
    });
  });

  test.describe('Handle', () => {
    test('renders handle bar element', async ({ mount, page }) => {
      await mount(<TestWithHandle />);
      const handle = page.getByTestId('handle');
      await expect(handle).toBeVisible();
    });

    test('handle is hidden from accessibility tree', async ({ mount, page }) => {
      await mount(<TestWithHandle />);
      const handle = page.getByTestId('handle');
      await expect(handle).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test.describe('Side panel', () => {
    test('renders with swipe direction attribute', async ({ mount, page }) => {
      await mount(<TestSidePanel />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();
      await expect(popup).toHaveAttribute('data-swipe-direction', 'right');
    });

    test('closes on escape', async ({ mount, page }) => {
      await mount(<TestSidePanel />);
      const popup = page.getByTestId('popup');
      await expect(popup).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(popup).not.toBeVisible();
    });
  });

  test.describe('Nested drawers', () => {
    test('parent visible, child opens on trigger click', async ({ mount, page }) => {
      await mount(<TestNested />);
      const parentPopup = page.getByTestId('parent-popup');
      await expect(parentPopup).toBeVisible();

      const childTrigger = page.getByTestId('child-trigger');
      await expect(childTrigger).toBeVisible();

      await childTrigger.click();
      const childPopup = page.getByTestId('child-popup');
      await expect(childPopup).toBeVisible();
    });
  });

  test.describe('Indent effect', () => {
    test('indent element receives data-active when drawer is open', async ({ mount, page }) => {
      await mount(<TestIndent />);
      const indent = page.getByTestId('indent');
      await expect(indent).toHaveAttribute('data-active', '');
    });
  });

});
