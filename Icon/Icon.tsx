import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { IconProps } from './Icon.types';
import './Icon.css';

/**
 * Converts a PREA "li:" prefixed icon name to the PascalCase used by lucide-react.
 *
 * Examples:
 *   "li:atom"          → "Atom"
 *   "li:chevron-right" → "ChevronRight"
 *   "li:arrow-up-left" → "ArrowUpLeft"
 */
function toPascalCase(name: string): string {
  return name
    .replace(/^li:/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Icon
 *
 * Thin wrapper around lucide-react. Accepts the PREA "li:" naming convention
 * used in Figma (e.g. "li:atom", "li:chevron-right") and maps it to the
 * corresponding Lucide icon.
 *
 * Stroke color defaults to `currentColor` so the icon inherits CSS color.
 */
export function Icon({
  name,
  size = 16,
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
  style,
}: IconProps) {
  const iconKey = toPascalCase(name);
  // lucide-react exports are named React components
  const LucideIcon = (LucideIcons as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>>)[iconKey];

  if (!LucideIcon) {
    // Unknown icon — render nothing but don't throw
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className ? `prea-icon ${className}` : 'prea-icon'}
      style={style}
    />
  );
}
