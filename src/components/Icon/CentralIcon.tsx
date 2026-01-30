/**
 * Central Icon Wrapper - Complete Icon Registry
 * 
 * All icons from the Figma design system are available.
 * Uses vector-effect: non-scaling-stroke for consistent 1.5px strokes at any size.
 */

import React from 'react';
import { devWarn } from '@/lib/dev-warn';
import { ICON_REGISTRY, type CentralIconName } from './icon-registry';

export interface CentralIconProps {
  /** Icon name from the registry */
  name: CentralIconName;
  /** Icon size in pixels */
  size?: number;
  /** Color override */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Central Icon component with absolute stroke width
 * 
 * Features:
 * - ✅ All Figma icons available
 * - ✅ Absolute stroke width (1.5px at any size)
 * - ✅ Tree-shaking friendly
 * - ✅ TypeScript autocomplete for icon names
 */
export const CentralIcon: React.FC<CentralIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  style,
}) => {
  const IconComponent = ICON_REGISTRY[name];
  
  if (!IconComponent) {
    devWarn(`CentralIcon: Icon "${name}" not found in registry`);
    return null;
  }
  
  return (
    <IconComponent
      size={size}
      color={color}
      className={`${className || ''} central-icon-absolute-stroke`}
      style={style}
    />
  );
};

export default CentralIcon;
export type { CentralIconName };

