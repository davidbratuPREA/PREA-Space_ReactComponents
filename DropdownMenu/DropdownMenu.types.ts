import React from 'react';

/** Single row state — matches Figma "Dropdown Item" states */
export type DropdownItemState = 'default' | 'hover' | 'danger';

export interface DropdownItemDef {
  key: string;
  /** Label text */
  label: string;
  /**
   * Optional icon — ReactNode rendered on the left (14 px).
   * In the Figma design this is always a lucide icon (e.g. li:atom).
   */
  icon?: React.ReactNode;
  /**
   * Optional right-side element.
   * Figma default: a chevron-right icon — pass false to hide it.
   */
  showChevron?: boolean;
  /** Renders the item in danger/red style */
  danger?: boolean;
  /** Grays the item out — no hover interaction */
  disabled?: boolean;
  onClick?: (key: string) => void;
}

export interface DropdownMenuProps {
  items: DropdownItemDef[];
  className?: string;
  style?: React.CSSProperties;
}

/* ─── GroupDropdownMenu ──────────────────────────────────────────────────── */

export interface DropdownBigItemDef {
  key: string;
  label: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (key: string) => void;
}

export interface DropdownGroup {
  /** Group header label ("Group head" in Figma) */
  heading: string;
  items: DropdownBigItemDef[];
}

export interface GroupDropdownMenuProps {
  groups: DropdownGroup[];
  className?: string;
  style?: React.CSSProperties;
}
