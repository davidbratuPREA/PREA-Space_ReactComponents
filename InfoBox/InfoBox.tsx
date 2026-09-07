import React from 'react';
import type { InfoBoxProps } from './InfoBox.types';
import './InfoBox.css';

/**
 * InfoBox
 *
 * Matches Figma "info_box" — a small KPI tile:
 *   ┌ bg BG3 · border · radius 4 · padding 10/10/12 ┐
 *   │ label   11px regular, head-text               │
 *   │ VALUE   16px medium, text                     │
 *   └───────────────────────────────────────────────┘
 */
export function InfoBox({ label, value, width = 155, className, style }: InfoBoxProps) {
  const cls = ['prea-infobox', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      <p className="prea-infobox__label">{label}</p>
      <p className="prea-infobox__value">{value}</p>
    </div>
  );
}
