import React from 'react';

/* ─── MapNav (Figma "mapNav") ────────────────────────────────────────────── */
export interface MapNavProps {
  children: React.ReactNode;
  /** Compass heading in degrees (Figma compass 55px). */
  heading?: number;
  onResetHeading?: () => void;
  showCompass?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── MapNavGroup (Figma "item_mapNav") — vertical pill of MapButtons ─────── */
export interface MapNavGroupProps {
  children: React.ReactNode;
  className?: string;
}

/* ─── Compass ────────────────────────────────────────────────────────────── */
export interface CompassProps {
  heading?: number;
  onClick?: () => void;
  size?: number;
  className?: string;
}

/* ─── LayerButton (Figma "layerBtn") — 18px icon button on layer rows ────── */
export interface LayerButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string | React.ReactNode;
  label: string;
  active?: boolean;
}

/* ─── MapLayerItem (Figma "map-layer_item") ──────────────────────────────── */
export interface MapLayerItemProps {
  label: React.ReactNode;
  /** Indentation level 1 · 2 · 3 (Figma LayerMenu/lvl-1..3 → 14 / 34 / 56 px). */
  level?: 1 | 2 | 3;
  /** Has a chevron and children. */
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Layer is visible on the map (eye icon). */
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onInfo?: () => void;
  onPanel?: () => void;
  onFilter?: () => void;
  onColors?: () => void;
  /** Extra buttons rendered in the hover action row. */
  actions?: React.ReactNode;
  /** Hide the default hover actions. */
  hideActions?: boolean;
  onClick?: () => void;
  className?: string;
}

/* ─── MapLayersMenu (Figma "MapLayersMenu") ──────────────────────────────── */
export interface MapLayersMenuProps {
  title?: React.ReactNode;
  onClose?: () => void;
  /** "Aktive Ebenen" section. */
  activeTitle?: React.ReactNode;
  activeLayers?: React.ReactNode;
  onRemoveActive?: () => void;
  removeLabel?: React.ReactNode;
  /** Available layer tree. */
  children?: React.ReactNode;
  /** Width. Figma 314. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
