# Origin Components Reference

Complete API reference for all Origin design system components.

## Simple Components

### Button

Primary action component with multiple variants.

```tsx
import { Button } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outline' \| 'ghost' \| 'critical' \| 'link'` | `'filled'` | Visual style |
| `size` | `'default' \| 'compact'` | `'default'` | Button size |
| `loading` | `boolean` | `false` | Shows spinner, disables button |
| `leadingIcon` | `ReactNode` | - | Icon before text |
| `trailingIcon` | `ReactNode` | - | Icon after text |
| `iconOnly` | `boolean` | `false` | For icon-only buttons |
| `disabled` | `boolean` | `false` | Disabled state |

```tsx
<Button variant="filled">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
<Button variant="critical">Delete</Button>
<Button variant="link">Link Style</Button>
<Button size="compact">Small</Button>
<Button loading>Processing</Button>
<Button leadingIcon={<CentralIcon name="plus" />}>Add</Button>
<Button iconOnly><CentralIcon name="settings" /></Button>
```

### Input

Text input field wrapping Base UI Input.

```tsx
import { Input } from '@grid/origin';
```

Standard HTML input attributes plus Base UI enhancements. Use with Field for labels/errors.

```tsx
<Input placeholder="Enter text" />
<Input type="email" />
<Input type="password" />
<Input disabled />
<Input data-invalid />
```

### Badge

Compact status/category labels.

```tsx
import { Badge } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'gray' \| 'purple' \| 'blue' \| 'sky' \| 'pink' \| 'green' \| 'yellow' \| 'red'` | `'gray'` | Color variant |
| `vibrant` | `boolean` | `false` | High contrast version |

```tsx
<Badge>Default</Badge>
<Badge variant="green">Success</Badge>
<Badge variant="red">Error</Badge>
<Badge variant="blue" vibrant>New</Badge>
```

### Alert

Info or critical message display.

```tsx
import { Alert } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'critical'` | `'default'` | Alert type |
| `title` | `string` | **required** | Alert heading |
| `description` | `string` | - | Additional text |
| `icon` | `boolean \| ReactNode` | `true` | Show/custom icon |

```tsx
<Alert title="Information" description="This is helpful info." />
<Alert variant="critical" title="Error" description="Something went wrong." />
<Alert title="Custom Icon" icon={<CentralIcon name="bell" />} />
```

### Loader

Loading spinner with 3x3 dot grid animation.

```tsx
import { Loader } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `label` | `string` | `'Loading'` | Accessibility label |

```tsx
<Loader />
<Loader size="sm" />
<Loader size="lg" label="Loading content..." />
```

### Chip

Dismissible tag/filter component.

```tsx
import { Chip } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'filter'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Chip size |
| `onDismiss` | `(details: EventDetails) => void` | - | Dismiss callback |
| `dismissIcon` | `ReactNode` | - | Custom dismiss icon |

```tsx
<Chip>Tag</Chip>
<Chip onDismiss={() => {}}>Removable</Chip>
<Chip variant="filter" size="sm">Filter</Chip>
```

### Switch

Toggle switch control.

```tsx
import { Switch } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Switch size |
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | - | Uncontrolled default |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |

```tsx
<Switch />
<Switch size="sm" />
<Switch checked={isOn} onCheckedChange={setIsOn} />
<Switch disabled />
```

### CentralIcon

Icon component with 100+ Figma icons.

```tsx
import { CentralIcon } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `CentralIconName` | **required** | Icon name (autocomplete) |
| `size` | `number` | `20` | Icon size in px |
| `color` | `string` | `'currentColor'` | Icon color |

```tsx
<CentralIcon name="check" />
<CentralIcon name="chevron-down" size={16} />
<CentralIcon name="search" color="var(--icon-secondary)" />
```

Icon names are available via TypeScript autocomplete using the `CentralIconName` type.

### Logo

Lightspark logo component.

```tsx
import { Logo } from '@grid/origin';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'logo' \| 'logomark' \| 'wordmark'` | `'logo'` | Logo type |
| `weight` | `'regular' \| 'light'` | `'regular'` | Font weight |
| `height` | `number` | `24` | Height in px |
| `color` | `string` | `'currentColor'` | Logo color |

---

## Compound Components

### Avatar

User/entity image with fallback.

```tsx
import { Avatar } from '@grid/origin';
```

**Parts:** `Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`

| Prop (Root) | Type | Default | Description |
|-------------|------|---------|-------------|
| `size` | `'16' \| '20' \| '24' \| '32' \| '40' \| '48'` | `'32'` | Avatar size |
| `variant` | `'squircle' \| 'circle'` | `'squircle'` | Shape |
| `color` | `'blue' \| 'purple' \| 'sky' \| 'pink' \| 'green' \| 'yellow' \| 'red' \| 'gray'` | - | Fallback color |

```tsx
<Avatar.Root size="40">
  <Avatar.Image src="/user.jpg" alt="User name" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>

<Avatar.Root variant="circle" color="blue">
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar.Root>
```

### Field

Form field wrapper with label, description, and error.

```tsx
import { Field } from '@grid/origin';
```

**Parts:** `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error`

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.Description>We'll never share your email.</Field.Description>
</Field.Root>

<Field.Root data-invalid={hasError}>
  <Field.Label>Username</Field.Label>
  <Input data-invalid={hasError} />
  <Field.Error>Username is required.</Field.Error>
</Field.Root>
```

### Fieldset

Grouping wrapper for related form fields.

```tsx
import { Fieldset } from '@grid/origin';
```

**Parts:** `Fieldset.Root`, `Fieldset.Legend`, `Fieldset.Description`, `Fieldset.Error`

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Contact Information</Fieldset.Legend>
  <Fieldset.Description>Enter your contact details below.</Fieldset.Description>
  {/* Field components */}
</Fieldset.Root>
```

### Select

Dropdown selection component.

```tsx
import { Select } from '@grid/origin';
```

**Parts:** `Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Icon`, `Select.Portal`, `Select.Positioner`, `Select.Popup`, `Select.List`, `Select.Item`, `Select.Group`, `Select.GroupLabel`, `Select.Separator`

| Prop (Trigger) | Type | Default | Description |
|----------------|------|---------|-------------|
| `variant` | `'default' \| 'ghost'` | `'default'` | Trigger style |

| Prop (Value) | Type | Default | Description |
|--------------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |

```tsx
<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Select option" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.List>
          <Select.Item value="opt1">Option 1</Select.Item>
          <Select.Item value="opt2">Option 2</Select.Item>
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Group</Select.GroupLabel>
            <Select.Item value="opt3">Option 3</Select.Item>
          </Select.Group>
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

### Checkbox

Checkbox with group support.

```tsx
import { Checkbox } from '@grid/origin';
```

**Parts:** `Checkbox.Group`, `Checkbox.Item`, `Checkbox.Field`, `Checkbox.Legend`, `Checkbox.Description`, `Checkbox.Error`, `Checkbox.Indicator`

| Prop (Group) | Type | Default | Description |
|--------------|------|---------|-------------|
| `value` | `string[]` | - | Selected values (controlled) |
| `defaultValue` | `string[]` | `[]` | Default selected (uncontrolled) |
| `onValueChange` | `(value: string[]) => void` | - | Change handler |
| `variant` | `'default' \| 'card'` | `'default'` | Visual style |

| Prop (Item) | Type | Default | Description |
|-------------|------|---------|-------------|
| `value` | `string` | **required** | Item value |
| `checked` | `boolean` | - | Controlled state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `label` | `ReactNode` | - | Item label |
| `description` | `ReactNode` | - | Item description |
| `disabled` | `boolean` | `false` | Disabled state |

```tsx
<Checkbox.Group value={selected} onValueChange={setSelected}>
  <Checkbox.Item value="item1" label="Item 1" />
  <Checkbox.Item value="item2" label="Item 2" description="With description" />
  <Checkbox.Item value="item3" label="Disabled" disabled />
</Checkbox.Group>

// Single checkbox
<Checkbox.Item checked={isChecked} onCheckedChange={setIsChecked} label="Accept terms" />
```

### Radio

Radio button group.

```tsx
import { Radio } from '@grid/origin';
```

**Parts:** `Radio.Group`, `Radio.Item`, `Radio.Field`, `Radio.Legend`, `Radio.Description`, `Radio.Error`

| Prop (Group) | Type | Default | Description |
|--------------|------|---------|-------------|
| `value` | `string` | - | Selected value (controlled) |
| `defaultValue` | `string` | - | Default selected (uncontrolled) |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `variant` | `'default' \| 'card'` | `'default'` | Visual style |

| Prop (Item) | Type | Default | Description |
|-------------|------|---------|-------------|
| `value` | `string` | **required** | Item value |
| `label` | `ReactNode` | - | Item label |
| `description` | `ReactNode` | - | Item description |
| `disabled` | `boolean` | `false` | Disabled state |

```tsx
<Radio.Group value={selected} onValueChange={setSelected}>
  <Radio.Item value="option1" label="Option 1" />
  <Radio.Item value="option2" label="Option 2" description="With description" />
  <Radio.Item value="option3" label="Disabled" disabled />
</Radio.Group>
```

### Tabs

Tabbed navigation component.

```tsx
import { Tabs } from '@grid/origin';
```

**Parts:** `Tabs.Root`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`, `Tabs.Indicator`

| Prop (List) | Type | Default | Description |
|-------------|------|---------|-------------|
| `variant` | `'default' \| 'minimal'` | `'default'` | Tab style |

```tsx
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
  <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
</Tabs.Root>
```

### Accordion

Collapsible content sections.

```tsx
import { Accordion } from '@grid/origin';
```

**Parts:** `Accordion.Root`, `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Panel`

| Prop (Root) | Type | Default | Description |
|-------------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Expansion mode |
| `value` | `string \| string[]` | - | Controlled expanded items |
| `defaultValue` | `string \| string[]` | - | Default expanded |
| `onValueChange` | `(value) => void` | - | Change handler |
| `collapsible` | `boolean` | `true` | Allow all closed (single mode) |

```tsx
<Accordion.Root type="single" defaultValue="item1">
  <Accordion.Item value="item1">
    <Accordion.Header>
      <Accordion.Trigger>Section 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Header>
      <Accordion.Trigger>Section 2</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content 2</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

### Menu

Dropdown action menu.

```tsx
import { Menu } from '@grid/origin';
```

**Parts:** `Menu.Root`, `Menu.Trigger`, `Menu.Portal`, `Menu.Positioner`, `Menu.Popup`, `Menu.Item`, `Menu.Separator`, `Menu.Group`, `Menu.GroupLabel`, `Menu.Submenu`, `Menu.SubmenuTrigger`

```tsx
<Menu.Root>
  <Menu.Trigger>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
        <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item onSelect={() => {}} disabled>Delete</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

### Tooltip

Contextual hint on hover/focus.

```tsx
import { Tooltip } from '@grid/origin';
```

**Parts:** `Tooltip.Provider`, `Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Portal`, `Tooltip.Positioner`, `Tooltip.Popup`, `Tooltip.Arrow`

```tsx
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          <Tooltip.Arrow />
          Helpful tooltip text
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

### AlertDialog

Confirmation/alert dialog.

```tsx
import { AlertDialog } from '@grid/origin';
```

**Parts:** `AlertDialog.Root`, `AlertDialog.Trigger`, `AlertDialog.Portal`, `AlertDialog.Backdrop`, `AlertDialog.Popup`, `AlertDialog.Title`, `AlertDialog.Description`, `AlertDialog.Close`, `AlertDialog.Actions`

```tsx
<AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button variant="critical">Delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this item? This action cannot be undone.
      </AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close>
          <Button variant="outline">Cancel</Button>
        </AlertDialog.Close>
        <Button variant="critical" onClick={handleDelete}>Delete</Button>
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

### Table

Data table component.

```tsx
import { Table } from '@grid/origin';
```

**Parts:** `Table.Root`, `Table.Header`, `Table.HeaderCell`, `Table.Body`, `Table.Row`, `Table.Cell`

```tsx
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
      <Table.Cell><Badge variant="green">Active</Badge></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### NavigationMenu

Site navigation component.

```tsx
import { NavigationMenu } from '@grid/origin';
```

**Parts:** `NavigationMenu.Root`, `NavigationMenu.List`, `NavigationMenu.Item`, `NavigationMenu.Trigger`, `NavigationMenu.Icon`, `NavigationMenu.Link`, `NavigationMenu.Content`, `NavigationMenu.Portal`, `NavigationMenu.Positioner`, `NavigationMenu.Popup`, `NavigationMenu.Viewport`, `NavigationMenu.Arrow`, `NavigationMenu.Backdrop`, `NavigationMenu.PopupItem`, `NavigationMenu.SubmenuTrigger`, `NavigationMenu.Group`, `NavigationMenu.GroupLabel`, `NavigationMenu.Separator`

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        Products
        <NavigationMenu.Icon />
      </NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.PopupItem href="/product-1">Product 1</NavigationMenu.PopupItem>
            <NavigationMenu.PopupItem href="/product-2">Product 2</NavigationMenu.PopupItem>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Breadcrumb

Breadcrumb navigation.

```tsx
import { Breadcrumb } from '@grid/origin';
```

**Parts:** `Breadcrumb.Root`, `Breadcrumb.List`, `Breadcrumb.Item`, `Breadcrumb.Link`, `Breadcrumb.Separator`

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item isCurrent>
      <Breadcrumb.Link href="/products/item">Current Item</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Combobox

Searchable dropdown (autocomplete).

```tsx
import { Combobox } from '@grid/origin';
```

**Parts:** `Combobox.Root`, `Combobox.Control`, `Combobox.Input`, `Combobox.Trigger`, `Combobox.Portal`, `Combobox.Positioner`, `Combobox.Popup`, `Combobox.List`, `Combobox.Item`, `Combobox.Group`, `Combobox.GroupLabel`, `Combobox.Separator`

```tsx
<Combobox.Root value={value} onValueChange={setValue}>
  <Combobox.Control>
    <Combobox.Input placeholder="Search..." />
    <Combobox.Trigger />
  </Combobox.Control>
  <Combobox.Portal>
    <Combobox.Positioner>
      <Combobox.Popup>
        <Combobox.List>
          {filteredItems.map(item => (
            <Combobox.Item key={item.value} value={item.value}>
              {item.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>
```

### Pagination

Page navigation component.

```tsx
import { Pagination } from '@grid/origin';
```

**Parts:** `Pagination.Root`, `Pagination.Link`, `Pagination.Next`, `Pagination.Prev`, `Pagination.Pages`

```tsx
<Pagination.Root page={currentPage} onPageChange={setCurrentPage} totalPages={10}>
  <Pagination.Prev />
  <Pagination.Pages />
  <Pagination.Next />
</Pagination.Root>
```

### Toast

Toast notification component.

```tsx
import { Toast } from '@grid/origin';
```

**Parts:** `Toast.Root`, `Toast.Title`, `Toast.Description`, `Toast.Close`

### Progress

Progress bar component.

```tsx
import { Progress } from '@grid/origin';
```

**Parts:** `Progress.Root`, `Progress.Indicator`

```tsx
<Progress.Root value={75}>
  <Progress.Indicator />
</Progress.Root>
```

### Meter

Gauge/meter display.

```tsx
import { Meter } from '@grid/origin';
```

**Parts:** `Meter.Root`, `Meter.Indicator`

```tsx
<Meter.Root value={60} min={0} max={100}>
  <Meter.Indicator />
</Meter.Root>
```
