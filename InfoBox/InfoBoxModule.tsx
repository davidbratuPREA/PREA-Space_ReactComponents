import React from 'react';
import type { InfoBoxModuleProps } from './InfoBox.types';
import './InfoBox.css';

/**
 * InfoBoxModule
 *
 * Matches Figma "info_box_module" — a grey strip (bg BG, bottom border Divider)
 * with 8px padding that lays out InfoBoxes in a wrapping row, 12px apart.
 */
export function InfoBoxModule({ children, width = 839, className, style }: InfoBoxModuleProps) {
  const cls = ['prea-infobox-module', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      <div className="prea-infobox-module__items">{children}</div>
    </div>
  );
}
