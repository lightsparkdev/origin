import { test, expect } from '@playwright/experimental-ct-react';
import {
  BasicAutocomplete,
  WithLeadingIcon,
  WithDisabledItems,
  DisabledAutocomplete,
  GroupedAutocomplete,
  ControlledAutocomplete,
} from './Autocomplete.test-stories';

test.describe('Autocomplete', () => {
  test.describe('Basic', () => {
    test('renders input with placeholder', async ({ mount }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');
      await expect(input).toBeVisible();
    });

    test('opens popup on click', async ({ mount, page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      await expect(page.getByRole('option', { name: 'Apple' })).toBeVisible();
    });

    test('filters items as user types', async ({ mount, page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await input.fill('ban');

      await expect(page.getByRole('option', { name: 'Banana' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Apple' })).not.toBeVisible();
    });

    test('shows empty message when no results', async ({ mount, page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await input.fill('xyz');

      await expect(page.getByText('No results found.')).toBeVisible();
    });

    test('selects item on click and fills input', async ({ mount, page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await page.getByRole('option', { name: 'Banana' }).click();

      await expect(input).toHaveValue('Banana');
    });

    test('navigates with keyboard and selects with Enter', async ({ mount, page: _page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await input.press('ArrowDown');
      await input.press('ArrowDown');
      await input.press('Enter');

      await expect(input).toHaveValue('Banana');
    });

    test('closes popup on Escape', async ({ mount, page }) => {
      const component = await mount(<BasicAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await expect(page.getByRole('listbox')).toBeVisible();

      await input.press('Escape');
      await expect(page.getByRole('listbox')).toBeHidden();
    });
  });

  test.describe('With Leading Icon', () => {
    test('renders items with icons', async ({ mount, page }) => {
      const component = await mount(<WithLeadingIcon />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await expect(page.getByRole('option', { name: 'Apple' })).toBeVisible();
    });
  });

  test.describe('Disabled Items', () => {
    test('does not select disabled items', async ({ mount, page }) => {
      const component = await mount(<WithDisabledItems />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      const disabledItem = page.getByRole('option', { name: 'Cherry' });
      await expect(disabledItem).toHaveAttribute('data-disabled');

      await disabledItem.click({ force: true });
      await expect(input).not.toHaveValue('Cherry');
    });

    test('skips disabled items during keyboard navigation', async ({ mount, page: _page }) => {
      const component = await mount(<WithDisabledItems />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      // Navigate: Apple -> Banana -> (skip Cherry) -> Date
      await input.press('ArrowDown'); // Apple
      await input.press('ArrowDown'); // Banana
      await input.press('ArrowDown'); // Date (skips Cherry)
      await input.press('Enter');

      await expect(input).toHaveValue('Date');
    });
  });

  test.describe('Disabled Autocomplete', () => {
    test('input is disabled', async ({ mount }) => {
      const component = await mount(<DisabledAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await expect(input).toHaveAttribute('data-disabled');
    });

    test('does not open popup when disabled', async ({ mount, page }) => {
      const component = await mount(<DisabledAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click({ force: true });
      await expect(page.getByRole('listbox')).not.toBeVisible();
    });
  });

  test.describe('Grouped', () => {
    test('renders groups with labels', async ({ mount, page }) => {
      const component = await mount(<GroupedAutocomplete />);
      const input = component.getByPlaceholder('Search produce...');

      await input.click();

      await expect(page.getByText('Fruits')).toBeVisible();
      await expect(page.getByText('Vegetables')).toBeVisible();
      await expect(page.getByRole('option', { name: 'Apple' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Carrot' })).toBeVisible();
    });
  });

  test.describe('Controlled', () => {
    test('value changes on item selection', async ({ mount, page }) => {
      const component = await mount(<ControlledAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await page.getByRole('option', { name: 'Cherry' }).click();

      await expect(component.getByTestId('value-display')).toHaveText('Value: Cherry');
    });

    test('filters based on controlled value', async ({ mount, page }) => {
      const component = await mount(<ControlledAutocomplete />);
      const input = component.getByPlaceholder('Search fruits...');

      await input.click();
      await input.fill('Eld');
      await expect(page.getByRole('option', { name: 'Elderberry' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Apple' })).not.toBeVisible();
    });
  });
});
