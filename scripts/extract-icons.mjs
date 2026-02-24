/**
 * Extract icons from @central-icons-react packages into vendored local files.
 *
 * Usage:
 *   CENTRAL_LICENSE_KEY=... npm run icons:extract
 *
 * Prerequisites:
 *   - @central-icons-react packages installed (as devDependencies)
 *   - CENTRAL_LICENSE_KEY set in environment (for npm install)
 *
 * This script reads icon-manifest.ts to determine which icons to extract,
 * then copies the relevant files from node_modules into src/components/Icon/icons/.
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ICONS_DIR = join(ROOT, 'src', 'components', 'Icon', 'icons');
const MANIFEST_PATH = join(ROOT, 'src', 'components', 'Icon', 'icon-manifest.ts');

const PACKAGES = {
  outlined: '@central-icons-react/round-outlined-radius-3-stroke-1.5',
  sharp: '@central-icons-react/round-outlined-radius-0-stroke-1.5',
  filled: '@central-icons-react/round-filled-radius-3-stroke-1.5',
};

// ── Parse manifest ───────────────────────────────────────────
function parseManifest() {
  const src = readFileSync(MANIFEST_PATH, 'utf-8');

  // Extract array entries using regex — works on the simple { name, variant?, exportAs? } format
  const entries = [];
  const entryRegex = /\{\s*name:\s*'([^']+)'(?:\s*,\s*variant:\s*'([^']+)')?(?:\s*,\s*exportAs:\s*'([^']+)')?\s*\}/g;
  let match;
  while ((match = entryRegex.exec(src)) !== null) {
    entries.push({
      name: match[1],
      variant: match[2] || 'outlined',
      exportAs: match[3] || match[1],
    });
  }

  if (entries.length === 0) {
    console.error('Error: No icon entries found in manifest. Check icon-manifest.ts format.');
    process.exit(1);
  }

  return entries;
}

// ── Resolve package path in node_modules ─────────────────────
function resolvePackagePath(variant) {
  const pkg = PACKAGES[variant];
  if (!pkg) {
    throw new Error(`Unknown variant: ${variant}`);
  }

  // Check common locations
  const candidates = [
    join(ROOT, 'node_modules', pkg),
    // May also be nested under origin when installed as a dependency
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Package ${pkg} not found in node_modules. ` +
    `Run npm install with CENTRAL_LICENSE_KEY set.`
  );
}

// ── Copy icon files ──────────────────────────────────────────
function copyIcon(packagePath, iconName, exportName) {
  const srcDir = join(packagePath, iconName);
  const destDir = join(ICONS_DIR, exportName);

  if (!existsSync(srcDir)) {
    console.warn(`  WARN: ${iconName} not found in ${packagePath}`);
    return false;
  }

  mkdirSync(destDir, { recursive: true });

  // Copy only the files we need (skip source maps)
  for (const file of ['index.mjs', 'index.d.ts']) {
    const srcFile = join(srcDir, file);
    const destFile = join(destDir, file);
    if (existsSync(srcFile)) {
      cpSync(srcFile, destFile);
    } else {
      console.warn(`  WARN: ${file} not found for ${iconName}`);
    }
  }

  return true;
}

// ── Main ─────────────────────────────────────────────────────
function main() {
  console.log('Extracting icons from @central-icons-react...\n');

  const entries = parseManifest();
  console.log(`Found ${entries.length} icons in manifest.\n`);

  // Clean existing icons directory
  if (existsSync(ICONS_DIR)) {
    rmSync(ICONS_DIR, { recursive: true });
  }
  mkdirSync(ICONS_DIR, { recursive: true });

  // Resolve package paths
  const packagePaths = {};
  for (const variant of Object.keys(PACKAGES)) {
    try {
      packagePaths[variant] = resolvePackagePath(variant);
      console.log(`  ${variant}: ${packagePaths[variant]}`);
    } catch (err) {
      console.error(`  ${err.message}`);
      process.exit(1);
    }
  }
  console.log();

  // Copy CentralIconBase (needed for .d.ts type resolution)
  const baseSrcDir = join(packagePaths.outlined, 'CentralIconBase');
  if (existsSync(baseSrcDir)) {
    const baseDestDir = join(ICONS_DIR, 'CentralIconBase');
    mkdirSync(baseDestDir, { recursive: true });
    for (const file of ['index.mjs', 'index.d.ts']) {
      const src = join(baseSrcDir, file);
      if (existsSync(src)) {
        cpSync(src, join(baseDestDir, file));
      }
    }
    console.log('  Copied CentralIconBase');
  }

  // Extract each icon
  let extracted = 0;
  let warnings = 0;

  for (const entry of entries) {
    const pkgPath = packagePaths[entry.variant];
    if (!pkgPath) {
      console.warn(`  WARN: No package path for variant "${entry.variant}"`);
      warnings++;
      continue;
    }

    const ok = copyIcon(pkgPath, entry.name, entry.exportAs);
    if (ok) {
      extracted++;
    } else {
      warnings++;
    }
  }

  console.log(`\nDone! Extracted ${extracted} icons to src/components/Icon/icons/`);
  if (warnings > 0) {
    console.warn(`  ${warnings} warning(s) — check output above.`);
  }
}

main();
