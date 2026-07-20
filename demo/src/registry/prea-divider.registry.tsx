import React from 'react';
import { Divider } from '../../../Divider';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import dividerSource from '../../../Divider/Divider.tsx?raw';
import dividerTypes  from '../../../Divider/Divider.types.ts?raw';
import dividerCss    from '../../../Divider/Divider.css?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#888',
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
          <span style={{ fontSize: 12, color: '#202020' }}>Content above</span>
          <Divider orientation="horizontal" />
          <span style={{ fontSize: 12, color: '#202020' }}>Content below</span>
        </div>
      </div>

      <div>
        <p style={headingStyle}>Vertical</p>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#202020' }}>
          <span>Left content</span>
          <Divider orientation="vertical" style={{ height: 14, margin: '0 8px' }} />
          <span>Right content</span>
        </div>
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Divider } from './Divider';

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
  description: 'A thin line that separates content. Two variants from Figma: Horizontal (full-width block) and Vertical (inline line).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=29-643',
  files: [
    { name: 'Divider.tsx',       content: dividerSource },
    { name: 'Divider.types.ts',  content: dividerTypes },
    { name: 'Divider.css',       content: dividerCss },
  ],
  usage: USAGE,
  props: [
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', required: false, description: 'Line direction. Horizontal = full-width block, Vertical = inline line.' },
    { name: 'className',   type: 'string',                    default: '—',            required: false, description: 'Additional CSS class.' },
    { name: 'style',       type: 'React.CSSProperties',       default: '—',            required: false, description: 'Inline styles — useful for controlling vertical divider height.' },
  ],
  demo: <DividerDemo />,
};
