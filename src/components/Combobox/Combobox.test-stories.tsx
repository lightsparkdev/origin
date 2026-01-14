import { useState } from 'react';
import { Combobox } from './index';

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export const TestCombobox = () => (
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
);

export const TestComboboxMultiple = () => (
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
);

export const TestComboboxDisabled = () => (
  <Combobox.Root disabled>
    <Combobox.Trigger>
      <Combobox.Input placeholder="Disabled..." />
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
);

export const TestComboboxDefaultValue = () => (
  <Combobox.Root defaultValue="Cherry">
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
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  </Combobox.Root>
);

export const TestComboboxControlled = ({
  onChange,
}: {
  onChange?: (value: string | null) => void;
}) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Combobox.Root
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
    >
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
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};

export const TestComboboxWithGroups = () => (
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
            </Combobox.Group>
            <Combobox.Group>
              <Combobox.GroupLabel>Exotic</Combobox.GroupLabel>
              <Combobox.Item value="Dragon Fruit">Dragon Fruit</Combobox.Item>
              <Combobox.Item value="Mangosteen">Mangosteen</Combobox.Item>
            </Combobox.Group>
          </Combobox.List>
          <Combobox.Empty />
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  </Combobox.Root>
);

export const TestComboboxWithClear = () => (
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
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  </Combobox.Root>
);
