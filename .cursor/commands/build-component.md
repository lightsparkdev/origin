# Build Component from Figma

## Process

1. Parse Figma URL → extract `fileKey`, `nodeId`
2. Call `mcp_Figma_get_design_context(nodeId, fileKey)` — stop if no CSS
3. Search Base UI docs for matching component
4. **Identify behavioral options** — if Base UI has props that change behavior (not styling), list them and ask:
   > "Base UI offers these options for {Component}:
   > - `multiple`: Allow multiple items open (default: single)
   > - `disabled`: Disable interaction
   > 
   > Which behavior do you want as the default?"
   
   Wait for answer before proceeding.
5. Create files:
   ```
   src/components/{Name}/
   ├── parts.tsx
   ├── {Name}.module.scss
   ├── {Name}.test.tsx
   ├── {Name}.test-stories.tsx
   ├── {Name}.stories.tsx
   └── index.ts
   ```
6. Use tokens where they exist; raw values where they don't (don't invent tokens)
7. Add `@media (prefers-reduced-motion: reduce)` for animations
8. Create tests: a11y, keyboard, focus, reduced-motion
9. Create Storybook story with controlled example
10. **Update consumers** — if refactoring, update imports in `page.tsx` and other files
11. **Run verification**:
    - `npm run build` — catch export/import errors
    - `npm test` — run Playwright tests

## Code Style

- No decorative comment dividers
- No verbose headers or token lists
- No emojis in code or console output
- Code is self-documenting
