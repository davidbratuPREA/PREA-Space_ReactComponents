import React, { useState } from 'react';
import type { ToggleSwitchProps } from './Filters.types';
import './Filters.css';

/**
 * ToggleSwitch
 *
 * Matches Figma "ToggleBtn" (State = Enabled | Disabled): 32×18, 4px radius,
 * 12px square knob — grey/left when off, white bg + blue knob/right when on.
 */
export function ToggleSwitch({ checked, defaultChecked = false, onChange, disabled = false, label, className, style }: ToggleSwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? (checked as boolean) : internal;

  function toggle() {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const cls = ['prea-toggle', on && 'prea-toggle--on', className].filter(Boolean).join(' ');
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={cls} style={style} disabled={disabled} onClick={toggle}>
      <span className="prea-toggle__knob" />
    </button>
  );
}
