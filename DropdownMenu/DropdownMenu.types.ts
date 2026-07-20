import type { ReactNode } from 'react';

export interface DropdownItem {
  /** Unique item key */
  key: string;
  /** Label text */
  label: ReactNode;
  /** Optional icon before the label */
  icon?: ReactNode;
  /** Renders item in danger/red style */
  danger?: boolean;
  /** Grays out the item and prevents click */
  disabled?: boolean;
  /** Optional suffix element (e.g. chevron for sub-menu indicator) */
  suffix?: ReactNode;
  onClick?: (key: string) => void;
}

export interface DropdownMenuProps {
  items: DropdownItem[];
  className?: string;
  style?: React.CSSProperties;
}

/* ── GroupDropdownMenu ─────────────────────────────────────────────────────── */

export interface DropdownGroup {
  /** Group heading label */
  heading: ReactNode;
  items: DropdownItem[];
}

export interface GroupDropdownMenuProps {
  groups: DropdownGroup[];
  className?: string;
  style?: React.CSSProperties;
}
