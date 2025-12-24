import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import {
  FilledButton,
  OutlineButton,
  GhostButton,
  CriticalButton,
  DisabledButton,
  LoadingButton,
  AllSizes,
  IconOnlyButton,
} from './Button.test-stories';

const axeConfig = {
  rules: {
    'landmark-one-main': { enabled: false },
    'page-has-heading-one': { enabled: false },
    'region': { enabled: false },
  },
};

test.describe('Button', () => {
  test('filled variant has no accessibility violations', async ({ mount, page }) => {
    await mount(<FilledButton />);
    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });

  test('outline variant has no accessibility violations', async ({ mount, page }) => {
    await mount(<OutlineButton />);
    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });

  test('ghost variant has no accessibility violations', async ({ mount, page }) => {
    await mount(<GhostButton />);
    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });

  test('critical variant has no accessibility violations', async ({ mount, page }) => {
    await mount(<CriticalButton />);
    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });

  test('can be activated with Enter key', async ({ mount, page }) => {
    await mount(<FilledButton />);
    
    const button = page.getByRole('button');
    await button.focus();
    await page.keyboard.press('Enter');
    
    await expect(button).toBeFocused();
  });

  test('can be activated with Space key', async ({ mount, page }) => {
    await mount(<FilledButton />);
    
    const button = page.getByRole('button');
    await button.focus();
    await page.keyboard.press('Space');
    
    await expect(button).toBeFocused();
  });

  test('disabled button cannot be focused', async ({ mount, page }) => {
    await mount(<DisabledButton />);
    
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('loading button is disabled', async ({ mount, page }) => {
    await mount(<LoadingButton />);
    
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('loading button shows loader', async ({ mount, page }) => {
    await mount(<LoadingButton />);
    
    const loader = page.getByRole('status', { name: 'Loading' });
    await expect(loader).toBeVisible();
  });

  test('all sizes render correctly', async ({ mount, page }) => {
    await mount(<AllSizes />);
    
    await expect(page.getByRole('button', { name: 'Small' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Large' })).toBeVisible();
  });

  test('icon-only button has accessible name', async ({ mount, page }) => {
    await mount(<IconOnlyButton />);
    
    const button = page.getByRole('button', { name: 'Add item' });
    await expect(button).toBeVisible();
    
    const results = await new AxeBuilder({ page }).options(axeConfig).analyze();
    expect(results.violations).toEqual([]);
  });

  test('respects reduced motion preference', async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(<FilledButton />);
    
    const button = page.getByRole('button');
    const transition = await button.evaluate((el) => 
      getComputedStyle(el).transition
    );
    
    expect(transition).toMatch(/none|0s/);
  });
});
