import React from 'react';
import { Icon } from '../Icon';
import type { ButtonProps, MapButtonProps } from './Button.types';
import './Button.css';

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" strokeLinecap="round" />
  </svg>
);

const ICON_PX: Record<NonNullable<ButtonProps['size']>, number> = { sm: 14, md: 14, lg: 18 };

function renderIcon(icon: string | React.ReactNode | undefined, size: number) {
  if (icon === undefined || icon === null || icon === false) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

/**
 * Button
 *
 * Matches Figma "Default Button":
 *   Variant  solid · outlined · dashed · filled · text · link
 *   Size     sm 18px · md 22px · lg 24px   (12/16 text, lg is medium weight)
 *   Shape    default (4px) · round · circle
 *   States   default · hover · active · disabled  (+ danger, loading, icon-only)
 */
export function Button({
  children,
  variant = 'outlined',
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
  const hasIcon = icon !== undefined && icon !== null && icon !== false;
  const iconOnly = hasIcon && children == null && !loading;

  const classes = [
    'prea-btn',
    `prea-btn--${variant}`,
    `prea-btn--${size}`,
    danger && 'prea-btn--danger',
    loading && 'prea-btn--loading',
    block && 'prea-btn--block',
    iconOnly && 'prea-btn--icon-only',
    shape !== 'default' && `prea-btn--${shape}`,
    className,
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;
  const iconNode = !loading && hasIcon ? <span className="prea-btn__icon">{renderIcon(icon, ICON_PX[size])}</span> : null;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      className={classes}
      style={style}
      disabled={isDisabled}
      onClick={(e) => { if (!isDisabled) onClick?.(e); }}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="prea-btn__spinner" aria-hidden="true"><SpinnerIcon /></span>}
      {iconPosition === 'start' && iconNode}
      {children != null && <span className="prea-btn__label">{children}</span>}
      {iconPosition === 'end' && iconNode}
    </button>
  );
}

/**
 * MapButton
 *
 * Matches Figma "mapBtn" (State = Default | Hover): a bare 24px icon in
 * Map Navigation/Icon (#949494) that turns to IconHover (#202020) on hover.
 */
export function MapButton({ icon = 'li:plus', active = false, label, className, type = 'button', ...rest }: MapButtonProps) {
  const cls = ['prea-mapbtn', active && 'prea-mapbtn--active', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} aria-label={label} title={label} aria-pressed={active || undefined} {...rest}>
      {renderIcon(icon, 24)}
    </button>
  );
}
