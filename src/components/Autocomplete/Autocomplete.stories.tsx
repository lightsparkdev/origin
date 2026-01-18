import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { matchSorter } from 'match-sorter';
import * as Autocomplete from './parts';
import { CentralIcon } from '@/components/Icon';

interface Fruit {
  value: string;
  label: string;
}

const fruits: Fruit[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const meta: Meta = {
  title: 'Components/Autocomplete',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * Basic autocomplete with search suggestions.
 */
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(item: Fruit) => (
                  <Autocomplete.Item key={item.value} value={item}>
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  ),
};

/**
 * Items with leading icons.
 */
export const WithLeadingIcons: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(item: Fruit) => (
                  <Autocomplete.Item
                    key={item.value}
                    value={item}
                    leadingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                  >
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  ),
};

/**
 * Grouped suggestions with labels.
 */
export const Grouped: StoryObj = {
  render: () => {
    const groupedItems = [
      {
        label: 'Fruits',
        items: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
        ],
      },
      {
        label: 'Vegetables',
        items: [
          { value: 'carrot', label: 'Carrot' },
          { value: 'broccoli', label: 'Broccoli' },
          { value: 'spinach', label: 'Spinach' },
        ],
      },
    ];

    return (
      <div style={{ width: 300 }}>
        <Autocomplete.Root items={groupedItems}>
          <Autocomplete.Input placeholder="Search produce..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(group: (typeof groupedItems)[0]) => (
                    <Autocomplete.Group key={group.label} items={group.items}>
                      <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
                      <Autocomplete.Collection>
                        {(item: Fruit) => (
                          <Autocomplete.Item key={item.value} value={item}>
                            {item.label}
                          </Autocomplete.Item>
                        )}
                      </Autocomplete.Collection>
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
    );
  },
};

/**
 * Async loading with status indicator.
 */
export const AsyncLoading: StoryObj = {
  render: function AsyncAutocomplete() {
    const [items, setItems] = React.useState<Fruit[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
      if (!value) {
        setItems([]);
        return;
      }

      setLoading(true);
      const timer = setTimeout(() => {
        setItems(fruits.filter((f) => f.label.toLowerCase().includes(value.toLowerCase())));
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }, [value]);

    return (
      <div style={{ width: 300 }}>
        <Autocomplete.Root items={items} value={value} onValueChange={setValue} filter={null}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Status>
                  {loading ? 'Loading...' : null}
                </Autocomplete.Status>
                <Autocomplete.Empty>
                  {!loading && value ? 'No results found.' : null}
                </Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: Fruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      {item.label}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
    );
  },
};

/**
 * Disabled autocomplete.
 */
export const Disabled: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <Autocomplete.Root items={fruits} disabled>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.List>
                {(item: Fruit) => (
                  <Autocomplete.Item key={item.value} value={item}>
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  ),
};

/**
 * With disabled items.
 */
export const DisabledItems: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(item: Fruit) => (
                  <Autocomplete.Item
                    key={item.value}
                    value={item}
                    disabled={item.value === 'cherry' || item.value === 'fig'}
                  >
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  ),
};

/**
 * Controlled autocomplete with external state.
 */
export const Controlled: StoryObj = {
  render: function ControlledAutocomplete() {
    const [value, setValue] = React.useState('');

    return (
      <div style={{ width: 300 }}>
        <Autocomplete.Root items={fruits} value={value} onValueChange={setValue}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: Fruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      {item.label}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
        <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          Current value: <strong>{value || '(empty)'}</strong>
        </p>
      </div>
    );
  },
};

interface FuzzyItem {
  label: string;
}

const fuzzyItems: FuzzyItem[] = [
  { label: 'React' },
  { label: 'JavaScript' },
  { label: 'TypeScript' },
  { label: 'Node.js' },
  { label: 'CSS Grid' },
  { label: 'Flexbox' },
  { label: 'Redux' },
  { label: 'GraphQL' },
];

function fuzzyFilter(item: FuzzyItem, query: string): boolean {
  if (!query) return true;
  const results = matchSorter([item], query, {
    keys: ['label'],
  });
  return results.length > 0;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) {
    return <span style={{ color: 'var(--text-primary)' }}>{text}</span>;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ color: 'var(--text-primary)' }}>{part}</span>
        ) : (
          <span key={i} style={{ color: 'var(--text-secondary)' }}>{part}</span>
        )
      )}
    </>
  );
}

function FuzzyMatchingDemo() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: 300 }}>
      <Autocomplete.Root
        items={fuzzyItems}
        filter={fuzzyFilter}
        itemToStringValue={(item: FuzzyItem) => item.label}
        value={value}
        onValueChange={setValue}
      >
        <Autocomplete.Input placeholder="Search (try 'rct')..." />
        <Autocomplete.Portal>
          <Autocomplete.Positioner>
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results found.</Autocomplete.Empty>
              <Autocomplete.List>
                {(item: FuzzyItem) => (
                  <Autocomplete.Item key={item.label} value={item}>
                    {highlightMatch(item.label, value)}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
}

/**
 * Fuzzy matching highlights matching text in text-primary, remainder in text-secondary.
 */
export const FuzzyMatching: StoryObj = {
  render: () => <FuzzyMatchingDemo />,
};
