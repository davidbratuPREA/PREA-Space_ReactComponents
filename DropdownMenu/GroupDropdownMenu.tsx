import React from 'react';
import './DropdownMenu.css';
import type { GroupDropdownMenuProps } from './DropdownMenu.types';

/**
 * PREA GroupDropdownMenu — Dropdown panel with section group headers.
 *
 * Each group has a heading (DropdownBig Head from Figma) and a list of items.
 *
 * @example
 * ```tsx
 * <GroupDropdownMenu
 *   groups={[
 *     {
 *       heading: 'Group A',
 *       items: [
 *         { key: '1', label: 'Option 1' },
 *         { key: '2', label: 'Option 2' },
 *       ],
 *     },
 *     {
 *       heading: 'Group B',
 *       items: [
 *         { key: '3', label: 'Option 3', danger: true },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function GroupDropdownMenu({ groups, className = '', style }: GroupDropdownMenuProps) {
  return (
    <div
      className={['prea-group-dropdown-menu', className].filter(Boolean).join(' ')}
      style={style}
      role="menu"
    >
      {groups.map((group, i) => (
        <div key={i} className="prea-group-dropdown-menu__group">
          <div className="prea-group-dropdown-menu__heading">
            {group.heading}
          </div>
          <div className="prea-group-dropdown-menu__items">
            {group.items.map((item) => (
              <div
                key={item.key}
                className={[
                  'prea-dropdown-menu__item',
                  item.danger   ? 'prea-dropdown-menu__item--danger'   : '',
                  item.disabled ? 'prea-dropdown-menu__item--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="menuitem"
                aria-disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) item.onClick?.(item.key);
                }}
              >
                {item.icon && (
                  <span className="prea-dropdown-menu__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="prea-dropdown-menu__label">{item.label}</span>
                {item.suffix && (
                  <span className="prea-dropdown-menu__suffix" aria-hidden="true">
                    {item.suffix}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
