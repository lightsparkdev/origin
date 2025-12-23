/**
 * Build Tokens Script
 * 
 * Transforms Figma's native W3C DTCG token export into SCSS variables.
 * 
 * Usage: node scripts/build-tokens.js
 * 
 * Input:  /tokens/figma/ (all *.tokens.json files, DTCG format)
 * Output: /src/tokens/_variables.scss (CSS custom properties)
 * 
 * Token Sources:
 *   - baseline/  → Spacing, radius, stroke, sizing primitives
 *   - origin/    → Colors, typography, semantic tokens (Light/Dark modes)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = path.join(__dirname, '../tokens/figma');
const OUTPUT_FILE = path.join(__dirname, '../src/tokens/_variables.scss');

/**
 * Recursively find all .json files in a directory
 */
function findTokenFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findTokenFiles(fullPath, files);
    } else if (entry.name.endsWith('.json') && !entry.name.startsWith('.')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Recursively extract tokens from DTCG format
 */
function extractTokens(obj, prefix = '') {
  const tokens = [];
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip DTCG metadata keys
    if (key.startsWith('$')) continue;
    
    const tokenPath = prefix ? `${prefix}/${key}` : key;
    
    // If it has $value, it's a token
    if (value && typeof value === 'object' && '$value' in value) {
      tokens.push({
        name: tokenPath,
        value: value.$value,
        type: value.$type,
      });
    } 
    // Otherwise recurse into nested groups
    else if (value && typeof value === 'object') {
      tokens.push(...extractTokens(value, tokenPath));
    }
  }
  
  return tokens;
}

/**
 * Convert Figma color object to CSS color string
 * Figma exports colors as: { colorSpace, components: [r,g,b], alpha, hex }
 */
function figmaColorToCSS(colorObj) {
  // If it's already a string, return as-is
  if (typeof colorObj === 'string') {
    return colorObj;
  }
  
  // Handle Figma's color object format
  if (colorObj && typeof colorObj === 'object') {
    const { components, alpha, hex } = colorObj;
    
    // If alpha is 1 (or very close), use hex
    if (alpha >= 0.999 && hex) {
      return hex;
    }
    
    // Otherwise, use rgba with proper alpha
    if (components && components.length >= 3) {
      const r = Math.round(components[0] * 255);
      const g = Math.round(components[1] * 255);
      const b = Math.round(components[2] * 255);
      const a = alpha ?? 1;
      
      if (a >= 0.999) {
        return `rgb(${r}, ${g}, ${b})`;
      }
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    }
    
    // Fallback to hex if available
    if (hex) {
      return hex;
    }
  }
  
  return String(colorObj);
}

/**
 * Convert token value to CSS value
 */
function toCSSValue(token) {
  const { value, type } = token;
  
  // Handle alias references (e.g., "{color.primary}")
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1).replace(/\./g, '-').replace(/\//g, '-');
    return `var(--${ref})`;
  }
  
  // Handle different token types
  switch (type) {
    case 'color':
      return figmaColorToCSS(value);
    case 'dimension':
      return typeof value === 'number' ? `${value}px` : value;
    case 'number':
      // Numbers without units (like font-weight, line-height ratios)
      return String(value);
    case 'fontFamily':
      return `"${value}"`;
    case 'fontWeight':
      return String(value);
    default:
      // For unknown types, try to be smart about units
      if (typeof value === 'number') {
        return String(value);
      }
      return String(value);
  }
}

/**
 * Convert token name to CSS variable name
 */
function toVarName(tokenPath) {
  return `--${tokenPath.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`;
}

/**
 * Main build function
 */
function build() {
  console.log('🎨 Building tokens from Figma export...\n');
  
  const tokenFiles = findTokenFiles(TOKENS_DIR);
  
  if (tokenFiles.length === 0) {
    console.error('❌ No token files found in', TOKENS_DIR);
    process.exit(1);
  }
  
  // Separate by source for organized output
  const baselineTokens = new Map();
  const originPrimitives = new Map();
  const lightTokens = new Map();
  const darkTokens = new Map();
  
  for (const filePath of tokenFiles) {
    const relativePath = path.relative(TOKENS_DIR, filePath);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const tokens = extractTokens(content);
    
    console.log(`  📄 ${relativePath}: ${tokens.length} tokens`);
    
    // Categorize tokens by source file
    for (const token of tokens) {
      if (relativePath.startsWith('baseline/')) {
        baselineTokens.set(token.name, token);
      } else if (relativePath.includes('Light.tokens')) {
        lightTokens.set(token.name, token);
      } else if (relativePath.includes('Dark.tokens')) {
        darkTokens.set(token.name, token);
      } else {
        // Value.tokens.json from origin = primitives
        originPrimitives.set(token.name, token);
      }
    }
  }
  
  // Generate SCSS output
  let scss = `/**
 * Origin Design System — Token Variables
 * 
 * Auto-generated from Figma's native token export.
 * Do not edit manually — regenerate with: npm run tokens:build
 * 
 * Sources:
 *   - baseline/Value.tokens.json (spacing, radius, sizing)
 *   - origin/Value.tokens.json (color primitives, typography)
 *   - origin/Light.tokens.json (semantic tokens, light mode)
 *   - origin/Dark.tokens.json (semantic tokens, dark mode)
 */

:root {
`;

  // Helper to write a group of tokens
  function writeTokenGroup(tokens, groupName) {
    if (tokens.size === 0) return '';
    
    let output = `\n  /* ═══ ${groupName} ═══ */\n`;
    
    // Group by first path segment
    const grouped = {};
    for (const [name, token] of tokens) {
      const prefix = name.split('/')[0];
      if (!grouped[prefix]) grouped[prefix] = [];
      grouped[prefix].push(token);
    }
    
    for (const [group, groupTokens] of Object.entries(grouped)) {
      output += `\n  /* ${group} */\n`;
      for (const token of groupTokens) {
        const varName = toVarName(token.name);
        const value = toCSSValue(token);
        output += `  ${varName}: ${value};\n`;
      }
    }
    
    return output;
  }
  
  // Write baseline tokens first (spacing, radius, etc.)
  scss += writeTokenGroup(baselineTokens, 'BASELINE');
  
  // Write origin primitives (colors, font atoms)
  scss += writeTokenGroup(originPrimitives, 'PRIMITIVES');
  
  // Write light mode semantic tokens (default)
  scss += writeTokenGroup(lightTokens, 'SEMANTIC (Light Mode - Default)');
  
  scss += `}

/* ═══ DARK MODE ═══ */
[data-theme="dark"],
.dark {
`;

  // Write dark mode overrides
  for (const [name, token] of darkTokens) {
    const varName = toVarName(name);
    const value = toCSSValue(token);
    scss += `  ${varName}: ${value};\n`;
  }
  
  scss += `}

/* ═══ SYSTEM PREFERENCE ═══ */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
`;

  // Same dark tokens for system preference
  for (const [name, token] of darkTokens) {
    const varName = toVarName(name);
    const value = toCSSValue(token);
    scss += `    ${varName}: ${value};\n`;
  }
  
  scss += `  }
}
`;

  // Write output
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, scss);
  
  const totalTokens = baselineTokens.size + originPrimitives.size + lightTokens.size + darkTokens.size;
  console.log(`\n✅ Generated ${OUTPUT_FILE}`);
  console.log(`   ${totalTokens} total tokens`);
  console.log(`   - Baseline: ${baselineTokens.size}`);
  console.log(`   - Primitives: ${originPrimitives.size}`);
  console.log(`   - Light mode: ${lightTokens.size}`);
  console.log(`   - Dark mode: ${darkTokens.size}`);
}

build();
