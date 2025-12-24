import { Accordion } from '@/components/Accordion';
import { AlertDialog } from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
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
