'use client';

import * as React from 'react';
import { Select } from './index';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

export function DefaultSelect() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select option" />
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
}

export function DisabledSelect() {
  return (
    <Select.Root disabled>
      <Select.Trigger>
        <Select.Value placeholder="Select option" />
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
}

export function WithDefaultValue() {
  return (
    <Select.Root defaultValue="banana">
      <Select.Trigger>
        <Select.Value placeholder="Select option" />
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
}

export function WithGroups() {
  return (
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
  );
}

export function ControlledSelect() {
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <div>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Select option" />
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
      <span data-testid="selected-value">{value ?? 'none'}</span>
    </div>
  );
}

export function DisabledItem() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select option" />
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
              <Select.Item value="banana" disabled>
                <Select.ItemIndicator />
                <Select.ItemText>Banana (disabled)</Select.ItemText>
              </Select.Item>
              <Select.Item value="orange">
                <Select.ItemIndicator />
                <Select.ItemText>Orange</Select.ItemText>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

const fruitLabels: Record<string, string> = {
  apple: 'Apple',
  banana: 'Banana',
  orange: 'Orange',
};

function renderMultiValue(selected: string[]) {
  if (selected.length === 0) {
    return <span data-placeholder="">Select fruits</span>;
  }
  const firstItem = fruitLabels[selected[0]];
  if (selected.length === 1) {
    return firstItem;
  }
  return `${firstItem} +${selected.length - 1}`;
}

export function MultiSelectDefault() {
  return (
    <Select.Root multiple defaultValue={['apple', 'banana']}>
      <Select.Trigger>
        <Select.Value>{renderMultiValue}</Select.Value>
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
}

export function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <div>
      <Select.Root multiple value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value>{renderMultiValue}</Select.Value>
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
      <span data-testid="selected-count">{value.length}</span>
    </div>
  );
}
