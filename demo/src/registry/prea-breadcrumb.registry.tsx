import React from 'react';
import { Breadcrumb } from '../../../Breadcrumb/Breadcrumb';
import type { ComponentEntry } from './types';

// ─── Raw source files (bundled for download) ──────────────────────────────────
import breadcrumbSource from '../../../Breadcrumb/Breadcrumb.tsx?raw';
import breadcrumbTypes  from '../../../Breadcrumb/Breadcrumb.types.ts?raw';
import breadcrumbCss    from '../../../Breadcrumb/Breadcrumb.css?raw';
import breadcrumbIndex  from '../../../Breadcrumb/index.ts?raw';

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
  gap: 16,
};
const cardFooter: React.CSSProperties = {
  padding: '12px 24px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};
const footerTitle: React.CSSProperties   = { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' };
const footerDesc: React.CSSProperties    = { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 };
const inlineCode: React.CSSProperties   = {
  fontFamily: 'var(--font-mono)',
  background: 'var(--bg-code, rgba(128,128,128,0.12))',
  borderRadius: 3,
  padding: '1px 5px',
  fontSize: '0.92em',
};

// ─── Demo sections ────────────────────────────────────────────────────────────
function BasicSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <Breadcrumb
          items={[
            { key: 'home', label: 'Home', href: '/' },
            { key: 'components', label: 'Components', href: '/components' },
            { key: 'breadcrumb', label: 'Breadcrumb' },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Basic</span>
        <span style={footerDesc}>
          Pass an <code style={inlineCode}>items</code> array. The last item is
          automatically rendered as the current active page (non-clickable).
        </span>
      </div>
    </div>
  );
}

function SeparatorSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <Breadcrumb
          separator=">"
          items={[
            { key: 'home', label: 'Home', href: '/' },
            { key: 'products', label: 'Products', href: '/products' },
            { key: 'detail', label: 'Product Detail' },
          ]}
        />
        <Breadcrumb
          separator="•"
          items={[
            { key: 'home', label: 'Home', href: '/' },
            { key: 'blog', label: 'Blog', href: '/blog' },
            { key: 'post', label: 'Article Title' },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Custom Separator</span>
        <span style={footerDesc}>
          Use the <code style={inlineCode}>separator</code> prop to change the
          character between crumbs. Accepts any ReactNode.
        </span>
      </div>
    </div>
  );
}

function LongPathSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <Breadcrumb
          items={[
            { key: 'home', label: 'Home', href: '/' },
            { key: 'settings', label: 'Settings', href: '/settings' },
            { key: 'workspace', label: 'Workspace', href: '/settings/workspace' },
            { key: 'integrations', label: 'Integrations', href: '/settings/workspace/integrations' },
            { key: 'api', label: 'API Keys' },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Long Path</span>
        <span style={footerDesc}>
          Works with any number of levels.
        </span>
      </div>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <BasicSection />
      <SeparatorSection />
      <LongPathSection />
    </div>
  );
}

// ─── Usage snippet ────────────────────────────────────────────────────────────
const USAGE = `import { Breadcrumb } from './Breadcrumb';

<Breadcrumb
  items={[
    { key: 'home', label: 'Home', href: '/' },
    { key: 'products', label: 'Products', href: '/products' },
    { key: 'item', label: 'Item Detail' },
  ]}
/>

// Custom separator
<Breadcrumb separator=">" items={items} />

// With icon
<Breadcrumb
  items={[
    { key: 'home', label: 'Home', href: '/', icon: <HomeIcon /> },
    { key: 'current', label: 'Current Page' },
  ]}
/>
`;

// ─── ComponentEntry ───────────────────────────────────────────────────────────
export const breadcrumbEntry: ComponentEntry = {
  id:       'breadcrumb',
  name:     'Breadcrumb',
  category: 'Navigation',
  status:   'stable',
  description:
    "Shows the user's location within a hierarchy. The last item represents the current page. Supports custom separators and deep paths.",
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK?node-id=22:11737',
  usage: USAGE,

  demo: <BreadcrumbDemo />,

  props: [
    { name: 'items',     type: 'BreadcrumbItemDef[]', default: '—',   required: true,  description: 'Ordered list of crumbs. Last item = current page.' },
    { name: 'separator', type: 'ReactNode',            default: "'/'", required: false, description: 'Character or element rendered between crumbs.' },
    { name: 'className', type: 'string',               default: '—',   required: false, description: 'Extra CSS class on the <ol>.' },
    { name: 'style',     type: 'CSSProperties',        default: '—',   required: false, description: 'Inline styles for the wrapper.' },
  ],

  files: [
    { name: 'Breadcrumb.tsx',      content: breadcrumbSource },
    { name: 'Breadcrumb.types.ts', content: breadcrumbTypes  },
    { name: 'Breadcrumb.css',      content: breadcrumbCss    },
    { name: 'index.ts',            content: breadcrumbIndex  },
  ],
};
