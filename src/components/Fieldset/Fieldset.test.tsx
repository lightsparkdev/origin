import { test, expect } from '@playwright/experimental-ct-react';
import { BasicFieldset, FieldsetWithDescription, DisabledFieldset } from './Fieldset.test-stories';

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

  test('disables all children when disabled', async ({ mount }) => {
    const component = await mount(<DisabledFieldset />);
    
    await expect(component.getByPlaceholder('Disabled input')).toBeDisabled();
    await expect(component.getByPlaceholder('Also disabled')).toBeDisabled();
  });
});
