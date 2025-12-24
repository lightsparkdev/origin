# Build Component from Figma

## Process

1. Parse Figma URL → extract `fileKey`, `nodeId`
2. Call `mcp_Figma_get_design_context(nodeId, fileKey)` — stop if no CSS
3. Search Base UI docs for matching component
4. Create files:
   ```
   src/components/{Name}/
   ├── parts.tsx
   ├── {Name}.module.scss
   ├── {Name}.test.tsx
   ├── {Name}.test-stories.tsx
   ├── {Name}.stories.tsx
   └── index.ts
   ```
5. Tokenize all values (no hardcoded colors, spacing, shadows, z-index)
6. Add `@media (prefers-reduced-motion: reduce)` for animations
7. Create tests: a11y, keyboard, focus, reduced-motion
8. Create Storybook story with controlled example
9. **Update consumers** — if refactoring, update imports in `page.tsx` and other files
10. **Run verification**:
    - `npm run build` — catch export/import errors
    - `npm test` — run Playwright tests

## Code Style

- No decorative comment dividers
- No verbose headers or token lists
- No emojis in code or console output
- Code is self-documenting
