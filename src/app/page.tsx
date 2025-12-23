import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/Accordion';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Origin v2</h1>
      <p style={{ marginBottom: '2rem' }}>Design system rebuild — Base UI + Figma-first approach.</p>
      
      <h2 style={{ marginBottom: '1rem' }}>Accordion Component</h2>
      
      <Accordion defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionHeader>
            <AccordionTrigger>What is Origin?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Origin is a design system that combines Base UI for accessibility 
            and behavior with Figma Dev Mode CSS for pixel-perfect styling.
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionHeader>
            <AccordionTrigger>How does it work?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Components are designed in Figma using tokenized properties. 
            The Figma lint plugin validates structure against Base UI anatomy.
            CSS is extracted from Dev Mode and transformed to use semantic tokens.
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionHeader>
            <AccordionTrigger>Why this approach?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            This approach ensures perfect design-to-code fidelity while 
            maintaining full accessibility through Base UI primitives.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
