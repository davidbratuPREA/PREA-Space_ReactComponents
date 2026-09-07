import type React from 'react';

/** Figma "Default Button" › Variant */
export type ButtonVariant = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
/** Figma › Size (small = 18px, middle = 22px, large = 24px) */
export type ButtonSize = 'sm' | 'md' | 'lg';
/** Figma › Shape */
export type ButtonShape = 'default' | 'round' | 'circle';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button label. Omit (with `icon`) for an icon-only square button. */
  children?: React.ReactNode;
  /** Visual style. Default 'outlined'. */
  variant?: ButtonVariant;
  /** Height 18 / 22 / 24 px. Default 'md'. */
  size?: ButtonSize;
  /** Danger / destructive colour scheme. */
  danger?: boolean;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  /** Icon — a Figma icon name ("li:plus") or any ReactNode. 14px (sm, md) / 18px (lg). */
  icon?: string | React.ReactNode;
  /** Icon placement. Default 'start'. */
  iconPosition?: 'start' | 'end';
  /** Stretch to the container width. */
  block?: boolean;
  /** Corner shape. Default 'default' (4px). */
  shape?: ButtonShape;
  /** HTML type attribute. Default 'button'. */
  htmlType?: ButtonHtmlType;
}

/** Figma "mapBtn" — 24px icon-only map control */
export interface MapButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon — Figma icon name or ReactNode. Default "li:plus". */
  icon?: string | React.ReactNode;
  /** Forces the hover colour. */
  active?: boolean;
  /** Accessible label (the button is icon-only). */
  label: string;
}
