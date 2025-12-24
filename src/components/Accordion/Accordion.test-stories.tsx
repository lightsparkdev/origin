import { Accordion } from './index';

export const TestAccordion = () => (
  <Accordion.Root>
    <Accordion.Item value="item-1">
      <Accordion.Header>
        <Accordion.Trigger>First Item</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel>First panel content</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Header>
        <Accordion.Trigger>Second Item</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel>Second panel content</Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
);

