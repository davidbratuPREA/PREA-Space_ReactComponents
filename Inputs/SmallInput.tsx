import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import type { SmallInputProps } from './Inputs.types';
import './Inputs.css';

/**
 * SmallInput
 *
 * Matches Figma "small_input" (state = Default | Active, dropdown): a 20px field
 * with 10px medium text. With `options` it behaves as a tiny select and opens a
 * list (Figma Active state); otherwise it is a plain small text field.
 */
export function SmallInput({
  value,
  defaultValue = '',
  onChange,
  options,
  dropdown,
  editable,
  placeholder,
  disabled = false,
  width = 59,
  className,
  style,
}: SmallInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? (value as string) : internal;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isSelect = Array.isArray(options) && options.length > 0;
  const showChevron = dropdown ?? isSelect;

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const boxCls = ['prea-input-box', current && 'prea-input-box--filled', open && 'prea-input-box--open', disabled && 'prea-input-box--disabled']
    .filter(Boolean).join(' ');
  const cls = ['prea-small-input', className].filter(Boolean).join(' ');
  const selected = options?.find((o) => o.value === current);

  return (
    <div className={cls} style={{ width, ...style }} ref={rootRef}>
      <div className={boxCls}>
        {isSelect && !editable ? (
          <button
            type="button"
            className="prea-small-input__trigger"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className={['prea-small-input__value', !current && 'prea-small-input__value--placeholder'].filter(Boolean).join(' ')}>
              {selected?.label ?? current ?? placeholder}
            </span>
            {showChevron && <span className="prea-input-icon" aria-hidden><Icon name="li:chevron-down" size={14} /></span>}
          </button>
        ) : (
          <>
            <input
              className="prea-input-native"
              value={current}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => commit(e.target.value)}
              onFocus={() => isSelect && setOpen(true)}
            />
            {showChevron && <span className="prea-input-icon" aria-hidden><Icon name="li:chevron-down" size={14} /></span>}
          </>
        )}
      </div>

      {open && isSelect && (
        <ul className="prea-small-input__panel" role="listbox">
          {options!.map((o) => (
            <li key={o.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={o.value === current}
                className="prea-small-input__option"
                onClick={() => { commit(o.value); setOpen(false); }}
              >
                {o.label ?? o.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
