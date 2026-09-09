import React from 'react';
import { Divider } from '../../../Divider';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import dividerSource from '../../../Divider/Divider.tsx?raw';
import dividerTypes  from '../../../Divider/Divider.types.ts?raw';
import dividerCss    from '../../../Divider/Divider.css?raw';
import scrollbarCss  from '../../../Scrollbar/Scrollbar.css?raw';
import scrollbarIdx  from '../../../Scrollbar/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

function DividerDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div>
        <p style={headingStyle}>Horizontal</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
          <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>Content above</span>
          <Divider orientation="horizontal" />
          <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>Content below</span>
        </div>
      </div>

      <div>
        <p style={headingStyle}>Vertical</p>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--text-primary)' }}>
          <span>Left content</span>
          <Divider orientation="vertical" style={{ height: 14, margin: '0 8px' }} />
          <span>Right content</span>
        </div>
      </div>


      <div>
        <p style={headingStyle}>Scrollbar — Figma „scrollBar“: 3px rounded thumb, no track (applies to every scrollable element)</p>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ width: 220, height: 120, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', fontSize: 12, color: 'var(--text-primary)' }}>
            {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ height: 22, lineHeight: '22px' }}>Zeile {i + 1}</div>)}
          </div>
          <div style={{ width: 260, height: 60, overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 6, padding: '8px', fontSize: 12, color: 'var(--text-primary)' }}>
            <div style={{ width: 700, whiteSpace: 'nowrap' }}>Horizontal scrolling content — Horizontal scrolling content — Horizontal scrolling content</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Divider } from './Divider';
import './Scrollbar';   // once, in your app entry — styles every scrollbar (3px rounded thumb, no track)

// Horizontal — full-width block line
<Divider orientation="horizontal" />

// Vertical — inline line, scales with text
<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" style={{ height: 14, margin: '0 8px' }} />
  <span>Right</span>
</div>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const dividerEntry: ComponentEntry = {
  id: 'divider',
  name: 'Divider',
  category: 'Foundation',
  description: 'Foundation pieces: the Divider (Horizontal full-width block / Vertical inline line) and the global Scrollbar style from Figma — a 3px rounded thumb on a transparent track, Divider/BG colour in light and dark.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=29-643',
  files: [
    { name: 'Divider.tsx',       content: dividerSource },
    { name: 'Divider.types.ts',  content: dividerTypes },
    { name: 'Divider.css',       content: dividerCss },
    { name: 'Scrollbar/Scrollbar.css', content: scrollbarCss },
    { name: 'Scrollbar/index.ts',      content: scrollbarIdx },
  ],
  usage: USAGE,
  props: [
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', required: false, description: 'Line direction. Horizontal = full-width block, Vertical = inline line.' },
    { name: 'className',   type: 'string',                    default: '—',            required: false, description: 'Additional CSS class.' },
    { name: 'style',       type: 'React.CSSProperties',       default: '—',            required: false, description: 'Inline styles — useful for controlling vertical divider height.' },
  ],
  demo: <DividerDemo />,
};
