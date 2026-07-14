import React from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="3"
      strokeDasharray="40 20"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * PREA Button — the core action primitive of the PREA design system.
 *
 * Supports five variants (solid, default, dashed, text, link),
 * three sizes (sm, md, lg), danger state, loading state, icons,
 * round/circle shapes, and full dark-mode support via `[data-theme="dark"]`.
 */
export function Button({
  children,
  variant = 'default',
  size = 'md',
  danger = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'start',
  block = false,
  shape = 'default',
  htmlType = 'button',
  className = '',
  style,
  onClick,
  ...rest
}: ButtonProps) {
  // Icon-only: has an icon, no visible label, not loading (spinner replaces icon).
  // Loading spinner counts as a "label" so the button keeps its normal width.
  const iconOnly = !!icon && children == null && !loading;

  const classes = [
    'prea-btn',
    `prea-btn--${variant}`,
    `prea-btn--${size}`,
    danger   ? 'prea-btn--danger'    : '',
    loading  ? 'prea-btn--loading'   : '',
    block    ? 'prea-btn--block'     : '',
    iconOnly ? 'prea-btn--icon-only' : '',
    shape !== 'default' ? `prea-btn--${shape}` : '',
    className,
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  const iconNode = !loading && icon ? (
    <span className="prea-btn__icon">{icon}</span>
  ) : null;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      className={classes}
      style={style}
      disabled={isDisabled}
      onClick={handleClick}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span className="prea-btn__spinner" aria-hidden="true">
          <SpinnerIcon />
        </span>
      )}

      {iconPosition === 'start' && iconNode}

      {children != null && (
        <span className="prea-btn__label">{children}</span>
      )}

      {iconPosition === 'end' && iconNode}
    </button>
  );
}
