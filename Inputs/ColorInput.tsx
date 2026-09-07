import React, { useState } from 'react';
import type { ColorInputProps } from './Inputs.types';
import './Inputs.css';

const HEX = /^[0-9a-fA-F]{0,8}$/;

/**
 * ColorInput
 *
 * Matches Figma "color_input" (state = Default | Active):
 *   ┌ 20px · r4 ──────────────────────┐
 *   │ # E1F509            │  100 %   │   ← 10px medium; "#" stays grey
 *   └─────────────────────────────────┘
 * Left part edits the hex, the right part (separated by a border) the opacity.
 */
export function ColorInput({
  value,
  defaultValue = '',
  onChange,
  opacity,
  defaultOpacity = 100,
  onOpacityChange,
  disabled = false,
  width = 137,
  className,
  style,
}: ColorInputProps) {
  const hexControlled = value !== undefined;
  const [hexInternal, setHexInternal] = useState(defaultValue);
  const hex = hexControlled ? (value as string) : hexInternal;

  const opControlled = opacity !== undefined;
  const [opInternal, setOpInternal] = useState(defaultOpacity);
  const op = opControlled ? (opacity as number) : opInternal;
  const [opDraft, setOpDraft] = useState<string | null>(null);

  const boxCls = ['prea-input-box', hex && 'prea-input-box--filled', disabled && 'prea-input-box--disabled'].filter(Boolean).join(' ');
  const cls = ['prea-color-input', className].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ width, ...style }}>
      <div className={boxCls}>
        <span className="prea-color-input__hash" aria-hidden>#</span>
        <input
          className="prea-input-native prea-color-input__hex"
          value={hex}
          disabled={disabled}
          maxLength={8}
          spellCheck={false}
          aria-label="Hex colour"
          onChange={(e) => {
            const next = e.target.value.replace(/^#/, '');
            if (!HEX.test(next)) return;
            if (!hexControlled) setHexInternal(next);
            onChange?.(next);
          }}
        />
        <div className="prea-color-input__opacity-box">
          <input
            className="prea-input-native"
            value={opDraft ?? String(op)}
            disabled={disabled}
            inputMode="numeric"
            aria-label="Opacity"
            onChange={(e) => setOpDraft(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={() => {
              if (opDraft === null) return;
              const n = Math.max(0, Math.min(100, Number(opDraft) || 0));
              if (!opControlled) setOpInternal(n);
              onOpacityChange?.(n);
              setOpDraft(null);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          />
          <span className="prea-color-input__opacity" style={{ width: 'auto' }} aria-hidden>%</span>
        </div>
      </div>
    </div>
  );
}
