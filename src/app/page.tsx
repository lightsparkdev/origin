'use client';

import * as React from 'react';
import { Accordion } from '@/components/Accordion';
import { ActionBar, ActionBarLabel, ActionBarActions } from '@/components/ActionBar';
import { Autocomplete } from '@/components/Autocomplete';
import { Alert } from '@/components/Alert';
import { AlertDialog } from '@/components/AlertDialog';
import { Badge } from '@/components/Badge';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Chip, ChipFilter } from '@/components/Chip';
import { Combobox } from '@/components/Combobox';
import { Field } from '@/components/Field';
import { Fieldset } from '@/components/Fieldset';
import { Form } from '@/components/Form';
import { CentralIcon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { Meter } from '@/components/Meter';
import { Pagination } from '@/components/Pagination';
import { Progress } from '@/components/Progress';
import { Radio } from '@/components/Radio';
import { Select } from '@/components/Select';
import { Separator } from '@/components/Separator';
import { Switch } from '@/components/Switch';
import { Tabs } from '@/components/Tabs';
import { Toast, ToastVariant } from '@/components/Toast';
import { Tooltip } from '@/components/Tooltip';
import { Shortcut } from '@/components/Shortcut';

// Data for combobox examples
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
const groupedFruits = {
  common: ['Apple', 'Banana', 'Orange'],
  exotic: ['Dragon Fruit', 'Mangosteen', 'Rambutan'],
};

// Toast demo components
function ToastDemo() {
  const toastManager = Toast.useToastManager();

  const showToast = (variant: ToastVariant, title: string, description?: string) => {
    toastManager.add({
      title,
      description,
      data: { variant },
    });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => showToast('default', 'Default toast', 'This is a default toast message.')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => showToast('info', 'Info toast', 'This is an informational message.')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => showToast('success', 'Success!', 'Your action was completed successfully.')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => showToast('warning', 'Warning', 'Please review before continuing.')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => showToast('invalid', 'Error', 'Something went wrong.')}>
        Invalid
      </Button>
    </div>
  );
}

function ToastRenderer() {
  const toastManager = Toast.useToastManager();

  return (
    <>
      {toastManager.toasts.map((toast) => {
        const variant = (toast.data?.variant as ToastVariant) || 'default';
        return (
          <Toast.Root key={toast.id} toast={toast} variant={variant}>
            {variant !== 'default' && <Toast.Icon variant={variant} />}
            <Toast.Content>
              <Toast.Title>{toast.title}</Toast.Title>
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Toast.Content>
            <Toast.Close aria-label="Close toast" />
          </Toast.Root>
        );
      })}
    </>
  );
}

// Data for autocomplete examples
const autocompleteFruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

interface AutocompleteFruit {
  value: string;
  label: string;
}

function AutocompleteExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
      {/* Basic */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Basic
        </span>
        <Autocomplete.Root items={autocompleteFruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      <Autocomplete.ItemText>{item.label}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>

      {/* With Leading Icons */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Leading Icons
        </span>
        <Autocomplete.Root items={autocompleteFruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.Empty>No results found.</Autocomplete.Empty>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item
                      key={item.value}
                      value={item}
                      leadingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
                      <Autocomplete.ItemText>{item.label}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>

      {/* Disabled */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <Autocomplete.Root items={autocompleteFruits} disabled>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {(item: AutocompleteFruit) => (
                    <Autocomplete.Item key={item.value} value={item}>
                      <Autocomplete.ItemText>{item.label}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  const [manyPage, setManyPage] = React.useState(50);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Few Pages
        </span>
        <Pagination.Root page={page} totalPages={5} onPageChange={setPage}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Many Pages (with ellipsis)
        </span>
        <Pagination.Root page={manyPage} totalPages={100} onPageChange={setManyPage}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>

      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Single Page (both disabled)
        </span>
        <Pagination.Root page={1} totalPages={1}>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.Root>
      </div>
    </div>
  );
}

function ComboboxExamples() {
  // Use the useFilter hook for filtering support
  const filter = Combobox.useFilter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
      {/* Single Select with filtering */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Single Select
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
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

      {/* With Clear Button (shows next to chevron when value exists) */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Clear Button
        </span>
        <Combobox.Root items={fruits} defaultValue="Apple" filter={filter.contains}>
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
      </div>

      {/* With Trailing Icons */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Trailing Icons
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item 
                      key={item} 
                      value={item}
                      trailingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
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

      {/* With Leading Icons (indicator on right) */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          With Leading Icons
        </span>
        <Combobox.Root items={fruits} filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Select a fruit..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
            </Combobox.ActionButtons>
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item 
                      key={item} 
                      value={item}
                      leadingIcon={<CentralIcon name="IconGlobe2" size={16} />}
                    >
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* Multi Select - no chevron per Figma spec and Base UI pattern */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Multi Select
        </span>
        <Combobox.Root items={fruits} multiple filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Chips>
              <Combobox.Value>
                {(values: string[]) => (
                  <>
                    {values?.map((value) => (
                      <Combobox.Chip key={value}>
                        <Combobox.ChipText>{value}</Combobox.ChipText>
                        <Combobox.ChipRemove />
                      </Combobox.Chip>
                    ))}
                    {/* Input is INSIDE Value - clicking anywhere opens popup */}
                    <Combobox.Input placeholder={values?.length > 0 ? '' : 'Select fruits...'} />
                  </>
                )}
              </Combobox.Value>
            </Combobox.Chips>
            {/* No ActionButtons/Trigger for multi-select - per Figma spec */}
          </Combobox.InputWrapper>
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup>
                <Combobox.Empty />
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item key={item} value={item}>
                      <Combobox.ItemCheckbox />
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>

      {/* Disabled */}
      <div>
        <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
          Disabled
        </span>
        <Combobox.Root items={fruits} disabled filter={filter.contains}>
          <Combobox.InputWrapper>
            <Combobox.Input placeholder="Disabled combobox..." />
            <Combobox.ActionButtons>
              <Combobox.Trigger />
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
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Origin v2</h1>
      <p style={{ marginBottom: '128px' }}>Design system rebuild — Base UI + Figma-first approach.</p>
      
      <h2 style={{ marginBottom: '1rem' }}>Accordion Component</h2>
      
      <Accordion.Root defaultValue={['item-1']} style={{ marginBottom: '128px' }}>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>What is Origin?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Origin is a design system that combines Base UI for accessibility 
            and behavior with Figma Dev Mode CSS for pixel-perfect styling.
          </Accordion.Panel>
        </Accordion.Item>
        
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>How does it work?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Components are designed in Figma using tokenized properties. 
            The Figma lint plugin validates structure against Base UI anatomy.
            CSS is extracted from Dev Mode and transformed to use semantic tokens.
          </Accordion.Panel>
        </Accordion.Item>
        
        <Accordion.Item value="item-3">
          <Accordion.Header>
            <Accordion.Trigger>Why this approach?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            This approach ensures perfect design-to-code fidelity while 
            maintaining full accessibility through Base UI primitives.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
      
      <h2 style={{ marginBottom: '1rem' }}>Autocomplete Component</h2>
      
      <AutocompleteExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Action Bar Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <ActionBar>
          <ActionBarLabel>4 transactions selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="default">
              Clear
            </Button>
            <Button variant="filled" size="default" leadingIcon={<CentralIcon name="IconArrowOutOfBox" size={16} />}>
              Export
            </Button>
          </ActionBarActions>
        </ActionBar>
        
        <ActionBar>
          <ActionBarLabel>3 users selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="default">
              Cancel
            </Button>
            <Button variant="critical" size="default">
              Delete users
            </Button>
          </ActionBarActions>
        </ActionBar>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Alert Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <Alert variant="default" title="Title" description="Description here." />
        <Alert variant="critical" title="Title" description="Description here." />
        <Alert variant="default" title="Title only alert" />
        <Alert variant="default" title="No icon alert" description="This alert has no icon." icon={false} />
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Alert Dialog Component</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '128px' }}>
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button variant="outline" />}>
            Open Alert Dialog
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Delete Item?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. The item will be permanently removed from your account.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="outline" />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close render={<Button variant="filled" />}>
                  Delete
                </AlertDialog.Close>
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
        
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button variant="critical" />}>
            Destructive Action
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This will permanently delete your account and all associated data.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="outline" />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close render={<Button variant="critical" />}>
                  Delete Account
                </AlertDialog.Close>
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Badge Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '14px' }}>Subtle:</span>
          <Badge variant="gray">Label</Badge>
          <Badge variant="purple">Label</Badge>
          <Badge variant="blue">Label</Badge>
          <Badge variant="sky">Label</Badge>
          <Badge variant="pink">Label</Badge>
          <Badge variant="green">Label</Badge>
          <Badge variant="yellow">Label</Badge>
          <Badge variant="red">Label</Badge>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '14px' }}>Vibrant:</span>
          <Badge variant="gray" vibrant>Label</Badge>
          <Badge variant="purple" vibrant>Label</Badge>
          <Badge variant="blue" vibrant>Label</Badge>
          <Badge variant="sky" vibrant>Label</Badge>
          <Badge variant="pink" vibrant>Label</Badge>
          <Badge variant="green" vibrant>Label</Badge>
          <Badge variant="yellow" vibrant>Label</Badge>
          <Badge variant="red" vibrant>Label</Badge>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Breadcrumb Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Default</span>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Shoes</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>With Collapsed Items</span>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products/shoes/running">Running</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Trail Runners</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>Custom Separator</span>
          <Breadcrumb.Root>
            <Breadcrumb.List separator="/">
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Shoes</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Button Component</h2>
      
      {/* Variants */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="filled">Filled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="critical">Critical</Button>
      </div>
      
      {/* Sizes */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button size="compact">Compact</Button>
        <Button size="default">Default</Button>
      </div>
      
      {/* With Icons */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button leadingIcon={<CentralIcon name="IconArrowLeft" size={16} />}>Back</Button>
        <Button trailingIcon={<CentralIcon name="IconArrowRight" size={16} />}>Next</Button>
        <Button 
          leadingIcon={<CentralIcon name="IconArrowLeft" size={16} />}
          trailingIcon={<CentralIcon name="IconArrowRight" size={16} />}
        >
          Both
        </Button>
      </div>
      
      {/* Icon Only */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button size="compact" iconOnly leadingIcon={<CentralIcon name="IconPlusSmall" size={16} />} aria-label="Add" />
        <Button size="default" iconOnly leadingIcon={<CentralIcon name="IconPlusSmall" size={16} />} aria-label="Add" />
      </div>
      
      {/* States */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '128px' }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Checkbox Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '128px' }}>
        {/* Default variant */}
        <Checkbox.Field>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group defaultValue={['opt1']}>
            <Checkbox.Item value="opt1" label="Label" description="Description goes here." />
            <Checkbox.Item value="opt2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Description>Help text goes here.</Checkbox.Description>
        </Checkbox.Field>

        {/* Card variant */}
        <Checkbox.Field style={{ width: 280 }}>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group defaultValue={['card1']} variant="card">
            <Checkbox.Item value="card1" label="Label" description="Description goes here." />
            <Checkbox.Item value="card2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Description>Help text goes here.</Checkbox.Description>
        </Checkbox.Field>

        {/* Critical state */}
        <Checkbox.Field invalid style={{ width: 280 }}>
          <Checkbox.Legend>Legend</Checkbox.Legend>
          <Checkbox.Group variant="card">
            <Checkbox.Item value="err1" label="Label" description="Description goes here." />
            <Checkbox.Item value="err2" label="Label" description="Description goes here." />
          </Checkbox.Group>
          <Checkbox.Error match>Error text goes here.</Checkbox.Error>
        </Checkbox.Field>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Chip Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Default MD</span>
          <Chip onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Default SM</span>
          <Chip size="sm" onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Filter MD</span>
          <ChipFilter property="Status" operator="is" value="Active" onDismiss={() => console.log('dismissed')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Filter SM</span>
          <ChipFilter size="sm" property="Status" operator="is" value="Active" onDismiss={() => console.log('dismissed')} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled</span>
          <Chip disabled onDismiss={() => console.log('dismissed')}>label</Chip>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>No dismiss</span>
          <Chip>label</Chip>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Combobox Component</h2>
      
      <ComboboxExamples />
      
      <h2 style={{ marginBottom: '1rem' }}>Field Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px', width: '256px' }}>
        <Field.Root>
          <Field.Label>Default</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root>
          <Field.Label>Filled</Field.Label>
          <Input defaultValue="Content" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Disabled</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Description>Help text goes here.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Invalid</Field.Label>
          <Input placeholder="Placeholder" />
          <Field.Error>Error text goes here.</Field.Error>
        </Field.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Fieldset Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', width: '256px' }}>
        <Fieldset.Root>
          <Fieldset.Legend>Personal Information</Fieldset.Legend>
          <Field.Root name="firstName">
            <Field.Label>First Name</Field.Label>
            <Input placeholder="Enter first name" />
            <Field.Description>Your legal first name.</Field.Description>
          </Field.Root>
          <Field.Root name="lastName">
            <Field.Label>Last Name</Field.Label>
            <Input placeholder="Enter last name" />
            <Field.Description>Your legal last name.</Field.Description>
          </Field.Root>
        </Fieldset.Root>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Form Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', width: '256px' }}>
        <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="Enter your email" />
            <Field.Description>We'll never share your email.</Field.Description>
          </Field.Root>
          <Field.Root name="password">
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="Enter your password" />
          </Field.Root>
          <Button type="submit">Sign In</Button>
        </Form>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Input Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px', maxWidth: '256px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Default</span>
          <Input placeholder="Placeholder" />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Filled</span>
          <Input defaultValue="Content" />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Disabled</span>
          <Input placeholder="Placeholder" disabled />
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#7c7c7c', marginBottom: '4px', display: 'block' }}>Read Only</span>
          <Input defaultValue="Read only content" readOnly />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Loader Component</h2>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '128px' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size="sm" />
          <p style={{ fontSize: '12px', marginTop: '8px' }}>Small</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Loader size="md" />
          <p style={{ fontSize: '12px', marginTop: '8px' }}>Medium</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Loader size="lg" />
          <p style={{ fontSize: '12px', marginTop: '8px' }}>Large</p>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Meter Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '240px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Storage (50%)
          </span>
          <Meter.Root value={50}>
            <Meter.Label>Storage used</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Low (25%)
          </span>
          <Meter.Root value={25}>
            <Meter.Label>Battery level</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            High (90%)
          </span>
          <Meter.Root value={90}>
            <Meter.Label>Disk space</Meter.Label>
            <Meter.Value />
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Track Only
          </span>
          <Meter.Root value={65}>
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Pagination Component</h2>
      
      <PaginationDemo />
      
      <div style={{ marginBottom: '128px' }} />
      
      <h2 style={{ marginBottom: '1rem' }}>Select Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '256px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default
          </span>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder="Select a fruit" />
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
                    <Select.Item value="orange">
                      <Select.ItemIndicator />
                      <Select.ItemText>Orange</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Groups
          </span>
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
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Trailing Icons
          </span>
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
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Disabled
          </span>
          <Select.Root disabled>
            <Select.Trigger>
              <Select.Value placeholder="Select a fruit" />
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
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Multi Select
          </span>
          <Select.Root multiple defaultValue={['apple', 'banana']}>
            <Select.Trigger>
              <Select.Value>
                {(selected: string[]) => {
                  if (selected.length === 0) {
                    return <span data-placeholder="">Select fruits</span>;
                  }
                  const labels: Record<string, string> = { apple: 'Apple', banana: 'Banana', orange: 'Orange' };
                  const first = labels[selected[0]];
                  return selected.length === 1 ? first : `${first} +${selected.length - 1}`;
                }}
              </Select.Value>
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
                    <Select.Item value="orange">
                      <Select.ItemIndicator />
                      <Select.ItemText>Orange</Select.ItemText>
                    </Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Separator Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '300px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default (1px)
          </span>
          <Separator />
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Hairline (0.5px)
          </span>
          <Separator variant="hairline" />
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Vertical in Navigation
          </span>
          <nav style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '32px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a>
            <Separator orientation="vertical" />
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Log in</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Sign up</a>
          </nav>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Vertical Hairline
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '32px' }}>
            <span>Left</span>
            <Separator orientation="vertical" variant="hairline" />
            <span>Right</span>
          </div>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Shortcut Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Single Key</span>
          <Shortcut keys={['⌘']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Two Keys</span>
          <Shortcut keys={['⌘', 'K']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Three Keys</span>
          <Shortcut keys={['⌘', '⇧', 'P']} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Common</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'C']} /> Copy
            </span>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'V']} /> Paste
            </span>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Shortcut keys={['⌘', 'Z']} /> Undo
            </span>
          </div>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Progress Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '128px', maxWidth: '240px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default (50%)
          </span>
          <Progress.Root value={50}>
            <Progress.Label>Export data</Progress.Label>
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Complete (100%)
          </span>
          <Progress.Root value={100}>
            <Progress.Label>Upload complete</Progress.Label>
            <Progress.Value />
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Indeterminate
          </span>
          <Progress.Root value={null}>
            <Progress.Label>Loading...</Progress.Label>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Track Only
          </span>
          <Progress.Root value={75}>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Radio Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '128px' }}>
        {/* Default variant */}
        <Radio.Field>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group defaultValue="opt1">
            <Radio.Item value="opt1" label="Label" description="Description goes here." />
            <Radio.Item value="opt2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Description>Help text goes here.</Radio.Description>
        </Radio.Field>

        {/* Card variant */}
        <Radio.Field style={{ width: 280 }}>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group defaultValue="card1" variant="card">
            <Radio.Item value="card1" label="Label" description="Description goes here." />
            <Radio.Item value="card2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Description>Help text goes here.</Radio.Description>
        </Radio.Field>

        {/* Critical state */}
        <Radio.Field invalid style={{ width: 280 }}>
          <Radio.Legend>Legend</Radio.Legend>
          <Radio.Group variant="card">
            <Radio.Item value="err1" label="Label" description="Description goes here." />
            <Radio.Item value="err2" label="Label" description="Description goes here." />
          </Radio.Group>
          <Radio.Error match>Error text goes here.</Radio.Error>
        </Radio.Field>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Switch Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '128px' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>SM Off</span>
          <Switch size="sm" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>SM On</span>
          <Switch size="sm" defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>MD Off</span>
          <Switch size="md" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>MD On</span>
          <Switch size="md" defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled Off</span>
          <Switch size="md" disabled />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Disabled On</span>
          <Switch size="md" disabled defaultChecked />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ width: '100px', fontSize: '14px' }}>Read Only</span>
          <Switch size="md" readOnly defaultChecked />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Tabs Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '128px' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Default Variant
          </span>
          <Tabs.Root defaultValue="account" style={{ maxWidth: '400px' }}>
            <Tabs.List>
              <Tabs.Tab value="account">Account</Tabs.Tab>
              <Tabs.Tab value="password">Password</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="account">
              Manage your account settings and preferences.
            </Tabs.Panel>
            <Tabs.Panel value="password">
              Change your password and security options.
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              Configure application settings.
            </Tabs.Panel>
          </Tabs.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            Minimal Variant
          </span>
          <Tabs.Root defaultValue="overview" style={{ maxWidth: '400px' }}>
            <Tabs.List variant="minimal">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="details">Details</Tabs.Tab>
              <Tabs.Tab value="history">History</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              Overview content without container background.
            </Tabs.Panel>
            <Tabs.Panel value="details">
              Details content.
            </Tabs.Panel>
            <Tabs.Panel value="history">
              History content.
            </Tabs.Panel>
          </Tabs.Root>
        </div>

        <div>
          <span style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '0.5rem', display: 'block' }}>
            With Disabled Tab
          </span>
          <Tabs.Root defaultValue="active" style={{ maxWidth: '400px' }}>
            <Tabs.List>
              <Tabs.Tab value="active">Active</Tabs.Tab>
              <Tabs.Tab value="disabled" disabled>Disabled</Tabs.Tab>
              <Tabs.Tab value="another">Another</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="active">
              This tab is active.
            </Tabs.Panel>
            <Tabs.Panel value="disabled">
              This panel cannot be accessed.
            </Tabs.Panel>
            <Tabs.Panel value="another">
              Another tab content.
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Toast Component</h2>
      
      <Toast.Provider>
        <ToastDemo />
        <Toast.Portal>
          <Toast.Viewport>
            <ToastRenderer />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
      
      <div style={{ marginBottom: '128px' }} />
      
      <h2 style={{ marginBottom: '1rem' }}>Tooltip Component</h2>
      
      <Tooltip.Provider>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '128px', alignItems: 'center' }}>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant="outline">Hover me</Button>} />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  This is a tooltip
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant="outline">Long text</Button>} />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  This is a longer tooltip that demonstrates text wrapping within the max-width constraint.
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <button
                  aria-label="Info"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <CentralIcon name="IconCircleInfo" size={20} />
                </button>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  Icon trigger tooltip
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </Tooltip.Provider>
    </main>
  );
}
