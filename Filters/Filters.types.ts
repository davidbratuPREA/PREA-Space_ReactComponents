import React from 'react';

/* ─── ToggleSwitch (Figma "ToggleBtn") ───────────────────────────────────── */
export interface ToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Accessible label. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── StatusBadge (Figma "status") ───────────────────────────────────────── */
export type StatusKind = 'in_planung' | 'im_baut' | 'fertiggestellt';

export interface StatusBadgeProps {
  status: StatusKind;
  /** Accessible label; defaults to the status name. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── FilterItem (Figma "filter_item" / "special_filter_item") ───────────── */
export interface FilterItemProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Figma icon name or node (14px). Default "grid-01". Ignored for sub items. */
  icon?: string | React.ReactNode;
  /** Sub item: indented 8px, no icon (Figma subItem=true). */
  sub?: boolean;
  /** Special item: shows a StatusBadge instead of the icon. */
  status?: StatusKind;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── FilterGroupHead (Figma "group_Head") ───────────────────────────────── */
export interface FilterGroupHeadProps {
  title: React.ReactNode;
  /** Secondary text after the title, e.g. "(Alle Angaben werden UND-verknüpft)". */
  hint?: React.ReactNode;
  className?: string;
}

/* ─── FilterTabs (Figma "TabsSecondary") ─────────────────────────────────── */
export interface FilterTab { key: string; label: React.ReactNode; }

export interface FilterTabsProps {
  tabs: FilterTab[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

/* ─── FilterPanel (Figma "layer_filter") ─────────────────────────────────── */
export interface FilterPanelProps {
  /** Header tabs. */
  tabs?: FilterTab[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
  onClose?: () => void;
  /** Body — use <FilterSection> blocks; they are separated by dividers. */
  children?: React.ReactNode;
  /** Footer primary button. Hidden with the whole footer when both callbacks are omitted. */
  onApply?: () => void;
  applyLabel?: React.ReactNode;
  /** Footer secondary (reset) button. */
  onReset?: () => void;
  resetLabel?: string;
  /** Width. Figma controlWidth 300. */
  width?: number | string;
  /** Height; content scrolls. Figma 502. Omit to hug content. */
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export interface FilterSectionProps {
  children?: React.ReactNode;
  /** Vertical gap between rows. Default 6 (10 for input lists). */
  gap?: number;
  className?: string;
}

/* ─── FilterRange (Figma step 3: "Input bis Input") ──────────────────────── */
export interface FilterRangeProps {
  label?: React.ReactNode;
  from?: string;
  to?: string;
  onChange?: (range: { from: string; to: string }) => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  /** Word between the fields. Default "bis". */
  separator?: React.ReactNode;
  className?: string;
}
