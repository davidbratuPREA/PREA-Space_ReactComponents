import React from 'react';

// ─── DataBoxItem ───────────────────────────────────────────────────────────

/** Figma "DataBox_item" → Property 1 */
export type DataBoxItemVariant = 'head' | 'value' | 'subValue';

export interface DataBoxItemProps {
  /**
   * head     → 10px regular, head-text color (section label)
   * value    → 12px medium, text color (main info value)
   * subValue → 10px regular, sub-text color, right-aligned
   */
  variant?: DataBoxItemVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─── DataBox ───────────────────────────────────────────────────────────────

/** One "infoGroup" in the left column: a Head label followed by 1..n values */
export interface DataBoxGroup {
  key?: string;
  head: React.ReactNode;
  values: React.ReactNode[];
}

export interface DataBoxProps {
  /**
   * Left column — info groups (Head + values).
   * Groups are spaced 16px apart, rows within a group 8px apart.
   */
  groups?: DataBoxGroup[];
  /**
   * Right column — groups of right-aligned sub values.
   * The first group sits at the top, the last at the bottom (space-between).
   */
  subGroups?: React.ReactNode[][];
  /**
   * Free-form body. When given, replaces groups/subGroups.
   * Use it for the Figma "Item=AG" variant (an AG Grid table slot).
   */
  children?: React.ReactNode;
  /** Minimum height for the children slot (Figma AG variant: 165px). */
  minHeight?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── DataButton ────────────────────────────────────────────────────────────

export interface DataButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Lucide icon name in PREA "li:" format. Default "li:plus". */
  icon?: string;
  /** Accessible label. Default "Add". */
  label?: string;
}

// ─── DataGroup ─────────────────────────────────────────────────────────────

export type DataGroupLevel = 1 | 2;

export interface DataGroupProps {
  /** Header title (e.g. "HeadGroup-lv.1") */
  title: React.ReactNode;
  /** 1 = top level (5px inset), 2 = nested (10px inset). Default 1. */
  level?: DataGroupLevel;
  /** Controlled open state. Leave undefined for uncontrolled. */
  open?: boolean;
  /** Initial state when uncontrolled. Default true. */
  defaultOpen?: boolean;
  /** Fires on header click / Enter / Space. */
  onOpenChange?: (open: boolean) => void;
  /** When given, a Data_button (plus) is rendered at the right of the header. */
  onPlusClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Body — usually a <DataBox> or nested <DataGroup level={2}>. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─── DataPanel ─────────────────────────────────────────────────────────────

export interface DataPanelProps {
  /** Stack of <DataGroup>s (each rendered as a "dataWrapper"), 8px apart. */
  children?: React.ReactNode;
  /** Width. Figma default 500px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
