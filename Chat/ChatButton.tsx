import React from 'react';
import { Icon } from '../Icon';
import type { ChatButtonProps } from './Chat.types';
import './Chat.css';

/** Renders a Figma icon name via <Icon>, or passes a ReactNode through. */
export function renderIcon(icon: string | React.ReactNode | undefined, size: number) {
  if (icon === undefined || icon === null || icon === false) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

/**
 * ChatButton
 *
 * Matches Figma "chat_btn" (State = Default | Hover/Active, text on/off).
 *
 *   [icon 16] [text 12/16]   ← 32px tall, 8px padding, 4px radius, min-width 32
 *
 * • default  → bg btn_BG; hover/active → bg btn_BG_Active + 1px btn_Border
 * • primary  → the blue send button (Toggle/btn-Active bg, white icon)
 */
export function ChatButton({
  icon,
  children,
  active = false,
  variant = 'default',
  label,
  className,
  type = 'button',
  ...rest
}: ChatButtonProps) {
  const cls = [
    'prea-chat-btn',
    variant === 'primary' && 'prea-chat-btn--primary',
    active && 'prea-chat-btn--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconNode = renderIcon(icon, 16);
  const hasText = children !== undefined && children !== null && children !== false;

  return (
    <button
      type={type}
      className={cls}
      aria-label={!hasText ? label : undefined}
      title={!hasText ? label : undefined}
      aria-pressed={active || undefined}
      {...rest}
    >
      {iconNode && <span className="prea-chat-btn__icon" aria-hidden>{iconNode}</span>}
      {hasText && <span className="prea-chat-btn__text">{children}</span>}
    </button>
  );
}
