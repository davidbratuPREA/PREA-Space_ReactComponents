import React, { useState } from 'react';
import { Icon } from '../Icon';
import { ToggleSwitch } from '../Filters';
import type { DropdownItemDef, DropdownMenuProps } from './DropdownMenu.types';
import './DropdownMenu.css';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

function toGroups(items?: DropdownItemDef[], groups?: DropdownItemDef[][]): DropdownItemDef[][] {
  if (groups && groups.length) return groups;
  return items ? [items] : [];
}
function childGroups(children?: DropdownItemDef[] | DropdownItemDef[][]): DropdownItemDef[][] {
  if (!children || children.length === 0) return [];
  return Array.isArray(children[0]) ? (children as DropdownItemDef[][]) : [children as DropdownItemDef[]];
}

// ─── DropdownItem ──────────────────────────────────────────────────────────

/**
 * DropdownItem
 *
 * Matches Figma "Dropdown Item" component:
 *   [icon 14px] [label text 12px] ········ [chevron-right 14px | ToggleBtn 32×18]
 *
 * States:
 *   • default  — no background
 *   • hover    — Dropdown/itemHover background (CSS :hover, or `open` while a sub-menu is shown)
 *   • danger   — text and icon in Dropdown/danger-text
 *   • toggle   — ToggleSwitch at the right instead of the chevron
 */
export function DropdownItem({
  label,
  icon,
  showChevron,
  danger = false,
  disabled = false,
  onClick,
  itemKey,
  toggle,
  hasChildren = false,
  open = false,
  onHover,
}: DropdownItemDef & { itemKey: string; hasChildren?: boolean; open?: boolean; onHover?: () => void }) {
  const [innerChecked, setInnerChecked] = useState(!!toggle?.defaultChecked);
  const checked = toggle?.checked ?? innerChecked;
  // Figma default: iconRight (chevron) on; items with a sub-menu always show it.
  const showRightChevron = hasChildren || (showChevron ?? true);

  const cls = cx(
    'prea-dropdown-item',
    danger && 'prea-dropdown-item--danger',
    disabled && 'prea-dropdown-item--disabled',
    toggle && 'prea-dropdown-item--toggle',
    open && 'prea-dropdown-item--open',
  );

  function handleClick() {
    if (disabled) return;
    if (toggle) {
      const next = !checked;
      setInnerChecked(next);
      toggle.onChange?.(next);
    }
    onClick?.(itemKey);
  }

  return (
    <div
      className={cls}
      role={toggle ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={toggle ? checked : undefined}
      aria-haspopup={hasChildren ? 'menu' : undefined}
      aria-expanded={hasChildren ? open : undefined}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
      }}
    >
      <div className="prea-dropdown-item__icon-text">
        {icon !== undefined && icon !== null && (
          <span className="prea-dropdown-item__icon-left" aria-hidden>
            {typeof icon === 'string' ? <Icon name={icon} size={14} /> : icon}
          </span>
        )}
        <span className="prea-dropdown-item__label">{label}</span>
      </div>

      {toggle ? (
        <ToggleSwitch
          className="prea-dropdown-item__toggle"
          checked={checked}
          disabled={disabled}
          label={label}
          onChange={(v) => { setInnerChecked(v); toggle.onChange?.(v); }}
        />
      ) : showRightChevron ? (
        <span className="prea-dropdown-item__icon-right" aria-hidden>
          <Icon name="chevron-right" size={14} />
        </span>
      ) : null}
    </div>
  );
}

// ─── DropdownMenu container ────────────────────────────────────────────────

/**
 * DropdownMenu
 *
 * Matches Figma "Dropdown Menu" — white panel with border, items in groups
 * separated by a 1 px divider.
 *
 *   • Version=Default / Mix — `items` or `groups`; per-item `icon` / `showChevron`.
 *   • Version=Lvl2          — an item with `children` opens a second panel
 *                             right beside the first (4 px gap) while hovered.
 */
export function DropdownMenu({
  items, groups, defaultOpenKey, openKey, onOpenKeyChange, className, style,
}: DropdownMenuProps) {
  const [innerOpen, setInnerOpen] = useState<string | null>(defaultOpenKey ?? null);
  const current = openKey !== undefined ? openKey : innerOpen;
  const setOpen = (k: string | null) => { setInnerOpen(k); onOpenKeyChange?.(k); };

  const allGroups = toGroups(items, groups);
  const openItem = allGroups.flat().find((it) => it.key === current && childGroups(it.children).length > 0);
  const hasAnySub = allGroups.flat().some((it) => childGroups(it.children).length > 0);

  const panel = (
    <div className={cx('prea-dropdown-menu', !hasAnySub && className)} role="menu" style={hasAnySub ? undefined : style}>
      {allGroups.map((group, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <div className="prea-dropdown-menu__divider" role="separator" />}
          <div className="prea-dropdown-menu__group">
            {group.map((item) => {
              const { key, children, ...rest } = item;
              const hasChildren = childGroups(children).length > 0;
              return (
                <DropdownItem
                  key={key}
                  {...rest}
                  itemKey={key}
                  hasChildren={hasChildren}
                  open={hasChildren && current === key}
                  onHover={() => { if (!item.disabled) setOpen(hasChildren ? key : null); }}
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  if (!hasAnySub) return panel;

  return (
    <div
      className={cx('prea-dropdown-menu-wrap', className)}
      style={style}
      onMouseLeave={() => { if (openKey === undefined) setOpen(null); }}
    >
      {panel}
      {openItem && (
        <DropdownMenu
          className="prea-dropdown-menu--lvl2"
          groups={childGroups(openItem.children)}
        />
      )}
    </div>
  );
}
