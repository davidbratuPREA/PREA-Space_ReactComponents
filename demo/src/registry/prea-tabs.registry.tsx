import React, { useState } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { TabsMain } from '@prea';
import type { TabsMainItem } from '@prea';
import type { ComponentEntry } from './types';
import { useAppTheme } from '../ThemeContext';

// ─── Read the raw source files to bundle for download ──────────────────────
import tabsMainSource from '../../../TabsMain/TabsMain.tsx?raw';
import tabSource      from '../../../TabsMain/Tab.tsx?raw';
import tabsMainTypes  from '../../../TabsMain/TabsMain.types.ts?raw';
import tabsMainCss    from '../../../TabsMain/TabsMain.css?raw';
import tabsMainIndex  from '../../../TabsMain/index.ts?raw';

// ─── Live demo component ────────────────────────────────────────────────────
function TabsMainDemo() {
  const appTheme = useAppTheme();

  const [items, setItems] = useState<TabsMainItem[]>([
    { key: '1', label: 'Dashboard', children: <p style={{ padding: 16, margin: 0 }}>Dashboard content goes here.</p> },
    { key: '2', label: 'Analytics', children: <p style={{ padding: 16, margin: 0 }}>Analytics content goes here.</p> },
    { key: '3', label: 'Reports',   children: <p style={{ padding: 16, margin: 0 }}>Reports content goes here.</p> },
  ]);
  const [activeKey, setActiveKey] = useState('1');

  const handleEdit = (key: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const k = String(Date.now());
      setItems(prev => [...prev, { key: k, label: 'New Tab', children: <p style={{ padding: 16, margin: 0 }}>New tab content.</p> }]);
      setActiveKey(k);
    } else {
      setItems(prev => prev.filter(i => i.key !== key));
      if (activeKey === key) setActiveKey(items[0]?.key ?? '');
    }
  };

  const isDark = appTheme === 'dark';

  return (
    <ConfigProvider
      theme={isDark ? {
        algorithm: antTheme.darkAlgorithm,
        token: {
          colorBgContainer:    '#303030',
          colorFillQuaternary: '#212121',
          colorFillTertiary:   '#212121',
          colorFillSecondary:  '#383838',
          colorFill:           '#404040',
        },
      } : {
        algorithm: antTheme.defaultAlgorithm,
      }}
    >
      <TabsMain items={items} activeKey={activeKey} onChange={setActiveKey} onEdit={handleEdit} />
    </ConfigProvider>
  );
}

// ─── Usage snippet ──────────────────────────────────────────────────────────
const USAGE = `import { TabsMain } from './TabsMain';
import type { TabsMainItem } from './TabsMain';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState<TabsMainItem[]>([
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
    <TabsMain
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
}`;

// ─── Registry entry ─────────────────────────────────────────────────────────
export const tabsMainEntry: ComponentEntry = {
  id: 'tabs-main',
  name: 'TabsMain',
  category: 'Navigation',
  description: 'Main tab system, used on top of the page to navigate through pages.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=0-1',
  files: [
    { name: 'TabsMain.tsx',       content: tabsMainSource },
    { name: 'Tab.tsx',            content: tabSource },
    { name: 'TabsMain.types.ts',  content: tabsMainTypes },
    { name: 'TabsMain.css',       content: tabsMainCss },
    { name: 'index.ts',           content: tabsMainIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'items',             type: 'TabsMainItem[]',  default: '—',           required: true,  description: 'Array of tab items. Each item requires key, label and children.' },
    { name: 'activeKey',         type: 'string',          default: '—',           required: false, description: 'Controlled active tab key. Pair with onChange.' },
    { name: 'defaultActiveKey',  type: 'string',          default: 'items[0].key', required: false, description: 'Default active key for uncontrolled mode.' },
    { name: 'onChange',          type: '(key: string) => void', default: '—',    required: false, description: 'Callback fired when the active tab changes.' },
    { name: 'onEdit',            type: '(key: string, action: "add" | "remove") => void', default: '—', required: false, description: 'Callback for add/remove actions. Omit to hide the + button.' },
    { name: 'maxTabWidth',       type: 'number',          default: '250',         required: false, description: 'Maximum width of each tab in pixels.' },
    { name: 'className',         type: 'string',          default: '—',           required: false, description: 'Additional CSS class name for the root element.' },
    { name: 'style',             type: 'React.CSSProperties', default: '—',       required: false, description: 'Inline styles for the root element.' },
  ],
  demo: <TabsMainDemo />,
};
