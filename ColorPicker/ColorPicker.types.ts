import React from 'react';

/** A colour value handled by the picker: hex without "#" + opacity 0–100. */
export interface ColorValue { hex: string; opacity: number; }

/* ─── ColorSwitchItem (Figma "colorSwitch_item") ─────────────────────────── */
export interface ColorSwitchItemProps {
  /** Row label, e.g. "Moderat". */
  label: React.ReactNode;
  value: ColorValue;
  onChange?: (value: ColorValue) => void;
  /** Colour model shown in the small select. Default "HEX". */
  mode?: string;
  modes?: string[];
  onModeChange?: (mode: string) => void;
  /** Marks the row as the one being edited (hover look). */
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

/* ─── ColorSwatch (Figma "preview") ──────────────────────────────────────── */
export interface ColorSwatchProps {
  color: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}

/* ─── ColorPicker (Figma "colorpicker") ──────────────────────────────────── */
export interface ColorPickerRow {
  key: string;
  label: React.ReactNode;
  value: ColorValue;
}

export interface ColorPickerProps {
  /** Rows edited by the picker (Figma shows five). The active row is bound to the wheel. */
  rows: ColorPickerRow[];
  onRowsChange?: (rows: ColorPickerRow[]) => void;
  /** Key of the row bound to the wheel/sliders. Uncontrolled when omitted. */
  activeKey?: string;
  onActiveKeyChange?: (key: string) => void;
  /** Quick-pick swatches (hex). */
  swatches?: string[];
  /** Eyedropper button (uses the EyeDropper API when available). Hidden when false. */
  eyedropper?: boolean;
  onApply?: (rows: ColorPickerRow[]) => void;
  applyLabel?: React.ReactNode;
  onReset?: () => void;
  resetLabel?: string;
  /** Width. Figma 300. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
