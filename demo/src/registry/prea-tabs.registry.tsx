import React, { useState } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { PREATabs } from '@prea';
import type { PREATabItem } from '@prea';
import type { ComponentEntry } from './types';

// ─── Read the raw source files to bundle for download ──────────────────────
// Vite's ?raw import inlines the file content as a string at build time.
import preatabsSource from '../../../PREATabs/PREATabs.tsx?raw';
import preatTabSource from '../../../PREATabs/PREATab.tsx?raw';
import preatabsTypes from '../../../PREATabs/PREATabs.types.ts?raw';
import preatabsCss from '../../../PREATabs/PREATabs.css?raw';
import preatabsIndex from '../../../PREATabs/index.ts?raw';

// ─── Live demo component ────────────────────────────────────────────────────
function PREATabsDemo() {
  const [lightItems, setLightItems] = useState<PREATabItem[]>([
    { key: '1', label: 'Dashboard', children: <p style={{ padding: 16, margin: 0 }}>Dashboard content goes here.</p> },
    { key: '2', label: 'Analytics', children: <p style={{ padding: 16, margin: 0 }}>Analytics content goes here.</p> },
    { key: '3', label: 'Reports', children: <p style={{ padding: 16, margin: 0 }}>Reports content goes here.</p> },
  ]);
  const [lightActive, setLightActive] = useState('1');

  const [darkItems, setDarkItems] = useState<PREATabItem[]>([
    { key: 'a', label: 'Overview', children: <p style={{ padding: 16, margin: 0 }}>Overview content goes here.</p> },
    { key: 'b', label: 'Settings', children: <p style={{ padding: 16, margin: 0 }}>Settings content goes here.</p> },
    { key: 'c', label: 'Team', children: <p style={{ padding: 16, margin: 0 }}>Team content goes here.</p> },
  ]);
  const [darkActive, setDarkActive] = useState('a');

  const handleLightEdit = (key: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const k = String(Date.now());
      setLightItems(prev => [...prev, { key: k, label: 'New Tab', children: <p style={{ padding: 16, margin: 0 }}>New tab content.</p> }]);
      setLightActive(k);
    } else {
      setLightItems(prev => prev.filter(i => i.key !== key));
      if (lightActive === key) setLightActive(lightItems[0]?.key ?? '');
    }
  };

  const handleDarkEdit = (key: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const k = String(Date.now());
      setDarkItems(prev => [...prev, { key: k, label: 'New Tab', children: <p style={{ padding: 16, margin: 0 }}>New tab content.</p> }]);
      setDarkActive(k);
    } else {
      setDarkItems(prev => prev.filter(i => i.key !== key));
      if (darkActive === key) setDarkActive(darkItems[0]?.key ?? '');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Light mode */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 12 }}>
          Light Mode
        </p>
        <ConfigProvider theme={{ algorithm: antTheme.defaultAlgorithm }}>
          <PREATabs items={lightItems} activeKey={lightActive} onChange={setLightActive} onEdit={handleLightEdit} />
        </ConfigProvider>
      </div>
      {/* Dark mode */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 12 }}>
          Dark Mode
        </p>
        <ConfigProvider
          theme={{
            algorithm: antTheme.darkAlgorithm,
            token: {
              colorBgContainer: '#303030',
              colorFillQuaternary: '#1B1B1B',
              colorFillTertiary: '#1B1B1B',
              colorFillSecondary: '#383838',
              colorFill: '#404040',
            },
          }}
        >
          <PREATabs items={darkItems} activeKey={darkActive} onChange={setDarkActive} onEdit={handleDarkEdit} />
        </ConfigProvider>
      </div>
    </div>
  );
}

// ─── Usage snippet ──────────────────────────────────────────────────────────
const USAGE = `import { PREATabs } from './PREATabs';
import type { PREATabItem } from './PREATabs';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState<PREATabItem[]>([
    { key: '1', label: 'Dashboard', children: <p>Dashboard content</p> },
    { key: '2', label: 'Analytics', children: <p>Analytics content</p> },
  ]);
  const [activeKey, setActiveKey] = useState('1');

  const onEdit = (key: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const k = String(Date.now());
      setItems(prev => [...prev, { key: k, label: 'New Tab', children: <p>Content</p> }]);
      setActiveKey(k);
    } else {
      setItems(prev => prev.filter(i => i.key !== key));
    }
  };

  return (
    <PREATabs
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
}`;

// ─── Registry entry ─────────────────────────────────────────────────────────
export const preatabsEntry: ComponentEntry = {
  id: 'prea-tabs',
  name: 'PREATabs',
  category: 'Navigation',
  description:
    'Browser-style editable card tabs for Ant Design v6. Supports add/remove, disabled state, controlled & uncontrolled modes, and adapts automatically to any ConfigProvider theme (light, dark, custom tokens).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=0-1',
  files: [
    { name: 'PREATabs.tsx', content: preatabsSource },
    { name: 'PREATab.tsx',  content: preatTabSource },
    { name: 'PREATabs.types.ts', content: preatabsTypes },
    { name: 'PREATabs.css', content: preatabsCss },
    { name: 'index.ts',    content: preatabsIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'items',          type: 'PREATabItem[]',  default: '—',     required: true,  description: 'Array of tab items. Each item requires key, label and children.' },
    { name: 'activeKey',      type: 'string',         default: '—',     required: false, description: 'Controlled active tab key. Pair with onChange.' },
    { name: 'defaultActiveKey', type: 'string',       default: 'items[0].key', required: false, description: 'Default active key for uncontrolled mode.' },
    { name: 'onChange',       type: '(key: string) => void', default: '—', required: false, description: 'Callback fired when the active tab changes.' },
    { name: 'onEdit',         type: '(key: string, action: "add" | "remove") => void', default: '—', required: false, description: 'Callback for add/remove actions. Omit to hide the + button.' },
    { name: 'maxTabWidth',    type: 'number',         default: '250',   required: false, description: 'Maximum width of each tab in pixels.' },
    { name: 'className',      type: 'string',         default: '—',     required: false, description: 'Additional CSS class name for the root element.' },
    { name: 'style',          type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for the root element.' },
  ],
  demo: <PREATabsDemo />,
};
