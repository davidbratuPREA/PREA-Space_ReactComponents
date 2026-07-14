import type React from 'react';

export type ButtonVariant = 'solid' | 'default' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'round' | 'circle';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';

// React 18 removed `children` from HTMLAttributes — we add it back explicitly.
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button label content. */
  children?: React.ReactNode;
  /** Visual style of the button. Defaults to 'default'. */
  variant?: ButtonVariant;
  /** Size of the button. Defaults to 'md'. */
  size?: ButtonSize;
  /** Apply danger/destructive color scheme. */
  danger?: boolean;
  /** Show a loading spinner and disable the button. */
  loading?: boolean;
  /** Icon element placed before or after the label. */
  icon?: React.ReactNode;
  /** Where the icon is placed relative to the label. Defaults to 'start'. */
  iconPosition?: 'start' | 'end';
  /** Stretch button to the full width of its container. */
  block?: boolean;
  /** Shape of the button. Defaults to 'default'. */
  shape?: ButtonShape;
  /** HTML button type attribute. Defaults to 'button'. */
  htmlType?: ButtonHtmlType;
}
