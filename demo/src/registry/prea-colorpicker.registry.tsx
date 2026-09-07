import React, { useState } from 'react';
import { ColorPicker, ColorSwitchItem, ColorSwatch } from '../../../ColorPicker';
import type { ColorPickerRow } from '../../../ColorPicker';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import pickerSrc   from '../../../ColorPicker/ColorPicker.tsx?raw';
import colorSrc    from '../../../ColorPicker/color.ts?raw';
import pickerTypes from '../../../ColorPicker/ColorPicker.types.ts?raw';
import pickerCss   from '../../../ColorPicker/ColorPicker.css?raw';
import pickerIndex from '../../../ColorPicker/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
const INITIAL: ColorPickerRow[] = [
  { key: 'a', label: 'Moderat', value: { hex: 'E1F509', opacity: 100 } },
  { key: 'b', label: 'Moderat', value: { hex: '21E713', opacity: 100 } },
  { key: 'c', label: 'Moderat', value: { hex: 'F5AA09', opacity: 100 } },
  { key: 'd', label: 'Moderat', value: { hex: 'EA7420', opacity: 100 } },
  { key: 'e', label: 'Moderat', value: { hex: '54A7FF', opacity: 100 } },
];

function ColorPickerDemo() {
  const [rows, setRows] = useState(INITIAL);
  const [single, setSingle] = useState({ hex: '21E713', opacity: 100 });
  const [log, setLog] = useState('');
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <p style={headingStyle}>ColorPicker — drag the area, hue bar and opacity; click a row to edit it</p>
        <div style={{ paddingBottom: 16 }}>
          <ColorPicker rows={rows} onRowsChange={setRows} onApply={(r) => setLog(`apply → ${r.map((x) => '#' + x.value.hex).join(', ')}`)} onReset={() => setRows(INITIAL)} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={headingStyle}>ColorSwitchItem — standalone</p>
          <div style={{ width: 258 }}>
            <ColorSwitchItem label="Moderat" value={single} onChange={setSingle} />
          </div>
        </div>
        <div>
          <p style={headingStyle}>ColorSwatch</p>
          <div style={{ display: 'flex', gap: 5 }}>
            {['E1F509', '21E713', 'F5AA09', 'EA7420', 'FB3D3D', '54A7FF', 'E054FF'].map((c) => (
              <ColorSwatch key={c} color={c} selected={c === single.hex} onClick={() => setSingle({ ...single, hex: c })} />
            ))}
          </div>
        </div>
        {log && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{log}</p>}
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { ColorPicker } from './ColorPicker';
// Requires ./Inputs and ./Icon.

const [rows, setRows] = useState([
  { key: 'low',  label: 'Moderat', value: { hex: 'E1F509', opacity: 100 } },
  { key: 'mid',  label: 'Erhöht',  value: { hex: 'F5AA09', opacity: 100 } },
  { key: 'high', label: 'Hoch',    value: { hex: 'FB3D3D', opacity: 80 } },
]);

<ColorPicker
  rows={rows}
  onRowsChange={setRows}          // wheel, sliders, inputs and swatches all update the active row
  swatches={['E1F509', '21E713', 'F5AA09']}
  onApply={(rows) => save(rows)}
  onReset={() => setRows(defaults)}
/>

// Single row / swatch
<ColorSwitchItem label="Moderat" value={v} onChange={setV} />
<ColorSwatch color="21E713" selected onClick={pick} />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const colorPickerEntry: ComponentEntry = {
  id: 'colorpicker',
  name: 'ColorPicker',
  category: 'Data Entry',
  description: 'Colour picker panel from the Figma Colorpicker page: saturation/value area, hue bar, opacity slider, editable colour rows (ColorSwitchItem), eyedropper, swatches and apply/reset footer. Includes hex/HSV helpers.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=137-1606',
  files: [
    { name: 'ColorPicker.tsx',      content: pickerSrc },
    { name: 'color.ts',             content: colorSrc },
    { name: 'ColorPicker.types.ts', content: pickerTypes },
    { name: 'ColorPicker.css',      content: pickerCss },
    { name: 'index.ts',             content: pickerIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'ColorPicker.rows / onRowsChange', type: '{ key, label, value: { hex, opacity } }[] / (rows) => void', default: '—', required: true, description: 'Colour rows; the active row is bound to the wheel.' },
    { name: 'ColorPicker.activeKey / onActiveKeyChange', type: 'string / (key) => void', default: 'first row', required: false, description: 'Controlled active row.' },
    { name: 'ColorPicker.swatches',   type: 'string[] (hex)', default: 'Figma set', required: false, description: 'Quick-pick colours.' },
    { name: 'ColorPicker.eyedropper', type: 'boolean',        default: 'true', required: false, description: 'Shows the eyedropper (browser EyeDropper API).' },
    { name: 'ColorPicker.onApply / onReset', type: '(rows) => void / () => void', default: '—', required: false, description: 'Footer buttons; footer hidden when both omitted.' },
    { name: 'ColorSwitchItem.value / onChange', type: '{ hex, opacity } / (value) => void', default: '—', required: true, description: 'Row colour.' },
    { name: 'ColorSwitchItem.mode / modes', type: 'string / string[]', default: "'HEX' / HEX CMYK RGB HSL", required: false, description: 'Colour model select.' },
    { name: 'ColorSwatch.color',      type: 'string (hex)',   default: '—', required: true, description: '18px dot.' },
  ],
  demo: <ColorPickerDemo />,
};
