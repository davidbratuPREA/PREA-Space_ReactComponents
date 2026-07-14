import React, { useState } from 'react';
import {
  SearchOutlined,
  DownloadOutlined,
  PoweroffOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button } from '../../../Button/Button';
import type { ComponentEntry } from './types';

// ─── Raw source files (bundled for download) ──────────────────────────────────
import buttonSource from '../../../Button/Button.tsx?raw';
import buttonTypes  from '../../../Button/Button.types.ts?raw';
import buttonCss    from '../../../Button/Button.css?raw';
import buttonIndex  from '../../../Button/index.ts?raw';

// ─── Shared styles for the example cards ─────────────────────────────────────
const card: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  overflow: 'hidden',
};
const cardBody: React.CSSProperties = {
  padding: '20px 24px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
};
const cardFooter: React.CSSProperties = {
  padding: '12px 24px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};
const footerTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-primary)',
};
const footerDesc: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--text-muted)',
  lineHeight: 1.6,
};
const inlineCode: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  background: 'var(--bg-code, rgba(128,128,128,0.12))',
  borderRadius: 3,
  padding: '1px 5px',
  fontSize: '0.92em',
};
const row: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
};
const col: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

// ─── Demo sections ────────────────────────────────────────────────────────────
function TypeSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <Button variant="solid">Solid</Button>
        <Button variant="default">Default</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="text">Text</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Type</span>
        <span style={footerDesc}>
          Use the <code style={inlineCode}>variant</code> prop to select the style:{' '}
          <code style={inlineCode}>solid</code>, <code style={inlineCode}>default</code>,{' '}
          <code style={inlineCode}>dashed</code>, <code style={inlineCode}>text</code>, and{' '}
          <code style={inlineCode}>link</code> buttons.
        </span>
      </div>
    </div>
  );
}

function IconSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <div style={col}>
          <div style={row}>
            <Button variant="solid" shape="circle" icon={<SearchOutlined />} aria-label="Search" />
            <Button variant="solid" shape="circle">A</Button>
            <Button variant="solid" icon={<SearchOutlined />}>Search</Button>
            <Button variant="default" shape="circle" icon={<SearchOutlined />} aria-label="Search" />
            <Button variant="default" icon={<SearchOutlined />}>Search</Button>
          </div>
          <div style={row}>
            <Button variant="dashed" shape="circle" icon={<SearchOutlined />} aria-label="Search" />
            <Button variant="dashed" icon={<SearchOutlined />}>Search</Button>
            <Button variant="dashed" shape="round" icon={<SearchOutlined />}>Search</Button>
            <Button variant="default" shape="circle" icon={<SearchOutlined />} aria-label="Search" />
          </div>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Icon</span>
        <span style={footerDesc}>
          Pass an icon element to the <code style={inlineCode}>icon</code> prop. Use{' '}
          <code style={inlineCode}>shape="circle"</code> or{' '}
          <code style={inlineCode}>shape="round"</code> for different border styles.
        </span>
      </div>
    </div>
  );
}

function SizeSection() {
  const [size, setSize] = useState<'lg' | 'md' | 'sm'>('lg');
  const sizeMd: React.CSSProperties = { fontSize: 13, cursor: 'pointer', color: 'var(--text-primary)' };

  return (
    <div style={card}>
      <div style={{ ...cardBody, flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
        <div style={row}>
          {(['lg', 'md', 'sm'] as const).map((s) => (
            <Button
              key={s}
              variant={size === s ? 'solid' : 'default'}
              size="sm"
              onClick={() => setSize(s)}
            >
              {s === 'lg' ? 'Large' : s === 'md' ? 'Medium' : 'Small'}
            </Button>
          ))}
        </div>
        <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, ...sizeMd }}>
            Preview
          </div>
          <div style={{ ...row, marginBottom: 8 }}>
            <Button variant="solid"   size={size}>Solid</Button>
            <Button variant="default" size={size}>Default</Button>
            <Button variant="dashed"  size={size}>Dashed</Button>
          </div>
          <div style={row}>
            <Button variant="link"    size={size}>Link</Button>
            <Button variant="solid"   size={size} icon={<DownloadOutlined />} aria-label="Download" />
            <Button variant="default" size={size} icon={<DownloadOutlined />} aria-label="Download" />
            <Button variant="dashed"  size={size} icon={<DownloadOutlined />} aria-label="Download" />
            <Button variant="solid"   size={size} icon={<DownloadOutlined />}>Download</Button>
            <Button variant="default" size={size} icon={<DownloadOutlined />}>Download</Button>
          </div>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Size</span>
        <span style={footerDesc}>
          Three sizes are available: <code style={inlineCode}>lg</code>, <code style={inlineCode}>md</code> (default),
          and <code style={inlineCode}>sm</code>. Set the <code style={inlineCode}>size</code> prop accordingly.
        </span>
      </div>
    </div>
  );
}

function DangerSection() {
  return (
    <div style={card}>
      <div style={{ ...cardBody, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <div style={row}>
          <Button variant="solid"   danger>Delete</Button>
          <Button variant="default" danger>Delete</Button>
          <Button variant="dashed"  danger>Delete</Button>
          <Button variant="text"    danger>Delete</Button>
          <Button variant="link"    danger>Delete</Button>
        </div>
        <div style={row}>
          <Button variant="solid"   danger icon={<DeleteOutlined />}>Delete record</Button>
          <Button variant="default" danger icon={<DeleteOutlined />}>Delete record</Button>
          <Button variant="solid"   danger shape="circle" icon={<DeleteOutlined />} aria-label="Delete" />
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Danger</span>
        <span style={footerDesc}>
          Add <code style={inlineCode}>danger</code> for destructive actions. Works across all variants.
        </span>
      </div>
    </div>
  );
}

function DisabledSection() {
  return (
    <div style={card}>
      <div style={{ ...cardBody, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <div style={row}>
          <Button variant="solid"   disabled>Solid</Button>
          <Button variant="default" disabled>Default</Button>
          <Button variant="dashed"  disabled>Dashed</Button>
          <Button variant="text"    disabled>Text</Button>
          <Button variant="link"    disabled>Link</Button>
        </div>
        <div style={row}>
          <Button variant="solid"   disabled danger>Danger</Button>
          <Button variant="default" disabled danger>Danger</Button>
          <Button variant="solid"   disabled icon={<SettingOutlined />}>Settings</Button>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Disabled</span>
        <span style={footerDesc}>
          The <code style={inlineCode}>disabled</code> prop prevents interaction and renders the button
          at reduced opacity with a <code style={inlineCode}>not-allowed</code> cursor.
        </span>
      </div>
    </div>
  );
}

function LoadingSection() {
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const handleA = () => {
    setLoadingA(true);
    setTimeout(() => setLoadingA(false), 2500);
  };
  const handleB = () => {
    setLoadingB(true);
    setTimeout(() => setLoadingB(false), 2500);
  };

  return (
    <div style={card}>
      <div style={{ ...cardBody, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <div style={row}>
          <Button variant="solid"   loading>Loading</Button>
          <Button variant="solid"   loading>Loading</Button>
          <Button variant="solid"   loading shape="circle" aria-label="Loading" />
          <Button variant="solid"   loading icon={<PoweroffOutlined />}>Loading Icon</Button>
        </div>
        <div style={row}>
          <Button variant="solid"   icon={<PoweroffOutlined />} loading={loadingA} onClick={handleA}>
            {loadingA ? 'Icon Start' : 'Click me'}
          </Button>
          <Button variant="default" icon={<EditOutlined />} loading={loadingB} onClick={handleB}>
            {loadingB ? 'Icon End'   : 'Click me'}
          </Button>
          <Button variant="solid"   loading={loadingA} onClick={handleA}>
            {loadingA ? 'Loading…'   : 'Icon Replace'}
          </Button>
          <Button variant="solid"   shape="circle" loading={loadingB} onClick={handleB}
            icon={loadingB ? undefined : <PoweroffOutlined />}
            aria-label={loadingB ? 'Loading' : 'Power'}
          />
          <Button variant="solid"   loading={loadingB} icon={<PoweroffOutlined />} onClick={handleB}>
            {loadingB ? 'Loading…' : 'Loading Icon'}
          </Button>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Loading</span>
        <span style={footerDesc}>
          Set <code style={inlineCode}>loading</code> to show a spinner and disable the button. Click the
          interactive buttons to see the transition. The loading state automatically clears after 2.5 s.
        </span>
      </div>
    </div>
  );
}

function ShapeSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <div style={col}>
          <div style={row}>
            <Button variant="solid"   shape="default" icon={<PlusOutlined />}>Default</Button>
            <Button variant="solid"   shape="round"   icon={<PlusOutlined />}>Round</Button>
            <Button variant="solid"   shape="circle"  icon={<PlusOutlined />} aria-label="Add" />
          </div>
          <div style={row}>
            <Button variant="default" shape="default" icon={<SearchOutlined />}>Default</Button>
            <Button variant="default" shape="round"   icon={<SearchOutlined />}>Round</Button>
            <Button variant="default" shape="circle"  icon={<SearchOutlined />} aria-label="Search" />
          </div>
        </div>
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Shape</span>
        <span style={footerDesc}>
          Use <code style={inlineCode}>shape="round"</code> for pill-shaped buttons and{' '}
          <code style={inlineCode}>shape="circle"</code> for icon-only circular buttons.
        </span>
      </div>
    </div>
  );
}

// ─── Combined demo ────────────────────────────────────────────────────────────
function ButtonsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <TypeSection />
      <IconSection />
      <SizeSection />
      <ShapeSection />
      <DangerSection />
      <DisabledSection />
      <LoadingSection />
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────────
const USAGE = `import { Button } from './Button';

// Variants
<Button variant="solid">Solid</Button>
<Button variant="default">Default</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="text">Text</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="lg">Large</Button>
<Button size="md">Medium</Button>   {/* default */}
<Button size="sm">Small</Button>

// With icon
<Button icon={<SearchOutlined />}>Search</Button>
<Button icon={<SearchOutlined />} shape="circle" aria-label="Search" />

// Danger
<Button variant="solid" danger>Delete</Button>
<Button variant="default" danger>Delete</Button>

// Disabled
<Button disabled>Disabled</Button>

// Loading
<Button loading>Saving…</Button>
`;

// ─── Registry entry ────────────────────────────────────────────────────────────
export const buttonEntry: ComponentEntry = {
  id: 'button',
  name: 'Buttons',
  category: 'Inputs',
  description:
    'Core action primitive of the PREA design system. Supports five variants (solid, default, dashed, text, link), three sizes, danger state, loading state, icons, and full dark-mode support.',
  status: 'stable',
  figmaUrl:
    'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=2-1319',
  files: [
    { name: 'Button.tsx',        content: buttonSource },
    { name: 'Button.types.ts',   content: buttonTypes  },
    { name: 'Button.css',        content: buttonCss    },
    { name: 'index.ts',          content: buttonIndex  },
  ],
  usage: USAGE,
  props: [
    { name: 'variant',       type: "'solid' | 'default' | 'dashed' | 'text' | 'link'", default: "'default'", required: false, description: 'Visual style of the button.' },
    { name: 'size',          type: "'sm' | 'md' | 'lg'",                               default: "'md'",      required: false, description: 'Height and font size of the button.' },
    { name: 'danger',        type: 'boolean',                                          default: 'false',     required: false, description: 'Apply danger/destructive red color scheme.' },
    { name: 'disabled',      type: 'boolean',                                          default: 'false',     required: false, description: 'Prevents interaction and dims the button.' },
    { name: 'loading',       type: 'boolean',                                          default: 'false',     required: false, description: 'Show a spinner and block interaction.' },
    { name: 'icon',          type: 'React.ReactNode',                                  default: '—',         required: false, description: 'Icon element to show before or after the label.' },
    { name: 'iconPosition',  type: "'start' | 'end'",                                  default: "'start'",   required: false, description: 'Position of the icon relative to the label.' },
    { name: 'shape',         type: "'default' | 'round' | 'circle'",                   default: "'default'", required: false, description: "Shape of the button's corners." },
    { name: 'block',         type: 'boolean',                                          default: 'false',     required: false, description: 'Stretch the button to fill its container width.' },
    { name: 'htmlType',      type: "'button' | 'submit' | 'reset'",                    default: "'button'",  required: false, description: 'HTML type attribute for the underlying <button>.' },
    { name: 'onClick',       type: 'React.MouseEventHandler<HTMLButtonElement>',        default: '—',         required: false, description: 'Click handler callback.' },
    { name: 'className',     type: 'string',                                           default: '—',         required: false, description: 'Additional CSS class(es) for the root element.' },
    { name: 'style',         type: 'React.CSSProperties',                              default: '—',         required: false, description: 'Inline styles for the root element.' },
  ],
  demo: <ButtonsDemo />,
};
