import React from 'react';
import { Divider } from '../../../Divider/Divider';
import type { ComponentEntry } from './types';

// ─── Raw source files ─────────────────────────────────────────────────────────
import dividerSource from '../../../Divider/Divider.tsx?raw';
import dividerTypes  from '../../../Divider/Divider.types.ts?raw';
import dividerCss    from '../../../Divider/Divider.css?raw';
import dividerIndex  from '../../../Divider/index.ts?raw';

// ─── Shared demo styles ───────────────────────────────────────────────────────
const card: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  overflow: 'hidden',
};
const cardBody: React.CSSProperties    = { padding: '20px 24px' };
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
const contentText: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--text-muted)',
  lineHeight: 1.6,
  margin: 0,
};

// ─── Demo sections ────────────────────────────────────────────────────────────
function HorizontalSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <p style={contentText}>Content above the divider.</p>
        <Divider />
        <p style={contentText}>Content below the divider.</p>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Horizontal (default)</span>
        <span style={footerDesc}>A simple full-width horizontal line.</span>
      </div>
    </div>
  );
}

function LabelSection() {
  return (
    <div style={card}>
      <div style={{ ...cardBody, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Divider label="Center" />
        <Divider label="Left"   labelPosition="left" />
        <Divider label="Right"  labelPosition="right" />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>With Label</span>
        <span style={footerDesc}>
          Use <code style={inlineCode}>label</code> and{' '}
          <code style={inlineCode}>labelPosition</code> ({'"left"'} · {'"center"'} · {'"right"'}).
        </span>
      </div>
    </div>
  );
}

function DashedSection() {
  return (
    <div style={card}>
      <div style={{ ...cardBody, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Divider dashed />
        <Divider dashed label="Dashed with label" />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Dashed</span>
        <span style={footerDesc}>
          Set <code style={inlineCode}>dashed</code> for a dashed line style.
        </span>
      </div>
    </div>
  );
}

function VerticalSection() {
  const text: React.CSSProperties = { fontSize: 13, color: 'var(--text-primary)', lineHeight: 1 };
  const row:  React.CSSProperties = { display: 'inline-flex', alignItems: 'center' };
  return (
    <div style={card}>
      <div style={{ ...cardBody, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={row}>
          <span style={text}>Cut</span>
          <Divider orientation="vertical" />
          <span style={text}>Copy</span>
          <Divider orientation="vertical" />
          <span style={text}>Paste</span>
        </div>
        <div style={row}>
          <span style={text}>Link 1</span>
          <Divider orientation="vertical" dashed />
          <span style={text}>Link 2</span>
          <Divider orientation="vertical" dashed />
          <span style={text}>Link 3</span>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Vertical</span>
        <span style={footerDesc}>
          Set <code style={inlineCode}>orientation="vertical"</code> for an inline separator.
        </span>
      </div>
    </div>
  );
}

function DividerDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <HorizontalSection />
      <LabelSection />
      <DashedSection />
      <VerticalSection />
    </div>
  );
}

// ─── Usage snippet ────────────────────────────────────────────────────────────
const USAGE = `import { Divider } from './Divider';

// Basic horizontal
<Divider />

// With label
<Divider label="OR" />
<Divider label="Section" labelPosition="left" />

// Dashed
<Divider dashed />
<Divider dashed label="Dashed with label" />

// Vertical (inline)
<span>Cut</span>
<Divider orientation="vertical" />
<span>Copy</span>
`;

// ─── ComponentEntry ───────────────────────────────────────────────────────────
export const dividerEntry: ComponentEntry = {
  id:       'divider',
  name:     'Divider',
  category: 'Layout',
  status:   'stable',
  description:
    'A thin line that separates content. Supports horizontal (block) and vertical (inline) orientations, optional text labels positioned left/center/right, and dashed style.',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK?node-id=29:643',
  usage: USAGE,

  demo: <DividerDemo />,

  props: [
    { name: 'orientation',   type: "'horizontal' | 'vertical'",     default: "'horizontal'", required: false, description: 'Line direction.' },
    { name: 'label',         type: 'ReactNode',                      default: '—',            required: false, description: 'Optional label in the center of the line.' },
    { name: 'labelPosition', type: "'left' | 'center' | 'right'",    default: "'center'",     required: false, description: 'Position of the label along the horizontal line.' },
    { name: 'dashed',        type: 'boolean',                        default: 'false',        required: false, description: 'Renders the line as dashed.' },
    { name: 'className',     type: 'string',                         default: '—',            required: false, description: 'Extra CSS class on the root element.' },
    { name: 'style',         type: 'CSSProperties',                  default: '—',            required: false, description: 'Inline styles for the root element.' },
  ],

  files: [
    { name: 'Divider.tsx',      content: dividerSource },
    { name: 'Divider.types.ts', content: dividerTypes  },
    { name: 'Divider.css',      content: dividerCss    },
    { name: 'index.ts',         content: dividerIndex  },
  ],
};
