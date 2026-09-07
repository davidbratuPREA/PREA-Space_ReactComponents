import React from 'react';
import type { DataPanelProps } from './DataBox.types';
import './DataBox.css';

/**
 * DataPanel
 *
 * Matches Figma "DataPanel" — the outer container that stacks DataGroups
 * ("dataWrapper"s) with an 8px gap and 8px padding. Default width 500px.
 */
export function DataPanel({ children, width = 500, className, style }: DataPanelProps) {
  const cls = ['prea-datapanel', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      {children}
    </div>
  );
}
