import React from 'react';
import type { StatusKind } from '../Filters';

/* ─── Checkbox (Figma "Checkbox") ────────────────────────────────────────── */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

/* ─── CreateDropdownItem (Figma "createDropdown_Item") ───────────────────── */
export interface CreateDropdownItemProps {
  icon?: string | React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/* ─── CreateEntryItem (Figma "createEntryItem" Type=Item) ────────────────── */
export interface CreateEntryItemProps {
  label: React.ReactNode;
  status?: StatusKind;
  /** Trailing 12px icon name (Figma default: chevron-right). */
  icon?: string | React.ReactNode;
  /** Adds a leading checkbox (Figma list version). */
  checkable?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
  className?: string;
}

/* ─── CreateEntryHead (Figma "createEntryItem" Type=Head) ────────────────── */
export interface CreateEntryHeadProps {
  title: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

/* ─── StatusMenu (Figma "statusMenu") ────────────────────────────────────── */
export interface StatusOption { key: string; status: StatusKind; label: string; }

export interface StatusMenuProps {
  options: StatusOption[];
  value?: string;
  onChange?: (key: string) => void;
  /** Called with the new status name when the user confirms "Neuer Status". */
  onCreate?: (name: string) => void;
  createLabel?: React.ReactNode;
  /** Width. Figma 150. */
  width?: number | string;
  className?: string;
}

/* ─── CreateEntryMenu (Figma "createEntryMenu") ──────────────────────────── */
export interface CreateEntryMenuProps {
  title?: React.ReactNode;
  onClose?: () => void;
  onBack?: () => void;
  /** Body. */
  children?: React.ReactNode;
  /** Footer (buttons). */
  footer?: React.ReactNode;
  /** Width. Figma 250 (steps) / 350 (list). */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
