import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { DropdownItemDef, DropdownMenuProps } from './DropdownMenu.types';
import './DropdownMenu.css';

// ─── DropdownItem ──────────────────────────────────────────────────────────

/**
 * DropdownItem
 *
 * Matches Figma "Dropdown Item" component:
 *   [icon 14px] [label text 12px] ········ [chevron-right 14px]
 *
 * States:
 *   • default  — no background
 *   • hover    — #e7e7e7 background (handled via CSS :hover)
 *   • danger   — text and icon in #d92d20
 */
export function DropdownItem({
  label,
  icon,
  showChevron = true,
  danger = false,
  disabled = false,
  onClick,
  itemKey,
}: DropdownItemDef & { itemKey: string }) {
  const cls = [
    'prea-dropdown-item',
    danger && 'prea-dropdown-item--danger',
    disabled && 'prea-dropdown-item--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (!disabled && onClick) onClick(itemKey);
  }

  return (
    <div
      className={cls}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* icon + label */}
      <div className="prea-dropdown-item__icon-text">
        {icon && (
          <span className="prea-dropdown-item__icon-left" aria-hidden>
            {icon}
          </span>
        )}
        <span className="prea-dropdown-item__label">{label}</span>
      </div>

      {/* chevron-right — default right-side indicator */}
      {showChevron && (
        <span className="prea-dropdown-item__icon-right" aria-hidden>
          <ChevronRight size={14} strokeWidth={1.5} />
        </span>
      )}
    </div>
  );
}

// ─── DropdownMenu container ────────────────────────────────────────────────

/**
 * DropdownMenu
 *
 * Matches Figma "Dropdown Menu" component — white panel with border.
 * Renders a list of DropdownItems.
 *
 * The Figma "Version=Default" has all items with icon+chevron.
 * The Figma "Version=Mix" has some items with icon, some text-only.
 * Both are supported by controlling each item's `icon` and `showChevron` props.
 */
export function DropdownMenu({ items, className, style }: DropdownMenuProps) {
  const cls = ['prea-dropdown-menu', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="menu" style={style}>
      <div className="prea-dropdown-menu__group">
        {items.map((item) => {
          const { key, ...rest } = item;
          return <DropdownItem key={key} {...rest} itemKey={key} />;
        })}
      </div>
    </div>
  );
}
