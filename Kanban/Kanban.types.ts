import React from 'react';

export type KanbanStatus = 'onHold' | 'pending' | 'inProgress' | 'done';

/* ─── KanbanStatusBadge (Figma "statusBadge") ────────────────────────────── */
export interface KanbanStatusBadgeProps {
  status: KanbanStatus;
  /** Label; defaults to the English Figma text ("ON HOLD", …). */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── QuantityBadge (Figma "quantityBadge") ──────────────────────────────── */
export interface QuantityBadgeProps {
  count: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── KanbanPriorityBadge (Figma "_Button group base" inside btn_badge row) ── */
export interface KanbanPriorityBadgeProps {
  children: React.ReactNode;
  /** Figma icon name or node (10px). Default "flag-03". */
  icon?: string | React.ReactNode;
  className?: string;
}

/* ─── KanbanGroupHeader (Figma "KanbanGroup") ────────────────────────────── */
export interface KanbanGroupHeaderProps {
  title: React.ReactNode;
  /** header = grey 12px project row · sub = white 18px address row. */
  variant?: 'header' | 'sub';
  open?: boolean;
  onToggle?: () => void;
  className?: string;
}

/* ─── KanbanItemRow (Figma "projekt_itemList") ───────────────────────────── */
export interface KanbanItemRowProps {
  label?: React.ReactNode;
  value?: React.ReactNode;
  /** Green highlight (Figma Style=Highlight). */
  highlight?: boolean;
  /** Icon shown before the label when highlighted. Figma icon name or node (14px). */
  icon?: string | React.ReactNode;
  /** Renders a priority badge row instead of label/value (Figma Style=btn_badge). */
  priority?: React.ReactNode;
  priorityIcon?: string | React.ReactNode;
  className?: string;
}

/* ─── KanbanProject (Figma "projektKanban") ──────────────────────────────── */
export interface KanbanProjectItem {
  key: string;
  label: React.ReactNode;
  value?: React.ReactNode;
  highlight?: boolean;
  icon?: string | React.ReactNode;
}

export interface KanbanProjectGroup {
  key: string;
  title: React.ReactNode;
  items?: KanbanProjectItem[];
  /** Priority shown as a badge row at the end of the group. */
  priority?: React.ReactNode;
  /** Initial open state. Default: first group open. */
  defaultOpen?: boolean;
}

export interface KanbanProjectProps {
  title: React.ReactNode;
  groups?: KanbanProjectGroup[];
  /** Collapse the whole project. */
  defaultOpen?: boolean;
  /** Free-form body instead of `groups`. */
  children?: React.ReactNode;
  /** Width. Figma 441. Use "100%" inside a column. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── KanbanColumn (Figma "Kandan") ──────────────────────────────────────── */
export interface KanbanColumnProps {
  status: KanbanStatus;
  /** Status label override. */
  statusLabel?: React.ReactNode;
  /** Count shown in the quantity badge; defaults to the number of children. */
  count?: number | string;
  children?: React.ReactNode;
  /** Width. Figma 457. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── KanbanBoard (Figma "KanbanPanel") ──────────────────────────────────── */
export interface KanbanBoardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
