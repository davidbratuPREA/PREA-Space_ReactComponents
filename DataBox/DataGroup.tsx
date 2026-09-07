import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { DataGroupProps } from './DataBox.types';
import { DataButton } from './DataButton';
import './DataBox.css';

/**
 * DataGroup
 *
 * Matches Figma "DataGroup" (Level = 1 | 2, Open = True | False, plusBtn).
 *
 *   [chevron 14] [title 12/500 ................] [Data_button 18]   ← Head, 26px
 *   ┌─ body (Items) ────────────────────────────────────────────┐   ← only when open
 *   │  <DataBox /> or nested <DataGroup level={2} />             │
 *   └────────────────────────────────────────────────────────────┘
 *
 * • Level 1 inset 5px, Level 2 inset 10px (left) / 5px (right).
 * • Chevron: chevron-down when open, chevron-right when closed.
 * • Controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`).
 */
export function DataGroup({
  title,
  level = 1,
  open,
  defaultOpen = true,
  onOpenChange,
  onPlusClick,
  children,
  className,
  style,
}: DataGroupProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  const cls = ['prea-datagroup', `prea-datagroup--lv${level}`, isOpen && 'prea-datagroup--open', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} style={style}>
      <div
        className="prea-datagroup__head"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <span className="prea-datagroup__chevron" aria-hidden>
          {isOpen ? <ChevronDown size={14} strokeWidth={1.5} /> : <ChevronRight size={14} strokeWidth={1.5} />}
        </span>
        <p className="prea-datagroup__title">{title}</p>
        {onPlusClick && (
          <DataButton
            onClick={(e) => {
              e.stopPropagation();
              onPlusClick(e);
            }}
          />
        )}
      </div>

      {isOpen && children !== undefined && children !== null && (
        <div className="prea-datagroup__body">{children}</div>
      )}
    </div>
  );
}
