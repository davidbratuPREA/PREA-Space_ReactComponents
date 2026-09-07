import React, { useMemo, useState } from 'react';
import { Icon, ICONS, ICON_NAMES } from '../../../Icon';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import iconSource    from '../../../Icon/Icon.tsx?raw';
import iconRegistry  from '../../../Icon/icons.ts?raw';
import iconTypes     from '../../../Icon/Icon.types.ts?raw';
import iconCss       from '../../../Icon/Icon.css?raw';
import iconIndex     from '../../../Icon/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const SIZES = [10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48] as const;

const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const GROUPS: Array<{ title: string; filter: (name: string) => boolean }> = [
  { title: 'Line icons',    filter: (n) => ICONS[n].kind === 'stroke' },
  { title: 'Filled icons',  filter: (n) => ICONS[n].kind === 'fill' && n !== 'OpenAI' && n !== 'PREA-Logo' },
  { title: 'Special icons', filter: (n) => ICONS[n].kind === 'color' || n === 'OpenAI' },
  { title: 'PREA',          filter: (n) => n === 'PREA-Logo' },
];

function IconCell({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }
  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy <Icon name="${name}" />`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '12px 6px', border: '1px solid transparent', borderRadius: 6,
        background: 'transparent', cursor: 'pointer', color: 'inherit', font: 'inherit',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border, #e1e1e1)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
    >
      <Icon name={name} size={20} />
      <span style={{ fontSize: 9, color: copied ? '#0663e5' : '#aaa', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.3 }}>
        {copied ? 'copied!' : name}
      </span>
    </button>
  );
}

function IconDemo() {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ICON_NAMES.filter((n) => n.toLowerCase().includes(q)) : ICON_NAMES;
  }, [query]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <p style={headingStyle}>li:atom — all Figma sizes</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Icon name="li:atom" size={size} />
              <span style={{ fontSize: 10, color: '#aaa' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={headingStyle}>Colour via currentColor (monochrome icons only)</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { color: 'currentColor', label: 'Inherit' },
            { color: '#0663e5',      label: 'Link' },
            { color: '#d92d20',      label: 'Danger' },
            { color: '#888',         label: 'Muted' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <Icon name="li:atom" size={20} color={color} />
                <Icon name="home" size={20} color={color} />
              </div>
              <span style={{ fontSize: 10, color: '#aaa' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
          <p style={{ ...headingStyle, marginBottom: 0 }}>Library — {visible.length} / {ICON_NAMES.length} icons · click to copy</p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons…"
            style={{
              fontSize: 12, padding: '6px 10px', borderRadius: 6, minWidth: 200,
              border: '1px solid var(--border, #e1e1e1)', background: 'transparent', color: 'inherit',
            }}
          />
        </div>

        {GROUPS.map((g) => {
          const names = visible.filter(g.filter);
          if (!names.length) return null;
          return (
            <div key={g.title} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: '#aaa', margin: '0 0 6px' }}>{g.title} · {names.length}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: 4 }}>
                {names.map((n) => <IconCell key={n} name={n} />)}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Icon } from './Icon';

// Figma names — "li:" prefix optional, case-insensitive
<Icon name="li:atom" size={16} />
<Icon name="li:chevron-right" size={14} />
<Icon name="home" size={20} />              // filled icon
<Icon name="OpenAI" size={16} />            // brand logo (monochrome, follows currentColor)
<Icon name="in_planung" size={20} />        // status badge (own colours)
<Icon name="PREA-Logo" size={24} />

// Colour via prop or CSS currentColor
<Icon name="li:atom" size={20} color="#d92d20" />
<span style={{ color: 'red' }}><Icon name="li:atom" /></span>

// Accessible (non-decorative) icon
<Icon name="li:download" title="Download" />

// Any lucide-react icon still works as a fallback
<Icon name="li:rocket" />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const iconsEntry: ComponentEntry = {
  id: 'icons',
  name: 'Icon',
  category: 'Foundation',
  description: `Every icon of the PREA Space design system, exported from Figma (${ICON_NAMES.length} icons: line, filled, status badges, brand logos). Falls back to lucide-react for names not in Figma.`,
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=13-2218',
  files: [
    { name: 'Icon.tsx',       content: iconSource },
    { name: 'icons.ts',       content: iconRegistry },
    { name: 'Icon.types.ts',  content: iconTypes },
    { name: 'Icon.css',       content: iconCss },
    { name: 'index.ts',       content: iconIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'name',        type: 'string',               default: '—',            required: true,  description: 'Figma icon name, e.g. "li:atom", "home", "OpenAI". Case-insensitive, "li:" optional. Unknown names fall back to lucide-react.' },
    { name: 'size',        type: 'number',               default: '16',           required: false, description: 'Size in px. Figma sizes: 10 12 14 16 18 20 22 24 28 32 36 48.' },
    { name: 'color',       type: 'string',               default: 'currentColor', required: false, description: 'Colour for monochrome icons. Multi-colour icons (badges, brand logos) ignore it.' },
    { name: 'strokeWidth', type: 'number',               default: '1.5',          required: false, description: 'Stroke width for line icons.' },
    { name: 'title',       type: 'string',               default: '—',            required: false, description: 'Accessible label; without it the icon is aria-hidden.' },
    { name: 'className',   type: 'string',               default: '—',            required: false, description: 'Additional CSS class.' },
    { name: 'style',       type: 'React.CSSProperties',  default: '—',            required: false, description: 'Inline styles.' },
  ],
  demo: <IconDemo />,
};
