import React, { useState } from 'react';
import { Icon } from '../Icon';
import type { TextInputProps } from './Inputs.types';
import './Inputs.css';

/**
 * TextInput
 *
 * Matches Figma "main_input" (State = Default | Active | Focus, description,
 * subDescription, dropdown):
 *
 *   Description                      ← 10/13, description colour, 6px inset
 *   ┌ 24px · border D0D0D0 · r4 ────┐
 *   │ Input name              [⌄]   │  ← 12/16; active bg white; focus border blue
 *   └───────────────────────────────┘
 *   Lorem ipsum sub-description      ← 10/13
 */
export function TextInput({
  value,
  defaultValue = '',
  onChange,
  label,
  hint,
  dropdown = false,
  suffix,
  width = 278,
  className,
  style,
  disabled,
  ...rest
}: TextInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const text = isControlled ? (value as string) : internal;

  const boxCls = ['prea-input-box', text && 'prea-input-box--filled', disabled && 'prea-input-box--disabled']
    .filter(Boolean).join(' ');
  const cls = ['prea-text-input', className].filter(Boolean).join(' ');

  return (
    <label className={cls} style={{ width, ...style }}>
      {label !== undefined && label !== null && <p className="prea-text-input__desc">{label}</p>}
      <div className={boxCls}>
        <input
          {...rest}
          className="prea-input-native"
          value={text}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.value);
            onChange?.(e.target.value, e);
          }}
        />
        {suffix ?? (dropdown && (
          <span className="prea-input-icon" aria-hidden>
            <Icon name="li:chevron-down" size={14} />
          </span>
        ))}
      </div>
      {hint !== undefined && hint !== null && <p className="prea-text-input__desc">{hint}</p>}
    </label>
  );
}
