import React from 'react';

/* ─── Shared ─────────────────────────────────────────────────────────────── */
type NativeInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix'>;

/* ─── TextInput (Figma "main_input") ─────────────────────────────────────── */
export interface TextInputProps extends NativeInput {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Small grey text above the field (Figma "description", 10px). */
  label?: React.ReactNode;
  /** Small grey text below the field (Figma "sub-description", 10px). */
  hint?: React.ReactNode;
  /** Shows a chevron-down at the right (Figma dropdown=true). */
  dropdown?: boolean;
  /** Any element rendered at the right inside the field (replaces the chevron). */
  suffix?: React.ReactNode;
  /** Width. Figma default 278px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── SmallInput (Figma "small_input") ───────────────────────────────────── */
export interface SmallInputOption { value: string; label?: React.ReactNode; }

export interface SmallInputProps {
  /** Current value (e.g. "HEX"). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** When given the field becomes a tiny select and opens this list. */
  options?: SmallInputOption[];
  /** Show the chevron. Default true when options are given. */
  dropdown?: boolean;
  /** Free typing when no options. */
  editable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  /** Width. Figma default 59px. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── ColorInput (Figma "color_input") ───────────────────────────────────── */
export interface ColorInputProps {
  /** Hex without "#", e.g. "E1F509". */
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  /** Opacity 0–100. */
  opacity?: number;
  defaultOpacity?: number;
  onOpacityChange?: (opacity: number) => void;
  disabled?: boolean;
  /** Width. Figma default 137px. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── CreateInput (Figma "create_input") ─────────────────────────────────── */
export interface CreateInputProps extends NativeInput {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Width. Figma default 167px. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── GroupSearchButton (Figma "Button_groupSearch") ─────────────────────── */
export interface GroupSearchButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
}

/* ─── SearchListItem (Figma "search_list_item") ──────────────────────────── */
export interface SearchListItemProps {
  /** Full text; the part matching `query` is rendered bold, the rest grey. */
  label: string;
  /** Prefix to highlight (case-insensitive). */
  query?: string;
  /** Figma icon name or node, 14px. Default "li:clock". */
  icon?: string | React.ReactNode;
  /** Right-hand action revealed on hover (Figma: "Router berechnen"). */
  action?: { label: React.ReactNode; icon?: string | React.ReactNode; onClick?: () => void };
  onClick?: () => void;
  className?: string;
}

export interface SearchListHeaderProps {
  title: React.ReactNode;
  /** "Alle anzeigen" button; hidden when omitted. */
  onShowAll?: () => void;
  showAllLabel?: React.ReactNode;
  className?: string;
}

/* ─── SearchInput (Figma "inp_Search") ───────────────────────────────────── */
export interface SearchResultItem {
  key: string;
  label: string;
  icon?: string | React.ReactNode;
  action?: SearchListItemProps['action'];
}

export interface SearchResultGroup {
  key: string;
  /** Group header; omit for the ungrouped "recent" block. */
  title?: React.ReactNode;
  items: SearchResultItem[];
  onShowAll?: () => void;
}

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** default = 24px · big = 34px (Figma Size). */
  size?: 'default' | 'big';
  /** Result groups shown under the field while it has focus (big size). */
  results?: SearchResultGroup[];
  onSelect?: (item: SearchResultItem, group: SearchResultGroup) => void;
  /** Enter with no selection. */
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Width. Figma default 328px. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
