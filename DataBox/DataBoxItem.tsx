import React from 'react';
import type { DataBoxItemProps } from './DataBox.types';
import './DataBox.css';

/**
 * DataBoxItem
 *
 * Matches Figma "DataBox_item" (Property 1 = Head | Info item value | Info subItem value).
 *
 * • head     → Small/Regular (10/13), head-text color
 * • value    → Base/Medium  (12/16), text color
 * • subValue → Small/Regular (10/13), sub-text color, right-aligned
 */
export function DataBoxItem({ variant = 'value', children, className, style }: DataBoxItemProps) {
  const cls = ['prea-databox-item', `prea-databox-item--${variant}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <p className={cls} style={style}>
      {children}
    </p>
  );
}
