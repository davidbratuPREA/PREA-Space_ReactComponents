import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { ColorInput, SmallInput } from '../Inputs';
import type { ColorPickerProps, ColorPickerRow, ColorSwatchProps, ColorSwitchItemProps, ColorValue } from './ColorPicker.types';
import { hexToHsv, hexToRgb, hsvToHex, rgbToHex } from './color';
import './ColorPicker.css';

/* ─── ColorSwatch (Figma "preview" dots) ─────────────────────────────────── */
export function ColorSwatch({ color, size = 18, selected = false, onClick, label, className }: ColorSwatchProps) {
  const cls = ['prea-color-swatch', selected && 'prea-color-swatch--selected', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} style={{ width: size, height: size, background: `#${color.replace(/^#/, '')}` }} onClick={onClick} aria-label={label ?? `#${color}`} aria-pressed={selected || undefined} />
  );
}

/* ─── ColorSwitchItem (Figma "colorSwitch_item") ─────────────────────────── */
export function ColorSwitchItem({ label, value, onChange, mode = 'HEX', modes = ['HEX', 'CMYK', 'RGB', 'HSL'], onModeChange, active = false, onSelect, className }: ColorSwitchItemProps) {
  const cls = ['prea-color-switch', active && 'prea-color-switch--active', className].filter(Boolean).join(' ');
  return (
    <div className={cls} onMouseDown={onSelect}>
      <div className="prea-color-switch__badge" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(); }}>
        <span className="prea-color-switch__dot" style={{ background: `#${value.hex}`, opacity: value.opacity / 100 }} />
        <span className="prea-color-switch__label">{label}</span>
      </div>
      <SmallInput value={mode} options={modes.map((m) => ({ value: m }))} onChange={onModeChange} />
      <ColorInput
        className="prea-color-switch__hex"
        width="100%"
        value={value.hex}
        opacity={value.opacity}
        onChange={(hex) => onChange?.({ ...value, hex })}
        onOpacityChange={(opacity) => onChange?.({ ...value, opacity })}
      />
    </div>
  );
}

/* ─── ColorPicker (Figma "colorpicker") ──────────────────────────────────── */
const EyedropperGlyph = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M19.0052 10.3399L17.6604 8.99512C17.4363 8.77099 17.0742 8.77099 16.8501 8.99512L15.0571 10.7882L13.9479 9.6905L13.1376 10.5008L13.9537 11.3169L8.82739 16.4432V19.173H11.5572L16.6835 14.0467L17.4995 14.8627L18.3098 14.0524L17.2064 12.949L18.9995 11.156C19.2294 10.9261 19.2294 10.564 19.0052 10.3399ZM11.0802 18.0236L9.97678 16.9202L14.6088 12.2881L15.7122 13.3915L11.0802 18.0236Z" fill="black" fillOpacity="0.6" />
  </svg>
);

function useDrag(onMove: (x: number, y: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = useCallback((e: PointerEvent | React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    onMove(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  }, [onMove]);
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    handle(e);
    const move = (ev: PointerEvent) => handle(ev);
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return { ref, onPointerDown };
}

/**
 * ColorPicker
 *
 * Matches Figma "colorpicker": a 300px floating panel with
 *   • saturation/value area + vertical hue bar + horizontal opacity slider
 *   • a list of ColorSwitchItem rows (label · model select · hex + opacity)
 *   • eyedropper button (current colour) + quick swatches
 *   • "Aktualisieren" / reset footer
 * The wheel edits the active row; rows and sliders stay in sync both ways.
 */
export function ColorPicker({
  rows,
  onRowsChange,
  activeKey,
  onActiveKeyChange,
  swatches = ['E1F509', '21E713', 'F5AA09', 'EA7420', 'FB3D3D', '54A7FF', 'E054FF'],
  eyedropper = true,
  onApply,
  applyLabel = 'Aktualisieren',
  onReset,
  resetLabel = 'Zurücksetzen',
  width,
  className,
  style,
}: ColorPickerProps) {
  const [internalActive, setInternalActive] = useState(rows[0]?.key);
  const active = activeKey ?? internalActive;
  const row = rows.find((r) => r.key === active) ?? rows[0];
  const [modes, setModes] = useState<Record<string, string>>({});

  // HSV kept locally so hue survives when s or v hit 0
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(row?.value.hex ?? '000000'));
  useEffect(() => {
    if (!row) return;
    const cur = hsvToHex(...hsv);
    if (cur.toLowerCase() !== row.value.hex.toLowerCase() && hexToRgb(row.value.hex)) setHsv(hexToHsv(row.value.hex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row?.key, row?.value.hex]);

  function setActive(key: string) { if (activeKey === undefined) setInternalActive(key); onActiveKeyChange?.(key); }
  function updateRow(key: string, value: ColorValue) { onRowsChange?.(rows.map((r) => (r.key === key ? { ...r, value } : r))); }
  function setFromHsv(next: [number, number, number]) { setHsv(next); if (row) updateRow(row.key, { ...row.value, hex: hsvToHex(...next) }); }

  const area = useDrag((x, y) => setFromHsv([hsv[0], x, 1 - y]));
  const hue = useDrag((_x, y) => setFromHsv([Math.min(359.999, y * 360), hsv[1], hsv[2]]));
  const alpha = useDrag((x) => row && updateRow(row.key, { ...row.value, opacity: Math.round(x * 100) }));

  async function pick() {
    const ED = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (!ED || !row) return;
    try {
      const res = await new ED().open();
      const rgb = hexToRgb(res.sRGBHex);
      if (rgb) updateRow(row.key, { ...row.value, hex: rgbToHex(...rgb) });
    } catch { /* cancelled */ }
  }

  const hueHex = hsvToHex(hsv[0], 1, 1);
  const curHex = row?.value.hex ?? '000000';
  const cls = ['prea-colorpicker', className].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ width, ...style }}>
      <div className="prea-colorpicker__wrapper">
        <div className="prea-colorpicker__panel">
          <div className="prea-colorpicker__area" ref={area.ref} onPointerDown={area.onPointerDown} style={{ ['--cp-hue' as string]: `#${hueHex}` }} role="slider" aria-label="Sättigung und Helligkeit" aria-valuenow={Math.round(hsv[2] * 100)}>
            <span className="prea-colorpicker__thumb" style={{ left: `${hsv[1] * 100}%`, top: `${(1 - hsv[2]) * 100}%` }} />
          </div>
          <div className="prea-colorpicker__hue" ref={hue.ref} onPointerDown={hue.onPointerDown} role="slider" aria-label="Farbton" aria-valuenow={Math.round(hsv[0])} aria-valuemax={360}>
            <span className="prea-colorpicker__thumb" style={{ left: '50%', top: `${(hsv[0] / 360) * 100}%` }} />
          </div>
        </div>
        <div className="prea-colorpicker__alpha" ref={alpha.ref} onPointerDown={alpha.onPointerDown} style={{ ['--cp-color' as string]: `#${curHex}` }} role="slider" aria-label="Deckkraft" aria-valuenow={row?.value.opacity ?? 100}>
          <span className="prea-colorpicker__thumb" style={{ left: `${row?.value.opacity ?? 100}%`, top: '50%' }} />
        </div>
      </div>

      <div className="prea-colorpicker__rows">
        {rows.map((r) => (
          <ColorSwitchItem
            key={r.key}
            label={r.label}
            value={r.value}
            active={r.key === row?.key}
            onSelect={() => setActive(r.key)}
            mode={modes[r.key] ?? 'HEX'}
            onModeChange={(m) => setModes({ ...modes, [r.key]: m })}
            onChange={(v) => updateRow(r.key, v)}
          />
        ))}
      </div>

      <div className="prea-colorpicker__divider" />
      <div className="prea-colorpicker__preview">
        {eyedropper && (
          <button type="button" className="prea-colorpicker__eyedropper" style={{ background: `#${curHex}` }} onClick={pick} aria-label="Farbe aufnehmen" title="Farbe aufnehmen">
            <EyedropperGlyph />
          </button>
        )}
        <div className="prea-colorpicker__swatches">
          {swatches.map((s) => (
            <ColorSwatch key={s} color={s} selected={s.toLowerCase() === curHex.toLowerCase()} onClick={() => row && updateRow(row.key, { ...row.value, hex: s.toUpperCase() })} />
          ))}
        </div>
      </div>

      {(onApply || onReset) && (
        <>
          <div className="prea-colorpicker__divider" />
          <div className="prea-colorpicker__footer">
            {onApply && <button type="button" className="prea-colorpicker__btn prea-colorpicker__btn--primary" onClick={() => onApply(rows)}>{applyLabel}</button>}
            {onReset && (
              <button type="button" className="prea-colorpicker__btn prea-colorpicker__btn--secondary" aria-label={resetLabel} title={resetLabel} onClick={onReset}>
                <Icon name="li:rotate-ccw2" size={18} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
