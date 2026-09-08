import React, { useState } from 'react';
import { Button, MapButton } from '../../../Button';
import type { ButtonVariant, ButtonSize } from '../../../Button';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import buttonSource from '../../../Button/Button.tsx?raw';
import buttonTypes  from '../../../Button/Button.types.ts?raw';
import buttonCss    from '../../../Button/Button.css?raw';
import buttonIndex  from '../../../Button/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const VARIANTS: ButtonVariant[] = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 };
const label: React.CSSProperties = { fontSize: 10, color: 'var(--text-muted)', width: 56, flexShrink: 0 };

function ButtonsDemo() {
  const [size, setSize] = useState<ButtonSize>('md');
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <p style={headingStyle}>Variants — hover / press for states</p>
        <div style={row}>
          {VARIANTS.map((v) => <Button key={v} variant={v}>{v[0].toUpperCase() + v.slice(1)}</Button>)}
        </div>
      </div>

      <div>
        <p style={headingStyle}>Sizes — sm 18 · md 22 · lg 24 (lg is medium weight, 18px icon)</p>
        <div style={{ ...row, marginBottom: 12 }}>
          {SIZES.map((s) => (
            <Button key={s} size="sm" variant={size === s ? 'solid' : 'outlined'} onClick={() => setSize(s)}>{s}</Button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {VARIANTS.map((v) => (
            <div key={v} style={row}>
              <span style={label}>{v}</span>
              <Button variant={v} size={size}>Button</Button>
              <Button variant={v} size={size} icon="li:plus">Button</Button>
              <Button variant={v} size={size} icon="li:plus" iconPosition="end">Button</Button>
              <Button variant={v} size={size} icon="li:plus" aria-label="Add" />
              <Button variant={v} size={size} shape="round">Round</Button>
              <Button variant={v} size={size} shape="circle" icon="li:plus" aria-label="Add" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={headingStyle}>Disabled</p>
        <div style={row}>
          {VARIANTS.map((v) => <Button key={v} variant={v} disabled>{v}</Button>)}
        </div>
      </div>

      <div>
        <p style={headingStyle}>Danger</p>
        <div style={row}>
          {VARIANTS.map((v) => <Button key={v} variant={v} danger icon="li:X-close">{v}</Button>)}
        </div>
      </div>

      <div>
        <p style={headingStyle}>Loading & block</p>
        <div style={{ ...row, marginBottom: 12 }}>
          <Button variant="solid" loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
            {loading ? 'Saving…' : 'Click to load'}
          </Button>
          <Button variant="outlined" loading>Loading</Button>
        </div>
        <Button variant="filled" block icon="li:download">Block button</Button>
      </div>

      <div>
        <p style={headingStyle}>MapButton — 24px map control, hover me</p>
        <div style={{ ...row, gap: 16 }}>
          <MapButton icon="li:plus" label="Zoom in" />
          <MapButton icon="li:minus" label="Zoom out" />
          <MapButton icon="li:navigation" label="Locate" />
          <MapButton icon="li:layers" label="Layers" active />
        </div>
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Button, MapButton } from './Button';
// Icons by Figma name need the Icon component (./Icon); any ReactNode also works.

<Button variant="solid">Save</Button>
<Button variant="outlined" icon="li:plus">Add</Button>
<Button variant="dashed" size="sm">Dashed</Button>
<Button variant="filled" size="lg" icon="li:download" iconPosition="end">Export</Button>
<Button variant="text">Cancel</Button>
<Button variant="link" href="#">Learn more</Button>

// Icon-only (square), round and circle shapes
<Button variant="outlined" icon="li:settings" aria-label="Settings" />
<Button variant="solid" shape="round">Pill</Button>
<Button variant="solid" shape="circle" icon="li:plus" aria-label="Add" />

// States
<Button variant="solid" danger>Delete</Button>
<Button variant="outlined" loading>Saving…</Button>
<Button variant="outlined" disabled>Disabled</Button>
<Button variant="filled" block>Full width</Button>

// Map control
<MapButton icon="li:plus" label="Zoom in" onClick={zoomIn} />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const buttonEntry: ComponentEntry = {
  id: 'button',
  name: 'Button',
  category: 'General',
  description: 'Action button matching Figma "Default Button": six variants (solid, outlined, dashed, filled, text, link), three sizes (18/22/24), round/circle shapes, danger, loading, icon support — plus MapButton, the 24px map control.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=15-953',
  files: [
    { name: 'Button.tsx',      content: buttonSource },
    { name: 'Button.types.ts', content: buttonTypes },
    { name: 'Button.css',      content: buttonCss },
    { name: 'index.ts',        content: buttonIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'variant',      type: "'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'", default: "'outlined'", required: false, description: 'Visual style (Figma Variant).' },
    { name: 'size',         type: "'sm' | 'md' | 'lg'",            default: "'md'",      required: false, description: 'Height 18 / 22 / 24 px. Text is always 12/16; lg is medium weight with an 18px icon.' },
    { name: 'shape',        type: "'default' | 'round' | 'circle'", default: "'default'", required: false, description: '4px radius, pill, or circle.' },
    { name: 'icon',         type: 'string | ReactNode',             default: '—',         required: false, description: 'Figma icon name or element. Without children the button becomes an icon-only square.' },
    { name: 'iconPosition', type: "'start' | 'end'",                default: "'start'",   required: false, description: 'Icon placement.' },
    { name: 'danger',       type: 'boolean',                        default: 'false',     required: false, description: 'Red colour scheme.' },
    { name: 'loading',      type: 'boolean',                        default: 'false',     required: false, description: 'Spinner + blocked interaction.' },
    { name: 'disabled',     type: 'boolean',                        default: 'false',     required: false, description: 'Disabled look and behaviour.' },
    { name: 'block',        type: 'boolean',                        default: 'false',     required: false, description: 'Full container width.' },
    { name: 'htmlType',     type: "'button' | 'submit' | 'reset'",  default: "'button'",  required: false, description: 'Native type attribute.' },
    { name: 'MapButton.icon',   type: 'string | ReactNode',         default: "'li:plus'", required: false, description: '24px icon.' },
    { name: 'MapButton.label',  type: 'string',                     default: '—',         required: true,  description: 'Accessible label.' },
    { name: 'MapButton.active', type: 'boolean',                    default: 'false',     required: false, description: 'Forces the hover colour.' },
  ],
  demo: <ButtonsDemo />,
};
