import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Select } from './index';
import { Field } from '../Field';
import { CentralIcon } from '../Icon';

const meta: Meta = {
  title: 'Components/Select',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

export const Default: StoryObj = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {fruits.map((fruit) => (
                <Select.Item key={fruit.value} value={fruit.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{fruit.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithDefaultValue: StoryObj = {
  render: () => (
    <Select.Root defaultValue="banana">
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {fruits.map((fruit) => (
                <Select.Item key={fruit.value} value={fruit.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{fruit.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <Select.Root disabled>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {fruits.map((fruit) => (
                <Select.Item key={fruit.value} value={fruit.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{fruit.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithGroups: StoryObj = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select food" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="apple">
                <Select.ItemIndicator />
                <Select.ItemText>Apple</Select.ItemText>
              </Select.Item>
              <Select.Item value="banana">
                <Select.ItemIndicator />
                <Select.ItemText>Banana</Select.ItemText>
              </Select.Item>
            </Select.List>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.List>
                <Select.Item value="carrot">
                  <Select.ItemIndicator />
                  <Select.ItemText>Carrot</Select.ItemText>
                </Select.Item>
                <Select.Item value="broccoli">
                  <Select.ItemIndicator />
                  <Select.ItemText>Broccoli</Select.ItemText>
                </Select.Item>
              </Select.List>
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithTrailingIcons: StoryObj = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a country" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="us" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                <Select.ItemIndicator />
                <Select.ItemText>United States</Select.ItemText>
              </Select.Item>
              <Select.Item value="uk" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                <Select.ItemIndicator />
                <Select.ItemText>United Kingdom</Select.ItemText>
              </Select.Item>
              <Select.Item value="de" trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}>
                <Select.ItemIndicator />
                <Select.ItemText>Germany</Select.ItemText>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const MultiSelect: StoryObj = {
  render: function MultiSelect() {
    const [value, setValue] = React.useState<string[]>(['apple', 'banana']);

    // Render function for multi-select value display
    function renderValue(selected: string[]) {
      if (selected.length === 0) {
        return <span data-placeholder="">Select fruits</span>;
      }
      const labels: Record<string, string> = {
        apple: 'Apple',
        banana: 'Banana',
        orange: 'Orange',
        grape: 'Grape',
        mango: 'Mango',
      };
      const firstItem = labels[selected[0]];
      if (selected.length === 1) {
        return firstItem;
      }
      return `${firstItem} +${selected.length - 1}`;
    }

    return (
      <Select.Root multiple value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value>{renderValue}</Select.Value>
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {fruits.map((fruit) => (
                  <Select.Item key={fruit.value} value={fruit.value}>
                    <Select.ItemIndicator />
                    <Select.ItemText>{fruit.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
  },
};

export const WithFieldValidation: StoryObj = {
  render: function WithFieldValidation() {
    const [value, setValue] = React.useState<string | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && !value;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <Field.Root invalid={isInvalid}>
          <Field.Label>Favorite fruit</Field.Label>
          <Select.Root value={value} onValueChange={setValue}>
            <Select.Trigger>
              <Select.Value placeholder="Select a fruit" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    {fruits.map((fruit) => (
                      <Select.Item key={fruit.value} value={fruit.value}>
                        <Select.ItemIndicator />
                        <Select.ItemText>{fruit.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Field.Error>Please select a fruit</Field.Error>
        </Field.Root>
        <button type="submit">Submit</button>
      </form>
    );
  },
};
