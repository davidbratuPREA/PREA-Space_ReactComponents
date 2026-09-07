import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ICONS } from './icons';
import type { IconDef } from './icons';
import type { IconProps } from './Icon.types';
import './Icon.css';

// ─── Name resolution ───────────────────────────────────────────────────────

/** Lower-cased index of the registry, built once. */
const LOWER_INDEX: Record<string, IconDef> = Object.keys(ICONS).reduce((acc, key) => {
  acc[key.toLowerCase()] = ICONS[key];
  return acc;
}, {} as Record<string, IconDef>);

/**
 * Finds a Figma-exported icon for a given name.
 *
 * Accepts the exact Figma name ("li:atom", "OpenAI", "in_planung"), any casing,
 * and the name with or without the "li:" prefix ("atom" ⇄ "li:atom").
 */
export function resolveIcon(name: string): IconDef | undefined {
  if (ICONS[name]) return ICONS[name];
  const lower = name.trim().toLowerCase();
  return (
    LOWER_INDEX[lower] ??
    LOWER_INDEX[lower.replace(/^li:/, '')] ??
    LOWER_INDEX[`li:${lower.replace(/^li:/, '')}`]
  );
}

/**
 * Converts a PREA "li:" prefixed icon name to the PascalCase used by lucide-react.
 *   "li:chevron-right" → "ChevronRight"
 */
function toPascalCase(name: string): string {
  return name
    .replace(/^li:/, '')
    .replace(/\s+\d+$/, '')
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

type LucideCmp = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

// ─── Icon ──────────────────────────────────────────────────────────────────

/**
 * Icon
 *
 * Renders an icon from the PREA Space design system.
 *
 * 1. If the name exists in the Figma-exported registry (`icons.ts`) the exact
 *    Figma glyph is rendered inline as SVG — this covers every icon on the
 *    Figma "Icons" page: line icons, filled icons, status badges and brand logos.
 * 2. Otherwise the name is mapped to lucide-react ("li:atom" → <Atom/>), so any
 *    Lucide icon can still be used before it is added to Figma.
 *
 * Monochrome icons inherit `currentColor`; multi-colour icons (brand logos,
 * status badges) keep their own colours and ignore the `color` prop.
 */
export function Icon({
  name,
  size = 16,
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
  style,
  title,
}: IconProps) {
  const cls = className ? `prea-icon ${className}` : 'prea-icon';
  const def = resolveIcon(name);

  if (def) {
    const common = {
      width: size,
      height: size,
      viewBox: def.viewBox,
      className: cls,
      style,
      role: title ? 'img' : undefined,
      'aria-label': title,
      'aria-hidden': title ? undefined : true,
      focusable: false,
      xmlns: 'http://www.w3.org/2000/svg',
    } as const;

    if (def.kind === 'stroke') {
      return (
        <svg
          {...common}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: def.body }}
        />
      );
    }
    if (def.kind === 'fill') {
      return <svg {...common} fill={color} dangerouslySetInnerHTML={{ __html: def.body }} />;
    }
    // 'color' — colours are baked into the asset
    return <svg {...common} fill="none" dangerouslySetInnerHTML={{ __html: def.body }} />;
  }

  // Fallback — lucide-react
  const LucideIcon = (LucideIcons as unknown as Record<string, LucideCmp>)[toPascalCase(name)];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cls}
      style={style}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
