import React, { useState } from 'react';
import { Icon } from '../Icon';
import { StatusBadge } from '../Filters';
import { IconButton } from '../Navigation';
import { CreateInput } from '../Inputs';
import type {
  CheckboxProps, CreateDropdownItemProps, CreateEntryItemProps, CreateEntryHeadProps, StatusMenuProps, CreateEntryMenuProps,
} from './CreateMenu.types';
import './CreateMenu.css';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
const renderIcon = (icon: string | React.ReactNode | undefined, size: number) => (typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon);

/* ─── Checkbox ───────────────────────────────────────────────────────────── */
export function Checkbox({ checked, defaultChecked, onChange, label, disabled, className, ...rest }: CheckboxProps) {
  const [inner, setInner] = useState(!!defaultChecked);
  const isChecked = checked ?? inner;
  return (
    <label className={cx('prea-checkbox', disabled && 'prea-checkbox--disabled', className)}>
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => { setInner(e.target.checked); onChange?.(e.target.checked); }}
        {...rest}
      />
      <span className="prea-checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.2 4.2 7.4 8 3" /></svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

/* ─── CreateDropdownItem ─────────────────────────────────────────────────── */
export function CreateDropdownItem({ icon, label, onClick, disabled, className }: CreateDropdownItemProps) {
  return (
    <button type="button" className={cx('prea-createitem', className)} onClick={onClick} disabled={disabled} role="menuitem">
      {icon && <span className="prea-createitem__icon">{renderIcon(icon, 16)}</span>}
      <span>{label}</span>
    </button>
  );
}

/* ─── CreateEntryItem ────────────────────────────────────────────────────── */
export function CreateEntryItem({ label, status, icon = 'chevron-right', checkable, checked, onCheckedChange, onClick, className }: CreateEntryItemProps) {
  const Tag = checkable ? 'div' : 'button';
  return (
    <Tag className={cx('prea-entryitem', className)} onClick={checkable ? undefined : onClick} {...(!checkable ? { type: 'button' as const } : {})}>
      {checkable && <Checkbox checked={checked} onChange={onCheckedChange} aria-label={typeof label === 'string' ? label : undefined} />}
      <span className="prea-entryitem__label">{label}</span>
      <span className="prea-entryitem__end">
        {status && <StatusBadge status={status} />}
        {icon && !checkable && <span className="prea-entryitem__icon">{renderIcon(icon, 12)}</span>}
      </span>
    </Tag>
  );
}

export function CreateEntryHead({ title, actionLabel, onAction, className }: CreateEntryHeadProps) {
  return (
    <div className={cx('prea-entryhead', className)}>
      <span>{title}</span>
      {actionLabel && <button type="button" className="prea-entryhead__action" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

/* ─── StatusMenu ─────────────────────────────────────────────────────────── */
export function StatusMenu({ options, value, onChange, onCreate, createLabel = 'Neuer Status', width = 150, className }: StatusMenuProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const commit = () => { if (name.trim()) onCreate?.(name.trim()); setName(''); setEditing(false); };
  return (
    <div className={cx('prea-statusmenu', className)} style={{ width }} role="menu">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="menuitemradio"
          aria-checked={o.key === value}
          className={cx('prea-createitem', 'prea-statusmenu__option', o.key === value && 'prea-statusmenu__option--active')}
          onClick={() => onChange?.(o.key)}
        >
          <StatusBadge status={o.status} />
          <span>{o.label}</span>
        </button>
      ))}
      <div className="prea-statusmenu__divider" role="separator" />
      {editing ? (
        <div className="prea-statusmenu__edit">
          <CreateInput width="100%" autoFocus value={name} placeholder="Status" onChange={(v) => setName(v)} onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }} />
          <IconButton size={18} icon="check-done" label="Speichern" onClick={commit} />
        </div>
      ) : (
        <CreateDropdownItem icon="plus" label={createLabel} onClick={() => setEditing(true)} />
      )}
    </div>
  );
}

/* ─── CreateEntryMenu ────────────────────────────────────────────────────── */
export function CreateEntryMenu({ title = 'Erstellen', onClose, onBack, children, footer, width = 250, className, style }: CreateEntryMenuProps) {
  return (
    <div className={cx('prea-createmenu', className)} style={{ width, ...style }} role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="prea-createmenu__head">
        <span className="prea-createmenu__title">
          {onBack && <IconButton icon="arrow-left" label="Zurück" onClick={onBack} />}
          {title}
        </span>
        {onClose && <IconButton icon="X-close" label="Schließen" onClick={onClose} />}
      </div>
      <div className="prea-createmenu__body">{children}</div>
      {footer && <div className="prea-createmenu__footer">{footer}</div>}
    </div>
  );
}

export function CreateMenuPrimaryButton({ className, type = 'button', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx('prea-createmenu__primary', className)} {...rest} />;
}
