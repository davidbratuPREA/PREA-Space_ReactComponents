import React, { useState } from 'react';
import type { CreateInputProps } from './Inputs.types';
import './Inputs.css';

/**
 * CreateInput
 *
 * Matches Figma "create_input" (Style = Default | Active): a 28px text field
 * (controlHeight-L) used in the create-entry menus.
 */
export function CreateInput({ value, defaultValue = '', onChange, width = 167, className, style, disabled, ...rest }: CreateInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const text = isControlled ? (value as string) : internal;
  const boxCls = ['prea-input-box', text && 'prea-input-box--filled', disabled && 'prea-input-box--disabled'].filter(Boolean).join(' ');
  const cls = ['prea-create-input', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      <div className={boxCls}>
        <input
          {...rest}
          className="prea-input-native"
          value={text}
          disabled={disabled}
          onChange={(e) => { if (!isControlled) setInternal(e.target.value); onChange?.(e.target.value, e); }}
        />
      </div>
    </div>
  );
}
