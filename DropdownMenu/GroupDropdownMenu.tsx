import React from 'react';
import type { GroupDropdownMenuProps, DropdownBigItemDef } from './DropdownMenu.types';
import './DropdownMenu.css';

// ─── DropdownBigItem ───────────────────────────────────────────────────────

/**
 * DropdownBigItem
 *
 * Matches Figma "DropdownBig Item" — text-only row, 32 px tall, 14 px font.
 * No icon, no chevron. Used inside GroupDropdownMenu sections.
 *
 * States: Default (no bg) · Hover (#e7e7e7) via CSS
 */
function DropdownBigItem({
  label,
  danger = false,
  disabled = false,
  onClick,
  itemKey,
}: DropdownBigItemDef & { itemKey: string }) {
  const cls = [
    'prea-dropdown-big-item',
    danger && 'prea-dropdown-big-item--danger',
    disabled && 'prea-dropdown-big-item--disabled',
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
      <span className="prea-dropdown-big-item__label">{label}</span>
    </div>
  );
}

// ─── GroupDropdownMenu ─────────────────────────────────────────────────────

/**
 * GroupDropdownMenu
 *
 * Matches the Figma "GroupDropdown Menu" — panel with one or more groups,
 * each having a "Group head" heading followed by DropdownBig items.
 *
 * Multiple groups are separated by a 1px border divider.
 */
export function GroupDropdownMenu({ groups, className, style }: GroupDropdownMenuProps) {
  const cls = ['prea-group-dropdown-menu', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="menu" style={style}>
      {groups.map((group, gi) => (
        <div key={group.heading ?? gi} className="prea-group-dropdown-menu__section">
          <div className="prea-group-dropdown-menu__heading" aria-hidden>
            {group.heading}
          </div>
          {group.items.map((item) => {
            const { key, ...rest } = item;
            return <DropdownBigItem key={key} {...rest} itemKey={key} />;
          })}
        </div>
      ))}
    </div>
  );
}
