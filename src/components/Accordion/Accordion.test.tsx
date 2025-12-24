import { test, expect } from '@playwright/experimental-ct-react';
import { TestAccordion } from './Accordion.test-stories';

test.describe('Accordion', () => {
  test('has no accessibility violations', async ({ mount, page }) => {
    await mount(<TestAccordion />);
    const AxeBuilder = (await import('@axe-core/playwright')).default;
    const results = await new AxeBuilder({ page })
      .exclude('html')
      .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('expands panel on trigger click', async ({ mount }) => {
    const component = await mount(<TestAccordion />);
    const trigger = component.getByRole('button', { name: 'First Item' });
    const panel = component.getByText('First panel content');

    await expect(panel).toBeHidden();
    await trigger.click();
    await expect(panel).toBeVisible();
  });

  test('supports keyboard navigation', async ({ mount, page }) => {
    const component = await mount(<TestAccordion />);
    const firstTrigger = component.getByRole('button', { name: 'First Item' });
    const secondTrigger = component.getByRole('button', { name: 'Second Item' });
    const secondPanel = component.getByText('Second panel content');

    await firstTrigger.focus();
    await expect(firstTrigger).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(secondTrigger).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(secondPanel).toBeVisible();
  });

  test('respects prefers-reduced-motion', async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const component = await mount(<TestAccordion />);
    const icon = component.locator('svg').first();
    const transition = await icon.evaluate((el) =>
      window.getComputedStyle(el).transition
    );
    expect(transition).toMatch(/none|all 0s/);
  });
});
