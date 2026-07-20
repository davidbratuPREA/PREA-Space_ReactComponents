import React from 'react';
import { Icon } from '../../../Icon';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import iconSource    from '../../../Icon/Icon.tsx?raw';
import iconTypes     from '../../../Icon/Icon.types.ts?raw';
import iconCss       from '../../../Icon/Icon.css?raw';
import iconIndex     from '../../../Icon/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48] as const;

const SAMPLE_ICONS = [
  'li:atom', 'li:chevron-right', 'li:chevron-down', 'li:chevron-left',
  'li:chevron-up', 'li:plus', 'li:minus', 'li:x', 'li:check', 'li:search',
  'li:settings', 'li:home', 'li:user', 'li:mail', 'li:bell', 'li:star',
  'li:heart', 'li:trash-2', 'li:edit', 'li:download',
];

function IconDemo() {
  const sectionStyle: React.CSSProperties = { marginBottom: 32 };
  const headingStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div>
      {/* li:atom — standard example */}
      <div style={sectionStyle}>
        <p style={headingStyle}>li:atom — Standard Example Icon (all sizes)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Icon name="li:atom" size={size} />
              <span style={{ fontSize: 10, color: '#aaa' }}>{size}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Color via currentColor</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { color: '#202020', label: 'Default' },
            { color: '#d92d20', label: 'Danger' },
            { color: '#888', label: 'Muted' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Icon name="li:atom" size={20} color={color} />
              <span style={{ fontSize: 10, color: '#aaa' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon grid */}
      <div style={sectionStyle}>
        <p style={headingStyle}>Sample Lucide Icons (li: prefix)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 80px)', gap: 8 }}>
          {SAMPLE_ICONS.map((name) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8 }}>
              <Icon name={name} size={20} />
              <span style={{ fontSize: 9, color: '#aaa', textAlign: 'center', wordBreak: 'break-all' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Icon } from './Icon';

// Use the "li:" prefix — matches Figma naming convention
<Icon name="li:atom" size={16} />
<Icon name="li:chevron-right" size={14} />

// Color via prop or CSS currentColor
<Icon name="li:atom" size={20} color="#d92d20" />
<span style={{ color: 'red' }}><Icon name="li:atom" size={20} /></span>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const iconsEntry: ComponentEntry = {
  id: 'icons',
  name: 'Icon',
  category: 'Foundation',
  description: 'Thin wrapper around lucide-react. Uses the PREA "li:" naming convention from Figma. The li:atom icon is the standard example used across the design system.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=13-2222',
  files: [
    { name: 'Icon.tsx',       content: iconSource },
    { name: 'Icon.types.ts',  content: iconTypes },
    { name: 'Icon.css',       content: iconCss },
    { name: 'index.ts',       content: iconIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'name',        type: 'string',               default: '—',            required: true,  description: 'Icon name with "li:" prefix, e.g. "li:atom". Maps to the lucide-react component name.' },
    { name: 'size',        type: 'number',               default: '16',           required: false, description: 'Icon size in pixels. Figma sizes: 12 14 16 18 20 22 24 28 32 36 48.' },
    { name: 'color',       type: 'string',               default: 'currentColor', required: false, description: 'Stroke color. Defaults to currentColor so it inherits from CSS.' },
    { name: 'strokeWidth', type: 'number',               default: '1.5',          required: false, description: 'SVG stroke width. Figma default is 1.5.' },
    { name: 'className',   type: 'string',               default: '—',            required: false, description: 'Additional CSS class.' },
    { name: 'style',       type: 'React.CSSProperties',  default: '—',            required: false, description: 'Inline styles.' },
  ],
  demo: <IconDemo />,
};
