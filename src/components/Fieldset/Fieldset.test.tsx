import { test, expect } from '@playwright/experimental-ct-react';
import {
  BasicFieldset,
  FieldsetWithDescription,
  HorizontalFieldset,
  DisabledFieldset,
} from './Fieldset.test-stories';

test.describe('Fieldset', () => {
  test('renders legend and children', async ({ mount }) => {
    const component = await mount(<BasicFieldset />);

    await expect(component.getByText('Personal Information')).toBeVisible();
    await expect(component.getByPlaceholder('Enter first name')).toBeVisible();
    await expect(component.getByPlaceholder('Enter last name')).toBeVisible();
  });

  test('renders fields with descriptions', async ({ mount }) => {
    const component = await mount(<FieldsetWithDescription />);

    await expect(component.getByText('Contact Details')).toBeVisible();
    await expect(component.getByText("We'll use this to contact you.")).toBeVisible();
    await expect(component.getByText('Optional phone number.')).toBeVisible();
  });

  test('horizontal orientation renders fields in a row', async ({ mount }) => {
    const component = await mount(<HorizontalFieldset />);

    await expect(component.getByText('Address')).toBeVisible();
    await expect(component.getByPlaceholder('Enter city')).toBeVisible();
    await expect(component.getByPlaceholder('Enter state')).toBeVisible();
    await expect(component.getByPlaceholder('Enter zip')).toBeVisible();

    const fieldsWrapper = component.locator('[data-orientation="horizontal"]');
    await expect(fieldsWrapper).toHaveCSS('flex-direction', 'row');
  });

  test('vertical orientation renders fields in a column', async ({ mount }) => {
    const component = await mount(<BasicFieldset />);

    const fieldsWrapper = component.locator('[data-orientation="vertical"]');
    await expect(fieldsWrapper).toHaveCSS('flex-direction', 'column');
  });

  test('disables all children when disabled', async ({ mount }) => {
    const component = await mount(<DisabledFieldset />);

    await expect(component.getByPlaceholder('Disabled input')).toBeDisabled();
    await expect(component.getByPlaceholder('Also disabled')).toBeDisabled();
  });
});
