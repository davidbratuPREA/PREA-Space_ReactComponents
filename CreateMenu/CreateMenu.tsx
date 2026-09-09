import React, { useState } from 'react';
import { Icon } from '../Icon';
import { KanbanStatusBadge } from '../Kanban';
import { SearchInput } from '../Inputs';
import { LayerButton } from '../MapNav';
import { CreateInput } from '../Inputs';
import type {
  CheckboxProps, CreateDropdownItemProps, CreateEntryItemProps, CreateEntryHeadProps, StatusMenuProps, CreateEntryMenuProps, CreateEntryStepProps, CreateEntryListProps,
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

/* ─── CreateEntryItem (26px, padding 10, checkbox + 13px label + status badge) ── */
export function CreateEntryItem({ label, checked = false, onCheckedChange, status, statusLabel, onClearStatus, onClick, className }: CreateEntryItemProps) {
  const toggle = () => { onCheckedChange?.(!checked); onClick?.(); };
  return (
    <div className={cx('prea-entryitem', checked && 'prea-entryitem--checked', className)} onClick={toggle} role="menuitemcheckbox" aria-checked={checked} tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}>
      <Checkbox checked={checked} onChange={(v) => onCheckedChange?.(v)} tabIndex={-1} aria-label={typeof label === 'string' ? label : undefined} onClick={(e) => e.stopPropagation()} />
      <span className="prea-entryitem__label">{label}</span>
      {status && (
        <span className="prea-entryitem__status" onClick={(e) => e.stopPropagation()}>
          <KanbanStatusBadge status={status}>{statusLabel}</KanbanStatusBadge>
          {onClearStatus && (
            <button type="button" className="prea-entryitem__clear" aria-label="Status entfernen" onClick={onClearStatus}><Icon name="li:X-close" size={12} /></button>
          )}
        </span>
      )}
    </div>
  );
}

/* ─── CreateEntryHead (20px, padding 5, checkbox + 10px label + red action) ── */
export function CreateEntryHead({ title, checked = false, indeterminate, onCheckedChange, actionLabel, onAction, className }: CreateEntryHeadProps) {
  return (
    <div className={cx('prea-entryhead', className)}>
      <Checkbox checked={checked} onChange={(v) => onCheckedChange?.(v)} aria-label={typeof title === 'string' ? title : undefined} className={cx(indeterminate && 'prea-checkbox--mixed')} />
      <span className="prea-entryhead__label" onClick={() => onCheckedChange?.(!checked)}>{title}</span>
      {actionLabel && <button type="button" className="prea-entryhead__action" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

/* ─── CreateEntryList (Figma 350 × 470 createEntryMenu) ──────────────────── */
export function CreateEntryList({
  title = 'Erstellen', onClose, search, onSearchChange, searchPlaceholder = 'Suche...', subHead, children, onBack,
  secondaryLabel, onSecondary, primaryLabel = 'Hinzufügen', onPrimary, primaryDisabled, width = 350, height = 470, className, style,
}: CreateEntryListProps) {
  return (
    <div className={cx('prea-createlist', className)} style={{ width, height, ...style }} role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="prea-createmenu__head">
        <span className="prea-createmenu__title">{title}</span>
        {onClose && <LayerButton icon="li:X-close" label="Schließen" onClick={onClose} />}
      </div>
      <div className="prea-createlist__search">
        <SearchInput width="100%" value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
        {subHead && <div className="prea-createlist__subhead">{subHead}</div>}
      </div>
      <div className="prea-createlist__items">{children}</div>
      <div className="prea-createlist__footer">
        {onBack && (
          <button type="button" className="prea-createlist__back" aria-label="Zurück" onClick={onBack}><Icon name="li:arrow-left" size={18} /></button>
        )}
        {secondaryLabel && <CreateMenuPrimaryButton className="prea-createlist__btn" onClick={onSecondary}>{secondaryLabel}</CreateMenuPrimaryButton>}
        <CreateMenuPrimaryButton className="prea-createlist__btn" onClick={onPrimary} disabled={primaryDisabled}>{primaryLabel}</CreateMenuPrimaryButton>
      </div>
    </div>
  );
}

/* ─── StatusMenu (Figma statusMenu: 150px, Kanban badges, "Neuer Status" / Edit) ── */
export function StatusMenu({
  options, value, onChange, onCreate, onPickColor, createLabel = 'Neuer Status', editing, onEditingChange, width = 150, className,
}: StatusMenuProps) {
  const [innerEditing, setInnerEditing] = useState(false);
  const isEditing = editing ?? innerEditing;
  const setEditing = (v: boolean) => { setInnerEditing(v); onEditingChange?.(v); };
  const [name, setName] = useState('');
  const commit = () => { if (name.trim()) onCreate?.(name.trim()); setName(''); setEditing(false); };
  return (
    <div className={cx('prea-statusmenu', className)} style={{ width }} role="menu">
      <div className="prea-statusmenu__badges">
        {options.map((o) => (
          <button key={o.key} type="button" role="menuitemradio" aria-checked={o.key === value}
            className={cx('prea-statusmenu__option', o.key === value && 'prea-statusmenu__option--active')} onClick={() => onChange?.(o.key)}>
            <KanbanStatusBadge status={o.status}>{o.label}</KanbanStatusBadge>
          </button>
        ))}
      </div>
      <div className="prea-statusmenu__divider" role="separator" />
      {isEditing ? (
        <div className="prea-statusmenu__edit">
          <input
            className="prea-statusmenu__input" autoFocus value={name} placeholder="Status" aria-label="Neuer Status"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setName(''); setEditing(false); } }}
          />
          <LayerButton icon="palette" label="Farbe wählen" onClick={onPickColor} />
        </div>
      ) : (
        <div className="prea-statusmenu__new">
          <button type="button" className="prea-statusmenu__newbtn" role="menuitem" onClick={() => setEditing(true)}>
            <Icon name="li:plus" size={14} /><span>{createLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── CreateEntryMenu ────────────────────────────────────────────────────── */
export function CreateEntryMenu({ title = 'Erstellen', onClose, onBack, children, footer, width = 250, height = 161, className, style }: CreateEntryMenuProps) {
  return (
    <div className={cx('prea-createmenu', className)} style={{ width, height, ...style }} role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="prea-createmenu__head">
        {onBack && <LayerButton icon="li:arrow-left" label="Zurück" onClick={onBack} />}
        <span className="prea-createmenu__title">{title}</span>
        {onClose && <LayerButton icon="li:X-close" label="Schließen" onClick={onClose} />}
      </div>
      <div className="prea-createmenu__body">{children}</div>
      {footer && <div className="prea-createmenu__footer">{footer}</div>}
    </div>
  );
}

/* ─── CreateEntryStep — Figma Step=2 body: input · "+ Projekt hinzufügen" · black button */
export function CreateEntryStep({
  value, defaultValue = '', onChange, placeholder = 'Name', addLabel, addIcon = 'li:plus', onAdd,
  submitLabel = 'Erstellen', onSubmit, submitDisabled, autoFocus, className,
}: CreateEntryStepProps) {
  const [inner, setInner] = useState(defaultValue);
  const val = value ?? inner;
  const disabled = submitDisabled ?? val.trim() === '';
  const submit = () => { if (!disabled) onSubmit?.(val); };
  return (
    <div className={cx('prea-createstep', className)}>
      <div className="prea-createstep__items">
        <CreateInput
          width="100%" value={val} placeholder={placeholder} autoFocus={autoFocus}
          onChange={(v) => { setInner(v); onChange?.(v); }}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        />
        {addLabel && <CreateDropdownItem icon={addIcon} label={addLabel} onClick={onAdd} />}
      </div>
      <CreateMenuPrimaryButton className="prea-createstep__submit" disabled={disabled} onClick={submit}>{submitLabel}</CreateMenuPrimaryButton>
    </div>
  );
}

export function CreateMenuPrimaryButton({ className, type = 'button', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx('prea-createmenu__primary', className)} {...rest} />;
}
