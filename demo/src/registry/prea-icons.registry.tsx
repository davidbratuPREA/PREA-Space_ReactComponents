import React from 'react';
import type { ComponentEntry } from './types';

// ─── Shared demo styles ───────────────────────────────────────────────────────
const card: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  overflow: 'hidden',
};
const cardBody: React.CSSProperties = {
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};
const cardFooter: React.CSSProperties = {
  padding: '12px 24px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};
const footerTitle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' };
const footerDesc: React.CSSProperties  = { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 };
const inlineCode: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  background: 'var(--bg-code, rgba(128,128,128,0.12))',
  borderRadius: 3,
  padding: '1px 5px',
  fontSize: '0.92em',
};

// ─── Inline SVG icons (lucide-based PREA set preview) ─────────────────────────
function IconSvg({ name, size = 16, color = 'currentColor' }: { name: string; size?: number; color?: string }) {
  const icons: Record<string, React.ReactElement> = {
    'chevron-right': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 4 10 8 6 12" />
      </svg>
    ),
    'chevron-down': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 6 8 10 12 6" />
      </svg>
    ),
    'plus': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round">
        <line x1="8" y1="3" x2="8" y2="13" /><line x1="3" y1="8" x2="13" y2="8" />
      </svg>
    ),
    'x-close': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round">
        <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
      </svg>
    ),
    'settings': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="2" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
      </svg>
    ),
    'eye': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="8" cy="8" rx="7" ry="4" /><circle cx="8" cy="8" r="1.5" />
      </svg>
    ),
    'pencil': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2l3 3-8 8H3v-3L11 2z" />
      </svg>
    ),
    'arrow-right': (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round">
        <line x1="3" y1="8" x2="13" y2="8" /><polyline points="9 4 13 8 9 12" />
      </svg>
    ),
  };
  return icons[name] ?? (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round">
      <rect x="2" y="2" width="12" height="12" rx="2" /><line x1="5" y1="8" x2="11" y2="8" />
    </svg>
  );
}

const iconNames = ['chevron-right', 'chevron-down', 'plus', 'x-close', 'settings', 'eye', 'pencil', 'arrow-right'];

// ─── Demo sections ────────────────────────────────────────────────────────────
function SizesSection() {
  const sizes = [12, 16, 20, 24, 32];
  return (
    <div style={card}>
      <div style={cardBody}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          {sizes.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <IconSvg name="settings" size={s} color="var(--text-primary)" />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s}px</span>
            </div>
          ))}
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Sizes</span>
        <span style={footerDesc}>
          SVG-based icons scale cleanly. Recommended sizes: 12 · 16 · 20 · 24 · 32 px.
        </span>
      </div>
    </div>
  );
}

function ColorSection() {
  const colors = [
    { label: 'Default',   color: 'var(--text-primary)' },
    { label: 'Secondary', color: 'var(--text-muted)'   },
    { label: 'Primary',   color: '#4096ff'             },
    { label: 'Danger',    color: '#ff4d4f'             },
    { label: 'Success',   color: '#52c41a'             },
    { label: 'Warning',   color: '#faad14'             },
  ];
  return (
    <div style={card}>
      <div style={cardBody}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {colors.map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <IconSvg name="settings" size={20} color={color} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Colors</span>
        <span style={footerDesc}>
          Icons inherit <code style={inlineCode}>currentColor</code> by default.
          Override via <code style={inlineCode}>color</code> prop or parent CSS <code style={inlineCode}>color</code>.
        </span>
      </div>
    </div>
  );
}

function IconSetSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {iconNames.map((name) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 6,
                minWidth: 72,
              }}
            >
              <IconSvg name={name} size={20} color="var(--text-primary)" />
              <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                li:{name}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--bg-code, rgba(128,128,128,0.06))',
            borderRadius: 6,
            fontSize: 12,
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          🚧 <strong>Full icon library coming soon</strong> — The complete PREA icon set (lucide-based,{' '}
          <code style={{ ...inlineCode, background: 'transparent', padding: '0 2px' }}>li:</code> prefixed)
          is still being finalised in Figma. The full grid will be added here once complete.
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Icon Preview (partial set)</span>
        <span style={footerDesc}>
          Showing a representative sample. Final library will be added when the Figma set is complete.
        </span>
      </div>
    </div>
  );
}

function IconsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SizesSection />
      <ColorSection />
      <IconSetSection />
    </div>
  );
}

// ─── Usage snippet ────────────────────────────────────────────────────────────
const USAGE = `// PREA icons are SVG-based, stroke-aligned, lucide-compatible.
// Full library coming soon — import path TBD once library is finalised.

// Basic usage (size + color)
<IconSvg name="chevron-right" size={16} color="currentColor" />
<IconSvg name="settings"      size={20} color="#4096ff" />

// Inheriting color from parent CSS
<span style={{ color: 'red' }}>
  <IconSvg name="x-close" size={16} />
</span>
`;

// ─── ComponentEntry ───────────────────────────────────────────────────────────
export const iconsEntry: ComponentEntry = {
  id:       'icons',
  name:     'Icons',
  category: 'Foundation',
  status:   'beta',
  description:
    'PREA icon component — SVG-based, stroke-aligned, lucide-compatible. The full icon library is being finalised in Figma. This page shows the Icon component and a partial preview.',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK?node-id=13:2218',
  usage: USAGE,

  demo: <IconsDemo />,

  props: [
    { name: 'name',  type: 'string', default: '—',          required: true,  description: 'Icon name from the PREA set (prefixed li:).' },
    { name: 'size',  type: 'number', default: '16',          required: false, description: 'Width and height in pixels.' },
    { name: 'color', type: 'string', default: "'currentColor'", required: false, description: 'Stroke color. Inherits from CSS color by default.' },
  ],

  files: [],
};
