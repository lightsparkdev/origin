# Origin UI Patterns Reference

Common patterns and best practices for building UIs with Origin components.

## Form Patterns

### Basic Form Field

Always wrap inputs with Field for proper labeling and accessibility:

```tsx
import { Field, Input, Button } from '@grid/origin';

function BasicForm() {
  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label>Email Address</Field.Label>
        <Input
          type="email"
          placeholder="you@example.com"
          required
        />
        <Field.Description>We'll never share your email.</Field.Description>
      </Field.Root>

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Form with Validation

```tsx
import { Field, Input, Button } from '@grid/origin';
import { useState } from 'react';

function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root data-invalid={!!errors.email}>
        <Field.Label>Email Address</Field.Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-invalid={!!errors.email}
        />
        {errors.email && <Field.Error>{errors.email}</Field.Error>}
      </Field.Root>

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Form with Multiple Fields

```tsx
import { Field, Fieldset, Input, Select, Checkbox, Button } from '@grid/origin';

function CompleteForm() {
  return (
    <form className={styles.form}>
      <Fieldset.Root>
        <Fieldset.Legend>Personal Information</Fieldset.Legend>

        <div className={styles.row}>
          <Field.Root>
            <Field.Label>First Name</Field.Label>
            <Input placeholder="John" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Last Name</Field.Label>
            <Input placeholder="Doe" />
          </Field.Root>
        </div>

        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input type="email" placeholder="john@example.com" />
        </Field.Root>
      </Fieldset.Root>

      <Fieldset.Root>
        <Fieldset.Legend>Preferences</Fieldset.Legend>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Select country" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="us">United States</Select.Item>
                    <Select.Item value="uk">United Kingdom</Select.Item>
                    <Select.Item value="ca">Canada</Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </Field.Root>

        <Checkbox.Item
          label="Subscribe to newsletter"
          description="Receive updates about new features"
        />
      </Fieldset.Root>

      <div className={styles.actions}>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
```

### Radio Group Form

```tsx
import { Radio, Field, Button } from '@grid/origin';

function PlanSelector() {
  const [plan, setPlan] = useState('basic');

  return (
    <form>
      <Radio.Group value={plan} onValueChange={setPlan}>
        <Radio.Item
          value="basic"
          label="Basic Plan"
          description="$9/month - Perfect for individuals"
        />
        <Radio.Item
          value="pro"
          label="Pro Plan"
          description="$29/month - Great for small teams"
        />
        <Radio.Item
          value="enterprise"
          label="Enterprise"
          description="Custom pricing - For large organizations"
        />
      </Radio.Group>

      <Button type="submit">Continue</Button>
    </form>
  );
}
```

## Layout Patterns

### Stack Layout (Vertical)

```tsx
// Using inline styles
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)'
}}>
  <Component />
  <Component />
  <Component />
</div>
```

```scss
// Using CSS module
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.stackCompact {
  gap: var(--spacing-sm);
}

.stackLoose {
  gap: var(--spacing-xl);
}
```

### Row Layout (Horizontal)

```scss
.row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.rowSpaceBetween {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rowEnd {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
```

### Card Layout

```tsx
import styles from './Card.module.scss';

function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
```

```scss
.card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-tertiary);
  border-radius: var(--corner-radius-lg);
  box-shadow: var(--shadow-sm);
}

.header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-tertiary);
}

.title {
  @include label-lg;
  color: var(--text-primary);
  margin: 0;
}

.content {
  padding: var(--spacing-lg);
}
```

### Page Layout

```tsx
function PageLayout({ children }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <NavigationMenu.Root>
          {/* Navigation items */}
        </NavigationMenu.Root>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

```scss
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-xl);
  border-bottom: 1px solid var(--border-tertiary);
}

.main {
  flex: 1;
  padding: var(--spacing-xl);
  max-width: var(--max-width-7xl);
  margin: 0 auto;
  width: 100%;
}

.footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--border-tertiary);
}
```

### Grid Layout

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.gridFixed3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

## State Patterns

### Loading State

```tsx
import { Button, Loader } from '@grid/origin';

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await doSomething();
        setLoading(false);
      }}
    >
      Save Changes
    </Button>
  );
}

function LoadingContent() {
  const { data, isLoading } = useQuery();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader label="Loading content..." />
      </div>
    );
  }

  return <Content data={data} />;
}
```

### Empty State

```tsx
import { Button, CentralIcon } from '@grid/origin';

function EmptyState({ title, description, action }) {
  return (
    <div className={styles.emptyState}>
      <CentralIcon name="inbox" size={48} color="var(--icon-tertiary)" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

```scss
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4xl);
  text-align: center;
}

.title {
  @include label-lg;
  color: var(--text-primary);
  margin: var(--spacing-md) 0 var(--spacing-xs);
}

.description {
  @include body;
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-lg);
  max-width: 300px;
}
```

### Error State

```tsx
import { Alert, Button } from '@grid/origin';

function ErrorState({ error, onRetry }) {
  return (
    <Alert
      variant="critical"
      title="Something went wrong"
      description={error.message}
    />
  );
}

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <div className={styles.errorContainer}>
      <Alert
        variant="critical"
        title="An error occurred"
        description="Please try refreshing the page."
      />
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>
  );
}
```

### Disabled State

```tsx
// Disable based on form validity
<Button disabled={!isValid}>Submit</Button>

// Disable during loading
<Button disabled={isLoading}>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>

// Disabled input
<Input disabled value="Cannot edit" />

// Disabled select
<Select.Root disabled>
  <Select.Trigger>
    <Select.Value>Locked</Select.Value>
  </Select.Trigger>
</Select.Root>
```

## Navigation Patterns

### Tabbed Navigation

```tsx
import { Tabs } from '@grid/origin';

function TabbedContent() {
  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="billing">Billing</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Panel value="overview">
        <OverviewContent />
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <SettingsContent />
      </Tabs.Panel>
      <Tabs.Panel value="billing">
        <BillingContent />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
```

### Breadcrumb Navigation

```tsx
import { Breadcrumb } from '@grid/origin';

function PageBreadcrumb({ items }) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <Breadcrumb.Separator />}
            <Breadcrumb.Item isCurrent={index === items.length - 1}>
              <Breadcrumb.Link href={item.href}>
                {item.label}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </React.Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
```

## Dialog Patterns

### Confirmation Dialog

```tsx
import { AlertDialog, Button } from '@grid/origin';

function DeleteConfirmation({ onDelete }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="critical">Delete Item</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Delete Item?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the item
            and remove all associated data.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Close>
              <Button variant="outline">Cancel</Button>
            </AlertDialog.Close>
            <Button variant="critical" onClick={onDelete}>
              Delete
            </Button>
          </AlertDialog.Actions>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

### Actions Menu

```tsx
import { Menu, Button, CentralIcon } from '@grid/origin';

function ActionsMenu({ onEdit, onDuplicate, onDelete }) {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button variant="ghost" iconOnly>
          <CentralIcon name="more-horizontal" />
        </Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onSelect={onEdit}>
              <CentralIcon name="edit" />
              Edit
            </Menu.Item>
            <Menu.Item onSelect={onDuplicate}>
              <CentralIcon name="copy" />
              Duplicate
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onSelect={onDelete}>
              <CentralIcon name="trash" />
              Delete
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

## Responsive Patterns

### Responsive Layout

```scss
.container {
  padding: var(--spacing-md);

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }

  @media (min-width: 1024px) {
    padding: var(--spacing-2xl);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Mobile-First Button Group

```tsx
function ResponsiveActions() {
  return (
    <div className={styles.actions}>
      <Button variant="outline" className={styles.cancelBtn}>
        Cancel
      </Button>
      <Button className={styles.submitBtn}>
        Submit
      </Button>
    </div>
  );
}
```

```scss
.actions {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-sm);

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
}

.cancelBtn {
  @media (max-width: 639px) {
    width: 100%;
  }
}

.submitBtn {
  @media (max-width: 639px) {
    width: 100%;
  }
}
```
