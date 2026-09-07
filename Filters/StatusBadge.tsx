import React from 'react';
import { ICONS } from '../Icon';
import type { StatusBadgeProps } from './Filters.types';
import './Filters.css';

/**
 * StatusBadge
 *
 * Matches Figma "status" (in_planung | im_baut | fertiggestellt): a 20px
 * rounded square with a coloured border, a tinted background (5% light / 15%
 * dark) and the status glyph in the same colour. The glyph is taken from the
 * Figma-exported icon registry; the box colours come from the Filter tokens.
 */
export function StatusBadge({ status, label, className, style }: StatusBadgeProps) {
  const def = ICONS[status];
  // Registry body = <rect bg/><rect border/><path glyph…/> → keep only the glyph paths
  const glyph = def ? def.body.replace(/<rect[^>]*\/>/g, '').replace(/ (?:fill|stroke)="#[0-9A-Fa-f]{6}"/g, ' stroke="currentColor"').replace(/ fill="black"/g, ' fill="currentColor"') : '';
  const cls = ['prea-status-badge', `prea-status-badge--${status}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={style} role="img" aria-label={label ?? status.replace('_', ' ')}>
      {def && (
        <svg viewBox={def.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden dangerouslySetInnerHTML={{ __html: glyph }} />
      )}
    </span>
  );
}
