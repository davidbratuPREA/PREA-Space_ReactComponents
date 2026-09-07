import React, { useId, useState } from 'react';
import { Icon } from '../Icon';
import type { FilterGroupHeadProps, FilterItemProps } from './Filters.types';
import { StatusBadge } from './StatusBadge';
import { ToggleSwitch } from './ToggleSwitch';
import './Filters.css';

/**
 * FilterItem
 *
 * Matches Figma "filter_item" (State × subItem) and "special_filter_item":
 *   [icon 14 | status badge 20] Item name ………………… [toggle]
 * On → medium dark text; off → regular grey text and icon. Sub items are
 * indented 8px and have no icon. Clicking the label toggles as well.
 */
export function FilterItem({ label, checked, defaultChecked = true, onChange, icon = 'grid-01', sub = false, status, disabled = false, className, style }: FilterItemProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? (checked as boolean) : internal;
  const id = useId();

  function set(next: boolean) {
    if (disabled) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const cls = ['prea-filter-item', !on && 'prea-filter-item--off', sub && 'prea-filter-item--sub', disabled && 'prea-filter-item--disabled', className]
    .filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      <span className="prea-filter-item__text" id={id} onClick={() => set(!on)}>
        {status ? (
          <StatusBadge status={status} />
        ) : (!sub && icon) ? (
          <span className="prea-filter-item__icon" aria-hidden>{typeof icon === 'string' ? <Icon name={icon} size={14} /> : icon}</span>
        ) : null}
        <span className="prea-filter-item__label">{label}</span>
      </span>
      <ToggleSwitch checked={on} onChange={set} disabled={disabled} label={typeof label === 'string' ? label : undefined} />
    </div>
  );
}

/** Figma "group_Head" — uppercase 10px group title with optional hint. */
export function FilterGroupHead({ title, hint, className }: FilterGroupHeadProps) {
  return (
    <p className={['prea-filter-group-head', className].filter(Boolean).join(' ')}>
      <span className="prea-filter-group-head__title">{title}</span>
      {hint && <span className="prea-filter-group-head__hint">{hint}</span>}
    </p>
  );
}
