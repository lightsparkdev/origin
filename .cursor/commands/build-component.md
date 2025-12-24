# Build Component from Figma

## Process

1. Parse Figma URL → extract `fileKey`, `nodeId`
2. **Fetch CSS** (try in order):
   - `mcp_Figma_get_design_context(nodeId, fileKey)` — preferred
   - If timeout: `npm run figma:node "<figma-url>"` — reliable fallback
3. Use `mcp_Figma_get_screenshot` for visual verification (always works)
4. Search Base UI docs for matching component
5. **Identify behavioral options** — if Base UI has props that change behavior (not styling), list them and ask:
   > "Base UI offers these options for {Component}:
   > - `multiple`: Allow multiple items open (default: single)
   > - `disabled`: Disable interaction
   > 
   > Which behavior do you want as the default?"
   
   Wait for answer before proceeding.
6. Create files:
   ```
   src/components/{Name}/
   ├── parts.tsx
   ├── {Name}.module.scss
   ├── {Name}.test.tsx
   ├── {Name}.test-stories.tsx
   ├── {Name}.stories.tsx
   └── index.ts
   ```
7. Use tokens where they exist; raw values where they don't (don't invent tokens)
8. Add `@media (prefers-reduced-motion: reduce)` for animations
9. Create tests from Base UI prop matrix:
   - **Core**: a11y (axe), keyboard nav, focus management, reduced-motion
   - **Per behavioral prop**: test both states (e.g., `multiple: true` AND `multiple: false`)
   - **Controlled/uncontrolled**: test `value`+`onValueChange` AND `defaultValue`
10. Create Storybook story with controlled example
11. **Update consumers** — if refactoring, update imports in `page.tsx` and other files
12. **Run verification**:
    - `npm run build` — catch export/import errors
    - `npm test` — run Playwright tests

## Figma Tooling

| Tool | Use | Fallback |
|------|-----|----------|
| `get_design_context` | CSS extraction | `npm run figma:node` |
| `get_screenshot` | Visual QA | — |
| `get_metadata` | Node structure | — |

## Code Style

- Add Figma URL as first line of SCSS: `// Figma: https://figma.com/design/...`
- No decorative comment dividers
- No verbose headers or token lists
- No emojis in code or console output
- Code is self-documenting
