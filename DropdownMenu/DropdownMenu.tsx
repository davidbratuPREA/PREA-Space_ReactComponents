import React from 'react';
import type { DropdownMenuProps } from './DropdownMenu.types';
import './DropdownMenu.css';

/**
 * PREA DropdownMenu — The dropdown panel/popup content.
 *
 * Ships as a standalone panel so the developer can wire it to any trigger.
 * Handles Default, Hover, Danger, and Disabled item states from the Figma design.
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   items={[
 *     { key: '1', label: 'Edit', icon: <EditIcon /> },
 *     { key: '2', label: 'Delete', danger: true },
 *     { key: '3', label: 'Archive', disabled: true },
 *   ]}
 * />
 * ```
 */
export function DropdownMenu({ items, className = '', style }: DropdownMenuProps) {
  return (
    <div
      className={['prea-dropdown-menu', className].filter(Boolean).join(' ')}
      style={style}
      role="menu"
    >
      {items.map((item) => (
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
  );
}
