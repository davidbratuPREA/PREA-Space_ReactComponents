import React from 'react';
import type { DividerProps } from './Divider.types';
import './Divider.css';

/**
 * Divider
 *
 * A thin line that separates content.
 * Matches the Figma "Divider" component — 2 variants: Horizontal and Vertical.
 *
 * • Horizontal (default): full-width block line, 1px tall
 * • Vertical: inline line, 1px wide, height relative to surrounding text
 */
export function Divider({
  orientation = 'horizontal',
  className,
  style,
}: DividerProps) {
  const cls = [
    'prea-divider',
    `prea-divider--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cls} role="separator" aria-orientation={orientation} style={style} />;
}
