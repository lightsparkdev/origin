# Build Component from Figma

Build a component from a Figma URL.

## Process

1. **Parse URL** — Extract `fileKey` and `nodeId`

2. **Fetch Figma CSS** — `mcp_Figma_get_design_context(nodeId, fileKey)`
   - If no CSS returned, STOP

3. **Fetch Base UI docs** — Search `base-ui.com` for matching component

4. **Create files**:
   ```
   src/components/{Name}/
   ├── parts.tsx           # forwardRef components
   ├── {Name}.module.scss  # Styles
   ├── {Name}.test.tsx     # Tests
   ├── {Name}.stories.tsx  # Stories
   └── index.ts            # Namespace export
   ```

5. **Tokenize all values**:
   - Colors → `var(--text-primary)`, `var(--surface-elevated)`
   - Spacing → `var(--spacing-md)`
   - Typography → `@include headline-sm` (from `_text-styles.scss`)
   - Shadows → `var(--shadow-lg)` (from `_effects.scss`)
   - z-index → `var(--z-modal)`
   - Timing → `var(--duration-normal)`

6. **Accessibility**:
   - `@media (prefers-reduced-motion: reduce)` for animations
   - z-index tokens only

7. **Tests** (Playwright):
   - a11y (axe-core)
   - Keyboard (Tab, Escape)
   - Focus management
   - Reduced motion

8. **Storybook**:
   - Default + Controlled examples

9. **Verify** — `npm test`, check browser

## Output

Show: files created, tokens used, test results.
