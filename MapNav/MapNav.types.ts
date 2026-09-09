import React from 'react';

/* ─── MapNav (Figma "mapNav") ────────────────────────────────────────────── */
export interface MapNavProps {
  /** MapNavGroup elements (Figma item_mapNav). */
  children: React.ReactNode;
  /** Compass heading in degrees — the compass sits at the bottom (Figma). */
  heading?: number;
  onResetHeading?: () => void;
  showCompass?: boolean;
  /** Globe / 3D-view toggle at the top (Figma 36px ring button). Omit to hide. */
  globeActive?: boolean;
  onGlobeToggle?: () => void;
  showGlobe?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── MapNavGlobe — the 36px ring toggle at the top of mapNav ────────────── */
export interface MapNavGlobeProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  active?: boolean;
  label?: string;
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
export type MapLayerKind = 'group' | 'subgroup' | 'layer' | 'active';

export interface MapLayerItemProps {
  label: React.ReactNode;
  /**
   * Row type — sets the default 14px icon:
   * group → li:folder · subgroup → li:layers-three · layer → li:layer-single · active → li:eye
   * Default: 'group' when the row has children, otherwise 'layer'.
   */
  kind?: MapLayerKind;
  /** Custom icon (Figma icon name or node) — overrides the kind icon. */
  icon?: string | React.ReactNode;
  /**
   * Indentation level 1 · 2 · 3 (Figma Level: chevron slot 14 / 34 px, level 3 padding 56 px).
   * Defaults to the parent's level + 1 when nested, 1 at the root.
   */
  level?: 1 | 2 | 3;
  /** Nested rows (rendered with a chevron; click the row to toggle). */
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Layer is visible on the map (eye / eye-closed hover action). */
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onInfo?: () => void;
  onPanel?: () => void;
  onFilter?: () => void;
  onColors?: () => void;
  /** Extra buttons rendered in the hover action row. */
  actions?: React.ReactNode;
  /** Hide the hover actions (Figma State=Hover layerBtns). */
  hideActions?: boolean;
  /** Always-visible element at the right (Figma Level=Active "Entfernen"). */
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/* ─── MapLayersMenu (Figma "MapLayersMenu") ──────────────────────────────── */
export interface MapLayersMenuProps {
  title?: React.ReactNode;
  onClose?: () => void;
  /** "Aktive Ebenen" row inside the head group (Figma Level=Active). Omit `activeLayers` to hide it. */
  activeTitle?: React.ReactNode;
  /** Active layer rows (rendered at level 2 under the "Aktive Ebenen" row). */
  activeLayers?: React.ReactNode;
  activeOpen?: boolean;
  onActiveOpenChange?: (open: boolean) => void;
  onRemoveActive?: () => void;
  removeLabel?: React.ReactNode;
  /** Available layer tree (Figma layersGroup). */
  children?: React.ReactNode;
  /** Width. Figma 314. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
