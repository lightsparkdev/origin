// Fetches Figma styles → generates _text-styles.scss and _effects.scss

import { config } from 'dotenv';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = '3JvbUyTqbbPL8cCpwSX0j4';

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN not found in environment');
  console.error('   Add it to .env.local: FIGMA_TOKEN=your-token');
  process.exit(1);
}

interface FigmaStyle {
  key: string;
  name: string;
  style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  node_id: string;
}

interface FigmaStylesResponse {
  status: number;
  error: boolean;
  meta: {
    styles: FigmaStyle[];
  };
}

interface FigmaStyleDetail {
  name: string;
  style_type: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: { value: number; unit: string } | number;
  letterSpacing?: { value: number; unit: string } | number;
  effects?: Array<{
    type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    visible: boolean;
    color: { r: number; g: number; b: number; a: number };
    offset?: { x: number; y: number };
    radius: number;
    spread?: number;
  }>;
}

interface FigmaNodeResponse {
  nodes: Record<string, {
    document: {
      style?: {
        fontFamily?: string;
        fontWeight?: number;
        fontSize?: number;
        letterSpacing?: number;
        lineHeightPx?: number;
        lineHeightPercent?: number;
        lineHeightPercentFontSize?: number;
        lineHeightUnit?: string;
      };
      effects?: Array<{
        type: string;
        visible: boolean;
        color: { r: number; g: number; b: number; a: number };
        offset?: { x: number; y: number };
        radius: number;
        spread?: number;
      }>;
    };
  }>;
}

async function fetchFromFigma(endpoint: string): Promise<any> {
  const response = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN!,
    },
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Figma API error: ${response.status} - ${text}`);
  }
  
  return response.json();
}

const FONT_SIZE_MAP: Record<number, string> = {
  10: '--font-size-2xs',
  12: '--font-size-xs',
  13: '--font-size-sm',
  14: '--font-size-base',
  16: '--font-size-lg',
  18: '--font-size-xl',
  24: '--font-size-2xl',
};

const LINE_HEIGHT_MAP: Record<number, string> = {
  12: '--font-leading-2xs',
  16: '--font-leading-xs',
  18: '--font-leading-sm',
  20: '--font-leading-base',
  24: '--font-leading-lg',
  32: '--font-leading-xl',
};

const FONT_WEIGHT_MAP: Record<number, string> = {
  100: '--font-weight-hairline',
  250: '--font-weight-thin',
  300: '--font-weight-light',
  400: '--font-weight-regular',
  450: '--font-weight-book',
  500: '--font-weight-medium',
  600: '--font-weight-semibold',
  700: '--font-weight-bold',
  900: '--font-weight-black',
};

const LETTER_SPACING_MAP: Record<string, string> = {
  '-0.7': '--font-tracking-tighter',
  '-0.2': '--font-tracking-tight',
  '0': '--font-tracking-normal',
  '0.2': '--font-tracking-wide',
  '0.7': '--font-tracking-wider',
};

function mapFontSize(px: number): string {
  const token = FONT_SIZE_MAP[px];
  return token ? `var(${token}, ${px}px)` : `${px}px`;
}

function mapLineHeight(px: number): string {
  const token = LINE_HEIGHT_MAP[px];
  return token ? `var(${token}, ${px}px)` : `${px}px`;
}

function mapFontWeight(weight: number): string {
  const token = FONT_WEIGHT_MAP[weight];
  return token ? `var(${token}, ${weight})` : `${weight}`;
}

function mapLetterSpacing(px: number): string {
  if (px === 0) return `var(--font-tracking-normal, 0)`;
  const rounded = Math.round(px * 10) / 10;
  const token = LETTER_SPACING_MAP[String(rounded)];
  return token ? `var(${token}, ${rounded}px)` : `${rounded}px`;
}

function rgbaToString(color: { r: number; g: number; b: number; a: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = Math.round(color.a * 100) / 100;
  
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function generateEffectSCSS(styles: Array<{ name: string; effects: any[] }>): string {
  let scss = `// Auto-generated — do not edit. Run: npm run figma:styles

:root {\n`;

  for (const style of styles) {
    const shadows = style.effects
      .filter(e => e.visible && (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW'))
      .map(effect => {
        const inset = effect.type === 'INNER_SHADOW' ? 'inset ' : '';
        const x = effect.offset?.x ?? 0;
        const y = effect.offset?.y ?? 0;
        const blur = effect.radius;
        const spread = effect.spread ?? 0;
        const color = rgbaToString(effect.color);
        
        if (spread !== 0) {
          return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
        }
        return `${inset}${x}px ${y}px ${blur}px ${color}`;
      });
    
    if (shadows.length > 0) {
      scss += `  --${style.name}: ${shadows.join(', ')};\n`;
    }
  }

  scss += `}\n`;
  return scss;
}

function generateTextMixinsSCSS(styles: Array<{
  name: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeightPx?: number;
  letterSpacing?: number;
}>): string {
  let scss = `// Auto-generated — do not edit. Run: npm run figma:styles

`;

  for (const style of styles) {
    scss += `@mixin ${style.name} {\n`;
    
    if (style.fontFamily) {
      const isMono = style.fontFamily.toLowerCase().includes('mono');
      scss += `  font-family: var(${isMono ? '--font-family-mono' : '--font-family-sans'});\n`;
    }
    if (style.fontSize) {
      scss += `  font-size: ${mapFontSize(style.fontSize)};\n`;
    }
    if (style.fontWeight) {
      scss += `  font-weight: ${mapFontWeight(style.fontWeight)};\n`;
    }
    if (style.lineHeightPx) {
      scss += `  line-height: ${mapLineHeight(style.lineHeightPx)};\n`;
    }
    if (style.letterSpacing !== undefined) {
      scss += `  letter-spacing: ${mapLetterSpacing(style.letterSpacing)};\n`;
    }
    
    scss += `}\n\n`;
  }

  return scss;
}

async function main() {
  console.log('Fetching styles from Figma...');
  
  try {
    const stylesResponse: FigmaStylesResponse = await fetchFromFigma(`/files/${FILE_KEY}/styles`);
    
    const textStyleRefs = stylesResponse.meta.styles.filter(s => s.style_type === 'TEXT');
    const effectStyleRefs = stylesResponse.meta.styles.filter(s => s.style_type === 'EFFECT');
    
    console.log(`   Found ${textStyleRefs.length} text styles, ${effectStyleRefs.length} effect styles`);
    
    const allNodeIds = [...textStyleRefs, ...effectStyleRefs].map(s => s.node_id).join(',');
    const nodesResponse: FigmaNodeResponse = await fetchFromFigma(`/files/${FILE_KEY}/nodes?ids=${allNodeIds}`);
    const textStyles: Array<{
      name: string;
      fontFamily?: string;
      fontWeight?: number;
      fontSize?: number;
      lineHeightPx?: number;
      letterSpacing?: number;
    }> = [];
    
    for (const ref of textStyleRefs) {
      const node = nodesResponse.nodes[ref.node_id];
      if (node?.document?.style) {
        const s = node.document.style;
        textStyles.push({
          name: ref.name,
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          fontSize: s.fontSize,
          lineHeightPx: s.lineHeightPx,
          letterSpacing: s.letterSpacing,
        });
      }
    }
    
    const effectStyles: Array<{ name: string; effects: any[] }> = [];
    
    for (const ref of effectStyleRefs) {
      const node = nodesResponse.nodes[ref.node_id];
      if (node?.document?.effects) {
        effectStyles.push({
          name: ref.name,
          effects: node.document.effects,
        });
      }
    }
    
    textStyles.sort((a, b) => a.name.localeCompare(b.name));
    effectStyles.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log(`\n  Text styles: ${textStyles.map(s => s.name).join(', ')}`);
    console.log(`  Effect styles: ${effectStyles.map(s => s.name).join(', ')}\n`);
    
    const effectsSCSS = generateEffectSCSS(effectStyles);
    const effectsPath = resolve(process.cwd(), 'src/tokens/_effects.scss');
    writeFileSync(effectsPath, effectsSCSS);
    console.log('  Generated: src/tokens/_effects.scss');
    
    const textMixinsSCSS = generateTextMixinsSCSS(textStyles);
    const textMixinsPath = resolve(process.cwd(), 'src/tokens/_text-styles.scss');
    writeFileSync(textMixinsPath, textMixinsSCSS);
    console.log('  Generated: src/tokens/_text-styles.scss');
    
    console.log('\n  Done.\n');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
