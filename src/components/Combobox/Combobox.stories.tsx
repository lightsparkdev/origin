import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './index';

const meta: Meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
};

export default meta;

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export const Default: StoryObj = {
  render: () => (
    <Combobox.Root>
      <Combobox.Trigger>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                </Combobox.Item>
              ))}
            </Combobox.List>
            <Combobox.Empty />
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

export const WithClear: StoryObj = {
  render: () => (
    <Combobox.Root defaultValue="Apple">
      <Combobox.Trigger>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.Clear />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                </Combobox.Item>
              ))}
            </Combobox.List>
            <Combobox.Empty />
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

export const Multiple: StoryObj = {
  render: () => (
    <Combobox.Root multiple>
      <Combobox.Trigger>
        <Combobox.Input placeholder="Select fruits..." />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                </Combobox.Item>
              ))}
            </Combobox.List>
            <Combobox.Empty />
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

export const WithGroups: StoryObj = {
  render: () => (
    <Combobox.Root>
      <Combobox.Trigger>
        <Combobox.Input placeholder="Select a fruit..." />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              <Combobox.Group>
                <Combobox.GroupLabel>Common</Combobox.GroupLabel>
                <Combobox.Item value="Apple">Apple</Combobox.Item>
                <Combobox.Item value="Banana">Banana</Combobox.Item>
                <Combobox.Item value="Orange">Orange</Combobox.Item>
              </Combobox.Group>
              <Combobox.Group>
                <Combobox.GroupLabel>Exotic</Combobox.GroupLabel>
                <Combobox.Item value="Dragon Fruit">Dragon Fruit</Combobox.Item>
                <Combobox.Item value="Mangosteen">Mangosteen</Combobox.Item>
                <Combobox.Item value="Rambutan">Rambutan</Combobox.Item>
              </Combobox.Group>
            </Combobox.List>
            <Combobox.Empty />
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <Combobox.Root disabled>
      <Combobox.Trigger>
        <Combobox.Input placeholder="Disabled combobox..." />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  ),
};

export const Controlled: StoryObj = {
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          Selected: {value ?? 'none'}
        </div>
        <Combobox.Root value={value} onValueChange={setValue}>
          <Combobox.Trigger>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.Icon />
          </Combobox.Trigger>
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  {fruits.map((fruit) => (
                    <Combobox.Item key={fruit} value={fruit}>
                      {fruit}
                    </Combobox.Item>
                  ))}
                </Combobox.List>
                <Combobox.Empty />
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>
    );
  },
};
