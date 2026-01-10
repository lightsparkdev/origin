# Build Component from Figma

## Process

1. Parse Figma URL → extract `fileKey`, `nodeId`

2. **Fetch CSS** (try in order):
   - `mcp_Figma_get_design_context(nodeId, fileKey)` — preferred
   - If timeout: `npm run figma:node "<figma-url>"` — reliable fallback

3. Use `mcp_Figma_get_screenshot` for visual verification (always works)

4. **Check Base UI** — follow decision tree:

   **A. Exact match exists?**
   - Yes → Use Base UI primitive, follow `components.mdc`
   
   **B. Can be composed from Base UI primitives?**
   - Example: SearchInput = `Input` + `Button`
   - Example: Combobox = `Input` + `Popover` + `Menu`
   - Yes → Compose from primitives (preferred over custom)
   
   **C. No Base UI solution?**
   > "No Base UI primitive or composition for this component.
   > 
   > Options:
   > 1. **Display-only** — Simple styled component (Badge, Card, etc.)
   > 2. **Interactive** — Needs research (Chip with dismiss, etc.)
   > 3. **Skip** — Don't build yet
   > 
   > Which approach?"
   
   - If **Display-only**: Follow `custom-components.mdc`, skip to step 6
   - If **Interactive**: Research first (WAI-ARIA APG, Radix, React Aria), then follow `custom-components.mdc`
   - If **Skip**: End process

5. **Identify behavioral options** — if using Base UI, list props that change behavior:
   > "Base UI offers these options for {Component}:
   > - `multiple`: Allow multiple items open (default: single)
   > - `disabled`: Disable interaction
   > 
   > Which behavior do you want as the default?"
   
   Wait for answer before proceeding.

6. **Create files:**
   ```
   src/components/{Name}/
   ├── {Name}.tsx           # Simple components
   ├── parts.tsx            # Compound components
   ├── {Name}.module.scss
   ├── {Name}.test.tsx
   ├── {Name}.test-stories.tsx
   ├── {Name}.stories.tsx
   └── index.ts
   ```

7. Use tokens where they exist; raw values where they don't (don't invent tokens)

8. Add `@media (prefers-reduced-motion: reduce)` for animations

9. **Create tests:**
   
   For Base UI components:
   - Per behavioral prop: test both states
   - Controlled/uncontrolled: test both modes
   - Keyboard: Space, Enter, Arrows (as applicable)
   
   For custom components:
   - Core behavior
   - Keyboard accessibility
   - Disabled state
   - Any dismiss/action callbacks

10. Create Storybook story with controlled example

11. **Update consumers** — add to `page.tsx` for demo

12. **Run verification:**
    - `npm run build` — catch export/import errors
    - `npm test` — run Playwright tests

## Decision Tree

```
Figma URL
    │
    ▼
Fetch CSS + Screenshot
    │
    ▼
A. Base UI has exact match?
├── Yes → Use Base UI primitive
│         Follow components.mdc
│
└── No ──▶ B. Can compose from Base UI primitives?
           ├── Yes → Compose from primitives
           │         (Input + Button, Dialog + Menu, etc.)
           │         Follow components.mdc
           │
           └── No ──▶ C. Build custom
                      │
                      Is it interactive?
                      ├── No → Display-only (simple)
                      │        Follow custom-components.mdc
                      │
                      └── Yes → Research first:
                                • WAI-ARIA APG
                                • Radix/React Aria
                                • Screen reader test
                                Then follow custom-components.mdc
```

## Composition Examples

| Component | Composition |
|-----------|-------------|
| SearchInput | `Input` + `Button` |
| Combobox | `Input` + `Popover` + `Menu` |
| Modal Stepper | `Dialog` + step state |
| Dropdown Button | `Button` + `Menu` |
| Date Picker | `Input` + `Popover` + calendar grid |
| Chip (dismissible) | `<span>` + `Button` (dismiss) |

## Figma Tooling

| Tool | Use | Fallback |
|------|-----|----------|
| `get_design_context` | CSS extraction | `npm run figma:node` |
| `get_screenshot` | Visual QA | — |
| `get_metadata` | Node structure | — |

## Rules Reference

| Scenario | Rule File |
|----------|-----------|
| Base UI exists | `components.mdc` |
| Composed from Base UI | `components.mdc` |
| No Base UI | `custom-components.mdc` |
| Animations | `motion.mdc` |

## Code Style

- Add Figma URL as first line of SCSS: `// Figma: https://figma.com/design/...`
- No decorative comment dividers
- No verbose headers or token lists
- No emojis in code or console output
- Code is self-documenting
