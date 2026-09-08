import React from 'react';

/** Single row state — matches Figma "Dropdown Item" states */
export type DropdownItemState = 'default' | 'hover' | 'danger' | 'toggle';

export interface DropdownItemDef {
  key: string;
  /** Label text */
  label: string;
  /**
   * Optional icon rendered on the left (14 px) — a Figma icon name
   * ("li:paperclip", "gmail") or any ReactNode.
   */
  icon?: string | React.ReactNode;
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
  /**
   * Figma "Version=Lvl2": hovering this item opens a second Dropdown Menu
   * right beside the first one (4 px gap). Pass a flat list or a list of
   * groups (divider between groups). The chevron is shown automatically.
   */
  children?: DropdownItemDef[] | DropdownItemDef[][];
  /**
   * Figma "State=Toggle": a 32×18 ToggleBtn at the right instead of the
   * chevron. Clicking the row toggles it.
   */
  toggle?: {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
  };
}

export interface DropdownMenuProps {
  /** Flat item list (single group). */
  items?: DropdownItemDef[];
  /** Grouped items — a 1 px divider is rendered between groups (Figma "dropdownGroup"). */
  groups?: DropdownItemDef[][];
  /** Key of the item whose sub-menu is open initially (uncontrolled). */
  defaultOpenKey?: string;
  /** Controlled open sub-menu key. */
  openKey?: string | null;
  onOpenKeyChange?: (key: string | null) => void;
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
