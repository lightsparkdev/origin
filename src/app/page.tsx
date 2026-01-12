'use client';

import { Accordion } from '@/components/Accordion';
import { ActionBar, ActionBarLabel, ActionBarActions } from '@/components/ActionBar';
import { AlertDialog } from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Chip, ChipFilter } from '@/components/Chip';
import { Loader } from '@/components/Loader';
import { Radio } from '@/components/Radio';
import { Switch } from '@/components/Switch';
import { Tooltip } from '@/components/Tooltip';
import { CentralIcon } from '@/components/Icon';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Origin v2</h1>
      <p style={{ marginBottom: '2rem' }}>Design system rebuild — Base UI + Figma-first approach.</p>
      
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
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      
      {/* With Icons */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button iconLeft={<CentralIcon name="IconArrowLeft" size={16} />}>Back</Button>
        <Button iconRight={<CentralIcon name="IconArrowRight" size={16} />}>Next</Button>
        <Button 
          iconLeft={<CentralIcon name="IconArrowLeft" size={16} />}
          iconRight={<CentralIcon name="IconArrowRight" size={16} />}
        >
          Both
        </Button>
      </div>
      
      {/* Icon Only */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <Button size="sm" iconOnly iconLeft={<CentralIcon name="IconPlusSmall" size={16} />} />
        <Button size="md" iconOnly iconLeft={<CentralIcon name="IconPlusSmall" size={20} />} />
        <Button size="lg" iconOnly iconLeft={<CentralIcon name="IconPlusLarge" size={20} />} />
      </div>
      
      {/* States */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Loader Component</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Alert Dialog Component</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Switch Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Chip Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Radio Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Checkbox Component</h2>
      
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '2rem' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Tooltip Component</h2>
      
      <Tooltip.Provider>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
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
      
      <h2 style={{ marginBottom: '1rem' }}>Action Bar Component</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <ActionBar>
          <ActionBarLabel>4 transactions selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="md">
              Clear
            </Button>
            <Button variant="filled" size="md" iconLeft={<CentralIcon name="IconArrowOutOfBox" size={16} />}>
              Export
            </Button>
          </ActionBarActions>
        </ActionBar>
        
        <ActionBar>
          <ActionBarLabel>3 users selected</ActionBarLabel>
          <ActionBarActions>
            <Button variant="outline" size="md">
              Cancel
            </Button>
            <Button variant="critical" size="md">
              Delete users
            </Button>
          </ActionBarActions>
        </ActionBar>
      </div>
      
      <h2 style={{ marginBottom: '1rem' }}>Accordion Component</h2>
      
      <Accordion.Root defaultValue={['item-1']}>
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
    </main>
  );
}
