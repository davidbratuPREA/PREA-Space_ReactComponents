import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { DataButtonProps } from './DataBox.types';
import './DataBox.css';

/** "li:chevron-right" → "ChevronRight" (PREA Figma naming → lucide-react export) */
function lucideName(name: string): string {
  return name
    .replace(/^li:/, '')
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

type LucideCmp = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

/**
 * DataButton
 *
 * Matches Figma "Data_button" (State = Default | Hover).
 * 18×18, radius 4, bg PlusBtn → PlusBtn_hover on hover, 14px icon in PlusBtn_icon.
 */
export function DataButton({
  icon = 'li:plus',
  label = 'Add',
  className,
  type = 'button',
  ...rest
}: DataButtonProps) {
  const IconCmp = (LucideIcons as unknown as Record<string, LucideCmp>)[lucideName(icon)];
  const cls = ['prea-databtn', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} aria-label={label} title={label} {...rest}>
      {IconCmp ? <IconCmp size={14} strokeWidth={1.5} aria-hidden /> : null}
    </button>
  );
}
