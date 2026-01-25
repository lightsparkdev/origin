import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './index';
import { Field } from '@/components/Field';

const meta: Meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
};

export default meta;

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
];

/**
 * Default Combobox with filtering.
 * Pass `items` to Root and use a render function in List for automatic filtering.
 */
export const Default: StoryObj = {
  render: () => (
    <Combobox.Root items={fruits}>
      <Combobox.InputWrapper>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.ActionButtons>
          <Combobox.Trigger aria-label="Open popup" />
        </Combobox.ActionButtons>
      </Combobox.InputWrapper>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.Empty />
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item key={item} value={item}>
                  <Combobox.ItemIndicator />
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

/**
 * Combobox with Clear button.
 * Clear and Trigger are siblings inside ActionButtons.
 */
export const WithClear: StoryObj = {
  render: () => (
    <Combobox.Root items={fruits} defaultValue="Apple">
      <Combobox.InputWrapper>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.ActionButtons>
          <Combobox.Clear aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open popup" />
        </Combobox.ActionButtons>
      </Combobox.InputWrapper>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.Empty />
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item key={item} value={item}>
                  <Combobox.ItemIndicator />
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

/**
 * Multi-select Combobox.
 * Allows selecting multiple items.
 */
export const Multiple: StoryObj = {
  render: () => (
    <Combobox.Root items={fruits} multiple>
      <Combobox.InputWrapper>
        <Combobox.Input placeholder="Select fruits..." />
        <Combobox.ActionButtons>
          <Combobox.Trigger aria-label="Open popup" />
        </Combobox.ActionButtons>
      </Combobox.InputWrapper>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.Empty />
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item key={item} value={item}>
                  <Combobox.ItemIndicator />
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

/**
 * Combobox with grouped items.
 * Use Group and GroupLabel to organize options.
 */
const groupedFruits = {
  common: ['Apple', 'Banana', 'Orange'],
  exotic: ['Dragon Fruit', 'Mangosteen', 'Rambutan'],
};

export const WithGroups: StoryObj = {
  render: () => (
    <Combobox.Root items={[...groupedFruits.common, ...groupedFruits.exotic]}>
      <Combobox.InputWrapper>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.ActionButtons>
          <Combobox.Trigger aria-label="Open popup" />
        </Combobox.ActionButtons>
      </Combobox.InputWrapper>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.Empty />
            <Combobox.List>
              <Combobox.Group items={groupedFruits.common}>
                <Combobox.GroupLabel>Common</Combobox.GroupLabel>
                {(item: string) => (
                  <Combobox.Item key={item} value={item}>
                    <Combobox.ItemIndicator />
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                  </Combobox.Item>
                )}
              </Combobox.Group>
              <Combobox.Group items={groupedFruits.exotic}>
                <Combobox.GroupLabel>Exotic</Combobox.GroupLabel>
                {(item: string) => (
                  <Combobox.Item key={item} value={item}>
                    <Combobox.ItemIndicator />
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                  </Combobox.Item>
                )}
              </Combobox.Group>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

/**
 * Disabled Combobox.
 */
export const Disabled: StoryObj = {
  render: () => (
    <Combobox.Root items={fruits} disabled>
      <Combobox.InputWrapper>
        <Combobox.Input placeholder="Disabled combobox..." />
        <Combobox.ActionButtons>
          <Combobox.Trigger aria-label="Open popup" />
        </Combobox.ActionButtons>
      </Combobox.InputWrapper>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item key={item} value={item}>
                  <Combobox.ItemIndicator />
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

/**
 * Controlled Combobox.
 * Manage value state externally.
 */
export const Controlled: StoryObj = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>Selected: {value ?? 'none'}</div>
        <Combobox.Root items={fruits} value={value} onValueChange={setValue}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger aria-label="Open popup" />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>
    );
  },
};

/**
 * Combobox with Field integration.
 * Demonstrates label, description, and error messaging.
 */
export const WithField: StoryObj = {
  render: function WithField() {
    const [value, setValue] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const invalid = touched && !value;

    return (
      <Field.Root invalid={invalid}>
        <Field.Label>Favorite fruit</Field.Label>
        <Combobox.Root items={fruits} value={value} onValueChange={setValue}>
          <Combobox.InputWrapper>
            <Combobox.Input
              placeholder="Select a fruit..."
              onBlur={() => setTouched(true)}
            />
            <Combobox.ActionButtons>
              <Combobox.Trigger aria-label="Open popup" />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemIndicator />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
        <Field.Description>Choose your favorite</Field.Description>
        <Field.Error>Please select a fruit</Field.Error>
      </Field.Root>
    );
  },
};
