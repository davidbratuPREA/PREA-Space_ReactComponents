import React from 'react';
import type { DividerProps } from './Divider.types';
import './Divider.css';

/**
 * PREA Divider — horizontal or vertical separator line.
 *
 * Supports an optional text label positioned left / center / right,
 * dashed line style, and both horizontal (block) and vertical (inline) orientations.
 *
 * @example
 * ```tsx
 * // Horizontal, no label
 * <Divider />
 *
 * // Horizontal with centred label
 * <Divider label="OR" />
 *
 * // Dashed with label on the left
 * <Divider label="Section" labelPosition="left" dashed />
 *
 * // Vertical (inline)
 * <span>Left</span>
 * <Divider orientation="vertical" />
 * <span>Right</span>
 * ```
 */
export function Divider({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  dashed = false,
  className = '',
  style,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        className={[
          'prea-divider',
          'prea-divider--vertical',
          dashed ? 'prea-divider--dashed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={[
        'prea-divider',
        dashed ? 'prea-divider--dashed' : '',
        label ? `prea-divider--label-${labelPosition}` : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role="separator"
      aria-orientation="horizontal"
    >
      {label && (
        <span className="prea-divider__label">{label}</span>
      )}
    </div>
  );
}
